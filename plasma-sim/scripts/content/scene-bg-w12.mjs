#!/usr/bin/env node
/* ═══ 현장 실무영어 12강 「오늘의 현장」 배경 장면 (900×250 인라인 SVG) ═══
   장면: 야간 트러블슈팅 — 덮개를 연 식각 장비(VAC 알람 등), 헬륨 누설 검사기 막대를 든 작업자,
         벽의 SPC 관리도 화면(UCL 위로 튄 점 · OOC), 받침대 위 트러블슈팅 가이드(표 4줄 · 체크).
   공용 손: scripts/content/scene-kit.mjs.   사용: node scripts/content/scene-bg-w12.mjs [--out x.svg] */
import { INK, AMB, PAPER, room, person, badge, band, frame, save } from './scene-kit.mjs';

const parts = [];
const add = (s) => parts.push(s);
add(room());
// 식각 장비 — 몸체 + 열린 덮개(경첩에서 비스듬히) + O-ring 홈 + 알람 등
add(`<rect x="40" y="110" width="190" height="88" rx="6" fill="url(#steel)" stroke="${INK}" stroke-width="3"/><rect x="40" y="110" width="190" height="88" rx="6" fill="url(#d2)" opacity="0.45"/>`);
add(`<ellipse cx="135" cy="110" rx="70" ry="10" fill="#eef4f2" stroke="${INK}" stroke-width="2.6"/><ellipse cx="135" cy="110" rx="58" ry="7" fill="none" stroke="${AMB}" stroke-width="2.4" stroke-dasharray="5 3"/>`);
add(`<g transform="rotate(-38 65 108)"><rect x="65" y="98" width="150" height="14" rx="4" fill="url(#steel)" stroke="${INK}" stroke-width="2.6"/></g>`);
add(`<rect x="160" y="150" width="56" height="16" rx="2" fill="${INK}"/><text x="188" y="161.5" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="800" fill="${PAPER}">ET-05</text>`);
add(`<circle cx="62" cy="128" r="6" fill="#c94a3a" stroke="${INK}" stroke-width="1.8" class="fesLed"/>`);
// 작업자 + 헬륨 누설 검사기(본체는 바닥, 호스 → 막대 끝이 덮개 홈으로)
add(person(292));
add(`<rect x="232" y="172" width="34" height="26" rx="3" fill="url(#steel)" stroke="${INK}" stroke-width="2.2"/><text x="249" y="188" text-anchor="middle" font-family="monospace" font-size="7" font-weight="800" fill="${INK}">He</text>`);
add(`<path d="M249 172 Q246 150 262 140 L210 112" fill="none" stroke="${INK}" stroke-width="2.4"/><circle cx="208" cy="111" r="3.2" fill="${AMB}" stroke="${INK}" stroke-width="1.4"/>`);
// 벽의 SPC 관리도 화면
add(`<rect x="377" y="37" width="226" height="116" rx="7" class="fesScr" fill="${AMB}" opacity="0.26" filter="url(#soft)"/>`);
add(`<rect x="380" y="40" width="220" height="110" rx="5" fill="#eef4f2" stroke="${INK}" stroke-width="2.6"/><rect x="380" y="40" width="220" height="14" fill="url(#ds)"/>`);
add(`<text x="388" y="51" font-family="monospace" font-size="8.6" font-weight="700" fill="${INK}">SPC · ETCH RATE</text>`);
const yv = (v) => 100 - (v - 100) * 4.2;
add(`<g stroke="${INK}" stroke-width="1" fill="none"><path d="M392 ${yv(106)} L590 ${yv(106)}" stroke-dasharray="5 3"/><path d="M392 ${yv(100)} L590 ${yv(100)}" opacity="0.5"/><path d="M392 ${yv(94)} L590 ${yv(94)}" stroke-dasharray="5 3"/></g>`);
add(`<text x="592" y="${yv(106) - 2}" text-anchor="end" font-family="monospace" font-size="7" font-weight="700" fill="${INK}">UCL</text><text x="592" y="${yv(94) + 8}" text-anchor="end" font-family="monospace" font-size="7" font-weight="700" fill="${INK}">LCL</text>`);
const pts = [100, 101.5, 99, 102, 100.5, 98.5, 101, 107.5, 101];
const px = (i) => 400 + i * 22;
add(`<path d="${pts.map((v, i) => `${i ? 'L' : 'M'}${px(i)} ${yv(v)}`).join(' ')}" fill="none" stroke="${INK}" stroke-width="1.6"/>`);
pts.forEach((v, i) => add(`<circle cx="${px(i)}" cy="${yv(v)}" r="${v > 106 ? 4.5 : 3}" fill="${v > 106 ? '#c94a3a' : INK}"${v > 106 ? ' class="fesLed"' : ''}/>`));
add(`<rect x="388" y="130" width="70" height="14" rx="3" fill="${AMB}" stroke="${INK}" stroke-width="1.4"/><text x="423" y="140.5" text-anchor="middle" font-family="monospace" font-size="8.6" font-weight="800" fill="${INK}">OOC · R1</text>`);
add(`<path d="M490 150 L490 162 M476 162 L504 162" stroke="${INK}" stroke-width="2"/>`);
// 받침대 위 트러블슈팅 가이드
add(`<path d="M700 198 L716 140 M800 198 L784 140" stroke="${INK}" stroke-width="2.6"/>`);
add(`<g transform="rotate(-6 750 112)"><rect x="680" y="62" width="140" height="96" rx="3" fill="${PAPER}" stroke="${INK}" stroke-width="2.6"/>`
  + `<text x="690" y="78" font-family="monospace" font-size="8" font-weight="800" fill="${INK}">TROUBLESHOOTING</text>`
  + `<path d="M688 84 L812 84" stroke="${INK}" stroke-width="1.2"/>`
  + [0, 1, 2, 3].map((k) => `<path d="M700 ${98 + k * 15} L802 ${98 + k * 15}" stroke="${INK}" stroke-width="1" opacity="0.55"/>`
    + `<rect x="688" y="${91 + k * 15}" width="8" height="8" rx="1" fill="none" stroke="${INK}" stroke-width="1.2"/>`
    + (k < 3 ? `<path d="M689 ${95 + k * 15} L692 ${98 + k * 15} L697 ${90 + k * 15}" fill="none" stroke="${INK}" stroke-width="1.6"/>` : `<circle cx="692" cy="${95 + k * 15}" r="2.2" fill="${AMB}"/>`)).join('')
  + `</g>`);
add(badge('BASE PRESSURE HIGH', 170));
add(band('SYMPTOM → CAUSE → CHECK → ACTION', 300));
add(frame());
save('w12', parts);
