#!/usr/bin/env node
/* ═══ 현장 실무영어 — 강의 듣기 mp3 + 펜 시각 빌드 ═══
   입력: scripts/narration/field-english-wNN.lecture.json   (슬라이드별 say — 표시 규칙은 src/data/fieldEnglishLecture.js)
         src/data/fieldEnglishChapters.data.js              (슬라이드 서명 확인용 — 대본의 i·type 이 실제 슬라이드와 맞는지)
   출력: public/audio/field-english/lecture/<h>.mp3          (mp3_44100_64)
         scripts/narration/lecture-align/<h>.json           (글자별 시작 시각 — 표시만 바꿨을 때 음성을 다시 만들지 않으려고 둔다)
         src/data/fieldEnglishLecture.manifest.json         { "w9": [ { i, sig, h, sec, cues: [{ t, k, x, n }] } ] }
   사용: node scripts/narration/field-english-lecture-build.mjs w09 [--force] [--list]
   일레븐랩스 /with-timestamps 를 curl 로 부른다(클로드 클라우드 세션은 프록시가 api.elevenlabs.io 에 키를 넣는다. Node fetch 는 HTTPS_PROXY 를 안 탄다).
   h = sha1(voice|model|읽을 글) 앞 10자리 — 읽을 글이 같으면 표시(펜)만 바뀌어도 음성은 다시 만들지 않는다. */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import { spawnSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT_DIR = path.join(ROOT, 'public', 'audio', 'field-english', 'lecture');
const ALIGN_DIR = path.join(HERE, 'lecture-align');
const MANIFEST = path.join(ROOT, 'src', 'data', 'fieldEnglishLecture.manifest.json');
const VOICE_SETTINGS = { stability: 0.6, similarity_boost: 0.82, style: 0.2, use_speaker_boost: true }; // 웨이퍼 이송 강의와 같은 프리셋

const args = process.argv.slice(2);
const FORCE = args.includes('--force'), LIST = args.includes('--list');
const only = args.filter((a) => !a.startsWith('--')).map((a) => a.replace(/^w?0*/, ''));
const files = fs.readdirSync(HERE).filter((f) => /^field-english-w\d+\.lecture\.json$/.test(f))
  .filter((f) => !only.length || only.includes(f.match(/w0*(\d+)/)[1]));
if (!files.length) { console.error('대본이 없습니다:', only); process.exit(1); }

const { parseLecture, slideSig } = await import(pathToFileURL(path.join(ROOT, 'src/data/fieldEnglishLecture.js')).href);
const { CONTENT_CHAPTERS } = await import(pathToFileURL(path.join(ROOT, 'src/data/fieldEnglishChapters.data.js')).href);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function ttsWithTimestamps(text, voice, model) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_64`;
  const body = JSON.stringify({ text, model_id: model, voice_settings: VOICE_SETTINGS });
  const tmp = path.join(os.tmpdir(), `fel-${process.pid}-${Date.now()}.json`);
  const r = spawnSync('curl', ['-sS', '-m', '300', '-o', tmp, '-w', '%{http_code}', '-X', 'POST', url, '-H', 'Content-Type: application/json', '--data-binary', '@-'], { input: body, encoding: 'utf8' });
  const code = (r.stdout || '').trim();
  const raw = fs.existsSync(tmp) ? fs.readFileSync(tmp, 'utf8') : '';
  try { fs.unlinkSync(tmp); } catch (e) { /* ignore */ }
  if (r.status !== 0 || code !== '200') throw new Error(`TTS ${code || r.status}: ${raw.slice(0, 300)} ${r.stderr || ''}`);
  const j = JSON.parse(raw);
  if (!j.audio_base64 || !j.alignment) throw new Error('응답에 audio_base64/alignment 가 없습니다');
  return j;
}
async function ttsRetry(...a) {
  let last;
  for (let i = 0; i < 4; i += 1) {
    try { return ttsWithTimestamps(...a); } catch (e) { last = e; if (i < 3 && /TTS (429|5\d\d|000|0:)/.test(e.message)) { await sleep(5000 * 2 ** i); continue; } throw e; }
  }
  throw last;
}
function mp3Sec(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' });
  const d = parseFloat(r.stdout);
  return r.status === 0 && isFinite(d) ? Math.round(d * 10) / 10 : null;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(ALIGN_DIR, { recursive: true });
let manifest = {};
try { manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch (e) { /* 처음 */ }

let made = 0, reused = 0, chars = 0;
const missing = []; // 음성을 못 만든 슬라이드 — 매니페스트에 싣지 않는다(화면에 '강의 듣기' 가 안 붙는다)
let stopTts = null;  // 크레딧 소진처럼 다시 보내도 안 되는 실패 — 남은 슬라이드는 보내지 않고 이미 있는 것만 싣는다
for (const f of files) {
  const J = JSON.parse(fs.readFileSync(path.join(HERE, f), 'utf8'));
  const ch = CONTENT_CHAPTERS.find((c) => c.id === J.chapter);
  if (!ch) { console.error(`${f}: 챕터 ${J.chapter} 없음`); process.exit(1); }
  const entries = [];
  for (const sl of J.slides) {
    const slide = ch.slides[sl.i];
    if (!slide || slide.type !== sl.type) { console.error(`${f}: 슬라이드 ${sl.i} 는 ${slide && slide.type} — 대본은 ${sl.type}. 대본과 교재 순서가 어긋났습니다.`); process.exit(1); }
    const { spoken, cues } = parseLecture(sl.say);
    const h = crypto.createHash('sha1').update(`${J.voice}|${J.model}|${spoken}`, 'utf8').digest('hex').slice(0, 10);
    const mp3 = path.join(OUT_DIR, `${h}.mp3`), alignFile = path.join(ALIGN_DIR, `${h}.json`);
    if (LIST) { console.log(`  ${J.chapter}#${sl.i} ${h} ${spoken.length}자 · 펜 ${cues.length}`); continue; }
    let align;
    if (!FORCE && fs.existsSync(mp3) && fs.existsSync(alignFile)) { align = JSON.parse(fs.readFileSync(alignFile, 'utf8')); reused += 1; }
    else if (stopTts) { missing.push(`${J.chapter}#${sl.i}`); continue; }
    else {
      process.stdout.write(`  ${J.chapter}#${sl.i} ${h} (${spoken.length}자) … `);
      let j;
      try { j = await ttsRetry(spoken, J.voice, J.model); } catch (e) {
        console.log(`실패: ${e.message.split('\n')[0].slice(0, 200)}`);
        missing.push(`${J.chapter}#${sl.i}`);
        if (/quota_exceeded|TTS 401|TTS 403/.test(e.message)) stopTts = e.message;
        continue;
      }
      fs.writeFileSync(mp3, Buffer.from(j.audio_base64, 'base64'));
      const a = j.alignment;
      if (a.characters.join('') !== spoken) throw new Error(`#${sl.i}: 정렬 글자가 보낸 글과 다릅니다 — 위치 대응을 믿을 수 없다`);
      align = { start: a.character_start_times_seconds.map((t) => Math.round(t * 1000) / 1000) };
      fs.writeFileSync(alignFile, JSON.stringify(align));
      made += 1; chars += spoken.length;
      console.log(`${(fs.statSync(mp3).size / 1024).toFixed(0)} KB`);
    }
    if (align.start.length !== spoken.length) throw new Error(`#${sl.i}: 정렬 길이 ${align.start.length} ≠ 글 길이 ${spoken.length}`);
    const sec = mp3Sec(mp3) ?? (align.start[align.start.length - 1] + 0.5);
    entries.push({ i: sl.i, sig: slideSig(slide), h, sec, cues: cues.map((c) => ({ t: align.start[Math.min(c.at, align.start.length - 1)], k: c.k, x: c.x, n: c.n })) });
  }
  if (!LIST) manifest[J.chapter] = entries;
}
if (!LIST) {
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + '\n');
  const used = new Set(Object.values(manifest).flat().map((e) => e.h));
  const stale = fs.readdirSync(OUT_DIR).filter((x) => x.endsWith('.mp3') && !used.has(x.slice(0, -4)));
  console.log(`\n음성 생성 ${made} · 재사용 ${reused} · 이번에 쓴 글자 ${chars}` + (stale.length ? ` · 안 쓰는 옛 파일 ${stale.length}개: ${stale.join(', ')}` : ''));
  if (missing.length) {
    console.log(`음성 없음 ${missing.length}장(매니페스트에 싣지 않음 — 화면에 '강의 듣기' 가 안 붙는다): ${missing.join(' ')}`);
    if (stopTts) console.log('  원인: 다시 보내도 안 되는 실패(크레딧·권한) — 해결 뒤 같은 명령을 다시 돌리면 빠진 것만 만든다.');
    process.exit(1);
  }
}
