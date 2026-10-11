#!/usr/bin/env node
/* ═══ 현장 실무영어 — 영어 문장 발음 mp3 빌드 (일레븐랩스 TTS) ═══
   입력: src/data/fieldEnglishChapters.data.js 의 챕터 w5(플라즈마 장비)·w6(알람과 조치) — 읽기만 한다.
         어떤 필드를 긁는지는 src/data/fieldEnglishAudio.js 의 extractSlideSentences() 주석에 있다
         (화면도 같은 규칙으로 ▶ 를 붙이므로 규칙은 그 파일에서만 고친다).
   출력: public/audio/field-english/<sha1(문장) 앞 10자리>.mp3   (mp3_44100_64 — 용량 절약)
         src/data/fieldEnglishAudio.manifest.json                  { "문장 텍스트": "해시" } (키 정렬)

   사용:  node scripts/narration/field-english-build.js                 # 없는 mp3 만 생성
          node scripts/narration/field-english-build.js --list          # 뽑힌 문장만 출력, 생성 안 함
          node scripts/narration/field-english-build.js --force         # 모두 다시 생성 (목소리를 바꿨을 때)
          node scripts/narration/field-english-build.js --chapters=w5   # 챕터 고르기 (기본 w5,w6)
          node scripts/narration/field-english-build.js --voice=<id>    # 목소리 바꾸기 (기본 Brian)

   API 키: 환경변수 ELEVENLABS_API_KEY. 없으면 curl 로 보낸다 — 클로드 클라우드 세션에서는 프록시가
          api.elevenlabs.io 요청에 키를 넣어 주는데 Node 의 fetch 는 HTTPS_PROXY 를 안 타서 401 이 난다 (build.js 와 같은 방식).
   목소리: Brian (nPczCjzI2devNBz1zQrb) — 일레븐랩스 기본 음성, 미국식 남성 내레이션. 차분하고 또렷해 장비 현장 안내 톤에 맞다.
          이 계정은 voices 목록 조회가 안 되므로(401) ID 로 직접 지정했고, 짧은 문장으로 200 응답을 확인했다.
   파일명이 문장의 해시라서 문장이 바뀌면 자동으로 새 파일이 생기고, 안 쓰는 옛 파일은 지우지 않고 개수만 알려 준다.
   Node 20.19+/22 (src/data/*.js 를 ESM 으로 import 한다). */
// (CommonJS 스크립트 — eslint 는 모듈로 보므로 'use strict' 는 적지 않는다)
/* src/data/*.js 를 ESM 으로 읽을 때 Node 가 내는 MODULE_TYPELESS_PACKAGE_JSON 안내만 거른다 (package.json 은 건드리지 않는다) */
process.removeAllListeners('warning');
process.on('warning', (w) => { if (w.code !== 'MODULE_TYPELESS_PACKAGE_JSON') console.warn(w.stack || w.message); });
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { spawnSync } = require('child_process');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..', '..');
const DATA = path.join(ROOT, 'src', 'data', 'fieldEnglishChapters.data.js');
const HELPER = path.join(ROOT, 'src', 'data', 'fieldEnglishAudio.js');
const LABS = path.join(ROOT, 'src/simulators/fieldEnglishLabs.js'); // 6장 실습 화면의 고정 알람 문장
const MANIFEST = path.join(ROOT, 'src', 'data', 'fieldEnglishAudio.manifest.json');
const OUT_DIR = path.join(ROOT, 'public', 'audio', 'field-english');

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => { const a = args.find((x) => x.startsWith(n + '=')); return a ? a.slice(n.length + 1) : d; };
const FORCE = flag('--force'), LIST = flag('--list');
const CHAPTERS = opt('--chapters', 'w5,w6').split(',').map((s) => s.trim()).filter(Boolean);
const VOICE = opt('--voice', 'nPczCjzI2devNBz1zQrb'); // Brian
const MODEL = 'eleven_multilingual_v2';
const OUTPUT_FORMAT = 'mp3_44100_64';
const VOICE_SETTINGS = { stability: 0.6, similarity_boost: 0.82, style: 0.2, use_speaker_boost: true }; // build.js 와 동일

const hashOf = (key) => crypto.createHash('sha1').update(key, 'utf8').digest('hex').slice(0, 10);

/* 읽어 줄 글 — 키는 화면 표기 그대로 두고, 음성으로 어색한 기호만 말로 바꾼다 */
function ttsText(key) {
  return key
    .replace(/\s*→\s*/g, ', then ')  // 흐름 화살표 "A → B" → "A, then B"
    .replace(/~\s?(?=\d)/g, 'about '); // "~0" → "about 0"
}

