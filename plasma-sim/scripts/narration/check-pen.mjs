#!/usr/bin/env node
/* ═══ 현장 실무영어 — 강의 듣기 펜 점검(브라우저) ═══
   실제 화면에서 각 슬라이드의 펜 표시 글을 찾는지(= 그 글자 위에 그어지는지) 본다.
   데이터 수준 점검(node --test 의 fieldEnglishLecture.test.js)이 못 잡는 것 — 화면이 글을 다르게 그리는 경우
   (장식 · 버튼 · 접힌 글 · 실습 화면 안의 글) — 를 잡는다.
   사용: (다른 창에서) npm run dev   →   node scripts/narration/check-pen.mjs w9 [--shots=DIR] [--url=http://localhost:5174]
   --shots 를 주면 슬라이드마다 강의를 끝까지 돌린 상태(펜 자국이 모두 남은 상태)를 찍는다. */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const args = process.argv.slice(2);
const opt = (n, d) => { const a = args.find((x) => x.startsWith(`--${n}=`)); return a ? a.slice(n.length + 3) : d; };
const chapter = args.find((a) => !a.startsWith('--')) || 'w9';
const URL = opt('url', 'http://localhost:5174');
const SHOTS = opt('shots', '');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/fieldEnglishLecture.manifest.json'), 'utf8'));
const entries = manifest[chapter] || []; // 음성이 아직 하나도 없으면 아래에서 대본의 펜 표시 위치만 본다

// 화면과 같은 찾기 함수를 페이지에 심는다(모듈 export 를 걷어 전역으로)
const penSrc = fs.readFileSync(path.join(ROOT, 'src/simulators/fieldEnglishPen.js'), 'utf8')
  .replace(/^export /gm, '');
const init = `${penSrc}\nwindow.__fesPen = { findTextRects };
(() => { const A = window.Audio; window.Audio = function (...a) { const x = new A(...a); window.__lastAudio = x; return x; }; window.Audio.prototype = A.prototype; })();`;

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(init);
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(URL, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /현장 실무영어/ }).first().click();
await page.getByRole('button', { name: /Chapters/ }).first().click();
const chNo = Number(chapter.replace('w', ''));
await page.locator('.fes-ppt-chip').nth(chNo - 1).click();
await page.waitForSelector('.fes-ld-body');
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

