#!/usr/bin/env node
/* ═══ 현장 실무영어 9강 「오늘의 현장」 배경 장면 (900×250 인라인 SVG) ═══
   다른 강의 장면(src/data/fieldEnglishSceneBg.data.js — 원래 scene_bg.js 로 구웠고 그 생성기는 이 저장소에 없다)과
   같은 어휘로 그린다: 종이 배경 그라디언트 · 점 무늬(d1/d2/ds) · 잉크 선 #1a1712 · 호박색 강조 #d38a25 · 방진복 인물 · 가장자리 비네트.
   장면: 가스 구역 — VMB-3 캐비닛과 배관, 벽의 가스 감지기(TGM-03) 'Cl2 0.06 ppm · LEVEL 1' 과 경광등,
         허가서 클립보드를 든 작업자, 밸브 손잡이에 건 자물쇠·표찰.
   사용: node scripts/content/scene-bg-w09.mjs   → 데이터 파일의 w9 자리만 바꾼다 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.resolve(HERE, '../../src/data/fieldEnglishSceneBg.data.js');
const { SCENEBG } = await import(pathToFileURL(DATA).href);

// 다른 장면과 같은 defs(무늬·그라디언트·애니메이션)를 w7 에서 그대로 가져온다 — 두 벌로 손으로 옮겨 적지 않는다
const defs = SCENEBG.w7.match(/<defs>[\s\S]*?<\/defs>/)[0];
const INK = '#1a1712', AMB = '#d38a25', PAPER = '#f2ebd9';

const parts = [];
const add = (s) => parts.push(s);
// 바닥 · 조명
add(`<rect width="900" height="250" rx="10" fill="url(#bgv)"/><ellipse cx="450" cy="8" rx="360" ry="70" fill="url(#lamp)" opacity="0.5"/>`);
add(`<rect x="0" y="198" width="900" height="52" fill="url(#flr)"/><rect x="0" y="198" width="900" height="52" fill="url(#d1)"/><path d="M0 198 L900 198" stroke="${INK}" stroke-width="2"/><path d="M0 199 L900 199" stroke="#fff" stroke-width="1" opacity="0.3"/>`);
add(`<g stroke="#4a443a" stroke-width="1" opacity="0.28"><path d="M150 198 L0 250"/><path d="M340 198 L285 250"/><path d="M560 198 L615 250"/><path d="M750 198 L900 250"/></g>`);
// 천장에서 내려오는 배관 셋 → VMB
add(`<g fill="none" stroke="${INK}" stroke-width="2.6"><path d="M92 0 L92 52"/><path d="M118 0 L118 52"/><path d="M144 0 L144 52"/></g>`);
add(`<g fill="none" stroke="${PAPER}" stroke-width="1" opacity="0.6"><path d="M91 0 L91 52"/><path d="M117 0 L117 52"/><path d="M143 0 L143 52"/></g>`);
// VMB 캐비닛
add(`<rect x="60" y="52" width="120" height="146" rx="5" fill="url(#steel)" stroke="${INK}" stroke-width="3"/>`);
add(`<rect x="60" y="52" width="120" height="146" rx="5" fill="url(#d2)" opacity="0.5"/>`);
add(`<rect x="74" y="70" width="92" height="74" rx="3" fill="#eef4f2" stroke="${INK}" stroke-width="2.4"/>`);
// 창 안의 밸브 셋 (나비 기호) + 세로 배관
for (const [i, x] of [92, 118, 144].entries()) {
  add(`<path d="M${x} 70 L${x} 144" stroke="${INK}" stroke-width="2"/>`);
  const y = 96 + (i % 2) * 14;
  add(`<path d="M${x - 7} ${y - 6} L${x + 7} ${y + 6} L${x + 7} ${y - 6} L${x - 7} ${y + 6} Z" fill="${i === 0 ? AMB : PAPER}" stroke="${INK}" stroke-width="1.8"/>`);
}
add(`<rect x="66" y="156" width="54" height="16" rx="3" fill="${INK}"/><text x="93" y="167.5" text-anchor="middle" font-family="'Trebuchet MS',monospace" font-size="9.5" font-weight="800" fill="${PAPER}" letter-spacing="1">VMB-3</text>`);
add(`<circle cx="160" cy="164" r="5" fill="${AMB}" stroke="${INK}" stroke-width="1.8" class="fesLed"/>`);
// 밸브 손잡이 + 자물쇠·표찰 (캐비닛 오른쪽 아래 배관)
add(`<path d="M180 120 L222 120 L222 198" fill="none" stroke="${INK}" stroke-width="2.6"/>`);
add(`<rect x="208" y="132" width="28" height="9" rx="3" fill="${AMB}" stroke="${INK}" stroke-width="2"/>`);
add(`<path d="M218 141 Q218 151 226 151 Q234 151 234 141" fill="none" stroke="${INK}" stroke-width="2.2"/>`);
add(`<rect x="218" y="149" width="17" height="15" rx="2.5" fill="#c94a3a" stroke="${INK}" stroke-width="2"/><circle cx="226.5" cy="156" r="1.8" fill="${INK}"/>`);
add(`<path d="M230 164 L236 172" stroke="${INK}" stroke-width="1.4"/>`);
add(`<g transform="rotate(-10 248 186)"><rect x="232" y="170" width="34" height="24" rx="2" fill="${PAPER}" stroke="${INK}" stroke-width="1.8"/><rect x="232" y="170" width="34" height="7" fill="#c94a3a"/><text x="249" y="188" text-anchor="middle" font-family="monospace" font-size="6.5" font-weight="800" fill="${INK}">LOCKED</text></g>`);
// 벽의 가스 감지기(TGM) + 경광등
add(`<circle cx="396" cy="34" r="16" fill="${AMB}" opacity="0.45" filter="url(#soft2)" class="fesBeacon"/>`);
add(`<path d="M386 44 L388 30 Q396 20 404 30 L406 44 Z" fill="${AMB}" stroke="${INK}" stroke-width="2.4" class="fesBeacon"/><rect x="382" y="44" width="28" height="6" rx="2" fill="${INK}"/>`);
add(`<rect x="337" y="57" width="126" height="66" rx="6" class="fesScr" fill="${AMB}" opacity="0.28" filter="url(#soft)"/>`);
add(`<rect x="340" y="60" width="120" height="60" rx="4" fill="#eef4f2" stroke="${INK}" stroke-width="2.6"/><rect x="340" y="60" width="120" height="13" fill="url(#ds)"/>`);
add(`<text x="348" y="70" font-family="monospace" font-size="8.6" font-weight="700" fill="${INK}">TGM-03 · VMB-3</text>`);
add(`<text x="348" y="89" font-family="monospace" font-size="12" font-weight="800" fill="${INK}">Cl2 0.06 ppm</text>`);
add(`<rect x="347" y="96" width="74" height="16" rx="3" fill="${AMB}" stroke="${INK}" stroke-width="1.6"/><text x="384" y="107.5" text-anchor="middle" font-family="monospace" font-size="9" font-weight="800" fill="${INK}">LEVEL 1</text>`);
// 작업자(방진복 — 다른 장면의 인물 그대로) + 허가서 클립보드
const fig = SCENEBG.w7.match(/<g transform="translate\(255 198\) scale\(0\.72 0\.72\)">([\s\S]*?)<\/g>/)[1];
add(`<ellipse cx="520" cy="201" rx="18.72" ry="4.32" fill="${INK}" opacity="0.22" filter="url(#soft)"/>`);
add(`<g transform="translate(520 198) scale(0.72 0.72)">${fig}</g>`);
add(`<g transform="rotate(-12 486 150)"><rect x="470" y="128" width="34" height="44" rx="3" fill="${PAPER}" stroke="${INK}" stroke-width="2.4"/><rect x="480" y="124" width="14" height="7" rx="2" fill="${INK}"/>`
  + `<text x="487" y="142" text-anchor="middle" font-family="monospace" font-size="7" font-weight="800" fill="${INK}">PTW</text>`
  + `<path d="M476 149 L498 149 M476 156 L498 156 M476 163 L492 163" stroke="${INK}" stroke-width="1.2" opacity="0.7"/></g>`);
// 오른쪽: 가스 캐비닛 둘(배경)
for (const x of [640, 720]) {
  add(`<rect x="${x}" y="70" width="64" height="128" rx="4" fill="url(#steel)" stroke="${INK}" stroke-width="2.6"/><rect x="${x + 10}" y="84" width="44" height="40" rx="2" fill="#eef4f2" stroke="${INK}" stroke-width="2"/>`);
  add(`<rect x="${x + 22}" y="132" width="20" height="52" rx="9" fill="url(#d2)" stroke="${INK}" stroke-width="2"/>`);
}
add(`<rect x="652" y="96" width="40" height="14" rx="2" fill="${INK}"/><text x="672" y="106.5" text-anchor="middle" font-family="monospace" font-size="8" font-weight="800" fill="${PAPER}">Cl2</text>`);
add(`<rect x="732" y="96" width="40" height="14" rx="2" fill="${INK}"/><text x="752" y="106.5" text-anchor="middle" font-family="monospace" font-size="8" font-weight="800" fill="${PAPER}">SiH4</text>`);
// 꼬리표 · 띠 (다른 장면과 같은 자리)
add(`<g><rect x="764" y="16" width="116" height="28" rx="6" fill="${AMB}" stroke="${INK}" stroke-width="2"/><text x="822" y="34.5" text-anchor="middle" font-family="'Trebuchet MS',monospace" font-size="12.5" font-weight="800" fill="${INK}">LINE BREAK</text></g>`);
add(`<g><rect x="20" y="214" width="268" height="23" rx="4" fill="${INK}"/><text x="30" y="229.5" font-family="'Trebuchet MS',sans-serif" font-size="11" font-weight="700" letter-spacing="1.4" fill="${PAPER}">GAS AREA · PERMIT TO WORK · LOTO</text></g>`);
add(`<rect width="900" height="250" rx="10" fill="url(#vig)"/><rect x="1" y="1" width="898" height="248" rx="9" fill="none" stroke="${INK}" stroke-width="1.4" opacity="0.35"/>`);

const svg = `<svg viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">${defs}${parts.join('')}</svg>`;
const src = fs.readFileSync(DATA, 'utf8');
const line = ` w9: ${JSON.stringify(svg)},`;
const re = /^ w9: ".*",$/m;
if (!re.test(src)) { console.error('데이터 파일에 w9 줄이 없습니다'); process.exit(1); }
fs.writeFileSync(DATA, src.replace(re, () => line));
if (process.argv.includes('--out')) fs.writeFileSync(process.argv[process.argv.indexOf('--out') + 1], svg);
console.log(`w9 장면 ${svg.length}자`);
