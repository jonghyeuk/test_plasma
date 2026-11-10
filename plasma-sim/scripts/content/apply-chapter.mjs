#!/usr/bin/env node
/* ═══ 현장 실무영어 — 강 원고를 데이터 파일에 끼워 넣기 ═══
   scripts/content/field-english-wNN.mjs (강 하나의 원고) → src/data/fieldEnglishChapters.data.js 의 같은 id 자리.
   다른 강은 한 글자도 바꾸지 않는다(데이터 파일은 JSON.stringify(…, null, 1) 형식이라 읽어서 다시 쓰면 바이트가 같다 — 처음에 확인한다).
   사용: node scripts/content/apply-chapter.mjs w09 [w10 …] */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.resolve(HERE, '../../src/data/fieldEnglishChapters.data.js');
const ids = process.argv.slice(2);
if (!ids.length) { console.error('사용: node scripts/content/apply-chapter.mjs w09'); process.exit(1); }

const src = fs.readFileSync(DATA, 'utf8');
const head = src.slice(0, src.indexOf('export const CONTENT_CHAPTERS'));
const render = (arr) => `${head}export const CONTENT_CHAPTERS = ${JSON.stringify(arr, null, 1)};\n`;
const { CONTENT_CHAPTERS } = await import(pathToFileURL(DATA).href + `?t=${Date.now()}`);
if (render(CONTENT_CHAPTERS) !== src) { console.error('데이터 파일이 예상한 형식이 아닙니다 — 손으로 고친 흔적이 있으면 먼저 확인하세요.'); process.exit(1); }

const next = CONTENT_CHAPTERS.slice();
for (const raw of ids) {
  const nn = raw.replace(/^w/, '').padStart(2, '0');
  const file = path.join(HERE, `field-english-w${nn}.mjs`);
  const { default: ch } = await import(pathToFileURL(file).href + `?t=${Date.now()}`);
  const at = next.findIndex((c) => c.id === ch.id);
  if (at < 0) { console.error(`데이터에 ${ch.id} 자리가 없습니다`); process.exit(1); }
  console.log(`${ch.id}: 「${next[at].title}」 ${next[at].slides.length}장 → 「${ch.title}」 ${ch.slides.length}장`);
  next[at] = JSON.parse(JSON.stringify(ch)); // undefined 필드 제거 · 순수 JSON
}
fs.writeFileSync(DATA, render(next));
console.log('저장:', path.relative(process.cwd(), DATA));