let missing = 0, total = 0;
for (const e of entries) {
  await page.locator('.fes-ld-dot').nth(e.i).click();
  await page.waitForTimeout(250);
  const res = await page.evaluate((cues) => {
    const body = document.querySelector('.fes-ld-body');
    return cues.map((c) => window.__fesPen.findTextRects(body, c.x, c.n).length);
  }, e.cues);
  const btn = await page.locator('.fes-slide-audio', { hasText: '강의 듣기' }).count();
  total += e.cues.length;
  const miss = e.cues.filter((_, j) => !res[j]);
  missing += miss.length;
  console.log(`#${e.i} ${btn ? '강의 듣기 ✔' : '강의 듣기 버튼 없음 ✘'} · 펜 ${e.cues.length - miss.length}/${e.cues.length}${miss.length ? ' — 못 찾음: ' + miss.map((c) => `${c.k}:${c.x}#${c.n}`).join(' | ') : ''}`);
  if (!btn) missing += 1;
  if (SHOTS && btn) {
    await page.locator('.fes-slide-audio', { hasText: '강의 듣기' }).click();
    await page.waitForFunction(() => window.__lastAudio && window.__lastAudio.readyState >= 1, null, { timeout: 15000 });
    await page.evaluate(() => { const a = window.__lastAudio; a.currentTime = Math.max(0, a.duration - 0.2); });
    await page.waitForSelector('.fes-slide-audio:has-text("강의 듣기")', { timeout: 15000 }); // 끝나면 버튼이 돌아온다
    await page.waitForTimeout(300);
    // 자국이 제 글자 위에 있는가 — 펜 층은 하나, 자국 수 = 표시 수, 자국마다 그 글 상자와 겹친다
    const place = await page.evaluate((cues) => {
      const body = document.querySelector('.fes-ld-body');
      const pens = body.querySelectorAll('.fes-pen');
      if (pens.length !== 1) return { err: `펜 층 ${pens.length}개` };
      const marks = Array.from(pens[0].children);
      if (marks.length !== cues.length) return { err: `자국 ${marks.length} ≠ 표시 ${cues.length}` };
      const bad = [];
      marks.forEach((m, j) => {
        const bb = m.getBBox();
        const rs = window.__fesPen.findTextRects(body, cues[j].x, cues[j].n);
        const hit = rs.some((r) => bb.x < r.x + r.w + 12 && bb.x + bb.width > r.x - 12 && bb.y < r.y + r.h + 12 && bb.y + bb.height > r.y - 12);
        if (!hit) bad.push(cues[j].x);
      });
      return { bad };
    }, e.cues);
    if (place.err || place.bad.length) { missing += 1; console.log(`   ✘ 자리: ${place.err || place.bad.join(' | ')}`); }
    await page.locator('.fes-ld-body').evaluate((b) => { b.scrollTop = 0; });
    await page.locator('.fes-ld-slide').screenshot({ path: path.join(SHOTS, `${chapter}-${String(e.i).padStart(2, '0')}.png`) });
  }
}
// 음성이 아직 없는 슬라이드(매니페스트에 없음)도 대본의 펜 표시가 화면 글에 있는지는 미리 본다 — 음성만 만들면 바로 맞게 그어지도록
const { parseLecture } = await import(pathToFileURL(path.join(ROOT, 'src/data/fieldEnglishLecture.js')).href);
const nn = chapter.replace(/^w/, '').padStart(2, '0');
const scriptFile = path.join(HERE, `field-english-w${nn}.lecture.json`);
if (fs.existsSync(scriptFile)) {
  const J = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
  for (const sl of J.slides.filter((x) => !entries.find((e) => e.i === x.i))) {
    const cues = parseLecture(sl.say).cues;
    await page.locator('.fes-ld-dot').nth(sl.i).click();
    await page.waitForTimeout(250);
    const res = await page.evaluate((cs) => { const body = document.querySelector('.fes-ld-body'); return cs.map((c) => window.__fesPen.findTextRects(body, c.x, c.n).length); }, cues);
    const miss = cues.filter((_, j) => !res[j]);
    total += cues.length; missing += miss.length;
    console.log(`#${sl.i} (음성 없음) · 펜 ${cues.length - miss.length}/${cues.length}${miss.length ? ' — 못 찾음: ' + miss.map((c) => `${c.k}:${c.x}#${c.n}`).join(' | ') : ''}`);
    if (SHOTS) {
      // 음성이 없으면 펜이 그려지지 않으므로, 찾은 자리에 임시 상자(밑줄=빨강 · 동그라미=주황 · 형광펜=노랑)와 순번을 그려 찍는다 — '의도한 쪽'을 눈으로 확인하려고
      await page.evaluate((cs) => {
        const body = document.querySelector('.fes-ld-body');
        const layer = document.createElement('div'); layer.className = 'fes-pen-preview';
        Object.assign(layer.style, { position: 'absolute', left: 0, top: 0, pointerEvents: 'none', zIndex: 5 });
        const col = { u: '#ff5468', o: '#ff9f1c', h: '#ffd23f' };
        cs.forEach((c, j) => window.__fesPen.findTextRects(body, c.x, c.n).forEach((r, q) => {
          const d = document.createElement('div');
          Object.assign(d.style, { position: 'absolute', left: `${r.x - 2}px`, top: `${r.y - 2}px`, width: `${r.w + 4}px`, height: `${r.h + 4}px`, border: `2px solid ${col[c.k]}`, borderRadius: '4px' });
          if (q === 0) { const t = document.createElement('span'); t.textContent = String(j + 1); Object.assign(t.style, { position: 'absolute', left: '-14px', top: '-10px', font: '700 10px monospace', color: '#000', background: col[c.k], borderRadius: '6px', padding: '0 3px' }); d.appendChild(t); }
          layer.appendChild(d);
        }));
        body.appendChild(layer); body.scrollTop = 0;
      }, cues);
      await page.locator('.fes-ld-slide').screenshot({ path: path.join(SHOTS, `${chapter}-${String(sl.i).padStart(2, '0')}-preview.png`) });
      await page.evaluate(() => document.querySelectorAll('.fes-pen-preview').forEach((x) => x.remove()));
    }
  }
}
console.log(`\n펜 표시 ${total - missing}/${total} 화면에서 찾음${errors.length ? ` · 페이지 오류 ${errors.length}: ${errors[0]}` : ''}`);
await browser.close();
process.exit(missing || errors.length ? 1 : 0);
