/* 11강 다른 장비 계열 읽기 실습 — 판정 규칙 잠금 (node --test) */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  nounHead, ofChain, NOUN_ITEMS, TOOL_FAMILIES, TOOL_LINES, toolOf, SPEC_ITEMS, parseSci,
  parseLimit, inLimit, LIMIT_ITEMS,
} from '../fieldEnglishLabs.js';
import { CONTENT_CHAPTERS } from '../../data/fieldEnglishChapters.data.js';

const W11 = CONTENT_CHAPTERS.find((c) => c.id === 'w11');
const TEXT = JSON.stringify(W11);

test('명사 덩어리: 머리 = 맨 오른쪽, of 풀이는 머리부터', () => {
  assert.equal(nounHead(['chamber wall', 'temperature', 'setpoint']), 'setpoint');
  assert.equal(ofChain(['pad conditioner', 'sweep', 'rate']), 'the rate of the sweep of the pad conditioner');
});

test('명사 덩어리 실습: 정답 뜻이 머리 명사로 끝난다(오답은 머리가 다르다)', () => {
  const headKo = { setpoint: '설정값', rate: '속도', zone: '구역', limit: '한계값', check: '점검', failure: '고장', correction: '보정' };
  for (const it of NOUN_ITEMS) {
    const ko = headKo[nounHead(it.groups)];
    assert.ok(ko, it.id);
    assert.ok(it.opts[it.ans].endsWith(ko) || it.opts[it.ans].endsWith(`${ko})`), `${it.id}: 정답이 머리(${ko})로 끝나지 않는다`);
    it.opts.forEach((o, j) => { if (j !== it.ans) assert.ok(!o.endsWith(ko), `${it.id}: 오답 '${o}' 도 머리로 끝난다`); });
  }
  const pos = NOUN_ITEMS.map((x) => x.ans);
  for (const k of [0, 1, 2]) assert.ok(pos.includes(k));
});

test('장비 계열: 규칙이 정답과 같고, 같은 DOSE 를 단위로 가른다', () => {
  for (const t of TOOL_LINES) assert.equal(toolOf(t.line), t.tool, t.line);
  assert.equal(toolOf('DOSE 25.0 mJ/cm²'), 'SCANNER');
  assert.equal(toolOf('DOSE 5.0E15 /cm²'), 'IMPLANT');
  assert.equal(toolOf('SPIN SPEED 1500 rpm'), 'TRACK');
  assert.equal(toolOf('PLATEN SPEED 93 rpm'), 'CMP');
  for (const f of TOOL_FAMILIES) assert.ok(TOOL_LINES.some((t) => t.tool === f), `${f} 문항이 없다`);
});

test('장비별 규격: 10강 경계 규칙 그대로, 단위·지수 함정이 있다', () => {
  for (const it of SPEC_ITEMS) assert.equal(inLimit(parseLimit(it.spec), it.num), it.pass, it.spec);
  assert.equal(parseSci('4.8E15'), 4.8e15);
  assert.equal(parseSci('2,450'), 2450);
  assert.ok(SPEC_ITEMS.some((x) => /µA/.test(x.shown)), 'µA → mA 함정');
  assert.ok(SPEC_ITEMS.some((x) => /E15/.test(x.shown)), '지수 표기');
  assert.ok(SPEC_ITEMS.some((x) => / nm$/.test(x.shown) && /Å/.test(x.spec)), 'nm → Å 함정');
  for (const i of LIMIT_ITEMS) assert.equal(inLimit(parseLimit(i.spec), i.value), i.pass, `10강 ${i.id}`); // 기준값 읽기를 넓혀도 10강 그대로
});

test('교재 규격 줄 = 엔진 규격', () => {
  const sheet = W11.slides.find((s) => s.type === 'manual' && /SPEC SHEET/.test(s.mtitle)).paras;
  assert.ok(sheet.some((p) => p.includes('within ±3% of the target (1000 Å)')));
  assert.ok(SPEC_ITEMS.some((x) => x.spec.includes('within ±3% of the target (1000 Å)')));
  assert.ok(sheet.some((p) => p.includes('between 2000 and 3000 Å/min')));
  assert.ok(sheet.some((p) => p.includes('within ±2% of the target (5.0E15 /cm²)')));
  const om = W11.slides.find((s) => s.type === 'mansample' && /IMP-900/.test(s.doc.name));
  assert.ok(om.steps.some((x) => (typeof x === 'string' ? x : x.t).includes('at least 2.0 mA')));
  assert.ok(SPEC_ITEMS.some((x) => x.spec.includes('at least 2.0 mA')));
});

test('교재 퀴즈 판단이 엔진과 맞는다', () => {
  const q = W11.slides.filter((s) => s.type === 'quiz').flatMap((s) => s.questions);
  const f = (needle) => q.find((x) => x.prompt.includes(needle));
  const dose = f('4.8E15'); assert.match(dose.opts[dose.ans], /보류/);
  assert.equal(inLimit(parseLimit('within ±2% of the target (5.0E15 /cm²)'), 4.8e15), false);
  const ua = f('1800 µA'); assert.match(ua.opts[ua.ans], /만족하지 않는다/);
  const d = f("'DOSE 5.0E15 /cm²'"); assert.match(d.opts[d.ans], /이온주입/);
  assert.equal(toolOf('DOSE 5.0E15 /cm²'), 'IMPLANT');
  const pos = q.map((x) => x.ans); for (const k of [0, 1, 2]) assert.ok(pos.filter((x) => x === k).length >= 3);
});

test('실습 슬라이드는 등록된 화면만, 예시라고 밝힌다', () => {
  assert.deepEqual(W11.slides.filter((s) => s.type === 'sim').map((s) => `${s.which}:${s.mode}`), ['tools:nouns', 'tools:family', 'tools:specs']);
  assert.ok(TEXT.includes('교재 예시'));
  assert.ok(TEXT.includes('1 Å = 0.1 nm'));
});
