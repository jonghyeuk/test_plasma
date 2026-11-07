/**
 * 현장 실무영어 — 강별 조작 실습의 상태 모델 (순수 함수, React 없음)
 * ---------------------------------------------------------------------------
 * 1~7·9~14강 조작 실습이 같은 위젯(DevicePanel·EquipmentHMI·챔버 그림·부품 도해 등)을 띄우던 것을
 * 강마다 교재 본문이 가르치는 판단을 직접 해 보도록 나눈다. 화면(JSX)은
 * FieldEnglishSimulator.jsx 에 있고, 여기에는 전이·판정 규칙만 둔다 —
 * 같은 규칙을 vitest 로 돌려 확인하기 위해서다.
 *
 * 수치 근거
 *   · 교재에서 온 것 — base pressure 5.0E-6 Torr (3강), 편차 10% 초과 = OUT OF RANGE (4강 매뉴얼),
 *     reflected 20 W 미만이어야 함 · 매칭 예시 Load 45% / Tune 62% (5강 매뉴얼)
 *   · 이 실습을 위해 정한 것 — UNSTABLE 판정(완만한 추세를 뺀 흔들림 폭 8%), 점화 압력 창(20~300 mTorr),
 *     반사파 곡선, RF 자동 차단 한계(200 W), crossover 0.1 Torr, 토크 허용오차 ±0.5 N·m,
 *     시간 압축(수 초). 실제 값은 장비·레시피마다 다르다.
 */

/* =========================================================================
 * 공용
 * ====================================================================== */

export const ATM_TORR = 760;
export const BASE_TORR = 5e-6;

/** 로그 공간에서 target 쪽으로 rate(decade/s) 속도로 이동. 도착하면 target 을 그대로 돌려준다. */
export function approachLog(p, target, rate, dt) {
  const lp = Math.log10(p);
  const lt = Math.log10(target);
  const stepMax = rate * dt;
  if (Math.abs(lt - lp) <= stepMax) return target;
  return Math.pow(10, lp + Math.sign(lt - lp) * stepMax);
}

/* =========================================================================
 * 3강 ① 운전 버튼 패널 — 지금 눌러도 되는 버튼은 무엇인가 (인터록 사유 표시)
 *   ATM → PUMPING → READY → RUNNING → COMPLETE → PURGING → PURGED → VENTING → VENTED
 * ====================================================================== */

export const PROC_BUTTONS = ['PUMP', 'START', 'STOP', 'PURGE', 'VENT'];
export const PROC_RUN_S = 3;      // 공정 시간(압축)
export const PROC_PURGE_S = 2.4;  // N2 퍼지 시간(압축)

export function procInit() {
  return { phase: 'ATM', p: ATM_TORR, t: 0, aborted: false };
}

/** 버튼이 지금 허용되는가 — 막히면 화면에 띄울 인터록 사유(영문)를 함께 준다 */
export function procCheck(phase, btn) {
  const R = (reason) => ({ ok: false, reason });
  const OK = { ok: true, reason: '' };
  switch (btn) {
    case 'PUMP':
      if (phase === 'ATM' || phase === 'VENTED') return OK;
      if (phase === 'PUMPING') return R('PUMP DOWN ALREADY IN PROGRESS');
      if (phase === 'PURGING' || phase === 'VENTING') return R('SEQUENCE IN PROGRESS — WAIT');
      return R('CHAMBER ALREADY UNDER VACUUM');
    case 'START':
      if (phase === 'READY') return OK;
      if (phase === 'ATM' || phase === 'VENTED' || phase === 'PUMPING') return R('BASE PRESSURE NOT REACHED — READY IS OFF');
      if (phase === 'RUNNING') return R('PROCESS ALREADY RUNNING');
      return R('CYCLE COMPLETE — PURGE, VENT AND RELOAD FIRST');
    case 'STOP':
      if (phase === 'RUNNING') return OK;
      return R('NO PROCESS RUNNING — NOTHING TO STOP');
    case 'PURGE':
      if (phase === 'COMPLETE' || phase === 'READY') return OK;
      if (phase === 'RUNNING') return R('PROCESS RUNNING — STOP THE PROCESS FIRST');
      if (phase === 'PURGING') return R('N2 PURGE ALREADY IN PROGRESS');
      if (phase === 'PURGED') return R('PURGE ALREADY COMPLETE — VENT NEXT');
      if (phase === 'PUMPING') return R('PUMP DOWN IN PROGRESS — WAIT FOR BASE PRESSURE');
      return R('CHAMBER AT ATMOSPHERE — NOTHING TO PURGE');
    case 'VENT':
      if (phase === 'PURGED') return OK;
      if (phase === 'PUMPING') return R('PUMP RUNNING — NEVER VENT WHILE PUMPING');
      if (phase === 'RUNNING') return R('PROCESS RUNNING — DO NOT VENT');
      if (phase === 'READY' || phase === 'COMPLETE') return R('PURGE REQUIRED — PURGE WITH N2 BEFORE VENTING');
      if (phase === 'PURGING') return R('N2 PURGE IN PROGRESS — WAIT');
      return R('CHAMBER ALREADY AT ATMOSPHERE');
    default:
      return R('UNKNOWN COMMAND');
  }
}

/** 버튼을 눌렀을 때 — 막히면 상태는 그대로, INTERLOCK 로그만 남긴다 */
export function procPress(s, btn) {
  const chk = procCheck(s.phase, btn);
  if (!chk.ok) return { s, log: [{ t: 'ALARM', m: `INTERLOCK: ${btn} rejected — ${chk.reason}` }], rejected: chk.reason };
  switch (btn) {
    case 'PUMP':
      return { s: { ...s, phase: 'PUMPING', t: 0, aborted: false }, log: [{ t: 'CMD', m: 'Pumping... Evacuating the chamber.' }] };
    case 'START':
      return { s: { ...s, phase: 'RUNNING', t: 0 }, log: [{ t: 'CMD', m: 'Process started. Do not open the door until the cycle is COMPLETE.' }] };
    case 'STOP':
      return { s: { ...s, phase: 'COMPLETE', t: 0, aborted: true }, log: [{ t: 'CMD', m: 'Process ABORTED by operator. Wafer may be scrapped.' }] };
    case 'PURGE':
      return { s: { ...s, phase: 'PURGING', t: 0 }, log: [{ t: 'CMD', m: 'N2 purge in progress...' }] };
    case 'VENT':
      return { s: { ...s, phase: 'VENTING', t: 0 }, log: [{ t: 'CMD', m: 'Gate valve closed. Venting... (N2 to atmosphere)' }] };
    default:
      return { s, log: [] };
  }
}

/** 시간 경과 — 자동 전이(배기 완료·공정 종료·퍼지 종료·벤트 완료) */
export function procTick(s, dt) {
  const log = [];
  let n = { ...s, t: s.t + dt };
  if (n.phase === 'PUMPING') {
    n.p = approachLog(n.p, BASE_TORR, 2.4, dt);
    if (n.p <= BASE_TORR) {
      n = { ...n, phase: 'READY', t: 0 };
      log.push({ t: 'INFO', m: 'Base pressure reached (5.0E-6 Torr). READY lamp ON.' });
    }
  } else if (n.phase === 'RUNNING') {
    if (n.t >= PROC_RUN_S) {
      n = { ...n, phase: 'COMPLETE', t: 0 };
      log.push({ t: 'INFO', m: 'Process COMPLETE. Purge the chamber with N2 before venting.' });
    }
  } else if (n.phase === 'PURGING') {
    // N2 가 흘러 압력이 잠깐 오른다
    n.p = approachLog(n.p, 0.5, 4, dt);
    if (n.t >= PROC_PURGE_S) {
      n = { ...n, phase: 'PURGED', t: 0 };
      log.push({ t: 'INFO', m: 'N2 purge complete. Residual process gas removed.' });
    }
  } else if (n.phase === 'VENTING') {
    n.p = approachLog(n.p, ATM_TORR, 2.4, dt);
    if (n.p >= ATM_TORR) {
      n = { ...n, phase: 'VENTED', t: 0 };
      log.push({ t: 'INFO', m: 'Vent complete. Gauge reads atmosphere. Door unlocked.' });
    }
  }
  return { s: n, log };
}

/** 표시등 */
export function procLamps(phase) {
  return {
    ready: phase === 'READY',
    pump: phase === 'PUMPING' || phase === 'READY' || phase === 'RUNNING' || phase === 'COMPLETE' || phase === 'PURGING' || phase === 'PURGED',
    run: phase === 'RUNNING',
    doorLocked: !(phase === 'ATM' || phase === 'VENTED'),
  };
}

/* =========================================================================
 * 4강 ① SP / PV 상태 패널 — 값·상태어·색을 보고 정상/이상 판정
 * ====================================================================== */

export const OOR_FRAC = 0.10;       // 교재 매뉴얼: 설정값의 10% 초과 편차 = OUT OF RANGE
export const UNSTABLE_FRAC = 0.08;  // 이 실습의 가정: 완만한 추세를 뺀 흔들림 폭이 SP 의 8% 를 넘으면 UNSTABLE

/** 완만한 추세(2차 최소제곱 곡선)를 뺀 나머지의 폭.
    단순히 최대−최소를 쓰면 한 방향으로 서서히 가는 drift 까지 UNSTABLE 로 잡히고,
    직선만 빼면 지수 모양으로 휘는 drift 가 남는다. 교재가 구분하는 drift / spike / unstable 을
    가르려면 곡선 추세까지 빼야 한다. (사례 데이터: 정상 ≤ 4%, drift ≤ 1.2%, 요동·spike ≥ 14%) */
export function detrendedSpan(samples) {
  const n = samples.length;
  if (n < 4) return 0;
  const m = (n - 1) / 2;
  const xs = samples.map((_, i) => i - m);
  const sum = (f) => xs.reduce((a, x, i) => a + f(x, samples[i]), 0);
  // 정규방정식 [a b c] — y ≈ a + b·x + c·x²
  const A = [
    [n, sum((x) => x), sum((x) => x * x), sum((x, y) => y)],
    [sum((x) => x), sum((x) => x * x), sum((x) => x ** 3), sum((x, y) => x * y)],
    [sum((x) => x * x), sum((x) => x ** 3), sum((x) => x ** 4), sum((x, y) => x * x * y)],
  ];
  for (let i = 0; i < 3; i += 1) {
    for (let k = i + 1; k < 3; k += 1) {
      const f = A[k][i] / A[i][i];
      for (let j = i; j < 4; j += 1) A[k][j] -= f * A[i][j];
    }
  }
  const c = [0, 0, 0];
  for (let i = 2; i >= 0; i -= 1) {
    let v = A[i][3];
    for (let j = i + 1; j < 3; j += 1) v -= A[i][j] * c[j];
    c[i] = v / A[i][i];
  }
  const res = samples.map((y, i) => y - (c[0] + c[1] * xs[i] + c[2] * xs[i] * xs[i]));
  return Math.max(...res) - Math.min(...res);
}

/** 한 라인의 판정. samples = 최근 PV 값들(마지막이 현재값) */
export function judgeLine(sp, samples) {
  const pv = samples[samples.length - 1];
  const dev = sp ? (pv - sp) / sp : 0;
  const span = sp ? detrendedSpan(samples) / sp : 0;
  const inRange = Math.abs(dev) <= OOR_FRAC;
  const stable = span <= UNSTABLE_FRAC;
  return {
    pv, dev, span,
    range: inRange ? 'IN RANGE' : 'OUT OF RANGE',
    stability: stable ? 'STABLE' : 'UNSTABLE',
    normal: inRange && stable,
    side: dev > 0 ? 'above' : dev < 0 ? 'below' : 'at',
  };
}

// 라인 5개 × 사례 3개. 값은 이 실습을 위해 만든 것이다.
export const SPPV_LINES = [
  { id: 'prs', label: 'CHAMBER PRESSURE', unit: 'mTorr', sp: 10 },
  { id: 'ar', label: 'MFC-1  Ar', unit: 'sccm', sp: 50 },
  { id: 'cf4', label: 'MFC-2  CF4', unit: 'sccm', sp: 20 },
  { id: 'o2', label: 'MFC-3  O2', unit: 'sccm', sp: 5 },
  { id: 'he', label: 'He BACKSIDE', unit: 'Torr', sp: 8 },
];
export const SPPV_CASES = [
  {
    id: 'A', title: 'CASE A — 02:10 run',
    samples: {
      prs: [10.1, 9.9, 10.0, 10.1, 10.0, 9.9, 10.0, 10.1],
      ar: [49.8, 50.1, 50.0, 49.9, 50.2, 50.0, 49.9, 50.0],
      cf4: [20.1, 19.9, 20.0, 20.0, 20.1, 19.9, 20.0, 20.1],
      o2: [5.0, 5.0, 4.9, 5.0, 5.1, 5.0, 5.0, 5.0],
      he: [8.0, 8.1, 8.0, 7.9, 8.0, 8.0, 8.1, 8.0],
    },
  },
  {
    id: 'B', title: 'CASE B — 03:15 run',
    samples: {
      prs: [9.2, 10.8, 9.4, 10.9, 9.1, 10.7, 9.3, 10.6],   // 평균은 맞지만 요동 → UNSTABLE
      ar: [49.9, 46.0, 43.1, 41.0, 39.6, 38.8, 38.3, 38.0], // 서서히 떨어져 SP 보다 24% 낮음 → OUT OF RANGE (below) · 요동은 아님
      cf4: [20.0, 20.1, 19.9, 20.0, 20.0, 20.1, 20.0, 19.9],
      o2: [5.0, 5.1, 5.0, 4.9, 5.0, 5.0, 5.1, 5.0],
      he: [8.0, 8.0, 8.1, 8.0, 7.9, 8.0, 8.0, 8.1],
    },
  },
  {
    id: 'C', title: 'CASE C — 04:40 run',
    samples: {
      prs: [10.0, 10.3, 10.7, 11.0, 11.4, 11.8, 12.1, 12.5], // 서서히 상승(drift) → OUT OF RANGE (above)
      ar: [50.0, 49.9, 50.1, 50.0, 50.0, 49.8, 50.1, 50.0],
      cf4: [20.0, 19.9, 23.4, 20.0, 20.1, 20.0, 19.8, 20.0], // 순간 급등(spike) → UNSTABLE
      o2: [5.2, 5.1, 5.2, 5.2, 5.1, 5.2, 5.2, 5.2],         // SP 보다 4% 높지만 허용 안
      he: [8.0, 8.0, 7.9, 8.0, 8.1, 8.0, 8.0, 8.0],
    },
  },
];

/* =========================================================================
 * 4강 ② 트렌드 장비 화면 — SP 를 바꾸면 PV 가 따라오고, 벗어나면 OUT OF RANGE / 알람
 * ====================================================================== */

export const TREND_WIN_S = 30;        // 트렌드 창 길이(초)
export const TREND_DT = 0.25;         // 샘플 간격(초)
export const TREND_RAMP_S = 3;        // SP 변경 직후 램프 구간 — 이 동안은 편차가 커도 알람을 내지 않는다
export const TREND_ALARM_S = 2;       // OUT OF RANGE 가 이만큼 이어지면 ALARM
export const TREND_UNSTABLE_S = 3;    // UNSTABLE 판정 창

export const TREND_CHANNELS = [
  { id: 'prs', label: 'CHAMBER PRESSURE', unit: 'mTorr', sp: 10, min: 2, max: 50, tau: 1.2, noise: 0.004 },
  { id: 'ar', label: 'MFC-1 Ar FLOW', unit: 'sccm', sp: 50, min: 10, max: 200, tau: 0.8, noise: 0.004 },
];
export const TREND_FAULTS = [
  { id: 'none', label: '정상', en: 'Normal' },
  { id: 'leak', label: '미세 누설 (pressure drift)', en: 'Air leak' },
  { id: 'hunt', label: 'MFC 밸브 헌팅 (flow unstable)', en: 'MFC valve hunting' },
  { id: 'supply', label: '가스 공급 부족 (flow low)', en: 'Gas supply low' },
];

export function trendInit() {
  const ch = {};
  TREND_CHANNELS.forEach((c) => {
    ch[c.id] = { sp: c.sp, pv: c.sp, hist: [], rampLeft: 0, stableFrom: 0, oorFor: 0, alarmed: false, drift: 0, phase: 0 };
  });
  return { t: 0, fault: 'none', ch };
}

export function trendSetSp(s, id, sp) {
  const c = s.ch[id];
  return {
    s: { ...s, ch: { ...s.ch, [id]: { ...c, sp, rampLeft: TREND_RAMP_S, stableFrom: s.t + TREND_RAMP_S, oorFor: 0, alarmed: false } } },
    log: [{ t: 'CMD', m: `${chanDef(id).label} set point changed to ${fmtNum(sp)} ${chanDef(id).unit}. RAMPING...` }],
  };
}

export function trendSetFault(s, fault) {
  const ch = {};
  Object.keys(s.ch).forEach((k) => { ch[k] = { ...s.ch[k], drift: 0 }; });
  return { ...s, fault, ch };
}

function chanDef(id) { return TREND_CHANNELS.find((c) => c.id === id); }
export function fmtNum(v) { return Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(1); }

/** 채널 하나의 현재 상태 */
export function trendStatus(c) {
  if (c.rampLeft > 0) return { word: 'RAMPING', tone: 'dim', range: '—', stability: '—' };
  // 판정은 램프가 끝난 뒤의 샘플만 본다 — 램프 구간이 섞이면 거짓 UNSTABLE 이 뜬다
  const n = Math.max(2, Math.round(TREND_UNSTABLE_S / TREND_DT));
  const recent = c.hist.filter((h) => h.t >= c.stableFrom).slice(-n).map((h) => h.pv);
  const j = judgeLine(c.sp, recent.length ? recent : [c.pv]);
  if (c.alarmed) return { word: 'ALARM', tone: 'bad', range: j.range, stability: j.stability, j };
  if (j.range === 'OUT OF RANGE') return { word: 'OUT OF RANGE', tone: 'bad', range: j.range, stability: j.stability, j };
  if (j.stability === 'UNSTABLE') return { word: 'UNSTABLE', tone: 'warn', range: j.range, stability: j.stability, j };
  return { word: 'STABLE', tone: 'ok', range: j.range, stability: j.stability, j };
}

