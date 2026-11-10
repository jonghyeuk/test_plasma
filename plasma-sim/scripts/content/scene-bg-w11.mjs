#!/usr/bin/env node
/* ═══ 현장 실무영어 11강 「오늘의 현장」 배경 장면 (900×250 인라인 SVG) ═══
   장면: 순환 근무 — 네 장비 계열이 한 줄로: CVD(돔 챔버 · 가스 배관) · 노광(트랙 + 스캐너 렌즈 기둥) ·
         CMP(회전 판 · 캐리어 팔 · 슬러리 노즐) · 이온주입(빔라인 · 자석 굽은 관). 그 사이를 걷는 작업자.
   공용 손: scripts/content/scene-kit.mjs.   사용: node scripts/content/scene-bg-w11.mjs [--out x.svg] */
import { INK, AMB, PAPER, room, person, badge, band, frame, save } from './scene-kit.mjs';

const parts = [];
const add = (s) => parts.push(s);
const tag = (x, y, t, w = 64) => add(`<rect x="${x - w / 2}" y="${y}" width="${w}" height="14" rx="2" fill="${INK}"/><text x="${x}" y="${y + 10.5}" text-anchor="middle" font-family="monospace" font-size="8" font-weight="800" fill="${PAPER}">${t}</text>`);
add(room());
// ① CVD — 돔 챔버 + 위 가스 배관 둘
add(`<path d="M40 198 L40 120 Q40 84 90 84 Q140 84 140 120 L140 198 Z" fill="url(#steel)" stroke="${INK}" stroke-width="3"/><path d="M40 120 Q40 84 90 84 Q140 84 140 120" fill="url(#d2)" opacity="0.4"/>`);
add(`<g fill="none" stroke="${INK}" stroke-width="2.4"><path d="M76 84 L76 40 L60 40"/><path d="M104 84 L104 52 L124 52 L124 30"/></g><rect x="52" y="34" width="10" height="12" rx="2" fill="${AMB}" stroke="${INK}" stroke-width="1.6"/>`);
add(`<rect x="62" y="128" width="56" height="30" rx="3" fill="#eef4f2" stroke="${INK}" stroke-width="2"/><ellipse cx="90" cy="143" rx="20" ry="6" class="fesPlasma" fill="${AMB}" opacity="0.45" filter="url(#soft)"/>`);
tag(90, 172, 'CVD', 44);
// ② 노광 — 트랙(낮고 긴 상자) + 스캐너(렌즈 기둥)
add(`<rect x="170" y="130" width="96" height="68" rx="4" fill="url(#steel)" stroke="${INK}" stroke-width="2.6"/><circle cx="196" cy="160" r="13" fill="#eef4f2" stroke="${INK}" stroke-width="2"/><circle cx="196" cy="160" r="4" fill="${INK}"/><circle cx="238" cy="160" r="13" fill="#eef4f2" stroke="${INK}" stroke-width="2"/>`);
add(`<rect x="266" y="70" width="70" height="128" rx="4" fill="url(#steel)" stroke="${INK}" stroke-width="3"/><rect x="290" y="80" width="22" height="70" rx="3" fill="url(#d2)" stroke="${INK}" stroke-width="2"/>`);
for (let k = 0; k < 4; k += 1) add(`<path d="M290 ${92 + k * 15} L312 ${92 + k * 15}" stroke="${INK}" stroke-width="1.4"/>`);
add(`<path d="M301 150 L301 168" stroke="${AMB}" stroke-width="3" class="fesRay"/>`);
tag(218, 182, 'TRACK', 52); tag(301, 176, 'SCANNER', 58);
// 작업자 — 노광과 CMP 사이
add(person(392));
// ③ CMP — 회전 판(타원) + 캐리어 팔 + 슬러리 노즐
add(`<rect x="430" y="150" width="150" height="48" rx="4" fill="url(#steel)" stroke="${INK}" stroke-width="2.6"/>`);
add(`<ellipse cx="505" cy="146" rx="62" ry="15" fill="#eef4f2" stroke="${INK}" stroke-width="2.6"/><ellipse cx="505" cy="146" rx="62" ry="15" fill="url(#d2)" opacity="0.35"/>`);
add(`<path d="M560 70 L560 100 L520 128" fill="none" stroke="${INK}" stroke-width="3"/><rect x="503" y="124" width="34" height="14" rx="4" fill="${AMB}" stroke="${INK}" stroke-width="2"/>`);
add(`<path d="M452 96 L452 118 L470 134" fill="none" stroke="${INK}" stroke-width="2.2"/><circle cx="472" cy="138" r="2.5" fill="#cfc6ad" stroke="${INK}" stroke-width="1"/>`);
add(`<rect x="548" y="60" width="24" height="12" rx="2" fill="url(#steel)" stroke="${INK}" stroke-width="2"/>`);
tag(505, 176, 'CMP', 44);
// ④ 이온주입 — 이온원 상자 → 굽은 자석 관 → 빔라인 → 엔드 스테이션
add(`<rect x="612" y="96" width="46" height="46" rx="4" fill="url(#steel)" stroke="${INK}" stroke-width="2.6"/>`);
add(`<path d="M658 119 L690 119 Q722 119 722 151 L722 160" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M658 119 L690 119 Q722 119 722 151 L722 160" fill="none" stroke="#e9e2ce" stroke-width="7" stroke-linecap="round"/>`);
add(`<path d="M662 119 L690 119 Q718 119 718 151" fill="none" stroke="${AMB}" stroke-width="2" class="fesRay"/>`);
add(`<path d="M700 112 Q734 112 734 146" fill="none" stroke="${INK}" stroke-width="2.4"/><rect x="690" y="100" width="22" height="10" rx="2" fill="${INK}"/>`);
add(`<rect x="700" y="160" width="140" height="38" rx="4" fill="url(#steel)" stroke="${INK}" stroke-width="2.6"/><rect x="782" y="128" width="48" height="32" rx="3" fill="#eef4f2" stroke="${INK}" stroke-width="2"/><path d="M722 160 L722 170 L790 170" fill="none" stroke="${INK}" stroke-width="2"/>`);
tag(770, 178, 'IMPLANT', 58);
add(badge('ROTATION', 110));
add(band('DEP · LITHO · CMP · IMPLANT — SAME SKELETON', 360));
add(frame());
save('w11', parts);
