/* 13강 벤더 소통 실습 — 판정 규칙 잠금 (node --test) */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  severityOf, SEVERITY_LEVELS, SEVERITY_CASES,
  NATO, readBackValue, readBackCode, READBACK_ITEMS, readBackOf, EMAIL_SLOTS,
  certaintyOf,
} from '../fieldEnglishLabs.js';
import { CONTENT_CHAPTERS } from '../../data/fieldEnglishChapters.data.js';

const W13 = CONTENT_CHAPTERS.find((c) => c.id === 'w13');

test('긴급도: 교재 예시 규칙', () => {
  assert.equal(severityOf({ down: true, workaround: false }), 'S1');
  assert.equal(severityOf({ down: true, workaround: true }), 'S2');
  assert.equal(severityOf({ down: false, waferRisk: true }), 'S2');
  assert.equal(severityOf({ down: false, waferRisk: false }), 'S3');
  assert.equal(severityOf({ question: true, down: true }), 'S4');
  const got = SEVERITY_CASES.map((c) => severityOf(c.f));
  for (const l of SEVERITY_LEVELS) assert.ok(got.includes(l.id), l.id);
});

test('되읽기: 한 자리씩 · point · E minus · 음성 기호', () => {
  assert.equal(readBackValue('15'), 'one-five');
  assert.equal(readBackValue('50'), 'five-zero');
  assert.equal(readBackValue('7'), 'seven');
  assert.equal(readBackValue('4.2'), 'four point two');
  assert.equal(readBackValue('1.0E-5'), 'one point zero E minus five');
  assert.equal(readBackValue('3E6'), 'three E six');
  assert.equal(readBackCode('KX-4071-B'), 'Kilo X-ray, four zero seven one, Bravo');
  assert.equal(readBackCode('sr-20618'), 'Sierra Romeo, two zero six one eight');
  assert.equal(Object.keys(NATO).length, 26);
  assert.throws(() => readBackValue('fifteen'));
});

test('되읽기 실습: 정답 = 규칙, 오답은 규칙과 다르다, 정답 위치가 고르다', () => {
  for (const it of READBACK_ITEMS) {
    assert.equal(it.opts[it.ans], readBackOf(it), it.id);
    it.opts.forEach((o, j) => { if (j !== it.ans) assert.notEqual(o, readBackOf(it), `${it.id} 오답이 정답과 같다`); });
  }
  const pos = READBACK_ITEMS.map((x) => x.ans); for (const k of [0, 1, 2]) assert.ok(pos.includes(k));
});

test('메일 칸: 정답 문장은 12강 확신 규칙을 지킨다(확인 안 한 것을 확정처럼 쓰지 않음)', () => {
  const checked = EMAIL_SLOTS.find((s) => s.id === 'checked');
  assert.equal(certaintyOf(checked.opts[checked.ans]), 'ruledOut'); // 배제가 먼저 잡힌다 — 문장 안에 suspected 도 있다
  assert.match(checked.opts[checked.ans], /is suspected/);
  const bad = checked.opts.find((o) => o === 'The O-ring is broken.'); assert.ok(bad, '근거 없는 단정 오답이 있다');
  const subject = EMAIL_SLOTS.find((s) => s.id === 'subject');
  assert.match(subject.opts[subject.ans], /^SR-\d+ \| [A-Z]+-\d+ \| .+ since \d\d:\d\d \| .+\(S\d\)$/); // Tool | Symptom | Since | Impact
  const pos = EMAIL_SLOTS.map((x) => x.ans); for (const k of [0, 1, 2]) assert.ok(pos.includes(k));
});

test('교재 메일 표본 = 실습 정답 메일(제목 · 확인 문장)', () => {
  const mail = W13.slides.find((s) => s.type === 'mansample' && s.variant === 'email');
  const subject = EMAIL_SLOTS.find((s) => s.id === 'subject');
  assert.equal(mail.subject, subject.opts[subject.ans]);
  assert.ok(mail.lines.some((l) => l.replace(/[[\]]/g, '').includes('A leak at the lid O-ring is suspected.')));
});

test('교재 퀴즈 판단이 엔진과 맞는다', () => {
  const q = W13.slides.filter((s) => s.type === 'quiz').flatMap((s) => s.questions);
  const f = (needle) => q.find((x) => x.prompt.includes(needle));
  const p = f("'KX-4071-B'"); assert.equal(p.opts[p.ans], readBackCode('KX-4071-B'));
  const s = f("'SR-20618'"); assert.equal(s.opts[s.ans], NATO.S);
  const pos = q.map((x) => x.ans); for (const k of [0, 1, 2]) assert.ok(pos.filter((x) => x === k).length >= 3);
});

test('실습 슬라이드는 등록된 화면만, 긴급도는 예시라고 밝힌다', () => {
  assert.deepEqual(W13.slides.filter((s) => s.type === 'sim').map((s) => `${s.which}:${s.mode}`), ['vendor:severity', 'vendor:readback', 'vendor:email']);
  assert.ok(JSON.stringify(W13).includes('교재 예시'));
  assert.ok(JSON.stringify(W13).includes('SLA'));
});