/** 한 샘플(dt) 진행. rnd 는 [0,1) 난수 — 테스트에서는 고정값을 넣는다 */
export function trendStep(s, dt, rnd = Math.random) {
  const log = [];
  const t = s.t + dt;
  const ch = {};
  TREND_CHANNELS.forEach((def) => {
    const c = s.ch[def.id];
    let target = c.sp;
    let drift = c.drift;
    let phase = c.phase + dt;
    let extra = 0;
    if (def.id === 'prs' && s.fault === 'leak') { drift = Math.min(drift + 0.018 * c.sp * dt, 0.6 * c.sp); target = c.sp + drift; }
    if (def.id === 'ar' && s.fault === 'supply') target = c.sp * 0.62;
    if (def.id === 'ar' && s.fault === 'hunt') extra = 0.07 * c.sp * Math.sin(phase * 2 * Math.PI * 0.8);
    const alpha = 1 - Math.exp(-dt / def.tau);
    const base = c.pv + (target - c.pv) * alpha;
    const noise = (rnd() - 0.5) * 2 * def.noise * c.sp;
    const pv = Math.max(0, base + noise);
    const shown = Math.max(0, pv + extra);
    const hist = [...c.hist, { t, pv: shown, sp: c.sp }].filter((h) => h.t > t - TREND_WIN_S);
    let n = { ...c, pv, drift, phase, hist, rampLeft: Math.max(0, c.rampLeft - dt) };
    if (c.rampLeft > 0 && n.rampLeft === 0) log.push({ t: 'INFO', m: `${def.label} ramp complete. Checking PV against SP.` });
    const st = trendStatus(n);
    if (n.rampLeft === 0 && st.range === 'OUT OF RANGE') {
      n.oorFor = c.oorFor + dt;
      if (!c.alarmed && n.oorFor >= TREND_ALARM_S) {
        n.alarmed = true;
        const side = shown > c.sp ? 'above' : 'below';
        log.push({ t: 'ALARM', m: `${def.label} OUT OF RANGE — PV ${fmtNum(shown)} ${def.unit} / SP ${fmtNum(c.sp)} ${def.unit} (${side} set point)` });
      }
    } else {
      n.oorFor = 0;
    }
    ch[def.id] = n;
  });
  return { s: { ...s, t, ch }, log };
}

/** 알람 해제 — 교재 매뉴얼: PV 가 허용 범위로 돌아오기 전에는 RESET 하지 않는다 */
export function trendReset(s, id) {
  const c = s.ch[id];
  const def = chanDef(id);
  const st = trendStatus({ ...c, alarmed: false });
  if (!c.alarmed) return { s, log: [], ok: false, reason: 'NO ACTIVE ALARM' };
  if (st.range === 'OUT OF RANGE') {
    return { s, log: [{ t: 'ALARM', m: `RESET rejected — ${def.label} PV is still OUT OF RANGE. Find the cause first.` }], ok: false, reason: 'PV STILL OUT OF RANGE' };
  }
  return {
    s: { ...s, ch: { ...s.ch, [id]: { ...c, alarmed: false, oorFor: 0 } } },
    log: [{ t: 'CMD', m: `${def.label} alarm reset. PV back within tolerance.` }],
    ok: true,
  };
}

/* =========================================================================
 * 5강 ① 점화 — Set gas flow → Set pressure → RF ON → Igniting → Tuning → Stable
 * ====================================================================== */

export const IGN_P_MIN = 20;    // mTorr — 이 실습의 가정: 이 창 밖이면 점화 실패
export const IGN_P_MAX = 300;
export const REFL_SPEC_W = 20;  // 교재 매뉴얼: reflected power must fall below 20 W

export function ignInit() {
  return { gas: 0, prs: 10, rfSp: 300, phase: 'OFF', t: 0, fwd: 0, refl: 0, fails: 0, lastFail: null };
}

/** 점화 조건 점검 — 실패하면 무엇이 문제였는지 */
export function ignCondition(s) {
  if (s.gas <= 0) return { ok: false, why: 'NO GAS FLOW' };
  if (s.prs < IGN_P_MIN) return { ok: false, why: 'PRESSURE TOO LOW' };
  if (s.prs > IGN_P_MAX) return { ok: false, why: 'PRESSURE TOO HIGH' };
  return { ok: true, why: '' };
}

export function ignRfOn(s) {
  if (s.phase !== 'OFF') return { s, log: [] };
  const log = [{ t: 'CMD', m: `RF ON — forward set point ${s.rfSp} W. Igniting...` }];
  // 교재: 점화가 안 될 때 RF 만 반복해서 올리지 마라 — 조건을 안 바꾸고 파워만 올려 다시 켜면 경고
  if (s.lastFail && s.lastFail.gas === s.gas && s.lastFail.prs === s.prs && s.rfSp > s.lastFail.rfSp) {
    log.push({ t: 'ALARM', m: 'WARNING: Do NOT increase RF power repeatedly. Check gas flow, pressure and match position first.' });
  }
  return { s: { ...s, phase: 'IGNITING', t: 0, fwd: s.rfSp, refl: Math.round(s.rfSp * 0.7) }, log };
}

export function ignRfOff(s) {
  if (s.phase === 'OFF') return { s, log: [] };
  return { s: { ...s, phase: 'OFF', t: 0, fwd: 0, refl: 0 }, log: [{ t: 'CMD', m: 'RF OFF.' }] };
}

export function ignTick(s, dt) {
  const log = [];
  let n = { ...s, t: s.t + dt };
  if (n.phase === 'IGNITING' && n.t >= 0.8) {
    const c = ignCondition(n);
    if (c.ok) {
      n = { ...n, phase: 'TUNING', t: 0 };
      log.push({ t: 'INFO', m: 'Plasma ignited. Match AUTO tuning...' });
    } else {
      n = { ...n, phase: 'FAILED', t: 0, refl: Math.round(n.fwd * 0.95), fails: n.fails + 1, lastFail: { gas: n.gas, prs: n.prs, rfSp: n.rfSp } };
      log.push({ t: 'ALARM', m: `Failed to ignite — No plasma (${c.why}). Reflected ${n.refl} W. RF will turn OFF.` });
    }
  } else if (n.phase === 'TUNING') {
    // 반사파가 지수적으로 줄어든다
    n.refl = Math.max(2, Math.round(n.refl * Math.exp(-dt / 0.35)));
    if (n.refl < REFL_SPEC_W && n.t >= 1.0) {
      n = { ...n, phase: 'STABLE', t: 0 };
      log.push({ t: 'INFO', m: `Reflected power ${n.refl} W (< ${REFL_SPEC_W} W). Plasma STABLE. Ready to process.` });
    }
  } else if (n.phase === 'FAILED' && n.t >= 1.2) {
    n = { ...n, phase: 'OFF', t: 0, fwd: 0, refl: 0 };
    log.push({ t: 'INFO', m: 'RF OFF by generator protection.' });
  }
  return { s: n, log };
}

/* =========================================================================
 * 5강 ② RF 값 판독 — SP / PV / Reflected 를 보고 정상·경고 판정
 * ====================================================================== */

export const RF_CASES = [
  { id: 1, sp: 600, fwd: 598, refl: 3, match: 'AUTO · TUNED', normal: true,
    why: 'Forward 가 SP 와 거의 같고 Reflected 3 W 는 20 W 미만 → 정상. Delivered ≈ 595 W.' },
  { id: 2, sp: 600, fwd: 600, refl: 64, match: 'AUTO · TUNING', normal: false,
    why: 'Reflected 64 W 는 20 W 기준을 넘는다 → HIGH (경고). 매칭이 아직 안 됐다 — match 위치와 압력을 확인.' },
  { id: 3, sp: 600, fwd: 431, refl: 5, match: 'AUTO · TUNED', normal: false,
    why: 'Reflected 는 낮지만 Forward PV 431 W 가 SP 600 W 에 못 미친다 → 발생기 출력 이상. SP 와 PV 를 반드시 짝으로 읽는다.' },
  { id: 4, sp: 600, fwd: 600, refl: 18, match: 'AUTO · TUNED', normal: true,
    why: 'Reflected 18 W 는 기준 20 W 바로 아래 → 정상 범위. 다만 추세를 계속 지켜본다.' },
  { id: 5, sp: 600, fwd: 600, refl: 140, match: 'AUTO · AT LIMIT', normal: false,
    why: 'Match 가 AT LIMIT 이고 Reflected 140 W → 매칭 한계. Auto tune 이 더 못 줄인다 — 원인(압력·가스·부품) 확인 전 RF 재시작 금지.' },
];

/* =========================================================================
 * 5강 ③ 매칭 네트워크 — Load / Tune 위치와 반사파
 * ====================================================================== */

export const MATCH_FWD_W = 600;
export const MATCH_TRIP_W = 200;   // 이 실습의 가정: 반사파가 이 값을 넘으면 발생기가 RF OFF
export const MATCH_RATE = 30;      // AUTO 이동 속도 (%/s)
export const MATCH_TRIP_HOLD_S = 2.5; // 한계 초과가 이만큼 이어지면 차단 (AUTO 이동 중은 세지 않는다)

export const MATCH_CASES = [
  { id: 'normal', label: '정상 챔버', opt: { load: 45, tune: 62 },
    note: '교재 예시 위치 Load 45% / Tune 62% 근처에서 매칭된다.' },
  { id: 'limit', label: '세정 직후 · 챔버 조건 변화', opt: { load: 88, tune: 110 },
    note: '최적점이 Tune 100% 를 넘어선다 — AUTO 가 끝까지 가도 반사파가 남는다 (match at limit).' },
  { id: 'trip', label: '압력 이상 (고압)', opt: { load: 128, tune: 118 },
    note: '최적점이 한참 밖 — 반사파가 발생기 보호 한계를 넘어 RF 가 꺼진다.' },
];

/** 위치와 최적점의 거리 → 반사파(W). 실습용 곡선: Pf·(1 − exp(−(d/25)²)) */
export function matchRefl(load, tune, opt, fwd = MATCH_FWD_W) {
  const d = Math.hypot(load - opt.load, tune - opt.tune);
  return Math.round(fwd * (1 - Math.exp(-((d / 25) ** 2))));
}

export function matchInit(caseId = 'normal') {
  return { caseId, mode: 'AUTO', load: 20, tune: 30, rf: true, trip: false, atLimit: false, moving: false, overFor: 0 };
}

const clamp01 = (v) => Math.max(0, Math.min(100, v));

export function matchTick(s, dt) {
  const log = [];
  if (!s.rf) return { s, log };
  const opt = MATCH_CASES.find((c) => c.id === s.caseId).opt;
  let { load, tune } = s;
  let moving = false;
  if (s.mode === 'AUTO') {
    const step = MATCH_RATE * dt;
    const goL = clamp01(opt.load);
    const goT = clamp01(opt.tune);
    const nl = Math.abs(goL - load) <= step ? goL : load + Math.sign(goL - load) * step;
    const nt = Math.abs(goT - tune) <= step ? goT : tune + Math.sign(goT - tune) * step;
    moving = nl !== load || nt !== tune;
    load = nl; tune = nt;
  }
  const refl = matchRefl(load, tune, opt);
  const pinned = (load <= 0 || load >= 100 || tune <= 0 || tune >= 100);
  const atLimit = s.mode === 'AUTO' && !moving && pinned && refl >= REFL_SPEC_W;
  const overFor = refl > MATCH_TRIP_W && !(s.mode === 'AUTO' && moving) ? s.overFor + dt : 0;
  let n = { ...s, load, tune, moving, atLimit, overFor };
  if (atLimit && !s.atLimit) log.push({ t: 'ALARM', m: `MATCH AT LIMIT — Load ${Math.round(load)}% / Tune ${Math.round(tune)}%. Reflected ${refl} W remains.` });
  if (s.mode === 'AUTO' && !moving && !pinned && s.moving && refl < REFL_SPEC_W) log.push({ t: 'INFO', m: `Auto tune complete. Reflected ${refl} W.` });
  if (overFor >= MATCH_TRIP_HOLD_S) {
    n = { ...n, rf: false, trip: true, overFor: 0 };
    log.push({ t: 'ALARM', m: `REFLECTED POWER HIGH (${refl} W > ${MATCH_TRIP_W} W). Generator turned RF OFF to protect itself.` });
  }
  return { s: n, log };
}

/** RF 재투입 — 원인을 안 바꾸면 같은 자리에서 다시 차단된다 */
export function matchRfOn(s) {
  if (s.rf) return { s, log: [] };
  return { s: { ...s, rf: true, trip: false, atLimit: false, overFor: 0 }, log: [{ t: 'CMD', m: 'RF ON (restart).' }] };
}

export function matchStatus(s) {
  const opt = MATCH_CASES.find((c) => c.id === s.caseId).opt;
  if (!s.rf) return { refl: 0, fwd: 0, word: s.trip ? 'RF OFF (TRIP)' : 'RF OFF', tone: s.trip ? 'bad' : 'dim' };
  const refl = matchRefl(s.load, s.tune, opt);
  let word = 'TUNED'; let tone = 'ok';
  if (s.atLimit) { word = 'AT LIMIT'; tone = 'bad'; }
  else if (s.moving) { word = 'TUNING'; tone = 'warn'; }
  else if (refl >= REFL_SPEC_W) { word = s.mode === 'MANUAL' ? 'MISMATCH' : 'TUNING'; tone = 'bad'; }
  return { refl, fwd: MATCH_FWD_W, word, tone, high: refl >= REFL_SPEC_W };
}

/* =========================================================================
 * 2강 ① 부품 계기판 — 표시값·단위·상태어를 읽고 어느 부품이 이상인지 고른다
 *   교재: Turbo Speed 100% / 27,000 rpm 이 정상 회전, Chuck Clamp On/Off,
 *         Foreline Pressure 가 높으면 러핑 펌프를 의심, 초록 Normal · 노랑 Warning · 빨강 Alarm
 * ====================================================================== */

export const PARTS_OPTIONS = [
  { id: 'none', label: '이상 없음' },
  { id: 'rough', label: 'Roughing Pump' },
  { id: 'turbo', label: 'Turbo Pump (TMP)' },
  { id: 'gv', label: 'Gate Valve (GV)' },
  { id: 'mfc', label: 'MFC' },
  { id: 'rf', label: 'RF Generator' },
  { id: 'esc', label: 'Chuck (ESC)' },
];

const PARTS_NORMAL = {
  chamber: { label: 'CHAMBER PRESSURE', val: '8.0', unit: 'mTorr', st: 'NORMAL' },
  foreline: { label: 'FORELINE PRESSURE', val: '45', unit: 'mTorr', st: 'NORMAL' },
  turbo: { label: 'TURBO SPEED', val: '100% · 27,000', unit: 'rpm', st: 'NORMAL' },
  gv: { label: 'GATE VALVE', val: 'OPEN', unit: '', st: 'NORMAL' },
  mfc: { label: 'MFC-1 Ar  SET / ACTUAL', val: '50 / 49.8', unit: 'sccm', st: 'NORMAL' },
  rf: { label: 'RF  FWD / REFL', val: '600 / 4', unit: 'W', st: 'NORMAL' },
  esc: { label: 'CHUCK CLAMP', val: 'ON', unit: '', st: 'NORMAL' },
};
const partsCase = (id, title, patch, ans, why) => ({
  id, title, ans, why,
  tiles: Object.fromEntries(Object.entries(PARTS_NORMAL).map(([k, v]) => [k, { ...v, ...(patch[k] || {}) }])),
});
export const PARTS_CASES = [
  partsCase(1, 'PROCESSING · STEP 2', {}, 'none',
    '모든 값이 NORMAL. Turbo 100% · 27,000 rpm, MFC 실제값이 설정값과 같고, 반사파 4 W.'),
  partsCase(2, 'PROCESSING · STEP 2', { turbo: { val: '64% · 17,300', st: 'WARNING' }, chamber: { val: '9.1', st: 'NORMAL' } }, 'turbo',
    'TURBO SPEED 64% — 정상 회전(100%)에 못 미친다. 터보 펌프 이상(베어링·과부하) 경고.'),
  partsCase(3, 'PROCESSING · STEP 3', { mfc: { val: '50 / 12', st: 'ALARM' } }, 'mfc',
    'MFC 설정 50 sccm 인데 실제 12 sccm — 가스가 안 들어온다. MFC(또는 앞단 밸브·공급) 이상.'),
  partsCase(4, 'PROCESSING · STEP 3', { rf: { val: '600 / 180', st: 'ALARM' } }, 'rf',
    '반사파 180 W — RF 전력이 챔버로 안 들어가고 돌아온다. RF Generator / 매칭 계통 이상.'),
  partsCase(5, 'PROCESSING · STEP 1', { esc: { val: 'OFF', st: 'ALARM' } }, 'esc',
    '공정 중인데 CHUCK CLAMP OFF — 웨이퍼가 척에 고정되지 않았다. ESC 이상.'),
  partsCase(6, 'PUMP-DOWN', { foreline: { val: '2.5', unit: 'Torr', st: 'WARNING' }, gv: { val: 'CLOSED' }, chamber: { val: '1.9', unit: 'Torr', st: 'WARNING' }, rf: { val: '0 / 0' }, mfc: { val: '0 / 0' } }, 'rough',
    'FORELINE PRESSURE 2.5 Torr — 포어라인이 안 내려간다. 교재: 포어라인 압력이 높으면 러핑 펌프 성능을 의심.'),
];

/* =========================================================================
 * 2강 ② 펌프다운 — 러핑 → 크로스오버 → 터보 기동 → 정속 → 게이트 밸브 → base pressure
 *   교재: Do NOT start the turbo pump against atmosphere / Wait until the foreline pressure is
 *   below the crossover setpoint / Never open the gate valve while the chamber is vented /
 *   Do not close the gate valve while pumping / 27,000 rpm
 * ====================================================================== */

export const CROSSOVER_TORR = 0.1;   // 이 실습의 가정 — 실제 크로스오버 설정값은 장비마다 다르다
export const ROUGH_FLOOR_TORR = 0.02;
export const TURBO_RPM = 27000;
export const PD_BUTTONS = ['ROUGH', 'TURBO START', 'GV OPEN', 'GV CLOSE', 'VENT'];

export function pdInit() {
  return { chP: ATM_TORR, flP: ATM_TORR, rough: false, turboOn: false, turbo: 0, gv: false, venting: false, base: false, t: 0 };
}

/** 챔버 기준의 단계. 터보는 게이트 밸브가 닫혀도 격리된 채 돌 수 있으므로 챔버 상태를 먼저 본다. */
export function pdPhase(s) {
  if (s.venting) return 'VENTING';
  if (s.base) return 'BASE PRESSURE REACHED';
  if (s.gv) return 'HIGH VACUUM PUMPING';
  if (!s.rough && s.chP >= ATM_TORR) return 'VENTED';
  if (s.turboOn && s.turbo >= 100) return 'TURBO AT SPEED';
  if (s.turboOn) return 'TURBO ACCELERATING';
  if (s.rough && s.chP <= CROSSOVER_TORR) return 'CROSSOVER REACHED';
  if (s.rough) return 'ROUGHING';
  return s.chP >= ATM_TORR ? 'VENTED' : 'ISOLATED';
}

