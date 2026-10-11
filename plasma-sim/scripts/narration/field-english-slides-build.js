#!/usr/bin/env node
/* ═══ 현장 실무영어 — 슬라이드 전체 읽기 mp3 빌드 (한글+영어 혼합 내레이션) ═══
   대상: 챕터의 story(첫 화면) · read(박스형 읽기 글) · manual(Operating Manual) 슬라이드 — 기본 w5,w6
   화자: Chris(iP95p4xoKVk53GoZ742B) — 영어 원어민이면서 6·7강 한국어 해설에도 쓴 음성. 한국어 설명 속 영어 문장을 한 사람이 읽는다.
   출력: public/audio/field-english/slides/<sha1 앞 10자리>.mp3 (mp3_44100_64)
         매니페스트 src/data/fieldEnglishSlideAudio.manifest.json  { "읽어 줄 글": { "h": 해시, "sec": 길이 } }
   사용: node scripts/narration/field-english-slides-build.js [--chapters=w5,w6] [--force] [--list] [--voice=ID]
   키 없이 돌리면 curl 로 보낸다(클로드 클라우드 세션은 프록시가 api.elevenlabs.io 에 키를 넣어 준다. Node fetch 는 HTTPS_PROXY 를 안 탄다). */
process.removeAllListeners('warning');
process.on('warning', (w) => { if (w.code !== 'MODULE_TYPELESS_PACKAGE_JSON') console.warn(w.stack || w.message); });
const fs = require('fs'), path = require('path'), crypto = require('crypto'), os = require('os');
const { spawnSync } = require('child_process');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..', '..');
const DATA = path.join(ROOT, 'src', 'data', 'fieldEnglishChapters.data.js');
const HELPER = path.join(ROOT, 'src', 'data', 'fieldEnglishAudio.js');
const MANIFEST = path.join(ROOT, 'src', 'data', 'fieldEnglishSlideAudio.manifest.json');
const OUT_DIR = path.join(ROOT, 'public', 'audio', 'field-english', 'slides');

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => { const a = args.find((x) => x.startsWith(n + '=')); return a ? a.slice(n.length + 1) : d; };
const FORCE = flag('--force'), LIST = flag('--list');
const CHAPTERS = opt('--chapters', 'w5,w6').split(',').map((s) => s.trim()).filter(Boolean);
const VOICE = opt('--voice', 'iP95p4xoKVk53GoZ742B'); // Chris
const MODEL = 'eleven_multilingual_v2';
const OUTPUT_FORMAT = 'mp3_44100_64';
const VOICE_SETTINGS = { stability: 0.6, similarity_boost: 0.82, style: 0.2, use_speaker_boost: true };
const hashOf = (key) => crypto.createHash('sha1').update(key, 'utf8').digest('hex').slice(0, 10);

/* 읽을 때만 바꾸는 기호 — 키(매니페스트)는 글 그대로 둔다 */
const ttsText = (k) => k.replace(/→/g, ', then ').replace(/\s*·\s*/g, ', ').replace(/~(\d)/g, 'about $1');

