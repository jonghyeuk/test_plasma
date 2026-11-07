/* 12강 트러블슈팅 문서 실습 — 판정 규칙 잠금 (node --test) */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  certaintyOf, CERTAINTY_ITEMS, CERTAINTY_LEVELS,
  TS_CAUSES, TS_CASES, TS_VERDICTS, tsNarrow, OUTGAS_HOURS,
  SPC_CHART, SPC_CASES, SPC_ANSWERS, spcCheck, spcInSpec, spcAnswer, SPC_RUN_N, SPC_TREND_N,
} from '../fieldEnglishLabs.js';
import { CONTENT_CHAPTERS } from '../../data/fieldEnglishChapters.data.js';

const W12 = CONTENT_CHAPTERS.find((c) => c.id === 'w12');

test('확신 표현 → 등급: 교재 네 층', () => {
  assert.equal(certaintyOf('Root cause confirmed.'), 'confirmed');
  assert.equal(certaintyOf('A leak was found at the lid.'), 'confirmed');
  assert.equal(certaintyOf('It is most likely the O-ring.'), 'likely');
  assert.equal(certaintyOf('The trend is consistent with outgassing.'), 'likely');
  assert.equal(certaintyOf('The gauge may be drifting.'), 'possible');
  assert.equal(certaintyOf('The liner is suspected.'), 'possible');
  assert.equal(certaintyOf('Turbo has been ruled out.'), 'ruledOut');
  assert.equal(certaintyOf('The MFC is not the cause.'), 'ruledOut');
  assert.equal(certaintyOf('Replace the O-ring.'), null);
});

test('확신 실습: 정답 = 규칙, 네 등급이 모두 나온다', () => {
  for (const it of CERTAINTY_ITEMS) assert.equal(certaintyOf(it.en), it.ans, it.en);
  for (const l of CERTAINTY_LEVELS) assert.ok(CERTAINTY_ITEMS.some((x) => x.ans === l.id), l.id);
});

test('원인 좁히기: 사례마다 의도한 결론, 여섯 결론이 모두 나온다', () => {
  const got = Object.fromEntries(TS_CASES.map((c) => [c.id, tsNarrow(c.obs).verdict]));
  assert.deepEqual(got, { A: 'leak', B: 'gauge', C: 'outgas', D: 'more', E: 'turbo', F: 'escalate' });
  for (const v of TS_VERDICTS) assert.ok(Object.values(got).includes(v.id), v.id);
});

test('원인 좁히기: 세정 뒤 시간 기준(교재 12 h) · 미확인은 지우지 않는다', () => {
  assert.equal(OUTGAS_HOURS, 12);
  const base = { gaugeAgree: true, turboOk: true, heLeak: 'none' };
  assert.equal(tsNarrow({ ...base, hoursSinceClean: 13, rorTrend: 'decreasing' }).st.outgas, 'ruledOut');
  assert.equal(tsNarrow({ ...base, hoursSinceClean: 12, rorTrend: 'decreasing' }).st.outgas, 'confirmed');
  assert.equal(tsNarrow({ ...base, hoursSinceClean: 5, rorTrend: null }).st.outgas, 'open');
  assert.equal(tsNarrow({ gaugeAgree: null, turboOk: null, hoursSinceClean: null, heLeak: null }).verdict, 'more');
});

test('교재 트러블슈팅 표 = 엔진 후보(순서 · 확인 문장)', () => {
  const sheet = W12.slides.find((s) => s.type === 'mansample' && s.variant === 'parts');
  assert.deepEqual(sheet.rows.map((r) => r[1]), TS_CAUSES.map((c) => c.en));
  sheet.rows.forEach((r, i) => assert.equal(r[2], TS_CAUSES[i].check));
});

test('관리도 규칙: 경계·연속 규칙이 교재와 같다', () => {
  assert.equal(SPC_RUN_N, 8); assert.equal(SPC_TREND_N, 6);
  assert.deepEqual(spcCheck([100, 106, 94]), []); // 한계 위의 점은 밖이 아니다
  assert.deepEqual(spcCheck([100, 106.1]), ['rule1']);
  assert.deepEqual(spcCheck([101, 101, 101, 101, 101, 101, 101]), []); // 7점은 아직
  assert.deepEqual(spcCheck([101, 101, 101, 101, 101, 101, 101, 101]), ['rule2']);
  assert.deepEqual(spcCheck([101, 101, 101, 101, 100, 101, 101, 101, 101]), []); // 중심선이 쏠림을 끊는다
  assert.deepEqual(spcCheck([95, 96, 97, 98, 99, 99.5]), ['rule3']);
  assert.deepEqual(spcCheck([95, 96, 97, 98, 99]), []);
});

test('관리도 사례: 네 답이 모두 나오고, OOC 이면서 규격 안 / 규격 밖이 둘 다 있다', () => {
  const ans = SPC_CASES.map((c) => spcAnswer(c));
  for (const o of SPC_ANSWERS) assert.ok(ans.includes(o.id), o.id);
  assert.ok(SPC_CASES.some((c) => spcCheck(c.pts).length && spcInSpec(c.pts)), 'OOC 지만 규격 안');
  assert.ok(SPC_CASES.some((c) => !spcInSpec(c.pts)), 'OOS');
});

test('교재 수치 = 엔진 차트, 교재 퀴즈 판단이 엔진과 맞다', () => {
  const text = JSON.stringify(W12);
  assert.ok(text.includes(`${SPC_CHART.cl} / ${SPC_CHART.ucl} / ${SPC_CHART.lcl} nm/min`));
  assert.ok(text.includes(`${SPC_CHART.lsl} ~ ${SPC_CHART.usl} nm/min`));
  const q = W12.slides.filter((s) => s.type === 'quiz').flatMap((s) => s.questions);
  const f = (needle) => q.find((x) => x.prompt.includes(needle));
  const p = f('107 nm/min'); assert.match(p.opts[p.ans], /규격 안/);
  assert.deepEqual(spcCheck([107]), ['rule1']); assert.equal(spcInSpec([107]), true);
  const r = f('8점 연속'); assert.match(r.opts[r.ans], /Rule 2/);
  const m = f("'The gauge may be drifting.'"); assert.match(m.opts[m.ans], /가능성/);
  assert.equal(certaintyOf('The gauge may be drifting.'), 'possible');
  const pos = q.map((x) => x.ans); for (const k of [0, 1, 2]) assert.ok(pos.filter((x) => x === k).length >= 3);
});

test('실습 슬라이드는 등록된 화면만, 예시라고 밝힌다', () => {
  assert.deepEqual(W12.slides.filter((s) => s.type === 'sim').map((s) => `${s.which}:${s.mode}`), ['trouble:certainty', 'trouble:narrow', 'trouble:spc']);
  assert.ok(JSON.stringify(W12).includes('교재 예시'));
});
