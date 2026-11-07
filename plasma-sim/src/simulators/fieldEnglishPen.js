/* ═══ 현장 실무영어 — 강의 듣기의 펜(밑줄 · 동그라미 · 형광펜) 기하 ═══
   화면 글을 DOM 에서 찾아 그 글자 상자(rect)를 얻고, 손으로 그은 듯한 SVG 경로를 만든다.
   React 없음 — 화면(FieldEnglishSimulator.jsx 의 PenLayer)과 브라우저 점검(scripts/narration/check-pen.mjs)이 같이 쓴다.

   좌표계: 스크롤되는 본문(.fes-ld-body) 안쪽의 '내용 좌표'(스크롤해도 글자와 함께 움직인다).
   펜 층 SVG 는 본문 안에 absolute 로 깔리므로 이 좌표를 그대로 쓴다. */

/* 글 찾기에서 빼는 것 — 문장 ▶ 버튼 글자, 펜 층 자신, 그림(SVG) 속 글자 */
const SKIP_SELECTOR = '.fes-speak, .fes-pen, svg, script, style';

/** root 안에서 보이는 글을 이어 붙이고, 각 글자가 어느 텍스트 노드의 몇 번째인지 기억한다 */
function collectText(root) {
  const doc = root.ownerDocument;
  const walker = doc.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */, {
    acceptNode: (n) => (n.parentElement && n.parentElement.closest(SKIP_SELECTOR) ? 2 /* REJECT */ : 1 /* ACCEPT */),
  });
  const nodes = [];
  let text = '';
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    nodes.push({ node: n, start: text.length });
    text += n.nodeValue;
  }
  return { text, nodes };
}
function locate(nodes, pos) {
  let lo = 0, hi = nodes.length - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (nodes[mid].start <= pos) lo = mid; else hi = mid - 1; }
  return { node: nodes[lo].node, offset: pos - nodes[lo].start };
}

/**
 * root(스크롤 본문) 안에서 화면 글 x 의 n 번째를 찾아, 줄마다 하나씩 상자를 돌려준다(내용 좌표). 못 찾으면 [].
 */
export function findTextRects(root, x, n = 1) {
  if (!root || !x) return [];
  const { text, nodes } = collectText(root);
  let at = -1;
  for (let i = 0; i < n; i += 1) { at = text.indexOf(x, at + 1); if (at < 0) return []; }
  const a = locate(nodes, at), b = locate(nodes, at + x.length - 1);
  const range = root.ownerDocument.createRange();
  range.setStart(a.node, a.offset);
  range.setEnd(b.node, b.offset + 1);
  const base = root.getBoundingClientRect();
  const raw = Array.from(range.getClientRects()).filter((r) => r.width > 0.5 && r.height > 0.5);
  // 같은 줄의 조각(굵게 · 링크 경계)을 한 상자로
  const lines = [];
  for (const r of raw) {
    const box = { x: r.left - base.left + root.scrollLeft, y: r.top - base.top + root.scrollTop, w: r.width, h: r.height };
    const same = lines.find((l) => Math.abs((l.y + l.h / 2) - (box.y + box.h / 2)) < Math.min(l.h, box.h) * 0.5);
    if (same) {
      const x0 = Math.min(same.x, box.x), x1 = Math.max(same.x + same.w, box.x + box.w);
      const y0 = Math.min(same.y, box.y), y1 = Math.max(same.y + same.h, box.y + box.h);
      Object.assign(same, { x: x0, y: y0, w: x1 - x0, h: y1 - y0 });
    } else lines.push(box);
  }
  return lines.sort((p, q) => p.y - q.y || p.x - q.x);
}

/* 결정적 흔들림 — 같은 표시는 매번 같은 모양(다시 그려도 떨지 않는다) */
function rng(seed) {
  let s = (seed * 9301 + 49297) % 233280 || 1;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 - 0.5; };
}
const f1 = (v) => Math.round(v * 10) / 10;

/** 밑줄 — 줄마다 살짝 휘고 끝이 조금 들린 선 */
export function underlinePath(rects, seed = 1) {
  const r = rng(seed);
  return rects.map((b) => {
    const y = b.y + b.h + 1.5, x0 = b.x - 1, x1 = b.x + b.w + 2;
    return `M${f1(x0)} ${f1(y + r() * 1.2)} Q${f1((x0 + x1) / 2)} ${f1(y + 1.6 + r() * 1.6)} ${f1(x1)} ${f1(y - 1 + r() * 1.4)}`;
  }).join(' ');
}

/** 형광펜 — 줄마다 글자 높이만큼 굵은 선(가운데) */
export function highlightSegs(rects) {
  return rects.map((b) => ({ d: `M${f1(b.x - 2)} ${f1(b.y + b.h * 0.55)} L${f1(b.x + b.w + 2)} ${f1(b.y + b.h * 0.52)}`, w: f1(b.h * 0.9) }));
}

/** 동그라미 — 글 묶음을 감싸는 타원을 한 바퀴 조금 넘게, 손으로 돌린 듯 */
export function circlePath(rects, seed = 1) {
  if (!rects.length) return '';
  const x0 = Math.min(...rects.map((b) => b.x)), x1 = Math.max(...rects.map((b) => b.x + b.w));
  const y0 = Math.min(...rects.map((b) => b.y)), y1 = Math.max(...rects.map((b) => b.y + b.h));
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const rx = (x1 - x0) / 2 + 9, ry = (y1 - y0) / 2 + 6;
  const r = rng(seed);
  const turns = 1.12, steps = 48, start = -Math.PI * 0.85 + r() * 0.3;
  const wob = [r() * 0.08, r() * 0.08];
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps, a = start + t * turns * Math.PI * 2;
    const k = 1 + wob[0] * Math.sin(a * 2) + wob[1] * Math.cos(a * 3) + t * 0.05; // 끝으로 갈수록 조금 벌어진다(겹쳐 그은 자국)
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  return `M${pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L')}`;
}

export const PEN_DUR = { u: 0.55, o: 0.8, h: 0.5 }; // 긋는 데 걸리는 시간(초) — 음성 재생 시각 기준