export function pdCheck(s, btn) {
  const R = (reason) => ({ ok: false, reason });
  const OK = { ok: true, reason: '' };
  switch (btn) {
    case 'ROUGH':
      if (s.gv) return R('GATE VALVE OPEN — CHAMBER IS ON THE TURBO');
      if (s.rough) return R('ROUGHING VALVE ALREADY OPEN');
      if (s.venting) return R('VENT IN PROGRESS — WAIT');
      return OK;
    case 'TURBO START':
      if (s.turboOn) return R('TURBO PUMP ALREADY RUNNING');
      if (s.flP > CROSSOVER_TORR) return R(`DO NOT START THE TURBO PUMP AGAINST ATMOSPHERE — FORELINE ${s.flP >= 1 ? s.flP.toFixed(0) : s.flP.toExponential(1)} Torr, ABOVE CROSSOVER ${CROSSOVER_TORR} Torr`);
      return OK;
    case 'GV OPEN':
      if (s.gv) return R('GATE VALVE ALREADY OPEN');
      if (s.chP > CROSSOVER_TORR) return R('NEVER OPEN THE GATE VALVE WHILE THE CHAMBER IS VENTED — ROUGH BELOW CROSSOVER FIRST');
      if (!(s.turboOn && s.turbo >= 100)) return R('TURBO PUMP NOT AT SPEED');
      return OK;
    case 'GV CLOSE':
      if (!s.gv) return R('GATE VALVE ALREADY CLOSED');
      if (!s.base) return R('DO NOT CLOSE THE GATE VALVE WHILE PUMPING — WAIT FOR BASE PRESSURE');
      return OK;
    case 'VENT':
      if (s.gv) return R('GATE VALVE OPEN — CLOSE THE GATE VALVE BEFORE VENTING');
      if (s.venting) return R('VENT ALREADY IN PROGRESS');
      if (s.chP >= ATM_TORR) return R('CHAMBER ALREADY AT ATMOSPHERE');
      return OK;
    default:
      return R('UNKNOWN COMMAND');
  }
}

export function pdPress(s, btn) {
  const chk = pdCheck(s, btn);
  if (!chk.ok) return { s, log: [{ t: 'ALARM', m: `INTERLOCK: ${btn} rejected — ${chk.reason}` }], rejected: chk.reason };
  switch (btn) {
    case 'ROUGH':
      return { s: { ...s, rough: true, base: false }, log: [{ t: 'CMD', m: 'Roughing valve open. Roughing pump evacuating the chamber and foreline...' }] };
    case 'TURBO START':
      return { s: { ...s, turboOn: true }, log: [{ t: 'CMD', m: 'Turbo pump start. Accelerating...' }] };
    case 'GV OPEN':
      return { s: { ...s, gv: true, rough: false }, log: [{ t: 'CMD', m: 'Roughing valve closed. Gate valve OPEN. Pumping to base pressure...' }] };
    case 'GV CLOSE':
      return { s: { ...s, gv: false, base: false }, log: [{ t: 'CMD', m: 'Gate valve CLOSED. Chamber isolated from the turbo pump.' }] };
    case 'VENT':
      return { s: { ...s, rough: false, venting: true, base: false }, log: [{ t: 'CMD', m: 'Venting chamber with N2...' }] };
    default:
      return { s, log: [] };
  }
}

export function pdTick(s, dt) {
  const log = [];
  const n = { ...s, t: s.t + dt };
  // 러핑: 챔버와 포어라인을 같이 뺀다 (러핑 펌프 하나가 둘 다 담당)
  if (n.rough) {
    const was = n.chP;
    n.chP = approachLog(n.chP, ROUGH_FLOOR_TORR, 1.6, dt);
    n.flP = n.chP;
    if (was > CROSSOVER_TORR && n.chP <= CROSSOVER_TORR) log.push({ t: 'INFO', m: `Foreline below crossover setpoint (${CROSSOVER_TORR} Torr). Turbo pump may be started.` });
  } else if (n.turboOn || n.flP < ATM_TORR) {
    // 러핑 밸브가 닫혀도 러핑 펌프는 포어라인(터보 배기)을 계속 뺀다
    n.flP = approachLog(n.flP, ROUGH_FLOOR_TORR, 1.6, dt);
  }
  if (n.turboOn && n.turbo < 100) {
    n.turbo = Math.min(100, n.turbo + 25 * dt);
    if (n.turbo >= 100) log.push({ t: 'INFO', m: `Turbo pump AT SPEED (100% · ${TURBO_RPM.toLocaleString('en-US')} rpm).` });
  }
  if (n.gv && !n.base) {
    n.chP = approachLog(n.chP, BASE_TORR, 2, dt);
    if (n.chP <= BASE_TORR) { n.base = true; log.push({ t: 'INFO', m: 'Base Pressure Reached (5.0E-6 Torr).' }); }
  }
  if (n.venting) {
    n.chP = approachLog(n.chP, ATM_TORR, 2.4, dt);
    if (n.chP >= ATM_TORR) { n.venting = false; log.push({ t: 'INFO', m: 'Vent complete. Chamber at atmosphere.' }); }
  }
  return { s: n, log };
}

/* =========================================================================
 * 6강 ① 상태어 판독 — RUN / IDLE / READY / HOLD / DOWN / ALARM 과 타워 램프
 *   교재: 초록 = READY / RUNNING, 노랑 = IDLE / STANDBY / WARNING, 빨강 = alarm/critical
 * ====================================================================== */

export const STATUS_CHOICES = [
  { id: 'run', label: '공정 진행 중 — 건드리지 않는다' },
  { id: 'ready', label: '대기 — 시작 가능' },
  { id: 'hold', label: '일시 정지 — 원인 확인 후 재개' },
  { id: 'stop', label: '정지 — 조치 전에는 시작 불가' },
];
export const STATUS_CASES = [
  { word: 'RUN', lamp: 'green', blink: false, banner: 'Lot A2381 · Step 3/5 ETCH', ans: 'run',
    why: 'RUN — 웨이퍼를 처리 중. 문을 열거나 조작하면 공정이 중단된다.' },
  { word: 'READY', lamp: 'green', blink: false, banner: 'All conditions satisfied', ans: 'ready',
    why: 'READY — 모든 시작 조건 충족. 다음 lot 을 시작할 수 있다.' },
  { word: 'IDLE', lamp: 'yellow', blink: false, banner: 'No lot assigned', ans: 'ready',
    why: 'IDLE — 켜져 있고 정상이지만 일이 없는 상태 (The tool is idle and ready to start). 노랑이지만 이상이 아니다.' },
  { word: 'HOLD', lamp: 'yellow', blink: true, banner: 'Process held by operator at Step 2', ans: 'hold',
    why: 'HOLD — 공정이 멈춰 대기 중. 왜 멈췄는지 확인한 뒤 재개(resume)하거나 중단(abort)한다.' },
  { word: 'ALARM', lamp: 'red', blink: true, banner: 'ALM-1203: Chamber pressure out of range', ans: 'stop',
    why: 'ALARM — 한계를 벗어나 장비가 멈췄다. 원인 확인 → 조치 → RESET 전에는 시작 불가.' },
  { word: 'DOWN', lamp: 'red', blink: false, banner: 'Unscheduled down — RF fault', ans: 'stop',
    why: 'DOWN — 장비가 생산에서 빠진 상태(고장·PM). 복구되어 READY 가 되기 전에는 돌리지 않는다.' },
];

/* =========================================================================
 * 6강 ② 알람 대응 — 종류 구분 → ACK → 원인 조치 → RESET
 *   교재: Alarm / Warning / Interlock 구분, Timeout · Failure · Abort,
 *         원인을 없애기 전 RESET 하면 다시 뜬다
 * ====================================================================== */

export const ALARM_TYPES = ['INTERLOCK', 'TIMEOUT', 'FAILURE', 'WARNING'];
export const ACK_CASES = [
  { code: 'INTLK-201', msg: 'Interlock not satisfied: chamber lid open. Process cannot start.', type: 'INTERLOCK',
    fixes: ['Press RESET repeatedly', 'Close and latch the chamber lid, then confirm the lid switch', 'Raise the RF power'], fix: 1 },
  { code: 'VAC-310', msg: 'Step aborted due to pump-down timeout. Base pressure not reached in 600 s.', type: 'TIMEOUT',
    fixes: ['Check the vacuum line and O-ring for a leak, then pump down again', 'Extend the timeout to 1200 s and restart', 'Vent the chamber and start the process'], fix: 0 },
  { code: 'RF-512', msg: 'RF generator failure: output fault detected. RF OFF.', type: 'FAILURE',
    fixes: ['Turn RF ON again at higher power', 'Stop the tool, report to the RF engineer and check the generator', 'Change the gas recipe'], fix: 1 },
  { code: 'GAS-122', msg: 'WARNING: Gas supply running low (Ar cylinder 12%).', type: 'WARNING',
    fixes: ['Stop the tool immediately', 'Request a cylinder change before the next lot', 'Close the gate valve'], fix: 1 },
];

export function ackInit() { return { typePick: null, acked: false, fixPick: null, fixed: false, reset: false, reraised: 0 }; }

/** 한 사례 안의 조치. act = 'type' | 'ack' | 'fix' | 'reset' */
export function ackAct(st, cse, act, arg) {
  if (st.reset) return { st, log: [] };
  if (act === 'type') {
    const ok = arg === cse.type;
    return { st: { ...st, typePick: arg }, log: [{ t: ok ? 'INFO' : 'ALARM', m: ok ? `Classified as ${arg}.` : `Not ${arg} — read the message again.` }] };
  }
  if (act === 'ack') {
    if (st.acked) return { st, log: [] };
    return { st: { ...st, acked: true }, log: [{ t: 'CMD', m: `${cse.code} acknowledged. Buzzer silenced — the alarm is still active.` }] };
  }
  if (act === 'fix') {
    if (!st.acked) return { st, log: [{ t: 'ALARM', m: 'Acknowledge (ACK) the alarm first, then check the cause.' }] };
    const ok = arg === cse.fix;
    return { st: { ...st, fixPick: arg, fixed: ok }, log: [{ t: ok ? 'CMD' : 'ALARM', m: ok ? `Action taken: ${cse.fixes[arg]}. Cause cleared.` : `Action "${cse.fixes[arg]}" does not clear the cause.` }] };
  }
  if (act === 'reset') {
    if (!st.acked) return { st, log: [{ t: 'ALARM', m: 'Acknowledge (ACK) the alarm before RESET.' }] };
    if (!st.fixed) return { st: { ...st, reraised: st.reraised + 1 }, log: [{ t: 'ALARM', m: `RESET → ${cse.code} re-raised immediately. The cause has not been cleared.` }] };
    return { st: { ...st, reset: true }, log: [{ t: 'INFO', m: `${cse.code} reset. Tool status → IDLE.` }] };
  }
  return { st, log: [] };
}

/* =========================================================================
 * 6강 ③ 동시 발생 — interlock → alarm → warning 순으로 처리하고 READY 복구 확인
 * ====================================================================== */

export const PRIORITY = { INTERLOCK: 0, ALARM: 1, WARNING: 2 };
export const PRIO_ITEMS = [
  { id: 'w', kind: 'WARNING', code: 'WRN-0412', msg: 'Gas supply running low (Ar cylinder 12%).', fix: 'Request a cylinder change' },
  { id: 'a', kind: 'ALARM', code: 'ALM-1203', msg: 'Chamber pressure out of range (PV 42 mTorr / SP 10 mTorr).', fix: 'Check the throttle valve and pump down again' },
  { id: 'i', kind: 'INTERLOCK', code: 'INTLK-001', msg: 'Interlock not satisfied: chamber lid open.', fix: 'Close and latch the chamber lid' },
];

export function prioInit() {
  return { items: PRIO_ITEMS.map((it) => ({ ...it, fixed: false, cleared: false })), mistakes: 0, status: 'ALARM', recovered: false };
}

function prioTop(items) {
  const open = items.filter((it) => !it.cleared);
  return open.sort((x, y) => PRIORITY[x.kind] - PRIORITY[y.kind])[0] || null;
}

/** act = 'fix' | 'reset' | 'recover' */
export function prioAct(s, act, id) {
  if (act === 'recover') {
    const blocking = s.items.filter((it) => !it.cleared && it.kind !== 'WARNING');
    if (blocking.length) return { s: { ...s, mistakes: s.mistakes + 1 }, log: [{ t: 'ALARM', m: `RECOVERY rejected — ${blocking.map((b) => b.kind).join(', ')} still active.` }] };
    const warn = s.items.some((it) => !it.cleared);
    return { s: { ...s, status: 'READY', recovered: true }, log: [{ t: 'INFO', m: `Recovery complete. Tool status: READY.${warn ? ' WARNING still shown — the tool can run, but schedule the fix.' : ''}` }] };
  }
  const it = s.items.find((x) => x.id === id);
  if (!it || it.cleared) return { s, log: [] };
  const top = prioTop(s.items);
  if (top && top.id !== it.id && PRIORITY[top.kind] < PRIORITY[it.kind]) {
    return { s: { ...s, mistakes: s.mistakes + 1 }, log: [{ t: 'ALARM', m: `Order: handle ${top.kind} (${top.code}) first — priority is INTERLOCK → ALARM → WARNING.` }] };
  }
  const items = s.items.map((x) => ({ ...x }));
  const cur = items.find((x) => x.id === id);
  if (act === 'fix') {
    cur.fixed = true;
    return { s: { ...s, items }, log: [{ t: 'CMD', m: `${cur.code}: ${cur.fix}.` }] };
  }
  if (act === 'reset') {
    if (!cur.fixed) return { s: { ...s, mistakes: s.mistakes + 1 }, log: [{ t: 'ALARM', m: `RESET → ${cur.code} re-raised. Clear the cause first.` }] };
    cur.cleared = true;
    const blocking = items.some((x) => !x.cleared && x.kind !== 'WARNING');
    return { s: { ...s, items, status: blocking ? 'ALARM' : 'IDLE' }, log: [{ t: 'INFO', m: `${cur.code} cleared.${blocking ? '' : ' No interlock or alarm active — status IDLE. Run RECOVERY.'}` }] };
  }
  return { s, log: [] };
}

/* =========================================================================
 * 7강 ① PM 부위 — 부위마다 알맞은 PM 동작
 *   교재: O-ring = inspect → (손상 시) replace → lubricate, 챔버 벽 폴리머 = clean,
 *         펌프 오일 = replace, MFC·게이지 = calibrate, 볼트 = tighten (8 N·m, star pattern)
 * ====================================================================== */

export const PM_ACTIONS = ['Inspect', 'Clean', 'Replace', 'Calibrate', 'Tighten', 'Lubricate'];
export const PM_PARTS = [
  { id: 'oring', en: 'O-ring (lid seal)', ans: 'Inspect', why: 'O-ring 은 먼저 Inspect — 균열·파티클·변형이 있으면 Replace, 새것은 Lubricate (inspect → replace → lubricate).' },
  { id: 'wall', en: 'Chamber wall', ans: 'Clean', why: '챔버 벽에 쌓인 폴리머는 파티클 원인 — Clean.' },
  { id: 'oil', en: 'Pump oil', ans: 'Replace', why: '오염된 펌프 오일은 성능 저하 원인 — 주기마다 Replace.' },
  { id: 'gauge', en: 'Vacuum gauge / MFC', ans: 'Calibrate', why: '측정·유량 오차 — 기준기와 비교해 Calibrate.' },
  { id: 'bolt', en: 'Lid bolts', ans: 'Tighten', why: '규정 토크(8 N·m)로 star pattern 에 따라 Tighten.' },
];
export const PM_LEAK_Q = {
  prompt: 'PM 후 base pressure 가 12 mTorr (limit 5 mTorr) 로 높다. 진공 누설을 의심할 때 가장 먼저 볼 부위는?',
  ans: 'oring',
  why: 'O-ring 균열·변형·이물질 → vacuum leak → base pressure 상승. 교재: A damaged O-ring will cause a vacuum leak and rising base pressure.',
};

/* =========================================================================
 * 7강 ② PM 작업 — 지시문 읽기 → 측정값 규격 판정 → 불합격은 재작업 → 기록 후 work order 종료
 * ====================================================================== */

export const PMW_ITEMS = [
  { id: 'oring', instr: 'Inspect the main chamber O-ring for cracks, particles, and permanent deformation.',
    spec: 'No damage', first: { shown: 'Small crack found (3 o\'clock position)', pass: false },
    rework: 'Replace the O-ring with a new one (do not reuse). Lightly apply vacuum grease.', after: { shown: 'New O-ring installed — no damage', pass: true } },
  { id: 'torque', instr: 'Tighten all chamber bolts to the specified torque (8 N·m) in a star pattern.',
    spec: '8.0 ± 0.5 N·m (허용오차는 이 실습의 가정)', first: { shown: '6.4 N·m', pass: false },
    rework: 'Re-tighten the bolts to 8 N·m in a star pattern.', after: { shown: '8.0 N·m', pass: true } },
  { id: 'base', instr: 'Check the vacuum gauge zero and verify the base pressure reaches 5 mTorr.',
    spec: '≤ 5 mTorr', first: { shown: '3.6 mTorr', pass: true } },
  { id: 'mfc', instr: 'Calibrate the MFC against the reference flow meter at 20%, 50%, and 100% of full scale.',
    spec: 'deviation within ±1% FS at every point', first: { shown: '+0.4% / −0.7% / +1.6% FS', pass: false },
    rework: 'Recalibrate the MFC (replace it if it cannot be brought within ±1% FS).', after: { shown: '+0.2% / −0.3% / +0.4% FS', pass: true } },
];

export function pmwInit() {
  return { items: PMW_ITEMS.map((it) => ({ id: it.id, judged: null, correct: null, reworked: false })), closed: false };
}

/** 현재 보이는 측정값 */
export function pmwReading(item, st) { return st.reworked ? item.after : item.first; }

/** act = 'judge' (arg: 'PASS'|'FAIL') | 'rework' | 'close' */
export function pmwAct(s, act, id, arg) {
  if (s.closed) return { s, log: [] };
  if (act === 'close') {
    const pending = s.items.filter((x) => x.judged == null);
    if (pending.length) return { s, log: [{ t: 'ALARM', m: `Cannot close the work order — ${pending.length} step(s) not marked Pass / Fail.` }] };
    const bad = s.items.filter((x) => x.judged === 'FAIL');
    if (bad.length) return { s, log: [{ t: 'ALARM', m: `Cannot close the work order — out-of-spec step(s) must be reworked and re-checked: ${bad.map((b) => b.id).join(', ')}.` }] };
    const wrong = s.items.filter((x) => !x.correct);
    if (wrong.length) return { s, log: [{ t: 'ALARM', m: `Cannot close — Pass / Fail does not match the spec on: ${wrong.map((b) => b.id).join(', ')}.` }] };
    return { s: { ...s, closed: true }, log: [{ t: 'INFO', m: 'All values recorded in the CMMS log. Work order CLOSED. Tool status → UP.' }] };
  }
  const items = s.items.map((x) => ({ ...x }));
  const st = items.find((x) => x.id === id);
  const def = PMW_ITEMS.find((x) => x.id === id);
  if (act === 'judge') {
    const truth = pmwReading(def, st).pass ? 'PASS' : 'FAIL';
    st.judged = arg; st.correct = arg === truth;
    return { s: { ...s, items }, log: [{ t: st.correct ? 'INFO' : 'ALARM', m: `${id}: marked ${arg}${st.correct ? '' : ` — check the reading against the spec (${def.spec})`}.` }] };
  }
  if (act === 'rework') {
    if (!def.rework || st.reworked) return { s, log: [] };
    if (st.judged !== 'FAIL' || !st.correct) return { s, log: [{ t: 'ALARM', m: 'Mark the step FAIL (out of spec) before rework.' }] };
    st.reworked = true; st.judged = null; st.correct = null;
    return { s: { ...s, items }, log: [{ t: 'CMD', m: `${id}: ${def.rework} Re-check the value.` }] };
  }
  return { s, log: [] };
}

