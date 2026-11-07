/* 강의 듣기 대본 · 펜 표시 · 매니페스트 잠금 (node --test)
   - 대본의 펜 표시가 가리키는 글이 그 슬라이드에 실제로 있다(몇 번째인지까지)
   - 대본의 슬라이드 번호·종류가 교재와 맞는다
   - 매니페스트가 대본과 같은 판이다(대본을 고치고 빌드를 안 돌리면 여기서 걸린다)
   화면에서 정말 그 글자 위에 그려지는지는 scripts/narration/check-pen.mjs(브라우저)가 본다. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { parseLecture, slideSig, slidePlainText, nthIndexOf, PEN_KINDS } from '../fieldEnglishLecture.js';
import { CONTENT_CHAPTERS } from '../fieldEnglishChapters.data.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const NARR = path.join(ROOT, 'scripts/narration');
const scripts = fs.readdirSync(NARR).filter((f) => /^field-english-w\d+\.lecture\.json$/.test(f))
  .map((f) => ({ f, J: JSON.parse(fs.readFileSync(path.join(NARR, f), 'utf8')) }));
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/fieldEnglishLecture.manifest.json'), 'utf8'));

test('표시 해석: 소리에서 빠지고, 위치는 다음 말의 첫 글자', () => {
  const { spoken, cues } = parseLecture('여기 {{o:shall#2}}shall 을 보세요. {{u:A B}} 다음');
  assert.equal(spoken, '여기 shall 을 보세요. 다음');
  assert.deepEqual(cues[0], { at: 3, k: 'o', x: 'shall', n: 2 });
  assert.equal(spoken[cues[1].at], '다');
  assert.equal(parseLecture('{{h:X}} 첫 말').cues[0].at, 0);
});

test('대본이 있다', () => { assert.ok(scripts.length >= 1); });

for (const { f, J } of scripts) {
  const ch = CONTENT_CHAPTERS.find((c) => c.id === J.chapter);
  test(`${f}: 슬라이드 번호·종류가 교재와 맞고 모든 슬라이드에 대본이 있다`, () => {
    assert.ok(ch, J.chapter);
    assert.deepEqual(J.slides.map((s) => s.i), ch.slides.map((_, i) => i));
    J.slides.forEach((s) => assert.equal(ch.slides[s.i].type, s.type, `#${s.i}`));
  });
  test(`${f}: 펜 표시 글이 그 슬라이드에 있다(몇 번째까지)`, () => {
    for (const s of J.slides) {
      const text = slidePlainText(ch.slides[s.i]);
      const { spoken, cues } = parseLecture(s.say);
      assert.ok(!/\{\{|\}\}/.test(spoken), `#${s.i}: 닫히지 않은 표시`);
      for (const c of cues) {
        assert.ok(PEN_KINDS[c.k]);
        assert.ok(nthIndexOf(text, c.x, c.n) >= 0, `#${s.i} ${c.k}:${c.x}#${c.n} 가 본문에 없다`);
      }
    }
  });
  test(`${f}: 매니페스트가 이 대본의 현재 판이다`, () => {
    const entries = MANIFEST[J.chapter] || []; // 아직 음성을 하나도 못 만든 강 — 전부 아래 '음성 없음'(TODO)으로 센다
    for (const s of J.slides) {
      const e = entries.find((x) => x.i === s.i);
      if (!e) continue; // 아직 음성이 없는 슬라이드 — 아래 '음성 없음' 항목(TODO)이 따로 센다

      const { spoken, cues } = parseLecture(s.say);
      const h = crypto.createHash('sha1').update(`${J.voice}|${J.model}|${spoken}`, 'utf8').digest('hex').slice(0, 10);
      assert.equal(e.h, h, `#${s.i}: 대본이 바뀌었다 — 빌드를 다시 돌리세요`);
      assert.equal(e.sig, slideSig(ch.slides[s.i]), `#${s.i}: 슬라이드 서명`);
      assert.deepEqual(e.cues.map((c) => `${c.k}:${c.x}#${c.n}`), cues.map((c) => `${c.k}:${c.x}#${c.n}`), `#${s.i}: 펜 표시`);
      for (let k = 1; k < e.cues.length; k += 1) assert.ok(e.cues[k].t >= e.cues[k - 1].t, `#${s.i}: 펜 시각이 거꾸로`);
      assert.ok(e.cues.every((c) => c.t >= 0 && c.t <= e.sec), `#${s.i}: 펜 시각이 음성 밖`);
      assert.ok(fs.existsSync(path.join(ROOT, 'public/audio/field-english/lecture', `${e.h}.mp3`)), `#${s.i}: mp3 없음`);
    }
    assert.ok(!entries.some((e) => !J.slides.find((s) => s.i === e.i)), '대본에 없는 슬라이드가 매니페스트에 있다');
  });
  /* 음성이 빠진 슬라이드(예: 일레븐랩스 크레딧 소진)는 실패가 아니라 '할 일'로 센다 — 화면에는 강의 듣기 버튼이 안 붙을 뿐 틀린 것을 보이지 않는다.
     빠진 것이 있으면 이 항목이 TODO 로 뜨고 목록을 보여 준다. 빌드를 다시 돌리면 빠진 것만 만든다. */
  const missing = J.slides.filter((s) => !(MANIFEST[J.chapter] || []).find((x) => x.i === s.i)).map((s) => s.i);
  test(`${f}: 음성 없음 ${missing.length ? missing.join(', ') : '— 없음'}`, { todo: missing.length ? `음성 빠짐 ${missing.length}장 — node scripts/narration/field-english-lecture-build.mjs ${J.chapter}` : false }, () => {
    assert.deepEqual(missing, []);
  });
}
