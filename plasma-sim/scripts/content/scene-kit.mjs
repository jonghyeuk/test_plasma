/* ═══ 현장 실무영어 「오늘의 현장」 장면 그림 공용 손 (900×250 인라인 SVG) ═══
   2부(9강~)의 장면을 1~8강 장면(원래 scene_bg.js 로 구웠고 그 생성기는 이 저장소에 없다)과 같은 어휘로 그린다:
   종이 배경 그라디언트 · 점 무늬(d1/d2/ds) · 잉크 선 #1a1712 · 호박색 강조 #d38a25 · 방진복 인물 · 가장자리 비네트.
   무늬·그라디언트(defs)와 인물은 w7 장면에서 그대로 가져온다 — 두 벌로 손으로 옮겨 적지 않는다.
   강마다 scripts/content/scene-bg-wNN.mjs 가 이 손으로 소품만 그린다. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const DATA = path.resolve(HERE, '../../src/data/fieldEnglishSceneBg.data.js');
export const { SCENEBG } = await import(pathToFileURL(DATA).href);
export const INK = '#1a1712', AMB = '#d38a25', PAPER = '#f2ebd9';
const DEFS = SCENEBG.w7.match(/<defs>[\s\S]*?<\/defs>/)[0];
const FIG = SCENEBG.w7.match(/<g transform="translate\(255 198\) scale\(0\.72 0\.72\)">([\s\S]*?)<\/g>/)[1];

/** 종이 배경 · 위 조명 · 바닥 · 원근선 */
export function room() {
  return `<rect width="900" height="250" rx="10" fill="url(#bgv)"/><ellipse cx="450" cy="8" rx="360" ry="70" fill="url(#lamp)" opacity="0.5"/>`
    + `<rect x="0" y="198" width="900" height="52" fill="url(#flr)"/><rect x="0" y="198" width="900" height="52" fill="url(#d1)"/><path d="M0 198 L900 198" stroke="${INK}" stroke-width="2"/><path d="M0 199 L900 199" stroke="#fff" stroke-width="1" opacity="0.3"/>`
    + `<g stroke="#4a443a" stroke-width="1" opacity="0.28"><path d="M150 198 L0 250"/><path d="M340 198 L285 250"/><path d="M560 198 L615 250"/><path d="M750 198 L900 250"/></g>`;
}
/** 방진복 인물 — 바닥(y=198) 위 x 에 선다 */
export function person(x) {
  return `<ellipse cx="${x}" cy="201" rx="18.72" ry="4.32" fill="${INK}" opacity="0.22" filter="url(#soft)"/><g transform="translate(${x} 198) scale(0.72 0.72)">${FIG}</g>`;
}
/** 오른쪽 위 꼬리표 — 글자는 잉크색(호박색 바탕 위 대비 3:1 이상, 도안 검수기 [F1]) */
export function badge(text, w = 116) {
  const x = 880 - w;
  return `<g><rect x="${x}" y="16" width="${w}" height="28" rx="6" fill="${AMB}" stroke="${INK}" stroke-width="2"/><text x="${x + w / 2}" y="34.5" text-anchor="middle" font-family="'Trebuchet MS',monospace" font-size="12.5" font-weight="800" fill="${INK}">${text}</text></g>`;
}
/** 왼쪽 아래 띠 */
export function band(text, w) {
  return `<g><rect x="20" y="214" width="${w}" height="23" rx="4" fill="${INK}"/><text x="30" y="229.5" font-family="'Trebuchet MS',sans-serif" font-size="11" font-weight="700" letter-spacing="1.4" fill="${PAPER}">${text}</text></g>`;
}
/** 비네트 · 테두리 */
export function frame() {
  return `<rect width="900" height="250" rx="10" fill="url(#vig)"/><rect x="1" y="1" width="898" height="248" rx="9" fill="none" stroke="${INK}" stroke-width="1.4" opacity="0.35"/>`;
}
/** 조각들 → SVG, 데이터 파일의 그 강 줄만 바꾼다. --out 파일이 있으면 SVG 도 따로 쓴다(검수기·미리보기용) */
export function save(id, parts, argv = process.argv) {
  const svg = `<svg viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">${DEFS}${parts.join('')}</svg>`;
  const src = fs.readFileSync(DATA, 'utf8');
  const re = new RegExp(`^ ${id}: ".*",$`, 'm');
  if (!re.test(src)) { console.error(`데이터 파일에 ${id} 줄이 없습니다`); process.exit(1); }
  fs.writeFileSync(DATA, src.replace(re, () => ` ${id}: ${JSON.stringify(svg)},`));
  const o = argv.indexOf('--out');
  if (o >= 0) fs.writeFileSync(argv[o + 1], svg);
  console.log(`${id} 장면 ${svg.length}자`);
  return svg;
}