/* =========================================================================
 * 7강 ③ 장비 상태 판독 — PM 상태 + 값이 limit 안인가 → 지금 가동해도 되는가
 *   교재: OVERDUE 가 뜨면 규정상 TOOL DOWN, base pressure 12 mTorr (limit 5) → 불합격
 * ====================================================================== */

export const PMS_CASES = [
  { id: 1, status: 'UP', pm: 'DONE', base: 3.8, limit: 5, mfcSp: 50, mfcAct: 49.7, torque: 8.0 },
  { id: 2, status: 'TOOL DOWN', pm: 'OVERDUE', base: 3.5, limit: 5, mfcSp: 50, mfcAct: 50.1, torque: 8.0 },
  { id: 3, status: 'UP', pm: 'DONE', base: 12, limit: 5, mfcSp: 50, mfcAct: 49.9, torque: 8.0 },
  { id: 4, status: 'UP', pm: 'DONE', base: 4.1, limit: 5, mfcSp: 50, mfcAct: 43.0, torque: 8.0 },
  { id: 5, status: 'DOWN', pm: 'IN PROGRESS', base: 760000, limit: 5, mfcSp: 0, mfcAct: 0, torque: null },
];

/** 가동 가능 판정과 이유 */
export function pmsJudge(c) {
  const reasons = [];
  if (c.pm === 'OVERDUE') reasons.push('PM OVERDUE — 규정상 TOOL DOWN, PM 완료 전 가동 불가');
  if (c.pm === 'IN PROGRESS') reasons.push('PM IN PROGRESS — 작업 중 (챔버 대기압)');
  if (c.base > c.limit) reasons.push(`base pressure ${c.base >= 1000 ? '760 Torr' : `${c.base} mTorr`} > limit ${c.limit} mTorr — 누설 의심 (O-ring·볼트 토크 확인)`);
  if (c.mfcSp > 0 && Math.abs(c.mfcAct - c.mfcSp) / c.mfcSp > OOR_FRAC) reasons.push(`MFC ACTUAL ${c.mfcAct} / SET ${c.mfcSp} sccm — 10% 초과 편차, 교정 필요`);
  return { ok: reasons.length === 0, reasons: reasons.length ? reasons : ['PM DONE · base pressure·MFC 모두 limit 안 — 가동 가능'] };
}

/* =========================================================================
 * 1강 ① 장비 전체 평면도 — load port · module · valve · pump 가 어디인가
 * ====================================================================== */

export const TOOL_PARTS = [
  { id: 'lp', en: 'Load Port', ko: '로드 포트', d: 'FOUP(웨이퍼 용기)를 장비에 올려놓는 자리.', ex: 'Place the FOUP on Load Port 1 until it clicks.' },
  { id: 'efem', en: 'EFEM (atmospheric robot)', ko: '대기 이송부', d: '대기압에서 FOUP 과 로드락 사이로 웨이퍼를 옮기는 로봇 구역.', ex: 'The EFEM robot picks the wafer from the FOUP.' },
  { id: 'll', en: 'Load Lock', ko: '로드락', d: '대기압과 진공 사이의 출입구. 배기·벤트를 반복한다.', ex: 'Pump down the load lock before opening it to the transfer module.' },
  { id: 'tm', en: 'Transfer Module', ko: '이송 모듈', d: '진공 로봇이 챔버 사이로 웨이퍼를 옮기는 모듈.', ex: 'The transfer module moves wafers between chambers.' },
  { id: 'pm', en: 'Process Module (Chamber)', ko: '공정 모듈(챔버)', d: '웨이퍼가 실제로 공정 처리되는 밀폐된 공간.', ex: 'Load the wafer into the chamber and close the door.' },
  { id: 'valve', en: 'Slit Valve', ko: '슬릿 밸브', d: '이송 모듈과 챔버 사이 통로를 여닫는 밸브.', ex: 'Close the slit valve before the process starts.' },
  { id: 'pump', en: 'Vacuum Pump', ko: '진공 펌프', d: '챔버·로드락의 공기를 빼 진공을 만든다.', ex: 'The pump evacuates the chamber to base pressure.' },
];
/** 영어 문장을 읽고 그 문장이 가리키는 위치를 도면에서 누른다 */
export const TOOL_FIND = [
  { en: 'Place the FOUP on Load Port 1 until it clicks.', ans: 'lp' },
  { en: 'The transfer module moves wafers between chambers.', ans: 'tm' },
  { en: 'Pump down the load lock before opening it to the transfer module.', ans: 'll' },
  { en: 'Close the slit valve before the process starts.', ans: 'valve' },
  { en: 'Do not open the chamber door while the tool is PROCESSING.', ans: 'pm' },
];

/* =========================================================================
 * 1강 ② 챔버 HMI — 지금 문을 열어도 되는가, 지금 시작해도 되는가
 *   교재: Do not open the chamber door while the tool is PROCESSING /
 *         Vent the chamber to ATM before opening the door /
 *         The door interlock is active; the tool will not start / temperature setpoint 250°C
 * ====================================================================== */

export const CHM_TEMP_SP = 250;
export function chmInit() {
  return { status: 'IDLE', vac: true, door: 'CLOSED', tempPv: 250, alarm: 'NONE' };
}
export function chmPressure(s) { return s.vac ? { pv: '5.0E-6', unit: 'Torr', sp: '5.0E-6 Torr' } : { pv: '760', unit: 'Torr', sp: '5.0E-6 Torr' }; }

export function chmCheck(s, act) {
  const R = (reason) => ({ ok: false, reason });
  const OK = { ok: true, reason: '' };
  switch (act) {
    case 'OPEN DOOR':
      if (s.door === 'OPEN') return R('DOOR ALREADY OPEN');
      if (s.status === 'PROCESSING') return R('DO NOT OPEN THE CHAMBER DOOR WHILE THE TOOL IS PROCESSING');
      if (s.vac) return R('HIGH VACUUM — VENT THE CHAMBER TO ATM BEFORE OPENING THE DOOR');
      return OK;
    case 'CLOSE DOOR':
      return s.door === 'OPEN' ? OK : R('DOOR ALREADY CLOSED');
    case 'VENT':
      if (s.status === 'PROCESSING') return R('PROCESSING — DO NOT VENT');
      if (!s.vac) return R('CHAMBER ALREADY AT ATM');
      return OK;
    case 'PUMP DOWN':
      if (s.door === 'OPEN') return R('DOOR INTERLOCK ACTIVE — CLOSE THE DOOR');
      if (s.vac) return R('CHAMBER ALREADY UNDER VACUUM');
      return OK;
    case 'START':
      if (s.status === 'PROCESSING') return R('ALREADY PROCESSING');
      if (s.door === 'OPEN') return R('DOOR INTERLOCK ACTIVE — THE TOOL WILL NOT START');
      if (s.alarm === 'ALARM') return R('ALARM ACTIVE — CLEAR THE ALARM BEFORE START');
      if (!s.vac) return R('PRESSURE NOT AT SETPOINT — PUMP DOWN FIRST');
      if (Math.abs(s.tempPv - CHM_TEMP_SP) / CHM_TEMP_SP > 0.1) return R(`TEMPERATURE NOT AT SETPOINT — PV ${s.tempPv}°C / SP ${CHM_TEMP_SP}°C`);
      return OK;
    case 'STOP':
      return s.status === 'PROCESSING' ? OK : R('NOT PROCESSING');
    default:
      return R('UNKNOWN COMMAND');
  }
}

export function chmAct(s, act) {
  const c = chmCheck(s, act);
  if (!c.ok) return { s, log: [{ t: 'ALARM', m: `${act} rejected — ${c.reason}` }], rejected: c.reason };
  const next = {
    'OPEN DOOR': [{ door: 'OPEN' }, 'Chamber door OPEN.'],
    'CLOSE DOOR': [{ door: 'CLOSED' }, 'Chamber door CLOSED.'],
    VENT: [{ vac: false }, 'Chamber vented to ATM (760 Torr).'],
    'PUMP DOWN': [{ vac: true }, 'Chamber pumped down to 5.0E-6 Torr.'],
    START: [{ status: 'PROCESSING' }, `Process started. STATUS: PROCESSING.${s.alarm === 'WARNING' ? ' (WARNING active — keep monitoring.)' : ''}`],
    STOP: [{ status: 'IDLE' }, 'Process stopped. STATUS: IDLE.'],
  }[act];
  return { s: { ...s, ...next[0] }, log: [{ t: 'CMD', m: next[1] }] };
}

/* =========================================================================
 * 14강 ① 인수인계 로그 — 상태 배너(UP/DOWN/IDLE)로 가동 가능 판정, 로그 줄마다 P/C/A/R
 *   교재: UP = 정상 가동 가능, DOWN = 정지·생산 불가, IDLE = 가동 가능하지만 대기 중 /
 *         A tool marked DOWN must not be run until an engineer clears it, even if the alarm has cleared.
 * ====================================================================== */

export const PCAR = ['Problem', 'Cause', 'Action', 'Result'];
export const SHIFT_TOOLS = [
  { id: 'A', name: 'Chamber A (Etcher 1)', banner: 'DOWN', alarmCleared: true, ok: false,
    why: 'DOWN · pending PM — HMI 알람이 사라졌어도 엔지니어가 해제하기 전에는 가동하면 안 된다.',
    lines: [
      { t: '01:42', m: 'Chamber pressure spiked above 10 mTorr on etch step 3. Process alarm triggered.', k: 'Problem' },
      { t: '02:05', m: 'Root cause traced to the APC throttle valve stuck at 40% open. Confirmed by valve position log.', k: 'Cause' },
      { t: '02:10', m: 'Aborted the running lot, isolated Chamber A and rerouted the lot to Chamber B.', k: 'Action' },
      { t: '02:30', m: 'Lot recovered with no wafer loss. Chamber A placed DOWN, pending PM.', k: 'Result' },
    ] },
  { id: 'E', name: 'EQP-204 (Etcher 3)', banner: 'UP', alarmCleared: true, ok: true,
    why: 'UP — 조치 후 재가동됨. 가동 가능하되 로그의 "Watch reflected power" 대로 반사파를 지켜본다.',
    lines: [
      { t: '02:10', m: 'Unscheduled down. RF fault — reflected power high.', k: 'Problem' },
      { t: '02:25', m: 'Caused by match drift (suspected). No trouble found on the generator.', k: 'Cause' },
      { t: '02:40', m: 'Re-tuned the matching network and re-qualified the tool.', k: 'Action' },
      { t: '03:05', m: 'Tool back UP. Watch reflected power.', k: 'Result' },
    ] },
  { id: 'C', name: 'EQP-310 (Cleaner 2)', banner: 'IDLE', alarmCleared: true, ok: true,
    why: 'IDLE — 가동 가능하지만 대기 중. Minor 알람은 원인 확인 후 조치 불필요로 종결됐다.',
    lines: [
      { t: '05:12', m: 'Minor alarm: DI water resistivity low.', k: 'Problem' },
      { t: '05:13', m: 'Due to the DI supply switching tanks (confirmed by the utility log).', k: 'Cause' },
      { t: '05:15', m: 'Acknowledged the alarm and notified the utility team.', k: 'Action' },
      { t: '05:20', m: 'Back to normal. Tool IDLE, ready for the next lot.', k: 'Result' },
    ] },
  { id: 'B', name: 'EQP-118 (CVD B)', banner: 'DOWN', alarmCleared: false, ok: false,
    why: 'DOWN · pending PM — 생산 불가. 즉시 위로 전달해야 하는 상태.',
    lines: [
      { t: '04:02', m: 'Chamber pressure out of spec during lot 7.', k: 'Problem' },
      { t: '04:20', m: 'Root cause suspected: worn O-ring on the chamber lid (not yet confirmed).', k: 'Cause' },
      { t: '04:25', m: 'Aborted the lot and switched it to Chamber A.', k: 'Action' },
      { t: '04:40', m: 'Tool still down, placed down pending PM. Escalated to the equipment engineer.', k: 'Result' },
    ] },
];

/* =========================================================================
 * 14강 ② DRC 결과 분류 — Critical / Minor, 보고문 Problem 줄
 *   교재: severity Critical > Major > Minor — Critical 은 라인 정지·안전 위험, Minor 는 모니터링 수준.
 *   설계 검증에 옮긴 이 실습의 기준: tape-out 전에 반드시 고쳐야 하는 위반(단락·단선 위험) = Critical,
 *   권고(recommended)·DFM 지침 = Minor.
 * ====================================================================== */

export const TRIAGE_ROWS = [
  { rule: 'METAL1.SPACING', layer: 'M1', meas: '0.18 µm', req: '≥ 0.30 µm', note: 'between net VDD and net OUT', sev: 'Critical',
    why: '두 금속선이 너무 가깝다 → 단락(short) 위험. tape-out 전 반드시 수정.' },
  { rule: 'METAL2.WIDTH', layer: 'M2', meas: '0.26 µm', req: '≥ 0.30 µm', note: 'signal line', sev: 'Critical',
    why: '선이 너무 가늘다 → 단선(open)·전류 밀도 위험. 반드시 수정.' },
  { rule: 'VIA1.ENCLOSURE', layer: 'M1/V1', meas: '0.01 µm', req: '≥ 0.03 µm', note: 'via not fully covered', sev: 'Critical',
    why: '비아가 금속에 충분히 덮이지 않았다 → 연결 불량(open) 위험. 반드시 수정.' },
  { rule: 'METAL1.DENSITY (recommended)', layer: 'M1', meas: '18%', req: '≥ 20% recommended', note: 'window 100 × 100 µm', sev: 'Minor',
    why: '권고 규칙 — CMP 균일도용. dummy fill 로 보완하거나 모니터링. 회로 동작을 바로 망가뜨리지 않는다.' },
  { rule: 'POLY.SPACING.DFM (recommended)', layer: 'POLY', meas: '0.14 µm', req: '≥ 0.16 µm recommended', note: 'DFM guideline', sev: 'Minor',
    why: 'DFM 권고 — 수율을 높이는 지침. 최소 규칙은 만족하므로 Minor.' },
];
export const TRIAGE_PROBLEM = {
  prompt: '보고문의 Problem 줄로 가장 알맞은 문장은?',
  opts: [
    'DRC failed with 3 critical violations (M1 spacing, M2 width, V1 enclosure); tape-out is blocked.',
    'Metal 1 density is 18%, slightly below the recommended 20%.',
    'We moved the M1 line to fix the spacing and re-ran DRC.',
  ],
  ans: 0,
  why: 'Problem 은 "무엇이 잘못됐고 얼마나 심각한가" — Critical 위반과 영향(tape-out 불가)을 쓴다. 두 번째는 Minor 만 적어 핵심을 놓쳤고, 세 번째는 Action 문장이다.',
};

/* =========================================================================
 * 14강 ③ P/C/A/R 보고서 — 흩어진 문장 분류 + 한 문장 요약
 * ====================================================================== */

export const PCAR_SENTENCES = [
  { m: 'Root cause traced to the APC throttle valve stuck at 40% open.', k: 'Cause' },
  { m: 'Lot recovered with no wafer loss.', k: 'Result' },
  { m: 'Chamber pressure spiked above 10 mTorr during etch step 3.', k: 'Problem' },
  { m: 'Aborted the running lot and isolated Chamber A.', k: 'Action' },
  { m: 'Chamber A placed DOWN, pending PM. ETA to recovery: 6 hours.', k: 'Result' },
  { m: 'The process alarm triggered and the run failed.', k: 'Problem' },
  { m: 'Rerouted the lot to Chamber B and escalated to the equipment engineer.', k: 'Action' },
  { m: 'The spike was caused by the stuck valve, confirmed by the valve position log.', k: 'Cause' },
];
export const PCAR_SUMMARY = {
  prompt: '구두 보고 첫 문장으로 가장 알맞은 요약은? (교재: 결과 = 지금 상태이므로 가장 먼저 말한다)',
  opts: [
    'Chamber A is DOWN pending PM (ETA 6 h): pressure spiked due to a stuck throttle valve; the lot was aborted and rerouted to Chamber B with no wafer loss.',
    'Pressure spiked on Chamber A last night, and we checked many things and worked hard all night.',
    'Chamber A is back up after the throttle valve was replaced.',
  ],
  ans: 0,
  why: '현재 상태(DOWN, pending PM) → 문제 → 원인 → 조치·영향 순으로 한 문장에 담았다. 두 번째는 원인·상태가 없고, 세 번째는 사실과 다르다(아직 교체 전, DOWN).',
};

/* =========================================================================
 * 9강 ① 단면 쌓기 — substrate → well → active → gate oxide → poly → contact → metal
 *   교재 약어: OD/AA = active, PO/GT = poly gate, CO = contact, M1/M2 = metal, NW/PW = well
 * ====================================================================== */

export const STACK = [
  { id: 'sub', en: 'Substrate', abbr: 'SUB', ko: '기판 (p-type Si)' },
  { id: 'well', en: 'Well', abbr: 'NW / PW', ko: '웰 — 트랜지스터 종류(N/P)를 정하는 도핑 영역' },
  { id: 'active', en: 'Active', abbr: 'OD / AA', ko: '액티브 — 소스·드레인이 생기는 영역' },
  { id: 'gox', en: 'Gate oxide', abbr: 'GOX', ko: '게이트 산화막 — 게이트 아래 얇은 절연막' },
  { id: 'poly', en: 'Poly (gate)', abbr: 'PO / GT', ko: '폴리 게이트' },
  { id: 'contact', en: 'Contact', abbr: 'CO', ko: '컨택 — 소스·드레인·게이트를 금속1에 잇는 수직 연결' },
  { id: 'metal', en: 'Metal 1', abbr: 'M1', ko: '금속1 배선' },
];
export function stackPress(built, id) {
  const next = STACK[built.length];
  if (!next) return { built, ok: false, msg: 'Stack complete.' };
  if (id === next.id) return { built: [...built, id], ok: true, msg: `${next.en} placed (layer ${built.length + 1}).` };
  const want = STACK.find((x) => x.id === id);
  return { built, ok: false, msg: `Not yet — ${want.en} sits above ${next.en}. Place ${next.en} first.` };
}

/* =========================================================================
 * 9강 ② DRC 결과 읽기 — spacing / width violation, 어느 layer 인가 (값은 이 실습의 예시)
 * ====================================================================== */

