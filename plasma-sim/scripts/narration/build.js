#!/usr/bin/env node
/* ═══ 교재 강의자 메모 · 음성(mp3) 빌드 ═══
   입력: scripts/narration/wafer-transfer-chNN.json (슬라이드별 nid · key · kw · say · voice · model)
   출력: public/topic-decks/wafer-transfer/narration/<nid>.mp3  (일레븐랩스 TTS)
         각 데크 HTML 의 <script id="wt-notes" type="application/json"> 블록 갱신
         (데크의 _notes.js 가 이 블록을 읽어 슬라이드 아래 바를 그린다)

   사용:  node scripts/narration/build.js                 # 모든 JSON, mp3 는 없는 것만 생성
          node scripts/narration/build.js ch06            # 6강만
          node scripts/narration/build.js ch06 --force    # 대본을 고쳤을 때 mp3 다시 생성
          node scripts/narration/build.js --no-tts        # mp3 는 건드리지 않고 메모 블록만 갱신

   API 키: 환경변수 ELEVENLABS_API_KEY. (클로드 클라우드 세션에서는 프록시가 키를 넣어 주므로 없어도 된다.)
   음성·모델은 JSON 의 voice / model. 목소리를 바꾸려면 그 값을 고치고 --force 로 다시 만든다.
   대본이 바뀌었는지는 옆에 남기는 <nid>.txt 와 비교해 판단한다 — 같으면 건너뛰어 글자 수를 아낀다. */
const fs = require('fs'), path = require('path');
const { spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', '..');
const args = process.argv.slice(2);
const FORCE = args.includes('--force'), NO_TTS = args.includes('--no-tts');
const only = args.filter(a => !a.startsWith('--'));
const files = fs.readdirSync(__dirname).filter(f => /^wafer-transfer-ch\d+\.json$/.test(f))
  .filter(f => !only.length || only.some(o => f.includes(o)));
if (!files.length) { console.error('대본 JSON 이 없습니다:', only); process.exit(1); }

const VOICE_SETTINGS = { stability: 0.6, similarity_boost: 0.82, style: 0.2, use_speaker_boost: true }; // YOUTUBENEWS neutral 프리셋

async function tts(text, voice, model) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`;
  const body = JSON.stringify({ text, model_id: model, voice_settings: VOICE_SETTINGS });
  if (process.env.ELEVENLABS_API_KEY) {           // 키가 있으면 직접 호출
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'xi-api-key': process.env.ELEVENLABS_API_KEY }, body });
    if (!r.ok) throw new Error(`TTS ${r.status}: ${(await r.text()).slice(0, 300)}`);
    return Buffer.from(await r.arrayBuffer());
  }
  /* 키가 없으면 curl 로 보낸다 — Node 의 fetch 는 HTTPS_PROXY 를 안 타서 프록시가 키를 넣어 줄 수 없다.
     (클로드 클라우드 세션: api.elevenlabs.io 로 가는 요청에 프록시가 키를 주입한다) */
  const tmp = path.join(require('os').tmpdir(), `tts-${process.pid}-${Date.now()}.mp3`);
  const r = spawnSync('curl', ['-sS', '-m', '180', '-o', tmp, '-w', '%{http_code}', '-X', 'POST', url, '-H', 'Content-Type: application/json', '--data-binary', '@-'], { input: body, encoding: 'utf8' });
  const code = (r.stdout || '').trim();
  const buf = fs.existsSync(tmp) ? fs.readFileSync(tmp) : Buffer.alloc(0);
  try { fs.unlinkSync(tmp); } catch (e) {}
  if (r.status !== 0 || code !== '200') throw new Error(`TTS curl ${code || r.status}: ${buf.slice(0, 300).toString()} ${r.stderr || ''}`);
  return buf;
}
/* 여러 빌드가 동시에 돌면 429·5xx 가 날 수 있다 — 3회까지 5·10·20초 간격으로 다시 보낸다 */
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
async function ttsRetry(...a) { let last; for (let i = 0; i < 4; i++) { try { return await tts(...a); } catch (e) { last = e; if (i < 3 && /429|5\d\d|curl 000|curl 0:/.test(e.message)) { await sleep(5000 * 2 ** i); continue; } throw e; } } throw last; }
/* mp3 길이(초) — ffprobe 가 있으면 정확히 재고, 없으면 64 kbps CBR 크기로 계산한다 */
function mp3Sec(buf, file) {
  try { const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' });
    const d = parseFloat(r.stdout); if (r.status === 0 && isFinite(d)) return Math.round(d); } catch (e) {}
  return Math.round(buf.length * 8 / 64000);
}

(async () => {
  for (const f of files) {
    const J = JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8'));
    const deckPath = path.join(ROOT, J.deck), outDir = path.join(path.dirname(deckPath), 'narration');
    fs.mkdirSync(outDir, { recursive: true });
    let html = fs.readFileSync(deckPath, 'utf8');
    const nids = [...html.matchAll(/data-nid="([^"]+)"/g)].map(m => m[1]);
    const notes = {};
    let made = 0, skipped = 0, chars = 0;
    for (const s of J.slides) {
      if (!nids.includes(s.nid)) console.warn(`  ! ${s.nid}: 데크에 data-nid 가 없습니다 — 바가 안 붙습니다`);
      const mp3 = path.join(outDir, s.nid + '.mp3'), txt = path.join(outDir, s.nid + '.txt');
      const say = s.say.trim();
      let buf = null;
      if (!NO_TTS) {
        const same = fs.existsSync(mp3) && fs.existsSync(txt) && fs.readFileSync(txt, 'utf8') === say;
        if (same && !FORCE) { skipped++; buf = fs.readFileSync(mp3); }
        else {
          process.stdout.write(`  ${s.nid} (${say.length}자) … `);
          buf = await ttsRetry(say, J.voice, J.model); fs.writeFileSync(mp3, buf); fs.writeFileSync(txt, say);
          made++; chars += say.length; console.log(`${(buf.length / 1024).toFixed(0)} KB · ${mp3Sec(buf, mp3)}s`);
        }
      } else if (fs.existsSync(mp3)) buf = fs.readFileSync(mp3);
      notes[s.nid] = { key: s.key, kw: s.kw, sec: buf ? mp3Sec(buf, mp3) : 0, audio: !!buf };
    }
    // 데크에 메모 블록 주입(있으면 교체) — _notes.css/_notes.js 포함 여부도 맞춘다
    const block = `<script id="wt-notes" type="application/json">${JSON.stringify(notes)}</script>`;
    if (/<script id="wt-notes"[^>]*>[\s\S]*?<\/script>/.test(html)) html = html.replace(/<script id="wt-notes"[^>]*>[\s\S]*?<\/script>/, block);
    else html = html.replace('<script src="_print.js"></script>', block + '\n<script src="_notes.js"></script>\n<script src="_print.js"></script>');
    if (!html.includes('_notes.css')) html = html.replace('<link rel="stylesheet" href="_print.css"/>', '<link rel="stylesheet" href="_print.css"/>\n<link rel="stylesheet" href="_notes.css"/>');
    if (!html.includes('_notes.js')) html = html.replace('<script src="_print.js"></script>', '<script src="_notes.js"></script>\n<script src="_print.js"></script>');
    fs.writeFileSync(deckPath, html);
    const missing = nids.filter(n => !notes[n]);
    console.log(`${f}: 슬라이드 ${J.slides.length} · mp3 생성 ${made} · 재사용 ${skipped} · 글자 ${chars}` + (missing.length ? ` · 메모 없는 슬라이드 ${missing.join(',')}` : ''));
  }
})().catch(e => { console.error(e); process.exit(1); });
