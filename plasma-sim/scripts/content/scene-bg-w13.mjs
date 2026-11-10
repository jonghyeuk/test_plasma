#!/usr/bin/env node
/* ═══ 현장 실무영어 13강 「오늘의 현장」 배경 장면 (900×250 인라인 SVG) ═══
   장면: 새벽 원격 지원 — 헤드셋을 쓴 작업자, 책상 위 노트북(지원 포털 티켓 SR-20618 · S1),
         받아 적는 메모(15 W → "one-five" · KX-4071-B → Bravo), 오른쪽에 부품 상자(RMA 번호)와 지구 · 시계 두 개(KST · PST).
   공용 손: scripts/content/scene-kit.mjs.   사용: node scripts/content/scene-bg-w13.mjs [--out x.svg] */
import { INK, AMB, PAPER, room, person, badge, band, frame, save } from './scene-kit.mjs';

const parts = [];
const add = (s) => parts.push(s);
add(room());
// 책상
add(`<rect x="60" y="150" width="380" height="10" rx="2" fill="${INK}"/><path d="M80 160 L80 198 M420 160 L420 198" stroke="${INK}" stroke-width="5"/>`);
// 노트북 — 지원 포털
add(`<rect x="117" y="57" width="196" height="96" rx="7" class="fesScr" fill="${AMB}" opacity="0.26" filter="url(#soft)"/>`);
add(`<rect x="120" y="60" width="190" height="88" rx="5" fill="#eef4f2" stroke="${INK}" stroke-width="2.6"/><rect x="120" y="60" width="190" height="14" fill="url(#ds)"/><path d="M104 150 L326 150 L316 142 L114 142 Z" fill="url(#steel)" stroke="${INK}" stroke-width="2"/>`);
add(`<text x="128" y="71" font-family="monospace" font-size="8.6" font-weight="700" fill="${INK}">VENDOR SUPPORT · SR-20618</text>`);
add(`<text x="128" y="92" font-family="monospace" font-size="8" font-weight="600" fill="${INK}">ET-05 | Base pressure high</text><text x="128" y="105" font-family="monospace" font-size="8" font-weight="600" fill="${INK}">since 23:05 | Tool down</text>`);
add(`<rect x="128" y="114" width="46" height="15" rx="3" fill="${AMB}" stroke="${INK}" stroke-width="1.4"/><text x="151" y="124.5" text-anchor="middle" font-family="monospace" font-size="8.6" font-weight="800" fill="${INK}">S1</text>`);
add(`<text x="184" y="125" font-family="monospace" font-size="8" font-weight="700" fill="${INK}">TSE · REMOTE</text>`);
// 메모지 — 되읽기
add(`<g transform="rotate(-4 380 120)"><rect x="336" y="88" width="92" height="56" rx="2" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>`
  + `<text x="344" y="104" font-family="monospace" font-size="8" font-weight="800" fill="${INK}">15 W = one-five</text>`
  + `<text x="344" y="119" font-family="monospace" font-size="8" font-weight="800" fill="${INK}">KX-4071-B</text>`
  + `<text x="344" y="133" font-family="monospace" font-size="7.5" font-weight="700" fill="${INK}">B = Bravo ✓</text></g>`);
// 작업자 + 헤드셋(머리 위 호 · 마이크)
add(person(490));
add(`<path d="M474 125 Q490 98 506 125" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/><rect x="470" y="122" width="7" height="11" rx="2" fill="${AMB}" stroke="${INK}" stroke-width="1.4"/><path d="M473 132 Q476 144 488 144" fill="none" stroke="${INK}" stroke-width="2"/>`);
// 말풍선 — 되읽기
add(`<path d="M520 70 L640 70 Q648 70 648 78 L648 102 Q648 110 640 110 L548 110 L534 122 L538 110 L520 110 Q512 110 512 102 L512 78 Q512 70 520 70 Z" fill="${PAPER}" stroke="${INK}" stroke-width="2.2"/>`);
add(`<text x="580" y="87" text-anchor="middle" font-family="'Trebuchet MS',sans-serif" font-size="9.5" font-weight="800" fill="${INK}">Let me read</text><text x="580" y="101" text-anchor="middle" font-family="'Trebuchet MS',sans-serif" font-size="9.5" font-weight="800" fill="${INK}">that back…</text>`);
// 시계 둘 — KST · PST
for (const [x, t, h, m] of [[700, 'KST', 3, 12], [790, 'PST', 10, 12]]) {
  add(`<circle cx="${x}" cy="90" r="24" fill="#eef4f2" stroke="${INK}" stroke-width="2.6"/>`);
  const ah = ((h % 12) + m / 60) / 12 * 2 * Math.PI, am = m / 60 * 2 * Math.PI;
  add(`<path d="M${x} 90 L${(x + Math.sin(ah) * 12).toFixed(1)} ${(90 - Math.cos(ah) * 12).toFixed(1)}" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M${x} 90 L${(x + Math.sin(am) * 18).toFixed(1)} ${(90 - Math.cos(am) * 18).toFixed(1)}" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`);
  add(`<rect x="${x - 18}" y="120" width="36" height="14" rx="2" fill="${INK}"/><text x="${x}" y="130.5" text-anchor="middle" font-family="monospace" font-size="8" font-weight="800" fill="${PAPER}">${t}</text>`);
}
// 부품 상자 — RMA
add(`<path d="M680 198 L680 158 L760 158 L760 198 Z" fill="#d9c49a" stroke="${INK}" stroke-width="2.6"/><path d="M680 158 L700 146 L780 146 L760 158" fill="#e6d4ac" stroke="${INK}" stroke-width="2.2"/><path d="M760 158 L780 146 L780 186 L760 198" fill="#cbb488" stroke="${INK}" stroke-width="2.2"/>`);
add(`<rect x="690" y="168" width="60" height="18" rx="2" fill="${PAPER}" stroke="${INK}" stroke-width="1.4"/><text x="720" y="180" text-anchor="middle" font-family="monospace" font-size="7.5" font-weight="800" fill="${INK}">RMA-77314</text>`);
add(badge('SR-20618 · S1', 140));
add(band('TICKET · CALL · EMAIL — READ IT BACK', 330));
add(frame());
save('w13', parts);