/* build.js 의 tts() 와 같은 방식 — 키가 없으면 curl (프록시가 키 주입) */
async function tts(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=${OUTPUT_FORMAT}`;
  const body = JSON.stringify({ text, model_id: MODEL, voice_settings: VOICE_SETTINGS });
  if (process.env.ELEVENLABS_API_KEY) {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'xi-api-key': process.env.ELEVENLABS_API_KEY }, body });
    if (!r.ok) throw new Error(`TTS ${r.status}: ${(await r.text()).slice(0, 300)}`);
    return Buffer.from(await r.arrayBuffer());
  }
  const tmp = path.join(require('os').tmpdir(), `fe-tts-${process.pid}-${Date.now()}.mp3`);
  const r = spawnSync('curl', ['-sS', '-m', '180', '-o', tmp, '-w', '%{http_code}', '-X', 'POST', url, '-H', 'Content-Type: application/json', '--data-binary', '@-'], { input: body, encoding: 'utf8' });
  const code = (r.stdout || '').trim();
  const buf = fs.existsSync(tmp) ? fs.readFileSync(tmp) : Buffer.alloc(0);
  try { fs.unlinkSync(tmp); } catch (e) { /* 없음 */ }
  if (r.status !== 0 || code !== '200') throw new Error(`TTS curl ${code || r.status}: ${buf.slice(0, 300).toString()} ${r.stderr || ''}`);
  if (buf.length < 1000 || buf.slice(0, 3).toString() !== 'ID3') throw new Error(`TTS 응답이 mp3 가 아닙니다 (${buf.length} B): ${buf.slice(0, 120).toString()}`);
  return buf;
}
/* 여러 빌드가 동시에 돌면 429·5xx 가 날 수 있다 — 3회까지 5·10·20초 간격으로 다시 보낸다 */
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
async function ttsRetry(...a) { let last; for (let i = 0; i < 4; i++) { try { return await tts(...a); } catch (e) { last = e; if (i < 3 && /429|5\d\d|curl 000|curl 0:|mp3 가 아닙니다/.test(e.message)) { await sleep(5000 * 2 ** i); continue; } throw e; } } throw last; }

(async () => {
  const [{ CONTENT_CHAPTERS }, helper] = await Promise.all([import(pathToFileURL(DATA).href), import(pathToFileURL(HELPER).href)]);
  const picked = CHAPTERS.map((id) => {
    const ch = CONTENT_CHAPTERS.find((c) => c.id === id);
    if (!ch) { console.error(`챕터 ${id} 가 데이터에 없습니다`); process.exit(1); }
    return ch;
  });
  // 챕터별 목록(보고용) + 전체 중복 제거 목록(생성용)
  const perChapter = picked.map((ch) => ({ id: ch.id, title: ch.title, keys: helper.extractChapterSentences([ch]) }));
  const keys = helper.extractChapterSentences(picked);
  if (CHAPTERS.includes('w6')) {   // 6장 실습(ACK/RESET · 우선순위)의 고정 알람 문장도 함께
    const labs = await import(pathToFileURL(LABS).href);
    const labKeys = helper.extractLabSentences(labs).filter((k) => !keys.includes(k));
    keys.push(...labKeys); perChapter.push({ id: 'w6-sim', title: '6장 실습 알람 문장', keys: labKeys });
  }
  for (const pc of perChapter) console.log(`${pc.id} ${pc.title}: 문장 ${pc.keys.length} · ${pc.keys.reduce((a, k) => a + k.length, 0)}자`);
  console.log(`합계(중복 제거): 문장 ${keys.length} · ${keys.reduce((a, k) => a + k.length, 0)}자`);
  if (LIST) { for (const pc of perChapter) { console.log(`\n== ${pc.id}`); pc.keys.forEach((k) => console.log(`  ${hashOf(k)}  ${k}`)); } return; }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let prev = {};
  try { prev = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch (e) { /* 처음 */ }
  const manifest = {};
  let made = 0, skipped = 0, chars = 0, bytes = 0, failed = 0;
  for (const key of keys) {
    const h = hashOf(key), file = path.join(OUT_DIR, h + '.mp3');
    if (fs.existsSync(file) && !FORCE) { skipped++; manifest[key] = h; bytes += fs.statSync(file).size; continue; }
    const say = ttsText(key);
    process.stdout.write(`  ${h} (${say.length}자) ${say.slice(0, 60)}${say.length > 60 ? '…' : ''} … `);
    try {
      const buf = await ttsRetry(say);
      fs.writeFileSync(file, buf);
      made++; chars += say.length; bytes += buf.length; manifest[key] = h;
      console.log(`${(buf.length / 1024).toFixed(1)} KB`);
    } catch (e) {
      failed++; console.log(`실패: ${e.message.split('\n')[0]}`);
      if (prev[key] && fs.existsSync(path.join(OUT_DIR, prev[key] + '.mp3'))) manifest[key] = prev[key]; // 옛 파일이라도 남긴다
    }
  }
  // 매니페스트는 이번 챕터 밖의 기존 항목(다른 챕터를 나중에 만들었을 때)을 지키고, 이번 챕터 것은 새로 쓴다
  const kept = Object.fromEntries(Object.entries(prev).filter(([k, h]) => !(k in manifest) && !keys.includes(k) && fs.existsSync(path.join(OUT_DIR, h + '.mp3'))));
  const merged = Object.fromEntries(Object.entries({ ...kept, ...manifest }).sort(([a], [b]) => a.localeCompare(b, 'en')));
  fs.writeFileSync(MANIFEST, JSON.stringify(merged, null, 1) + '\n');
  const used = new Set(Object.values(merged));
  const orphans = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.mp3') && !used.has(f.slice(0, -4)));
  console.log(`\nmp3 생성 ${made} · 재사용 ${skipped} · 실패 ${failed} · 이번에 쓴 글자 ${chars} · 매니페스트 ${Object.keys(merged).length}문장 · 총 용량 ${(bytes / 1024 / 1024).toFixed(2)} MB`
    + (orphans.length ? ` · 안 쓰는 옛 파일 ${orphans.length}개(지우지 않음)` : ''));
  if (failed) process.exit(2);
})().catch((e) => { console.error(e); process.exit(1); });
