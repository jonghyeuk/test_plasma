/* ═══ 현장 실무영어 — 발음 음성(mp3) 공용 규칙 ═══
   화면(FieldEnglishSimulator.jsx)·빌드 스크립트(scripts/narration/field-english-build.js)·
   잠금 테스트(src/data/__tests__/fieldEnglishAudio.test.js)가 모두 이 파일 하나를 읽는다.
   그래서 "어떤 글을 문장으로 보는가"와 "문장 텍스트를 어떻게 정규화해 키로 쓰는가"가 세 곳에서 어긋나지 않는다.

   - 키(key)  : 화면에 보이는 영어 문장을 normalizeSpeech() 로 다듬은 문자열. 매니페스트(fieldEnglishAudio.manifest.json)의 키.
   - 해시     : sha1(key) 앞 10자리 = public/audio/field-english/<hash>.mp3 파일명 (빌드 스크립트가 만든다).
   - 문장 기준: 한글이 없고, 영어 단어가 둘 이상이며, 마침표/물음표/느낌표(닫는 따옴표·괄호 허용)로 끝나는 글.
               단어·구(용어 목록, 화면 라벨 "RF ON", "INTERLOCK NOT SATISFIED")는 제외. 애매하면 포함 쪽(화살표 흐름 "A → B." 도 문장으로 본다).

   Node 스크립트에서는 await import() 로 읽는다 (Node 20.19+/22: ESM 자동 감지). */

export const AUDIO_DIR = '/audio/field-english'; // public/ 아래 — homepage "." 이지만 다른 public 자산처럼 절대경로로 쓴다

/** 문장 텍스트 → 매니페스트 키. 화면 장식(굵게 **, 키워드 [ ]), 목록 번호, 겹공백을 걷어낸다. */
export function normalizeSpeech(text) {
  return String(text == null ? '' : text)
    .replace(/\*\*/g, '')            // rich(): **굵게**
    .replace(/[[\]]/g, '')           // faRich(): [키워드]
    .replace(/^\s*(?:\d+[.)]|[-•▸])\s+/, '') // "1. Confirm …" 의 번호·불릿 (읽을 때 "one" 이라 하지 않도록)
    .replace(/\s+/g, ' ')
    .trim();
}

const HANGUL = /[ㄱ-ㆎ가-힣]/;
/** 완성된 영어 문장인가 — 위 '문장 기준'. 입력은 normalizeSpeech() 를 거친 텍스트. */
export function isEnglishSentence(s) {
  if (!s || HANGUL.test(s)) return false;
  if ((s.match(/[A-Za-z]{2,}/g) || []).length < 2) return false; // 단어 둘 이상
  return /[.!?]["”’')\]]*$/.test(s);
}

/** 글 전체가 문장이면 그 키, 아니면 null. */
export function speechKey(text) {
  const k = normalizeSpeech(text);
  return isEnglishSentence(k) ? k : null;
}

/* 한국어 글 속에 박힌 영어 문장(따옴표·굵게) 찾기.
   따옴표 안이 우선, 겹치지 않는 굵게 구간이 그 다음. 반환: [{ start, end, key }] (원문 기준 위치, 따옴표 포함, 오름차순) */
const RE_DQ = /["“]([^"“”]{4,}?)["”]/g;                         // "…"  “…”
const RE_SQ = /(^|[^A-Za-z])'([^']{4,}?[.!?])'(?![A-Za-z])/g;  // '…'  (안에 아포스트로피가 없는 것만)
const RE_BOLD = /\*\*([^*]+?)\*\*/g;
export function findSpeechSpans(text) {
  const s = String(text == null ? '' : text);
  const spans = [];
  const overlaps = (a, b) => a.start < b.end && b.start < a.end;
  const push = (start, end, inner) => {
    const key = normalizeSpeech(inner);
    if (!isEnglishSentence(key)) return;
    const sp = { start, end, key };
    if (spans.some((o) => overlaps(o, sp))) return;
    spans.push(sp);
  };
  for (const m of s.matchAll(RE_DQ)) push(m.index, m.index + m[0].length, m[1]);
  for (const m of s.matchAll(RE_SQ)) { const off = m[1].length; push(m.index + off, m.index + m[0].length, m[2]); }
  for (const m of s.matchAll(RE_BOLD)) push(m.index, m.index + m[0].length, m[1]);
  return spans.sort((a, b) => a.start - b.start);
}

/** 한 덩어리 글에서 읽어 줄 키들. 글 전체가 문장이면 그것 하나(안의 따옴표는 따로 세지 않는다), 아니면 박힌 문장들. */
export function speechKeysIn(text) {
  const whole = speechKey(text);
  if (whole) return [whole];
  return findSpeechSpans(text).map((sp) => sp.key);
}

/* ═══ 챕터 데이터에서 문장 뽑기 ═══
   읽는 필드 (fieldEnglishChapters.data.js 의 슬라이드 구조 그대로; 화면의 같은 자리에 ▶ 가 붙는다):
     story      text
     scene      where · tool · situation · goal · meet[]            (대개 한국어 — 박힌 영어 문장만 잡힌다)
     read       intro · paras[]
     acr        intro                                               (items 는 약어 목록 → 제외)
     glossary   intro · items[].ex                                  (items[].en 은 용어, .d 는 한국어 풀이 → 제외)
     mansample  intro · heading · steps[] (문자열 또는 {t, note.en}) · callout.en · lines[](email 변형)
     quiz       intro · questions[].prompt                          (프롬프트 속 따옴표 영어 문장 포함. opts 는 선택 버튼이라 ▶ 를 못 넣어 제외)
     manual     mtitle · paras[]                                    (영어 문단 전체 = 키 하나)
     comm       items[].sit · items[].q.en · items[].a.en
     sim        intro
     wrap       points[] · done
     (모든 슬라이드) figs[]: sticker/alarm/note en · hmi banner.en · step items[] · log lines[] · meter note · cap
   제외: acr.items, glossary.items.en/ko/d, mansample.gloss(단어 쌍), 버튼 라벨(buttons), 화면 행(hmi rows), 레이어(stack).
   실습(sim) 화면 안의 동적 문장(fieldEnglishLabs.js 의 알람 메시지·로그)은 데이터 파일 밖이라 여기서 다루지 않는다. */
