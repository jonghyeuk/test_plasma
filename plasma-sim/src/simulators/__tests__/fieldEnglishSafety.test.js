/* 9강 안전 작업 실습 — 판정 규칙 잠금 (node --test, 의존성 없음)
   교재 본문(src/data/fieldEnglishChapters.data.js 의 w9)과 실습 엔진이 같은 말을 하는지도 함께 본다. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  modalClass, MODAL_ITEMS, MODAL_CLASSES, modalJudge,
  LOTO_CARDS, lotoInit, lotoAct, lotoAvailable,
  GAS_TLV, GAS_CASES, gasLevel, gasAction, toPpm,
} from '../fieldEnglishLabs.js';
import { CONTENT_CHAPTERS } from '../../data/fieldEnglishChapters.data.js';

const W9 = CONTENT_CHAPTERS.find((c) => c.id === 'w9');

test('조동사 → 무게: 교재 규칙', () => {
  assert.equal(modalClass('The operator shall wear gloves.'), 'required');
  assert.equal(modalClass('You must lock the breaker.'), 'required');
  assert.equal(modalClass('Personnel must not work alone.'), 'prohibited');
  assert.equal(modalClass('The RF shall not be energized.'), 'prohibited');
  assert.equal(modalClass('Leak checks should be performed.'), 'recommended');
  assert.equal(modalClass('The technician may use a digital wrench.'), 'permitted');
  assert.equal(modalClass('The tool need not be vented.'), 'notRequired');
  assert.equal(modalClass('The tool needn’t be vented.'), 'notRequired');
  assert.equal(modalClass('Visitors may not enter.'), 'ambiguous'); // 교재: may not 은 애매 — 묻는다
  assert.equal(modalClass('Close the valve.'), null);
});

test('실습 문장의 정답 = 규칙이 낸 답, 다섯 무게가 모두 나온다', () => {
  for (const it of MODAL_ITEMS) assert.equal(modalClass(it.en), it.ans, it.en);
  const used = new Set(MODAL_ITEMS.map((x) => x.ans));
  for (const c of MODAL_CLASSES) assert.ok(used.has(c.id), `${c.id} 문항이 없다`);
  assert.equal(modalJudge('m5', 'prohibited').ok, false); // need not ≠ 금지 — 이 강의 핵심 함정
  assert.equal(modalJudge('m5', 'notRequired').ok, true);
});

test('교재 퀴즈의 조동사 문항이 같은 규칙과 맞는다', () => {
  const q = W9.slides.filter((s) => s.type === 'quiz').flatMap((s) => s.questions);
  const pick = (needle) => q.find((x) => x.prompt.includes(needle));
  const cases = [
    ['A second person shall be present', 'required', /반드시/],
    ['need not be vented', 'notRequired', /하지 않아도/],
    ['should be performed at the start', 'recommended', /권장/],
  ];
  for (const [needle, cls, re] of cases) {
    const it = pick(needle); assert.ok(it, needle);
    assert.equal(modalClass(it.prompt.match(/'([^']+)'/)[1]), cls);
    assert.match(it.opts[it.ans], re);
  }
});

test('LOTO: 정답 순서로 끝까지 가면 실수 0 · 마지막에 finished', () => {
  let s = lotoInit();
  const order = ['notify', 'shutdown', 'isoMain', 'isoRf', 'isoCda', 'isoGas', 'lock', 'bleed', 'purge', 'verify', 'work'];
  for (const id of order) { const r = lotoAct(s, id); assert.equal(r.ok, true, id); s = r.s; }
  assert.equal(s.finished, true); assert.equal(s.mistakes, 0);
});

test('LOTO: 일찍 누르면 거절 + 이유, 상태는 그대로', () => {
  let s = lotoInit();
  for (const id of ['shutdown', 'isoMain', 'lock', 'verify', 'work']) {
    const r = lotoAct(s, id);
    assert.equal(r.ok, false, id); assert.equal(r.s.done.length, 0);
    assert.ok(r.log.some((l) => l.t === 'INFO' && l.m.length > 10));
    s = r.s;
  }
  assert.equal(s.mistakes, 5);
});

test('LOTO: RF 를 빼먹으면 잠금이 안 된다(교재: RF 는 자체 차단기)', () => {
  let s = lotoInit();
  for (const id of ['notify', 'shutdown', 'isoMain', 'isoCda', 'isoGas']) s = lotoAct(s, id).s;
  assert.equal(lotoAct(s, 'lock').ok, false);
  assert.deepEqual(lotoAvailable(s), ['isoRf']);
});

test('LOTO: 지름길 카드는 언제나 거절', () => {
  let s = lotoInit();
  for (const id of LOTO_CARDS.filter((c) => !c.trap).map((c) => c.id).slice(0, 6)) s = lotoAct(s, id).s;
  for (const t of LOTO_CARDS.filter((c) => c.trap)) assert.equal(lotoAct(s, t.id).ok, false, t.id);
});

test('LOTO 카드 단계 = 교재 6단계(1~6) + 작업 시작(7)', () => {
  const steps = new Set(LOTO_CARDS.filter((c) => !c.trap).map((c) => c.step));
  assert.deepEqual([...steps].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7]);
});

test('가스 경보: 경계값은 이상(≥), ppb 는 1/1000', () => {
  assert.equal(toPpm(3, 'ppb'), 0.003);
  assert.equal(gasLevel('Cl2', 0.049), 'NORMAL');
  assert.equal(gasLevel('Cl2', 0.05), 'WARNING');
  assert.equal(gasLevel('Cl2', 0.1), 'ALARM');
  assert.equal(gasLevel('AsH3', 5, 'ppb'), 'ALARM');
  assert.equal(gasLevel('AsH3', 5, 'ppm'), 'ALARM');
  assert.equal(gasLevel('NF3', 5), 'WARNING');
  assert.equal(gasAction('NORMAL'), 'continue'); assert.equal(gasAction('WARNING'), 'stop'); assert.equal(gasAction('ALARM'), 'evacuate');
});

test('가스 사례: 세 단계가 모두 나오고 ppb 함정이 있다', () => {
  const lv = GAS_CASES.map((c) => gasLevel(c.gas, c.value, c.unit));
  for (const L of ['NORMAL', 'WARNING', 'ALARM']) assert.ok(lv.includes(L), L);
  assert.ok(GAS_CASES.some((c) => c.unit === 'ppb'));
});

test('교재 본문의 TLV 숫자 = 엔진의 TLV', () => {
  const text = JSON.stringify(W9);
  assert.match(text, /Cl2 \*\*0\.1 ppm\*\*/); assert.equal(GAS_TLV.Cl2, 0.1);
  assert.match(text, /SiH4 \*\*5 ppm\*\*/); assert.equal(GAS_TLV.SiH4, 5);
  assert.match(text, /AsH3 \*\*0\.005 ppm\*\*/); assert.equal(GAS_TLV.AsH3, 0.005);
  assert.match(text, /TLV-TWA 0\.1 ppm/);
});

test('교재 그림의 경보 숫자가 실습 설정과 맞는다', () => {
  const figs = W9.slides.flatMap((s) => s.figs || []).filter((f) => f.kind === 'alarm');
  for (const f of figs) {
    const m = f.en.match(/Cl2 ([\d.]+) ppm — LEVEL (\d)/); assert.ok(m, f.en);
    assert.equal(gasLevel('Cl2', +m[1]), m[2] === '2' ? 'ALARM' : 'WARNING', f.en);
  }
});

test('실습 슬라이드는 등록된 화면만 가리킨다', () => {
  const sims = W9.slides.filter((s) => s.type === 'sim');
  assert.deepEqual(sims.map((s) => `${s.which}:${s.mode}`), ['safety:modal', 'safety:loto', 'safety:gas']);
});