async function tts(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=${OUTPUT_FORMAT}`;
  const body = JSON.stringify({ text, model_id: MODEL, voice_settings: VOICE_SETTINGS });
  if (process.env.ELEVENLABS_API_KEY) {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'xi-api-key': process.env.ELEVENLABS_API_KEY }, body });
    if (!r.ok) throw new Error(`TTS ${r.status}: ${(await r.text()).slice(0, 300)}`);
    return Buffer.from(await r.arrayBuffer());
  }
  const tmp = path.join(os.tmpdir(), `fes-${process.pid}-${Date.now()}.mp3`);
  const r = spawnSync('curl', ['-sS', '-m', '240', '-o', tmp, '-w', '%{http_code}', '-X', 'POST', url, '-H', 'Content-Type: application/json', '--data-binary', '@-'], { input: body, encoding: 'utf8' });
  const code = (r.stdout || '').trim(), buf = fs.existsSync(tmp) ? fs.readFileSync(tmp) : Buffer.alloc(0);
  try { fs.unlinkSync(tmp); } catch (e) { /* ignore */ }
  if (r.status !== 0 || code !== '200') throw new Error(`TTS curl ${code || r.status}: ${buf.slice(0, 300).toString()} ${r.stderr || ''}`);
  return buf;
}
/* 여러 빌드가 동시에 돌면 429·5xx 가 날 수 있다 — 3회까지 5·10·20초 간격으로 다시 보낸다 */
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
async function ttsRetry(...a) { let last; for (let i = 0; i < 4; i++) { try { return await tts(...a); } catch (e) { last = e; if (i < 3 && /429|5\d\d|curl 000|curl 0:|mp3 가 아닙니다/.test(e.message)) { await sleep(5000 * 2 ** i); continue; } throw e; } } throw last; }
function mp3Sec(file, size) {
  try { const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' }); const d = parseFloat(r.stdout); if (r.status === 0 && isFinite(d)) return Math.round(d); } catch (e) { /* ignore */ }
  return Math.round(size * 8 / 64000);
}

(async () => {
  const [{ CONTENT_CHAPTERS }, helper] = await Promise.all([import(pathToFileURL(DATA).href), import(pathToFileURL(HELPER).href)]);
  const picked = CHAPTERS.map((id) => { const ch = CONTENT_CHAPTERS.find((c) => c.id === id); if (!ch) { console.error(`챕터 ${id} 없음`); process.exit(1); } return ch; });
  picked.forEach((ch) => { const n = helper.extractSlideNarrations([ch]); console.log(`${ch.id} ${ch.title}: 슬라이드 ${n.length} · ${n.reduce((a, k) => a + k.length, 0)}자`); });
  const keys = helper.extractSlideNarrations(picked);
  console.log(`합계(중복 제거): ${keys.length}개 · ${keys.reduce((a, k) => a + k.length, 0)}자`);
  if (LIST) { keys.forEach((k) => console.log(`  ${hashOf(k)}  ${k.slice(0, 70)}…`)); return; }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let prev = {}; try { prev = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch (e) { /* 처음 */ }
  const manifest = {}; let made = 0, skipped = 0, chars = 0, bytes = 0, failed = 0;
  for (const key of keys) {
    const h = hashOf(key), file = path.join(OUT_DIR, h + '.mp3');
    if (fs.existsSync(file) && !FORCE) { skipped++; const sz = fs.statSync(file).size; bytes += sz; manifest[key] = { h, sec: (prev[key] && prev[key].sec) || mp3Sec(file, sz) }; continue; }
    const say = ttsText(key);
    process.stdout.write(`  ${h} (${say.length}자) ${say.slice(0, 40)}… … `);
    try { const buf = await ttsRetry(say); fs.writeFileSync(file, buf); made++; chars += say.length; bytes += buf.length; manifest[key] = { h, sec: mp3Sec(file, buf.length) }; console.log(`${(buf.length / 1024).toFixed(0)} KB · ${manifest[key].sec}s`); }
    catch (e) { failed++; console.log(`실패: ${e.message.split('\n')[0]}`); if (prev[key] && fs.existsSync(path.join(OUT_DIR, prev[key].h + '.mp3'))) manifest[key] = prev[key]; }
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + '\n');
  const stale = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.mp3') && !Object.values(manifest).some((v) => v.h + '.mp3' === f));
  console.log(`\nmp3 생성 ${made} · 재사용 ${skipped} · 실패 ${failed} · 이번에 쓴 글자 ${chars} · 매니페스트 ${Object.keys(manifest).length}개 · 총 용량 ${(bytes / 1048576).toFixed(2)} MB` + (stale.length ? ` · 안 쓰는 옛 파일 ${stale.length}개(지우지 않음)` : ''));
  if (failed) process.exit(1);
})().catch((e) => { console.error(e); process.exit(1); });