export const READ_DRC = [
  { line: 'ERROR M1.S.1 : Spacing violation (measured 0.18 um < min 0.20 um) @ (3.20, 1.10) METAL1', type: 'Spacing', layer: 'METAL1',
    why: '"Spacing violation" = 두 도형 사이가 너무 가깝다. 줄 끝의 METAL1(약어 M1) 이 층 이름.' },
  { line: 'ERROR PO.W.1 : Width violation (measured 0.04 um < min 0.05 um) @ (1.05, 0.60) POLY', type: 'Width', layer: 'POLY',
    why: '"Width violation" = 도형 폭이 너무 얇다. 규칙 이름 앞 PO = poly gate.' },
  { line: 'ERROR M2.S.1 : Spacing violation (measured 0.21 um < min 0.24 um) @ (5.40, 2.25) METAL2', type: 'Spacing', layer: 'METAL2',
    why: 'M2 = METAL2 — 금속 2층의 두 배선이 너무 가깝다.' },
  { line: 'ERROR OD.W.1 : Width violation (measured 0.12 um < min 0.15 um) @ (0.40, 0.90) ACTIVE', type: 'Width', layer: 'ACTIVE',
    why: 'OD / AA = active 영역. 액티브 폭이 너무 좁다.' },
];
export const READ_DRC_LAYERS = ['ACTIVE', 'POLY', 'METAL1', 'METAL2'];

/* =========================================================================
 * 10강 ① 마스크 층과 규칙표 — 층을 고르면 그 층의 규칙이 강조된다
 *   교재 값: M1 min width 0.20 um, spacing rule 0.22 um, metal enclosure of via 0.05 um (V1.E.2),
 *            poly extension beyond active 0.10 um, contact size 0.16 um. 나머지는 이 실습의 예시.
 * ====================================================================== */

export const MASK_LAYERS = [
  { id: 'AA', name: 'ACTIVE', abbr: 'AA / OD' },
  { id: 'PO', name: 'POLY', abbr: 'PO' },
  { id: 'CO', name: 'CONTACT', abbr: 'CO' },
  { id: 'M1', name: 'METAL1', abbr: 'M1' },
  { id: 'V1', name: 'VIA1', abbr: 'V1' },
  { id: 'M2', name: 'METAL2', abbr: 'M2' },
];
export const RULE_TABLE = [
  { code: 'AA.W.1', layer: 'AA', desc: 'Minimum width of ACTIVE', val: '0.22 um', src: '예시' },
  { code: 'PO.W.1', layer: 'PO', desc: 'Minimum width of POLY (gate length)', val: '0.18 um', src: '예시' },
  { code: 'PO.E.1', layer: 'PO', desc: 'POLY extension beyond ACTIVE', val: '0.10 um', src: '교재' },
  { code: 'CO.W.1', layer: 'CO', desc: 'CONTACT size (exact)', val: '0.16 um', src: '교재' },
  { code: 'M1.W.1', layer: 'M1', desc: 'Minimum width of METAL1', val: '0.20 um', src: '교재' },
  { code: 'M1.S.1', layer: 'M1', desc: 'Minimum spacing between two METAL1 lines', val: '0.22 um', src: '교재' },
  { code: 'V1.W.1', layer: 'V1', desc: 'VIA1 size (exact)', val: '0.20 um', src: '예시' },
  { code: 'V1.E.2', layer: 'V1', desc: 'METAL enclosure of VIA1 (all sides)', val: '0.05 um', src: '교재' },
  { code: 'M2.W.1', layer: 'M2', desc: 'Minimum width of METAL2', val: '0.20 um', src: '예시' },
];
/** 규칙 코드 '층.유형.번호' 해석 — 교재: W=width, S=space, E=enclosure/extension, O=overlap */
export const RULE_CODE_Q = [
  { code: 'M1.S.1', opts: ['METAL1 minimum spacing', 'METAL1 minimum width', 'VIA1 enclosure'], ans: 0 },
  { code: 'V1.E.2', opts: ['VIA1 minimum spacing', 'METAL enclosure of VIA1', 'VIA1 width'], ans: 1 },
  { code: 'PO.E.1', opts: ['POLY extension beyond ACTIVE', 'POLY minimum spacing', 'POLY overlap of CONTACT'], ans: 0 },
  { code: 'M1.W.1', opts: ['METAL2 minimum width', 'METAL1 minimum width', 'METAL1 enclosure'], ans: 1 },
];

/* =========================================================================
 * 10강 ② DRC 리포트 — error = 반드시 수정, warning = 검토 후 판단, waived = 이미 승인된 예외
 * ====================================================================== */

export const REPORT_ACTIONS = [
  { id: 'fix', label: '수정 필수 (must fix)' },
  { id: 'review', label: '검토 후 판단 (review)' },
  { id: 'keep', label: '그대로 둠 (approved waiver)' },
];
export const DRC_REPORT_ROWS = [
  { layer: 'METAL1', rule: 'M1.W.1', meas: '0.18 um', req: '≥ 0.20 um', status: 'ERROR', ans: 'fix' },
  { layer: 'METAL1', rule: 'M1.S.1', meas: '0.20 um', req: '≥ 0.22 um', status: 'ERROR', ans: 'fix' },
  { layer: 'POLY', rule: 'PO.E.1', meas: '0.09 um', req: '≥ 0.10 um', status: 'WARNING', ans: 'review' },
  { layer: 'METAL1', rule: 'M1.DEN.1 (density)', meas: '18 %', req: '≥ 20 %', status: 'WAIVED', ans: 'keep' },
  { layer: 'VIA1', rule: 'V1.E.2', meas: '0.020 um', req: '≥ 0.05 um', status: 'ERROR', ans: 'fix' },
];
export const DRC_CLEAN_Q = {
  prompt: "이 레이아웃을 'DRC clean' 으로 release 하려면?",
  opts: [
    'ERROR 3건(M1.W.1, M1.S.1, V1.E.2)을 고치고, WARNING 1건은 검토해 수정하거나 waiver 승인을 받는다',
    'WAIVED 를 포함한 5건을 모두 수정한다',
    'ERROR 중 가장 큰 차이 1건만 고친다',
  ],
  ans: 0,
  why: '교재: error 가 남은 레이아웃은 release 하지 않는다. warning 은 waiver 전에 반드시 검토. waived 는 이미 승인된 예외라 그대로 둔다. (V1.E.2 의 0.020 um 은 0.20 이 아니다 — 소수점 자리 주의)',
};

/* =========================================================================
 * 11강 ① 비아 enclosure — 아래 금속이 비아를 네 방향 모두 0.05 um 이상 감싸는가
 *   교재: Vias must fully overlap the metal below; check the enclosure value on all four sides (0.05 μm)
 * ====================================================================== */

export const ENC_MIN = 0.05;
export const ENC_VIAS = [
  { id: 'V-A', sides: { L: 0.06, R: 0.06, T: 0.06, B: 0.06 } },
  { id: 'V-B', sides: { L: 0.02, R: 0.10, T: 0.06, B: 0.06 } },
  { id: 'V-C', sides: { L: 0.07, R: 0.05, T: -0.03, B: 0.15 } },
];
export function encJudge(v) {
  const bad = Object.entries(v.sides).filter(([, x]) => x < ENC_MIN - 1e-9);
  return { ok: bad.length === 0, bad: bad.map(([k, x]) => `${k} ${x.toFixed(2)} μm`) };
}

/* =========================================================================
 * 11강 ② Check Rules — 좌표가 있는 위반을 읽고 배치를 고쳐 'No violations' 까지
 *   교재: M1 line width ≥ 0.25 μm, spacing ≥ 0.30 μm, Grid: 0.005, 위반 예 (1.40, 0.80) 0.22 μm
 *   좌표는 nm 정수로 다뤄 부동소수 오차 없이 격자를 판정한다.
 * ====================================================================== */

export const CR_RULE = { width: 250, spacing: 300, grid: 5 };   // nm
export function crInit() {
  return { A: { x: 1000, w: 300 }, B: { x: 1520, w: 300 }, C: { x: 2303, w: 200 }, ran: false };
}
const um = (nm) => (nm / 1000).toFixed(nm % 10 ? 3 : 2);
/** 위반 목록 (선은 y 0.20~1.40 의 세로 M1 배선) */
export function crCheck(g) {
  const out = [];
  const order = ['A', 'B', 'C'];
  order.forEach((k) => {
    const s = g[k];
    if (s.w < CR_RULE.width) out.push({ id: `W-${k}`, kind: 'Width violation', shape: k, msg: `Width violation: line ${k} ${um(s.w)} μm < min ${um(CR_RULE.width)} μm`, at: [s.x + s.w / 2, 800] });
    if (s.x % CR_RULE.grid) out.push({ id: `G-${k}`, kind: 'Off-grid vertex', shape: k, msg: `Off-grid vertex: line ${k} edge at X ${um(s.x)} (grid 0.005)`, at: [s.x, 200] });
  });
  for (let i = 0; i < order.length - 1; i += 1) {
    const a = g[order[i]]; const b = g[order[i + 1]];
    const gap = b.x - (a.x + a.w);
    if (gap < CR_RULE.spacing) out.push({ id: `S-${order[i]}${order[i + 1]}`, kind: 'Spacing violation', shape: order[i + 1], msg: `Spacing violation: ${order[i]}–${order[i + 1]} ${um(gap)} μm < min ${um(CR_RULE.spacing)} μm`, at: [a.x + a.w + gap / 2, 800] });
  }
  return out;
}
/** 조치 — 옳은 것도 틀린 것도 실제로 도형을 바꾼다. 결과는 다시 Check Rules 로 확인한다. */
export const CR_FIXES = [
  { id: 'moveB', label: 'Move line B right by 0.10 μm', apply: (g) => ({ ...g, B: { ...g.B, x: g.B.x + 100 } }) },
  { id: 'widenB', label: 'Widen line B by 0.10 μm', apply: (g) => ({ ...g, B: { ...g.B, w: g.B.w + 100 } }) },
  { id: 'widenC', label: 'Widen line C to 0.25 μm', apply: (g) => ({ ...g, C: { ...g.C, w: Math.max(g.C.w, 250) } }) },
  { id: 'moveC', label: 'Move line C right by 0.003 μm', apply: (g) => ({ ...g, C: { ...g.C, x: g.C.x + 3 } }) },
  { id: 'snapC', label: 'Snap line C to grid', apply: (g) => ({ ...g, C: { ...g.C, x: Math.round(g.C.x / CR_RULE.grid) * CR_RULE.grid } }) },
];
export function crApply(g, fixId) {
  const f = CR_FIXES.find((x) => x.id === fixId);
  return { ...f.apply(g), ran: false };
}

/* =========================================================================
 * 12강 ① 층 이름 ↔ 화면 색 (이 화면의 색 배정 — 툴·회사마다 다르다)
 * ====================================================================== */

export const LC_LAYERS = [
  { id: 'POLY', color: '#f87171', swatch: 'red' },
  { id: 'METAL1', color: '#3b82f6', swatch: 'blue' },
  { id: 'METAL2', color: '#c084fc', swatch: 'purple' },
  { id: 'VIA1', color: '#fbbf24', swatch: 'yellow' },
];

/* =========================================================================
 * 12강 ② DRC 개수 — error / warning 개수를 예측하고 SUMMARY 로 확인
 *   교재: SP1.2 insufficient spacing (0.11 < 0.14), metal width below minimum (0.08 < 0.10),
 *         warning = 권장 간격 미달 등 검토 항목, 요약 줄 'Errors: N  Warnings: M'
 *   권장 간격 0.16 은 이 실습의 예시.
 * ====================================================================== */

export const CNT_RULE = { m1Space: 0.14, m1Width: 0.10, m2Space: 0.14, recSpace: 0.16 };
export function cntInit() { return { s1: 0.11, w1: 0.08, s2: 0.15 }; }
export function cntCheck(p) {
  const r = [];
  const f = (v) => v.toFixed(2);
  if (p.s1 < CNT_RULE.m1Space - 1e-9) r.push({ sev: 'ERROR', text: `SP1.2 : insufficient spacing (${f(p.s1)} < ${f(CNT_RULE.m1Space)}) @ (12.40, 8.66) METAL1` });
  else if (p.s1 < CNT_RULE.recSpace - 1e-9) r.push({ sev: 'WARNING', text: `SP1.R : spacing below recommended (${f(p.s1)} < ${f(CNT_RULE.recSpace)}) @ (12.40, 8.66) METAL1` });
  if (p.w1 < CNT_RULE.m1Width - 1e-9) r.push({ sev: 'ERROR', text: `WD1.1 : metal width below minimum (${f(p.w1)} < ${f(CNT_RULE.m1Width)}) @ (10.05, 8.20) METAL1` });
  if (p.s2 < CNT_RULE.m2Space - 1e-9) r.push({ sev: 'ERROR', text: `SP2.2 : insufficient spacing (${f(p.s2)} < ${f(CNT_RULE.m2Space)}) @ (14.80, 9.10) METAL2` });
  else if (p.s2 < CNT_RULE.recSpace - 1e-9) r.push({ sev: 'WARNING', text: `SP2.R : spacing below recommended (${f(p.s2)} < ${f(CNT_RULE.recSpace)}) @ (14.80, 9.10) METAL2` });
  r.sort((a, b) => (a.sev === b.sev ? 0 : a.sev === 'ERROR' ? -1 : 1));
  return { rows: r, errors: r.filter((x) => x.sev === 'ERROR').length, warnings: r.filter((x) => x.sev === 'WARNING').length };
}

/* =========================================================================
 * 13강 ① 넷리스트 비교 — 소자를 짝짓고 단자별 net 비교, LVS PASSED / FAILED
 *   (2-input NAND. 레이아웃 M3 의 gate 가 A 대신 B 에 붙어 있다)
 * ====================================================================== */

export const LVS_SCH = [
  { id: 'MP1', type: 'pmos', d: 'OUT', g: 'A', s: 'VDD' },
  { id: 'MP2', type: 'pmos', d: 'OUT', g: 'B', s: 'VDD' },
  { id: 'MN1', type: 'nmos', d: 'OUT', g: 'A', s: 'X' },
  { id: 'MN2', type: 'nmos', d: 'X', g: 'B', s: 'VSS' },
];
export const LVS_LAY = [
  { id: 'M0', type: 'pmos', d: 'OUT', g: 'B', s: 'VDD' },
  { id: 'M1', type: 'pmos', d: 'OUT', g: 'A', s: 'VDD' },
  { id: 'M2', type: 'nmos', d: 'X', g: 'B', s: 'VSS' },
  { id: 'M3', type: 'nmos', d: 'OUT', g: 'B', s: 'X' },
];
export const LVS_PAIR = { MP1: 'M1', MP2: 'M0', MN1: 'M3', MN2: 'M2' };
export function lvsCompare(schId, layId) {
  const a = LVS_SCH.find((x) => x.id === schId); const b = LVS_LAY.find((x) => x.id === layId);
  if (!a || !b) return null;
  const terms = ['d', 'g', 's'].map((t) => ({ t: { d: 'drain', g: 'gate', s: 'source' }[t], sch: a[t], lay: b[t], ok: a[t] === b[t] }));
  return { typeOk: a.type === b.type, terms, ok: a.type === b.type && terms.every((x) => x.ok) };
}
export const LVS_WHICH_Q = {
  prompt: '리포트에 쓸 mismatch 문장은?',
  opts: [
    "Terminal 'gate' of M3 is connected to net B; expected net A.",
    'Device MP2 exists in schematic but not in layout.',
    'Net OUT is open; two segments are not joined.',
  ],
  ans: 0,
};

/* =========================================================================
 * 13강 ② LVS 오류 수정 — missing device / short / open 분류 → 수정 → 재실행 → LVS clean
 * ====================================================================== */

export const LVS_TYPES = ['Missing device', 'Extra device', 'Short', 'Open'];
export const LVS_ERRORS = [
  { id: 'e1', msg: 'Device MN2 exists in schematic but not in layout.', type: 'Missing device', kind: 'dev',
    fixes: ['Place MN2 (NMOS) in the layout and connect it', 'Delete MN2 from the schematic', 'Leave the layout as it is'], fix: 0 },
  { id: 'e2', msg: 'Nets shorted together: VDD and VSS (M1 overlap @ (4.20, 0.60)).', type: 'Short', kind: 'net',
    fixes: ['Add a via between VDD and VSS', 'Remove the M1 bridge between the VDD and VSS rails', 'Widen the VDD rail'], fix: 1 },
  { id: 'e3', msg: 'Net VOUT is open; two segments are not joined.', type: 'Open', kind: 'net',
    fixes: ['Rename one segment to VOUT2', 'Delete the shorter segment', 'Join the two VOUT segments with M1 and a via'], fix: 2 },
];
/** 재실행 결과 — 고친 오류는 빠진다 */
export function lvsRerun(fixed) {
  const left = LVS_ERRORS.filter((e) => !fixed[e.id]);
  const dev = left.filter((e) => e.kind === 'dev').length;
  const net = left.filter((e) => e.kind === 'net').length;
  if (!left.length) return { pass: true, lines: ['LVS PASSED — Layout matches schematic.', 'Summary: Unmatched devices = 0, Unmatched nets = 0, Property errors = 0', 'LVS clean.'], left };
  return { pass: false, lines: ['LVS FAILED — Layout does NOT match schematic.', `Summary: Unmatched devices = ${dev}, Unmatched nets = ${net}, Property errors = 0`], left };
}

/* =========================================================================
 * 4강 ① 진공·가스 라인 도해 — 어느 부품이 어떤 값을 로그에 남기는가
 *   교재: MFC 가 유량을 제어하고 그 값이 로그에 flow rate 로 기록된다 /
 *         A reading far below the set point often means the gas line is starved or the MFC is faulty /
 *         UNSTABLE 은 누설·MFC 이상·밸브 문제의 초기 징후. 로그 태그 이름은 이 실습의 예시.
 * ====================================================================== */

