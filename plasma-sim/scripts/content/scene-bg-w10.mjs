#!/usr/bin/env node
/* ═══ 현장 실무영어 10강 「오늘의 현장」 배경 장면 (900×250 인라인 SVG) ═══
   장면: 새벽의 식각 장비 — 장비 본체(챔버), 벽걸이 레시피 편집 화면(step table · RECIPE LOCKED),
         변경 요청서(ECR)를 든 작업자, 오른쪽 선반의 판 묶음(Rev B · C 보관 / Rev D 초안).
   공용 손: scripts/content/scene-kit.mjs.   사용: node scripts/content/scene-bg-w10.mjs [--out x.svg] */
import { INK, AMB, PAPER, room, person, badge, band, frame, save } from './scene-kit.mjs';

const parts = [];
const add = (s) => parts.push(s);
add(room());
// 식각 장비 본체 (왼쪽) — 몸체 · 챔버 창 · 위 RF 상자 · 상태등
add(`<rect x="40" y="70" width="170" height="128" rx="6" fill="url(#steel)" stroke="${INK}" stroke-width="3"/><rect x="40" y="70" width="170" height="128" rx="6" fill="url(#d2)" opacity="0.45"/>`);
add(`<rect x="70" y="40" width="110" height="30" rx="4" fill="url(#steel)" stroke="${INK}" stroke-width="2.6"/><text x="125" y="59" text-anchor="middle" font-family="monospace" font-size="9" font-weight="800" fill="${INK}">RF MATCH</text>`);
add(`<circle cx="125" cy="128" r="34" fill="#eef4f2" stroke="${INK}" stroke-width="2.6"/><ellipse cx="125" cy="128" rx="22" ry="10" class="fesPlasma" fill="${AMB}" opacity="0.5" filter="url(#soft)"/><circle cx="125" cy="128" r="34" fill="none" stroke="${INK}" stroke-width="1" opacity="0.4"/>`);
add(`<rect x="58" y="176" width="46" height="14" rx="2" fill="${INK}"/><text x="81" y="186.5" text-anchor="middle" font-family="monospace" font-size="8" font-weight="800" fill="${PAPER}">ET-05</text>`);
for (const [i, c] of ['#5aa469', AMB, '#c94a3a'].entries()) add(`<circle cx="${178 + i * 0}" cy="${88 + i * 14}" r="5" fill="${c}" stroke="${INK}" stroke-width="1.6"${i === 1 ? ' class="fesLed"' : ''}/>`);
// 벽걸이 레시피 편집 화면 (가운데)
add(`<rect x="267" y="37" width="226" height="116" rx="7" class="fesScr" fill="${AMB}" opacity="0.26" filter="url(#soft)"/>`);
add(`<rect x="270" y="40" width="220" height="110" rx="5" fill="#eef4f2" stroke="${INK}" stroke-width="2.6"/><rect x="270" y="40" width="220" height="14" fill="url(#ds)"/>`);
add(`<text x="278" y="51" font-family="monospace" font-size="8.6" font-weight="700" fill="${INK}">RECIPE  ETCH-POLY-01  Rev C</text>`);
const rows = [['STEP', 'END', 'TIME', 'PRESS'], ['1 STAB', 'TIME', '15', '10'], ['2 BT', 'TIME', '8', '5'], ['3 ME', 'EPD', 'MAX 60', '10'], ['4 OE', 'TIME', '30%', '30']];
const xs = [278, 336, 384, 440];
rows.forEach((r, j) => {
  const y = 68 + j * 12;
  if (j === 3) add(`<rect x="275" y="${y - 8.5}" width="210" height="11" rx="2" fill="${AMB}" opacity="0.55"/>`); // 본 식각 줄 강조 — 글자는 잉크색(대비)
  r.forEach((c, k) => add(`<text x="${xs[k]}" y="${y}" font-family="monospace" font-size="8" font-weight="${j === 0 || j === 3 ? 800 : 600}" fill="${INK}">${c}</text>`));
  if (j === 0) add(`<path d="M276 ${y + 3} L484 ${y + 3}" stroke="${INK}" stroke-width="1" opacity="0.5"/>`);
});
add(`<rect x="276" y="128" width="208" height="16" rx="3" fill="${AMB}" stroke="${INK}" stroke-width="1.6"/><text x="380" y="139.5" text-anchor="middle" font-family="monospace" font-size="8.6" font-weight="800" fill="${INK}">RECIPE LOCKED — ECN REQUIRED</text>`);
add(`<path d="M380 150 L380 162 M366 162 L394 162" stroke="${INK}" stroke-width="2"/>`);
// 작업자 + 변경 요청서(ECR)
add(person(560));
add(`<g transform="rotate(-10 526 150)"><rect x="510" y="128" width="34" height="44" rx="3" fill="${PAPER}" stroke="${INK}" stroke-width="2.4"/><rect x="520" y="124" width="14" height="7" rx="2" fill="${INK}"/>`
  + `<text x="527" y="142" text-anchor="middle" font-family="monospace" font-size="7" font-weight="800" fill="${INK}">ECR</text>`
  + `<path d="M516 149 L538 149 M516 156 L538 156 M516 163 L532 163" stroke="${INK}" stroke-width="1.2" opacity="0.7"/></g>`);
// 오른쪽 선반 — 판 묶음(바인더)
add(`<rect x="660" y="96" width="190" height="8" rx="2" fill="url(#steel)" stroke="${INK}" stroke-width="2.4"/><rect x="660" y="158" width="190" height="8" rx="2" fill="url(#steel)" stroke="${INK}" stroke-width="2.4"/>`);
add(`<path d="M668 104 L668 198 M842 104 L842 198" stroke="${INK}" stroke-width="2.4"/>`);
const binders = [['Rev B', PAPER, 'ARCHIVED'], ['Rev C', AMB, 'PRODUCTION'], ['Rev D', '#eef4f2', 'DRAFT']];
binders.forEach(([t, fill], i) => {
  const x = 684 + i * 52;
  add(`<rect x="${x}" y="110" width="40" height="48" rx="3" fill="${fill}" stroke="${INK}" stroke-width="2.2"${i === 2 ? ' stroke-dasharray="4 3"' : ''}/>`);
  add(`<rect x="${x + 6}" y="118" width="28" height="12" rx="2" fill="${INK}"/><text x="${x + 20}" y="127" text-anchor="middle" font-family="monospace" font-size="7.5" font-weight="800" fill="${PAPER}">${t}</text>`);
});
add(`<text x="755" y="180" text-anchor="middle" font-family="monospace" font-size="8" font-weight="700" fill="${INK}">ARCHIVED · PRODUCTION · DRAFT</text>`);
add(badge('RECIPE LOCKED', 130));
add(band('RECIPE · ECR → ECN → QUAL → RELEASE', 312));
add(frame());
save('w10', parts);
