/* 14강 종합 보고 · 15강 종합 점검 — 2부 반영 잠금 (node --test)
   - 14강 인계 항목 분류(옛 DRC 분류 자리) 규칙
   - 15강 퀴즈가 9~13강 엔진 규칙과 같은 답을 낸다
   - 직무영어 전 강에서 설계(DRC · LVS · Design Rule · 디자인) 내용이 빠졌다(담당자 2026-11-07: 설계는 따로 남기지 않는다) */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  handoverSeverity, HANDOVER_ROWS, HANDOVER_PROBLEM,
  modalClass, parseLimit, inLimit, certaintyOf, spcCheck, spcInSpec, readBackValue, severityOf,
} from '../fieldEnglishLabs.js';
import { CONTENT_CHAPTERS } from '../../data/fieldEnglishChapters.data.js';

const ch = (id) => CONTENT_CHAPTERS.find((c) => c.id === id);
const quiz = (id) => ch(id).slides.filter((s) => s.type === 'quiz').flatMap((s) => s.questions);
const ansOf = (q) => q.opts[q.ans];

test('14강 인계 분류: 안전 · 정지 · OOS = Critical, 나머지 Minor, 둘 다 나온다', () => {
  assert.equal(handoverSeverity({ safety: true }), 'Critical');
  assert.equal(handoverSeverity({ lineStop: true }), 'Critical');
  assert.equal(handoverSeverity({ oos: true }), 'Critical');
  assert.equal(handoverSeverity({}), 'Minor');
  const got = HANDOVER_ROWS.map((r) => handoverSeverity(r.f));
  assert.ok(got.includes('Critical') && got.includes('Minor'));
  const crit = HANDOVER_ROWS.filter((r) => handoverSeverity(r.f) === 'Critical').length;
  assert.match(HANDOVER_PROBLEM.opts[HANDOVER_PROBLEM.ans], new RegExp(`^${['', 'One', 'Two', 'Three', 'Four'][crit]} critical items`));
});

test('14강: 실습은 등록된 화면만, DRC 실습이 빠졌다', () => {
  const sims = ch('w14').slides.filter((s) => s.type === 'sim').map((s) => `${s.which}:${s.mode}`);
  assert.deepEqual(sims, ['equipment:shiftLog', 'report:handover', 'report:pcar']);
});

test('15강 ②: 9 · 10강 규칙과 같은 답', () => {
  const q = quiz('w15');
  const f = (needle) => q.find((x) => x.prompt.includes(needle));
  assert.equal(modalClass('The tool need not be vented for a software-only update.'), 'notRequired');
  assert.match(ansOf(f('need not be vented')), /하지 않아도/);
  assert.equal(inLimit(parseLimit('Reflected power must be below 20 W.'), 20), false);
  assert.match(ansOf(f('below 20 W')), /불합격/);
  assert.match(ansOf(f('unless an ECN')), /고칠 수 없다/);
});

test('15강 ③ · ④: 11~14강 규칙과 같은 답', () => {
  const q = quiz('w15');
  const f = (needle) => q.find((x) => x.prompt.includes(needle));
  assert.match(ansOf(f('SLURRY FLOW ALARM LIMIT')), /한계값/);
  assert.equal(certaintyOf('The leak is most likely at the lid O-ring.'), 'likely');
  assert.match(ansOf(f('most likely')), /확정 전/);
  assert.deepEqual(spcCheck([107]), ['rule1']); assert.equal(spcInSpec([107]), true);
  assert.match(ansOf(f('UCL(106)')), /OOC 지만 규격 안/);
  assert.match(ansOf(f('fifteen watts')), new RegExp(readBackValue('15')));
  assert.equal(severityOf({ down: true, workaround: false }), 'S1');
  assert.equal(ansOf(f('다른 장비가 없다')), 'S1');
});

test('15강: 퀴즈 정답 위치가 고르다', () => {
  const pos = quiz('w15').map((x) => x.ans);
  for (const k of [0, 1, 2]) assert.ok(pos.filter((x) => x === k).length >= 3, `정답 위치 ${k}`);
});

test('직무영어 전 강: 설계 내용이 남아 있지 않다', () => {
  // 칩 설계 주제만 — '50 Ω 로 설계되어'(5강) · '고객·설계가 정한다'(12강) 같은 일반 단어 '설계'는 잡지 않는다
  const DESIGN = /\bDRC\b|\bLVS\b|Design Rule|design rule|디자인|설계 검증|설계 영어|설계 파트|설계 엔지니어|레이아웃|tape-out|netlist|\bpoly\b|metal-1|METAL1/;
  for (const c of CONTENT_CHAPTERS) {
    c.slides.forEach((s, i) => {
      const m = JSON.stringify(s).match(DESIGN);
      assert.ok(!m, `${c.id}#${i} 에 설계 흔적: ${m && m[0]}`);
      if (s.type === 'sim') assert.ok(!['drc', 'lvs', 'layer'].includes(s.which), `${c.id}#${i} 설계 실습 ${s.which}`);
      assert.notEqual(s.type, 'eda', `${c.id}#${i} 설계 프로그램 화면`);
    });
  }
});