export function extractSlideSentences(slide) {
  const out = [];
  const add = (t) => { if (t != null && t !== '') out.push(...speechKeysIn(t)); };
  const addAll = (arr) => (arr || []).forEach((x) => add(typeof x === 'string' ? x : x && x.t));
  switch (slide.type) {
    case 'story': add(slide.text); break;
    case 'scene': add(slide.where); add(slide.tool); add(slide.situation); add(slide.goal); addAll(slide.meet); break;
    case 'read': add(slide.intro); addAll(slide.paras); break;
    case 'acr': add(slide.intro); break;
    case 'glossary': add(slide.intro); (slide.items || []).forEach((g) => add(g.ex)); break;
    case 'mansample':
      add(slide.intro); add(slide.heading);
      (slide.steps || []).forEach((st) => { add(typeof st === 'string' ? st : st.t); if (st && st.note) add(st.note.en); });
      if (slide.callout) add(slide.callout.en);
      addAll(slide.lines);
      break;
    case 'quiz': add(slide.intro); (slide.questions || []).forEach((q) => add(q.prompt)); break;
    case 'manual': add(slide.mtitle); addAll(slide.paras); break;
    case 'comm': (slide.items || []).forEach((it) => { add(it.sit); if (it.q) add(it.q.en); if (it.a) add(it.a.en); }); break;
    case 'sim': add(slide.intro); break;
    case 'wrap': addAll(slide.points); add(slide.done); break;
    default: break;
  }
  for (const f of slide.figs || []) {
    switch (f.kind) {
      case 'sticker': case 'alarm': case 'note': add(f.en); break;
      case 'hmi': if (f.banner) add(f.banner.en); break;
      case 'step': (f.items || []).forEach((it) => add(Array.isArray(it) ? it[0] : it)); break;
      case 'log': addAll(f.lines); break;
      case 'meter': add(f.note); break;
      default: break;
    }
    add(f.cap);
  }
  return out;
}

/** 챕터들(CONTENT_CHAPTERS 중 고른 것)에서 중복 없이 뽑은 키 목록 — 등장 순서 유지. */
export function extractChapterSentences(chapters) {
  const seen = new Set(), out = [];
  for (const ch of chapters) for (const sl of ch.slides || []) for (const k of extractSlideSentences(sl)) {
    if (!seen.has(k)) { seen.add(k); out.push(k); }
  }
  return out;
}

/* 실습(sim) 화면의 고정 영어 알람 문장 — 6장 ② ACK/RESET 의 ACK_CASES.msg, 6장 ③ 우선순위의 PRIO_ITEMS.msg.
   데이터 파일 밖(src/simulators/fieldEnglishLabs.js)에 있어 extractChapterSentences 가 못 보므로 따로 받는다.
   숫자가 매번 바뀌는 로그 줄은 사전 생성이 맞지 않아 넣지 않는다. 빌드 스크립트와 테스트가 같은 함수를 쓴다. */
export function extractLabSentences(labs) {
  const out = [];
  [...(labs.ACK_CASES || []), ...(labs.PRIO_ITEMS || [])].forEach((x) => { const k = speechKey(x.msg); if (k && !out.includes(k)) out.push(k); });
  return out;
}

/* ── 슬라이드 전체 읽기(한글+영어 혼합 내레이션) ────────────────────────────
   story(첫 화면) · read(박스형 읽기 글) · manual(Operating Manual) 슬라이드는 한국어 설명 속에 영어 문장이 섞여 있다.
   문장 단위 ▶ 와 별개로, 한 슬라이드를 처음부터 끝까지 한 화자(영어 원어민이면서 한국어도 읽는 Chris)가 읽는다.
   키는 읽어 줄 글 자체(장식 제거) — 데이터 글이 바뀌면 키가 바뀌어 매니페스트 테스트가 잡아낸다. */
export const SLIDE_AUDIO_DIR = '/audio/field-english/slides';
export const SLIDE_AUDIO_TYPES = ['story', 'read', 'manual'];
function cleanNarr(t) { return String(t == null ? '' : t).replace(/\*\*/g, '').replace(/[[\]]/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
/** 슬라이드 → 읽어 줄 글. 대상 타입이 아니거나 글이 없으면 null. */
export function slideNarration(slide) {
  if (!slide || !SLIDE_AUDIO_TYPES.includes(slide.type)) return null;
  let parts = [];
  if (slide.type === 'story') parts = [slide.title, slide.text];
  else if (slide.type === 'read') parts = [slide.title, slide.intro, ...(slide.paras || [])];
  else if (slide.type === 'manual') parts = [slide.mtitle, ...(slide.paras || [])];
  const txt = parts.map(cleanNarr).filter(Boolean).join(' ');
  return txt.length >= 40 ? txt : null;
}
/** 챕터들에서 전체 읽기 대상 슬라이드의 글 목록(중복 제거, 순서 유지) */
export function extractSlideNarrations(chapters) {
  const out = [];
  (chapters || []).forEach((ch) => (ch.slides || []).forEach((sl) => { const t = slideNarration(sl); if (t && !out.includes(t)) out.push(t); }));
  return out;
}
