/* 10강 레시피 · 변경 관리 실습 — 판정 규칙 잠금 (node --test)
   교재 본문(w10)과 엔진이 같은 숫자 · 같은 규칙을 말하는지도 본다. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseLimit, inLimit, LIMIT_ITEMS,
  RCP_ME, RCP_TOL, RCP_FIELDS, RCP_RUNS, rcpCheck,
  CC_RULES, CC_CASES, CC_ACTIONS, ccDecide,
} from '../fieldEnglishLabs.js';
import { CONTENT_CHAPTERS } from '../../data/fieldEnglishChapters.data.js';

const W10 = CONTENT_CHAPTERS.find((c) => c.id === 'w10');
const TEXT = JSON.stringify(W10);

test('경계어 → 구간: 포함/제외가 교재와 같다', () => {
  const pass = (s, v, sp) => inLimit(parseLimit(s, sp), v);
  assert.equal(pass('not to exceed 20 W', 20), true);
  assert.equal(pass('no more than 20 W', 20.1), false);
  assert.equal(pass('below 20 W', 20), false);
  assert.equal(pass('less than 20 W', 19.9), true);
  assert.equal(pass('at least 5 min', 5), true);
  assert.equal(pass('a minimum of 2 wafers', 1), false);
  assert.equal(pass('greater than 95%', 95), false);
  assert.equal(pass('greater than or equal to 95%', 95), true);
  assert.equal(pass('within ±2 sccm of the setpoint', 52, 50), true);
  assert.equal(pass('within ±2 sccm of the setpoint', 52.1, 50), false);
  assert.equal(pass('within ±5% of the setpoint (10 mTorr)', 10.5), true);
  assert.equal(pass('between 30 and 60 s', 30), true);
  assert.equal(pass('between 30 and 60 s, exclusive', 30), false);
  assert.equal(pass('below 1.0e-5 Torr', 1.0e-5), false);
  assert.equal(parseLimit('close the valve'), null);
});

test('경계 실습의 정답 = 규칙이 낸 답, 경계값 문항이 있다', () => {
  for (const it of LIMIT_ITEMS) assert.equal(inLimit(parseLimit(it.spec), it.value), it.pass, it.spec);
  const atEdge = LIMIT_ITEMS.filter((it) => { const l = parseLimit(it.spec); return it.value === l.lo || it.value === l.hi; });
  assert.ok(atEdge.length >= 3, '경계값 문항이 셋 이상');
  assert.ok(atEdge.some((x) => x.pass) && atEdge.some((x) => !x.pass), '경계값에서 합격·불합격이 다 나온다');
});

test('레시피 실행 판정: 정상 웨이퍼는 모두 IN, 나머지는 의도한 항목만 OUT', () => {
  const outs = Object.fromEntries(RCP_RUNS.map((r) => [r.id, RCP_FIELDS.filter((f) => !rcpCheck(r, f.id).ok).map((f) => f.id)]));
  assert.deepEqual(outs, { W03: [], W07: ['press'], W12: ['oe'], W15: ['hbr', 'epd'] });
});

test('OE 는 실제 ME 시간의 30% (최대 시간 아님)', () => {
  const r = { epd: 42, oe: 12.6 };
  assert.equal(rcpCheck(r, 'oe').ok, true);
  assert.equal(rcpCheck({ epd: 42, oe: RCP_TOL.epdMax * RCP_TOL.oeFrac }, 'oe').ok, false);
});

test('교재 레시피 표·허용 범위 = 엔진 숫자', () => {
  const sheet = W10.slides.find((s) => s.type === 'mansample' && s.variant === 'parts');
  const me = sheet.rows.find((r) => r[0] === '3 ME');
  assert.equal(Number(me[3]), RCP_ME.press);
  assert.equal(me[4], `${RCP_ME.src} / ${RCP_ME.bias}`);
  assert.match(me[5], new RegExp(`HBr ${RCP_ME.hbr}, Cl2 ${RCP_ME.cl2}, O2 ${RCP_ME.o2}`));
  assert.equal(me[2], `MAX ${RCP_TOL.epdMax}`);
  assert.match(sheet.callout.en, /within ±5% of the setpoint, gas flow within ±2 sccm, RF power no more than 3% deviation/);
  assert.match(sheet.callout.en, /between 30 and 60 s/);
  assert.match(sheet.rows.find((r) => r[0] === '4 OE')[2], /30% of ME/);
});

test('변경 규정: 교재 R1~R4 문장 = 엔진 문장, 결정은 규정 그대로', () => {
  const policy = W10.slides.find((s) => s.type === 'manual' && /CHANGE CONTROL/.test(s.mtitle)).paras;
  for (const r of CC_RULES) assert.ok(policy.includes(`${r.id}. ${r.en}`), r.id);
  const got = Object.fromEntries(CC_CASES.map((c) => [c.id, ccDecide(c).action]));
  assert.deepEqual(got, { c1: 'blocked', c2: 'hold', c3: 'release', c4: 'rollback', c5: 'release', c6: 'hold', c7: 'blocked' });
  for (const a of CC_ACTIONS) assert.ok(Object.values(got).includes(a.id), `${a.id} 사례가 없다`);
  assert.equal(ccDecide({ ecn: 'PENDING', kind: 'time', deltaPct: 5, pass: 0, fail: 0 }).rule, 'R1'); // R4 예외도 R1 을 넘지 못한다
});

test('교재 퀴즈의 경계·조건 문항이 엔진 판정과 맞는다', () => {
  const q = W10.slides.filter((s) => s.type === 'quiz').flatMap((s) => s.questions);
  const find = (needle) => q.find((x) => x.prompt.includes(needle));
  assert.match(find('not to exceed 20 W').opts[find('not to exceed 20 W').ans], /합격/);
  assert.equal(inLimit(parseLimit('not to exceed 20 W'), 20), true);
  assert.match(find('below 1.0E-5 Torr').opts[find('below 1.0E-5 Torr').ans], /불합격/);
  assert.equal(inLimit(parseLimit('below 1.0E-5 Torr'), 1.0e-5), false);
  const p = find('PV 가 10.6'); assert.match(p.opts[p.ans], /범위 밖/);
  assert.equal(rcpCheck({ press: 10.6 }, 'press').ok, false);
  const e = find('끝점이 40 s'); assert.equal(e.opts[e.ans], '12 s');
});

test('퀴즈 정답 위치가 한쪽으로 몰리지 않는다', () => {
  const pos = W10.slides.filter((s) => s.type === 'quiz').flatMap((s) => s.questions.map((x) => x.ans));
  for (const k of [0, 1, 2]) assert.ok(pos.filter((x) => x === k).length >= 3, `정답 위치 ${k}`);
});

test('실습 슬라이드는 등록된 화면만 가리킨다', () => {
  assert.deepEqual(W10.slides.filter((s) => s.type === 'sim').map((s) => `${s.which}:${s.mode}`), ['recipe:limits', 'recipe:run', 'recipe:change']);
  assert.ok(TEXT.includes('교재 예시'), '가상 예시라고 밝힌다');
});
