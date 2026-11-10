/* ═══ 현장 실무영어 — 강의 듣기(설명하듯 읽기) + 펜 표시 공용 규칙 ═══
   화면(FieldEnglishSimulator.jsx 의 SlideAudioBtn · PenLayer) · 빌드 스크립트(scripts/narration/field-english-lecture-build.mjs) ·
   잠금 테스트(src/data/__tests__/fieldEnglishLecture.test.js)가 이 파일 하나를 읽는다.

   대본(scripts/narration/field-english-wNN.lecture.json 의 say)은 화면 글을 그대로 읽는 것이 아니라 강의자가 화면을 짚어 가며 하는 말이다.
   그 안의 표시:
     {{u:화면 글}}   밑줄       {{o:화면 글}}   동그라미       {{h:화면 글}}   형광펜
     {{o:화면 글#2}} 같은 글이 본문에 여러 번 나오면 몇 번째인지(1부터)
   표시는 소리 내 읽지 않는다. 펜은 표시 바로 뒤의 말이 시작되는 순간(일레븐랩스 글자별 시각)에 긋기 시작한다.
   '화면 글'은 슬라이드 본문(.fes-ld-body)에 보이는 글 그대로여야 한다 — 굵게(**)·키워드([ ]) 장식은 빼고 쓴다. */

export const LECTURE_AUDIO_DIR = '/audio/field-english/lecture';
export const PEN_KINDS = { u: 'underline', o: 'circle', h: 'highlight' };

const MARK = /\{\{([uoh]):([^}]+?)\}\}/g;

/** 대본 → { spoken: 실제로 읽을 글, cues: [{ at: spoken 안 글자 위치, k, x: 화면 글, n: 몇 번째 }] } */
export function parseLecture(say) {
  const src = String(say || '');
  let spoken = '';
  let last = 0;
  const cues = [];
  for (const m of src.matchAll(MARK)) {
    spoken += src.slice(last, m.index);
    last = m.index + m[0].length;
    if (/\s$/.test(spoken)) while (last < src.length && /[ \t]/.test(src[last])) last += 1; // "말 {{표시}} 말" → 공백 하나
    const raw = m[2];
    const hm = raw.match(/^(.*)#(\d+)$/);
    cues.push({ at: spoken.length, k: m[1], x: hm ? hm[1] : raw, n: hm ? Number(hm[2]) : 1 });
  }
  spoken += src.slice(last);
  // 펜은 표시 뒤 첫 '소리 나는' 글자에 맞춘다(공백 건너뛰기)
  for (const c of cues) { while (c.at < spoken.length && /\s/.test(spoken[c.at])) c.at += 1; }
  const lead = spoken.length - spoken.trimStart().length; // 앞 공백을 걷으면 위치도 그만큼 당긴다
  return { spoken: spoken.trim(), cues: cues.map((c) => ({ ...c, at: Math.max(0, c.at - lead) })) };
}

/** 슬라이드 서명 — 대본이 가리키는 슬라이드가 바뀌면(순서·제목) 화면이 옛 음성을 붙이지 않게 한다 */
export function slideSig(slide) {
  return `${slide && slide.type}|${(slide && (slide.title || slide.mtitle)) || ''}`;
}

/** 대본 표시 글(화면 글)과 비교할 슬라이드 본문 글 — 데이터에서 근사로 뽑는다(장식 제거). 테스트용 1차 점검. */
export function slidePlainText(slide, figsOnly = false) {
  // 화면(SlideRenderer)과 같은 순서 — 이야기(story)는 본문 뒤에, 나머지는 본문 앞에 그림(figs)을 그린다.
  // 순서가 다르면 '몇 번째'(#n)가 화면과 어긋난다(9강 핵심 용어 (1): 스티커의 shall 이 먼저 잡혔다).
  if (!figsOnly && slide && slide.figs && slide.figs.length) {
    const { figs, ...rest } = slide;
    const body = slidePlainText(rest), art = slidePlainText({ figs }, true);
    return slide.type === 'story' ? `${body}\n${art}` : `${art}\n${body}`;
  }
  const out = [];
  const walk = (v, key) => {
    if (v == null) return;
    if (typeof v === 'string') { if (!['type', 'which', 'mode', 'bg', 'art', 'icon', 'level', 'kind', 'state', 'title'].includes(key)) out.push(v); return; }
    if (Array.isArray(v)) { v.forEach((x) => walk(x, key)); return; }
    if (typeof v === 'object') Object.keys(v).forEach((k) => walk(v[k], k));
  };
  walk(slide, '');
  return out.join('\n').replace(/\*\*/g, '').replace(/[[\]]/g, '');
}

/** 본문 글에서 x 의 n 번째 위치(없으면 -1) */
export function nthIndexOf(text, x, n = 1) {
  let at = -1;
  for (let i = 0; i < n; i += 1) { at = text.indexOf(x, at + 1); if (at < 0) return -1; }
  return at;
}