export const GAS_PARTS = [
  { id: 'cyl', en: 'Gas cylinder', ko: '가스 실린더', d: '공정 가스(Ar, CF4)를 공급하는 용기.', tag: 'SUPPLY_PRS', unit: 'psi' },
  { id: 'mfc1', en: 'MFC-1 (Ar)', ko: '질량 유량 제어기 1', d: 'Ar 유량을 설정값(SP)에 맞춰 제어하고 실제값(PV)을 기록한다.', tag: 'MFC1_AR', unit: 'sccm' },
  { id: 'mfc2', en: 'MFC-2 (CF4)', ko: '질량 유량 제어기 2', d: 'CF4 유량을 제어·기록한다.', tag: 'MFC2_CF4', unit: 'sccm' },
  { id: 'sov', en: 'Shut-off valve', ko: '차단 밸브', d: '가스 라인을 열고 닫는 On/Off 밸브. 열림/닫힘 상태가 기록된다.', tag: 'SOV_STATE', unit: 'OPEN/CLOSED' },
  { id: 'chamber', en: 'Chamber', ko: '챔버', d: '가스가 들어와 공정이 일어나는 진공 공간.', tag: '—', unit: '' },
  { id: 'gauge', en: 'Pressure gauge', ko: '압력 게이지', d: '챔버 압력을 재서 PV 로 기록한다.', tag: 'CH_PRS', unit: 'mTorr' },
  { id: 'tv', en: 'Throttle valve', ko: '스로틀 밸브', d: '열림 정도(%)를 바꿔 챔버 압력을 설정값에 맞춘다.', tag: 'TV_POS', unit: '%' },
  { id: 'pump', en: 'Vacuum pump', ko: '진공 펌프', d: '챔버를 배기한다. 포어라인 압력·회전 상태가 기록된다.', tag: 'FORELINE', unit: 'Torr' },
];
export const GAS_LOG_Q = [
  { line: '03:12  CH_PRS    PV 12.4 mTorr  SP 10.0  OUT OF RANGE', ans: 'gauge',
    why: '챔버 압력 PV — 압력 게이지가 잰 값. SP 보다 24% 높아 OUT OF RANGE.' },
  { line: '03:12  MFC1_AR   PV 49.8 sccm   SP 50    IN RANGE', ans: 'mfc1',
    why: 'Ar 유량 — MFC-1 이 제어·기록. 설정값과 거의 같아 정상.' },
  { line: '03:13  MFC2_CF4  PV 6.0 sccm    SP 20    OUT OF RANGE', ans: 'mfc2',
    why: 'CF4 유량이 설정값보다 크게 낮다 — 교재: gas line is starved or the MFC is faulty.' },
  { line: '03:13  TV_POS    92 %  (normal 35~45 %)', ans: 'tv',
    why: '스로틀 밸브가 거의 끝까지 열려 압력을 낮추려 애쓰는 중 — 누설(leak)로 압력이 오를 때의 전형적 모습.' },
  { line: '03:14  FORELINE  0.35 Torr', ans: 'pump',
    why: '포어라인 압력 — 진공 펌프 쪽 값. 높으면 펌프 성능 저하를 의심.' },
];

/* =========================================================================
 * 9강 안전 작업 — 규정 문장 판정 · LOTO 순서 · 가스 경보 판독
 *   교재: 조동사 강도(ISO/IEC Directives Part 2 — shall 요구 · should 권고 · may 허용, need not = 의무 아님,
 *         must = 현장 매뉴얼에서 '반드시'), LOTO 6단계(OSHA 29 CFR 1910.147(d)),
 *         TLV-TWA(ACGIH) Cl2 0.1 · SiH4 5 · AsH3 0.005 · PH3 0.05 · NF3 10 ppm.
 *   이 실습을 위해 정한 것 — 경보 단계(1차 = TLV 50%, 2차 = TLV 100%). 실제 값은 사업장 절차서가 정한다.
 * ====================================================================== */

/** 규정 문장의 무게 — 화면 버튼 순서이기도 하다 */
export const MODAL_CLASSES = [
  { id: 'required', en: 'Required', ko: '반드시 (의무)' },
  { id: 'prohibited', en: 'Prohibited', ko: '하지 마라 (금지)' },
  { id: 'recommended', en: 'Recommended', ko: '하는 게 좋다 (권장)' },
  { id: 'permitted', en: 'Permitted', ko: '해도 된다 (허용)' },
  { id: 'notRequired', en: 'Not required', ko: '안 해도 된다 (의무 아님)' },
];

/**
 * 문장 → 무게. 첫 조동사 하나로 정한다(교재 규칙 그대로). 조동사가 없으면 null.
 * 'may not' 은 금지·가능성 두 뜻이라 판정하지 않는다(교재: 애매하면 묻는다) → 'ambiguous'.
 */
export function modalClass(sentence) {
  const s = ` ${String(sentence || '').toLowerCase().replace(/[’']/g, "'")} `;
  const m = s.match(/\b(shall not|shan't|must not|mustn't|should not|shouldn't|need not|needn't|may not|shall|must|should|may)\b/);
  if (!m) return null;
  const w = m[1];
  if (w === 'may not') return 'ambiguous';
  if (/^(shall not|shan't|must not|mustn't)$/.test(w)) return 'prohibited';
  if (/^(need not|needn't)$/.test(w)) return 'notRequired';
  if (/^(should not|shouldn't)$/.test(w)) return 'recommended'; // '하지 않는 게 좋다' — 권고의 부정. 이 실습 문장에는 쓰지 않는다
  if (w === 'should') return 'recommended';
  if (w === 'may') return 'permitted';
  return 'required'; // shall · must
}

/** 실습 문장 — ans 는 손으로 적은 정답(테스트가 modalClass 와 대조한다), modal 은 근거 단어 */
export const MODAL_ITEMS = [
  { id: 'm1', en: 'Personnel shall complete gas safety training before entering the gas area.', ans: 'required', modal: 'shall',
    why: 'shall = 요구사항. 교육을 안 마치고 들어가면 규정 위반이다.' },
  { id: 'm2', en: 'Personnel must not work alone on any toxic gas line.', ans: 'prohibited', modal: 'must not',
    why: 'must not = 금지. 혼자 작업하는 것 자체가 안 된다.' },
  { id: 'm3', en: 'A portable gas detector should be carried during any line break.', ans: 'recommended', modal: 'should',
    why: 'should = 권고. 하는 게 좋지만, 정당한 이유가 있으면 달리 할 수 있다.' },
  { id: 'm4', en: 'The technician may use a digital torque wrench instead of a click type.', ans: 'permitted', modal: 'may',
    why: 'may = 허용. 디지털 렌치를 써도 되고, 원래 렌치를 써도 위반이 아니다.' },
  { id: 'm5', en: 'A face shield need not be worn inside the control room.', ans: 'notRequired', modal: 'need not',
    why: 'need not = 의무가 아님. "쓰지 마라"가 아니다 — 써도 된다.' },
  { id: 'm6', en: 'The RF generator shall not be energized while any panel is open.', ans: 'prohibited', modal: 'shall not',
    why: 'shall not = 금지. 패널이 하나라도 열려 있으면 RF 를 켜면 안 된다.' },
  { id: 'm7', en: 'All isolation points must be locked and tagged before work begins.', ans: 'required', modal: 'must',
    why: '현장 매뉴얼의 must = 반드시. 작업 전에 모든 차단 지점에 잠금·표찰.' },
  { id: 'm8', en: 'Leak checks should be performed at the start of each shift.', ans: 'recommended', modal: 'should',
    why: 'should = 권고. 교대마다 누설 검사를 하는 것이 좋다.' },
  { id: 'm9', en: 'The tool need not be vented for a software-only update.', ans: 'notRequired', modal: 'need not',
    why: 'need not = 안 해도 된다. 벤트를 해도 위반은 아니다(필요가 없을 뿐).' },
  { id: 'm10', en: 'Visitors may enter the gas area only when escorted.', ans: 'permitted', modal: 'may … only when',
    why: 'may = 허용이지만 only when 이 조건을 단다 — 안내자와 함께일 때만 허용.' },
];
export function modalJudge(id, pick) {
  const it = MODAL_ITEMS.find((x) => x.id === id);
  if (!it) return null;
  return { ok: pick === it.ans, ans: it.ans, why: it.why, modal: it.modal };
}

/* ── LOTO 순서 ──
   카드마다 먼저 끝나 있어야 할 카드(needs)와, 너무 일찍 눌렀을 때의 이유(early)를 둔다.
   trap 카드는 절차서에 없는 지름길 — 언제 눌러도 거절된다. */
export const LOTO_CARDS = [
  { id: 'notify', en: 'Notify affected personnel that the tool will be shut down.', ko: '영향받는 사람에게 정지를 알린다', step: 1, needs: [] },
  { id: 'shutdown', en: 'Shut down the tool using the normal stop sequence.', ko: '정상 정지 순서로 멈춘다', step: 2, needs: ['notify'],
    early: '알리기 전에 멈추면 그 장비를 쓰던 사람이 영문도 모른 채 공정을 잃는다.' },
  { id: 'isoMain', en: 'Open the AC main breaker.', ko: '주전원 차단기를 내린다', step: 3, needs: ['shutdown'],
    early: '운전 중에 전원부터 끊으면 공정·장비가 비정상으로 멈춘다 — 정상 정지가 먼저.' },
  { id: 'isoRf', en: 'Switch off the RF generator at its own breaker.', ko: 'RF 발생기를 자체 차단기에서 끈다', step: 3, needs: ['shutdown'],
    early: '정상 정지 전에 RF 를 끊으면 플라즈마가 비정상으로 꺼진다 — 정상 정지가 먼저.' },
  { id: 'isoCda', en: 'Close the CDA supply valve.', ko: '압축공기(CDA) 공급 밸브를 닫는다', step: 3, needs: ['shutdown'],
    early: '운전 중 공압을 끊으면 밸브가 제멋대로 움직인다 — 정상 정지가 먼저.' },
  { id: 'isoGas', en: 'Close the process gas valve at the VMB.', ko: 'VMB 에서 공정 가스 밸브를 닫는다', step: 3, needs: ['shutdown'],
    early: '공정 중 가스를 끊으면 압력이 흔들리고 알람이 연쇄로 뜬다 — 정상 정지가 먼저.' },
  { id: 'lock', en: 'Apply your personal lock and tag to every isolation point.', ko: '모든 차단 지점에 내 자물쇠·표찰', step: 4, needs: ['isoMain', 'isoRf', 'isoCda', 'isoGas'],
    early: '아직 끊지 않은 에너지원이 있다 — every isolation point 는 네 곳 모두다(RF 는 자체 차단기).' },
  { id: 'bleed', en: 'Bleed the residual pressure from the CDA line.', ko: 'CDA 라인 잔압을 뺀다', step: 5, needs: ['lock'],
    early: '잠그기 전에 잔압을 빼면, 그 사이 누가 밸브를 다시 열 수 있다 — 잠금이 먼저.' },
  { id: 'purge', en: 'Cycle-purge the process gas line with N2.', ko: '가스 라인을 N2 로 반복 퍼지한다', step: 5, needs: ['lock'],
    early: '잠그기 전에 퍼지하면, 그 사이 가스가 다시 들어올 수 있다 — 잠금이 먼저.' },
  { id: 'verify', en: 'Verify zero energy: press START (no response) and measure 0 V.', ko: '무에너지 확인 — START 무반응, 0 V', step: 6, needs: ['bleed', 'purge'],
    early: '남은 에너지(잔압·가스)를 빼기 전이라 확인해도 무에너지가 아니다.' },
  { id: 'work', en: 'Open the chamber panel and begin the maintenance work.', ko: '패널을 열고 정비를 시작한다', step: 7, needs: ['verify'],
    early: '잠갔다고 에너지가 없는 게 아니다 — 확인(try-out) 전에는 손대지 않는다.' },
  { id: 'trapBuddy', en: 'Ask a coworker to hold the breaker OFF instead of locking it.', ko: '자물쇠 대신 동료가 차단기를 붙잡고 있게 한다', trap: true,
    early: '사람은 자물쇠가 아니다 — 자리를 비우거나 다른 사람이 올리면 끝이다. one person, one lock, one key.' },
  { id: 'trapTag', en: 'Hang a tag only, without a lock, to save time.', ko: '시간을 아끼려 표찰만 단다', trap: true,
    early: '이 장비는 자물쇠를 걸 수 있다 — 표찰은 경고일 뿐 물리적으로 막지 못한다.' },
];
export function lotoInit() { return { done: [], mistakes: 0, finished: false }; }
/** 카드 하나를 누른다. 반환 { s, ok, log:[{t,m}] } — s 는 새 객체 */
export function lotoAct(s, id) {
  const card = LOTO_CARDS.find((c) => c.id === id);
  if (!card || s.finished || s.done.includes(id)) return { s, ok: false, log: [] };
  const miss = card.trap ? [] : card.needs.filter((n) => !s.done.includes(n));
  if (card.trap || miss.length) {
    return { s: { ...s, mistakes: s.mistakes + 1 }, ok: false,
      log: [{ t: 'ALARM', m: `REJECTED — ${card.en}` }, { t: 'INFO', m: card.early }] };
  }
  const done = [...s.done, id];
  const finished = id === 'work';
  return { s: { ...s, done, finished }, ok: true,
    log: [{ t: 'CMD', m: `STEP ${card.step} DONE — ${card.en}` }, ...(finished ? [{ t: 'CMD', m: `Zero energy verified. Work may begin. (mistakes: ${s.mistakes})` }] : [])] };
}
/** 지금 눌러도 되는 카드 id (힌트·테스트용) */
export function lotoAvailable(s) {
  return LOTO_CARDS.filter((c) => !c.trap && !s.done.includes(c.id) && c.needs.every((n) => s.done.includes(n))).map((c) => c.id);
}

/* ── 가스 경보 ── */
export const GAS_TLV = { Cl2: 0.1, SiH4: 5, AsH3: 0.005, PH3: 0.05, NF3: 10 }; // ppm, ACGIH TLV-TWA
export const GAS_L1_FRAC = 0.5; // 이 실습의 설정: 1차 경보 = TLV 50%
export const GAS_L2_FRAC = 1.0; // 2차 경보 = TLV 100%
export const GAS_ACTIONS = [
  { id: 'continue', en: 'Continue work and keep monitoring.', ko: '작업 계속, 감시 유지' },
  { id: 'stop', en: 'Stop work, secure the area, and report to the supervisor.', ko: '작업 중지 · 현장 정리 · 보고' },
  { id: 'evacuate', en: 'Evacuate immediately via the nearest exit. Do not re-enter until the all-clear.', ko: '즉시 대피 · 해제 전 재진입 금지' },
];
export function toPpm(value, unit) { return unit === 'ppb' ? value / 1000 : value; }
/** 농도 → 단계. 경계값은 '이상'으로 본다(≥) */
export function gasLevel(gas, value, unit = 'ppm') {
  const tlv = GAS_TLV[gas];
  if (tlv == null) throw new Error(`unknown gas ${gas}`);
  const ppm = toPpm(value, unit);
  const eps = 1e-12;
  if (ppm + eps >= tlv * GAS_L2_FRAC) return 'ALARM';
  if (ppm + eps >= tlv * GAS_L1_FRAC) return 'WARNING';
  return 'NORMAL';
}
export function gasAction(level) { return level === 'ALARM' ? 'evacuate' : level === 'WARNING' ? 'stop' : 'continue'; }
export const GAS_CASES = [
  { id: 'g1', point: 'TGM-03 (VMB-3)', gas: 'Cl2', value: 0.03, unit: 'ppm', note: '라인 개방 작업 중' },
  { id: 'g2', point: 'TGM-03 (VMB-3)', gas: 'Cl2', value: 0.06, unit: 'ppm', note: '라인 개방 작업 중' },
  { id: 'g3', point: 'TGM-11 (GC-07 exhaust)', gas: 'SiH4', value: 6, unit: 'ppm', note: '가스 캐비닛 자동 차단 작동(auto shut-off)' },
  { id: 'g4', point: 'TGM-21 (implant gas box)', gas: 'AsH3', value: 3, unit: 'ppb', note: '단위가 ppb 인 것에 주의' },
  { id: 'g5', point: 'TGM-14 (chamber clean line)', gas: 'NF3', value: 4, unit: 'ppm', note: '세정 가스 라인 근처' },
  { id: 'g6', point: 'TGM-22 (implant gas box)', gas: 'PH3', value: 50, unit: 'ppb', note: '단위가 ppb 인 것에 주의' },
];
/** 사례 판정 설명 — 화면과 테스트가 같은 문장을 쓴다 */
export function gasExplain(c) {
  const tlv = GAS_TLV[c.gas], ppm = toPpm(c.value, c.unit), lv = gasLevel(c.gas, c.value, c.unit);
  const fmt = (x) => String(+x.toPrecision(3));
  const conv = c.unit === 'ppb' ? `${c.value} ppb = ${fmt(ppm)} ppm. ` : '';
  return `${conv}TLV ${fmt(tlv)} ppm → 1차 ${fmt(tlv * GAS_L1_FRAC)} · 2차 ${fmt(tlv * GAS_L2_FRAC)} ppm. ${fmt(ppm)} ppm 은 ${lv === 'ALARM' ? '2차 이상 — 즉시 대피' : lv === 'WARNING' ? '1차 이상 2차 미만 — 작업 중지·보고' : '1차 미만 — 정상'}.`;
}

/* =========================================================================
 * 10강 레시피 · 변경 관리 — 경계 판정 · 레시피 실행 기록 판정 · 변경 관리 결정
 *   교재: 경계어(not to exceed ≤ · below < · at least ≥ · within ± 양 끝 포함 · between 양 끝 포함),
 *         조건어(unless = if not · only if = 필요조건 · provided that = 예외 조건).
 *   이 교재의 가상 예시 — 레시피 ETCH-POLY-01 Rev C 의 ME 설정값, 허용 범위(압력 ±5% · 유량 ±2 sccm · RF 3%),
 *   끝점 정상 범위 30~60 s, OE = 실제 ME 시간의 30%, 변경 규정 R1~R4. 교재 원고(scripts/content/field-english-w10.mjs)와 같은 숫자.
 * ====================================================================== */

/**
 * 경계 문장 → 구간. 반환 { lo, hi, loInc, hiInc } (없는 쪽은 null). 읽지 못하면 null.
 * 교재 규칙: not to exceed / no more than / max / up to → ≤ · below / less than / under → <
 *           at least / a minimum of / no less than → ≥ · above / greater than / more than / over → >
 *           greater than or equal to → ≥ · less than or equal to → ≤
 *           within ±d (of s) → [s-d, s+d] · between a and b → [a, b] (exclusive 라고 적혀 있으면 (a, b))
 *           기준값 s 는 문장 속 '(setpoint|target|nominal) (값' 에서 읽고, 없으면 인자 setpoint 를 쓴다
 */
export function parseLimit(phrase, setpoint) {
  const p = ` ${String(phrase || '').toLowerCase()} `;
  const num = (re) => { const m = p.match(re); return m ? parseFloat(m[1]) : null; };
  const N = '([0-9]+(?:\\.[0-9]+)?(?:e-?[0-9]+)?)';
  let m;
  if ((m = p.match(new RegExp(`between ${N}\\D*? and ${N}`)))) {
    const ex = /exclusive/.test(p);
    return { lo: parseFloat(m[1]), hi: parseFloat(m[2]), loInc: !ex, hiInc: !ex };
  }
  if ((m = p.match(new RegExp(`within ±\\s*${N}`)))) {
    const d = parseFloat(m[1]);
    const pct = new RegExp(`within ±\\s*${N}\\s*%`).test(p);
    const s = num(new RegExp(`(?:setpoint|target|nominal) \\(?${N}`)) ?? setpoint; // 기준값 — '(the setpoint|target|nominal) (10 mTorr)' (11강: target)
    if (s == null) return null;
    const w = pct ? (s * d) / 100 : d;
    return { lo: s - w, hi: s + w, loInc: true, hiInc: true };
  }
  const rules = [
    [/greater than or equal to|no less than|at least|a minimum of|minimum/, 'lo', true],
    [/less than or equal to|not to exceed|no more than|up to|maximum|\bmax\b/, 'hi', true],
    [/below|less than|under/, 'hi', false],
    [/above|greater than|more than|over/, 'lo', false],
  ];
  for (const [re, side, inc] of rules) {
    const k = p.match(re);
    if (!k) continue;
    const after = p.slice(k.index + k[0].length);
    const v = after.match(new RegExp(N));
    if (!v) return null;
    const x = parseFloat(v[1]);
    return side === 'lo' ? { lo: x, hi: null, loInc: inc, hiInc: false } : { lo: null, hi: x, loInc: false, hiInc: inc };
  }
  return null;
}
export function inLimit(lim, v) {
  if (!lim) return null;
  const eps = 1e-9;
  if (lim.lo != null && (lim.loInc ? v < lim.lo - eps : v <= lim.lo + eps)) return false;
  if (lim.hi != null && (lim.hiInc ? v > lim.hi + eps : v >= lim.hi - eps)) return false;
  return true;
}
/** 경계 판정 실습 — pass 는 손으로 적은 정답(테스트가 parseLimit·inLimit 과 대조) */
export const LIMIT_ITEMS = [
  { id: 'l1', spec: 'Reflected power is not to exceed 20 W.', value: 20, unit: 'W', pass: true, why: 'not to exceed = ≤ 20. 경계값 20 W 는 합격.' },
  { id: 'l2', spec: 'Reflected power must be below 20 W.', value: 20, unit: 'W', pass: false, why: 'below = < 20. 경계값 20 W 는 불합격 — 위 문장과 숫자는 같고 말만 다르다.' },
  { id: 'l3', spec: 'Purge the chamber for at least 5 minutes.', value: 5, unit: 'min', pass: true, why: 'at least = ≥ 5. 정확히 5분은 합격.' },
  { id: 'l4', spec: 'Gas flow must stay within ±2 sccm of the setpoint (50 sccm).', value: 52.4, unit: 'sccm', pass: false, why: 'within ±2 of 50 = 48 ~ 52. 52.4 는 위로 벗어났다.' },
  { id: 'l5', spec: 'Pressure within ±5% of the setpoint (10 mTorr).', value: 10.5, unit: 'mTorr', pass: true, why: '±5% of 10 = ±0.5 → 9.5 ~ 10.5. 10.5 는 경계 — 포함이 보통이라 합격.' },
  { id: 'l6', spec: 'The endpoint should be detected between 30 and 60 seconds.', value: 28, unit: 's', pass: false, why: 'between 30 and 60 → 30 ~ 60. 28 s 는 너무 이르다(비정상 끝점).' },
  { id: 'l7', spec: 'RF power deviation shall be no more than 3%.', value: 2.6, unit: '%', pass: true, why: 'no more than = ≤ 3. 2.6% 는 합격.' },
  { id: 'l8', spec: 'Edge etch depth shall be greater than 95% of the center depth.', value: 95, unit: '%', pass: false, why: 'greater than = > 95. 같으면 불합격 — "greater than or equal to" 였다면 합격이다.' },
];

/* ── 레시피 실행 기록 판정 (ETCH-POLY-01 Rev C · 3단계 ME + 4단계 OE) ── */
export const RCP_ME = { press: 10, src: 600, bias: 120, hbr: 150, cl2: 50, o2: 5 };
export const RCP_TOL = { pressPct: 5, flowSccm: 2, rfPct: 3, epdMin: 30, epdMax: 60, oeFrac: 0.3, oeTolS: 0.5 };
export const RCP_FIELDS = [
  { id: 'press', label: 'ME PRESSURE', unit: 'mTorr', rule: 'within ±5% of the setpoint' },
  { id: 'src', label: 'ME SOURCE RF', unit: 'W', rule: 'no more than 3% deviation' },
  { id: 'bias', label: 'ME BIAS RF', unit: 'W', rule: 'no more than 3% deviation' },
  { id: 'hbr', label: 'ME HBr FLOW', unit: 'sccm', rule: 'within ±2 sccm' },
  { id: 'cl2', label: 'ME Cl2 FLOW', unit: 'sccm', rule: 'within ±2 sccm' },
  { id: 'epd', label: 'ENDPOINT TIME', unit: 's', rule: 'between 30 and 60 s' },
  { id: 'oe', label: 'OE TIME', unit: 's', rule: '30% of the actual ME time (±0.5 s)' },
];
/** 한 항목 판정 — run 은 실제값, 반환 { ok, expect } */
export function rcpCheck(run, id) {
  const T = RCP_TOL, v = run[id];
  const dev = (sp) => Math.abs(v - sp) / sp * 100;
  switch (id) {
    case 'press': return { ok: dev(RCP_ME.press) <= T.pressPct + 1e-9, expect: `${RCP_ME.press * 0.95} ~ ${RCP_ME.press * 1.05}` };
    case 'src': case 'bias': return { ok: dev(RCP_ME[id]) <= T.rfPct + 1e-9, expect: `${RCP_ME[id]} ±3%` };
    case 'hbr': case 'cl2': return { ok: Math.abs(v - RCP_ME[id]) <= T.flowSccm + 1e-9, expect: `${RCP_ME[id] - 2} ~ ${RCP_ME[id] + 2}` };
    case 'epd': return { ok: v >= T.epdMin && v <= T.epdMax, expect: `${T.epdMin} ~ ${T.epdMax}` };
    case 'oe': { const e = Math.round(run.epd * T.oeFrac * 10) / 10; return { ok: Math.abs(v - e) <= T.oeTolS + 1e-9, expect: `${e} (= ${run.epd} × 0.3)` }; }
    default: return null;
  }
}
export const RCP_RUNS = [
  { id: 'W03', note: '정상 웨이퍼', press: 10.2, src: 603, bias: 119, hbr: 150.8, cl2: 49.5, epd: 42.0, oe: 12.6 },
  { id: 'W07', note: '압력이 떠 있다', press: 10.7, src: 598, bias: 121, hbr: 149.6, cl2: 50.3, epd: 44.5, oe: 13.4 },
  { id: 'W12', note: 'OE 를 최대 시간 기준으로 잡았다', press: 9.9, src: 601, bias: 120, hbr: 150.1, cl2: 50.0, epd: 41.0, oe: 18.0 },
  { id: 'W15', note: '끝점이 너무 이르다', press: 10.1, src: 606, bias: 118, hbr: 147.5, cl2: 50.2, epd: 24.0, oe: 7.2 },
];

/* ── 변경 관리 결정 (규정 R1~R4) ── */
export const CC_RULES = [
  { id: 'R1', en: 'A production recipe shall not be edited unless an ECN has been approved.' },
  { id: 'R2', en: 'An approved change may be released only if at least two qual wafers pass.' },
  { id: 'R3', en: 'If any qual wafer fails, the change shall be rolled back to the previous revision.' },
  { id: 'R4', en: 'A step time change need not be re-qualified, provided that the change is within ±10% of the original value.' },
];
export const CC_ACTIONS = [
  { id: 'blocked', ko: '지금 고칠 수 없음', en: 'Cannot edit yet' },
  { id: 'hold', ko: '보류 — 시험 더 필요', en: 'Hold for qual' },
  { id: 'release', ko: '적용 (release)', en: 'Release' },
  { id: 'rollback', ko: '되돌림 (roll back)', en: 'Roll back' },
];
/** 사실 → { action, rule } — 규정을 위에서부터 그대로 적용한다 */
export function ccDecide(c) {
  if (c.ecn !== 'APPROVED') return { action: 'blocked', rule: 'R1' };
  if (c.fail > 0) return { action: 'rollback', rule: 'R3' };
  if (c.kind === 'time' && Math.abs(c.deltaPct) <= 10 + 1e-9) return { action: 'release', rule: 'R4' };
  if (c.pass >= 2) return { action: 'release', rule: 'R2' };
  return { action: 'hold', rule: 'R2' };
}
export const CC_CASES = [
  { id: 'c1', what: 'ME pressure 10 → 12 mTorr', kind: 'pressure', deltaPct: 20, ecn: 'PENDING', pass: 0, fail: 0 },
  { id: 'c2', what: 'ME pressure 10 → 12 mTorr', kind: 'pressure', deltaPct: 20, ecn: 'APPROVED', pass: 1, fail: 0 },
  { id: 'c3', what: 'ME pressure 10 → 12 mTorr', kind: 'pressure', deltaPct: 20, ecn: 'APPROVED', pass: 2, fail: 0 },
  { id: 'c4', what: 'OE O2 5 → 8 sccm', kind: 'gas', deltaPct: 60, ecn: 'APPROVED', pass: 1, fail: 1 },
  { id: 'c5', what: 'STAB time 15 → 16 s', kind: 'time', deltaPct: 6.7, ecn: 'APPROVED', pass: 0, fail: 0 },
  { id: 'c6', what: 'STAB time 15 → 18 s', kind: 'time', deltaPct: 20, ecn: 'APPROVED', pass: 0, fail: 0 },
  { id: 'c7', what: 'STAB time 15 → 16 s', kind: 'time', deltaPct: 6.7, ecn: 'PENDING', pass: 0, fail: 0 },
];
export const CC_WHY = {
  R1: 'R1 — unless an ECN has been approved: ECN 이 승인되지 않았으면 고칠 수 없다(시간 변경이어도 마찬가지).',
  R2: 'R2 — only if at least two qual wafers pass: 합격 두 장 이상이 반드시 있어야 적용한다.',
  R3: 'R3 — if any qual wafer fails: 한 장이라도 불합격이면 옛 판으로 되돌린다.',
  R4: 'R4 — need not be re-qualified, provided that … within ±10%: 10% 안의 시간 변경은 시험 없이 적용할 수 있다.',
};

/* =========================================================================
 * 11강 다른 장비 계열 읽기 — 명사 덩어리 · 장비 계열 맞히기 · 장비별 규격 판정
 *   교재: 명사 덩어리는 맨 오른쪽이 머리, 오른쪽부터 '~의'(of)로 읽는다. 단어보다 단위가 장비를 알려 준다
 *         (노광 dose mJ/cm² · 이온주입 dose /cm²). 판정 전에 단위를 맞추고(µA → mA) 지수(E15)를 먼저 본다.
 *   화면 값·규격은 교재 예시(전형적인 크기). 경계 판정은 10강의 parseLimit · inLimit 을 그대로 쓴다.
 * ====================================================================== */

/** 명사 덩어리 — groups 는 한 덩어리로 읽는 이름 단위(예: 'pad conditioner'). 머리 = 마지막 덩어리 */
export function nounHead(groups) { return groups[groups.length - 1]; }
/** of 로 풀어 쓰기 — 오른쪽부터: rate of the sweep of the pad conditioner */
export function ofChain(groups) { return groups.slice().reverse().map((g) => `the ${g}`).join(' of '); } // 기계적으로 풀어 쓴 것 — 머리가 맨 앞에 온다
export const NOUN_ITEMS = [
  { id: 'n1', groups: ['pad conditioner', 'sweep', 'rate'], opts: ['속도를 왕복시키는 패드 컨디셔너', '패드 컨디셔너의 왕복 속도', '패드를 컨디셔너로 왕복하는 비율'], ans: 1 },
  { id: 'n2', groups: ['chamber wall', 'temperature', 'setpoint'], opts: ['챔버 벽 온도의 설정값', '챔버 벽의 지금 온도', '설정된 챔버 벽'], ans: 0 },
  { id: 'n3', groups: ['wafer edge', 'exclusion', 'zone'], opts: ['웨이퍼 가장자리를 제외한 전체', '구역에서 제외된 웨이퍼', '웨이퍼 가장자리의 (측정) 제외 구역'], ans: 2 },
  { id: 'n4', groups: ['slurry', 'flow', 'alarm', 'limit'], opts: ['슬러리 유량 알람이 울림', '슬러리 유량 알람의 한계값', '알람 때문에 제한된 슬러리 유량'], ans: 1 },
  { id: 'n5', groups: ['beam current', 'stability', 'check'], opts: ['빔 전류 안정성 점검', '안정된 빔 전류', '점검으로 안정된 빔'], ans: 0 },
  { id: 'n6', groups: ['precursor line', 'heater', 'failure'], opts: ['고장 난 전구체', '전구체 배관을 데우는 실패한 작업', '전구체 배관 히터의 고장'], ans: 2 },
  { id: 'n7', groups: ['focus', 'offset', 'correction'], opts: ['초점 오프셋 보정', '보정된 초점', '오프셋이 생긴 초점'], ans: 0 },
];

/* ── 장비 계열 맞히기 — 단서 규칙(위에서부터). 같은 DOSE 라도 단위로 가른다 ── */
export const TOOL_FAMILIES = ['CVD', 'ALD', 'PVD', 'TRACK', 'SCANNER', 'CMP', 'IMPLANT'];
const TOOL_RULES = [
  ['IMPLANT', /\bkeV\b|BEAM CURRENT|TILT|E1\d\s*\/cm²|FARADAY/i],
  ['SCANNER', /mJ\/cm²|FOCUS|OVERLAY|RETICLE/i],
  ['TRACK', /SPIN|BAKE|DEVELOP|RESIST/i],
  ['CMP', /PLATEN|SLURRY|DOWN FORCE|PAD\b|REMOVAL RATE/i],
  ['PVD', /TARGET LIFE|DC POWER|SPUTTER/i],
  ['ALD', /\bALD\b|\bGPC\b|PULSE/i],
  ['CVD', /TEOS|DEP RATE|PRECURSOR|SiH4/i],
];
export function toolOf(line) { const r = TOOL_RULES.find(([, re]) => re.test(line)); return r ? r[0] : null; }
export const TOOL_LINES = [
  { id: 't1', line: 'DOWN FORCE  3.0 psi    PLATEN SPEED  93 rpm', tool: 'CMP', why: 'down force(psi) · platen — 웨이퍼를 패드에 누르는 CMP.' },
  { id: 't2', line: 'DOSE  25.0 mJ/cm²    FOCUS  -20 nm', tool: 'SCANNER', why: 'dose 단위가 mJ/cm²(빛의 양) + focus — 노광 스캐너.' },
  { id: 't3', line: 'ENERGY  40 keV    DOSE  5.0E15 /cm²', tool: 'IMPLANT', why: 'keV · dose 단위 /cm²(이온 개수) — 이온주입. 위 줄과 같은 DOSE 지만 단위가 다르다.' },
  { id: 't4', line: 'SPIN SPEED  1500 rpm    SOFT BAKE  100 °C / 60 s', tool: 'TRACK', why: 'spin · bake — 감광액을 바르고 굽는 트랙. rpm 만 보면 CMP 와 헷갈린다.' },
  { id: 't5', line: 'TEOS FLOW  1.2 g/min    DEP RATE  1500 Å/min', tool: 'CVD', why: 'TEOS(전구체) · dep rate — CVD 산화막.' },
  { id: 't6', line: 'ALD CYCLES  120    GPC  1.0 Å/cycle', tool: 'ALD', why: 'cycle · GPC(사이클당 두께) — ALD.' },
  { id: 't7', line: 'DC POWER  12 kW    TARGET LIFE  820 kWh', tool: 'PVD', why: 'DC power · target life — 타깃을 때리는 PVD(스퍼터).' },
  { id: 't8', line: 'BEAM CURRENT  2.4 mA    TILT / TWIST  7° / 22°', tool: 'IMPLANT', why: 'beam current · tilt 7° — 채널링을 막는 이온주입.' },
  { id: 't9', line: 'SLURRY FLOW  200 mL/min    PAD LIFE  62 %', tool: 'CMP', why: 'slurry · pad — CMP.' },
  { id: 't10', line: 'OVERLAY X / Y  2.1 / 2.8 nm    RETICLE  R-4471', tool: 'SCANNER', why: 'overlay · reticle — 노광 스캐너.' },
];

/* ── 장비별 규격 판정 — num 은 규격과 같은 단위로 바꾼 값, shown 은 화면에 보이는 그대로 ── */
export function parseSci(s) { return parseFloat(String(s).replace(/,/g, '').replace(/×\s*10\^?/, 'e')); }
export const SPEC_ITEMS = [
  { id: 's1', tool: 'IMPLANT', spec: 'Dose: within ±2% of the target (5.0E15 /cm²).', shown: '4.8E15 /cm²', num: parseSci('4.8E15'), pass: false,
    why: '±2% of 5.0E15 → 4.9E15 ~ 5.1E15. 4.8E15 는 4% 낮다 — E15 가 같아도 앞 숫자를 비교한다.' },
  { id: 's2', tool: 'IMPLANT', spec: 'Beam current must be at least 2.0 mA.', shown: '1800 µA', num: 1.8, pass: false,
    why: '1800 µA = 1.8 mA. 2.0 mA 보다 작다 — 단위를 맞추면 1800 > 2.0 이 아니다.' },
  { id: 's3', tool: 'CVD', spec: 'Film thickness: within ±3% of the target (1000 Å).', shown: '1,028 Å', num: 1028, pass: true,
    why: '±3% of 1000 → 970 ~ 1030 Å. 1028 Å 은 안.' },
  { id: 's4', tool: 'SCANNER', spec: 'Overlay shall be no more than 3.0 nm.', shown: 'X 2.1 nm / Y 3.2 nm', num: 3.2, pass: false,
    why: 'X 와 Y 둘 다 3.0 이하여야 한다. Y 3.2 nm 가 넘는다 — 큰 쪽으로 판정.' },
  { id: 's5', tool: 'CMP', spec: 'Removal rate: between 2000 and 3000 Å/min.', shown: '2,450 Å/min', num: 2450, pass: true,
    why: '2000 ~ 3000 Å/min 안. 쉼표(2,450)는 천 단위 구분이다.' },
  { id: 's6', tool: 'ALD', spec: 'Growth per cycle must be below 1.2 Å/cycle.', shown: '1.2 Å/cycle', num: 1.2, pass: false,
    why: 'below = 미만. 경계값 1.2 는 불합격 — 10강의 경계 읽기.' },
  { id: 's7', tool: 'TRACK', spec: 'Soft bake temperature: within ±1 °C of the setpoint (100 °C).', shown: '100.6 °C', num: 100.6, pass: true,
    why: '99 ~ 101 °C 안.' },
  { id: 's8', tool: 'CVD', spec: 'Film thickness: within ±3% of the target (1000 Å).', shown: '97 nm', num: 970, pass: true,
    why: '97 nm = 970 Å (1 nm = 10 Å). 경계값 970 Å 은 within 이라 포함 — 합격.' },
];

/* =========================================================================
 * 12강 트러블슈팅 문서 — 확신 등급 · 원인 좁히기 · 관리도 규칙
 *   교재: 확신 네 층(confirmed · was found / most likely · is consistent with / may · suspected / ruled out),
 *         관리도 규칙 — Rule 1 한계 밖 한 점(Western Electric 1) · Rule 2 중심선 한쪽 8점 연속(WE 4) ·
 *         Rule 3 6점 연속 증가/감소(Nelson 3). OOC 는 규격 이탈(OOS)이 아니다.
 *   교재 예시: 트러블슈팅 표 MM-0505(원인 4개 · '세정 뒤 12시간'), 관리도 CL 100 · UCL 106 · LCL 94 · 규격 90~110 nm/min.
 * ====================================================================== */

export const CERTAINTY_LEVELS = [
  { id: 'confirmed', ko: '확정', en: 'Confirmed' },
  { id: 'likely', ko: '가능성 높음', en: 'Likely' },
  { id: 'possible', ko: '가능성 있음', en: 'Possible' },
  { id: 'ruledOut', ko: '배제', en: 'Ruled out' },
];
/** 문장 → 확신 등급. 배제 → 확정 → 가능성 높음 → 가능성 있음 순으로 본다(교재 표). 표현이 없으면 null */
export function certaintyOf(sentence) {
  const s = ` ${String(sentence || '').toLowerCase()} `;
  if (/ruled out|is not the cause|was not the cause|eliminated|excluded/.test(s)) return 'ruledOut';
  if (/confirmed|verified|was found|were found|the root cause (?:is|was)/.test(s)) return 'confirmed';
  if (/most likely|\blikely\b|probably|is consistent with|points to|suggests/.test(s)) return 'likely';
  if (/\bmay\b|\bmight\b|\bcould\b|possibly|suspected|potential/.test(s)) return 'possible';
  return null;
}
export const CERTAINTY_ITEMS = [
  { id: 'k1', en: 'Root cause confirmed: the lid O-ring was cut during the last PM.', ans: 'confirmed', cue: 'confirmed' },
  { id: 'k2', en: 'The leak is most likely at the lid O-ring.', ans: 'likely', cue: 'most likely' },
  { id: 'k3', en: 'The gauge may be drifting.', ans: 'possible', cue: 'may' },
  { id: 'k4', en: 'Turbo pump degradation has been ruled out.', ans: 'ruledOut', cue: 'ruled out' },
  { id: 'k5', en: 'The chamber liner is suspected as the particle source.', ans: 'possible', cue: 'is suspected' },
  { id: 'k6', en: 'The pressure trend is consistent with outgassing after the wet clean.', ans: 'likely', cue: 'is consistent with' },
  { id: 'k7', en: 'A cracked viewport window was found during the inspection.', ans: 'confirmed', cue: 'was found' },
  { id: 'k8', en: 'The MFC is not the cause; its flow matched the reference meter.', ans: 'ruledOut', cue: 'is not the cause' },
];

/* ── 원인 좁히기: BASE PRESSURE HIGH (트러블슈팅 표 MM-0505, 교재 예시) ──
   관측(obs): gaugeAgree(두 게이지 일치?) · turboOk(터보 정상?) · hoursSinceClean · rorTrend('decreasing'|'steady') · heLeak('found'|'none')
   값이 null 이면 아직 확인하지 않은 것. */
export const OUTGAS_HOURS = 12; // 교재 예시: 세정 뒤 12시간이 지났으면 탈기(outgassing)는 배제
export const TS_CAUSES = [
  { id: 'gauge', en: 'Gauge error or drift', ko: '게이지 오차', check: 'Compare with the second gauge.',
    status: (o) => (o.gaugeAgree == null ? 'open' : o.gaugeAgree ? 'ruledOut' : 'confirmed') },
  { id: 'turbo', en: 'Turbo pump degraded', ko: '터보 펌프 저하', check: 'Check turbo speed and foreline pressure.',
    status: (o) => (o.turboOk == null ? 'open' : o.turboOk ? 'ruledOut' : 'confirmed') },
  { id: 'outgas', en: 'Outgassing after wet clean', ko: '세정 뒤 탈기', check: `Clean within ${OUTGAS_HOURS} h and rate of rise decreasing?`,
    status: (o) => (o.hoursSinceClean == null ? 'open' : o.hoursSinceClean > OUTGAS_HOURS ? 'ruledOut'
      : o.rorTrend === 'decreasing' ? 'confirmed' : o.rorTrend === 'steady' ? 'ruledOut' : 'open') },
  { id: 'leak', en: 'Vacuum leak at the lid O-ring', ko: '덮개 O-ring 누설', check: 'Perform a helium leak check at the lid.',
    status: (o) => (o.heLeak == null ? 'open' : o.heLeak === 'found' ? 'confirmed' : 'ruledOut') },
];
/** 관측 → 후보별 상태와 결론('gauge'|'turbo'|'outgas'|'leak'|'more'|'escalate') */
export function tsNarrow(obs) {
  const st = Object.fromEntries(TS_CAUSES.map((c) => [c.id, c.status(obs)]));
  const conf = TS_CAUSES.filter((c) => st[c.id] === 'confirmed');
  const open = TS_CAUSES.filter((c) => st[c.id] === 'open');
  const verdict = conf.length === 1 ? conf[0].id : conf.length > 1 ? 'more' : open.length ? 'more' : 'escalate';
  return { st, verdict };
}
export const TS_VERDICTS = [
  ...TS_CAUSES.map((c) => ({ id: c.id, ko: c.ko })),
  { id: 'more', ko: '확인이 더 필요하다' },
  { id: 'escalate', ko: '표에 없는 원인 — 상부에 올린다' },
];
export const TS_CASES = [
  { id: 'A', obs: { gaugeAgree: true, turboOk: true, hoursSinceClean: 72, rorTrend: null, heLeak: 'found' },
    lines: ['Second gauge reads 4.1E-5 Torr (same).', 'Turbo speed 100%, foreline 45 mTorr (normal).', 'Last wet clean: 72 h ago.', 'He leak check at lid: leak detected (2E-8 mbar·L/s).'] },
  { id: 'B', obs: { gaugeAgree: false, turboOk: true, hoursSinceClean: null, rorTrend: null, heLeak: null },
    lines: ['Second gauge reads 6.0E-6 Torr (main gauge: 4.2E-5).', 'Turbo speed 100%, foreline 45 mTorr (normal).'] },
  { id: 'C', obs: { gaugeAgree: true, turboOk: true, hoursSinceClean: 3, rorTrend: 'decreasing', heLeak: 'none' },
    lines: ['Second gauge reads the same value.', 'Turbo speed 100% (normal).', 'Last wet clean: 3 h ago. Rate of rise is decreasing every hour.', 'He leak check at lid: no leak.'] },
  { id: 'D', obs: { gaugeAgree: true, turboOk: null, hoursSinceClean: 2, rorTrend: null, heLeak: null },
    lines: ['Second gauge reads the same value.', 'Last wet clean: 2 h ago.', 'Turbo, rate-of-rise trend, and leak check: not checked yet.'] },
  { id: 'E', obs: { gaugeAgree: true, turboOk: false, hoursSinceClean: 96, rorTrend: null, heLeak: null },
    lines: ['Second gauge reads the same value.', 'Turbo speed 62%, foreline 0.4 Torr (high).', 'Last wet clean: 96 h ago.'] },
  { id: 'F', obs: { gaugeAgree: true, turboOk: true, hoursSinceClean: 48, rorTrend: null, heLeak: 'none' },
    lines: ['Second gauge reads the same value.', 'Turbo speed 100% (normal).', 'Last wet clean: 48 h ago.', 'He leak check at lid: no leak. Base pressure is still high.'] },
];

/* ── 관리도 규칙 (교재 예시 차트: CL 100 · UCL 106 · LCL 94 · 규격 90~110 nm/min) ── */
export const SPC_CHART = { cl: 100, ucl: 106, lcl: 94, lsl: 90, usl: 110, unit: 'nm/min' };
export const SPC_RUN_N = 8;   // Rule 2 — 한쪽 8점 연속 (Western Electric 규칙 4)
export const SPC_TREND_N = 6; // Rule 3 — 6점 연속 증가/감소 (Nelson 규칙 3)
/** 점들 → 걸린 규칙 목록(['rule1','rule2','rule3'] 의 부분집합, 순서대로). 중심선과 같은 점은 쏠림을 끊는다 */
export function spcCheck(pts, ch = SPC_CHART) {
  const out = [];
  if (pts.some((v) => v > ch.ucl || v < ch.lcl)) out.push('rule1');
  let run = 0, side = 0;
  for (const v of pts) {
    const s = v > ch.cl ? 1 : v < ch.cl ? -1 : 0;
    run = s !== 0 && s === side ? run + 1 : s !== 0 ? 1 : 0; side = s;
    if (run >= SPC_RUN_N) { out.push('rule2'); break; }
  }
  let up = 1, down = 1;
  for (let i = 1; i < pts.length; i += 1) {
    up = pts[i] > pts[i - 1] ? up + 1 : 1; down = pts[i] < pts[i - 1] ? down + 1 : 1;
    if (up >= SPC_TREND_N || down >= SPC_TREND_N) { out.push('rule3'); break; }
  }
  return out;
}
export function spcInSpec(pts, ch = SPC_CHART) { return pts.every((v) => v >= ch.lsl && v <= ch.usl); }
export const SPC_ANSWERS = [
  { id: 'none', ko: '이상 없음 (in control)' },
  { id: 'rule1', ko: 'Rule 1 — 한계 밖 한 점' },
  { id: 'rule2', ko: 'Rule 2 — 한쪽 8점 연속' },
  { id: 'rule3', ko: 'Rule 3 — 6점 연속 추세' },
];
export const SPC_CASES = [
  { id: 'S1', pts: [99, 101.5, 102, 98, 100.5, 103, 97.5, 101, 99, 100.5] },
  { id: 'S2', pts: [100, 101, 99, 102, 98, 100.5, 101, 99.5, 107, 101] },
  { id: 'S3', pts: [99, 98.5, 101, 102, 101.5, 103, 102, 101, 104, 102] },
  { id: 'S4', pts: [100, 99, 97.5, 98, 99.5, 100.5, 102, 103.5, 104.5, 105] },
  { id: 'S5', pts: [100, 98, 97, 99, 101, 96, 93, 95, 98, 99] },
  { id: 'S6', pts: [101, 99, 100, 102, 98, 101, 111, 100, 99, 101] }, // 한계 밖이면서 규격(110)도 밖 — OOC 이자 OOS
];
/** 사례의 정답 — 걸린 규칙 중 첫째(교재: Rule 1 이 가장 급하다), 없으면 none */
export function spcAnswer(c) { const r = spcCheck(c.pts); return r.length ? r[0] : 'none'; }

/* =========================================================================
 * 13강 벤더 · 서비스 엔지니어와 소통 — 티켓 긴급도 · 되읽기 · 서비스 요청 메일
 *   교재: 긴급도(교재 예시 — 실제는 장비사 SLA) S1 정지 · 대안 없음 / S2 정지 · 대안 있음 또는 웨이퍼 위험 /
 *         S3 가동 · 위험 없음 / S4 질문 · 자료. 되읽기 — 숫자는 한 자리씩(one-five), 0 은 zero, 소수 point,
 *         지수 E minus, 글자는 ICAO 음성 기호 알파벳(교재 철자 Alpha · Juliet).
 * ====================================================================== */

/** 사실 → 긴급도. question 이 가장 먼저(장애가 아니다), 그다음 정지 여부 · 대안 · 웨이퍼 위험 */
export function severityOf(f) {
  if (f.question) return 'S4';
  if (f.down) return f.workaround ? 'S2' : 'S1';
  return f.waferRisk ? 'S2' : 'S3';
}
export const SEVERITY_LEVELS = [
  { id: 'S1', ko: 'S1 — 정지 · 대안 없음' },
  { id: 'S2', ko: 'S2 — 대안 있음 · 웨이퍼 위험' },
  { id: 'S3', ko: 'S3 — 가동 · 위험 없음' },
  { id: 'S4', ko: 'S4 — 질문 · 자료' },
];
export const SEVERITY_CASES = [
  { id: 'v1', text: 'ET-05 is down with BASE PRESSURE HIGH. No other tool is qualified for this recipe.', f: { down: true, workaround: false } },
  { id: 'v2', text: 'ET-05 is down, but ET-06 is qualified for the same recipe and has free capacity.', f: { down: true, workaround: true } },
  { id: 'v3', text: 'ET-05 is running, but particle counts on monitor wafers doubled in the last 12 hours.', f: { down: false, waferRisk: true } },
  { id: 'v4', text: 'ET-05 is running normally. The HMI shows the chamber temperature with the wrong unit (°F instead of °C).', f: { down: false, waferRisk: false } },
  { id: 'v5', text: 'We would like the latest revision of the maintenance manual for the match unit.', f: { question: true } },
  { id: 'v6', text: 'ET-05 is running. A warning "FAN SPEED LOW" appears twice a day and clears by itself. Wafer results are normal.', f: { down: false, waferRisk: false } },
];
export const SEVERITY_WHY = {
  S1: '정지 + 대안 없음 → 생산이 멈춘다.',
  S2: '정지했지만 대안이 있거나, 가동 중이어도 웨이퍼가 위험하다.',
  S3: '가동 중이고 웨이퍼 위험이 없다 — 급하지 않은 장애.',
  S4: '장애가 아니라 질문 · 자료 요청.',
};

/* ── 되읽기 ── */
export const NATO = {
  A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliet',
  K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango',
  U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu',
};
export const DIGIT_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
/** 값 → 되읽기. '15' → 'one-five', '4.2' → 'four point two', '1.0E-5' → 'one point zero E minus five' */
export function readBackValue(v) {
  const s = String(v).toUpperCase();
  const m = s.match(/^(\d+)(?:\.(\d+))?(?:E(-?)(\d+))?$/);
  if (!m) throw new Error(`not a value: ${v}`);
  const digits = (str, sep) => str.split('').map((d) => DIGIT_WORDS[+d]).join(sep);
  let out = digits(m[1], '-');
  if (m[2] != null) out += ` point ${digits(m[2], ' ')}`;
  if (m[4] != null) out += ` E ${m[3] ? 'minus ' : ''}${digits(m[4], ' ')}`;
  return out;
}
/** 부품 · 티켓 번호 → 되읽기. 하이픈으로 나뉜 덩어리마다: 글자는 음성 기호, 숫자는 한 자리씩. 덩어리 사이는 ', ' */
export function readBackCode(code) {
  return String(code).toUpperCase().split('-').map((g) => g.split('').map((ch) => (/\d/.test(ch) ? DIGIT_WORDS[+ch] : NATO[ch])).join(' ')).join(', ');
}
/** 실습 문항 — kind 'value' 는 readBackValue(value) + ' ' + unit, 'code' 는 readBackCode(value). ans 는 손으로 적은 정답 위치 */
export const READBACK_ITEMS = [
  { id: 'r1', said: 'Set the reflected power limit to fifteen watts.', kind: 'value', value: '15', unit: 'watts',
    opts: ['five-zero watts', 'one-five watts', 'one point five watts'], ans: 1, why: 'fifteen(15) — teen 은 끝소리만 다르다. 한 자리씩: one-five.' },
  { id: 'r2', said: 'The part number is K X four zero seven one B.', kind: 'code', value: 'KX-4071-B',
    opts: ['Kilo X-ray, four zero seven one, Bravo', 'Kilo X-ray, four zero seven one, Delta', 'Kilo Echo, four zero seven one, Bravo'], ans: 0, why: 'B 는 Bravo — D(Delta)와 전화로 거의 같게 들린다.' },
  { id: 'r3', said: 'Base pressure should be below one point zero E minus five Torr.', kind: 'value', value: '1.0E-5', unit: 'Torr',
    opts: ['one point zero E five Torr', 'ten E minus five Torr', 'one point zero E minus five Torr'], ans: 2, why: 'E minus 를 빼먹으면 값이 10의 10제곱 배 달라진다.' },
  { id: 'r4', said: 'Torque the lid bolts to thirteen newton-meters.', kind: 'value', value: '13', unit: 'newton-meters',
    opts: ['one-three newton-meters', 'three-zero newton-meters', 'three-one newton-meters'], ans: 0, why: 'thirteen(13) 과 thirty(30) — 한 자리씩 one-three.' },
  { id: 'r5', said: 'Your ticket number is S R two zero six one eight.', kind: 'code', value: 'SR-20618',
    opts: ['Foxtrot Romeo, two zero six one eight', 'Sierra Romeo, two zero six one eight', 'Sierra Romeo, two zero six eight one'], ans: 1, why: 'S 는 Sierra(F 는 Foxtrot). 숫자 순서도 그대로.' },
  { id: 'r6', said: 'Set the match load to forty-five percent.', kind: 'value', value: '45', unit: 'percent',
    opts: ['five-four percent', 'four percent', 'four-five percent'], ans: 2, why: 'forty-five(45) → four-five.' },
  { id: 'r7', said: 'The tool ID is M E one two.', kind: 'code', value: 'ME-12',
    opts: ['Mike Echo, one two', 'November Echo, one two', 'Mike Golf, one two'], ans: 0, why: 'M 은 Mike(N 은 November), E 는 Echo(G 는 Golf).' },
];
export function readBackOf(it) { return it.kind === 'code' ? readBackCode(it.value) : `${readBackValue(it.value)} ${it.unit}`; }

/* ── 서비스 요청 메일 — 칸마다 문장 고르기 ── */
export const EMAIL_SLOTS = [
  { id: 'subject', ko: '제목', opts: ['URGENT!!! HELP', 'SR-20618 | ET-05 | Base pressure high since 23:05 | Tool down (S1)', 'Problem with our tool'], ans: 1,
    why: '장비 · 증상 · 시각 · 영향이 한 줄에. 느낌표는 정보가 아니다.' },
  { id: 'opening', ko: '인사 · 소개', opts: ['Hi Support team, this is Jisu Park from the etch night shift at Fab 2.', 'You must answer quickly.', 'Hello.'], ans: 0,
    why: '누구인지 · 어디인지를 한 줄로.' },
  { id: 'facts', ko: '사실', opts: ['Something happened last night.', 'The pressure is bad and nothing works.', 'Base pressure has been 4.2E-5 Torr since 23:05 KST (limit 1.0E-5). The tool is down.'], ans: 2,
    why: '값 · 한계 · 시각(시간대 포함) · 상태를 숫자로.' },
  { id: 'checked', ko: '확인한 것', opts: ['We ruled out the gauge and the turbo pump. A leak at the lid O-ring is suspected.', 'The O-ring is broken.', 'We checked everything.'], ans: 0,
    why: '12강 — 배제한 것과 의심하는 것을 확신의 정도대로. 확인 안 한 것을 확정처럼 쓰지 않는다.' },
  { id: 'request', ko: '요청', opts: ['Fix it.', 'Could you send an FSE to inspect the lid seal, or advise on the next check?', 'Please do something ASAP.'], ans: 1,
    why: '무엇을 해 달라는지 구체적으로, 정중하게.' },
  { id: 'impact', ko: '영향과 기한', opts: ['Reply immediately.', 'Whenever you have time.', 'No other tool can run this recipe, and two lots are on hold. We would appreciate a reply by 06:00 KST.'], ans: 2,
    why: '기한에는 이유(영향)를 숫자로 붙인다.' },
  { id: 'closing', ko: '첨부 · 맺음', opts: ['Alarm log and pressure trend are attached. Thank you for your support.', 'This is your fault.', 'Thanks.'], ans: 0,
    why: '첨부를 밝히고 감사로 맺는다.' },
];
