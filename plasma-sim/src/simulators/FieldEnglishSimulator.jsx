import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea, ReferenceLine } from 'recharts';
import { CONTENT_CHAPTERS } from '../data/fieldEnglishChapters.data';
import { ART } from '../data/fieldEnglishArt.data';
import { MANGA } from '../data/fieldEnglishManga.data';
import { SCENEBG } from '../data/fieldEnglishSceneBg.data';
import FE_AUDIO from '../data/fieldEnglishAudio.manifest.json'; // { "문장": "해시" } — scripts/narration/field-english-build.js 가 만든다
import { AUDIO_DIR, SLIDE_AUDIO_DIR, speechKey, findSpeechSpans, slideNarration } from '../data/fieldEnglishAudio';
import FE_SLIDE_AUDIO from '../data/fieldEnglishSlideAudio.manifest.json'; // { "읽어 줄 글": { h, sec } } — scripts/narration/field-english-slides-build.js 가 만든다
import {
  procInit, procCheck, procPress, procTick, procLamps, PROC_BUTTONS,
  judgeLine, SPPV_LINES, SPPV_CASES,
  trendInit, trendStep, trendSetSp, trendSetFault, trendStatus, trendReset, fmtNum,
  TREND_CHANNELS, TREND_FAULTS, TREND_DT, TREND_WIN_S,
  ignInit, ignRfOn, ignRfOff, ignTick, REFL_SPEC_W,
  RF_CASES,
  MATCH_CASES, matchInit, matchTick, matchStatus, matchRfOn,
  PARTS_CASES, PARTS_OPTIONS,
  pdInit, pdPress, pdTick, pdCheck, pdPhase, PD_BUTTONS, CROSSOVER_TORR, TURBO_RPM, ATM_TORR,
  STATUS_CASES, STATUS_CHOICES,
  ACK_CASES, ALARM_TYPES, ackInit, ackAct,
  prioInit, prioAct,
  PM_PARTS, PM_ACTIONS, PM_LEAK_Q,
  PMW_ITEMS, pmwInit, pmwAct, pmwReading,
  PMS_CASES, pmsJudge, OOR_FRAC,
  TOOL_PARTS, TOOL_FIND, CHM_TEMP_SP, chmInit, chmCheck, chmAct, chmPressure,
  PCAR, SHIFT_TOOLS, TRIAGE_ROWS, TRIAGE_PROBLEM, PCAR_SENTENCES, PCAR_SUMMARY,
  STACK, stackPress, READ_DRC, READ_DRC_LAYERS, MASK_LAYERS, RULE_TABLE, RULE_CODE_Q,
  REPORT_ACTIONS, DRC_REPORT_ROWS, DRC_CLEAN_Q, ENC_MIN, ENC_VIAS, encJudge,
  crInit, crCheck, crApply, CR_FIXES, LC_LAYERS, CNT_RULE, cntInit, cntCheck,
  LVS_SCH, LVS_LAY, LVS_PAIR, lvsCompare, LVS_WHICH_Q, LVS_TYPES, LVS_ERRORS, lvsRerun,
  GAS_PARTS, GAS_LOG_Q,
} from './fieldEnglishLabs';
import { SLIDE_ART } from '../data/fieldEnglishSlideArt.data';

// 서고 슬라이드 상황 삽화(서고에서 그린 인라인 SVG — 데모에는 없다). chapterId → 슬라이드 제목 → 삽화키.
// 데모 판을 들이며 슬라이드 순서가 바뀌어(장면 슬라이드 추가 등) 번호 대신 제목으로 잇는다.
// 그 슬라이드에 데모 만화(MANGA)가 이미 있으면 만화를 쓰고 이 삽화는 얹지 않는다.
export const CH_ART = {
  w1: {
    "첫 출근 · 화면 앞에 서다": 'firstday',
    "영어는 어디에서 나타나는가 — 세 곳": 'threeplaces',
    "HMI 화면의 구조 읽기": 'hmireal',
    "영어 작업 지시문(imperative) 문장 구조": 'imperative',
    "기초 용어 (1) 장비 · 구성": 'g_w1_8',
    "기초 용어 (2) 상태 · 제어 · HMI 버튼": 'g_w1_10',
    "장비 상태어 — 현장 표준(SEMI E10)": 'g_w1_12',
    "기초 용어 (3) 공정 · 계측 · 안전": 'g_w1_14',
  },
  w2: {
    "새 장비 앞에 선 첫날": 'tool',
    "가스 공급계: Gas Line과 MFC": 'gassupply',
    "핵심 용어 (1): 챔버와 배기계": 'g_w2_8',
    "핵심 용어 (2): 가스 공급과 플라즈마": 'g_w2_10',
    "핵심 용어 (3): 웨이퍼 척과 압력 제어": 'g_w2_12',
  },
  w3: {
    "초록불이 켜지기 전에는 손대지 마라": 'runseq',
    "명령문(imperative) 읽기 — 작업 지시문의 문법": 'workinstr',
    "핵심 운전 명령어 (1)": 'g_w3_8',
    "가스·압력 관련 용어 (2)": 'g_w3_10',
    "제어·상태 용어 (3)": 'g_w3_12',
    "화면·계기 용어 (4)": 'g_w3_14',
  },
  w4: {
    "새벽 3시, 챔버 압력이 흔들린다": 'vacuum',
    "약어": 'logabbr',
    "핵심 용어 (1) — 값과 상태": 'g_w4_6',
    "핵심 용어 (2) — 압력·유량·진공": 'g_w4_8',
    "핵심 용어 (3) — 경보와 조치": 'g_w4_10',
    "핵심 용어 (4) — 로그 화면 표현": 'g_w4_19',
  },
  w5: {
    "플라즈마가 켜지지 않는 새벽": 'plasmafail',
    "Ignite와 Tune: 플라즈마 켜는 순서": 'ignitesop',
    "핵심 용어 1 — 전력": 'g_w5_7',
    "핵심 용어 2 — 정합과 임피던스": 'g_w5_9',
    "핵심 용어 3 — 점화 동작": 'g_w5_11',
    "핵심 용어 4 — 화면 상태": 'g_w5_13',
  },
  w6: {
    "빨간 램프가 켜졌다": 'alarm',
    "Timeout · Failure · Abort — 실패의 종류를 읽기": 'states',
    "핵심 어휘 (1) — 알람의 상태어": 'g_w6_8',
    "핵심 어휘 (2) — 조치 동작어": 'g_w6_10',
    "핵심 어휘 (3) — 원인과 현상어": 'g_w6_12',
    "핵심 어휘 (4) — 실제 알람 배너 표현(청크)": 'g_w6_14',
  },
  w7: {
    "정비의 아침: 오늘 이 장비는 'DOWN'이다": 'pm',
    "핵심 용어 (1) — 체크리스트 동작 동사": 'g_w7_7',
    "핵심 용어 (2) — PM 대상 부품·소모품": 'g_w7_9',
    "핵심 용어 (3) — 측정·규격·판정": 'g_w7_11',
  },
  w9: {
    "층으로 읽는 반도체": 'layer',
    "핵심 용어 (1) 바닥층": 'g_w9_7',
    "핵심 용어 (2) 게이트층": 'g_w9_9',
    "핵심 용어 (3) 배선층": 'g_w9_11',
    "핵심 용어 (4) 도면·판독": 'g_w9_13',
  },
  w10: {
    "현장 이야기: 0.02um이 만든 재작업": 'drctable',
    "핵심 용어 (1) 규칙 유형": 'g_w10_6',
    "핵심 용어 (2) 판단·단위": 'g_w10_8',
    "핵심 용어 (3) 층·표 항목": 'g_w10_10',
    "핵심 용어 (4) 리포트·상태": 'g_w10_12',
  },
  w11: {
    "도면대로 놓였는가?": 'placement',
    "핵심 용어 (1) 층과 패턴": 'g_w11_7',
    "핵심 용어 (2) 치수": 'g_w11_9',
    "핵심 용어 (3) 정렬과 겹침": 'g_w11_11',
    "핵심 용어 (4) 격자와 규칙": 'g_w11_13',
  },
  w12: {
    "빨간 마커가 뜬 화면": 'drcview',
    "핵심 용어 (1) — 검사와 위반": 'g_w12_9',
    "핵심 용어 (2) — 간격과 폭": 'g_w12_11',
    "핵심 용어 (3) — 심각도와 리포트": 'g_w12_13',
  },
  w13: {
    "도면과 실제가 다르면?": 'lvsview',
    "핵심 용어 (1) — 비교의 대상": 'g_w13_6',
    "핵심 용어 (2) — 결과와 판정": 'g_w13_8',
    "핵심 용어 (3) — 연결 오류": 'g_w13_10',
    "핵심 용어 (4) — 진행과 마무리": 'g_w13_12',
  },
  w14: {
    "야간 근무 인계, 영어 리포트 한 장": 'report',
    "보고 동사·상태 어휘 (1)": 'g_w14_6',
    "보고 동사·상태 어휘 (2)": 'g_w14_8',
    "보고서 구조·화면 어휘 (3)": 'g_w14_10',
    "설계·검증(DRC) 관련 어휘 (4)": 'g_w14_12',
  },
};

/**
 * FieldEnglishSimulator — 반도체 현장 실무영어 시뮬레이터 (서고 drop-in)
 * ---------------------------------------------------------------------------
 * 목적: 디자인 툴 사용법이 아니라, 가상 장비/디자인 시뮬레이션을 통해
 *       "현장 영어를 읽고 판단하는" 훈련. 매주 4단계 루프를 반복한다.
 *          가상 매뉴얼 읽기 → 시뮬레이션 조작 → 로그·오류 해석 → 영문 보고
 *
 * 서고(주제 자료실) 규격 v1 prop 계약 (자기완결/props-only):
 *   - hideTabBar   : 상단 탭바 숨김 (자료실에서 true 로 들어옴) — 이 컴포넌트는 항상 자기 UI만 그림
 *   - controlledTab: 상위(SimPane) 탭. 이 컴포넌트는 전부 'simulation'이므로 수신만 하고 무시
 *   - onTabChange  : 있으면 개념 변경 시 호출
 *   - initialTheme : 특정 개념으로 초기 진입 ('equipment'|'alarm'|'drc'|'lvs'|'report')
 *   - hideOtherTabs: 그 개념만 남기고 개념 선택 UI 숨김 (목차 개별항목 분리용)
 *
 * 스타일: 호스트 CSS(Tailwind 유무)에 의존하지 않도록 inline style + 스코프 <style>.
 *         어느 서고/과정에 붙어도 동일하게 렌더된다.
 */

/* =========================================================================
 * 0. 공용 토큰 / 헬퍼
 * ====================================================================== */

const THEMES = [
  { id: 'overview', en: 'Course Map', ko: '책 개요', icon: '🗺️', loop: 'Overview' },
  { id: 'chapters', en: 'Chapters', ko: '교재 (챕터)', icon: '📖', loop: 'Study' },
];
const THEME_IDS = THEMES.map((t) => t.id);

const C = {
  bg: '#0b1220',
  panel: '#0f1a2e',
  panel2: '#132139',
  line: '#1e2d47',
  line2: '#2a3d5f',
  text: '#cbd5e1',
  dim: '#7c8db0',
  cyan: '#22d3ee',
  emerald: '#34d399',
  amber: '#fbbf24',
  red: '#f87171',
  violet: '#a78bfa',
  blue: '#3b82f6',      // Tech Innovation · Electric Blue
  elec: '#2f6bff',      // electric blue (primary accent)
  neon: '#22d3ee',      // neon cyan (highlight)
  mono: "'DejaVu Sans Mono','SF Mono','Roboto Mono',ui-monospace,monospace",
  sans: "'DejaVu Sans','Segoe UI',system-ui,-apple-system,sans-serif",
};

// 현장 영어 용어 사전 (hover 스캐폴딩)
const GLOSSARY = {
  chamber: '챔버 — 공정이 일어나는 진공 반응 공간',
  pump: '펌프 — 챔버 내부를 진공으로 배기하는 장치',
  valve: '밸브 — 가스/진공 배관을 여닫는 부품',
  evacuate: '배기하다 — 챔버 압력을 낮추다 (= pump down)',
  purge: '퍼지 — 불활성 가스로 잔류 가스를 밀어내는 것',
  vent: '벤트 — 챔버를 대기압으로 되돌리는 것',
  interlock: '인터록 — 안전조건 미충족 시 운전을 강제 정지하는 보호기능',
  timeout: '타임아웃 — 정해진 시간 내 목표에 도달하지 못한 상태',
  'set point': '설정값 — 도달하려는 목표값',
  'actual value': '실측값 — 현재 측정된 값',
  'reflected power': '반사파 — 매칭 불량으로 되돌아오는 RF 전력 (높으면 이상)',
  matching: '매칭 — RF 전력을 플라즈마에 효율적으로 전달하도록 임피던스를 맞추는 것',
  ignition: '점화 — 플라즈마가 처음 발생하는 것',
  leakage: '누설 — 밀봉 불량으로 외부 공기가 새어드는 것',
  enclosure: '엔클로저 — 한 레이어가 다른 레이어를 감싸야 하는 최소 겹침',
  spacing: '간격 — 같은 레이어 두 패턴 사이의 최소 거리',
  overlap: '오버랩 — 두 레이어가 겹쳐야 하는 최소량',
  violation: '위반 — 디자인 규칙(DRC)을 만족하지 못한 상태',
  mismatch: '불일치 — 레이아웃과 회로도(schematic)가 다른 상태',
  netlist: '넷리스트 — 소자와 연결 관계를 나열한 회로 정보',
  // 약어(acronym) — 단독으로 쓰일 때 풀어서 설명
  drc: 'DRC (Design Rule Check) — 레이아웃이 디자인 규칙을 지켰는지 자동 검사',
  lvs: 'LVS (Layout Versus Schematic) — 레이아웃이 회로도(설계)와 같은지 비교',
  mfc: 'MFC (Mass Flow Controller) — 가스 유량을 조절·제어하는 장치',
  rf: 'RF (Radio Frequency) — 플라즈마를 만드는 고주파 전력',
  hmi: 'HMI (Human-Machine Interface) — 장비를 조작·감시하는 화면',
  pm: 'PM (Preventive Maintenance) — 고장을 예방하는 정기 점검·정비',
  eds: 'EDS (Electrical Die Sorting) — 웨이퍼 상태에서 칩의 전기적 양·불량 선별',
  sccm: 'sccm (standard cubic centimeter per minute) — 표준 상태 기준 분당 유량 단위',
};

function Term({ children, k }) {
  const key = (k || (typeof children === 'string' ? children : '')).toLowerCase();
  const tip = GLOSSARY[key];
  if (!tip) return <span>{children}</span>;
  return (
    <span className="fes-term" tabIndex={0}>
      {children}
      <span className="fes-tip">{tip}</span>
    </span>
  );
}

const fmtTorr = (v) => {
  if (v >= 1) return v.toFixed(v >= 100 ? 0 : 1) + ' Torr';
  const exp = Math.floor(Math.log10(v));
  const man = v / Math.pow(10, exp);
  return `${man.toFixed(1)}e${exp} Torr`;
};

/* =========================================================================
 * 1. 개념 ①  Equipment HMI — 가상 Plasma Etcher 조작 화면
 * ====================================================================== */

const MENUS = ['Main', 'Recipe', 'Chamber', 'Vacuum', 'Gas', 'RF Power', 'Alarm', 'Log', 'Maintenance', 'Manual'];

// variant 'etch'    : 식각 장비 조작 (기본) — Load→Pump→Gas→Ignite→Process
// variant 'sequence': 3강 운전 절차 — load→pump down→READY→process→purge→vent→unload 전체 사이클
function EquipmentHMI({ variant = 'etch' }) {
  const seq = variant === 'sequence';
  const [step, setStep] = useState('idle'); // idle→loaded→pumping→base→gas→plasma→process→done  (sequence: …→done→purging→purged→venting→vented)
  const [menu, setMenu] = useState('Main');
  const [pressure, setPressure] = useState(760);
  const [flow, setFlow] = useState(0);
  const [rfFwd, setRfFwd] = useState(0);
  const [rfRef, setRfRef] = useState(0);
  const [temp, setTemp] = useState(24);
  const [log, setLog] = useState([{ t: 'INFO', m: 'System initialized. Equipment is in IDLE state.' }]);
  const [fault, setFault] = useState(false); // 이상 주입: 고압 상태에서 점화 시 반사파 급증
  const [alarm, setAlarm] = useState(null);
  const target = useRef(760);
  const logEnd = useRef(null);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };

  const push = useCallback((t, m) => setLog((L) => [...L.slice(-40), { t, m }]), []);

  // 압력을 target 으로 로그공간에서 일정 속도로 이동 (~3초에 배기/벤트 완료)
  useEffect(() => {
    const id = setInterval(() => {
      setPressure((p) => {
        const tg = target.current;
        const lp = Math.log10(p), lt = Math.log10(tg);
        if (Math.abs(lp - lt) < 0.16) return tg;
        return Math.pow(10, lp + (lt > lp ? 0.34 : -0.34));
      });
    }, 120);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { logEnd.current?.scrollIntoView({ block: 'nearest' }); }, [log]);

  // 배기 완료 감지
  useEffect(() => {
    if (step === 'pumping' && pressure <= 5e-6 * 1.05) {
      setStep('base');
      push('INFO', seq ? 'Base pressure reached (5.0e-6 Torr). READY — process can be started.' : 'Base pressure reached (5.0e-6 Torr). Chamber is ready.');
    }
    if (seq && step === 'venting' && pressure >= 760 * 0.99) {
      setStep('vented');
      push('INFO', 'Vent complete. Gauge reads atmosphere. Door unlocked.');
    }
  }, [pressure, step, push, seq]);

  const reset = () => {
    timers.current.forEach(clearTimeout); timers.current = [];
    target.current = 760;
    setStep('idle'); setPressure(760); setFlow(0); setRfFwd(0); setRfRef(0); setTemp(24);
    setAlarm(null); setMenu('Main');
    setLog([{ t: 'INFO', m: 'System reset. Equipment is in IDLE state.' }]);
  };

  const act = (a) => {
    // 3강 운전 절차 — 공정은 한 번에(가스+RF) 돌리고, 끝나면 퍼지 → 벤트 → 언로드
    if (seq && a === 'pump') { target.current = 5e-6; setStep('pumping'); push('CMD', 'Pumping... Evacuating the chamber.'); return; }
    if (seq && a === 'process') {
      setStep('process'); setFlow(50); setRfFwd(600); setRfRef(15); setTemp(65); target.current = 8e-3;
      push('CMD', 'Process started. Recipe ETCH-01 running (gas + RF on). Do not open the door.');
      later(() => {
        setStep('done'); setFlow(0); setRfFwd(0); setRfRef(0);
        push('INFO', 'Process COMPLETE. Purge the chamber with N2 before venting.');
      }, 2600);
      return;
    }
    if (seq && a === 'purge') {
      setStep('purging'); target.current = 0.5; push('CMD', 'N2 purge in progress...');
      later(() => { setStep('purged'); push('INFO', 'N2 purge complete. Residual process gas removed.'); }, 2400);
      return;
    }
    if (seq && a === 'vent') { target.current = 760; setStep('venting'); push('CMD', 'Gate valve closed. Venting... (N2 to atmosphere)'); return; }
    if (seq && a === 'unloadWafer') { setStep('idle'); setTemp(24); push('CMD', 'Wafer unloaded. Equipment is in IDLE state.'); return; }
    if (a === 'load') { setStep('loaded'); push('INFO', 'Wafer loaded on the chuck. Ready to evacuate.'); }
    else if (a === 'pump') { target.current = 5e-6; setStep('pumping'); push('CMD', 'Pump down started. Evacuating chamber...'); }
    else if (a === 'vent') { target.current = 760; setStep('loaded'); setFlow(0); setRfFwd(0); setRfRef(0); push('CMD', 'Venting chamber to atmosphere...'); }
    else if (a === 'gas') { setFlow(50); setStep('gas'); push('INFO', 'Process gas (SF6) flowing. Set point 50 sccm.'); target.current = 8e-3; }
    else if (a === 'rf') {
      if (fault) {
        setRfFwd(600); setRfRef(420);
        setAlarm({ code: 'RF-204', m: 'High reflected power detected. Plasma failed to ignite.' });
        push('ALARM', 'RF-204 High reflected power (420 W). Matching failed. Process stopped by the interlock.');
        setStep('gas');
      } else {
        setRfFwd(600); setRfRef(15); setStep('plasma');
        push('INFO', 'Plasma ignited. Forward 600 W / Reflected 15 W. Matching OK.');
      }
    }
    else if (a === 'process') { setStep('process'); setTemp(65); push('CMD', 'Etch process started. Recipe ETCH-01 running (60 s).'); setTimeout(() => { setStep('done'); push('INFO', 'Process finished. Endpoint detected.'); }, 2600); }
    else if (a === 'stop') { setRfFwd(0); setRfRef(0); setFlow(0); setStep('base'); setAlarm(null); push('CMD', 'Operation stopped by operator.'); }
    else if (a === 'unload') { reset(); }
    else if (a === 'clearAlarm') { setAlarm(null); setRfFwd(0); setRfRef(0); push('CMD', 'Alarm acknowledged and cleared.'); }
  };

  // 각 메뉴 화면(영문)
  const screens = {
    Main: (
      <div>
        <div className="fes-scr-title">SYSTEM OVERVIEW</div>
        <div className="fes-grid2">
          <ReadRow label="Equipment" value="Plasma Etcher PE-3000" />
          <ReadRow label="State" value={step.toUpperCase()} tone={step === 'process' ? 'ok' : 'dim'} />
          <ReadRow label="Recipe" value="ETCH-01" />
          <ReadRow label="Wafer" value={step === 'idle' ? 'None' : 'Slot 1'} />
        </div>
        <p className="fes-hint">현장 팁: <Term k="chamber">Chamber</Term> 상태를 먼저 확인하고, 순서대로 조작하세요.</p>
      </div>
    ),
    Recipe: (
      <div>
        <div className="fes-scr-title">RECIPE — ETCH-01</div>
        <table className="fes-tbl"><tbody>
          <tr><td>Gas</td><td>SF6</td><td>50 sccm</td></tr>
          <tr><td>Pressure</td><td><Term k="set point">Set point</Term></td><td>8.0e-3 Torr</td></tr>
          <tr><td>RF Power</td><td>Forward</td><td>600 W</td></tr>
          <tr><td>Time</td><td>Etch</td><td>60 s</td></tr>
        </tbody></table>
      </div>
    ),
    Chamber: (
      <div>
        <div className="fes-scr-title">CHAMBER STATUS</div>
        <div className="fes-grid2">
          <ReadRow label="Pressure (actual)" value={fmtTorr(pressure)} tone={pressure < 1e-4 ? 'ok' : 'warn'} />
          <ReadRow label="Temperature" value={`${temp} °C`} />
          {seq
            ? <ReadRow label="Door" value={['idle', 'vented'].includes(step) ? 'Unlocked' : 'Locked'} tone={['idle', 'vented'].includes(step) ? 'dim' : 'ok'} />
            : <ReadRow label="Lid" value="Closed" tone="ok" />}
          <ReadRow label="Chuck" value={step === 'idle' ? 'Empty' : 'Wafer present'} />
        </div>
      </div>
    ),
    Vacuum: (
      <div>
        <div className="fes-scr-title">VACUUM SYSTEM</div>
        <div className="fes-grid2">
          <ReadRow label={<Term k="actual value">Actual value</Term>} value={fmtTorr(pressure)} tone={pressure < 1e-4 ? 'ok' : 'warn'} />
          <ReadRow label={<Term k="set point">Set point</Term>} value="5.0e-6 Torr" />
          <ReadRow label="Turbo pump" value={step === 'pumping' || pressure < 1 ? 'Running' : 'Standby'} />
          <ReadRow label="Gate valve" value={pressure < 1 ? 'Open' : 'Closed'} />
        </div>
        {pressure > 1 && step === 'pumping' && <p className="fes-hint">Pumping in progress — pressure is decreasing.</p>}
      </div>
    ),
    Gas: (
      <div>
        <div className="fes-scr-title">GAS DELIVERY (MFC)</div>
        <div className="fes-grid2">
          <ReadRow label="Gas line" value="SF6" />
          <ReadRow label="Flow (actual)" value={`${flow} sccm`} tone={flow > 0 ? 'ok' : 'dim'} />
          <ReadRow label="Flow (set point)" value="50 sccm" />
          <ReadRow label={<Term k="valve">Valve</Term>} value={flow > 0 ? 'Open' : 'Closed'} />
        </div>
      </div>
    ),
    'RF Power': (
      <div>
        <div className="fes-scr-title">RF GENERATOR</div>
        <div className="fes-grid2">
          <ReadRow label="Forward power" value={`${rfFwd} W`} tone={rfFwd > 0 ? 'ok' : 'dim'} />
          <ReadRow label={<Term k="reflected power">Reflected power</Term>} value={`${rfRef} W`} tone={rfRef > 50 ? 'bad' : 'ok'} />
          <ReadRow label={<Term k="matching">Matching</Term>} value={rfRef > 50 ? 'FAILED' : rfFwd ? 'OK' : '—'} tone={rfRef > 50 ? 'bad' : 'dim'} />
          <ReadRow label="Frequency" value="13.56 MHz" />
        </div>
        {rfRef > 50 && <p className="fes-hint" style={{ color: C.red }}>High reflected power → check pressure & matching before ignition.</p>}
      </div>
    ),
    Alarm: (
      <div>
        <div className="fes-scr-title">ALARM</div>
        {alarm ? (
          <div className="fes-alarm">
            <div className="fes-alarm-code">⚠ {alarm.code}</div>
            <div>{alarm.m}</div>
            <div className="fes-alarm-act">Action: Check the vacuum and matching, then acknowledge.</div>
          </div>
        ) : <div className="fes-ok">No active alarms.</div>}
      </div>
    ),
    Log: (
      <div>
        <div className="fes-scr-title">EVENT LOG</div>
        <div className="fes-log">
          {log.map((l, i) => (
            <div key={i} className="fes-logrow">
              <span className={`fes-tag fes-tag-${l.t.toLowerCase()}`}>{l.t}</span>
              <span>{l.m}</span>
            </div>
          ))}
          <div ref={logEnd} />
        </div>
      </div>
    ),
    Maintenance: (
      <div>
        <div className="fes-scr-title">PREVENTIVE MAINTENANCE</div>
        <table className="fes-tbl"><tbody>
          <tr><td>Inspect</td><td>O-ring seal</td><td>Weekly</td></tr>
          <tr><td>Clean</td><td>Chamber wall</td><td>Every 500 wafers</td></tr>
          <tr><td>Replace</td><td>Pump oil</td><td>6 months</td></tr>
          <tr><td>Calibrate</td><td>MFC / gauge</td><td>Yearly</td></tr>
        </tbody></table>
      </div>
    ),
    Manual: seq ? (
      <div>
        <div className="fes-scr-title">OPERATING PROCEDURE — FULL CYCLE</div>
        <ol className="fes-ol">
          <li><b>Load</b> the wafer onto the chuck and close the door.</li>
          <li><b><Term k="evacuate">Pump down</Term></b> the chamber until <b>base pressure</b> is reached.</li>
          <li>Wait for the <b>READY</b> indicator, then <b>start</b> the process.</li>
          <li>When the process is <b>COMPLETE</b>, <b><Term k="purge">purge</Term></b> the chamber with N2.</li>
          <li><b><Term k="vent">Vent</Term></b> to atmosphere. Never vent while pumping.</li>
          <li>When the door is <b>unlocked</b>, <b>unload</b> the wafer.</li>
        </ol>
      </div>
    ) : (
      <div>
        <div className="fes-scr-title">OPERATING PROCEDURE (Quick Manual)</div>
        <ol className="fes-ol">
          <li><b>Load</b> the wafer onto the chuck.</li>
          <li><b><Term k="evacuate">Evacuate</Term></b> the chamber (pump down) to base pressure.</li>
          <li>Start the process <b>gas</b> and stabilize the flow.</li>
          <li><b>Ignite</b> the plasma. Confirm matching (<Term k="reflected power">reflected power</Term> low).</li>
          <li>Run the <b>process</b>, then <b>stop</b> and <b><Term k="vent">vent</Term></b>.</li>
        </ol>
      </div>
    ),
  };

  // 현재 step 에서 가능한 조작
  const btns = seq ? [
    { a: 'load', l: 'Load Wafer', on: step === 'idle' },
    { a: 'pump', l: 'Pump Down', on: step === 'loaded' },
    { a: 'process', l: 'Start Process', on: step === 'base' },
    { a: 'purge', l: 'Purge (N2)', on: step === 'done' },
    { a: 'vent', l: 'Vent', on: step === 'purged' },
    { a: 'unloadWafer', l: 'Unload Wafer', on: step === 'vented' },
    { a: 'unload', l: 'Reset', on: true, ghost: true },
  ] : [
    { a: 'load', l: 'Load Wafer', on: step === 'idle' },
    { a: 'pump', l: 'Pump Down', on: step === 'loaded' },
    { a: 'gas', l: 'Start Gas', on: step === 'base' },
    { a: 'rf', l: 'Ignite Plasma', on: step === 'gas' && flow > 0 },
    { a: 'process', l: 'Start Process', on: step === 'plasma' },
    { a: 'stop', l: 'Stop', on: ['gas', 'plasma', 'process'].includes(step), danger: true },
    { a: 'vent', l: 'Vent', on: ['base', 'done'].includes(step) },
    { a: 'unload', l: 'Reset', on: true, ghost: true },
  ];

  return (
    <div>
      <StepBar step={step} variant={variant} />
      <div className="fes-hmi">
        {/* 좌: 메뉴 */}
        <div className="fes-menu">
          {MENUS.map((m) => (
            <button key={m} onClick={() => setMenu(m)}
              className={`fes-menu-btn ${menu === m ? 'on' : ''} ${m === 'Alarm' && alarm ? 'alarm' : ''}`}>
              {m}{m === 'Alarm' && alarm ? ' ●' : ''}
            </button>
          ))}
        </div>
        {/* 중: 화면 */}
        <div className="fes-screen">{screens[menu]}</div>
        {/* 우: 게이지 */}
        <div className="fes-gauges">
          <Gauge label="PRESSURE" value={fmtTorr(pressure)} pct={Math.max(2, (Math.log10(pressure) + 6) / 8.9 * 100)} color={pressure < 1e-4 ? C.emerald : C.amber} />
          <Gauge label="GAS FLOW" value={`${flow} sccm`} pct={flow / 100 * 100} color={C.cyan} />
          <Gauge label="RF FWD" value={`${rfFwd} W`} pct={rfFwd / 800 * 100} color={C.violet} />
          <Gauge label="RF REFL" value={`${rfRef} W`} pct={rfRef / 500 * 100} color={rfRef > 50 ? C.red : C.dim} />
        </div>
      </div>

      {alarm && (
        <div className="fes-alarm-bar">
          <span>⚠ {alarm.code} — {alarm.m}</span>
          <button className="fes-btn danger" onClick={() => act('clearAlarm')}>Acknowledge</button>
        </div>
      )}

      <div className="fes-controls">
        {!seq && (
          <label className="fes-inject">
            <input type="checkbox" checked={fault} onChange={(e) => setFault(e.target.checked)} />
            Inject fault (ignite at high pressure)
          </label>
        )}
        <div className="fes-btnrow">
          {btns.map((b) => (
            <button key={b.a} disabled={!b.on} onClick={() => act(b.a)}
              className={`fes-btn ${b.danger ? 'danger' : ''} ${b.ghost ? 'ghost' : ''}`}>{b.l}</button>
          ))}
        </div>
      </div>

      {seq ? (
        <TaskCard title="STUDENT TASK — where are we in the sequence?">
          <ol className="fes-task-ol">
            <li>Run one full cycle: load → pump down → READY → process → purge → vent → unload.</li>
            <li>At each step, read the newest line in the <b>Log</b> menu (Pumping..., Base pressure reached, Venting..., Door unlocked).</li>
            <li>Say which step the equipment is in <b>from the English message alone</b>, then check the step bar.</li>
          </ol>
        </TaskCard>
      ) : (
      <TaskCard title="STUDENT TASK — read & decide (English)">
        <ol className="fes-task-ol">
          <li>Read the English messages in the <b>Log</b> and <b>Alarm</b> menus.</li>
          <li>Identify which subsystem is abnormal (vacuum / gas / RF).</li>
          <li>Choose the likely cause, then take the corrective action.</li>
          <li>Move to the <b>Alarm &amp; Log</b> tab to answer the interpretation quiz.</li>
        </ol>
      </TaskCard>
      )}
    </div>
  );
}

const STEPBAR_SEQ = {
  order: ['idle', 'loaded', 'base', 'process', 'done', 'purged', 'vented'],
  label: { idle: 'Idle', loaded: 'Loaded', base: 'READY', process: 'Process', done: 'Complete', purged: 'Purged', vented: 'Vented' },
  // 진행 중인 단계는 직전 단계에 머문다
  alias: { pumping: 'loaded', purging: 'done', venting: 'purged' },
};
function StepBar({ step, variant }) {
  if (variant === 'sequence') {
    const { order, label, alias } = STEPBAR_SEQ;
    const cur = Math.max(0, order.indexOf(alias[step] || step));
    return (
      <div className="fes-stepbar">
        {order.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`fes-step ${i <= cur ? 'on' : ''} ${i === cur ? 'cur' : ''}`}>
              <span className="fes-step-dot">{i + 1}</span>{label[s]}
            </div>
            {i < order.length - 1 && <div className={`fes-step-line ${i < cur ? 'on' : ''}`} />}
          </React.Fragment>
        ))}
      </div>
    );
  }
  const order = ['idle', 'loaded', 'base', 'gas', 'plasma', 'process', 'done'];
  const label = { idle: 'Idle', loaded: 'Loaded', base: 'Vacuum', gas: 'Gas', plasma: 'Plasma', process: 'Process', done: 'Done' };
  const cur = Math.max(0, order.indexOf(step === 'pumping' ? 'loaded' : step));
  return (
    <div className="fes-stepbar">
      {order.map((s, i) => (
        <React.Fragment key={s}>
          <div className={`fes-step ${i <= cur ? 'on' : ''} ${i === cur ? 'cur' : ''}`}>
            <span className="fes-step-dot">{i + 1}</span>{label[s]}
          </div>
          {i < order.length - 1 && <div className={`fes-step-line ${i < cur ? 'on' : ''}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Gauge({ label, value, pct, color }) {
  const p = Math.max(0, Math.min(100, pct));
  return (
    <div className="fes-gauge">
      <div className="fes-gauge-top"><span>{label}</span><span style={{ color }}>{value}</span></div>
      <div className="fes-gauge-bar"><div style={{ width: `${p}%`, background: color }} /></div>
    </div>
  );
}

function ReadRow({ label, value, tone }) {
  const col = { ok: C.emerald, warn: C.amber, bad: C.red, dim: C.dim }[tone] || C.text;
  return (
    <div className="fes-readrow">
      <span className="fes-readrow-l">{label}</span>
      <span className="fes-readrow-v" style={{ color: col }}>{value}</span>
    </div>
  );
}

/* =========================================================================
 * 2. 개념 ②  Alarm & Log — 영문 알람 해석 (원인·조치 선택 채점)
 * ====================================================================== */

const ALARM_CASES = [
  {
    code: 'VAC-101',
    msg: 'Chamber pressure is above the allowable limit. Process operation has been stopped by the interlock.',
    log: ['12:04:11  Pump down started', '12:06:40  Pressure 2.1e-2 Torr  (timeout)', '12:06:41  VAC-101 raised — interlock'],
    q: {
      device: { prompt: 'Which subsystem is abnormal?', opts: ['Vacuum / pumping system', 'RF generator', 'Gas line (MFC)'], ans: 0 },
      cause: { prompt: 'Most likely cause?', opts: ['Reflected power too high', 'A vacuum valve is closed or there is a leak', 'Wrong recipe time'], ans: 1 },
      action: { prompt: 'Corrective action?', opts: ['Increase RF power', 'Check the vacuum valve and pumping system for leaks', 'Change the mask'], ans: 1 },
    },
  },
  {
    code: 'RF-204',
    msg: 'High reflected power detected. Plasma failed to ignite. Matching network could not tune.',
    log: ['09:15:02  Gas flow 50 sccm OK', '09:15:20  RF on: Fwd 600 W / Refl 420 W', '09:15:21  RF-204 raised'],
    q: {
      device: { prompt: 'Which subsystem is abnormal?', opts: ['Vacuum system', 'RF power / matching', 'Wafer handler'], ans: 1 },
      cause: { prompt: 'Most likely cause?', opts: ['Chamber pressure out of range or matching not tuned', 'Pump oil low', 'Door open'], ans: 0 },
      action: { prompt: 'Corrective action?', opts: ['Vent the chamber immediately', 'Check pressure/gas and re-tune the matching network', 'Replace the wafer'], ans: 1 },
    },
  },
  {
    code: 'GAS-330',
    msg: 'Gas flow does not reach the set point. Actual flow is far below the set point (timeout).',
    log: ['14:22:01  Set point 50 sccm', '14:22:31  Actual 6 sccm  (timeout)', '14:22:31  GAS-330 warning'],
    q: {
      device: { prompt: 'Which subsystem is abnormal?', opts: ['Gas delivery (MFC / valve)', 'RF generator', 'Vacuum gauge'], ans: 0 },
      cause: { prompt: 'Most likely cause?', opts: ['Plasma over-ignited', 'Gas cylinder empty or MFC/valve blocked', 'Recipe file missing'], ans: 1 },
      action: { prompt: 'Corrective action?', opts: ['Check the gas supply and calibrate/replace the MFC', 'Raise the RF power', 'Reboot the monitor'], ans: 0 },
    },
  },
];

function AlarmLab() {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState({});
  const [checked, setChecked] = useState(false);
  const cse = ALARM_CASES[idx];
  const keys = ['device', 'cause', 'action'];
  const score = keys.filter((k) => sel[k] === cse.q[k].ans).length;

  const go = (n) => { setIdx(n); setSel({}); setChecked(false); };

  return (
    <div>
      <div className="fes-casebar">
        {ALARM_CASES.map((c, i) => (
          <button key={c.code} onClick={() => go(i)} className={`fes-chip ${i === idx ? 'on' : ''}`}>{c.code}</button>
        ))}
      </div>

      <div className="fes-alarm-panel">
        <div className="fes-alarm-head">🚨 ALARM MESSAGE — {cse.code}</div>
        <div className="fes-alarm-msg">{cse.msg}<SpeakBtn text={cse.msg} title="알람 문장 발음 듣기" /></div>
        <div className="fes-log fes-log-embed">
          {cse.log.map((l, i) => <div key={i} className="fes-logrow"><span className="fes-tag fes-tag-info">LOG</span><span>{l}</span></div>)}
        </div>
      </div>

      <div className="fes-qs">
        {keys.map((k) => {
          const q = cse.q[k];
          return (
            <div key={k} className="fes-q">
              <div className="fes-q-prompt">{q.prompt}</div>
              <div className="fes-q-opts">
                {q.opts.map((o, i) => {
                  const chosen = sel[k] === i;
                  const right = checked && i === q.ans;
                  const wrong = checked && chosen && i !== q.ans;
                  return (
                    <button key={i} disabled={checked}
                      onClick={() => setSel((s) => ({ ...s, [k]: i }))}
                      className={`fes-opt ${chosen ? 'sel' : ''} ${right ? 'right' : ''} ${wrong ? 'wrong' : ''}`}>
                      {o}{right ? '  ✓' : wrong ? '  ✕' : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fes-check-row">
        {!checked ? (
          <button className="fes-btn" disabled={keys.some((k) => sel[k] === undefined)} onClick={() => setChecked(true)}>Check answers</button>
        ) : (
          <>
            <span className={`fes-score ${score === 3 ? 'ok' : score >= 1 ? 'mid' : 'bad'}`}>Score {score}/3</span>
            <button className="fes-btn ghost" onClick={() => { setSel({}); setChecked(false); }}>Retry</button>
            {idx < ALARM_CASES.length - 1 && <button className="fes-btn" onClick={() => go(idx + 1)}>Next case →</button>}
          </>
        )}
      </div>

      <TaskCard title="STUDENT TASK">
        <p style={{ margin: 0 }}>영문 알람과 로그를 읽고 <b>① 이상 장치 ② 예상 원인 ③ 조치</b>를 고르세요. 3케이스 모두 3/3을 목표로.</p>
      </TaskCard>
    </div>
  );
}

/* =========================================================================
 * 3. 개념 ③  DRC — Layer 배치 + Width/Spacing 조절 → 영문 violation 로그
 * ====================================================================== */

const DRC_RULES = { minWidth: 0.30, minSpacing: 0.30 }; // μm

function DrcLab() {
  const [width, setWidth] = useState(0.20);   // 각 metal bar 폭 (μm)
  const [spacing, setSpacing] = useState(0.18); // 두 bar 사이 간격 (μm)
  const [ran, setRan] = useState(false);

  const violations = [];
  if (ran) {
    if (width < DRC_RULES.minWidth) violations.push({ rule: 'METAL1.WIDTH', req: DRC_RULES.minWidth, meas: width, msg: 'Minimum width violation' });
    if (spacing < DRC_RULES.minSpacing) violations.push({ rule: 'METAL1.SPACING', req: DRC_RULES.minSpacing, meas: spacing, msg: 'Insufficient spacing' });
  }
  const clean = ran && violations.length === 0;

  // SVG 좌표 (1μm = 260px 스케일)
  const S = 260, x0 = 60;
  const wpx = width * S, spx = spacing * S;
  const bar2x = x0 + wpx + spx;

  return (
    <div>
      <div className="fes-cad">
        <svg viewBox="0 0 640 240" className="fes-cad-svg">
          <defs>
            <pattern id="fesgrid" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" fill="none" stroke="#16233b" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="640" height="240" fill="#0a0f1a" />
          <rect width="640" height="240" fill="url(#fesgrid)" />
          {/* Metal1 bars */}
          <rect x={x0} y={50} width={wpx} height={140} fill="#3b82f6" opacity="0.85" stroke="#93c5fd" />
          <rect x={bar2x} y={50} width={wpx} height={140} fill="#3b82f6" opacity="0.85" stroke="#93c5fd" />
          {/* spacing dimension */}
          <line x1={x0 + wpx} y1={120} x2={bar2x} y2={120} stroke={spacing < DRC_RULES.minSpacing && ran ? C.red : C.emerald} strokeWidth="2" markerEnd="url(#fa)" markerStart="url(#fa)" />
          <text x={(x0 + wpx + bar2x) / 2} y={112} fill={C.text} fontSize="13" textAnchor="middle" fontFamily={C.mono}>{spacing.toFixed(2)}µm</text>
          {/* width dimension */}
          <text x={x0 + wpx / 2} y={210} fill={C.dim} fontSize="12" textAnchor="middle" fontFamily={C.mono}>W {width.toFixed(2)}µm</text>
          <defs><marker id="fa" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 4L8 4M4 1L1 4L4 7" stroke={C.emerald} fill="none" /></marker></defs>
          {ran && violations.map((v, i) => (
            <rect key={i} x={v.rule.includes('SPACING') ? x0 + wpx : x0} y={44} width={v.rule.includes('SPACING') ? spx + 12 : wpx + 12} height={152} fill="none" stroke={C.red} strokeWidth="2.5" strokeDasharray="6 4" />
          ))}
          <text x={16} y={28} fill={C.dim} fontSize="12" fontFamily={C.mono}>LAYER: METAL1</text>
        </svg>
      </div>

      <div className="fes-sliders">
        <SliderRow label={<>Width <Term k="spacing">(bar)</Term></>} value={width} set={(v) => { setWidth(v); setRan(false); }} min={0.10} max={0.50} req={DRC_RULES.minWidth} />
        <SliderRow label={<><Term k="spacing">Spacing</Term> (gap)</>} value={spacing} set={(v) => { setSpacing(v); setRan(false); }} min={0.10} max={0.50} req={DRC_RULES.minSpacing} />
        <button className="fes-btn" onClick={() => setRan(true)}>▶ Run DRC</button>
      </div>

      <div className="fes-drc-out">
        <div className="fes-scr-title">DRC REPORT</div>
        {!ran && <div className="fes-dim">Adjust the layout, then run DRC.</div>}
        {clean && <div className="fes-ok">✓ DRC clean. 0 violations. Layout meets all design rules.</div>}
        {ran && violations.map((v, i) => (
          <div key={i} className="fes-viol">
            <div className="fes-viol-head">✕ {v.rule} <Term k="violation">violation</Term></div>
            <div className="fes-viol-body">
              {v.msg}. Required: {v.req.toFixed(2)} µm — Measured: {v.meas.toFixed(2)} µm.
            </div>
          </div>
        ))}
      </div>

      <TaskCard title="STUDENT TASK — interpret & fix">
        <p style={{ margin: '0 0 6px' }}>DRC 로그를 영어로 읽고, 무엇이 위반됐는지 한국어로 한 문장 요약한 뒤 규칙을 만족하도록 슬라이더를 고치세요.</p>
        <p style={{ margin: 0, color: C.dim, fontFamily: C.mono, fontSize: 12 }}>
          예: "Metal 1 사이의 실제 간격이 {spacing.toFixed(2)}µm로, 최소 요구 간격 {DRC_RULES.minSpacing.toFixed(2)}µm보다 작다 → 간격을 넓혀야 한다."
        </p>
      </TaskCard>
    </div>
  );
}

function SliderRow({ label, value, set, min, max, req }) {
  const bad = value < req;
  return (
    <div className="fes-slider">
      <div className="fes-slider-top">
        <span>{label}</span>
        <span style={{ color: bad ? C.amber : C.emerald, fontFamily: C.mono }}>{value.toFixed(2)} µm</span>
      </div>
      <input type="range" min={min} max={max} step={0.01} value={value} onChange={(e) => set(parseFloat(e.target.value))} className="fes-range" />
      <div className="fes-slider-req">min {req.toFixed(2)} µm</div>
    </div>
  );
}

/* =========================================================================
 * 4. 개념 ④  LVS — Schematic vs Layout 비교 (영문 mismatch 해석)
 * ====================================================================== */

const LVS_CASES = [
  {
    name: 'CMOS Inverter',
    report: ['LVS: comparing layout vs schematic...', 'Device count  schematic=2  layout=1', 'ERROR: Missing device — NMOS (MN) not found in layout'],
    prompt: 'What does the LVS report say?',
    opts: ['Layout has an extra device', 'The NMOS transistor is missing in the layout', 'The power net is shorted'],
    ans: 1,
    fix: 'Place the missing NMOS device in the layout, then re-run LVS.',
  },
  {
    name: 'CMOS Inverter',
    report: ['LVS: comparing nets...', 'Net OUT: schematic connects MP.drain & MN.drain', 'ERROR: Incorrect connection — MN.drain tied to VSS instead of OUT'],
    prompt: 'What does the LVS report say?',
    opts: ['A transistor is duplicated', 'NMOS drain is wired to the wrong net (VSS, not OUT)', 'Layer color is wrong'],
    ans: 1,
    fix: 'Reconnect the NMOS drain to the OUT net, then re-run LVS.',
  },
];

function LvsLab() {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [checked, setChecked] = useState(false);
  const cse = LVS_CASES[idx];
  const missing = idx === 0;
  const miswire = idx === 1;

  const go = (n) => { setIdx(n); setSel(null); setChecked(false); };

  return (
    <div>
      <div className="fes-casebar">
        {LVS_CASES.map((c, i) => <button key={i} onClick={() => go(i)} className={`fes-chip ${i === idx ? 'on' : ''}`}>Case {i + 1}</button>)}
      </div>

      <div className="fes-lvs">
        {/* Schematic */}
        <div className="fes-lvs-col">
          <div className="fes-lvs-title">SCHEMATIC (golden)</div>
          <svg viewBox="0 0 220 220" className="fes-lvs-svg">
            <InverterSVG missing={false} miswire={false} />
          </svg>
        </div>
        <div className="fes-lvs-vs">≠</div>
        {/* Layout */}
        <div className="fes-lvs-col">
          <div className="fes-lvs-title">LAYOUT (extracted)</div>
          <svg viewBox="0 0 220 220" className="fes-lvs-svg">
            <InverterSVG missing={missing} miswire={miswire} />
          </svg>
        </div>
      </div>

      <div className="fes-drc-out">
        <div className="fes-scr-title">LVS REPORT</div>
        {cse.report.map((r, i) => (
          <div key={i} className={`fes-logrow ${r.startsWith('ERROR') ? 'err' : ''}`}>
            <span className={`fes-tag ${r.startsWith('ERROR') ? 'fes-tag-alarm' : 'fes-tag-info'}`}>{r.startsWith('ERROR') ? 'ERR' : 'LVS'}</span>
            <span>{r}</span>
          </div>
        ))}
      </div>

      <div className="fes-q" style={{ marginTop: 12 }}>
        <div className="fes-q-prompt">{cse.prompt}</div>
        <div className="fes-q-opts">
          {cse.opts.map((o, i) => {
            const chosen = sel === i, right = checked && i === cse.ans, wrong = checked && chosen && i !== cse.ans;
            return <button key={i} disabled={checked} onClick={() => setSel(i)} className={`fes-opt ${chosen ? 'sel' : ''} ${right ? 'right' : ''} ${wrong ? 'wrong' : ''}`}>{o}{right ? '  ✓' : wrong ? '  ✕' : ''}</button>;
          })}
        </div>
      </div>

      <div className="fes-check-row">
        {!checked ? <button className="fes-btn" disabled={sel === null} onClick={() => setChecked(true)}>Check</button>
          : <>
            <span className={`fes-score ${sel === cse.ans ? 'ok' : 'bad'}`}>{sel === cse.ans ? 'Correct' : 'Try again'}</span>
            {sel === cse.ans && <span className="fes-fix">Fix: {cse.fix}</span>}
            <button className="fes-btn ghost" onClick={() => { setSel(null); setChecked(false); }}>Reset</button>
          </>}
      </div>

      <TaskCard title="STUDENT TASK">
        <p style={{ margin: 0 }}><Term k="netlist">Netlist</Term> 비교 결과의 영문 <Term k="mismatch">mismatch</Term> 메시지를 읽고, 무엇이 다른지(missing device / incorrect connection) 판단하세요.</p>
      </TaskCard>
    </div>
  );
}

function InverterSVG({ missing, miswire }) {
  return (
    <g fontFamily={C.mono} fontSize="11" fill={C.text}>
      <line x1="110" y1="12" x2="110" y2="40" stroke={C.dim} />
      <text x="114" y="20" fill={C.dim}>VDD</text>
      {/* PMOS */}
      <rect x="86" y="40" width="48" height="34" fill="none" stroke={C.violet} strokeWidth="2" rx="3" />
      <text x="96" y="61" fill={C.violet}>MP</text>
      {/* NMOS */}
      {!missing ? (
        <>
          <rect x="86" y="120" width="48" height="34" fill="none" stroke={C.emerald} strokeWidth="2" rx="3" />
          <text x="96" y="141" fill={C.emerald}>MN</text>
          <line x1="110" y1="74" x2="110" y2="120" stroke={miswire ? C.red : C.dim} strokeDasharray={miswire ? '4 3' : ''} />
          {/* OUT tap */}
          <line x1="110" y1="97" x2="170" y2="97" stroke={miswire ? C.red : C.cyan} />
          <text x="174" y="101" fill={miswire ? C.red : C.cyan}>OUT</text>
          {/* NMOS source to VSS (miswire: drain->VSS) */}
          <line x1="110" y1="154" x2="110" y2="185" stroke={C.dim} />
          {miswire && <line x1="110" y1="120" x2="150" y2="120" stroke={C.red} strokeWidth="2" />}
          {miswire && <text x="150" y="118" fill={C.red}>→VSS?</text>}
        </>
      ) : (
        <>
          <rect x="86" y="120" width="48" height="34" fill="none" stroke={C.red} strokeWidth="2" strokeDasharray="5 4" rx="3" />
          <text x="92" y="141" fill={C.red} fontSize="10">MISSING</text>
          <line x1="110" y1="74" x2="110" y2="97" stroke={C.dim} />
          <line x1="110" y1="97" x2="170" y2="97" stroke={C.cyan} />
          <text x="174" y="101" fill={C.cyan}>OUT</text>
        </>
      )}
      <line x1="110" y1="185" x2="110" y2="205" stroke={C.dim} />
      <text x="114" y="200" fill={C.dim}>VSS</text>
    </g>
  );
}

/* =========================================================================
 * 5. 개념 ⑤  Field Report — 영문 보고서 작성 (루브릭)
 * ====================================================================== */

const REPORT_SCENARIO = {
  title: 'Scenario — Etch result abnormal',
  brief: 'During ETCH-01, pressure and RF power drifted out of range. The etched pattern width came out too narrow, and DRC then reported a METAL1.WIDTH violation. Write a short field report in English.',
  fields: [
    { k: 'Problem', hint: 'What went wrong? (one sentence)', model: 'The etched line width was smaller than the target, causing a DRC width violation.' },
    { k: 'Observed log', hint: 'Copy the key English log/alarm', model: 'RF reflected power high; chamber pressure above set point; METAL1.WIDTH violation (req 0.30 / meas 0.22 µm).' },
    { k: 'Possible cause', hint: 'Why did it happen?', model: 'Unstable pressure and poor RF matching changed the etch rate, so the line was over-etched.' },
    { k: 'Corrective action', hint: 'What did you do?', model: 'Re-stabilized the pressure, re-tuned the matching network, and re-ran the recipe with the correct width.' },
    { k: 'Result', hint: 'Final outcome', model: 'Line width returned to target; DRC came back clean (0 violations).' },
  ],
};

function ReportLab() {
  const [vals, setVals] = useState({});
  const [reveal, setReveal] = useState(false);
  const filled = REPORT_SCENARIO.fields.filter((f) => (vals[f.k] || '').trim().length >= 6).length;

  return (
    <div>
      <div className="fes-scn">
        <div className="fes-scr-title">{REPORT_SCENARIO.title}</div>
        <p style={{ margin: '6px 0 0', lineHeight: 1.6 }}>{REPORT_SCENARIO.brief}</p>
      </div>

      <div className="fes-report">
        {REPORT_SCENARIO.fields.map((f) => (
          <div key={f.k} className="fes-report-field">
            <label className="fes-report-label">{f.k}:</label>
            <textarea className="fes-ta" rows={2} placeholder={f.hint}
              value={vals[f.k] || ''} onChange={(e) => setVals((v) => ({ ...v, [f.k]: e.target.value }))} />
            {reveal && <div className="fes-model"><b>Model:</b> {f.model}</div>}
          </div>
        ))}
      </div>

      <div className="fes-check-row">
        <div className="fes-rubric">
          <span>Rubric</span>
          <div className="fes-rubric-bar"><div style={{ width: `${filled / 5 * 100}%` }} /></div>
          <span className="fes-mono">{filled}/5 sections</span>
        </div>
        <button className="fes-btn ghost" onClick={() => setReveal((r) => !r)}>{reveal ? 'Hide' : 'Show'} model answer</button>
      </div>

      <TaskCard title="STUDENT TASK — write in English">
        <p style={{ margin: 0 }}>5개 항목(Problem / Observed log / Possible cause / Corrective action / Result)을 <b>영어로</b> 작성한 뒤, 모범답안과 비교해 스스로 점검하세요.</p>
      </TaskCard>
    </div>
  );
}

/* =========================================================================
 * 공용 TaskCard
 * ====================================================================== */
function TaskCard({ title, children }) {
  return (
    <div className="fes-taskcard">
      <div className="fes-taskcard-h">{title}</div>
      <div className="fes-taskcard-b">{children}</div>
    </div>
  );
}

/* =========================================================================
 * 주차 수업 (Weekly Lessons) — 주차별 전용 인터랙티브 수업
 * ====================================================================== */

const PROGRESS_KEY = 'fes-fieldEnglish-progress';

// 재사용 객관식 퀴즈 블록
function QuizBlock({ intro, questions }) {
  const [sel, setSel] = useState({});
  const [checked, setChecked] = useState(false);
  const score = questions.filter((q, i) => sel[i] === q.ans).length;
  return (
    <div>
      {intro && <p className="fes-wk-quiz-intro">{plainSpeech(intro)}</p>}
      <div className="fes-qs">
        {questions.map((q, i) => (
          <div key={i} className="fes-q">
            <div className="fes-q-prompt"><span className="fes-wk-qn">Q{i + 1}</span> {plainSpeech(q.prompt)}</div>
            <div className="fes-q-opts">
              {q.opts.map((o, j) => {
                const chosen = sel[i] === j, right = checked && j === q.ans, wrong = checked && chosen && j !== q.ans;
                return (
                  <button key={j} disabled={checked} onClick={() => setSel((s) => ({ ...s, [i]: j }))}
                    className={`fes-opt ${chosen ? 'sel' : ''} ${right ? 'right' : ''} ${wrong ? 'wrong' : ''}`}>
                    {o}{right ? '  ✓' : wrong ? '  ✕' : ''}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="fes-check-row">
        {!checked
          ? <button className="fes-btn" disabled={Object.keys(sel).length < questions.length} onClick={() => setChecked(true)}>Check answers</button>
          : <>
            <span className={`fes-score ${score === questions.length ? 'ok' : score >= 1 ? 'mid' : 'bad'}`}>Score {score}/{questions.length}</span>
            <button className="fes-btn ghost" onClick={() => { setSel({}); setChecked(false); }}>Retry</button>
          </>}
      </div>
    </div>
  );
}

// 재사용 쓰기 블록 (해석/영작 — 모범답안 self-check)
function WriteBlock({ prompt, hint, model }) {
  const [v, setV] = useState('');
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="fes-wr-prompt">{prompt}</div>
      <textarea className="fes-ta" rows={3} placeholder={hint || '여기에 작성하세요...'} value={v} onChange={(e) => setV(e.target.value)} />
      <div className="fes-check-row">
        <span className="fes-ld-count">{v.trim().length}자 작성</span>
        <button className="fes-btn ghost" onClick={() => setShow((s) => !s)}>{show ? '모범답안 숨기기' : '모범답안 보기'}</button>
      </div>
      {show && <div className="fes-model"><b>Model:</b> {model}</div>}
    </div>
  );
}

/* ---- 콘텐츠 데이터 (범용: Semifabai 등에서 이 배열만 갈아끼우면 재사용) ---- */
const W1_ROLES = [
  { icon: '🛠️', role: 'Equipment Engineer', duty: 'Operates and maintains process equipment; reads English alarms and manuals.', ko: '장비 엔지니어 — 장비 운전·정비, 영문 알람·매뉴얼 해석' },
  { icon: '🧪', role: 'Process Engineer', duty: 'Sets recipes and analyzes process logs and English data sheets.', ko: '공정 엔지니어 — 레시피 설정, 영문 로그·데이터 분석' },
  { icon: '📐', role: 'Design Engineer', duty: 'Draws layouts and fixes DRC / LVS errors written in English.', ko: '설계 엔지니어 — 레이아웃 작성, 영문 DRC/LVS 오류 수정' },
];
const W1_GLOSSARY = [
  { en: 'Wafer', ko: '웨이퍼', d: '반도체를 만드는 얇은 원판.', ex: 'Load the wafer onto the chuck.' },
  { en: 'Chamber', ko: '챔버', d: '공정이 일어나는 진공 공간.', ex: 'The chamber is under vacuum.' },
  { en: 'Pressure', ko: '압력', d: '챔버 안 기체의 압력.', ex: 'Chamber pressure is too high.' },
  { en: 'Recipe', ko: '레시피', d: '가스·압력·시간 등 공정 조건.', ex: 'Load recipe ETCH-01.' },
  { en: 'Process', ko: '공정', d: '웨이퍼를 가공하는 단계.', ex: 'The process has stopped.' },
  { en: 'Etch', ko: '식각', d: '표면을 깎아내는 공정.', ex: 'The etch rate is stable.' },
];
const W1_TERMS = [
  { prompt: '“Wafer” 의 뜻은?', opts: ['웨이퍼 (반도체 기판)', '진공', '식각'], ans: 0 },
  { prompt: '“Chamber” 의 뜻은?', opts: ['레시피', '챔버 (공정이 일어나는 공간)', '밸브'], ans: 1 },
  { prompt: '“Pressure” 의 뜻은?', opts: ['압력', '증착', '층(layer)'], ans: 0 },
  { prompt: '“Recipe” 의 뜻은?', opts: ['식각', '공정 조건표 (레시피)', '펌프'], ans: 1 },
  { prompt: '“Etch” 의 뜻은?', opts: ['쌓다 (증착)', '깎아내다 (식각)', '읽다'], ans: 1 },
  { prompt: '“Process” 의 뜻은?', opts: ['공정', '진공', '알람'], ans: 0 },
];
// 문장 해석 (난이도 ↑) — 실제 현장 문장 이해
const W1_SENT = [
  { prompt: '“Chamber pressure is above the allowable limit.”', opts: ['압력이 허용치보다 높다', '압력이 정상이다', '가스가 부족하다'], ans: 0 },
  { prompt: '“The process has been stopped by the interlock.”', opts: ['공정이 정상 완료됐다', '인터록 때문에 공정이 멈췄다', '레시피를 바꿨다'], ans: 1 },
  { prompt: '“Pump down to base pressure before starting the process.”', opts: ['공정 시작 전 기준 압력까지 배기하라', '공정 후에 벤트하라', '가스를 먼저 넣어라'], ans: 0 },
];
// 현장 둘러보기 — 이 책에서 배울 5개 영역 맛보기 (첫날 오리엔테이션용)
const W1_TOUR = [
  { ic: '🖥️', area: 'Equipment · 장비', en: '“Load the wafer and pump down.”', ko: '영어 지시로 장비를 운전' },
  { ic: '🚨', area: 'Alarm · 알람', en: '“Stopped by the interlock.”', ko: '영문 알람을 해석' },
  { ic: '📐', area: 'DRC · 디자인 규칙 검사', en: '“METAL1.SPACING violation.”', ko: 'DRC = Design Rule Check · 디자인 오류 읽기' },
  { ic: '🔗', area: 'LVS · 레이아웃 검증', en: '“Missing device in the layout.”', ko: 'LVS = Layout Versus Schematic · 레이아웃 vs 회로도' },
  { ic: '📝', area: 'Report · 보고', en: '“Problem / Cause / Action…”', ko: '영문 현장 보고서' },
];
// 현장 영어가 나오는 3곳 — 매뉴얼 · 지시문 · HMI 화면
const W1_SOURCES = [
  { ic: '📄', k: 'Manual · 매뉴얼', en: 'The turbo pump evacuates the chamber to base pressure.', ko: '장비 설명서의 설명 문장' },
  { ic: '📋', k: 'Instruction · 작업 지시문', en: 'Load the wafer, pump down, then start the gas.', ko: '작업 절차·지시 문장' },
  { ic: '🖥️', k: 'HMI screen · 장비 화면(GUI)', en: 'Chamber pressure is above the allowable limit.', ko: '장비 화면에 뜨는 영어 메시지' },
];
const W1_SRC_Q = [
  { prompt: '“evacuates the chamber” 의 뜻은?', opts: ['챔버를 배기한다', '챔버를 채운다', '챔버를 연다'], ans: 0 },
  { prompt: '지시문 “pump down, then start the gas” 순서는?', opts: ['배기 → 가스', '가스 → 배기', '벤트 → 배기'], ans: 0 },
  { prompt: 'HMI 메시지 “above the allowable limit” 은?', opts: ['허용치보다 높다', '허용치 안이다', '측정 불가'], ans: 0 },
];

const W2_PARTS = [
  { id: 'chamber', en: 'Chamber', ko: '챔버', desc: 'The sealed vacuum space where the process (etching) takes place.', role: '공정이 일어나는 밀폐 진공 공간', x: 130, y: 60, w: 200, h: 150 },
  { id: 'chuck', en: 'Wafer chuck', ko: '척 (웨이퍼 받침)', desc: 'Holds the wafer flat and often controls its temperature.', role: '웨이퍼를 고정하고 온도를 관리', x: 190, y: 170, w: 80, h: 18 },
  { id: 'gas', en: 'Gas line (MFC)', ko: '가스 라인 / 질량유량제어기', desc: 'Delivers the process gas; the MFC sets the exact flow (sccm).', role: '공정 가스를 공급, MFC가 유량을 정밀 제어', x: 198, y: 12, w: 64, h: 26 },
  { id: 'rf', en: 'RF generator', ko: 'RF 전원', desc: 'Supplies RF (Radio Frequency) power to ignite and sustain the plasma.', role: '플라즈마를 만들고 유지하는 고주파 전력', x: 16, y: 150, w: 88, h: 34 },
  { id: 'valve', en: 'Gate valve', ko: '게이트 밸브', desc: 'Opens or closes the path between the chamber and the pump.', role: '챔버와 펌프 사이 통로를 여닫음', x: 204, y: 214, w: 52, h: 16 },
  { id: 'pump', en: 'Turbo pump', ko: '터보 펌프', desc: 'Evacuates the chamber down to base pressure (high vacuum).', role: '챔버를 기준 압력(고진공)까지 배기', x: 190, y: 234, w: 80, h: 26 },
];
const W2_QUIZ = [
  { prompt: '“The vacuum space where the process happens.”', opts: ['Chamber', 'Pump', 'Recipe'], ans: 0 },
  { prompt: '“Delivers and controls the process gas flow.”', opts: ['RF generator', 'Gas line (MFC)', 'Wafer chuck'], ans: 1 },
  { prompt: '“Supplies RF power to generate plasma.”', opts: ['RF generator', 'Gate valve', 'Turbo pump'], ans: 0 },
  { prompt: '“Evacuates the chamber down to vacuum.”', opts: ['Wafer chuck', 'Turbo pump', 'Gas line'], ans: 1 },
  { prompt: '“Holds the wafer during the process.”', opts: ['Wafer chuck', 'Gate valve', 'Chamber'], ans: 0 },
];

const PART_SPEC = [
  { id: 'gas', n: 1, at: [211, 96], en: 'Gas inlet (showerhead)', ko: '가스 주입구·샤워헤드', desc: 'Delivers process gas uniformly through the showerhead. The MFC sets the exact flow.' },
  { id: 'chamber', n: 2, at: [118, 82], en: 'Chamber', ko: '챔버', desc: 'The sealed vacuum space where etching takes place.' },
  { id: 'plasma', n: 3, at: [211, 152], en: 'Plasma', ko: '플라즈마', desc: 'Ionized gas that etches the wafer surface, driven by RF power.' },
  { id: 'chuck', n: 4, at: [211, 236], en: 'Wafer chuck (ESC)', ko: '정전 척·웨이퍼', desc: 'Holds the wafer flat and controls its temperature during the process.' },
  { id: 'rf', n: 5, at: [54, 200], en: 'RF power / match', ko: 'RF 전원·매칭', desc: 'Supplies RF power (through the matching network) to the chuck electrode to ignite and sustain the plasma.' },
  { id: 'pump', n: 6, at: [258, 290], en: 'Turbo pump / gate valve', ko: '터보 펌프·게이트 밸브', desc: 'Evacuates the chamber to base pressure; the gate valve isolates the pump.' },
];

function PartDiagram() {
  const [sel, setSel] = useState('chamber');
  const cur = PART_SPEC.find((p) => p.id === sel);
  const hl = (id) => (sel === id ? C.neon : '#42557a');
  const hw = (id) => (sel === id ? 2.4 : 1.3);
  return (
    <div className="fes-wk-diag">
      <div className="fes-pd-wrap">
        <svg viewBox="0 0 480 340" className="fes-illus-svg">
          <defs>
            <linearGradient id="pdSteel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e2a44" /><stop offset="1" stopColor="#0d1524" /></linearGradient>
            <linearGradient id="pdChuck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#33456a" /><stop offset="1" stopColor="#161f36" /></linearGradient>
            <radialGradient id="pdPlasma" cx="50%" cy="50%" r="55%"><stop offset="0" stopColor="#d4c9ff" stopOpacity="0.95" /><stop offset="42%" stopColor="#a78bfa" stopOpacity="0.4" /><stop offset="100%" stopColor="#7c6bd6" stopOpacity="0" /></radialGradient>
            <linearGradient id="pdWafer" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2f6bff" /><stop offset="1" stopColor="#22d3ee" /></linearGradient>
            <marker id="pdArrG" markerWidth="11" markerHeight="11" refX="5.5" refY="9" orient="auto"><path d="M1 1L5.5 9L10 1" fill="none" stroke={C.emerald} strokeWidth="1.6" /></marker>
            <marker id="pdArrC" markerWidth="11" markerHeight="11" refX="5.5" refY="9" orient="auto"><path d="M1 1L5.5 9L10 1" fill="none" stroke={C.neon} strokeWidth="1.6" /></marker>
          </defs>
          <rect width="480" height="340" rx="10" fill="#080c15" />
          <text x="20" y="26" fill={C.dim} fontSize="11" fontFamily={C.mono} letterSpacing="1.5">PLASMA ETCH CHAMBER — CROSS SECTION</text>

          {/* gas inlet: valve + pipe */}
          <g onClick={() => setSel('gas')} style={{ cursor: 'pointer' }}>
            <circle cx="211" cy="34" r="7" fill="#101a30" stroke={hl('gas')} strokeWidth={hw('gas')} />
            <line x1="207" y1="34" x2="215" y2="34" stroke={hl('gas')} strokeWidth={hw('gas')} /><line x1="211" y1="30" x2="211" y2="38" stroke={hl('gas')} strokeWidth={hw('gas')} />
            <line x1="211" y1="41" x2="211" y2="80" stroke={hl('gas')} strokeWidth={hw('gas') + 0.8} markerEnd="url(#pdArrC)" />
          </g>

          {/* chamber body (double wall) */}
          <rect x="96" y="64" width="230" height="214" rx="14" fill="url(#pdSteel)" stroke={hl('chamber')} strokeWidth={hw('chamber') + 0.7} onClick={() => setSel('chamber')} style={{ cursor: 'pointer' }} />
          <rect x="106" y="74" width="210" height="194" rx="8" fill="none" stroke="#26344f" strokeWidth="1" />

          {/* gas plenum + showerhead plate */}
          <g onClick={() => setSel('gas')} style={{ cursor: 'pointer' }}>
            <rect x="156" y="80" width="110" height="10" rx="2" fill="#22314e" stroke={hl('gas')} strokeWidth={hw('gas')} />
            <rect x="156" y="90" width="110" height="7" fill="#16233b" stroke={hl('gas')} strokeWidth={hw('gas') * 0.8} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <circle key={k} cx={168 + k * 14} cy={97.5} r="1.9" fill={C.neon} opacity="0.8" />)}
          </g>

          {/* plasma region + sheath edges */}
          <g onClick={() => setSel('plasma')} style={{ cursor: 'pointer' }}>
            <ellipse cx="211" cy="152" rx="74" ry="48" fill="url(#pdPlasma)" />
            <line x1="150" y1="106" x2="272" y2="106" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
            <line x1="152" y1="208" x2="270" y2="208" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
            {[[196, 138], [222, 132], [238, 150], [204, 162], [230, 168], [212, 148]].map(([x, yy], i) => <circle key={i} cx={x} cy={yy} r="2.2" fill="#e9e3ff" opacity="0.92" />)}
            {sel === 'plasma' && <ellipse cx="211" cy="152" rx="80" ry="54" fill="none" stroke={C.neon} strokeWidth="1.3" strokeDasharray="5 4" />}
          </g>

          {/* chuck electrode + wafer */}
          <g onClick={() => setSel('chuck')} style={{ cursor: 'pointer' }}>
            <path d="M180 252 L188 220 L234 220 L242 252 Z" fill="url(#pdChuck)" stroke={hl('chuck')} strokeWidth={hw('chuck')} />
            <rect x="182" y="216" width="58" height="6" rx="1" fill="#3a4d72" stroke={hl('chuck')} strokeWidth={hw('chuck') * 0.7} />
            <ellipse cx="211" cy="215" rx="45" ry="4.5" fill="url(#pdWafer)" />
            <path d="M254 215 l-6 -2.4 v4.8 z" fill="#0d1524" />
          </g>

          {/* RF box + cable to electrode */}
          <g onClick={() => setSel('rf')} style={{ cursor: 'pointer' }}>
            <rect x="18" y="214" width="66" height="40" rx="7" fill="#101a30" stroke={hl('rf')} strokeWidth={hw('rf')} />
            <text x="51" y="231" textAnchor="middle" fill={sel === 'rf' ? C.neon : C.violet} fontSize="12" fontFamily={C.mono} fontWeight="700">RF</text>
            <text x="51" y="245" textAnchor="middle" fill={C.dim} fontSize="8.5" fontFamily={C.mono} letterSpacing="1">MATCH</text>
            <path d="M84 236 C 130 236 150 244 188 246" fill="none" stroke={hl('rf')} strokeWidth={hw('rf') + 0.3} />
            <circle cx="188" cy="246" r="2.4" fill={hl('rf')} />
          </g>

          {/* foreline: gate valve + turbo pump + exhaust */}
          <g onClick={() => setSel('pump')} style={{ cursor: 'pointer' }}>
            <line x1="211" y1="278" x2="211" y2="284" stroke={hl('pump')} strokeWidth={hw('pump') + 3} />
            <rect x="191" y="284" width="40" height="12" rx="2" fill="#22314e" stroke={hl('pump')} strokeWidth={hw('pump')} />
            <line x1="197" y1="290" x2="225" y2="290" stroke={hl('pump')} strokeWidth={hw('pump') * 0.8} />
            <rect x="183" y="300" width="56" height="30" rx="7" fill="#101a30" stroke={hl('pump')} strokeWidth={hw('pump')} />
            <text x="211" y="319" textAnchor="middle" fill={sel === 'pump' ? C.neon : C.emerald} fontSize="10.5" fontFamily={C.mono} fontWeight="700">TURBO PUMP</text>
            <line x1="239" y1="315" x2="268" y2="315" stroke={C.emerald} strokeWidth="2" markerEnd="url(#pdArrG)" />
            <text x="274" y="312" fill={C.emerald} fontSize="9" fontFamily={C.mono}>exhaust</text>
          </g>

          {/* number badges */}
          {PART_SPEC.map((p) => (
            <g key={p.id} onClick={() => setSel(p.id)} style={{ cursor: 'pointer' }}>
              <circle cx={p.at[0]} cy={p.at[1]} r="10.5" fill={sel === p.id ? C.elec : '#0b1220'} stroke={sel === p.id ? C.neon : '#54668a'} strokeWidth="1.5" />
              <text x={p.at[0]} y={p.at[1] + 4} textAnchor="middle" fill={sel === p.id ? '#fff' : '#a9bcd6'} fontSize="11" fontFamily={C.mono} fontWeight="700">{p.n}</text>
            </g>
          ))}
        </svg>
        {/* legend */}
        <div className="fes-pd-legend">
          {PART_SPEC.map((p) => (
            <button key={p.id} onClick={() => setSel(p.id)} className={`fes-pd-leg ${sel === p.id ? 'on' : ''}`}>
              <span className="fes-pd-num">{p.n}</span>
              <span><b>{p.en}</b><span className="fes-pd-ko">{p.ko}</span></span>
            </button>
          ))}
        </div>
      </div>
      <div className="fes-wk-partinfo">
        <div className="fes-wk-partinfo-en">{cur.en} <span className="fes-wk-partinfo-ko">{cur.ko}</span></div>
        <div className="fes-wk-partinfo-desc">{cur.desc}</div>
        <div className="fes-wk-partinfo-hint">👆 그림의 번호나 아래 목록을 클릭하면 부품이 강조됩니다.</div>
      </div>
    </div>
  );
}

// PPT처럼 한 화면씩 넘기는 슬라이드 뷰어 — 강의자는 '다음'만 누르면 순서대로 진행.
// 마지막 슬라이드 도달 시 onReachEnd(chapterId) 로 챕터 완료를 알린다.
// 슬라이드 삽화(인라인 SVG) — 지문 아래에 상황 그림을 얹는다.
function SlideArt({ name }) {
  const svg = SLIDE_ART[name];
  if (!svg) return null;
  return <figure className="fes-slideart" dangerouslySetInnerHTML={{ __html: svg }} />;
}

function LessonDeck({ steps, chapterId, chapterNo, chapterTitle, onReachEnd }) {
  const [i, setI] = useState(0);
  // 챕터 PDF — 화면에서는 한 장씩 넘기지만, 저장할 때는 전 단계를 한 번에 펼쳐 인쇄한다.
  const [printing, setPrinting] = useState(false);
  const step = steps[i];
  const last = i === steps.length - 1;
  const artName = CH_ART[chapterId] && !(step.art && MANGA[step.art]) ? CH_ART[chapterId][step.title] : undefined;
  useEffect(() => { if (last && onReachEnd) onReachEnd(chapterId); }, [last, chapterId, onReachEnd]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { if (i < steps.length - 1) setI(i + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { if (i > 0) setI(i - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, steps.length]);
  useEffect(() => {
    if (!printing) return undefined;
    let cleared = false;
    const clear = () => { if (!cleared) { cleared = true; setPrinting(false); } };
    window.addEventListener('afterprint', clear);
    // 펼친 내용이 화면에 얹힌 다음에 인쇄 대화상자를 띄운다
    const t = setTimeout(() => { window.print(); setTimeout(clear, 900); }, 180);
    return () => { clearTimeout(t); window.removeEventListener('afterprint', clear); };
  }, [printing]);

  const stepLabel = step.type ? (({ scene: 'SET THE SCENE', mansample: 'MANUAL', story: 'STORY', eda: 'DESIGN TOOL' })[step.type] || String(step.type).toUpperCase()) : '';
  return (
    <div className="fes-ld">
      <div className="fes-ld-slide">
        <div className="fes-ld-head">
          <span className="fes-ld-step">CH{chapterNo} · {chapterTitle}<span className="fes-ld-step-sep">/</span>STEP {i + 1} / {steps.length}{stepLabel ? ' · ' + stepLabel : ''}</span>
          <div className="fes-ld-title">{step.title}</div>
          <SlideAudioBtn slide={step} />
        </div>
        <div className="fes-ld-body">
          {step.body || <SlideRenderer key={i} slide={step} />}
          {artName && <SlideArt name={artName} />}
        </div>
      </div>
      <div className="fes-ld-nav">
        <button className="fes-btn ghost" disabled={i === 0} onClick={() => setI(i - 1)}>◀ 이전</button>
        <div className="fes-ld-dots">
          {steps.map((s, j) => (
            <button key={j} onClick={() => setI(j)}
              className={`fes-ld-dot ${j === i ? 'on' : ''} ${j < i ? 'done' : ''}`} title={s.title} />
          ))}
        </div>
        <button className="fes-btn" disabled={last} onClick={() => setI(i + 1)}>{last ? '이 챕터 끝 ✓' : '다음 ▶'}</button>
      </div>
      <div className="fes-ld-save">
        <button className="fes-btn pdf" onClick={() => setPrinting(true)} disabled={printing}
          title="이 챕터 전체를 PDF 로 저장합니다 (인쇄 대화상자에서 대상 → PDF로 저장)">
          {printing ? '준비 중…' : `📄 CH${chapterNo} 전체 PDF 저장`}
        </button>
        <span className="fes-ld-save-hint">인쇄 대화상자에서 <b>대상 → PDF로 저장</b>을 고르세요. 전 {steps.length}장이 한 파일로 저장됩니다.</span>
      </div>

      {printing && createPortal(
        <div className="fes-root fes-print-doc">
          <section className="fes-print-cover">
            <div className="fes-print-eyebrow">반도체 현장 실무영어 · FIELD ENGLISH</div>
            <h1>CH{chapterNo} · {chapterTitle}</h1>
            <div className="fes-print-meta">전체 {steps.length}장 · demo.semifabai.com</div>
          </section>
          {steps.map((s, k) => (
            <section className="fes-print-page" key={k}>
              <div className="fes-print-head">
                <span>CH{chapterNo} · {chapterTitle}</span>
                <span>{k + 1} / {steps.length}</span>
              </div>
              <h2 className="fes-print-title">{s.title}</h2>
              <div className="fes-print-body">
                {s.type === 'sim'
                  ? <div className="fes-print-simnote">이 단계는 <b>웹에서 직접 조작하는 실습</b>입니다. 화면에서 진행하세요.</div>
                  : (s.body || <SlideRenderer slide={s} />)}
              </div>
            </section>
          ))}
        </div>, document.body)}
    </div>
  );
}

// 재사용 용어 그리드 (자료 슬라이드)
function GlossaryGrid({ intro, items }) {
  return (
    <div>
      {intro && <p className="fes-wk-quiz-intro">{plainSpeech(intro)}</p>}
      <div className="fes-wk-gloss">
        {items.map((g) => (
          <div key={g.en} className="fes-wk-gloss-item">
            <div className="fes-wk-gloss-en">{g.en}</div>
            <div className="fes-wk-gloss-ko">{g.ko}</div>
            <div className="fes-wk-gloss-d">{g.d}</div>
            {g.ex && <div className="fes-wk-gloss-ex">“{g.ex}”<SpeakBtn text={g.ex} title="예문 발음 듣기" /></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
const C3_TERMS = [
  { en: 'Load', ko: '싣다', d: '웨이퍼를 장비에 넣다.' },
  { en: 'Pump down', ko: '배기', d: '챔버를 진공으로 배기하다.' },
  { en: 'Purge', ko: '퍼지', d: '불활성 가스로 잔류 가스를 밀어내다.' },
  { en: 'Vent', ko: '벤트', d: '챔버를 대기압으로 되돌리다.' },
  { en: 'Ignite', ko: '점화', d: '플라즈마를 발생시키다.' },
  { en: 'Stop', ko: '정지', d: '운전을 멈추다.' },
];
const C4_TERMS = [
  { en: 'Alarm', ko: '알람', d: '즉시 조치가 필요한 경고.' },
  { en: 'Warning', ko: '경고', d: '주의가 필요한 알림.' },
  { en: 'Interlock', ko: '인터록', d: '안전조건 미충족 시 강제 정지.' },
  { en: 'Timeout', ko: '타임아웃', d: '정해진 시간 내 목표 미달.' },
  { en: 'Failure', ko: '고장/실패', d: '정상 동작에 실패한 상태.' },
];
const C5_TERMS = [
  { en: 'Width', ko: '선폭', d: '패턴의 폭.' },
  { en: 'Spacing', ko: '간격', d: '같은 레이어 두 패턴 사이 거리.' },
  { en: 'Enclosure', ko: '감쌈', d: '한 레이어가 다른 레이어를 감싸는 최소량.' },
  { en: 'Violation', ko: '위반', d: '규칙을 만족하지 못함.' },
  { en: 'Minimum', ko: '최소', d: '허용되는 최소값.' },
];
const C6_TERMS = [
  { en: 'Mismatch', ko: '불일치', d: '레이아웃과 회로도가 다름.' },
  { en: 'Missing device', ko: '누락 소자', d: '레이아웃에 소자가 빠짐.' },
  { en: 'Incorrect connection', ko: '잘못된 연결', d: '배선이 회로도와 다름.' },
  { en: 'Net', ko: '넷', d: '전기적으로 연결된 노드(선).' },
];

// ===== 장치 계기판 디스플레이 (LED 리드아웃 · 상태 LED · 진동 모니터) — 용어 학습용 =====
const DEV_NORMAL = [
  { label: 'PRESSURE', val: '5.0e-6', unit: 'Torr', ko: '압력' },
  { label: 'RF FORWARD', val: '600', unit: 'W', ko: '전진파(공급)' },
  { label: 'RF REFLECTED', val: '15', unit: 'W', ko: '반사파' },
  { label: 'CHUCK TEMP', val: '65', unit: '°C', ko: '척 온도' },
  { label: 'GAS FLOW', val: '50', unit: 'sccm', ko: '가스 유량' },
];
const DEV_ABNORMAL = [
  { label: 'PRESSURE', val: '2.1e-2', unit: 'Torr', ko: '압력', bad: true },
  { label: 'RF FORWARD', val: '600', unit: 'W', ko: '전진파(공급)' },
  { label: 'RF REFLECTED', val: '420', unit: 'W', ko: '반사파', bad: true },
  { label: 'CHUCK TEMP', val: '88', unit: '°C', ko: '척 온도', bad: true },
  { label: 'GAS FLOW', val: '6', unit: 'sccm', ko: '가스 유량', bad: true },
];

function VibWave({ bad }) {
  const amp = bad ? 17 : 5, n = 60, pts = [];
  for (let i = 0; i < n; i++) {
    const x = i / (n - 1) * 240;
    const y = 30 + Math.sin(i * 0.85) * amp * (bad ? (0.6 + 0.4 * Math.sin(i * 0.4)) : 1);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 240 60" className="fes-vib-svg" preserveAspectRatio="none">
      <line x1="0" y1="30" x2="240" y2="30" stroke="#16233b" strokeWidth="1" />
      <polyline points={pts.join(' ')} fill="none" stroke={bad ? C.red : C.emerald} strokeWidth="2" />
    </svg>
  );
}

function DevicePanel() {
  const [ab, setAb] = useState(false);
  const ro = ab ? DEV_ABNORMAL : DEV_NORMAL;
  const vib = ab ? { v: '9.8', s: 'HIGH', bad: true } : { v: '2.1', s: 'NORMAL' };
  const stat = ab
    ? [{ k: 'POWER', c: 'grn' }, { k: 'PLASMA', c: 'off' }, { k: 'READY', c: 'off' }, { k: 'INTERLOCK · TRIPPED', c: 'red' }]
    : [{ k: 'POWER', c: 'grn' }, { k: 'PLASMA', c: 'grn' }, { k: 'READY', c: 'grn' }, { k: 'INTERLOCK', c: 'off' }];
  return (
    <div>
      <p className="fes-wk-quiz-intro">실제 장비 계기판입니다. 각 <b>영어 라벨</b>이 무슨 값인지 익히세요. 아래 체크로 <b>비정상 상태</b>도 봅니다.</p>
      <div className="fes-wk-acr" style={{ marginBottom: 12 }}><b>RF</b> = Radio Frequency(고주파 전력) · <b>FWD</b> Forward(전진파) · <b>REFL</b> Reflected(반사파)</div>
      <div className="fes-dev-grid">
        {ro.map((r) => (
          <div key={r.label} className="fes-dev-led">
            <div className="fes-dev-led-label">{r.label}</div>
            <div className={`fes-dev-led-val ${r.bad ? 'bad' : ''}`}>{r.val}<span className="fes-dev-led-unit">{r.unit}</span></div>
            <div className="fes-dev-led-ko">{r.ko}</div>
          </div>
        ))}
      </div>
      <div className="fes-dev-row">
        <div className="fes-dev-status">
          <div className="fes-dev-sub">STATUS LED</div>
          {stat.map((s) => (<div key={s.k} className="fes-dev-stat"><span className={`fes-dev-dot ${s.c}`} />{s.k}</div>))}
        </div>
        <div className="fes-dev-vib">
          <div className="fes-dev-sub">VIBRATION MONITOR <span className="fes-dev-vibko">진동 모니터</span></div>
          <VibWave bad={vib.bad} />
          <div className={`fes-dev-vib-val ${vib.bad ? 'bad' : ''}`}>{vib.v} mm/s · {vib.s}</div>
        </div>
      </div>
      <label className="fes-inject" style={{ marginTop: 10 }}>
        <input type="checkbox" checked={ab} onChange={(e) => setAb(e.target.checked)} /> Simulate abnormal (비정상 상태 보기)
      </label>
    </div>
  );
}

/* =========================================================================
 * 강별 조작 실습 (3·4·5강) — 슬라이드의 mode 로 고른다. 규칙은 fieldEnglishLabs.js
 *   3강 procedure : 운전 버튼 패널 — 막힌 버튼을 누르면 인터록 사유가 뜬다
 *   4강 spPv      : SP/PV 상태 패널 — 사례별로 라인마다 정상/이상 판정
 *   4강 log       : 트렌드 장비 화면 — SP 변경·고장 주입 → OUT OF RANGE / UNSTABLE / 알람
 *   5강 ignite    : 점화 — 가스·압력 설정 → RF ON → Igniting → Tuning → Stable
 *   5강 rf        : RF 값 판독 — SP·Forward·Reflected 를 짝으로 읽고 판정
 *   5강 match     : 매칭 네트워크 — Load/Tune 위치, AUTO/MANUAL, at limit
 * ====================================================================== */

/** 모델 상태 + 로그를 한 덩어리로 들고 있는다 — 갱신 함수가 순수해야 StrictMode 이중 호출에도 로그가 겹치지 않는다 */
function applyLab(b, r) {
  if (r.s === b.s && !r.log.length) return b;
  return { s: r.s, log: r.log.length ? [...b.log, ...r.log].slice(-40) : b.log };
}
function useLab(init, tick, dtSec, firstLog) {
  const [box, setBox] = useState(() => ({ s: init(), log: firstLog ? [firstLog] : [] }));
  useEffect(() => {
    if (!tick) return undefined;
    const id = setInterval(() => setBox((b) => applyLab(b, tick(b.s, dtSec))), dtSec * 1000);
    return () => clearInterval(id);
  }, [tick, dtSec]);
  const apply = useCallback((fn) => setBox((b) => applyLab(b, fn(b.s))), []);
  const reset = useCallback(() => setBox({ s: init(), log: firstLog ? [firstLog] : [] }), [init, firstLog]);
  return [box, apply, reset];
}

function LabLog({ log, title = 'EVENT LOG' }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [log]);
  return (
    <div style={{ marginTop: 10 }}>
      <div className="fes-dev-sub">{title}</div>
      <div className="fes-log" ref={ref}>
        {log.map((l, i) => (
          <div key={i} className="fes-logrow">
            <span className={`fes-tag fes-tag-${l.t.toLowerCase()}`}>{l.t}</span><span>{l.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
const toneCol = (tone) => ({ ok: C.emerald, warn: C.amber, bad: C.red, dim: C.dim }[tone] || C.text);

/* ── 3강 · 운전 버튼 패널 ── */
const PROC_LABEL = {
  ATM: 'ATMOSPHERE · DOOR UNLOCKED', PUMPING: 'PUMPING...', READY: 'READY', RUNNING: 'RUNNING',
  COMPLETE: 'COMPLETE', PURGING: 'N2 PURGE IN PROGRESS...', PURGED: 'PURGE COMPLETE',
  VENTING: 'VENTING...', VENTED: 'VENT COMPLETE · DOOR UNLOCKED',
};
const PROC_TONE = { READY: 'ok', RUNNING: 'ok', COMPLETE: 'ok', PURGED: 'ok', VENTED: 'ok', ATM: 'dim' };
const PROC_FIRST = { t: 'INFO', m: 'Chamber at atmosphere (760 Torr). Wafer loaded. Door closed.' };

function ProcedurePanel() {
  const [box, apply, reset] = useLab(procInit, procTick, 0.1, PROC_FIRST);
  const [lock, setLock] = useState(null);   // 마지막으로 막힌 버튼과 사유
  const [hits, setHits] = useState(0);
  const { s } = box;
  const lamps = procLamps(s.phase);
  const press = (btn) => {
    const chk = procCheck(s.phase, btn);
    if (chk.ok) setLock(null); else { setLock({ btn, reason: chk.reason }); setHits((h) => h + 1); }
    apply((cur) => procPress(cur, btn));
  };
  const lampRow = [
    { k: 'READY', on: lamps.ready },
    { k: 'PUMP ON', on: lamps.pump },
    { k: 'PROCESS RUN', on: lamps.run },
    { k: lamps.doorLocked ? 'DOOR LOCKED' : 'DOOR UNLOCKED', on: !lamps.doorLocked },
  ];
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        흐린 버튼도 <b>눌러 보세요</b>. 지금 누르면 안 되는 버튼은 장비가 <b>INTERLOCK 사유(영어)</b>와 함께 거부합니다.
        목표: 인터록에 걸리지 않고 <b>PUMP → START → PURGE → VENT</b> 한 사이클을 끝내기.
      </p>
      <div className="fes-dev-row" style={{ marginTop: 0 }}>
        <div className="fes-dev-led">
          <div className="fes-dev-led-label">CHAMBER PRESSURE</div>
          <div className="fes-dev-led-val" style={{ color: s.p <= 1e-4 ? C.emerald : C.amber }}>{fmtTorr(s.p).replace(' Torr', '')}<span className="fes-dev-led-unit">Torr</span></div>
          <div className="fes-dev-led-ko">base pressure 5.0E-6 Torr 이하에서 READY</div>
        </div>
        <div className="fes-dev-status">
          <div className="fes-dev-sub">STATUS</div>
          <div style={{ fontFamily: C.mono, fontWeight: 700, color: toneCol(PROC_TONE[s.phase] || 'warn'), marginBottom: 6 }}>
            {PROC_LABEL[s.phase]}{s.aborted && s.phase === 'COMPLETE' ? ' (ABORTED)' : ''}
          </div>
          {lampRow.map((l) => (<div key={l.k} className="fes-dev-stat"><span className={`fes-dev-dot ${l.on ? 'grn' : 'off'}`} />{l.k}</div>))}
        </div>
      </div>
      <div className="fes-btnrow" style={{ marginTop: 12 }}>
        {PROC_BUTTONS.map((b) => {
          const ok = procCheck(s.phase, b).ok;
          return (
            <button key={b} onClick={() => press(b)} title={ok ? '' : procCheck(s.phase, b).reason}
              className={`fes-btn ${b === 'STOP' ? 'danger' : ''} ${ok ? '' : 'locked'}`}>{b}</button>
          );
        })}
        <button className="fes-btn ghost" onClick={() => { reset(); setLock(null); setHits(0); }}>Reset</button>
      </div>
      {lock && (
        <div className="fes-alarm-bar"><span>⛔ INTERLOCK — {lock.btn}: {lock.reason}</span></div>
      )}
      {s.phase === 'VENTED' && (
        <div className="fes-ok" style={{ marginTop: 10 }}>
          ✔ 한 사이클 완료 · 인터록에 걸린 횟수 {hits}회{hits === 0 ? ' — 순서를 정확히 지켰습니다.' : ' — 로그에서 거부 사유를 다시 읽어 보세요.'}
        </div>
      )}
      <LabLog log={box.log} />
    </div>
  );
}

/* ── 4강 · SP/PV 상태 패널 ── */
const SPPV_PICKS = [
  { id: 'ok', label: '정상' },
  { id: 'above', label: '이상 · SP보다 높음' },
  { id: 'below', label: '이상 · SP보다 낮음' },
  { id: 'unstable', label: '이상 · 요동(UNSTABLE)' },
];
function sppvAnswer(j) {
  if (j.normal) return 'ok';
  if (j.range === 'OUT OF RANGE') return j.side;
  return 'unstable';
}
/* 차트 색 — dataviz 스킬 기준 팔레트의 어두운 모드 값을 이 화면 배경(#04070d)에 대해 검증했다
   (validate_palette.js: PV 파랑 #3987e5 는 명도·채도·대비 통과). SP 는 계열이 아니라 기준선이라 회색 점선. */
const VIZ = { pv: '#3987e5', sp: '#c3c2b7', band: '#c3c2b7', grid: '#1c2433', axis: '#2c3a52', ink: '#e2e8f0', muted: C.dim, surface: '#04070d' };

function VizTooltip({ active, payload, label, unit, xLabel }) {
  if (!active || !payload || !payload.length) return null;
  // 측정값(PV)이 먼저, 기준(SP)이 뒤
  const rows = ['pv', 'sp'].map((k) => payload.find((p) => p.dataKey === k)).filter(Boolean);
  return (
    <div style={{ background: '#0b1220', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '6px 9px', fontFamily: C.mono, fontSize: 11 }}>
      <div style={{ color: VIZ.muted, marginBottom: 3 }}>{xLabel(label)}</div>
      {rows.map((p) => (
        <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="4"><line x1="0" y1="2" x2="14" y2="2" stroke={p.dataKey === 'pv' ? VIZ.pv : VIZ.sp} strokeWidth="2" strokeDasharray={p.dataKey === 'sp' ? '3 2' : undefined} /></svg>
          <b style={{ color: VIZ.ink }}>{fmtNum(p.value)} {unit}</b>
          <span style={{ color: VIZ.muted }}>{p.dataKey === 'pv' ? 'PV' : 'SP'}</span>
        </div>
      ))}
    </div>
  );
}

function Spark({ samples, sp, w = 120, h = 34 }) {
  // 한 계열(PV) + 기준선(SP)·허용 띠. 표에 현재값이 있으므로 범례는 두지 않고, 점마다 값은 툴팁으로 본다.
  const data = samples.map((v, i) => ({ i, pv: v, sp }));
  const lo = Math.min(sp * 0.8, ...samples);
  const hi = Math.max(sp * 1.2, ...samples);
  return (
    <div style={{ width: w, height: h }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 3, right: 3, bottom: 3, left: 3 }}>
          <XAxis dataKey="i" hide />
          <YAxis domain={[lo, hi]} hide />
          <ReferenceArea y1={sp * 0.9} y2={sp * 1.1} fill={VIZ.band} fillOpacity={0.1} stroke="none" ifOverflow="extendDomain" />
          <ReferenceLine y={sp} stroke={VIZ.sp} strokeDasharray="3 3" strokeWidth={1} />
          <Tooltip content={<VizTooltip unit="" xLabel={(x) => `sample ${x + 1}`} />} cursor={{ stroke: VIZ.axis }} wrapperStyle={{ zIndex: 5 }} />
          <Line type="linear" dataKey="pv" stroke={VIZ.pv} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" dot={false} activeDot={{ r: 4, stroke: VIZ.surface, strokeWidth: 2 }} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
function SpPvPanel() {
  const [ci, setCi] = useState(0);
  const [pick, setPick] = useState({});
  const [checked, setChecked] = useState(false);
  const cse = SPPV_CASES[ci];
  const rows = SPPV_LINES.map((l) => ({ l, samples: cse.samples[l.id], j: judgeLine(l.sp, cse.samples[l.id]) }));
  const score = rows.filter((r) => pick[r.l.id] === sppvAnswer(r.j)).length;
  const go = (i) => { setCi(i); setPick({}); setChecked(false); };
  const why = (r) => {
    const pct = `${r.j.dev >= 0 ? '+' : ''}${(r.j.dev * 100).toFixed(0)}%`;
    if (r.j.normal) return `PV ${r.j.pv.toFixed(1)} / SP ${r.l.sp} (${pct}) — 10% 이내, 값이 일정 → IN RANGE · STABLE`;
    if (r.j.range === 'OUT OF RANGE') return `PV ${r.j.pv.toFixed(1)} / SP ${r.l.sp} (${pct}) — 10% 초과, SP보다 ${r.j.side === 'above' ? '높음' : '낮음'} → OUT OF RANGE`;
    return `PV 는 SP 근처지만 추세를 뺀 흔들림 폭이 ${(r.j.span * 100).toFixed(0)}% (요동·spike) → UNSTABLE`;
  };
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        각 라인의 <b>SP·PV·상태어·색</b>을 읽고 정상인지, 이상이면 <b>SP보다 높은지·낮은지·요동인지</b> 고르세요.
        (편차 기준: 설정값의 10% — 교재 매뉴얼 / 요동 기준: 완만한 추세를 뺀 흔들림 폭 8% — 이 실습의 가정. 한 방향으로 서서히 가는 drift 는 요동이 아닙니다)
      </p>
      <div className="fes-casebar">
        {SPPV_CASES.map((c, i) => (
          <button key={c.id} onClick={() => go(i)} className={`fes-chip ${i === ci ? 'on' : ''}`}>{c.title}</button>
        ))}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="fes-tbl" style={{ minWidth: 640 }}>
          <tbody>
            <tr style={{ color: C.dim }}><td>LINE</td><td>SP</td><td>PV</td><td>TREND</td><td>STATUS</td><td>판정</td></tr>
            {rows.map((r) => {
              const bad = !r.j.normal;
              const oor = r.j.range === 'OUT OF RANGE';
              const ok = pick[r.l.id] === sppvAnswer(r.j);
              return (
                <React.Fragment key={r.l.id}>
                  <tr>
                    <td>{r.l.label}</td>
                    <td>{r.l.sp} {r.l.unit}</td>
                    <td style={{ color: oor ? C.red : bad ? C.amber : C.text, fontWeight: 700 }}>{r.j.pv.toFixed(1)} {r.l.unit}</td>
                    <td><Spark samples={r.samples} sp={r.l.sp} /></td>
                    <td>
                      <span style={{ color: oor ? C.red : C.emerald }}>{r.j.range}</span><br />
                      <span style={{ color: r.j.stability === 'UNSTABLE' ? C.amber : C.emerald }}>{r.j.stability}</span>
                    </td>
                    <td style={{ fontFamily: C.sans }}>
                      <select value={pick[r.l.id] || ''} disabled={checked}
                        onChange={(e) => setPick((p) => ({ ...p, [r.l.id]: e.target.value }))}
                        style={{ background: C.panel2, color: C.text, border: `1px solid ${C.line2}`, borderRadius: 6, padding: '4px 6px', fontSize: 12 }}>
                        <option value="" disabled>선택</option>
                        {SPPV_PICKS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                      </select>
                      {checked && <b style={{ marginLeft: 6, color: ok ? C.emerald : C.red }}>{ok ? 'O' : 'X'}</b>}
                    </td>
                  </tr>
                  {checked && (
                    <tr><td colSpan={6} style={{ fontFamily: C.sans, color: ok ? C.dim : C.amber, fontSize: 11.5 }}>
                      → {why(r)}{ok ? '' : ` · 정답: ${SPPV_PICKS.find((o) => o.id === sppvAnswer(r.j)).label}`}
                    </td></tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="fes-btnrow" style={{ marginTop: 10, alignItems: 'center' }}>
        <button className="fes-btn" disabled={checked || Object.keys(pick).length < rows.length} onClick={() => setChecked(true)}>채점</button>
        {checked && <button className="fes-btn ghost" onClick={() => go(ci)}>다시 풀기</button>}
        {checked && <span style={{ fontSize: 12.5, color: score === rows.length ? C.emerald : C.amber }}>{score} / {rows.length} 정답</span>}
      </div>
    </div>
  );
}

/* ── 4강 · 트렌드 장비 화면 ── */
const clock = (t) => { const x = Math.floor(t); return `${String(Math.floor(x / 60)).padStart(2, '0')}:${String(x % 60).padStart(2, '0')}`; };
const stampLog = (r) => (r.log.length ? { ...r, log: r.log.map((l) => ({ ...l, m: `${clock(r.s.t)}  ${l.m}` })) } : r);
const trendTick = (s, dt) => stampLog(trendStep(s, dt));
const TREND_FIRST = { t: 'INFO', m: '00:00  Log started. All lines at set point.' };
const TREND_SP_CHOICES = { prs: [5, 10, 20, 30], ar: [20, 50, 100] };

function TrendChart({ c, now, unit }) {
  // 최근 30 초: PV(파랑 실선) · SP(회색 점선 기준선) · ±10% 허용 띠. 시작 직후에도 창 전체 폭을 쓴다.
  const data = c.hist.map((p) => ({ t: p.t, pv: p.pv, sp: p.sp, band: [p.sp * 0.9, p.sp * 1.1] }));
  const x0 = Math.max(0, now - TREND_WIN_S);
  const secs = (t) => `${(t - now).toFixed(1)} s`;
  return (
    <div>
      <div style={{ width: '100%', height: 150 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -8 }}>
            <CartesianGrid stroke={VIZ.grid} strokeWidth={1} vertical={false} />
            <XAxis dataKey="t" type="number" domain={[x0, Math.max(now, x0 + 5)]} allowDataOverflow
              tickFormatter={(t) => `${Math.round(t - now)}s`} tickCount={4}
              stroke={VIZ.axis} tick={{ fill: VIZ.muted, fontSize: 10, fontFamily: C.mono }} tickLine={false} />
            <YAxis domain={['auto', 'auto']} width={44} tickCount={4} tickFormatter={(v) => fmtNum(v)}
              stroke={VIZ.axis} tick={{ fill: VIZ.muted, fontSize: 10, fontFamily: C.mono }} tickLine={false} axisLine={false} />
            <Area dataKey="band" type="stepAfter" fill={VIZ.band} fillOpacity={0.1} stroke="none" isAnimationActive={false} activeDot={false} />
            <Line dataKey="sp" type="stepAfter" stroke={VIZ.sp} strokeDasharray="4 3" strokeWidth={1.5} dot={false} activeDot={false} isAnimationActive={false} />
            <Line dataKey="pv" type="linear" stroke={VIZ.pv} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" dot={false}
              activeDot={{ r: 4, stroke: VIZ.surface, strokeWidth: 2 }} isAnimationActive={false} />
            <Tooltip content={<VizTooltip unit={unit} xLabel={secs} />} cursor={{ stroke: VIZ.muted, strokeWidth: 1 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontFamily: C.mono, fontSize: 10.5, color: VIZ.muted, marginTop: 2 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><svg width="16" height="4"><line x1="0" y1="2" x2="16" y2="2" stroke={VIZ.pv} strokeWidth="2" /></svg>PV {unit}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><svg width="16" height="4"><line x1="0" y1="2" x2="16" y2="2" stroke={VIZ.sp} strokeWidth="1.5" strokeDasharray="4 3" /></svg>SP</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 14, height: 9, background: VIZ.band, opacity: 0.25, borderRadius: 2 }} />±10% band</span>
      </div>
    </div>
  );
}
function TrendHMI() {
  const [box, apply, reset] = useLab(trendInit, trendTick, TREND_DT, TREND_FIRST);
  const { s } = box;
  const [note, setNote] = useState('');
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        <b>SET POINT</b>를 바꾸면 <b>ACTUAL(PV)</b>이 따라옵니다 — 따라오는 동안은 <b>RAMPING</b>이라 편차가 커도 알람이 없습니다.
        아래에서 고장을 주입해 <b>OUT OF RANGE</b>(10% 초과)·<b>UNSTABLE</b>(요동)·<b>ALARM</b>(OUT OF RANGE 2초 지속)이 언제 뜨는지 관찰하세요.
      </p>
      <div className="fes-casebar">
        {TREND_FAULTS.map((f) => (
          <button key={f.id} className={`fes-chip ${s.fault === f.id ? 'on' : ''}`}
            onClick={() => apply((cur) => ({ s: trendSetFault(cur, f.id), log: f.id === 'none' ? [] : [{ t: 'CMD', m: `${clock(cur.t)}  (training) fault injected: ${f.en}` }] }))}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="fes-grid2">
        {TREND_CHANNELS.map((def) => {
          const c = s.ch[def.id];
          const st = trendStatus(c);
          const dev = c.sp ? ((c.hist.length ? c.hist[c.hist.length - 1].pv : c.pv) - c.sp) / c.sp : 0;
          const pv = c.hist.length ? c.hist[c.hist.length - 1].pv : c.pv;
          return (
            <div key={def.id} className="fes-dev-status" style={{ borderColor: st.tone === 'bad' ? `${C.red}88` : C.line2 }}>
              <div className="fes-dev-sub">{def.label}</div>
              <div style={{ display: 'flex', gap: 14, fontFamily: C.mono, fontSize: 12, flexWrap: 'wrap' }}>
                <span>SP <b>{fmtNum(c.sp)}</b> {def.unit}</span>
                <span>PV <b style={{ color: toneCol(st.tone) }}>{fmtNum(pv)}</b> {def.unit}</span>
                <span style={{ color: C.dim }}>DEV {dev >= 0 ? '+' : ''}{(dev * 100).toFixed(1)}%</span>
              </div>
              <div style={{ fontFamily: C.mono, fontWeight: 700, margin: '6px 0', color: toneCol(st.tone) }}>
                {st.word}{st.word !== 'RAMPING' && st.word !== st.range ? ` · ${st.range}` : ''}
              </div>
              <TrendChart c={c} now={s.t} unit={def.unit} />
              <div className="fes-btnrow" style={{ marginTop: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: C.dim }}>SET POINT</span>
                {TREND_SP_CHOICES[def.id].map((v) => (
                  <button key={v} className={`fes-chip ${c.sp === v ? 'on' : ''}`} onClick={() => apply((cur) => stampLog(trendSetSp(cur, def.id, v)))}>{v}</button>
                ))}
                {c.alarmed && (
                  <button className="fes-btn danger" onClick={() => {
                    const r = trendReset(s, def.id);
                    setNote(r.ok ? '' : `RESET 거부: ${r.reason} — 교재 매뉴얼: PV 가 허용 범위로 돌아오기 전에는 RESET 하지 않는다.`);
                    apply((cur) => stampLog(trendReset(cur, def.id)));
                  }}>RESET ALARM</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {note && <div className="fes-alarm-bar"><span>{note}</span></div>}
      <div className="fes-btnrow" style={{ marginTop: 8 }}>
        <button className="fes-btn ghost" onClick={() => { reset(); setNote(''); }}>Reset log</button>
      </div>
      <LabLog log={box.log} title="EVENT LOG (시간순으로 읽기)" />
      <TaskCard title="STUDENT TASK — read the log">
        <ol className="fes-task-ol">
          <li>「미세 누설」을 주입하고, 압력 PV 가 SP 보다 <b>above</b> 인지 <b>below</b> 인지 로그 문장에서 찾으세요.</li>
          <li>알람이 뜬 뒤 바로 RESET 을 눌러 보고, 왜 거부되는지 읽으세요. 「정상」으로 되돌린 뒤 다시 RESET 하세요.</li>
          <li>「MFC 밸브 헌팅」에서는 왜 알람 없이 <b>UNSTABLE</b> 만 뜨는지 설명해 보세요.</li>
        </ol>
      </TaskCard>
    </div>
  );
}

/* ── 5강 · 점화 ── */
const IGN_STEPS = ['SET GAS', 'SET PRESSURE', 'RF ON', 'IGNITING', 'TUNING', 'STABLE'];
const IGN_FIRST = { t: 'INFO', m: 'RF OFF. Set gas flow and pressure, then press RF ON.' };
const IGN_CHOICES = { gas: [0, 20, 50], prs: [5, 10, 50, 100, 500], rfSp: [300, 600, 900] };
function IgnitionLab() {
  const [box, apply, reset] = useLab(ignInit, ignTick, 0.1, IGN_FIRST);
  const { s } = box;
  const off = s.phase === 'OFF';
  const cur = s.phase === 'STABLE' ? 5 : s.phase === 'TUNING' ? 4 : s.phase === 'IGNITING' ? 3 : s.gas > 0 ? 1 : 0;
  const lit = s.phase === 'TUNING' || s.phase === 'STABLE';
  const high = s.refl >= REFL_SPEC_W;
  const set = (k, v) => apply((c) => ({ s: { ...c, [k]: v }, log: [{ t: 'CMD', m: `${k === 'gas' ? 'Gas flow set point' : k === 'prs' ? 'Pressure set point' : 'RF forward set point'} → ${v} ${k === 'gas' ? 'sccm' : k === 'prs' ? 'mTorr' : 'W'}` }] }));
  const row = (k, label, unit) => (
    <div className="fes-btnrow" style={{ alignItems: 'center', marginBottom: 6 }}>
      <span style={{ width: 118, fontFamily: C.mono, fontSize: 11, color: C.dim }}>{label}</span>
      {IGN_CHOICES[k].map((v) => (
        <button key={v} disabled={!off} className={`fes-chip ${s[k] === v ? 'on' : ''}`} onClick={() => set(k, v)}>{v} {unit}</button>
      ))}
    </div>
  );
  return (
    <div style={{ marginTop: 12 }}>
      <p className="fes-wk-quiz-intro">
        교재 순서 <b>Set gas flow → Set pressure → RF ON → Ignite → Auto tune → Stable</b> 를 직접 해 보세요.
        가스를 끄거나 압력을 너무 낮게/높게 두면 <b>Failed to ignite</b> 가 뜹니다 — 그때 <b>RF 파워만 올려 다시 켜지 말 것</b>.
      </p>
      <div className="fes-stepbar">
        {IGN_STEPS.map((t, i) => (
          <React.Fragment key={t}>
            <div className={`fes-step ${i <= cur ? 'on' : ''} ${i === cur ? 'cur' : ''}`}><span className="fes-step-dot">{i + 1}</span>{t}</div>
            {i < IGN_STEPS.length - 1 && <div className={`fes-step-line ${i < cur ? 'on' : ''}`} />}
          </React.Fragment>
        ))}
      </div>
      {row('gas', 'GAS FLOW SP', 'sccm')}
      {row('prs', 'PRESSURE SP', 'mTorr')}
      {row('rfSp', 'RF FORWARD SP', 'W')}
      {!off && <div style={{ fontSize: 11, color: C.dim, margin: '0 0 6px' }}>설정은 RF OFF 상태에서만 바꿀 수 있습니다.</div>}
      <div className="fes-dev-grid" style={{ marginTop: 8 }}>
        <div className="fes-dev-led"><div className="fes-dev-led-label">FORWARD</div><div className="fes-dev-led-val">{s.fwd}<span className="fes-dev-led-unit">W</span></div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">REFLECTED {high && s.fwd ? '· HIGH' : ''}</div><div className={`fes-dev-led-val ${high && s.fwd ? 'bad' : ''}`}>{s.refl}<span className="fes-dev-led-unit">W</span></div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">DELIVERED (FWD − REFL)</div><div className="fes-dev-led-val">{s.fwd - s.refl}<span className="fes-dev-led-unit">W</span></div></div>
        <div className="fes-dev-led">
          <div className="fes-dev-led-label">PLASMA</div>
          <div className="fes-dev-led-val" style={{ color: lit ? C.violet : s.phase === 'FAILED' ? C.red : C.dim, textShadow: lit ? `0 0 14px ${C.violet}` : 'none', fontSize: 18 }}>
            {s.phase === 'STABLE' ? 'STABLE' : s.phase === 'TUNING' ? 'ON · TUNING' : s.phase === 'IGNITING' ? 'IGNITING...' : s.phase === 'FAILED' ? 'NO PLASMA' : 'OFF'}
          </div>
        </div>
      </div>
      <div className="fes-btnrow" style={{ marginTop: 10 }}>
        <button className="fes-btn" disabled={!off} onClick={() => apply(ignRfOn)}>RF ON</button>
        <button className="fes-btn danger" disabled={off} onClick={() => apply(ignRfOff)}>RF OFF</button>
        <button className="fes-btn ghost" onClick={reset}>Reset</button>
      </div>
      <LabLog log={box.log} />
    </div>
  );
}

/* ── 5강 · RF 값 판독 ── */
function RfReadPanel() {
  const [ci, setCi] = useState(0);
  const [ans, setAns] = useState({});
  const c = RF_CASES[ci];
  const a = ans[c.id];
  const high = c.refl >= REFL_SPEC_W;
  const low = Math.abs(c.fwd - c.sp) / c.sp > 0.1;
  const done = Object.keys(ans).length;
  const score = RF_CASES.filter((x) => ans[x.id] != null && ans[x.id] === x.normal).length;
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        RF 발생기 화면입니다. <b>Setpoint · Forward(PV) · Reflected</b> 를 짝으로 읽고 정상인지 판정하세요.
        기준: Reflected <b>20 W 미만</b>(교재 매뉴얼), Forward PV 는 SP 와 같아야 합니다.
      </p>
      <div className="fes-casebar">
        {RF_CASES.map((x, i) => (
          <button key={x.id} onClick={() => setCi(i)} className={`fes-chip ${i === ci ? 'on' : ''}`}>
            CASE {x.id}{ans[x.id] != null ? (ans[x.id] === x.normal ? ' ✔' : ' ✘') : ''}
          </button>
        ))}
      </div>
      <div className="fes-dev-grid">
        <div className="fes-dev-led"><div className="fes-dev-led-label">RF SETPOINT</div><div className="fes-dev-led-val" style={{ color: C.text, textShadow: 'none' }}>{c.sp}<span className="fes-dev-led-unit">W</span></div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">FORWARD (PV)</div><div className={`fes-dev-led-val ${low ? 'bad' : ''}`}>{c.fwd}<span className="fes-dev-led-unit">W</span></div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">REFLECTED {high ? '· HIGH' : ''}</div><div className={`fes-dev-led-val ${high ? 'bad' : ''}`}>{c.refl}<span className="fes-dev-led-unit">W</span></div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">DELIVERED</div><div className="fes-dev-led-val">{c.fwd - c.refl}<span className="fes-dev-led-unit">W</span></div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">MATCH</div><div className="fes-dev-led-val" style={{ fontSize: 15, color: /LIMIT/.test(c.match) ? C.red : /TUNING/.test(c.match) ? C.amber : C.emerald }}>{c.match}</div></div>
      </div>
      <div className="fes-btnrow" style={{ marginTop: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 12.5 }}>이 화면은?</span>
        <button className="fes-btn" disabled={a != null} onClick={() => setAns((p) => ({ ...p, [c.id]: true }))}>정상 (Normal)</button>
        <button className="fes-btn danger" disabled={a != null} onClick={() => setAns((p) => ({ ...p, [c.id]: false }))}>이상 · 경고 (Abnormal)</button>
      </div>
      {a != null && (
        <div style={{ marginTop: 10, fontSize: 12.5, color: a === c.normal ? C.emerald : C.amber }}>
          {a === c.normal ? '✔ 맞았습니다. ' : `✘ 정답은 「${c.normal ? '정상' : '이상'}」. `}{c.why}
        </div>
      )}
      <div style={{ marginTop: 8, fontSize: 12, color: C.dim }}>판정 {done} / {RF_CASES.length} · 정답 {score}</div>
    </div>
  );
}

/* ── 5강 · 매칭 네트워크 ── */
const MATCH_FIRST = { t: 'INFO', m: 'RF ON 600 W. Match: AUTO. Tuning to minimize reflected power...' };
function MatchLab() {
  const [caseId, setCaseId] = useState('normal');
  const init = useCallback(() => matchInit(caseId), [caseId]);
  const [box, apply, reset] = useLab(init, matchTick, 0.1, MATCH_FIRST);
  useEffect(() => { reset(); }, [caseId, reset]);
  const { s } = box;
  const st = matchStatus(s);
  const cse = MATCH_CASES.find((c) => c.id === caseId);
  const bar = (k, label) => (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: C.mono, fontSize: 11.5 }}>
        <span style={{ color: C.dim }}>{label} POSITION</span>
        <b style={{ color: (s[k] <= 0 || s[k] >= 100) ? C.red : C.text }}>{Math.round(s[k])}%{(s[k] <= 0 || s[k] >= 100) ? ' · LIMIT' : ''}</b>
      </div>
      <div className="fes-gauge-bar" style={{ marginTop: 5 }}>
        <div style={{ width: `${Math.max(1, s[k])}%`, background: (s[k] <= 0 || s[k] >= 100) ? C.red : C.cyan }} />
      </div>
      {s.mode === 'MANUAL' && (
        <input type="range" min={0} max={100} step={1} value={Math.round(s[k])}
          onChange={(e) => { const v = +e.target.value; apply((c) => ({ s: { ...c, [k]: v }, log: [] })); }}
          style={{ width: '100%', marginTop: 4 }} />
      )}
    </div>
  );
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        <b>Match: AUTO</b> 가 Load / Tune 위치를 움직여 Reflected 를 0 쪽으로 줄이는 흐름을 보세요.
        「조건 변화」에서는 한쪽 끝(100%)에 붙어 더 못 줄이는 <b>match at limit</b> 을, MANUAL 에서는 직접 위치를 맞춰 보세요.
      </p>
      <div className="fes-casebar">
        {MATCH_CASES.map((c) => (
          <button key={c.id} className={`fes-chip ${caseId === c.id ? 'on' : ''}`} onClick={() => setCaseId(c.id)}>{c.label}</button>
        ))}
      </div>
      <div style={{ fontSize: 11.5, color: C.dim, marginBottom: 8 }}>{cse.note}</div>
      <div className="fes-dev-row" style={{ marginTop: 0 }}>
        <div className="fes-dev-status">
          <div className="fes-dev-sub">MATCHING NETWORK</div>
          <div className="fes-btnrow" style={{ marginBottom: 10 }}>
            {['AUTO', 'MANUAL'].map((m) => (
              <button key={m} className={`fes-chip ${s.mode === m ? 'on' : ''}`}
                onClick={() => apply((c) => ({ s: { ...c, mode: m, atLimit: false, overFor: 0 }, log: [{ t: 'CMD', m: `Match mode → ${m}` }] }))}>Match: {m}</button>
            ))}
          </div>
          {bar('load', 'LOAD')}
          {bar('tune', 'TUNE')}
        </div>
        <div className="fes-dev-status">
          <div className="fes-dev-sub">RF GENERATOR 13.56 MHz</div>
          <div className="fes-grid2">
            <ReadRow label="Forward" value={`${st.fwd} W`} tone={st.fwd ? 'ok' : 'dim'} />
            <ReadRow label="Reflected" value={`${st.refl} W${st.high ? ' · HIGH' : ''}`} tone={st.high ? 'bad' : 'ok'} />
            <ReadRow label="Delivered" value={`${st.fwd - st.refl} W`} />
            <ReadRow label="Status" value={st.word} tone={st.tone} />
          </div>
          <div className="fes-btnrow" style={{ marginTop: 10 }}>
            <button className="fes-btn" disabled={s.rf} onClick={() => apply(matchRfOn)}>RF ON</button>
            <button className="fes-btn ghost" onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
      <LabLog log={box.log} />
    </div>
  );
}

/* =========================================================================
 * 강별 조작 실습 (2·6·7강)
 *   2강 parts    : 부품 계기판 — 어느 부품이 이상인가
 *   2강 pumpdown : 펌프다운 — 러핑 → 크로스오버 → 터보 → 게이트 밸브 (인터록 사유)
 *   6강 status   : 상태어·타워 램프 판독
 *   6강 ackReset : 알람 종류 구분 → ACK → 원인 조치 → RESET
 *   6강 priority : 동시 발생 — interlock → alarm → warning, READY 복구
 *   7강 pmParts  : 챔버 부위별 PM 동작
 *   7강 pmWork   : PM 작업 — 규격 판정 → 재작업 → work order 종료
 *   7강 pmStatus : PM 상태·값을 보고 가동 가능 판정
 * ====================================================================== */

const ST_COL = { NORMAL: C.emerald, WARNING: C.amber, ALARM: C.red };
/** 사례 칩 + 사례별 정답 표시 — 판정형 실습 공용 */
function CaseChips({ cases, idx, setIdx, label, mark }) {
  return (
    <div className="fes-casebar">
      {cases.map((c, i) => (
        <button key={i} onClick={() => setIdx(i)} className={`fes-chip ${i === idx ? 'on' : ''}`}>
          {label(c, i)}{mark(c, i) == null ? '' : mark(c, i) ? ' ✔' : ' ✘'}
        </button>
      ))}
    </div>
  );
}
function PickRow({ options, picked, answer, onPick, prompt }) {
  return (
    <div style={{ marginTop: 12 }}>
      {prompt && <div style={{ fontSize: 12.5, marginBottom: 6 }}>{prompt}</div>}
      <div className="fes-btnrow">
        {options.map((o) => {
          const done = picked != null;
          const isAns = done && o.id === answer;
          const isWrong = done && o.id === picked && picked !== answer;
          return (
            <button key={o.id} disabled={done} onClick={() => onPick(o.id)} className="fes-btn"
              style={isAns ? { borderColor: C.emerald, color: C.emerald, opacity: 1 } : isWrong ? { borderColor: C.red, color: C.red, opacity: 1 } : undefined}>
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── 2강 · 부품 계기판 ── */
function PartsPanel() {
  const [ci, setCi] = useState(0);
  const [ans, setAns] = useState({});
  const c = PARTS_CASES[ci];
  const a = ans[c.id];
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        장비 HMI 계기판입니다. 각 값의 <b>영어 라벨·단위(Torr, sccm, W, rpm, %)·상태어</b>를 읽고, 이 화면에서 <b>어느 부품이 이상인지</b> 고르세요.
        (초록 NORMAL · 노랑 WARNING · 빨강 ALARM)
      </p>
      <CaseChips cases={PARTS_CASES} idx={ci} setIdx={setCi} label={(x) => `CASE ${x.id}`}
        mark={(x) => (ans[x.id] == null ? null : ans[x.id] === x.ans)} />
      <div style={{ fontFamily: C.mono, fontSize: 11.5, color: C.dim, marginBottom: 8 }}>TOOL STATE: {c.title}</div>
      <div className="fes-dev-grid">
        {Object.entries(c.tiles).map(([k, t]) => (
          <div key={k} className="fes-dev-led" style={{ borderColor: t.st === 'NORMAL' ? C.line2 : `${ST_COL[t.st]}99` }}>
            <div className="fes-dev-led-label">{t.label}</div>
            <div className="fes-dev-led-val" style={{ fontSize: 18, color: ST_COL[t.st], textShadow: 'none' }}>{t.val}<span className="fes-dev-led-unit">{t.unit}</span></div>
            <div style={{ fontFamily: C.mono, fontSize: 10.5, fontWeight: 700, color: ST_COL[t.st], marginTop: 4 }}>● {t.st}</div>
          </div>
        ))}
      </div>
      <PickRow prompt="이 화면에서 이상이 있는 부품은?" options={PARTS_OPTIONS} picked={a} answer={c.ans}
        onPick={(id) => setAns((p) => ({ ...p, [c.id]: id }))} />
      {a != null && <div style={{ marginTop: 8, fontSize: 12.5, color: a === c.ans ? C.emerald : C.amber }}>{a === c.ans ? '✔ ' : '✘ '}{c.why}</div>}
    </div>
  );
}

/* ── 2강 · 펌프다운 ── */
const PD_FIRST = { t: 'INFO', m: 'Chamber VENTED (760 Torr). Roughing pump running. Turbo pump OFF. Gate valve CLOSED.' };
function PumpDownSchematic({ s }) {
  const on = C.cyan; const off = C.line2;
  const vcol = (open) => (open ? C.emerald : C.red);
  const valve = (x, y, open, label) => (
    <g>
      <path d={`M${x - 9},${y - 7} L${x + 9},${y + 7} L${x + 9},${y - 7} L${x - 9},${y + 7} Z`} fill={open ? `${C.emerald}33` : '#0b1220'} stroke={vcol(open)} strokeWidth="1.6" />
      <text x={x} y={y - 12} fill={vcol(open)} fontSize="9.5" fontFamily={C.mono} textAnchor="middle">{label} {open ? 'OPEN' : 'CLOSED'}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 520 190" style={{ width: '100%', height: 'auto', display: 'block', background: '#04070d', borderRadius: 8 }}>
      <rect x="20" y="40" width="110" height="80" rx="10" fill="#0e1a2e" stroke={C.cyan} strokeWidth="1.5" />
      <text x="75" y="62" fill={C.cyan} fontSize="11" fontFamily={C.mono} textAnchor="middle">CHAMBER</text>
      <text x="75" y="84" fill={C.text} fontSize="11" fontFamily={C.mono} textAnchor="middle">{fmtTorr(s.chP)}</text>
      {/* 주 배기: 챔버 → GV → 터보 → 포어라인 → 러핑 펌프 */}
      <line x1="130" y1="80" x2="210" y2="80" stroke={s.gv ? on : off} strokeWidth="3" />
      {valve(175, 80, s.gv, 'GV')}
      <rect x="210" y="55" width="80" height="50" rx="8" fill="#132139" stroke={s.turboOn ? C.violet : off} strokeWidth="1.5" />
      <text x="250" y="75" fill={C.violet} fontSize="10.5" fontFamily={C.mono} textAnchor="middle">TURBO</text>
      <text x="250" y="93" fill={C.text} fontSize="10" fontFamily={C.mono} textAnchor="middle">{Math.round(s.turbo)}%</text>
      <line x1="290" y1="80" x2="430" y2="80" stroke={s.flP < ATM_TORR ? on : off} strokeWidth="3" />
      <text x="360" y="72" fill={C.dim} fontSize="9.5" fontFamily={C.mono} textAnchor="middle">FORELINE {fmtTorr(s.flP)}</text>
      <rect x="430" y="55" width="75" height="50" rx="8" fill="#132139" stroke={C.emerald} strokeWidth="1.5" />
      <text x="467" y="76" fill={C.emerald} fontSize="10" fontFamily={C.mono} textAnchor="middle">ROUGHING</text>
      <text x="467" y="92" fill={C.emerald} fontSize="10" fontFamily={C.mono} textAnchor="middle">PUMP</text>
      {/* 러핑 라인: 챔버 → 러핑 밸브 → 러핑 펌프 */}
      <polyline points="75,120 75,160 467,160 467,105" fill="none" stroke={s.rough ? on : off} strokeWidth="3" />
      {valve(250, 160, s.rough, 'ROUGH V')}
      {s.rough && <polygon points="380,155 392,160 380,165" fill={on} />}
      {s.gv && <polygon points="140,75 152,80 140,85" fill={on} />}
    </svg>
  );
}
function PumpDownLab() {
  const [box, apply, reset] = useLab(pdInit, pdTick, 0.1, PD_FIRST);
  const [lock, setLock] = useState(null);
  const { s } = box;
  const press = (b) => {
    const chk = pdCheck(s, b);
    setLock(chk.ok ? null : { btn: b, reason: chk.reason });
    apply((cur) => pdPress(cur, b));
  };
  const phase = pdPhase(s);
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        교재 매뉴얼 순서대로 배기해 보세요: <b>러핑(ROUGH)</b> → 포어라인이 <b>crossover</b> 아래 → <b>TURBO START</b> → <b>AT SPEED</b> → <b>GV OPEN</b> → <b>Base Pressure Reached</b>.
        순서를 어기면 장비가 영어 인터록 사유로 거부합니다. (crossover {CROSSOVER_TORR} Torr 는 이 실습의 가정)
      </p>
      <PumpDownSchematic s={s} />
      <div className="fes-grid2" style={{ marginTop: 10 }}>
        <ReadRow label="Status" value={phase} tone={phase === 'BASE PRESSURE REACHED' ? 'ok' : phase === 'VENTED' ? 'dim' : 'warn'} />
        <ReadRow label="Chamber pressure" value={fmtTorr(s.chP)} tone={s.chP <= 1e-4 ? 'ok' : 'warn'} />
        <ReadRow label="Foreline pressure" value={fmtTorr(s.flP)} tone={s.flP <= CROSSOVER_TORR ? 'ok' : 'warn'} />
        <ReadRow label="Turbo speed" value={`${Math.round(s.turbo)}% · ${Math.round(s.turbo / 100 * TURBO_RPM).toLocaleString('en-US')} rpm${s.turbo >= 100 ? ' · AT SPEED' : ''}`} tone={s.turbo >= 100 ? 'ok' : s.turboOn ? 'warn' : 'dim'} />
      </div>
      <div className="fes-btnrow" style={{ marginTop: 10 }}>
        {PD_BUTTONS.map((b) => {
          const ok = pdCheck(s, b).ok;
          return <button key={b} onClick={() => press(b)} title={ok ? '' : pdCheck(s, b).reason} className={`fes-btn ${ok ? '' : 'locked'}`}>{b}</button>;
        })}
        <button className="fes-btn ghost" onClick={() => { reset(); setLock(null); }}>Reset</button>
      </div>
      {lock && <div className="fes-alarm-bar"><span>⛔ INTERLOCK — {lock.btn}: {lock.reason}</span></div>}
      <LabLog log={box.log} />
    </div>
  );
}

/* ── 6강 · 상태어 판독 ── */
const LAMP_COL = { green: C.emerald, yellow: C.amber, red: C.red };
function StatusWordPanel() {
  const [ci, setCi] = useState(0);
  const [ans, setAns] = useState({});
  const c = STATUS_CASES[ci];
  const a = ans[ci];
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        상태 표시줄의 <b>영어 한 단어</b>와 <b>타워 램프 색</b>만 보고, 지금 장비를 어떻게 다뤄야 하는지 고르세요.
        (교재: 초록 = READY / RUNNING, 노랑 = IDLE / STANDBY / WARNING, 빨강 = ALARM)
      </p>
      <CaseChips cases={STATUS_CASES} idx={ci} setIdx={setCi} label={(x, i) => `TOOL ${i + 1}`}
        mark={(x, i) => (ans[i] == null ? null : ans[i] === x.ans)} />
      <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', flexWrap: 'wrap' }}>
        <div className="fes-dev-status" style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', minWidth: 90 }}>
          <div className="fes-dev-sub">TOWER</div>
          {['red', 'yellow', 'green'].map((col) => (
            <div key={col} style={{
              width: 34, height: 22, borderRadius: 5,
              background: c.lamp === col ? LAMP_COL[col] : '#1a2438',
              boxShadow: c.lamp === col ? `0 0 12px ${LAMP_COL[col]}` : 'none',
              animation: c.lamp === col && c.blink ? 'fesBlink 1s infinite' : 'none',
            }} />
          ))}
        </div>
        <div className="fes-dev-status" style={{ flex: 1, minWidth: 220 }}>
          <div className="fes-dev-sub">STATUS BAR — ETCHER 3</div>
          <div style={{ fontFamily: C.mono, fontSize: 30, fontWeight: 800, color: LAMP_COL[c.lamp], letterSpacing: 2 }}>{c.word}</div>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.text, marginTop: 6 }}>{c.banner}</div>
        </div>
      </div>
      <PickRow prompt="이 장비는 지금?" options={STATUS_CHOICES} picked={a} answer={c.ans} onPick={(id) => setAns((p) => ({ ...p, [ci]: id }))} />
      {a != null && <div style={{ marginTop: 8, fontSize: 12.5, color: a === c.ans ? C.emerald : C.amber }}>{a === c.ans ? '✔ ' : '✘ '}{c.why}</div>}
    </div>
  );
}

/* ── 6강 · ACK → 원인 조치 → RESET ── */
function AckResetLab() {
  const [ci, setCi] = useState(0);
  const [states, setStates] = useState(() => ACK_CASES.map(() => ({ st: ackInit(), log: [] })));
  const c = ACK_CASES[ci];
  const { st, log } = states[ci];
  const act = (a, arg) => setStates((all) => all.map((b, i) => {
    if (i !== ci) return b;
    const r = ackAct(b.st, c, a, arg);
    return { st: r.st, log: [...b.log, ...r.log].slice(-20) };
  }));
  const typed = st.typePick === c.type;
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        알람 코드와 메시지를 읽고 ① <b>종류</b>(interlock / timeout / failure / warning)를 구분 → ② <b>ACK</b>(인지) → ③ <b>원인 조치</b> → ④ <b>RESET</b>.
        원인을 없애기 전에 RESET 을 눌러 보세요 — 무슨 일이 생기는지.
      </p>
      <CaseChips cases={ACK_CASES} idx={ci} setIdx={setCi} label={(x) => x.code}
        mark={(x, i) => (states[i].st.reset ? states[i].st.reraised === 0 && states[i].st.typePick === x.type : null)} />
      <div className="fes-alarm-bar" style={{ marginTop: 0, background: st.reset ? `${C.emerald}14` : undefined, borderColor: st.reset ? `${C.emerald}66` : undefined, color: st.reset ? C.emerald : undefined }}>
        <span>{st.reset ? '✔ CLEARED — ' : st.acked ? '■ ACKED — ' : '⚠ '}{c.code}: {c.msg}<SpeakBtn text={c.msg} title="알람 문장 발음 듣기" /></span>
      </div>
      <div style={{ marginTop: 10, fontSize: 12.5 }}>① 이 알람의 종류는?</div>
      <div className="fes-btnrow" style={{ marginTop: 6 }}>
        {ALARM_TYPES.map((t) => (
          <button key={t} className={`fes-chip ${st.typePick === t ? 'on' : ''}`} disabled={st.reset}
            style={st.typePick === t ? { borderColor: typed ? C.emerald : C.red, color: typed ? C.emerald : C.red } : undefined}
            onClick={() => act('type', t)}>{t}</button>
        ))}
      </div>
      <div className="fes-btnrow" style={{ marginTop: 10 }}>
        <button className="fes-btn" disabled={st.acked || st.reset} onClick={() => act('ack')}>② ACK</button>
        <button className="fes-btn danger" disabled={st.reset} onClick={() => act('reset')}>④ RESET</button>
      </div>
      <div style={{ marginTop: 10, fontSize: 12.5 }}>③ 원인 조치 — 어떤 조치가 이 알람의 원인을 없애는가?</div>
      <div style={{ display: 'grid', gap: 6, marginTop: 6 }}>
        {c.fixes.map((f, i) => (
          <button key={i} className="fes-btn" disabled={st.reset || st.fixed} onClick={() => act('fix', i)}
            style={{ textAlign: 'left', ...(st.fixPick === i ? { borderColor: i === c.fix ? C.emerald : C.red } : null) }}>{f}</button>
        ))}
      </div>
      {st.reset && (
        <div className="fes-ok" style={{ marginTop: 10 }}>
          ✔ 복구 완료 · 종류 {typed ? '정답' : `오답 (정답 ${c.type})`} · 원인 조치 전 RESET {st.reraised}회
        </div>
      )}
      <LabLog log={log} />
    </div>
  );
}

/* ── 6강 · 동시 발생 우선순위 ── */
const KIND_COL = { INTERLOCK: C.red, ALARM: C.red, WARNING: C.amber };
function PriorityHMI() {
  const [box, setBox] = useState(() => ({ s: prioInit(), log: [{ t: 'ALARM', m: 'Multiple events active. Tower lamp RED.' }] }));
  const { s } = box;
  const act = (a, id) => setBox((b) => { const r = prioAct(b.s, a, id); return { s: r.s, log: [...b.log, ...r.log].slice(-30) }; });
  const stCol = s.status === 'READY' ? C.emerald : s.status === 'IDLE' ? C.amber : C.red;
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        세 가지가 <b>동시에</b> 떠 있습니다. 교재 순서 <b>INTERLOCK → ALARM → WARNING</b> 대로 원인 조치(FIX) → RESET 하고,
        마지막에 <b>RECOVERY</b> 로 상태가 <b>READY</b> 로 돌아오는지 확인하세요. 순서를 어기면 실수로 셉니다.
      </p>
      <div className="fes-dev-status" style={{ marginBottom: 10 }}>
        <div className="fes-dev-sub">TOOL STATUS</div>
        <div style={{ fontFamily: C.mono, fontSize: 24, fontWeight: 800, color: stCol }}>{s.status}</div>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {s.items.map((it) => (
          <div key={it.id} className="fes-dev-status" style={{ borderColor: it.cleared ? C.line2 : `${KIND_COL[it.kind]}88`, opacity: it.cleared ? 0.55 : 1 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <b style={{ fontFamily: C.mono, color: it.cleared ? C.dim : KIND_COL[it.kind] }}>{it.kind}</b>
              <span style={{ fontFamily: C.mono, fontSize: 12 }}>{it.code} — {it.msg}<SpeakBtn text={it.msg} title="알람 문장 발음 듣기" /></span>
            </div>
            <div className="fes-btnrow" style={{ marginTop: 8 }}>
              <button className="fes-btn" disabled={it.cleared || it.fixed} onClick={() => act('fix', it.id)}>FIX: {it.fix}</button>
              <button className="fes-btn danger" disabled={it.cleared} onClick={() => act('reset', it.id)}>{it.kind === 'WARNING' ? 'ACK / CLEAR' : 'RESET'}</button>
              {it.cleared && <span style={{ color: C.emerald, fontSize: 12 }}>✔ cleared</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="fes-btnrow" style={{ marginTop: 10, alignItems: 'center' }}>
        <button className="fes-btn" disabled={s.recovered} onClick={() => act('recover')}>RECOVERY → READY</button>
        <button className="fes-btn ghost" onClick={() => setBox({ s: prioInit(), log: [{ t: 'ALARM', m: 'Multiple events active. Tower lamp RED.' }] })}>Reset</button>
        <span style={{ fontSize: 12.5, color: s.mistakes ? C.amber : C.dim }}>순서·절차 실수 {s.mistakes}회</span>
      </div>
      <LabLog log={box.log} />
    </div>
  );
}

/* ── 7강 · PM 부위 ── */
const PM_SPOTS = {
  oring: { x: 150, y: 58, lx: 160, ly: 24 },
  bolt: { x: 72, y: 58, lx: 40, ly: 30 },
  wall: { x: 96, y: 125, lx: 160, ly: 88 },
  gauge: { x: 262, y: 100, lx: 318, ly: 78 },
  oil: { x: 360, y: 190, lx: 360, ly: 225 },
};
function PmPartsLab() {
  const [sel, setSel] = useState('oring');
  const [ans, setAns] = useState({});
  const [leak, setLeak] = useState(null);
  const part = PM_PARTS.find((p) => p.id === sel);
  const a = ans[sel];
  const score = PM_PARTS.filter((p) => ans[p.id] === p.ans).length;
  const hl = (id) => (sel === id ? C.neon : C.line2);
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        챔버 단면에서 부위를 눌러 고르고, 그 부위에 맞는 <b>PM 동작</b>(Inspect / Clean / Replace / Calibrate / Tighten / Lubricate)을 고르세요.
      </p>
      <svg viewBox="0 0 440 240" style={{ width: '100%', maxWidth: 560, height: 'auto', display: 'block', background: '#04070d', borderRadius: 8 }}>
        {/* lid + O-ring */}
        <rect x="60" y="40" width="200" height="14" rx="3" fill="#1a2a44" stroke={hl('oring')} />
        <text x="160" y="51" fill={C.dim} fontSize="8" fontFamily={C.mono} textAnchor="middle">LID</text>
        {/* chamber body */}
        <rect x="80" y="62" width="160" height="120" rx="6" fill="#0e1a2e" stroke={hl('wall')} strokeWidth={sel === 'wall' ? 2.5 : 1.5} onClick={() => setSel('wall')} style={{ cursor: 'pointer' }} />
        <rect x="88" y="70" width="144" height="104" rx="4" fill="none" stroke="#6b5b3e" strokeDasharray="3 3" />
        <text x="160" y="125" fill="#a8977a" fontSize="9" fontFamily={C.mono} textAnchor="middle">polymer deposits</text>
        <rect x="120" y="160" width="80" height="10" rx="2" fill="#1a2a44" />
        <ellipse cx="160" cy="159" rx="36" ry="4" fill="#4f9dde" />
        {/* O-ring (cross-section dots) */}
        {[92, 228].map((x) => <circle key={x} cx={x} cy="58" r="5" fill="#111" stroke={hl('oring')} strokeWidth={sel === 'oring' ? 2.5 : 1.5} onClick={() => setSel('oring')} style={{ cursor: 'pointer' }} />)}
        <rect x="100" y="54" width="120" height="8" fill="transparent" onClick={() => setSel('oring')} style={{ cursor: 'pointer' }} />
        {/* bolts */}
        {[66, 254].map((x) => <rect key={x} x={x - 4} y="34" width="8" height="26" rx="2" fill="#2a3d5f" stroke={hl('bolt')} strokeWidth={sel === 'bolt' ? 2.5 : 1} onClick={() => setSel('bolt')} style={{ cursor: 'pointer' }} />)}
        {/* gauge / MFC */}
        <line x1="240" y1="100" x2="262" y2="100" stroke={C.line2} strokeWidth="3" />
        <circle cx="275" cy="100" r="13" fill="#132139" stroke={hl('gauge')} strokeWidth={sel === 'gauge' ? 2.5 : 1.5} onClick={() => setSel('gauge')} style={{ cursor: 'pointer' }} />
        <text x="275" y="104" fill={C.cyan} fontSize="9" fontFamily={C.mono} textAnchor="middle">PG</text>
        <rect x="262" y="120" width="40" height="18" rx="3" fill="#132139" stroke={hl('gauge')} onClick={() => setSel('gauge')} style={{ cursor: 'pointer' }} />
        <text x="282" y="133" fill={C.cyan} fontSize="9" fontFamily={C.mono} textAnchor="middle">MFC</text>
        {/* pump + oil */}
        <polyline points="160,182 160,205 320,205" fill="none" stroke={C.line2} strokeWidth="3" />
        <rect x="320" y="170" width="80" height="50" rx="6" fill="#132139" stroke={hl('oil')} strokeWidth={sel === 'oil' ? 2.5 : 1.5} onClick={() => setSel('oil')} style={{ cursor: 'pointer' }} />
        <rect x="326" y="200" width="68" height="14" rx="3" fill="#6b4f1e" onClick={() => setSel('oil')} style={{ cursor: 'pointer' }} />
        <text x="360" y="190" fill={C.emerald} fontSize="9" fontFamily={C.mono} textAnchor="middle">DRY/OIL PUMP</text>
        {/* labels */}
        {PM_PARTS.map((p) => {
          const sp = PM_SPOTS[p.id];
          const done = ans[p.id] != null;
          return (
            <text key={p.id} x={sp.lx} y={sp.ly} fill={sel === p.id ? C.neon : done ? (ans[p.id] === p.ans ? C.emerald : C.red) : C.text}
              fontSize="10" fontFamily={C.mono} textAnchor="middle" onClick={() => setSel(p.id)} style={{ cursor: 'pointer' }}>
              {p.en.split(' (')[0]}{done ? (ans[p.id] === p.ans ? ' ✔' : ' ✘') : ''}
            </text>
          );
        })}
      </svg>
      <PickRow prompt={<>선택한 부위: <b>{part.en}</b> — 알맞은 PM 동작은?</>}
        options={PM_ACTIONS.map((x) => ({ id: x, label: x }))} picked={a} answer={part.ans}
        onPick={(x) => setAns((p) => ({ ...p, [sel]: x }))} />
      {a != null && <div style={{ marginTop: 8, fontSize: 12.5, color: a === part.ans ? C.emerald : C.amber }}>{a === part.ans ? '✔ ' : '✘ '}{part.why}</div>}
      <div style={{ marginTop: 6, fontSize: 12, color: C.dim }}>부위 {Object.keys(ans).length} / {PM_PARTS.length} · 정답 {score}</div>
      <PickRow prompt={PM_LEAK_Q.prompt} options={PM_PARTS.map((p) => ({ id: p.id, label: p.en }))} picked={leak} answer={PM_LEAK_Q.ans} onPick={setLeak} />
      {leak != null && <div style={{ marginTop: 8, fontSize: 12.5, color: leak === PM_LEAK_Q.ans ? C.emerald : C.amber }}>{leak === PM_LEAK_Q.ans ? '✔ ' : '✘ '}{PM_LEAK_Q.why}</div>}
    </div>
  );
}

/* ── 7강 · PM 작업 (work order) ── */
function PmWorkOrder() {
  const [box, setBox] = useState(() => ({ s: pmwInit(), log: [{ t: 'INFO', m: 'Work order WO-24117 OPEN — Chamber A quarterly PM. Tool status: DOWN (tagged).' }] }));
  const { s } = box;
  const act = (a, id, arg) => setBox((b) => { const r = pmwAct(b.s, a, id, arg); return { s: r.s, log: [...b.log, ...r.log].slice(-30) }; });
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        <b>PM checklist</b> 입니다. 영어 지시문과 규격(spec)을 읽고, 측정값이 <b>In Spec</b> 이면 <b>PASS</b>, 아니면 <b>FAIL</b>.
        FAIL 항목은 재작업(rework) 후 다시 판정하고, 모두 통과하면 기록하고 <b>work order 를 닫으세요</b>.
      </p>
      <div style={{ display: 'grid', gap: 8 }}>
        {PMW_ITEMS.map((it, n) => {
          const st = s.items.find((x) => x.id === it.id);
          const rd = pmwReading(it, st);
          return (
            <div key={it.id} className="fes-dev-status">
              <div style={{ fontFamily: C.mono, fontSize: 12.5, color: C.text }}>{n + 1}. {it.instr}</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 6, fontSize: 12 }}>
                <span style={{ color: C.dim }}>SPEC: <b style={{ color: C.text }}>{it.spec}</b></span>
                <span style={{ color: C.dim }}>{st.reworked ? 'RE-CHECK' : 'FOUND'}: <b style={{ color: C.cyan }}>{rd.shown}</b></span>
              </div>
              <div className="fes-btnrow" style={{ marginTop: 8, alignItems: 'center' }}>
                {['PASS', 'FAIL'].map((v) => (
                  <button key={v} className={`fes-chip ${st.judged === v ? 'on' : ''}`} disabled={s.closed}
                    style={st.judged === v ? { borderColor: st.correct ? C.emerald : C.red, color: st.correct ? C.emerald : C.red } : undefined}
                    onClick={() => act('judge', it.id, v)}>{v}</button>
                ))}
                {it.rework && !st.reworked && st.judged === 'FAIL' && st.correct && (
                  <button className="fes-btn" onClick={() => act('rework', it.id)}>REWORK: {it.rework}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="fes-btnrow" style={{ marginTop: 10 }}>
        <button className="fes-btn" disabled={s.closed} onClick={() => act('close')}>Record values &amp; CLOSE work order</button>
        <button className="fes-btn ghost" onClick={() => setBox({ s: pmwInit(), log: [{ t: 'INFO', m: 'Work order WO-24117 OPEN — Chamber A quarterly PM. Tool status: DOWN (tagged).' }] })}>Reset</button>
      </div>
      {s.closed && <div className="fes-ok" style={{ marginTop: 10 }}>✔ Work order CLOSED — 모든 항목 In Spec 확인 후 기록 완료.</div>}
      <LabLog log={box.log} title="CMMS LOG" />
    </div>
  );
}

/* ── 7강 · 장비 상태 판독 ── */
function PmStatusPanel() {
  const [ci, setCi] = useState(0);
  const [ans, setAns] = useState({});
  const c = PMS_CASES[ci];
  const j = pmsJudge(c);
  const a = ans[c.id];
  const bad = (cond) => (cond ? C.red : C.emerald);
  const mfcBad = c.mfcSp > 0 && Math.abs(c.mfcAct - c.mfcSp) / c.mfcSp > OOR_FRAC;
  const stCol = c.status === 'UP' ? C.emerald : C.red;
  const pmCol = c.pm === 'DONE' ? C.emerald : c.pm === 'PM DUE' ? C.amber : C.red;
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        장비 HMI 의 <b>status</b>(UP / TOOL DOWN / DOWN), <b>PM 상태</b>(DONE / PM DUE / OVERDUE / IN PROGRESS), <b>setpoint vs actual</b>, 단위(<b>sccm / mTorr / N·m</b>)를 읽고
        <b> 지금 이 장비를 가동해도 되는가</b>를 판정하세요.
      </p>
      <CaseChips cases={PMS_CASES} idx={ci} setIdx={setCi} label={(x) => `TOOL ${x.id}`}
        mark={(x) => (ans[x.id] == null ? null : ans[x.id] === (pmsJudge(x).ok ? 'yes' : 'no'))} />
      <div className="fes-dev-grid">
        <div className="fes-dev-led"><div className="fes-dev-led-label">TOOL STATUS</div><div className="fes-dev-led-val" style={{ fontSize: 17, color: stCol, textShadow: 'none' }}>{c.status}</div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">PM STATUS</div><div className="fes-dev-led-val" style={{ fontSize: 17, color: pmCol, textShadow: 'none' }}>{c.pm}</div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">BASE PRESSURE (LIMIT {c.limit} mTorr)</div><div className="fes-dev-led-val" style={{ fontSize: 17, color: bad(c.base > c.limit), textShadow: 'none' }}>{c.base >= 1000 ? '760' : c.base}<span className="fes-dev-led-unit">{c.base >= 1000 ? 'Torr' : 'mTorr'}</span></div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">MFC-1 SET / ACTUAL</div><div className="fes-dev-led-val" style={{ fontSize: 17, color: bad(mfcBad), textShadow: 'none' }}>{c.mfcSp} / {c.mfcAct}<span className="fes-dev-led-unit">sccm</span></div></div>
        <div className="fes-dev-led"><div className="fes-dev-led-label">LID BOLT TORQUE (SPEC 8 N·m)</div><div className="fes-dev-led-val" style={{ fontSize: 17, color: c.torque == null ? C.dim : C.emerald, textShadow: 'none' }}>{c.torque == null ? '—' : c.torque.toFixed(1)}<span className="fes-dev-led-unit">N·m</span></div></div>
      </div>
      <PickRow prompt="지금 이 장비를 가동해도 되는가?" options={[{ id: 'yes', label: '가동 가능' }, { id: 'no', label: '가동 불가' }]}
        picked={a} answer={j.ok ? 'yes' : 'no'} onPick={(id) => setAns((p) => ({ ...p, [c.id]: id }))} />
      {a != null && (
        <ul style={{ marginTop: 8, fontSize: 12.5, color: a === (j.ok ? 'yes' : 'no') ? C.emerald : C.amber, paddingLeft: 18 }}>
          {j.reasons.map((r) => <li key={r}>{r}</li>)}
        </ul>
      )}
    </div>
  );
}

/* =========================================================================
 * 강별 조작 실습 (1·14강)
 *   1강 tool       : 장비 전체 평면도 — 부품 확인 + 영어 문장이 가리키는 위치 찾기
 *   1강 chamberHmi : 챔버 HMI — 상태·압력·온도·알람을 바꾸며 OPEN DOOR / START 판단
 *   14강 shiftLog  : 인수인계 로그 — 가동 가능 판정 + 로그 줄 P/C/A/R 분류
 *   14강 triage    : DRC 결과 Critical / Minor 분류 + Problem 문장
 *   14강 pcar      : P/C/A/R 보고서 — 문장 분류 + 한 문장 요약
 * ====================================================================== */

/* ── 1강 · 장비 전체 평면도 ── */
function ToolLayoutLab() {
  const [sel, setSel] = useState('lp');
  const [mode, setMode] = useState('learn');   // learn | find
  const [qi, setQi] = useState(0);
  const [picks, setPicks] = useState({});
  const part = TOOL_PARTS.find((p) => p.id === sel);
  const q = TOOL_FIND[qi];
  const click = (id) => {
    if (mode === 'learn') { setSel(id); return; }
    if (picks[qi] != null) return;
    setPicks((p) => ({ ...p, [qi]: id }));
  };
  const hl = (id) => {
    if (mode === 'learn') return sel === id ? C.neon : C.line2;
    const p = picks[qi];
    if (p == null) return C.line2;
    if (id === q.ans) return C.emerald;
    return id === p ? C.red : C.line2;
  };
  const box = (id, x, y, w, h, label, sub) => (
    <g key={`${id}${x}${y}`} onClick={() => click(id)} style={{ cursor: 'pointer' }}>
      <rect x={x} y={y} width={w} height={h} rx="7" fill="#0e1a2e" stroke={hl(id)} strokeWidth={hl(id) === C.line2 ? 1.4 : 2.6} />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 3 : -4)} fill={C.text} fontSize="11" fontFamily={C.mono} textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 12} fill={C.dim} fontSize="9" fontFamily={C.mono} textAnchor="middle">{sub}</text>}
    </g>
  );
  const valve = (x, y, rot) => (
    <g key={`v${x}${y}`} onClick={() => click('valve')} style={{ cursor: 'pointer' }} transform={`rotate(${rot} ${x} ${y})`}>
      <rect x={x - 14} y={y - 4} width="28" height="8" rx="2" fill="#132139" stroke={hl('valve')} strokeWidth={hl('valve') === C.line2 ? 1.2 : 2.4} />
    </g>
  );
  const pump = (x, y) => (
    <g key={`p${x}${y}`} onClick={() => click('pump')} style={{ cursor: 'pointer' }}>
      <circle cx={x} cy={y} r="11" fill="#132139" stroke={hl('pump')} strokeWidth={hl('pump') === C.line2 ? 1.2 : 2.4} />
      <text x={x} y={y + 3} fill={C.emerald} fontSize="8" fontFamily={C.mono} textAnchor="middle">P</text>
    </g>
  );
  const done = Object.keys(picks).length;
  const score = TOOL_FIND.filter((x, i) => picks[i] === x.ans).length;
  return (
    <div>
      <div className="fes-casebar">
        <button className={`fes-chip ${mode === 'learn' ? 'on' : ''}`} onClick={() => setMode('learn')}>① 부품 익히기</button>
        <button className={`fes-chip ${mode === 'find' ? 'on' : ''}`} onClick={() => setMode('find')}>② 영어 문장 → 위치 찾기</button>
      </div>
      <svg viewBox="0 0 560 300" style={{ width: '100%', height: 'auto', display: 'block', background: '#04070d', borderRadius: 8 }}>
        <text x="12" y="18" fill={C.dim} fontSize="10" fontFamily={C.mono}>CLUSTER TOOL — TOP VIEW</text>
        {box('lp', 20, 60, 70, 56, 'LOAD', 'PORT 1')}
        {box('lp', 20, 170, 70, 56, 'LOAD', 'PORT 2')}
        {box('efem', 100, 50, 60, 186, 'EFEM', 'ATM robot')}
        {box('ll', 180, 80, 70, 50, 'LOAD', 'LOCK A')}
        {box('ll', 180, 160, 70, 50, 'LOAD', 'LOCK B')}
        {box('tm', 290, 90, 110, 110, 'TRANSFER', 'MODULE')}
        {box('pm', 300, 18, 90, 52, 'PM1', 'chamber')}
        {box('pm', 430, 110, 90, 70, 'PM2', 'chamber')}
        {box('pm', 300, 222, 90, 52, 'PM3', 'chamber')}
        {valve(345, 80, 0)}{valve(345, 210, 0)}{valve(413, 145, 90)}
        {valve(268, 105, 90)}{valve(268, 185, 90)}
        {pump(510, 70)}{pump(215, 265)}
        <line x1="510" y1="81" x2="490" y2="110" stroke={C.line2} strokeWidth="2" />
        <line x1="215" y1="254" x2="215" y2="210" stroke={C.line2} strokeWidth="2" />
      </svg>
      {mode === 'learn' ? (
        <div className="fes-dev-status" style={{ marginTop: 10 }}>
          <div style={{ fontFamily: C.mono, fontWeight: 800, color: C.neon }}>{part.en} <span style={{ color: C.dim, fontWeight: 400 }}>· {part.ko}</span></div>
          <div style={{ fontSize: 12.5, marginTop: 4 }}>{part.d}</div>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.cyan, marginTop: 6 }}>e.g. {part.ex}</div>
        </div>
      ) : (
        <div className="fes-dev-status" style={{ marginTop: 10 }}>
          <div className="fes-dev-sub">SENTENCE {qi + 1} / {TOOL_FIND.length}</div>
          <div style={{ fontFamily: C.mono, fontSize: 14, color: C.text }}>{q.en}</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>이 문장이 가리키는 곳을 도면에서 누르세요.</div>
          {picks[qi] != null && (
            <div style={{ marginTop: 6, fontSize: 12.5, color: picks[qi] === q.ans ? C.emerald : C.amber }}>
              {picks[qi] === q.ans ? '✔ ' : `✘ 정답은 ${TOOL_PARTS.find((p) => p.id === q.ans).en}. `}
              {TOOL_PARTS.find((p) => p.id === q.ans).d}
            </div>
          )}
          <div className="fes-btnrow" style={{ marginTop: 8, alignItems: 'center' }}>
            <button className="fes-btn ghost" disabled={qi === 0} onClick={() => setQi(qi - 1)}>◀</button>
            <button className="fes-btn" disabled={qi === TOOL_FIND.length - 1} onClick={() => setQi(qi + 1)}>다음 문장 ▶</button>
            <span style={{ fontSize: 12, color: C.dim }}>푼 문장 {done} / {TOOL_FIND.length} · 정답 {score}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── 1강 · 챔버 HMI ── */
const CHM_FIRST = { t: 'INFO', m: 'STATUS: IDLE. Chamber under vacuum. Door CLOSED.' };
const CHM_ALARM_COL = { NONE: C.emerald, WARNING: C.amber, ALARM: C.red };
function ChamberHmiLab() {
  const [box, setBox] = useState(() => ({ s: chmInit(), log: [CHM_FIRST] }));
  const [lock, setLock] = useState(null);
  const { s } = box;
  const act = (a) => {
    const c = chmCheck(s, a);
    setLock(c.ok ? null : { a, reason: c.reason });
    setBox((b) => { const r = chmAct(b.s, a); return { s: r.s, log: [...b.log, ...r.log].slice(-30) }; });
  };
  const set = (k, v, msg) => setBox((b) => ({ s: { ...b.s, [k]: v }, log: [...b.log, { t: v === 'ALARM' ? 'ALARM' : 'INFO', m: msg }].slice(-30) }));
  const pr = chmPressure(s);
  const tempOk = Math.abs(s.tempPv - CHM_TEMP_SP) / CHM_TEMP_SP <= 0.1;
  return (
    <div style={{ marginTop: 12 }}>
      <p className="fes-wk-quiz-intro">
        아래 값을 바꿔 가며 <b>OPEN DOOR</b> 와 <b>START</b> 를 눌러 보세요. 안 되는 순간에는 장비가 <b>영어 사유</b>로 거부합니다.
        진공 상태에서 벤트 없이 문을 열어 보세요.
      </p>
      <div className="fes-dev-row" style={{ marginTop: 0 }}>
        <div className="fes-dev-status">
          <div className="fes-dev-sub">CHAMBER A — MAIN</div>
          <div style={{ fontFamily: C.mono, fontSize: 22, fontWeight: 800, color: s.status === 'PROCESSING' ? C.emerald : C.amber }}>{s.status}</div>
          <div className="fes-grid2" style={{ marginTop: 8 }}>
            <ReadRow label="Pressure SP / PV" value={`${pr.sp} / ${pr.pv} ${pr.unit}`} tone={s.vac ? 'ok' : 'warn'} />
            <ReadRow label="Temperature SP / PV" value={`${CHM_TEMP_SP} / ${s.tempPv} °C`} tone={tempOk ? 'ok' : 'warn'} />
            <ReadRow label="Door" value={s.door} tone={s.door === 'OPEN' ? 'warn' : 'ok'} />
            <ReadRow label="Alarm" value={s.alarm} tone={s.alarm === 'NONE' ? 'ok' : s.alarm === 'WARNING' ? 'warn' : 'bad'} />
          </div>
        </div>
        <div className="fes-dev-status">
          <div className="fes-dev-sub">바꿔 보기 (훈련용)</div>
          <div style={{ fontSize: 11.5, color: C.dim, margin: '2px 0 4px' }}>Temperature PV</div>
          <div className="fes-btnrow">
            {[25, 180, 250].map((v) => <button key={v} className={`fes-chip ${s.tempPv === v ? 'on' : ''}`} onClick={() => set('tempPv', v, `Temperature PV → ${v} °C`)}>{v} °C</button>)}
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, margin: '8px 0 4px' }}>Alarm banner</div>
          <div className="fes-btnrow">
            {['NONE', 'WARNING', 'ALARM'].map((v) => (
              <button key={v} className={`fes-chip ${s.alarm === v ? 'on' : ''}`} style={s.alarm === v ? { borderColor: CHM_ALARM_COL[v], color: CHM_ALARM_COL[v] } : undefined}
                onClick={() => set('alarm', v, v === 'NONE' ? 'Alarm cleared.' : `${v}: ${v === 'ALARM' ? 'Chamber pressure out of range' : 'Chamber temperature approaching upper limit'}`)}>{v}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="fes-btnrow" style={{ marginTop: 10 }}>
        {['OPEN DOOR', 'CLOSE DOOR', 'VENT', 'PUMP DOWN', 'START', 'STOP'].map((a) => {
          const ok = chmCheck(s, a).ok;
          return <button key={a} onClick={() => act(a)} title={ok ? '' : chmCheck(s, a).reason} className={`fes-btn ${a === 'STOP' ? 'danger' : ''} ${ok ? '' : 'locked'}`}>{a}</button>;
        })}
        <button className="fes-btn ghost" onClick={() => { setBox({ s: chmInit(), log: [CHM_FIRST] }); setLock(null); }}>Reset</button>
      </div>
      {lock && <div className="fes-alarm-bar"><span>⛔ {lock.a}: {lock.reason}</span></div>}
      <LabLog log={box.log} />
    </div>
  );
}

/* ── 14강 · 인수인계 로그 ── */
const PCAR_COL = { Problem: C.red, Cause: C.amber, Action: C.cyan, Result: C.emerald };
const BANNER_COL = { UP: C.emerald, IDLE: C.amber, DOWN: C.red };
function ShiftLogLab() {
  const [ti, setTi] = useState(0);
  const [op, setOp] = useState({});
  const [tags, setTags] = useState({});
  const t = SHIFT_TOOLS[ti];
  const tagged = t.lines.filter((l, i) => tags[`${t.id}${i}`] != null).length;
  const right = t.lines.filter((l, i) => tags[`${t.id}${i}`] === l.k).length;
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        야간 근무자가 남긴 장비별 화면입니다. ① 상단 <b>배너(UP / DOWN / IDLE)</b>와 로그를 읽고 <b>지금 가동 가능한지</b> 판정,
        ② 로그 줄마다 <b>Problem · Cause · Action · Result</b> 중 무엇인지 고르세요.
      </p>
      <CaseChips cases={SHIFT_TOOLS} idx={ti} setIdx={setTi} label={(x) => x.name}
        mark={(x) => (op[x.id] == null ? null : op[x.id] === (x.ok ? 'yes' : 'no'))} />
      <div className="fes-dev-status">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: C.mono, fontSize: 13 }}>{t.name}</span>
          <span style={{ fontFamily: C.mono, fontSize: 22, fontWeight: 800, color: BANNER_COL[t.banner] }}>TOOL {t.banner}</span>
        </div>
        <div style={{ fontFamily: C.mono, fontSize: 11.5, color: t.alarmCleared ? C.dim : C.red, marginTop: 4 }}>
          ALARM: {t.alarmCleared ? 'no active alarm on HMI' : 'active'}
        </div>
        <div className="fes-log" style={{ marginTop: 8, maxHeight: 'none' }}>
          {t.lines.map((l, i) => {
            const k = `${t.id}${i}`;
            const pick = tags[k];
            return (
              <div key={k} style={{ padding: '6px 0', borderBottom: `1px solid ${C.line}` }}>
                <div className="fes-logrow"><span className="fes-tag fes-tag-info">{l.t}</span><span>{l.m}</span></div>
                <div className="fes-btnrow" style={{ marginTop: 4 }}>
                  {PCAR.map((c) => {
                    const on = pick === c;
                    const col = pick == null ? undefined : c === l.k ? PCAR_COL[c] : on ? C.red : undefined;
                    return <button key={c} className={`fes-chip ${on ? 'on' : ''}`} disabled={pick != null}
                      style={col ? { borderColor: col, color: col, opacity: 1 } : undefined}
                      onClick={() => setTags((p) => ({ ...p, [k]: c }))}>{c}</button>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 12, color: C.dim, marginTop: 6 }}>분류 {tagged} / {t.lines.length} · 정답 {right}</div>
      </div>
      <PickRow prompt="이 장비를 지금 가동해도 되는가?" options={[{ id: 'yes', label: '가동 가능' }, { id: 'no', label: '가동 불가' }]}
        picked={op[t.id]} answer={t.ok ? 'yes' : 'no'} onPick={(id) => setOp((p) => ({ ...p, [t.id]: id }))} />
      {op[t.id] != null && <div style={{ marginTop: 8, fontSize: 12.5, color: op[t.id] === (t.ok ? 'yes' : 'no') ? C.emerald : C.amber }}>{t.why}</div>}
    </div>
  );
}

/* ── 14강 · DRC 결과 분류 ── */
function DrcTriageLab() {
  const [sev, setSev] = useState({});
  const [prob, setProb] = useState(null);
  const done = Object.keys(sev).length;
  const right = TRIAGE_ROWS.filter((r, i) => sev[i] === r.sev).length;
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        DRC 결과 화면입니다. 각 위반(violation)을 읽고 <b>Critical</b>(tape-out 전 반드시 수정 — 단락·단선 위험) 인지
        <b> Minor</b>(권고·DFM 지침, 모니터링 수준) 인지 고른 뒤, 보고문 <b>Problem</b> 줄을 고르세요.
        (교재의 Critical / Minor 정의를 설계 검증에 옮긴 이 실습의 기준)
      </p>
      <div className="fes-drc-out">
        <div className="fes-scr-title">DRC REPORT — TOP_CELL · 5 results</div>
        {TRIAGE_ROWS.map((r, i) => (
          <div key={r.rule} className="fes-viol" style={{ borderColor: sev[i] == null ? undefined : sev[i] === r.sev ? `${C.emerald}88` : `${C.red}88` }}>
            <div className="fes-viol-head">✕ {r.rule} <span style={{ color: C.dim, fontWeight: 400 }}>· layer {r.layer}</span></div>
            <div className="fes-viol-body">Measured {r.meas} — Required {r.req} ({r.note})</div>
            <div className="fes-btnrow" style={{ marginTop: 6 }}>
              {['Critical', 'Minor'].map((v) => (
                <button key={v} className={`fes-chip ${sev[i] === v ? 'on' : ''}`} disabled={sev[i] != null}
                  style={sev[i] == null ? undefined : v === r.sev ? { borderColor: C.emerald, color: C.emerald, opacity: 1 } : sev[i] === v ? { borderColor: C.red, color: C.red, opacity: 1 } : undefined}
                  onClick={() => setSev((p) => ({ ...p, [i]: v }))}>{v}</button>
              ))}
            </div>
            {sev[i] != null && <div style={{ fontSize: 12, marginTop: 4, color: sev[i] === r.sev ? C.dim : C.amber }}>→ {r.why}</div>}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginTop: 6 }}>분류 {done} / {TRIAGE_ROWS.length} · 정답 {right}</div>
      <PickRow prompt={TRIAGE_PROBLEM.prompt} options={TRIAGE_PROBLEM.opts.map((o, i) => ({ id: i, label: o }))}
        picked={prob} answer={TRIAGE_PROBLEM.ans} onPick={setProb} />
      {prob != null && <div style={{ marginTop: 8, fontSize: 12.5, color: prob === TRIAGE_PROBLEM.ans ? C.emerald : C.amber }}>{TRIAGE_PROBLEM.why}</div>}
    </div>
  );
}

/* ── 14강 · P/C/A/R 보고서 ── */
function PcarReportLab() {
  const [tags, setTags] = useState({});
  const [sum, setSum] = useState(null);
  const done = Object.keys(tags).length;
  const right = PCAR_SENTENCES.filter((x, i) => tags[i] === x.k).length;
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        Chamber A 사건 보고서의 문장이 뒤섞여 있습니다. 신호어(<b>spiked / traced to / aborted / pending</b> …)를 보고 각 문장을
        <b> Problem / Cause / Action / Result</b> 칸으로 보낸 뒤, 구두 보고 첫 문장으로 쓸 요약을 고르세요.
      </p>
      <div style={{ display: 'grid', gap: 6 }}>
        {PCAR_SENTENCES.map((x, i) => (
          <div key={i} className="fes-dev-status" style={{ padding: '8px 12px', borderColor: tags[i] == null ? C.line2 : tags[i] === x.k ? `${C.emerald}88` : `${C.red}88` }}>
            <div style={{ fontFamily: C.mono, fontSize: 12.5 }}>{x.m}</div>
            <div className="fes-btnrow" style={{ marginTop: 5 }}>
              {PCAR.map((c) => (
                <button key={c} className={`fes-chip ${tags[i] === c ? 'on' : ''}`} disabled={tags[i] != null}
                  style={tags[i] == null ? undefined : c === x.k ? { borderColor: PCAR_COL[c], color: PCAR_COL[c], opacity: 1 } : tags[i] === c ? { borderColor: C.red, color: C.red, opacity: 1 } : undefined}
                  onClick={() => setTags((p) => ({ ...p, [i]: c }))}>{c}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {done === PCAR_SENTENCES.length && (
        <div className="fes-report" style={{ marginTop: 10 }}>
          {PCAR.map((c) => (
            <div key={c} className="fes-report-field">
              <label className="fes-report-label" style={{ color: PCAR_COL[c] }}>{c.toUpperCase()}:</label>
              <div style={{ fontFamily: C.mono, fontSize: 12.5 }}>{PCAR_SENTENCES.filter((x) => x.k === c).map((x) => x.m).join(' ')}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ fontSize: 12, color: C.dim, marginTop: 6 }}>분류 {done} / {PCAR_SENTENCES.length} · 정답 {right}{done === PCAR_SENTENCES.length ? ' — 위는 올바른 칸으로 정리한 보고서' : ''}</div>
      <PickRow prompt={PCAR_SUMMARY.prompt} options={PCAR_SUMMARY.opts.map((o, i) => ({ id: i, label: o }))}
        picked={sum} answer={PCAR_SUMMARY.ans} onPick={setSum} />
      {sum != null && <div style={{ marginTop: 8, fontSize: 12.5, color: sum === PCAR_SUMMARY.ans ? C.emerald : C.amber }}>{PCAR_SUMMARY.why}</div>}
    </div>
  );
}

/* =========================================================================
 * 강별 조작 실습 (9~13강 — 설계)
 *   9강 stack / readDrc · 10강 masks / drcReport · 11강 enclosure / checkRules
 *   12강 layerColor / counts · 13강 netlist / lvsFix
 * ====================================================================== */

const LAYER_FILL = { sub: '#3a2f1e', well: '#6b4f1e', active: '#2f7d4f', gox: '#e5e7eb', poly: '#f87171', contact: '#94a3b8', metal: '#3b82f6' };
const Feedback = ({ ok, children }) => <div style={{ marginTop: 6, fontSize: 12.5, color: ok ? C.emerald : C.amber }}>{ok ? '✔ ' : '✘ '}{children}</div>;
const ChipPick = ({ opts, picked, answer, onPick, labelOf = (x) => x }) => (
  <div className="fes-btnrow" style={{ marginTop: 5 }}>
    {opts.map((o) => {
      const done = picked != null;
      const col = !done ? undefined : o === answer ? C.emerald : o === picked ? C.red : undefined;
      return <button key={String(o)} className={`fes-chip ${picked === o ? 'on' : ''}`} disabled={done}
        style={col ? { borderColor: col, color: col, opacity: 1 } : undefined} onClick={() => onPick(o)}>{labelOf(o)}</button>;
    })}
  </div>
);

/* ── 9강 · 단면 쌓기 ── */
function StackLab() {
  const [built, setBuilt] = useState([]);
  const [msg, setMsg] = useState({ ok: true, m: 'Start from the bottom. Which layer comes first?' });
  const [miss, setMiss] = useState(0);
  const order = useMemo(() => [...STACK].sort((a, b) => a.en.localeCompare(b.en)), []);
  const press = (id) => {
    const r = stackPress(built, id);
    setBuilt(r.built); setMsg({ ok: r.ok, m: r.msg }); if (!r.ok) setMiss((n) => n + 1);
  };
  const has = (id) => built.includes(id);
  return (
    <div>
      <p className="fes-wk-quiz-intro">아래 버튼(알파벳순)에서 층을 <b>아래부터 위로</b> 하나씩 눌러 MOSFET 단면을 쌓으세요. 순서를 어기면 무엇을 먼저 놓아야 하는지 영어로 알려 줍니다.</p>
      <svg viewBox="0 0 600 230" style={{ width: '100%', maxWidth: 680, height: 'auto', display: 'block', background: '#04070d', borderRadius: 8 }}>
        {has('sub') && <rect x="20" y="170" width="380" height="50" fill={LAYER_FILL.sub} />}
        {has('well') && <rect x="40" y="140" width="340" height="42" rx="8" fill={LAYER_FILL.well} />}
        {has('active') && <>{[70, 270].map((x) => <rect key={x} x={x} y="140" width="80" height="18" fill={LAYER_FILL.active} />)}</>}
        {has('gox') && <rect x="160" y="134" width="100" height="6" fill={LAYER_FILL.gox} />}
        {has('poly') && <rect x="165" y="104" width="90" height="30" fill={LAYER_FILL.poly} />}
        {has('contact') && <>{[100, 300, 200].map((x, i) => <rect key={x} x={x} y={i === 2 ? 70 : 70} width="20" height={i === 2 ? 34 : 70} fill={LAYER_FILL.contact} />)}</>}
        {has('metal') && <>{[80, 280, 180].map((x) => <rect key={x} x={x} y="48" width="60" height="22" fill={LAYER_FILL.metal} />)}</>}
        {STACK.map((l, i) => has(l.id) && (
          <text key={l.id} x="418" y={205 - i * 26} fill={C.text} fontSize="11" fontFamily={C.mono}>{i + 1}. {l.en} ({l.abbr})</text>
        ))}
      </svg>
      <div className="fes-btnrow" style={{ marginTop: 10 }}>
        {order.map((l) => <button key={l.id} className="fes-btn" disabled={has(l.id)} onClick={() => press(l.id)}>{l.en}</button>)}
        <button className="fes-btn ghost" onClick={() => { setBuilt([]); setMiss(0); setMsg({ ok: true, m: 'Start from the bottom. Which layer comes first?' }); }}>Reset</button>
      </div>
      <div style={{ marginTop: 8, fontFamily: C.mono, fontSize: 12.5, color: msg.ok ? C.emerald : C.amber }}>{msg.m}</div>
      {built.length === STACK.length && (
        <div className="fes-ok" style={{ marginTop: 8 }}>
          ✔ 완성 · 순서 실수 {miss}회 — substrate → well → active → gate oxide → poly → contact → metal
          <div style={{ color: C.dim, marginTop: 4 }}>{STACK.map((l) => `${l.abbr} = ${l.ko}`).join(' · ')}</div>
        </div>
      )}
    </div>
  );
}

/* ── 9강 · DRC 결과 읽기 ── */
function ReadDrcLab() {
  const [ans, setAns] = useState({});
  const set = (i, k, v) => setAns((p) => ({ ...p, [`${i}${k}`]: v }));
  return (
    <div>
      <p className="fes-wk-quiz-intro">DRC 결과 줄마다 <b>위반 종류</b>(spacing / width)와 <b>어느 layer</b> 인지 고르세요. 형식: <code>[severity] rule : description @ (x, y) LAYER</code> (값은 이 실습의 예시)</p>
      <div className="fes-drc-out">
        <div className="fes-scr-title">DRC RESULTS — 4 errors</div>
        {READ_DRC.map((x, i) => {
          const t = ans[`${i}t`]; const l = ans[`${i}l`];
          return (
            <div key={i} className="fes-viol">
              <div className="fes-viol-body" style={{ fontFamily: C.mono }}>{x.line}</div>
              <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6 }}>위반 종류</div>
              <ChipPick opts={['Spacing', 'Width']} picked={t} answer={x.type} onPick={(v) => set(i, 't', v)} />
              <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6 }}>layer</div>
              <ChipPick opts={READ_DRC_LAYERS} picked={l} answer={x.layer} onPick={(v) => set(i, 'l', v)} />
              {t != null && l != null && <Feedback ok={t === x.type && l === x.layer}>{x.why}</Feedback>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 10강 · 마스크 층과 규칙표 ── */
const MASK_COL = { AA: '#2f7d4f', PO: '#f87171', CO: '#e5e7eb', M1: '#3b82f6', V1: '#fbbf24', M2: '#c084fc' };
function MaskLab() {
  const [vis, setVis] = useState(() => Object.fromEntries(MASK_LAYERS.map((l) => [l.id, true])));
  const [sel, setSel] = useState('M1');
  const [qa, setQa] = useState({});
  const op = (id) => (vis[id] ? (sel === id ? 0.95 : 0.55) : 0);
  const st = (id) => (sel === id ? { stroke: '#fff', strokeWidth: 1.5 } : {});
  return (
    <div>
      <p className="fes-wk-quiz-intro">층 이름을 눌러 <b>선택</b>하면 그 층의 규칙이 표에서 강조되고, 체크박스로 층을 <b>켜고 끌</b> 수 있습니다. (표의 '예시' 값은 이 실습에서 정한 값)</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: 10 }} className="fes-mask-grid">
        <svg viewBox="0 0 300 220" style={{ width: '100%', height: 'auto', background: '#04070d', borderRadius: 8 }}>
          <rect x="40" y="60" width="220" height="50" fill={MASK_COL.AA} opacity={op('AA')} {...st('AA')} />
          <rect x="40" y="140" width="220" height="50" fill={MASK_COL.AA} opacity={op('AA')} {...st('AA')} />
          <rect x="140" y="40" width="20" height="170" fill={MASK_COL.PO} opacity={op('PO')} {...st('PO')} />
          {[[70, 78], [220, 78], [70, 158], [220, 158], [140, 20]].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="14" height="14" fill={MASK_COL.CO} opacity={op('CO')} {...st('CO')} />)}
          <rect x="60" y="70" width="34" height="130" fill={MASK_COL.M1} opacity={op('M1')} {...st('M1')} />
          <rect x="210" y="70" width="34" height="130" fill={MASK_COL.M1} opacity={op('M1')} {...st('M1')} />
          <rect x="120" y="10" width="60" height="30" fill={MASK_COL.M1} opacity={op('M1')} {...st('M1')} />
          <rect x="220" y="120" width="14" height="14" fill={MASK_COL.V1} opacity={op('V1')} {...st('V1')} />
          <rect x="200" y="114" width="90" height="26" fill={MASK_COL.M2} opacity={op('M2') * 0.8} {...st('M2')} />
        </svg>
        <div>
          {MASK_LAYERS.map((l) => (
            <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <input type="checkbox" checked={vis[l.id]} onChange={(e) => setVis((v) => ({ ...v, [l.id]: e.target.checked }))} />
              <span style={{ width: 12, height: 12, background: MASK_COL[l.id], borderRadius: 2 }} />
              <button className={`fes-chip ${sel === l.id ? 'on' : ''}`} onClick={() => setSel(l.id)}>{l.name}</button>
              <span style={{ fontFamily: C.mono, fontSize: 11, color: C.dim }}>{l.abbr}{vis[l.id] ? '' : ' · hidden'}</span>
            </div>
          ))}
        </div>
      </div>
      <table className="fes-tbl" style={{ marginTop: 10 }}>
        <tbody>
          <tr style={{ color: C.dim }}><td>RULE</td><td>DESCRIPTION</td><td>VALUE</td><td>출처</td></tr>
          {RULE_TABLE.map((r) => (
            <tr key={r.code} style={{ background: r.layer === sel ? `${C.cyan}18` : undefined, opacity: r.layer === sel ? 1 : 0.55 }}>
              <td>{r.code}</td><td style={{ fontFamily: C.sans }}>{r.desc}</td><td>{r.val}</td><td style={{ fontFamily: C.sans, color: C.dim }}>{r.src}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12, fontSize: 12.5 }}>규칙 코드 읽기 — <b>층.유형.번호</b> (W = width, S = space, E = enclosure/extension)</div>
      {RULE_CODE_Q.map((q, i) => (
        <div key={q.code} style={{ marginTop: 6 }}>
          <span style={{ fontFamily: C.mono, color: C.cyan }}>{q.code}</span>
          <ChipPick opts={q.opts.map((_, k) => k)} picked={qa[i]} answer={q.ans} labelOf={(k) => q.opts[k]} onPick={(k) => setQa((p) => ({ ...p, [i]: k }))} />
        </div>
      ))}
    </div>
  );
}

/* ── 10강 · DRC 리포트 ── */
const STATUS_COL = { ERROR: C.red, WARNING: C.amber, WAIVED: C.dim };
function DrcReportLab() {
  const [pick, setPick] = useState({});
  const [q, setQ] = useState(null);
  return (
    <div>
      <p className="fes-wk-quiz-intro">리포트의 <b>status</b>(ERROR / WARNING / WAIVED)와 layer·rule·measured 를 읽고 행마다 처리 방법을 고르세요. 교재: <b>error = must fix, warning = review, waived = approved exception</b>.</p>
      <div style={{ overflowX: 'auto' }}>
        <table className="fes-tbl" style={{ minWidth: 620 }}>
          <tbody>
            <tr style={{ color: C.dim }}><td>LAYER</td><td>RULE</td><td>MEASURED</td><td>REQUIRED</td><td>STATUS</td><td>처리</td></tr>
            {DRC_REPORT_ROWS.map((r, i) => (
              <tr key={i}>
                <td>{r.layer}</td><td>{r.rule}</td><td>{r.meas}</td><td>{r.req}</td>
                <td style={{ color: STATUS_COL[r.status], fontWeight: 700 }}>{r.status}</td>
                <td style={{ fontFamily: C.sans }}>
                  <ChipPick opts={REPORT_ACTIONS.map((a) => a.id)} picked={pick[i]} answer={r.ans}
                    labelOf={(id) => REPORT_ACTIONS.find((a) => a.id === id).label} onPick={(id) => setPick((p) => ({ ...p, [i]: id }))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PickRow prompt={DRC_CLEAN_Q.prompt} options={DRC_CLEAN_Q.opts.map((o, i) => ({ id: i, label: o }))} picked={q} answer={DRC_CLEAN_Q.ans} onPick={setQ} />
      {q != null && <Feedback ok={q === DRC_CLEAN_Q.ans}>{DRC_CLEAN_Q.why}</Feedback>}
    </div>
  );
}

/* ── 11강 · 비아 enclosure ── */
function EnclosureLab() {
  const [vis, setVis] = useState({ M1: true, VIA: true, M2: false });
  const [sel, setSel] = useState('V-A');
  const [ans, setAns] = useState({});
  const S = 400; // px per μm
  const via = 0.20;
  const pos = { 'V-A': 60, 'V-B': 190, 'V-C': 320 };
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        <b>M1 / VIA / M2</b> 를 켜고 끄며 각 비아를 누르세요. 비아는 아래 금속(M1)이 <b>네 방향 모두 {ENC_MIN} μm 이상</b> 감싸야 합니다(교재).
        비아마다 OK / VIOLATION 을 판정하세요.
      </p>
      <div className="fes-btnrow" style={{ marginBottom: 8 }}>
        {['M1', 'VIA', 'M2'].map((k) => (
          <label key={k} className="fes-chip" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            <input type="checkbox" checked={vis[k]} onChange={(e) => setVis((v) => ({ ...v, [k]: e.target.checked }))} />{k} {vis[k] ? 'visible' : 'hidden'}
          </label>
        ))}
      </div>
      <svg viewBox="0 0 440 200" style={{ width: '100%', height: 'auto', display: 'block', background: '#04070d', borderRadius: 8 }}>
        {ENC_VIAS.map((v) => {
          const cx = pos[v.id]; const cy = 100;
          const vx = cx - (via * S) / 2; const vy = cy - (via * S) / 2;
          const mx = vx - v.sides.L * S; const my = vy - v.sides.T * S;
          const mw = (via + v.sides.L + v.sides.R) * S; const mh = (via + v.sides.T + v.sides.B) * S;
          return (
            <g key={v.id} onClick={() => setSel(v.id)} style={{ cursor: 'pointer' }}>
              {vis.M1 && <rect x={mx} y={my} width={mw} height={mh} fill="#3b82f6" opacity="0.75" />}
              {vis.M2 && <rect x={cx - 55} y={cy - 22} width="110" height="44" fill="#c084fc" opacity="0.45" />}
              {vis.VIA && <rect x={vx} y={vy} width={via * S} height={via * S} fill="none" stroke="#fbbf24" strokeWidth="2.5" />}
              <text x={cx} y="190" fill={sel === v.id ? C.neon : C.text} fontSize="11" fontFamily={C.mono} textAnchor="middle">{v.id}{ans[v.id] ? (ans[v.id] === (encJudge(v).ok ? 'OK' : 'VIOLATION') ? ' ✔' : ' ✘') : ''}</text>
            </g>
          );
        })}
      </svg>
      {(() => {
        const v = ENC_VIAS.find((x) => x.id === sel);
        const j = encJudge(v);
        return (
          <div className="fes-dev-status" style={{ marginTop: 10 }}>
            <div className="fes-dev-sub">{v.id} — ENCLOSURE BY M1 (rule ≥ {ENC_MIN} μm)</div>
            {vis.M1 && vis.VIA ? (
              <div style={{ fontFamily: C.mono, fontSize: 12.5 }}>
                {Object.entries(v.sides).map(([k, x]) => <span key={k} style={{ marginRight: 14, color: x < ENC_MIN ? C.red : C.text }}>{k} {x.toFixed(2)} μm</span>)}
              </div>
            ) : <div style={{ fontSize: 12, color: C.amber }}>M1 과 VIA 를 둘 다 켜야 enclosure 를 잴 수 있습니다.</div>}
            <ChipPick opts={['OK', 'VIOLATION']} picked={ans[v.id]} answer={j.ok ? 'OK' : 'VIOLATION'} onPick={(x) => setAns((p) => ({ ...p, [v.id]: x }))} />
            {ans[v.id] && <Feedback ok={ans[v.id] === (j.ok ? 'OK' : 'VIOLATION')}>{j.ok ? '네 방향 모두 0.05 μm 이상 — Enclosure OK.' : `Enclosure violation — ${j.bad.join(', ')}${j.bad.some((b) => b.includes('-')) ? ' (음수 = 비아가 금속 밖으로 삐져나옴: misalignment)' : ''}.`}</Feedback>}
          </div>
        );
      })()}
    </div>
  );
}

/* ── 11강 · Check Rules ── */
function CheckRulesLab() {
  const [g, setG] = useState(crInit);
  const [report, setReport] = useState(null);
  const [focus, setFocus] = useState(null);
  const [hist, setHist] = useState([]);
  const X = (nm) => 20 + (nm - 800) * 0.24;   // 0.80~2.70 μm → 20~476 px
  const Y = (nm) => 190 - (nm - 100) * 0.12;
  const run = () => { setReport(crCheck(g)); setFocus(null); };
  const fix = (id) => { setG((cur) => crApply(cur, id)); setReport(null); setFocus(null); setHist((h) => [...h, CR_FIXES.find((f) => f.id === id).label]); };
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        <b>Check Rules</b> 를 누르고 리포트 항목(좌표 포함)을 눌러 위치를 확인하세요. 아래 조치 중 알맞은 것을 골라 적용하고 다시 검사해 <b>No violations</b> 가 뜰 때까지 고치세요.
        (교재: M1 width ≥ 0.25 μm, spacing ≥ 0.30 μm, grid 0.005) — 틀린 조치도 실제로 도형을 바꿉니다.
      </p>
      <svg viewBox="0 0 480 200" style={{ width: '100%', height: 'auto', display: 'block', background: '#04070d', borderRadius: 8 }}>
        {Array.from({ length: 20 }).map((_, i) => <line key={i} x1={X(800 + i * 100)} x2={X(800 + i * 100)} y1="10" y2="190" stroke="#101b2e" />)}
        {['A', 'B', 'C'].map((k) => (
          <g key={k}>
            <rect x={X(g[k].x)} y={Y(1400)} width={g[k].w * 0.24} height={Y(200) - Y(1400)} fill="#3b82f6" opacity="0.85" />
            <text x={X(g[k].x) + (g[k].w * 0.24) / 2} y={Y(1400) - 6} fill={C.text} fontSize="11" fontFamily={C.mono} textAnchor="middle">{k}</text>
          </g>
        ))}
        {focus && <circle cx={X(focus.at[0])} cy={Y(focus.at[1])} r="12" fill="none" stroke={C.red} strokeWidth="2.5" />}
        <text x="470" y="196" fill={C.dim} fontSize="9" fontFamily={C.mono} textAnchor="end">
          {focus ? `X: ${(focus.at[0] / 1000).toFixed(3)}  Y: ${(focus.at[1] / 1000).toFixed(3)}  ` : ''}Grid: 0.005  Layer: M1
        </text>
      </svg>
      <div className="fes-btnrow" style={{ marginTop: 8 }}>
        <button className="fes-btn" onClick={run}>▶ Check Rules</button>
        <button className="fes-btn ghost" onClick={() => { setG(crInit()); setReport(null); setFocus(null); setHist([]); }}>Reset layout</button>
      </div>
      <div className="fes-drc-out">
        <div className="fes-scr-title">RULE CHECK REPORT</div>
        {report == null && <div className="fes-dim">Layout changed — run Check Rules.</div>}
        {report && report.length === 0 && <div className="fes-ok">✓ No violations. The layer can be released.</div>}
        {report && report.map((v) => (
          <button key={v.id} className="fes-viol" onClick={() => setFocus(v)} style={{ display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', background: 'transparent', color: 'inherit', borderColor: focus && focus.id === v.id ? C.red : undefined }}>
            <div className="fes-viol-head">✕ {v.kind}</div>
            <div className="fes-viol-body">{v.msg} @ ({(v.at[0] / 1000).toFixed(3)}, {(v.at[1] / 1000).toFixed(3)})</div>
          </button>
        ))}
      </div>
      <div style={{ fontSize: 12.5, marginTop: 10 }}>조치 (적용 후 다시 Check Rules)</div>
      <div className="fes-btnrow" style={{ marginTop: 5 }}>
        {CR_FIXES.map((f) => <button key={f.id} className="fes-btn" onClick={() => fix(f.id)}>{f.label}</button>)}
      </div>
      {hist.length > 0 && <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6 }}>적용한 조치: {hist.join(' → ')}</div>}
    </div>
  );
}

/* ── 12강 · 층 이름 ↔ 색 ── */
function LayerColorLab() {
  const [vis, setVis] = useState(() => Object.fromEntries(LC_LAYERS.map((l) => [l.id, true])));
  const [ans, setAns] = useState({});
  const [legend, setLegend] = useState(false);
  const col = Object.fromEntries(LC_LAYERS.map((l) => [l.id, l.color]));
  const unnamed = ['L1', 'L2', 'L3', 'L4'];
  const done = LC_LAYERS.every((l) => ans[l.id]);
  return (
    <div>
      <p className="fes-wk-quiz-intro">범례가 가려져 있습니다. 아래 스위치(<b>L1~L4</b>)로 층을 하나씩 켜고 끄며, 리포트에 나오는 층 이름(<b>POLY, METAL1, METAL2, VIA1</b>)이 화면에서 어떤 색인지 맞혀 보세요.
        (색 배정은 이 화면의 설정 — 툴·회사마다 다르다)</p>
      <div className="fes-btnrow" style={{ marginBottom: 8 }}>
        {LC_LAYERS.map((l, i) => (
          <label key={l.id} className="fes-chip" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            <input type="checkbox" checked={vis[l.id]} onChange={(e) => setVis((v) => ({ ...v, [l.id]: e.target.checked }))} />
            {legend ? l.id : unnamed[i]}
          </label>
        ))}
      </div>
      <svg viewBox="0 0 440 180" style={{ width: '100%', height: 'auto', display: 'block', background: '#04070d', borderRadius: 8 }}>
        {vis.POLY && <rect x="190" y="10" width="22" height="160" fill={col.POLY} opacity="0.8" />}
        {vis.METAL1 && <><rect x="40" y="40" width="360" height="30" fill={col.METAL1} opacity="0.75" /><rect x="40" y="120" width="160" height="30" fill={col.METAL1} opacity="0.75" /></>}
        {vis.METAL2 && <rect x="300" y="20" width="36" height="150" fill={col.METAL2} opacity="0.6" />}
        {vis.VIA1 && <rect x="309" y="46" width="18" height="18" fill={col.VIA1} />}
      </svg>
      {LC_LAYERS.map((l) => (
        <div key={l.id} style={{ marginTop: 8 }}>
          <span style={{ fontFamily: C.mono, fontSize: 12.5 }}>리포트의 <b>{l.id}</b> 는 어떤 색?</span>
          <ChipPick opts={LC_LAYERS.map((x) => x.swatch)} picked={ans[l.id]} answer={l.swatch} onPick={(sw) => setAns((p) => ({ ...p, [l.id]: sw }))}
            labelOf={(sw) => <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><span style={{ width: 12, height: 12, borderRadius: 2, background: LC_LAYERS.find((x) => x.swatch === sw).color }} />{sw}</span>} />
        </div>
      ))}
      <div className="fes-btnrow" style={{ marginTop: 10, alignItems: 'center' }}>
        <button className="fes-btn ghost" onClick={() => setLegend((x) => !x)}>{legend ? '범례 숨기기' : '범례 보기'}</button>
        {done && <span style={{ fontSize: 12.5, color: C.dim }}>정답 {LC_LAYERS.filter((l) => ans[l.id] === l.swatch).length} / {LC_LAYERS.length}</span>}
      </div>
    </div>
  );
}

/* ── 12강 · error / warning 개수 ── */
function DrcCountLab() {
  const [p, setP] = useState(cntInit);
  const [pred, setPred] = useState({ e: null, w: null });
  const [res, setRes] = useState(null);
  const change = (k, v) => { setP((x) => ({ ...x, [k]: v })); setRes(null); setPred({ e: null, w: null }); };
  const run = () => setRes(cntCheck(p));
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        값을 바꾼 뒤 <b>ERROR 와 WARNING 이 몇 개 나올지 먼저 예측</b>하고 Run DRC 를 누르세요. 리포트는 심각도 순(ERROR 먼저)으로 정렬되고 SUMMARY 줄에 개수가 나옵니다.
        (교재: METAL1 min spacing 0.14 · min width 0.10 — 권장 간격 0.16 미달은 WARNING, 권장값은 이 실습의 예시)
      </p>
      <div className="fes-sliders">
        <SliderRow label="METAL1 spacing" value={p.s1} set={(v) => change('s1', v)} min={0.08} max={0.24} req={CNT_RULE.m1Space} />
        <SliderRow label="METAL1 width" value={p.w1} set={(v) => change('w1', v)} min={0.06} max={0.20} req={CNT_RULE.m1Width} />
        <SliderRow label="METAL2 spacing" value={p.s2} set={(v) => change('s2', v)} min={0.08} max={0.24} req={CNT_RULE.m2Space} />
      </div>
      {/* 예측은 실행 전까지 바꿀 수 있고 색을 칠하지 않는다 — 정답은 Run DRC 뒤에만 드러난다 */}
      {[['e', 'ERROR', [0, 1, 2, 3]], ['w', 'WARNING', [0, 1, 2]]].map(([k, label, opts]) => (
        <div key={k} style={{ marginTop: 6 }}>
          <div style={{ fontSize: 12.5 }}>예측 — {label} 개수</div>
          <div className="fes-btnrow" style={{ marginTop: 5 }}>
            {opts.map((n) => (
              <button key={n} className={`fes-chip ${pred[k] === n ? 'on' : ''}`} disabled={res != null}
                onClick={() => setPred((x) => ({ ...x, [k]: n }))}>{n}</button>
            ))}
          </div>
        </div>
      ))}
      <div className="fes-btnrow" style={{ marginTop: 8 }}>
        <button className="fes-btn" disabled={pred.e == null || pred.w == null} onClick={run}>▶ Run DRC</button>
      </div>
      {res && (
        <div className="fes-drc-out">
          <div className="fes-scr-title">DRC RESULTS — Loaded rule deck: N28_M1.drc</div>
          {res.rows.length === 0 && <div className="fes-ok">No results.</div>}
          {res.rows.map((r, i) => (
            <div key={i} className="fes-logrow"><span className={`fes-tag ${r.sev === 'ERROR' ? 'fes-tag-alarm' : 'fes-tag-cmd'}`} style={r.sev === 'WARNING' ? { background: `${C.amber}22`, color: C.amber } : undefined}>{r.sev}</span><span style={{ fontFamily: C.mono, fontSize: 12 }}>{r.text}</span></div>
          ))}
          <div style={{ fontFamily: C.mono, fontSize: 12.5, marginTop: 8, color: C.text }}>SUMMARY — Errors: {res.errors}  Warnings: {res.warnings}</div>
          <Feedback ok={pred.e === res.errors && pred.w === res.warnings}>
            예측 ERROR {pred.e} / WARNING {pred.w} — 실제 ERROR {res.errors} / WARNING {res.warnings}. error = must fix, warning = review.
          </Feedback>
        </div>
      )}
    </div>
  );
}

/* ── 13강 · 넷리스트 비교 ── */
function NetlistLab() {
  const [pair, setPair] = useState({});
  const [verdict, setVerdict] = useState(null);
  const [which, setWhich] = useState(null);
  const allPaired = LVS_SCH.every((d) => pair[d.id]);
  const allRight = LVS_SCH.every((d) => pair[d.id] === LVS_PAIR[d.id]);
  const row = (d) => `${d.id}  ${d.type.toUpperCase()}  D=${d.d}  G=${d.g}  S=${d.s}`;
  return (
    <div>
      <p className="fes-wk-quiz-intro">
        왼쪽 schematic 소자마다 오른쪽 layout 소자를 짝지으세요 — 이름이 아니라 <b>종류(PMOS/NMOS)와 drain·source net</b> 으로 찾습니다.
        짝을 지으면 단자별 net 이 비교됩니다. 모두 짝지은 뒤 <b>LVS PASSED / FAILED</b> 를 판정하세요.
      </p>
      <div className="fes-lvs">
        <div className="fes-lvs-col"><div className="fes-lvs-title">SCHEMATIC NETLIST (NAND2)</div>
          <div className="fes-log" style={{ maxHeight: 'none' }}>{LVS_SCH.map((d) => <div key={d.id} style={{ fontFamily: C.mono, fontSize: 12 }}>{row(d)}</div>)}</div></div>
        <div className="fes-lvs-vs">↔</div>
        <div className="fes-lvs-col"><div className="fes-lvs-title">LAYOUT NETLIST (extracted)</div>
          <div className="fes-log" style={{ maxHeight: 'none' }}>{LVS_LAY.map((d) => <div key={d.id} style={{ fontFamily: C.mono, fontSize: 12 }}>{row(d)}</div>)}</div></div>
      </div>
      <div style={{ display: 'grid', gap: 6, marginTop: 10 }}>
        {LVS_SCH.map((d) => {
          const cmp = pair[d.id] ? lvsCompare(d.id, pair[d.id]) : null;
          return (
            <div key={d.id} className="fes-dev-status" style={{ padding: '8px 12px' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <b style={{ fontFamily: C.mono }}>{d.id}</b> ↔
                <select value={pair[d.id] || ''} onChange={(e) => { setPair((p) => ({ ...p, [d.id]: e.target.value })); setVerdict(null); setWhich(null); }}
                  style={{ background: C.panel2, color: C.text, border: `1px solid ${C.line2}`, borderRadius: 6, padding: '4px 6px' }}>
                  <option value="" disabled>layout device</option>
                  {LVS_LAY.map((x) => <option key={x.id} value={x.id}>{x.id}</option>)}
                </select>
                {cmp && !cmp.typeOk && <span style={{ color: C.red, fontSize: 12 }}>type mismatch — {d.type.toUpperCase()} 와 짝이 아님</span>}
                {cmp && cmp.typeOk && cmp.terms.map((t) => <span key={t.t} style={{ fontFamily: C.mono, fontSize: 12, color: t.ok ? C.emerald : C.red }}>{t.t}: {t.sch}{t.ok ? '' : ` ≠ ${t.lay}`}</span>)}
              </div>
            </div>
          );
        })}
      </div>
      {allPaired && !allRight && <div style={{ marginTop: 8, fontSize: 12.5, color: C.amber }}>짝이 맞지 않는 소자가 있습니다 — drain·source net 이 같은 소자를 찾아 보세요 (gate 는 틀려 있을 수 있음).</div>}
      {allRight && (
        <>
          <div style={{ marginTop: 10, fontSize: 12.5 }}>판정은?</div>
          <ChipPick opts={['LVS PASSED', 'LVS FAILED']} picked={verdict} answer="LVS FAILED" onPick={setVerdict} />
          {verdict && (
            <>
              <PickRow prompt={LVS_WHICH_Q.prompt} options={LVS_WHICH_Q.opts.map((o, i) => ({ id: i, label: o }))} picked={which} answer={LVS_WHICH_Q.ans} onPick={setWhich} />
              {which != null && <Feedback ok={which === LVS_WHICH_Q.ans}>MN1 ↔ M3 의 gate 가 A 가 아니라 B 에 붙어 있다 → Net mismatch (terminal connected to wrong net) → LVS FAILED.</Feedback>}
            </>
          )}
        </>
      )}
    </div>
  );
}

/* ── 13강 · LVS 오류 수정 ── */
function LvsFixLab() {
  const [type, setType] = useState({});
  const [fixPick, setFixPick] = useState({});
  const [out, setOut] = useState(null);
  const fixed = Object.fromEntries(LVS_ERRORS.map((e) => [e.id, fixPick[e.id] === e.fix]));
  return (
    <div>
      <p className="fes-wk-quiz-intro">오류마다 ① <b>종류</b>(missing device / short / open …)를 고르고 ② 수정 방법을 고른 뒤 <b>Re-run LVS</b>. 리포트가 <b>LVS clean</b> 이 될 때까지 반복하세요. (교재: short·open 이 남은 채로 tape-out 금지)</p>
      <div style={{ display: 'grid', gap: 8 }}>
        {LVS_ERRORS.map((e, i) => (
          <div key={e.id} className="fes-viol">
            <div className="fes-viol-head">Error {i + 1}</div>
            <div className="fes-viol-body" style={{ fontFamily: C.mono }}>{e.msg}</div>
            <ChipPick opts={LVS_TYPES} picked={type[e.id]} answer={e.type} onPick={(v) => setType((p) => ({ ...p, [e.id]: v }))} />
            <div className="fes-btnrow" style={{ marginTop: 6 }}>
              {e.fixes.map((f, k) => (
                <button key={k} className={`fes-chip ${fixPick[e.id] === k ? 'on' : ''}`} onClick={() => { setFixPick((p) => ({ ...p, [e.id]: k })); setOut(null); }}>{f}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="fes-btnrow" style={{ marginTop: 10 }}>
        <button className="fes-btn" onClick={() => setOut(lvsRerun(fixed))}>▶ Re-run LVS</button>
        <button className="fes-btn ghost" onClick={() => { setType({}); setFixPick({}); setOut(null); }}>Reset</button>
      </div>
      {out && (
        <div className="fes-drc-out">
          <div className="fes-scr-title">LVS REPORT</div>
          {out.lines.map((l, i) => <div key={i} className={`fes-logrow ${out.pass ? '' : 'err'}`}><span className={`fes-tag ${out.pass ? 'fes-tag-info' : 'fes-tag-alarm'}`}>{out.pass ? 'LVS' : i === 0 ? 'FAIL' : 'SUM'}</span><span>{l}</span></div>)}
          {!out.pass && out.left.map((e) => <div key={e.id} className="fes-logrow err"><span className="fes-tag fes-tag-alarm">ERR</span><span>{e.msg}</span></div>)}
        </div>
      )}
    </div>
  );
}

/* ── 4강 · 진공·가스 라인 도해 (mode gasLog) ── */
function GasLineLab() {
  const [mode, setMode] = useState('learn');
  const [sel, setSel] = useState('mfc1');
  const [qi, setQi] = useState(0);
  const [picks, setPicks] = useState({});
  const q = GAS_LOG_Q[qi];
  const click = (id) => {
    if (mode === 'learn') { setSel(id); return; }
    if (picks[qi] == null) setPicks((p) => ({ ...p, [qi]: id }));
  };
  const hl = (id) => {
    if (mode === 'learn') return sel === id ? C.neon : C.line2;
    const p = picks[qi];
    if (p == null) return C.line2;
    return id === q.ans ? C.emerald : id === p ? C.red : C.line2;
  };
  const sw = (id) => (hl(id) === C.line2 ? 1.4 : 2.6);
  const node = (id, x, y, w, h, l1, l2) => (
    <g key={`${id}${x}`} onClick={() => click(id)} style={{ cursor: 'pointer' }}>
      <rect x={x} y={y} width={w} height={h} rx="7" fill="#0e1a2e" stroke={hl(id)} strokeWidth={sw(id)} />
      <text x={x + w / 2} y={y + h / 2 - (l2 ? 3 : -4)} fill={C.text} fontSize="10.5" fontFamily={C.mono} textAnchor="middle">{l1}</text>
      {l2 && <text x={x + w / 2} y={y + h / 2 + 11} fill={C.dim} fontSize="9" fontFamily={C.mono} textAnchor="middle">{l2}</text>}
    </g>
  );
  const valve = (id, x, y) => (
    <g key={`${id}${x}${y}`} onClick={() => click(id)} style={{ cursor: 'pointer' }}>
      <path d={`M${x - 9},${y - 7} L${x + 9},${y + 7} L${x + 9},${y - 7} L${x - 9},${y + 7} Z`} fill="#0b1220" stroke={hl(id)} strokeWidth={sw(id)} />
    </g>
  );
  const arrow = (x, y, dir = 'r') => <polygon points={dir === 'r' ? `${x},${y - 4} ${x + 8},${y} ${x},${y + 4}` : `${x - 4},${y} ${x + 4},${y} ${x},${y + 8}`} fill={C.cyan} />;
  const part = GAS_PARTS.find((p) => p.id === sel);
  const score = GAS_LOG_Q.filter((x, i) => picks[i] === x.ans).length;
  return (
    <div>
      <div className="fes-casebar">
        <button className={`fes-chip ${mode === 'learn' ? 'on' : ''}`} onClick={() => setMode('learn')}>① 부품과 로그 태그</button>
        <button className={`fes-chip ${mode === 'find' ? 'on' : ''}`} onClick={() => setMode('find')}>② 로그 줄 → 기록한 부품 찾기</button>
      </div>
      <svg viewBox="0 0 600 250" style={{ width: '100%', height: 'auto', display: 'block', background: '#04070d', borderRadius: 8 }}>
        <text x="10" y="16" fill={C.dim} fontSize="10" fontFamily={C.mono}>GAS DELIVERY → CHAMBER → EXHAUST (flow →)</text>
        {/* gas sticks */}
        {[60, 140].map((y, i) => (
          <g key={y}>
            {node('cyl', 12, y - 18, 62, 36, i ? 'CF4' : 'Ar', 'cylinder')}
            <line x1="74" y1={y} x2="110" y2={y} stroke={C.line2} strokeWidth="3" />{arrow(96, y)}
            {node(i ? 'mfc2' : 'mfc1', 110, y - 20, 70, 40, i ? 'MFC-2' : 'MFC-1', i ? 'CF4 sccm' : 'Ar sccm')}
            <line x1="180" y1={y} x2="238" y2={y} stroke={C.line2} strokeWidth="3" />
            {valve('sov', 214, y)}
            <line x1="238" y1={y} x2="238" y2="100" stroke={C.line2} strokeWidth="3" />
          </g>
        ))}
        <line x1="238" y1="100" x2="290" y2="100" stroke={C.line2} strokeWidth="3" />{arrow(272, 100)}
        <text x="222" y="116" fill={C.dim} fontSize="8.5" fontFamily={C.mono}>manifold</text>
        {node('chamber', 290, 60, 120, 80, 'CHAMBER', 'process')}
        {/* gauge on chamber */}
        <line x1="350" y1="60" x2="350" y2="38" stroke={C.line2} strokeWidth="2" />
        <g onClick={() => click('gauge')} style={{ cursor: 'pointer' }}>
          <circle cx="350" cy="26" r="13" fill="#132139" stroke={hl('gauge')} strokeWidth={sw('gauge')} />
          <text x="350" y="30" fill={C.cyan} fontSize="9" fontFamily={C.mono} textAnchor="middle">PG</text>
        </g>
        {/* exhaust */}
        <line x1="350" y1="140" x2="350" y2="215" stroke={C.line2} strokeWidth="3" />{arrow(350, 190, 'd')}
        {valve('tv', 350, 168)}
        <text x="366" y="172" fill={C.dim} fontSize="9" fontFamily={C.mono}>throttle</text>
        <line x1="350" y1="215" x2="460" y2="215" stroke={C.line2} strokeWidth="3" />{arrow(420, 215)}
        {node('pump', 460, 192, 100, 46, 'VACUUM', 'PUMP')}
      </svg>
      {mode === 'learn' ? (
        <div className="fes-dev-status" style={{ marginTop: 10 }}>
          <div style={{ fontFamily: C.mono, fontWeight: 800, color: C.neon }}>{part.en} <span style={{ color: C.dim, fontWeight: 400 }}>· {part.ko}</span></div>
          <div style={{ fontSize: 12.5, marginTop: 4 }}>{part.d}</div>
          <div style={{ fontFamily: C.mono, fontSize: 12, color: C.cyan, marginTop: 6 }}>LOG TAG: {part.tag}{part.unit ? `  (${part.unit})` : ''}</div>
        </div>
      ) : (
        <div className="fes-dev-status" style={{ marginTop: 10 }}>
          <div className="fes-dev-sub">SHIFT LOG LINE {qi + 1} / {GAS_LOG_Q.length}</div>
          <div style={{ fontFamily: C.mono, fontSize: 13.5, whiteSpace: 'pre-wrap' }}>{q.line}</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>이 값을 기록한 부품을 도면에서 누르세요.</div>
          {picks[qi] != null && (
            <div style={{ marginTop: 6, fontSize: 12.5, color: picks[qi] === q.ans ? C.emerald : C.amber }}>
              {picks[qi] === q.ans ? '✔ ' : `✘ 정답은 ${GAS_PARTS.find((p) => p.id === q.ans).en}. `}{q.why}
            </div>
          )}
          <div className="fes-btnrow" style={{ marginTop: 8, alignItems: 'center' }}>
            <button className="fes-btn ghost" disabled={qi === 0} onClick={() => setQi(qi - 1)}>◀</button>
            <button className="fes-btn" disabled={qi === GAS_LOG_Q.length - 1} onClick={() => setQi(qi + 1)}>다음 줄 ▶</button>
            <span style={{ fontSize: 12, color: C.dim }}>푼 줄 {Object.keys(picks).length} / {GAS_LOG_Q.length} · 정답 {score}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 식각 장비 일러스트 (라벨 그림) =====
function ChamberIllustration() {
  return (
    <div>
      <p className="fes-wk-quiz-intro">식각 장비를 그림으로 봅니다. 각 <b>영어 라벨</b>이 어디를 가리키는지 눈에 익혀두세요.</p>
      <svg viewBox="0 0 480 300" className="fes-illus-svg">
        <defs>
          <radialGradient id="fesPlasma" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="480" height="300" fill="#0a0f1a" />
        {/* chamber */}
        <rect x="120" y="55" width="240" height="180" rx="12" fill="#0e1a2e" stroke={C.cyan} strokeWidth="2" />
        <text x="130" y="76" fill={C.cyan} fontSize="13" fontFamily={C.mono}>Chamber</text>
        {/* gas inlet */}
        <line x1="240" y1="22" x2="240" y2="55" stroke={C.cyan} strokeWidth="3" markerEnd="url(#fesArr)" />
        <text x="252" y="30" fill="#bfe9f5" fontSize="13" fontFamily={C.mono}>Process gas</text>
        <defs><marker id="fesArr" markerWidth="9" markerHeight="9" refX="4" refY="7" orient="auto"><path d="M1 1L4 7L7 1" stroke={C.cyan} fill="none" strokeWidth="1.5" /></marker></defs>
        {/* RF */}
        <rect x="26" y="132" width="76" height="34" rx="6" fill="#132139" stroke={C.violet} strokeWidth="1.5" />
        <text x="64" y="153" fill={C.violet} fontSize="13" fontFamily={C.mono} textAnchor="middle">RF power</text>
        <line x1="102" y1="150" x2="185" y2="196" stroke={C.violet} strokeWidth="2" />
        {/* plasma */}
        <ellipse cx="240" cy="150" rx="92" ry="52" fill="url(#fesPlasma)" />
        {[210, 230, 250, 270, 224, 256, 240].map((x, i) => (
          <circle key={i} cx={x} cy={130 + (i % 3) * 18} r="3" fill="#c4b5fd" opacity="0.9" />
        ))}
        <text x="240" y="118" fill="#d9ccff" fontSize="13" fontFamily={C.mono} textAnchor="middle">Plasma</text>
        {/* chuck + wafer */}
        <rect x="180" y="205" width="120" height="16" rx="3" fill="#1a2a44" stroke="#2a3d5f" />
        <ellipse cx="240" cy="205" rx="66" ry="8" fill="#4f9dde" />
        <text x="240" y="240" fill="#bfe9f5" fontSize="13" fontFamily={C.mono} textAnchor="middle">Wafer on chuck</text>
        {/* pump */}
        <line x1="240" y1="235" x2="240" y2="272" stroke={C.emerald} strokeWidth="3" markerEnd="url(#fesArrG)" />
        <defs><marker id="fesArrG" markerWidth="9" markerHeight="9" refX="4" refY="7" orient="auto"><path d="M1 1L4 7L7 1" stroke={C.emerald} fill="none" strokeWidth="1.5" /></marker></defs>
        <text x="252" y="268" fill={C.emerald} fontSize="13" fontFamily={C.mono}>To pump</text>
      </svg>
      <div className="fes-illus-legend">
        <span><b>Chamber</b> 챔버</span><span><b>Process gas</b> 가스 주입</span><span><b>RF power</b> 고주파 전력</span>
        <span><b>Plasma</b> 플라즈마</span><span><b>Wafer on chuck</b> 웨이퍼/척</span><span><b>To pump</b> 배기</span>
      </div>
    </div>
  );
}

// ===== 듣기(발음 재생) =====
// 1순위: 미리 만든 mp3 (public/audio/field-english/<해시>.mp3, 일레븐랩스 Brian — 5·6장 문장만 있다. 매니페스트 FE_AUDIO 로 찾는다)
// 2순위: 브라우저 내장 Web Speech API (무료·오프라인·외부연결 없음) — 매니페스트에 없거나 mp3 재생이 실패하면 이쪽.
// 한 번에 하나만 울린다: 다른 문장을 누르면 앞 것을 멈추고, 재생 중인 것을 다시 누르면 정지.
function speakEN(text, onEnd) {
  try {
    const synth = window.speechSynthesis;
    if (!synth || !text) { if (onEnd) onEnd(); return; }
    synth.cancel(); // 이전 재생 중단
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = 'en-US';
    u.rate = 0.94; // 학습용으로 약간 천천히
    const v = (synth.getVoices() || []).find((vc) => /en[-_]/i.test(vc.lang));
    if (v) u.voice = v;
    if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
    synth.speak(u);
  } catch (e) { if (onEnd) onEnd(); /* 미지원 브라우저는 무시 */ }
}
const SPEECH = { audio: null, key: null, paused: false, listeners: new Set() }; // 지금 울리는 것 하나 (모듈 전역)
function speechNotify() { const st = { key: SPEECH.key, paused: SPEECH.paused }; SPEECH.listeners.forEach((fn) => fn(st)); }
/* 일시정지 / 이어 듣기 — 전체 듣기(긴 글)용. 위치를 잃지 않는다. 담당자 2026-10-07 "재생·잠깐 멈춤" */
function pauseSpeech() { if (SPEECH.audio && !SPEECH.audio.paused) { SPEECH.audio.pause(); SPEECH.paused = true; speechNotify(); } }
function resumeSpeech() { if (SPEECH.audio && SPEECH.paused) { SPEECH.paused = false; const p = SPEECH.audio.play(); if (p && p.catch) p.catch(() => {}); speechNotify(); } }
function stopSpeech() {
  if (SPEECH.audio) { try { SPEECH.audio.pause(); SPEECH.audio.src = ''; } catch (e) { /* ignore */ } SPEECH.audio = null; }
  try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
  SPEECH.key = null; SPEECH.paused = false; speechNotify();
}
function playSpeech(key, text, src) {
  if (SPEECH.key === key) { stopSpeech(); return; } // 재생 중인 것을 다시 누르면 정지
  stopSpeech();
  SPEECH.key = key; SPEECH.paused = false; speechNotify();
  const endIfMine = (k) => () => { if (SPEECH.key === k) { SPEECH.audio = null; SPEECH.key = null; SPEECH.paused = false; speechNotify(); } };
  /* 폴백: 문장(text)이 있으면 Web Speech. 슬라이드 전체 읽기(src 지정)는 글이 길고 한·영 혼합이라 폴백 없이 멈춘다. */
  const fallback = () => { if (SPEECH.key !== key) return; SPEECH.audio = null; if (text) speakEN(text, endIfMine(key)); else { SPEECH.key = null; speechNotify(); } };
  const hash = FE_AUDIO[key];
  if (!src && !hash) { fallback(); return; }
  try {
    const a = new Audio(src || `${AUDIO_DIR}/${hash}.mp3`);
    a.preload = 'auto';
    if (src) a.playbackRate = 0.9; // 슬라이드 전체 읽기(한·영 혼합)는 살짝 천천히. 문장 발음은 원어민 속도 그대로
    a.onended = endIfMine(key);
    a.onerror = fallback; // 파일이 없거나 못 읽으면 Web Speech 로
    SPEECH.audio = a;
    const p = a.play();
    if (p && p.catch) p.catch(fallback); // 자동재생 차단 등
  } catch (e) { fallback(); }
}
function useSpeechState() {
  const [st, setSt] = useState({ key: SPEECH.key, paused: SPEECH.paused });
  useEffect(() => { SPEECH.listeners.add(setSt); return () => SPEECH.listeners.delete(setSt); }, []);
  return st;
}
function useSpeechKey() { return useSpeechState().key; }
/* ▶ 전체 듣기 — story · read · manual 슬라이드를 한 화자(Chris, 한·영 혼합)가 처음부터 끝까지 읽는다.
   매니페스트(FE_SLIDE_AUDIO)에 그 슬라이드 글이 있을 때만 그린다. 문장 ▶ 와 같은 SPEECH 를 쓰므로 서로 끼어들면 앞 것이 멈춘다. */
function SlideAudioBtn({ slide }) {
  const narr = slideNarration(slide);
  const { key: cur, paused } = useSpeechState();
  const ent = narr ? FE_SLIDE_AUDIO[narr] : null;
  if (!ent) return null;
  const key = `slide:${ent.h}`, on = cur === key;
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const src = `${SLIDE_AUDIO_DIR}/${ent.h}.mp3`;
  if (!on) {
    return (
      <div className="fes-slide-audio-wrap">
        <button type="button" className="fes-slide-audio" title="이 화면 전체를 읽어 줍니다 (한국어 설명 + 영어 문장, 한 화자)"
          onClick={(e) => { e.stopPropagation(); playSpeech(key, null, src); }}>
          <span aria-hidden="true">▶</span> 전체 듣기<small>{mmss(ent.sec || 0)}</small>
        </button>
      </div>
    );
  }
  return (
    <div className="fes-slide-audio-wrap">
      <button type="button" className={`fes-slide-audio on${paused ? ' paused' : ''}`} aria-pressed={!paused}
        title={paused ? '이어 듣기' : '잠깐 멈춤 (위치 유지)'}
        onClick={(e) => { e.stopPropagation(); if (paused) resumeSpeech(); else pauseSpeech(); }}>
        <span aria-hidden="true">{paused ? '▶' : '❚❚'}</span> {paused ? '이어 듣기' : '일시정지'}
      </button>
      <button type="button" className="fes-slide-audio stop" title="정지 (처음으로)" onClick={(e) => { e.stopPropagation(); stopSpeech(); }}>
        <span aria-hidden="true">■</span> 정지
      </button>
    </div>
  );
}
/* ▶ 버튼 — 문장 옆 인라인. 터치 영역 32px, 보이는 알약은 작게. 화면의 글은 그대로 두고 normalizeSpeech 키로 mp3 를 찾는다.
   문장이 아닌 글(라벨·단어)은 매니페스트에 있을 때만 버튼을 그린다. */
function SpeakBtn({ text, title }) {
  const key = speechKey(text) || (FE_AUDIO[String(text || '').trim()] ? String(text).trim() : null);
  const cur = useSpeechKey();
  const hasMp3 = !!(key && FE_AUDIO[key]);
  const ok = hasMp3 || (typeof window !== 'undefined' && 'speechSynthesis' in window);
  if (!key || !ok) return null;
  const on = cur === key;
  const t = title || (hasMp3 ? '발음 듣기 (Play)' : '듣기 (Play · 브라우저 음성)');
  return (
    <button type="button" className={`fes-speak${on ? ' on' : ''}${hasMp3 ? ' mp3' : ''}`} title={on ? '정지 (Stop)' : t} aria-label={on ? '정지' : t} aria-pressed={on}
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); playSpeech(key, key); }}>
      <span className="fes-speak-ic" aria-hidden="true">{on ? '■' : '▶'}</span>
    </button>
  );
}

// ===== 의사소통 코너 — 외국인 엔지니어 (상황 → 예상 답변) =====
function CommTurn({ it, n }) {
  const [show, setShow] = useState(false);
  return (
    <div className="fes-comm-turn">
      <div className="fes-comm-sit"><b>상황 {n}.</b> {plainSpeech(it.sit)}</div>
      <div className="fes-comm-them">
        <span className="fes-comm-who">🧑‍🔧 Foreign Engineer</span>
        <div className="fes-comm-en">{it.q.en} <SpeakBtn text={it.q.en} title="외국인 엔지니어 문장 듣기" /></div>
        <div className="fes-comm-ko">{it.q.ko}</div>
      </div>
      <button className="fes-btn ghost" onClick={() => setShow((s) => !s)}>{show ? '예상 답변 숨기기' : '👉 이렇게 답하세요'}</button>
      {show && (
        <div className="fes-comm-you">
          <span className="fes-comm-who">🙋 You</span>
          <div className="fes-comm-en">{it.a.en} <SpeakBtn text={it.a.en} title="내 답변 듣기" /></div>
          <div className="fes-comm-ko">{it.a.ko}</div>
        </div>
      )}
    </div>
  );
}
function CommCorner({ items }) {
  return <div className="fes-comm">{items.map((it, i) => <CommTurn key={i} it={it} n={i + 1} />)}</div>;
}
const COMM_C1 = [
  { sit: '첫 출근, 외국인 엔지니어가 인사하며 담당 업무를 묻습니다.',
    q: { en: 'Welcome! What will you be working on?', ko: '환영해요! 무슨 일을 맡게 되나요?' },
    a: { en: "I'll operate the etch equipment and read the alarms.", ko: '식각 장비를 운전하고 알람을 확인합니다.' } },
  { sit: '영어가 걱정된다고 하자 조언해 줍니다.',
    q: { en: "Don't worry. Just read the screen, and ask if you're not sure.", ko: '걱정 마요. 화면을 읽고, 모르면 물어봐요.' },
    a: { en: 'Okay, I will read the manual and the HMI carefully.', ko: '네, 매뉴얼과 HMI 화면을 잘 읽겠습니다.' } },
];
const COMM_C2 = [
  { sit: '부품 이름을 확인합니다.',
    q: { en: 'Which part controls the gas flow?', ko: '어느 부품이 가스 유량을 조절하죠?' },
    a: { en: 'The MFC (Mass Flow Controller) controls the gas flow.', ko: 'MFC가 가스 유량을 조절합니다.' } },
  { sit: '배기 장치를 묻습니다.',
    q: { en: 'And what evacuates the chamber?', ko: '그럼 챔버를 배기하는 건 뭐죠?' },
    a: { en: 'The turbo pump evacuates the chamber to base pressure.', ko: '터보 펌프가 챔버를 기준 압력까지 배기합니다.' } },
];
const COMM_C3 = [
  { sit: '운전을 시작하려는데 외국인 엔지니어가 상태를 묻습니다.',
    q: { en: 'Is the chamber ready? Did you reach base pressure?', ko: '챔버 준비됐어요? 기준 압력에 도달했나요?' },
    a: { en: 'Yes, base pressure is reached. The chamber is ready.', ko: '네, 기준 압력에 도달했습니다. 챔버 준비됐습니다.' } },
  { sit: '다음 단계를 확인합니다.',
    q: { en: 'Good. Please start the gas and check the flow.', ko: '좋아요. 가스를 시작하고 유량을 확인해 주세요.' },
    a: { en: 'Okay. The gas flow is 50 sccm and stable.', ko: '알겠습니다. 가스 유량 50 sccm, 안정적입니다.' } },
];
const COMM_C4 = [
  { sit: '알람이 떠서 상황을 공유합니다.',
    q: { en: 'What alarm is on the screen?', ko: '화면에 무슨 알람이 떴어요?' },
    a: { en: 'RF-204, high reflected power. The plasma failed to ignite.', ko: 'RF-204, 반사파 높음. 플라즈마 점화 실패입니다.' } },
  { sit: '조치를 묻습니다.',
    q: { en: 'What will you do first?', ko: '먼저 뭘 할 거예요?' },
    a: { en: "I'll check the pressure and re-tune the matching network.", ko: '압력을 확인하고 매칭을 다시 맞추겠습니다.' } },
];
const COMM_C5 = [
  { sit: 'DRC 결과를 공유합니다.',
    q: { en: 'Did the layout pass DRC?', ko: '레이아웃이 DRC를 통과했어요?' },
    a: { en: 'No, there is a spacing violation on METAL1.', ko: '아뇨, METAL1에 간격 위반이 있습니다.' } },
  { sit: '수정 방법을 묻습니다.',
    q: { en: 'How will you fix it?', ko: '어떻게 고칠 건가요?' },
    a: { en: "I'll increase the spacing to meet the minimum.", ko: '최소 간격을 만족하도록 간격을 넓히겠습니다.' } },
];
const COMM_C6 = [
  { sit: 'LVS 결과를 공유합니다.',
    q: { en: 'Does the layout match the schematic?', ko: '레이아웃이 회로도와 일치해요?' },
    a: { en: 'No, the NMOS device is missing in the layout.', ko: '아뇨, 레이아웃에 NMOS 소자가 빠졌습니다.' } },
  { sit: '조치를 요청합니다.',
    q: { en: 'Please add it and re-run LVS.', ko: '추가하고 LVS를 다시 돌려요.' },
    a: { en: 'Okay, I will place the device and re-run LVS.', ko: '네, 소자를 배치하고 LVS를 다시 돌리겠습니다.' } },
];
const COMM_C7 = [
  { sit: '종합 결과를 보고합니다.',
    q: { en: 'Can you summarize the problem?', ko: '문제를 요약해 줄래요?' },
    a: { en: 'The line width was too narrow due to unstable pressure and RF.', ko: '압력·RF 불안정으로 선폭이 너무 좁았습니다.' } },
  { sit: '조치 후 결과를 묻습니다.',
    q: { en: 'And the result after the fix?', ko: '조치 후 결과는요?' },
    a: { en: 'The width returned to target, and DRC is clean now.', ko: '선폭이 목표로 돌아왔고, 이제 DRC는 깨끗합니다.' } },
];

// ===== PM 점검표 (7주) =====
const PM_TASKS = [
  { en: 'Inspect the O-ring seal', ko: 'O-링 씰 점검' },
  { en: 'Clean the chamber wall', ko: '챔버 벽 세정' },
  { en: 'Replace the pump oil', ko: '펌프 오일 교체' },
  { en: 'Calibrate the MFC and gauge', ko: 'MFC·게이지 교정' },
  { en: 'Tighten the loose bolts', ko: '풀린 볼트 조임' },
];
function PMChecklist() {
  const [done, setDone] = useState({});
  const n = Object.values(done).filter(Boolean).length;
  return (
    <div>
      <p className="fes-wk-quiz-intro">유지보수 <b>점검표(checklist)</b>입니다. 항목을 읽고 완료하면 체크하세요.</p>
      <div className="fes-pm">
        {PM_TASKS.map((t, i) => (
          <label key={i} className={`fes-pm-item ${done[i] ? 'on' : ''}`}>
            <input type="checkbox" checked={!!done[i]} onChange={(e) => setDone((d) => ({ ...d, [i]: e.target.checked }))} />
            <div><div className="fes-pm-en">{t.en}</div><div className="fes-pm-ko">{t.ko}</div></div>
          </label>
        ))}
      </div>
      <div className="fes-check-row"><span className={`fes-score ${n === PM_TASKS.length ? 'ok' : 'mid'}`}>{n}/{PM_TASKS.length} 완료</span></div>
    </div>
  );
}

// ===== 데이터 주도 슬라이드 렌더러 (에이전트가 낸 typed slide 를 그대로 렌더) =====
/* 인라인 글 — 장식(굵게 ** / 키워드 [ ]) 을 그리고, 영어 문장 뒤에 ▶ 를 붙인다.
   글 전체가 영어 문장이면 끝에 하나, 한국어 글 속에 "따옴표"·**굵게** 로 박힌 영어 문장이면 그 자리마다 하나.
   어디가 문장인지는 src/data/fieldEnglishAudio.js 의 규칙(빌드 스크립트와 동일)이 정한다.
   mark: 'bold' = **굵게**(rich) · 'em' = [키워드](faRich) · 'none' = 장식 없음 */
function speechInline(text, mark) {
  if (text == null) return null;
  const s = String(text);
  const re = mark === 'bold' ? /\*\*/ : mark === 'em' ? /\[|\]/ : null;
  let parity = 0; // 조각을 나눠 그려도 **·[ ] 의 짝이 이어지도록 홀짝을 넘긴다
  const deco = (piece, keyBase) => {
    if (!re) return <React.Fragment key={keyBase}>{piece}</React.Fragment>;
    const parts = piece.split(re);
    const out = parts.map((p, i) => {
      const inside = (parity + i) % 2 === 1;
      if (!inside) return <React.Fragment key={`${keyBase}-${i}`}>{p}</React.Fragment>;
      return mark === 'bold' ? <b key={`${keyBase}-${i}`}>{p}</b> : <em key={`${keyBase}-${i}`}>{p}</em>;
    });
    parity = (parity + parts.length - 1) % 2;
    return out;
  };
  const whole = speechKey(s);
  if (whole) return <>{deco(s, 'w')}<SpeakBtn text={whole} /></>;
  const spans = findSpeechSpans(s);
  if (!spans.length) return deco(s, 'p');
  const nodes = []; let pos = 0;
  spans.forEach((sp, i) => {
    nodes.push(deco(s.slice(pos, sp.end), `s${i}`));
    nodes.push(<SpeakBtn key={`b${i}`} text={sp.key} />);
    pos = sp.end;
  });
  if (pos < s.length) nodes.push(deco(s.slice(pos), 'tail'));
  return nodes;
}
function rich(text) { return speechInline(text, 'bold'); }
function ArtImage({ which, cap }) {
  if (!ART[which]) return null;
  return (
    <figure className="fes-art">
      <img src={ART[which]} alt={cap || which} className="fes-art-img" />
      {cap && <figcaption className="fes-art-cap">{cap}</figcaption>}
    </figure>
  );
}
const SIM_REGISTRY = {
  // mode 가 있는 슬라이드는 그 강 전용 화면, 없으면 기존 화면 그대로
  equipment: (sl) => (sl.mode === 'log' ? <TrendHMI />
    : sl.mode === 'match' ? <MatchLab />
      : sl.mode === 'priority' ? <PriorityHMI />
        : sl.mode === 'shiftLog' ? <ShiftLogLab />
      : <EquipmentHMI variant={sl.mode === 'sequence' ? 'sequence' : 'etch'} />),
  chamberArt: () => <ArtImage which="chamber" cap="Plasma etch chamber — cross-section (도해). 각 부품의 영어 이름은 번호 라벨 참고." />,
  alarm: (sl) => (sl.mode === 'ackReset' ? <AckResetLab /> : <AlarmLab />),
  drc: (sl) => (sl.mode === 'triage' ? <DrcTriageLab />
    : sl.mode === 'readDrc' ? <ReadDrcLab />
      : sl.mode === 'checkRules' ? <CheckRulesLab />
        : sl.mode === 'counts' ? <DrcCountLab /> : <><ArtImage which="drc" cap="Design Rule Check — 레이아웃 상면도(top view). 통과(PASS)와 위반(VIOLATION) 예시. 아래에서 직접 판정 연습." /><DrcLab /></>),
  lvs: (sl) => (sl.mode === 'netlist' ? <NetlistLab /> : sl.mode === 'lvsFix' ? <LvsFixLab /> : <><ArtImage which="lvs" cap="Layout Versus Schematic — 회로도(reference)와 레이아웃(extracted) 넷리스트 비교. 아래에서 직접 판정 연습." /><LvsLab /></>),
  report: (sl) => (sl.mode === 'pcar' ? <PcarReportLab /> : sl.mode === 'drcReport' ? <DrcReportLab /> : <ReportLab />),
  partDiagram: (sl) => (sl.mode === 'tool' ? <ToolLayoutLab /> : sl.mode === 'gasLog' ? <GasLineLab /> : <PartDiagram parts={W2_PARTS} />),
  devicePanel: (sl) => (sl.mode === 'procedure' ? <ProcedurePanel />
    : sl.mode === 'spPv' ? <SpPvPanel />
      : sl.mode === 'rf' ? <RfReadPanel />
        : sl.mode === 'parts' ? <PartsPanel />
          : sl.mode === 'status' ? <StatusWordPanel />
            : sl.mode === 'pmStatus' ? <PmStatusPanel />
        : <DevicePanel />),
  // 펌프다운·PM 부위 실습은 자체 도면을 그리므로 식각 챔버 그림을 붙이지 않는다
  chamber: (sl) => (sl.mode === 'pumpdown' ? <PumpDownLab />
    : sl.mode === 'pmParts' ? <PmPartsLab />
      : sl.mode === 'chamberHmi' ? <ChamberHmiLab /> : (
    <>
      <ArtImage which="chamber" cap="Plasma etch chamber — cross-section (도해). 각 부품의 영어 이름은 번호 라벨 참고." />
      {sl.mode === 'ignite' && <IgnitionLab />}
    </>
  )),
  layer: (sl) => (sl.mode === 'stack' ? <StackLab />
    : sl.mode === 'masks' ? <MaskLab />
      : sl.mode === 'enclosure' ? <EnclosureLab />
        : sl.mode === 'layerColor' ? <LayerColorLab />
          : <ArtImage which="layer" cap="MOSFET device cross-section — 공정 레이어(도해). 각 레이어의 영어 이름은 번호 라벨 참고." />),
  pm: (sl) => (sl.mode === 'pmWork' ? <PmWorkOrder /> : <PMChecklist />),
};
// ===== 현장 자료 삽화 (장비에 붙은 스티커·화면·계기·로그를 직접 보여준다) =====
function faRich(text) { return speechInline(text, 'em'); }
function plainSpeech(text) { return speechInline(text, 'none'); } // 장식 없이 ▶ 만 (퀴즈 문항·스티커·알람 문구)
function FieldArtifact({ f }) {
  let body = null;
  switch (f.kind) {
    case 'sticker': {
      const lv = f.level || 'info';
      const word = { danger: 'DANGER', warn: 'WARNING', caution: 'CAUTION', info: 'NOTICE', note: 'NOTE' }[lv] || 'NOTICE';
      body = (
        <div className={`fa-sticker fa-${lv}`}>
          <div className="fa-st-hd">{f.icon || '⚠'} {word}</div>
          <div className="fa-st-bd"><div className="fa-en">{plainSpeech(f.en)}</div>{f.ko && <div className="fa-ko">{f.ko}</div>}</div>
        </div>
      );
      break;
    }
    case 'hmi':
      body = (
        <div className="fa-hmi">
          <div className="fa-hmi-top"><span>{f.tool || 'TOOL'}</span><span className={`fa-chip fa-s-${f.state || 'idle'}`}>{f.status || 'IDLE'}</span></div>
          <div className="fa-hmi-body">{(f.rows || []).map((r, i) => <div key={i} className="fa-hmi-row"><span>{r[0]}</span><span className={r[2] ? `fa-v-${r[2]}` : ''}>{r[1]}</span></div>)}</div>
          {f.banner && <div className={`fa-hmi-bn fa-${f.banner.level || 'danger'}`}>{plainSpeech(f.banner.en)}{f.banner.ko && <b>{f.banner.ko}</b>}</div>}
        </div>
      );
      break;
    case 'alarm':
      body = (
        <div className={`fa-alarm fa-${f.level || 'danger'}`}>
          <div className="fa-al-ic">▲</div>
          <div className="fa-al-tx"><div className="fa-en">{f.code ? <span className="fa-al-code">{f.code}</span> : null}{plainSpeech(f.en)}</div>{f.ko && <div className="fa-ko">{f.ko}</div>}</div>
        </div>
      );
      break;
    case 'meter': {
      const st = f.state || 'ok';
      body = (
        <div className="fa-meter">
          <div className="fa-mt-nm">{f.name}</div>
          <div className="fa-mt-vals"><span className="fa-mt-sp">SP {f.sp}</span><span className={`fa-mt-pv fa-v-${st}`}>PV {f.pv}</span><span className="fa-mt-u">{f.unit}</span></div>
          {f.note && <div className="fa-ko">{plainSpeech(f.note)}</div>}
        </div>
      );
      break;
    }
    case 'buttons':
      body = <div className="fa-btns">{(f.items || []).map((b, i) => <span key={i} className={`fa-btn fa-b-${b[1] || 'n'}`}>{b[0]}</span>)}</div>;
      break;
    case 'log':
      body = (
        <div className="fa-log">
          <div className="fa-log-hd">▤ {f.title || 'LOG'}</div>
          <div className="fa-log-bd">{(f.lines || []).map((l, i) => <div key={i} className="fa-log-ln">{faRich(l)}</div>)}</div>
        </div>
      );
      break;
    case 'note':
      body = (
        <div className="fa-note">
          <div className="fa-nt-hd">{f.title || 'WORK INSTRUCTION'}</div>
          <div className="fa-en">{faRich(f.en)}</div>{f.ko && <div className="fa-ko">{f.ko}</div>}
        </div>
      );
      break;
    case 'step':
      body = (
        <div className="fa-step">
          <div className="fa-sp-hd">{f.title || 'SOP · PROCEDURE'}</div>
          <ol className="fa-sp-ol">{(f.items || []).map((s, i) => <li key={i}><span className="fa-en">{faRich(Array.isArray(s) ? s[0] : s)}</span>{Array.isArray(s) && s[1] && <span className="fa-ko">{s[1]}</span>}</li>)}</ol>
        </div>
      );
      break;
    case 'stack':
      body = (
        <div className="fa-stack">{(f.layers || []).map((l, i) => <div key={i} className="fa-sk-row" style={{ background: l[2] || 'transparent' }}><span className="fa-en">{l[0]}</span><span className="fa-ko">{l[1]}</span></div>)}</div>
      );
      break;
    default:
      body = null;
  }
  if (!body) return null;
  return <figure className="fa-fig">{body}{f.cap && <figcaption className="fa-cap">{plainSpeech(f.cap)}</figcaption>}</figure>;
}
function FieldFigs({ figs }) {
  return <div className="fa-wrap">{figs.map((f, i) => <FieldArtifact key={i} f={f} />)}</div>;
}
// ===== 오늘의 현장 · 상황 설정 (학생이 장면을 머릿속에 세팅하고 들어가도록) =====
function SceneCard({ s }) {
  return (
    <div className="fes-scene">
      {s.bg && SCENEBG[s.bg] && <div className="fes-scene-bg" dangerouslySetInnerHTML={{ __html: SCENEBG[s.bg] }} />}
      <div className="fes-scene-hd"><span className="fes-scene-k">🎬 오늘의 현장</span><span className="fes-scene-tag">SET THE SCENE</span></div>
      <div className="fes-scene-rows">
        <div className="fes-scene-row"><span className="fes-scene-ic">📍</span><div><div className="fes-scene-lbl">장소 · WHERE</div><div className="fes-scene-val">{plainSpeech(s.where)}</div></div></div>
        <div className="fes-scene-row"><span className="fes-scene-ic">🔧</span><div><div className="fes-scene-lbl">장비 · WHAT</div><div className="fes-scene-val">{plainSpeech(s.tool)}</div></div></div>
        <div className="fes-scene-row"><span className="fes-scene-ic">⚡</span><div><div className="fes-scene-lbl">상황 · SITUATION</div><div className="fes-scene-val">{plainSpeech(s.situation)}</div></div></div>
      </div>
      {s.meet && s.meet.length > 0 && (
        <div className="fes-scene-meet">
          <div className="fes-scene-lbl">🗣️ 오늘 이 현장에서 만날 영어</div>
          <div className="fes-scene-chips">{s.meet.map((m, i) => <span key={i} className="fes-scene-chip">{plainSpeech(m)}</span>)}</div>
        </div>
      )}
      {s.goal && <div className="fes-scene-goal"><b>🎯 오늘의 목표</b> — {plainSpeech(s.goal)}</div>}
      <div className="fes-scene-cue">▸ 이 장면을 머릿속에 그려보고 시작하세요.</div>
    </div>
  );
}
// ===== 매뉴얼 표본 (실제 영어 문서를 그대로 읽어보는 맛보기) — 운전·조립·테스트·부품·메일 =====
function DocNote({ n }) {
  const w = { warning: 'WARNING', caution: 'CAUTION', note: 'NOTE', danger: 'DANGER' }[n.kind] || 'NOTE';
  return <div className={`fes-doc-note fes-doc-${n.kind}`}><b>{n.kind === 'note' ? '📝' : '⚠'} {w}</b> {plainSpeech(n.en)}</div>;
}
function ManualSpecimen({ s }) {
  const v = s.variant || 'manual';
  let paper;
  if (v === 'email') {
    paper = (
      <div className="fes-doc fes-doc-email">
        <div className="fes-mail-hd">
          <div><span>From</span> {s.from}</div>
          <div><span>To</span> {s.to}</div>
          <div><span>Subject</span> <b>{s.subject}</b></div>
        </div>
        <div className="fes-mail-body">{(s.lines || []).map((p, i) => <p key={i}>{faRich(p)}</p>)}</div>
        {s.sign && <div className="fes-mail-sign">{s.sign}</div>}
      </div>
    );
  } else if (v === 'parts') {
    paper = (
      <div className="fes-doc">
        <div className="fes-doc-hd"><div className="fes-doc-name">{s.doc?.name || 'PARTS LIST'}</div><div className="fes-doc-meta">{s.doc ? `DOC ${s.doc.no} · REV ${s.doc.rev}` : ''}</div></div>
        <div className="fes-doc-h">{s.heading}</div>
        <table className="fes-parts"><thead><tr>{(s.cols || []).map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
          <tbody>{(s.rows || []).map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table>
        {s.callout && <DocNote n={s.callout} />}
      </div>
    );
  } else {
    paper = (
      <div className="fes-doc">
        <div className="fes-doc-hd"><div className="fes-doc-name">{s.doc?.name || 'OPERATING MANUAL'}</div><div className="fes-doc-meta">DOC {s.doc?.no} · SEC {s.doc?.sec} · REV {s.doc?.rev} · PG {s.doc?.page}</div></div>
        <div className="fes-doc-h">{plainSpeech(s.heading)}</div>
        {s.intro && <p className="fes-doc-intro">{plainSpeech(s.intro)}</p>}
        <ol className="fes-doc-steps">
          {(s.steps || []).map((st, i) => { const t = typeof st === 'string' ? st : st.t; return <li key={i}><span>{faRich(t)}</span>{st.note && <DocNote n={st.note} />}</li>; })}
        </ol>
        {s.callout && <DocNote n={s.callout} />}
        {s.fig && <div className="fes-doc-fig">▣ {s.fig}</div>}
      </div>
    );
  }
  return (
    <div>
      <div className="fes-doc-tag">{v === 'email' ? '✉ 실제 이메일 표본' : v === 'parts' ? '🔩 부품 리스트 표본' : '📄 실제 매뉴얼 표본'} — 영어 원문 그대로 읽어보세요</div>
      {paper}
      {s.gloss && s.gloss.length > 0 && (
        <div className="fes-doc-help">
          <div className="fes-doc-help-h">🔑 읽기 도움말</div>
          <div className="fes-doc-gloss">{s.gloss.map((g, i) => <span key={i}><b>{g[0]}</b> — {g[1]}</span>)}</div>
        </div>
      )}
    </div>
  );
}
// ===== 모사 EDA 툴 GUI (설계 챕터: 종이 매뉴얼 대신 실제 설계 프로그램 화면을 읽는다) =====
function edaCanvas(kind) {
  let art = '';
  if (kind === 'layout') {
    art = `<rect x="60" y="60" width="150" height="34" fill="#2f7d5b" stroke="#7fe3b0" stroke-width="1.5"/><text x="66" y="82" font-family="monospace" font-size="11" fill="#d6ffe9">METAL1</text>
      <rect x="90" y="110" width="90" height="70" fill="#6a4d8f" stroke="#c9a9ef" stroke-width="1.5"/><text x="96" y="150" font-family="monospace" font-size="11" fill="#efe3ff">POLY</text>
      <rect x="230" y="96" width="130" height="90" fill="#8f6a3d" stroke="#e6c79a" stroke-width="1.5"/><text x="236" y="146" font-family="monospace" font-size="11" fill="#ffedd0">ACTIVE</text>
      <rect x="250" y="66" width="16" height="16" fill="#c9d4e2"/><rect x="290" y="66" width="16" height="16" fill="#c9d4e2"/><text x="250" y="60" font-family="monospace" font-size="9" fill="#9fb2c9">CONTACT</text>`;
  } else if (kind === 'rules') {
    art = `<rect x="70" y="90" width="120" height="40" fill="#2f7d5b" stroke="#7fe3b0" stroke-width="1.5"/><rect x="250" y="90" width="120" height="40" fill="#2f7d5b" stroke="#7fe3b0" stroke-width="1.5"/>
      <line x1="190" y1="110" x2="250" y2="110" stroke="#f2b23a" stroke-width="1.5"/><line x1="190" y1="103" x2="190" y2="117" stroke="#f2b23a" stroke-width="1.5"/><line x1="250" y1="103" x2="250" y2="117" stroke="#f2b23a" stroke-width="1.5"/>
      <text x="196" y="100" font-family="monospace" font-size="11" font-weight="700" fill="#f2b23a">0.16µm ✓</text><text x="120" y="150" font-family="monospace" font-size="10" fill="#9fb2c9">min spacing = 0.14µm</text>`;
  } else if (kind === 'place') {
    art = [40, 90, 140, 190, 240, 290, 340].map((x, i) => `<rect x="${x}" y="${60 + (i % 2) * 0}" width="38" height="30" fill="#33506e" stroke="#8fb4dd" stroke-width="1.2"/>`).join('') +
      [40, 90, 140, 240, 290, 340].map((x) => `<rect x="${x}" y="120" width="38" height="30" fill="#33506e" stroke="#8fb4dd" stroke-width="1.2"/>`).join('') +
      `<rect x="182" y="128" width="38" height="30" fill="#4a2f2f" stroke="#e05a4a" stroke-width="1.6"/><circle cx="201" cy="143" r="16" fill="none" stroke="#e05a4a" stroke-width="1.8"/><text x="150" y="182" font-family="monospace" font-size="10" fill="#e07a6a">off-grid cell</text>`;
  } else if (kind === 'drc') {
    art = `<rect x="80" y="80" width="70" height="44" fill="#2f7d5b" stroke="#7fe3b0" stroke-width="1.4"/><rect x="176" y="120" width="70" height="44" fill="#2f7d5b" stroke="#7fe3b0" stroke-width="1.4"/>
      <line x1="150" y1="100" x2="176" y2="100" stroke="#e05a4a" stroke-width="1.4"/><text x="150" y="94" font-family="monospace" font-size="9" font-weight="700" fill="#e05a4a">0.02µm</text>
      <circle cx="163" cy="112" r="13" fill="none" stroke="#e05a4a" stroke-width="2"/><path d="M156 105 l14 14 M170 105 l-14 14" stroke="#e05a4a" stroke-width="2"/>
      <circle cx="300" cy="150" r="13" fill="none" stroke="#e05a4a" stroke-width="2"/><path d="M293 143 l14 14 M307 143 l-14 14" stroke="#e05a4a" stroke-width="2"/><text x="250" y="196" font-family="monospace" font-size="10" fill="#e07a6a">2 markers shown</text>`;
  } else { // lvs
    art = `<rect x="30" y="60" width="170" height="120" fill="none" stroke="#3b5069" stroke-width="1.2"/><text x="36" y="54" font-family="monospace" font-size="10" fill="#8fb4dd">SCHEMATIC</text>
      <circle cx="80" cy="110" r="10" fill="none" stroke="#8fb4dd" stroke-width="1.5"/><circle cx="150" cy="110" r="10" fill="none" stroke="#8fb4dd" stroke-width="1.5"/><line x1="90" y1="110" x2="140" y2="110" stroke="#8fb4dd" stroke-width="1.5"/><line x1="80" y1="120" x2="80" y2="160" stroke="#8fb4dd" stroke-width="1.5"/>
      <text x="210" y="128" font-family="monospace" font-size="30" font-weight="800" fill="#e05a4a">≠</text>
      <rect x="250" y="60" width="170" height="120" fill="none" stroke="#3b5069" stroke-width="1.2"/><text x="256" y="54" font-family="monospace" font-size="10" fill="#7fe3b0">LAYOUT</text>
      <rect x="280" y="96" width="30" height="20" fill="#2f7d5b" stroke="#e05a4a" stroke-width="1.6"/><rect x="350" y="130" width="30" height="20" fill="#2f7d5b" stroke="#7fe3b0" stroke-width="1.3"/><line x1="310" y1="106" x2="350" y2="140" stroke="#8fb4dd" stroke-width="1.3"/>`;
  }
  return `<svg viewBox="0 0 440 230" preserveAspectRatio="xMinYMid meet" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">${art}</svg>`;
}
function EdaTool({ s }) {
  return (
    <div className="eda-slide">
      <div className="fes-doc-tag">🖥️ 설계 프로그램 화면 (모사) — 실제 EDA 툴의 <b>영어 UI</b>를 읽어보세요</div>
      <div className="eda">
        <div className="eda-tb">
          <span className="eda-dot" style={{ background: '#e05a4a' }} /><span className="eda-dot" style={{ background: '#e0a83a' }} /><span className="eda-dot" style={{ background: '#4ab86a' }} />
          <span className="eda-app">{s.app || 'LayoutPro'}</span><span className="eda-doc">— {s.doc || 'chip_top'}</span>
          <span className="eda-menus">{(s.menus || ['File', 'Edit', 'View', 'Tools', 'Verify', 'Window', 'Help']).map((m, i) => <span key={i}>{m}</span>)}</span>
        </div>
        <div className="eda-tools">{(s.tools || ['Select', 'Draw', 'Ruler', 'Zoom', 'Run']).map((t, i) => <span key={i} className={`eda-tool${s.run === t ? ' on' : ''}`}>{t}</span>)}</div>
        <div className="eda-body">
          <div className="eda-left">
            <div className="eda-ph">{s.left?.title || 'Layers'}</div>
            {(s.left?.items || []).map((it, i) => (
              <div key={i} className="eda-row">
                {it.color ? <span className="eda-sw" style={{ background: it.color }} /> : <span className="eda-sw off" />}
                <span className={`eda-chk${it.on === false ? ' off' : ''}`}>{it.on === false ? '☐' : '☑'}</span>
                <span className="eda-name">{it.name}</span>
              </div>
            ))}
          </div>
          <div className="eda-canvas" dangerouslySetInnerHTML={{ __html: edaCanvas(s.canvas || 'layout') }} />
        </div>
        <div className="eda-console">{(s.log || []).map((l, i) => <div key={i} className={`eda-log${/error|mismatch|not |fail|violation/i.test(l) ? ' err' : /done|clean|match|pass|ok/i.test(l) ? ' ok' : ''}`}>{l}</div>)}</div>
        <div className="eda-status">{s.status || 'X: 12.40  Y: 8.10   Layer: METAL1   Zoom: 400%'}</div>
      </div>
      {s.gloss && s.gloss.length > 0 && (
        <div className="fes-doc-help"><div className="fes-doc-help-h">🔑 화면 영어 읽기</div>
          <div className="fes-doc-gloss">{s.gloss.map((g, i) => <span key={i}><b>{g[0]}</b> — {g[1]}</span>)}</div></div>
      )}
    </div>
  );
}
function slideInner(slide) {
  switch (slide.type) {
    case 'scene':
      return <SceneCard s={slide} />;
    case 'mansample':
      return <ManualSpecimen s={slide} />;
    case 'eda':
      return <EdaTool s={slide} />;
    case 'story': {
      const hasManga = slide.art && MANGA[slide.art];
      return (
        <div className={hasManga ? 'fes-story-split' : ''}>
          {hasManga && (
            <figure className="fes-manga"><div className="fes-manga-svg" dangerouslySetInnerHTML={{ __html: MANGA[slide.art] }} /></figure>
          )}
          <div className="fes-wk-story"><div className="fes-wk-story-ic">{slide.icon || '🏭'}</div><div>{rich(slide.text)}</div></div>
        </div>
      );
    }
    case 'read':
      return (
        <div className="fes-th">
          {slide.intro && <div className="fes-th-lead">{rich(slide.intro)}</div>}
          <ul className="fes-th-list">
            {(slide.paras || []).map((p, i) => <li key={i} className="fes-th-point"><span className="fes-th-mk" />{rich(p)}</li>)}
          </ul>
        </div>
      );
    case 'acr':
      return <div>{slide.intro && <p className="fes-wk-quiz-intro">{plainSpeech(slide.intro)}</p>}{(slide.items || []).map((a, i) => <div key={i} className="fes-wk-acr"><b>{a.ab} = {a.full}</b> — {a.ko}</div>)}</div>;
    case 'glossary':
      return <GlossaryGrid intro={slide.intro} items={slide.items || []} />;
    case 'quiz':
      return <QuizBlock intro={slide.intro} questions={slide.questions || []} />;
    case 'manual':
      return <div className="fes-wk-manual"><div className="fes-wk-manual-h">{plainSpeech(slide.mtitle || 'MANUAL')}</div>{(slide.paras || []).map((p, i) => <p key={i}>{rich(p)}</p>)}</div>;
    case 'comm':
      return <CommCorner items={slide.items || []} />;
    case 'sim':
      return <div>{slide.intro && <p className="fes-wk-hint" style={{ margin: '0 0 12px' }}>{rich(slide.intro)}</p>}{(SIM_REGISTRY[slide.which] || (() => <div className="fes-dim">[{slide.which}]</div>))(slide)}</div>;
    case 'wrap':
      return <div><ul className="fes-cb-summary">{(slide.points || []).map((p, i) => <li key={i}>{rich(p)}</li>)}</ul>{slide.done && <div className="fes-cb-complete">{rich(slide.done)}</div>}</div>;
    default:
      return slide.body || null;
  }
}
function SlideRenderer({ slide }) {
  const hasFigs = slide.figs && slide.figs.length;
  const inner = slideInner(slide);
  // story already leads with its manga panel; field figs go after its narrative.
  if (slide.type === 'story') return <>{inner}{hasFigs ? <FieldFigs figs={slide.figs} /> : null}</>;
  return <>{hasFigs ? <FieldFigs figs={slide.figs} /> : null}{inner}</>;
}

// ============ 챕터 데이터 (책의 목차 · 이 배열만 갈아끼우면 다른 책이 된다) ============
const CHAPTERS = CONTENT_CHAPTERS;

// 챕터 책 리더 — 목차(진도·성취 표시) + 슬라이드 뷰어
const TOC_COLLAPSED_KEY = 'fes-toc-collapsed';
function ChapterBook() {
  const available = CHAPTERS.filter((c) => !c.locked);
  const [done, setDone] = useState(() => {
    try { return new Set(JSON.parse(window.localStorage.getItem(PROGRESS_KEY) || '[]')); } catch (e) { return new Set(); }
  });
  const [sel, setSel] = useState(CHAPTERS[0].id);
  // 목차 접기 — 접으면 CH 번호 줄만 남고 슬라이드가 넓어진다. 이 브라우저에만 기억한다.
  const [tocCollapsed, setTocCollapsed] = useState(() => {
    try { return window.localStorage.getItem(TOC_COLLAPSED_KEY) === '1'; } catch (e) { return false; }
  });
  const toggleToc = () => setTocCollapsed((c) => {
    const next = !c;
    try { window.localStorage.setItem(TOC_COLLAPSED_KEY, next ? '1' : '0'); } catch (e) { /* ignore */ }
    return next;
  });
  const markDone = useCallback((id) => {
    setDone((d) => {
      if (d.has(id)) return d;
      const nd = new Set(d); nd.add(id);
      try { window.localStorage.setItem(PROGRESS_KEY, JSON.stringify([...nd])); } catch (e) { /* ignore */ }
      return nd;
    });
  }, []);
  const cur = CHAPTERS.find((c) => c.id === sel);
  const curIdx = CHAPTERS.indexOf(cur);
  const pct = Math.round(available.filter((c) => done.has(c.id)).length / available.length * 100);

  return (
    <div className={`fes-ppt ${tocCollapsed ? 'toc-min' : ''}`}>
      <aside className="fes-ppt-side">
        <button className="fes-ppt-toggle" onClick={toggleToc}
          title={tocCollapsed ? '목차 펼치기' : '목차 접기'} aria-label={tocCollapsed ? '목차 펼치기' : '목차 접기'}>
          {tocCollapsed ? '»' : '« 목차 접기'}
        </button>
        <div className="fes-cb-progress">
          <span className="fes-ppt-hide">학습 진도</span>
          <span className="fes-mono">{pct}%</span>
        </div>
        <div className="fes-cb-bar"><div style={{ width: `${pct}%` }} /></div>
        <div className="fes-ppt-rail">
          {CHAPTERS.map((c, idx) => (
            <button key={c.id} disabled={c.locked} onClick={() => !c.locked && setSel(c.id)}
              className={`fes-ppt-chip ${sel === c.id ? 'on' : ''} ${c.locked ? 'off' : ''} ${done.has(c.id) ? 'done' : ''}`} title={c.title}>
              <span className="fes-ppt-chip-n">CH{idx + 1}</span>
              <span className="fes-ppt-chip-t fes-ppt-hide">{c.title}</span>
              {done.has(c.id) && <span className="fes-ppt-chip-mk">✓</span>}
              {c.locked && <span className="fes-ppt-chip-mk">🔒</span>}
            </button>
          ))}
        </div>
      </aside>
      <main className="fes-ppt-main">
        {cur.locked
          ? <div className="fes-wk-placeholder">이 챕터는 아직 <b>준비 중</b>입니다. 현재 <b>Chapter 1~2</b>가 완성되어 있어요.</div>
          : <LessonDeck key={cur.id} chapterId={cur.id} chapterNo={curIdx + 1} chapterTitle={cur.title} steps={cur.slides} onReachEnd={markDone} />}
      </main>
    </div>
  );
}

/* =========================================================================
 * 개념 ⓪  Course Map — 강의자용 한눈에 보기 콘솔 (주차 대신 구조 중심)
 * ====================================================================== */

// Course Map = 정적 '책 안내'. 클릭 네비 없음 — 학습은 Chapters 탭에서.
const CM_PART_EQUIP = [
  { ch: 'CH 2', t: '장비 구성요소', d: 'chamber·pump·valve·MFC·RF (영문 매뉴얼)' },
  { ch: 'CH 3', t: '운전 절차', d: 'load·evacuate·purge·vent (작업 지시문)' },
  { ch: 'CH 4', t: '진공·가스 로그', d: 'set point vs actual value, sccm' },
  { ch: 'CH 5', t: '플라즈마 장비', d: 'RF power·matching·reflected power' },
  { ch: 'CH 6', t: '알람과 조치', d: 'alarm·interlock·timeout·failure' },
  { ch: 'CH 7', t: '유지보수(PM)', d: 'inspect·clean·replace·calibrate' },
];
const CM_PART_DESIGN = [
  { ch: 'CH 9', t: 'Layer 용어', d: 'well·active·poly·contact·metal' },
  { ch: 'CH 10', t: 'Design Rule', d: 'width·spacing·overlap·enclosure' },
  { ch: 'CH 11', t: '패턴 배치', d: 'layer 배치 · 선폭 · 간격' },
  { ch: 'CH 12', t: 'DRC 오류', d: 'DRC (Design Rule Check) 오류 해석' },
  { ch: 'CH 13', t: 'LVS 검증', d: 'LVS (Layout Versus Schematic) 비교' },
];

function CourseMap() {
  return (
    <div className="fes-cm">
      <div className="fes-cm-guide-note">📖 이 화면은 <b>책 구성 안내</b>입니다. 실제 학습은 위 <b>Chapters</b> 탭에서 하세요.</div>

      <div className="fes-cm-what">
        <b>무엇을 배우나</b> — 현장의 <span className="fes-cm-hl">HMI 화면·알람</span>, <span className="fes-cm-hl">영어 매뉴얼·작업 지시문</span>, <span className="fes-cm-hl">스펙·안전 문구</span>를 <b>기능적으로 읽는 힘</b>. 목표는 유창한 회화가 아니라, <b>필요한 순간에 정확히 읽어내는 것</b>이다.
      </div>

      {/* 4단계 방식 */}
      <div className="fes-cm-loop">
        {['Read manual', 'Operate', 'Interpret log/error', 'Report'].map((s, i) => (
          <React.Fragment key={s}>
            <div className="fes-cm-loop-chip"><span>{i + 1}</span>{s}</div>
            {i < 3 && <span className="fes-cm-loop-ar">→</span>}
          </React.Fragment>
        ))}
        <span className="fes-cm-loop-tag">매 챕터 반복</span>
      </div>

      {/* 구성: Day1 + 장비 파트 / 디자인 파트 / 종합 */}
      <div className="fes-cm-day1">CH 1 · Day 1 — 오리엔테이션 (두루두루 훑기)</div>
      <div className="fes-cm-parts">
        <div className="fes-cm-part">
          <div className="fes-cm-part-h fes-a">장비 파트 · Equipment</div>
          {CM_PART_EQUIP.map((c) => (
            <div key={c.ch} className="fes-cm-part-row"><span className="fes-cm-part-ch">{c.ch}</span><div><b>{c.t}</b><span>{c.d}</span></div></div>
          ))}
        </div>
        <div className="fes-cm-part">
          <div className="fes-cm-part-h fes-b">디자인 파트 · Design</div>
          {CM_PART_DESIGN.map((c) => (
            <div key={c.ch} className="fes-cm-part-row"><span className="fes-cm-part-ch">{c.ch}</span><div><b>{c.t}</b><span>{c.d}</span></div></div>
          ))}
        </div>
      </div>
      <div className="fes-cm-part fes-cm-part-full">
        <div className="fes-cm-part-h fes-c">종합 · 평가</div>
        <div className="fes-cm-part-row"><span className="fes-cm-part-ch">CH 14</span><div><b>종합 현장 보고</b><span>장비 이상 → 식각 비정상 → DRC 오류 → 영문 보고서까지 한 흐름</span></div></div>
        <div className="fes-cm-part-row"><span className="fes-cm-part-ch">CH 8·15</span><div><b>중간 점검 · 종합 점검</b><span>CH 8: 장비·운전·로그·알람 / CH 15: + Layer·DRC·LVS 종합</span></div></div>
      </div>
    </div>
  );
}

/* =========================================================================
 * 메인 컴포넌트
 * ====================================================================== */

export default function FieldEnglishSimulator({
  hideTabBar = false,       // 규격: 자료실에서 true (이 컴포넌트는 자기 UI만 그림)
  controlledTab,            // 규격: 'simulation' 로 들어옴 — 수신만, 무시
  onTabChange,              // 규격: 개념 변경 콜백(선택)
  initialTheme,             // 규격: 특정 개념으로 진입
  initialTab,               // 하위호환(기존 레포 관례)
  hideOtherTabs = false,    // 규격: 그 개념만 노출
}) {
  const first = THEME_IDS.includes(initialTheme) ? initialTheme
    : THEME_IDS.includes(initialTab) ? initialTab : 'overview';
  const [theme, setTheme] = useState(first);
  useEffect(() => { if (THEME_IDS.includes(initialTheme)) setTheme(initialTheme); }, [initialTheme]);

  const pick = (id) => { setTheme(id); onTabChange && onTabChange(id); };
  const cur = THEMES.find((t) => t.id === theme) || THEMES[0];

  const Body = {
    overview: <CourseMap />,
    chapters: <ChapterBook />,
  }[theme];

  return (
    <div className="fes-root">
      <FesStyles />

      {!hideOtherTabs && (
        <div className="fes-header">
          <div className="fes-title">
            <span className="fes-title-en">Semiconductor Field English</span>
            <span className="fes-title-ko">반도체 현장 실무영어 · 화면·알람·매뉴얼을 읽는 힘</span>
          </div>
          <div className="fes-tabs">
            {THEMES.map((t) => (
              <button key={t.id} onClick={() => pick(t.id)} className={`fes-tab ${theme === t.id ? 'on' : ''}`} title={t.ko}>
                <span className="fes-tab-icon">{t.icon}</span>
                <span className="fes-tab-en">{t.en}</span>
                <span className="fes-tab-loop">{t.loop}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {hideOtherTabs && (
        <div className="fes-solo-head">
          <span className="fes-solo-icon">{cur.icon}</span>
          <span className="fes-solo-en">{cur.en}</span>
          <span className="fes-solo-ko">{cur.ko}</span>
          <span className="fes-solo-loop">Loop · {cur.loop}</span>
        </div>
      )}

      <div className="fes-body">{Body}</div>

      <div className="fes-footer">
        4-step loop: <b>Read manual → Operate → Interpret log/error → Report in English</b>
      </div>
    </div>
  );
}

/* =========================================================================
 * 스코프 스타일 (호스트 CSS 비의존)
 * ====================================================================== */
function FesStyles() {
  return (
    <style>{`
.fes-root{font-family:${C.sans};color:${C.text};background:linear-gradient(180deg,#0a1120,#0b1220);border:1px solid ${C.line};border-radius:14px;padding:10px 14px 14px;min-height:560px;box-sizing:border-box;line-height:1.5}
.fes-root *{box-sizing:border-box}
.fes-header{display:flex;flex-wrap:wrap;gap:8px 12px;justify-content:space-between;align-items:center;border-bottom:1px solid ${C.line};padding-bottom:8px;margin-bottom:10px}
.fes-title{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 10px}
.fes-title-en{font-size:16px;font-weight:800;letter-spacing:.2px;color:#e8eefc;background:linear-gradient(90deg,${C.cyan},${C.violet});-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.fes-title-ko{font-size:12px;color:${C.dim}}
.fes-tabs{display:flex;flex-wrap:wrap;gap:6px}
.fes-tab{display:flex;flex-direction:row;align-items:center;gap:6px;background:${C.panel};border:1px solid ${C.line};color:${C.dim};border-radius:9px;padding:5px 11px;cursor:pointer;transition:.15s}
.fes-tab:hover{border-color:${C.line2};color:${C.text}}
.fes-tab.on{background:linear-gradient(180deg,#15294a,#122038);border-color:${C.cyan};color:#fff;box-shadow:0 0 0 1px ${C.cyan}33,0 4px 14px #0006}
.fes-tab-icon{font-size:14px}
.fes-tab-en{font-size:11.5px;font-weight:700}
.fes-tab-loop{display:none}
.fes-solo-head{display:flex;align-items:center;gap:10px;border-bottom:1px solid ${C.line};padding-bottom:10px;margin-bottom:14px}
.fes-solo-icon{font-size:22px}.fes-solo-en{font-size:17px;font-weight:800;color:#e8eefc}
.fes-solo-ko{font-size:12px;color:${C.dim}}
.fes-solo-loop{margin-left:auto;font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:${C.cyan};border:1px solid ${C.cyan}55;border-radius:20px;padding:3px 9px}
.fes-footer{margin-top:14px;padding-top:10px;border-top:1px solid ${C.line};font-size:11.5px;color:${C.dim};text-align:center}
.fes-footer b{color:${C.text};font-weight:600}

/* term glossary */
.fes-term{position:relative;border-bottom:1px dotted ${C.cyan};cursor:help;color:#bfe9f5;outline:none}
.fes-tip{position:absolute;left:0;bottom:135%;z-index:30;width:230px;background:#0a1428;border:1px solid ${C.cyan}66;color:${C.text};font-size:11.5px;font-family:${C.sans};padding:8px 10px;border-radius:8px;box-shadow:0 8px 24px #000a;opacity:0;pointer-events:none;transition:.12s;transform:translateY(4px)}
.fes-term:hover .fes-tip,.fes-term:focus .fes-tip{opacity:1;transform:translateY(0)}

/* HMI */
.fes-stepbar{display:flex;align-items:center;margin-bottom:12px;overflow-x:auto;padding-bottom:4px}
.fes-step{display:flex;align-items:center;gap:5px;font-size:11px;color:${C.dim};white-space:nowrap}
.fes-step-dot{display:inline-flex;width:18px;height:18px;border-radius:50%;background:${C.panel2};border:1px solid ${C.line2};align-items:center;justify-content:center;font-size:10px;font-family:${C.mono}}
.fes-step.on{color:${C.text}}.fes-step.on .fes-step-dot{background:${C.cyan}22;border-color:${C.cyan};color:${C.cyan}}
.fes-step.cur .fes-step-dot{background:${C.cyan};color:#04121a;font-weight:700}
.fes-step-line{flex:1;min-width:14px;height:2px;background:${C.line2};margin:0 5px}.fes-step-line.on{background:${C.cyan}}
.fes-hmi{display:grid;grid-template-columns:130px 1fr 190px;gap:12px}
@media(max-width:720px){.fes-hmi{grid-template-columns:1fr}}
.fes-menu{display:flex;flex-direction:column;gap:4px}
.fes-menu-btn{text-align:left;background:${C.panel};border:1px solid ${C.line};color:${C.dim};border-radius:8px;padding:8px 10px;font-size:12px;font-weight:600;cursor:pointer;transition:.12s}
.fes-menu-btn:hover{border-color:${C.line2};color:${C.text}}
.fes-menu-btn.on{background:${C.panel2};border-color:${C.cyan};color:#fff}
.fes-menu-btn.alarm{border-color:${C.red};color:${C.red};animation:fesBlink 1s infinite}
@keyframes fesBlink{50%{background:${C.red}22}}
.fes-screen{background:#08101f;border:1px solid ${C.line};border-radius:10px;padding:14px;min-height:210px}
.fes-scr-title{font-family:${C.mono};font-size:11px;letter-spacing:1px;color:${C.cyan};border-bottom:1px solid ${C.line};padding-bottom:6px;margin-bottom:10px}
.fes-grid2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
@media(max-width:520px){.fes-grid2{grid-template-columns:1fr}}
.fes-readrow{display:flex;justify-content:space-between;gap:8px;background:${C.panel};border:1px solid ${C.line};border-radius:7px;padding:7px 9px}
.fes-readrow-l{font-size:11px;color:${C.dim}}.fes-readrow-v{font-size:12px;font-family:${C.mono};font-weight:600}
.fes-hint{font-size:11.5px;color:${C.dim};margin:10px 0 0}
.fes-tbl{width:100%;border-collapse:collapse;font-size:12px}
.fes-tbl td{border:1px solid ${C.line};padding:6px 9px;font-family:${C.mono}}
.fes-tbl td:first-child{color:${C.cyan}}
.fes-ol,.fes-task-ol{margin:0;padding-left:18px;font-size:12.5px;line-height:1.9}
.fes-ol b{color:${C.cyan}}
.fes-gauges{display:flex;flex-direction:column;gap:9px}
.fes-gauge{background:${C.panel};border:1px solid ${C.line};border-radius:9px;padding:9px 10px}
.fes-gauge-top{display:flex;justify-content:space-between;font-size:10.5px;font-family:${C.mono};color:${C.dim};margin-bottom:6px;letter-spacing:.5px}
.fes-gauge-bar{height:7px;background:#0a1526;border-radius:20px;overflow:hidden}.fes-gauge-bar>div{height:100%;border-radius:20px;transition:width .3s}
.fes-log{background:#060c17;border:1px solid ${C.line};border-radius:8px;padding:8px;max-height:180px;overflow:auto;font-family:${C.mono};font-size:11px}
.fes-log-embed{max-height:120px;margin-top:8px}
.fes-logrow{display:flex;gap:7px;padding:2px 0;align-items:baseline}
.fes-logrow.err span:last-child{color:${C.red}}
.fes-tag{font-size:9px;padding:1px 5px;border-radius:4px;font-weight:700;letter-spacing:.4px;flex:none}
.fes-tag-info{background:${C.blue}22;color:${C.blue}}.fes-tag-cmd{background:${C.violet}22;color:${C.violet}}
.fes-tag-alarm{background:${C.red}22;color:${C.red}}
.fes-alarm{background:${C.red}14;border:1px solid ${C.red}55;border-radius:8px;padding:12px}
.fes-alarm-code{color:${C.red};font-weight:800;font-family:${C.mono};margin-bottom:5px}
.fes-alarm-act{margin-top:7px;font-size:11px;color:${C.amber}}
.fes-ok{color:${C.emerald};font-size:12.5px}
.fes-dim{color:${C.dim};font-size:12px}
.fes-alarm-bar{display:flex;justify-content:space-between;align-items:center;gap:10px;background:${C.red}18;border:1px solid ${C.red}66;border-radius:9px;padding:9px 12px;margin-top:12px;font-family:${C.mono};font-size:12px;color:#ffd7d7}
.fes-controls{margin-top:12px}
.fes-inject{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:${C.amber};margin-bottom:8px;cursor:pointer}
.fes-btnrow{display:flex;flex-wrap:wrap;gap:7px}
.fes-btn{background:linear-gradient(180deg,#1a3252,#132542);border:1px solid ${C.cyan}55;color:#dff5fb;border-radius:8px;padding:8px 13px;font-size:12px;font-weight:700;cursor:pointer;transition:.12s}
.fes-btn:hover:not(:disabled){border-color:${C.cyan};box-shadow:0 0 0 1px ${C.cyan}33}
.fes-btn:disabled{opacity:.32;cursor:not-allowed}
.fes-btn.danger{background:linear-gradient(180deg,#3a1720,#2a1018);border-color:${C.red}66;color:#ffd7d7}
.fes-btn.danger:hover:not(:disabled){border-color:${C.red}}
.fes-mask-grid{}@media(max-width:620px){.fes-mask-grid{grid-template-columns:1fr !important}}
.fes-btn.locked{opacity:.42;border-style:dashed}
.fes-btn.ghost{background:transparent;border-color:${C.line2};color:${C.dim}}

/* task card */
.fes-taskcard{margin-top:14px;background:linear-gradient(180deg,#0d1a30,#0b1526);border:1px solid ${C.line2};border-left:3px solid ${C.cyan};border-radius:9px;padding:12px 14px}
.fes-taskcard-h{font-family:${C.mono};font-size:10.5px;letter-spacing:1px;color:${C.cyan};margin-bottom:7px}
.fes-taskcard-b{font-size:12.5px;color:${C.text}}
.fes-task-ol b{color:#e8eefc}

/* alarm lab */
.fes-casebar{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.fes-chip{background:${C.panel};border:1px solid ${C.line};color:${C.dim};border-radius:20px;padding:5px 13px;font-size:11.5px;font-family:${C.mono};font-weight:600;cursor:pointer}
.fes-chip.on{background:${C.cyan}18;border-color:${C.cyan};color:${C.cyan}}
.fes-alarm-panel{background:#0e0a10;border:1px solid ${C.red}44;border-radius:10px;padding:14px}
.fes-alarm-head{font-family:${C.mono};font-size:12px;color:${C.red};font-weight:700;margin-bottom:8px;letter-spacing:.5px}
.fes-alarm-msg{font-size:14px;color:#ffe3e3;line-height:1.6;margin-bottom:4px}
.fes-qs{display:grid;gap:10px;margin-top:14px}
.fes-q{background:${C.panel};border:1px solid ${C.line};border-radius:10px;padding:12px}
.fes-q-prompt{font-size:12.5px;font-weight:700;color:#e8eefc;margin-bottom:9px}
.fes-q-opts{display:grid;gap:6px}
.fes-opt{text-align:left;background:#0b1424;border:1px solid ${C.line2};color:${C.text};border-radius:8px;padding:9px 12px;font-size:12.5px;cursor:pointer;transition:.12s}
.fes-opt:hover:not(:disabled){border-color:${C.cyan}}
.fes-opt.sel{border-color:${C.cyan};background:${C.cyan}14}
.fes-opt.right{border-color:${C.emerald};background:${C.emerald}18;color:#d7ffe9}
.fes-opt.wrong{border-color:${C.red};background:${C.red}18;color:#ffd7d7}
.fes-opt:disabled{cursor:default}
.fes-check-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:14px}
.fes-score{font-family:${C.mono};font-weight:700;font-size:13px;padding:5px 12px;border-radius:8px}
.fes-score.ok{background:${C.emerald}18;color:${C.emerald}}.fes-score.mid{background:${C.amber}18;color:${C.amber}}.fes-score.bad{background:${C.red}18;color:${C.red}}
.fes-fix{font-size:12px;color:${C.emerald}}

/* DRC / CAD */
.fes-cad{border:1px solid ${C.line};border-radius:10px;overflow:hidden;background:#0a0f1a}
.fes-cad-svg{width:100%;display:block}
.fes-sliders{display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;margin:14px 0}
.fes-slider{flex:1;min-width:190px}
.fes-slider-top{display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px}
.fes-slider-req{font-size:10px;color:${C.dim};font-family:${C.mono};margin-top:2px}
.fes-range{width:100%;accent-color:${C.cyan}}
.fes-drc-out{background:#060c17;border:1px solid ${C.line};border-radius:10px;padding:14px}
.fes-viol{background:${C.red}10;border:1px solid ${C.red}44;border-radius:8px;padding:10px 12px;margin-top:8px;font-family:${C.mono}}
.fes-viol-head{color:${C.red};font-weight:700;font-size:12.5px;margin-bottom:4px}
.fes-viol-body{color:#ffd7d7;font-size:12px}

/* LVS */
.fes-lvs{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center}
@media(max-width:560px){.fes-lvs{grid-template-columns:1fr}}
.fes-lvs-col{background:#0a0f1a;border:1px solid ${C.line};border-radius:10px;padding:10px}
.fes-lvs-title{font-family:${C.mono};font-size:10.5px;color:${C.cyan};letter-spacing:.6px;text-align:center;margin-bottom:6px}
.fes-lvs-svg{width:100%;height:auto;display:block}
.fes-lvs-vs{font-size:22px;color:${C.red};text-align:center;font-weight:700}

/* report */
.fes-scn{background:#0d1a30;border:1px solid ${C.line2};border-radius:10px;padding:14px;margin-bottom:14px;font-size:13px}
.fes-report{display:grid;gap:10px}
.fes-report-field{display:flex;flex-direction:column;gap:5px}
.fes-report-label{font-family:${C.mono};font-size:12px;color:${C.cyan};font-weight:700}
.fes-ta{background:#0b1424;border:1px solid ${C.line2};color:${C.text};border-radius:8px;padding:9px 11px;font-size:13px;font-family:${C.sans};resize:vertical}
.fes-ta:focus{outline:none;border-color:${C.cyan}}
.fes-model{font-size:12px;color:${C.emerald};background:${C.emerald}12;border-left:2px solid ${C.emerald};padding:6px 10px;border-radius:0 6px 6px 0}
.fes-rubric{display:flex;align-items:center;gap:9px;font-size:12px;color:${C.dim}}
.fes-rubric-bar{width:120px;height:7px;background:#0a1526;border-radius:20px;overflow:hidden}.fes-rubric-bar>div{height:100%;background:${C.emerald};transition:width .3s}
.fes-mono{font-family:${C.mono};font-size:11px}

/* Course Map (instructor console) */
.fes-cm-phil{background:linear-gradient(180deg,#0d1a30,#0b1526);border:1px solid ${C.line2};border-left:3px solid ${C.cyan};border-radius:10px;padding:12px 15px;font-size:13px;line-height:1.7;color:${C.text}}
.fes-cm-phil b{color:#e8eefc;display:block;margin-bottom:2px}
.fes-cm-hl{color:${C.cyan};font-weight:700}
.fes-cm-loop{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:14px 0}
.fes-cm-loop-chip{display:flex;align-items:center;gap:7px;background:${C.panel};border:1px solid ${C.line2};border-radius:22px;padding:7px 14px;font-size:12.5px;font-weight:600;color:#e8eefc}
.fes-cm-loop-chip span{display:inline-flex;width:19px;height:19px;border-radius:50%;background:${C.cyan};color:#04121a;font-family:${C.mono};font-size:11px;font-weight:700;align-items:center;justify-content:center}
.fes-cm-loop-ar{color:${C.cyan};font-size:17px}.fes-cm-loop-ar.big{font-size:26px}
.fes-cm-loop-tag{margin-left:auto;font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:${C.dim};border:1px solid ${C.line2};border-radius:20px;padding:4px 10px}
.fes-cm-emph{display:flex;gap:4px;margin-bottom:16px;font-size:11px;font-weight:600}
.fes-cm-emph-a{flex:6;background:linear-gradient(90deg,${C.cyan}22,${C.cyan}11);border:1px solid ${C.cyan}44;color:#bfe9f5;border-radius:8px 3px 3px 8px;padding:9px 12px;text-align:center}
.fes-cm-emph-b{flex:4;background:linear-gradient(90deg,${C.violet}18,${C.violet}0d);border:1px solid ${C.violet}44;color:#d9ccff;border-radius:3px 8px 8px 3px;padding:9px 12px;text-align:center}
.fes-cm-lanes{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:640px){.fes-cm-lanes{grid-template-columns:1fr}}
.fes-cm-lane{display:flex;flex-direction:column;gap:10px}
.fes-cm-lane-h{font-family:${C.mono};font-size:12px;font-weight:700;letter-spacing:.4px;padding:8px 12px;border-radius:8px}
.fes-cm-lane-h.fes-a{background:${C.cyan}14;color:${C.cyan};border:1px solid ${C.cyan}40}
.fes-cm-lane-h.fes-b{background:${C.violet}14;color:${C.violet};border:1px solid ${C.violet}40}
.fes-cm-node{display:block;width:100%;text-align:left;background:${C.panel};border:1px solid ${C.line2};border-radius:11px;padding:13px 15px;cursor:pointer;transition:.14s}
.fes-cm-node:hover{border-color:${C.cyan};background:${C.panel2};transform:translateY(-1px);box-shadow:0 6px 18px #0007}
.fes-cm-node-top{display:flex;align-items:center;gap:11px}
.fes-cm-ic{font-size:26px}
.fes-cm-node-name{display:flex;flex-direction:column;flex:1}
.fes-cm-node-name b{color:#e8eefc;font-size:15px}
.fes-cm-node-name span{color:${C.dim};font-size:11.5px}
.fes-cm-wk{font-family:${C.mono};font-size:10.5px;color:${C.amber};border:1px solid ${C.amber}44;border-radius:20px;padding:2px 9px;flex:none}
.fes-cm-terms{display:flex;flex-wrap:wrap;gap:5px;margin:9px 0}
.fes-cm-term{font-family:${C.mono};font-size:10.5px;color:${C.text};background:#0b1424;border:1px solid ${C.line2};border-radius:5px;padding:2px 7px}
.fes-cm-tip{font-size:11px;color:${C.dim};margin-bottom:7px}
.fes-cm-open{font-size:11.5px;font-weight:700;color:${C.cyan}}
.fes-cm-integr{display:flex;align-items:stretch;gap:12px;margin-top:14px;flex-wrap:wrap}
.fes-cm-integr-l{flex:1;min-width:260px;background:linear-gradient(135deg,#12233b,#0e1a2e);border:1px solid ${C.emerald}44;border-radius:11px;padding:14px 16px}
.fes-cm-integr-t{font-size:15px;font-weight:800;color:#e8eefc;display:flex;align-items:center;gap:8px;margin-bottom:5px}
.fes-cm-integr-d{font-size:12px;color:${C.text};line-height:1.6}
.fes-cm-report{width:auto;min-width:230px;align-self:center;border-color:${C.emerald}55}
.fes-cm-report:hover{border-color:${C.emerald}}
.fes-cm-assess{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid ${C.line}}
.fes-cm-assess-chip{font-size:11.5px;color:#e8eefc;background:${C.panel};border:1px solid ${C.line2};border-radius:7px;padding:7px 12px}
.fes-cm-assess-note{font-size:10.5px;color:${C.dim};margin-left:auto}

/* Weekly lessons */
.fes-wk-rail{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px}
.fes-wk-chip{background:${C.panel};border:1px solid ${C.line2};color:${C.dim};border-radius:8px;padding:6px 10px;font-family:${C.mono};font-size:11.5px;font-weight:700;cursor:pointer;transition:.12s}
.fes-wk-chip:hover:not(:disabled){border-color:${C.cyan};color:${C.text}}
.fes-wk-chip.on{background:${C.cyan}18;border-color:${C.cyan};color:${C.cyan}}
.fes-wk-chip.off{opacity:.4;cursor:not-allowed}
.fes-wk-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.fes-wk-head-t{font-size:16px;color:#e8eefc}.fes-wk-head-t b{color:${C.cyan}}
.fes-wk-soon{font-size:10.5px;color:${C.amber};border:1px solid ${C.amber}55;border-radius:20px;padding:3px 10px}
.fes-wk-placeholder{background:${C.panel};border:1px dashed ${C.line2};border-radius:12px;padding:26px;text-align:center;color:${C.dim};font-size:13px}
.fes-wk-placeholder b{color:${C.text}}
.fes-wk-ph-btns{display:flex;gap:8px;justify-content:center;margin-top:14px}

/* Lesson deck (PPT-style, fixed stage) */
.fes-ppt{display:grid;grid-template-columns:196px minmax(0,1fr);gap:18px;align-items:start}
@media(max-width:820px){.fes-ppt{grid-template-columns:1fr}}
.fes-ppt-side{position:sticky;top:8px;display:flex;flex-direction:column;gap:8px}
@media(max-width:820px){.fes-ppt-side{position:static}}
.fes-ppt-rail{display:flex;flex-direction:column;gap:5px;max-height:min(74vh,620px);overflow-y:auto;padding-right:4px;margin-top:4px}
@media(max-width:820px){.fes-ppt-rail{flex-direction:row;flex-wrap:nowrap;overflow-x:auto;max-height:none}}
.fes-ppt-chip{position:relative;display:flex;align-items:baseline;gap:7px;text-align:left;background:${C.panel};border:1px solid ${C.line2};color:${C.text};border-radius:9px;padding:8px 10px;cursor:pointer;transition:.14s;white-space:nowrap}
.fes-ppt-chip:hover:not(:disabled){border-color:${C.cyan}}
.fes-ppt-chip.on{background:${C.cyan}1c;border-color:${C.cyan};box-shadow:inset 3px 0 0 ${C.cyan}}
.fes-ppt-chip.off{opacity:.42;cursor:not-allowed}
.fes-ppt-chip.done{border-color:${C.emerald}55}
.fes-ppt-chip-n{font-family:${C.mono};font-size:10px;letter-spacing:.5px;color:${C.cyan};font-weight:700;flex:none}
.fes-ppt-chip.off .fes-ppt-chip-n{color:${C.dim}}
.fes-ppt-chip-t{font-size:11.5px;font-weight:600;color:#dfe8fb;overflow:hidden;text-overflow:ellipsis}
.fes-ppt-chip.off .fes-ppt-chip-t{color:${C.dim}}
.fes-ppt-chip-mk{margin-left:auto;font-size:10px;color:${C.emerald};flex:none}
.fes-ppt-main{min-width:0}
.fes-ppt-toggle{align-self:flex-start;background:${C.panel};border:1px solid ${C.line2};color:${C.cyan};border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap}
.fes-ppt-toggle:hover{border-color:${C.cyan}}
.fes-ppt.toc-min{grid-template-columns:58px minmax(0,1fr)}
.fes-ppt.toc-min .fes-ppt-hide{display:none}
.fes-ppt.toc-min .fes-ppt-toggle{align-self:stretch;padding:4px 0}
.fes-ppt.toc-min .fes-cb-progress{justify-content:center}
.fes-ppt.toc-min .fes-ppt-chip{justify-content:center;padding:8px 0}
.fes-ppt.toc-min .fes-ppt-chip-mk{display:none}
@media(max-width:820px){.fes-ppt.toc-min{grid-template-columns:1fr}}
.fes-ld-dots{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;flex:1}
.fes-ld-dot{width:26px;height:6px;border-radius:20px;background:#1b2c48;border:none;cursor:pointer;transition:.15s;padding:0}
.fes-ld-dot.done{background:${C.cyan}66}
.fes-ld-dot.on{background:${C.cyan};box-shadow:0 0 0 3px ${C.cyan}22}
.fes-ld-slide{background:linear-gradient(180deg,#0f1524,#0a0e18);border:1px solid ${C.line};border-radius:14px;overflow:hidden;height:min(72vh,660px);display:flex;flex-direction:column;box-shadow:0 8px 30px #0006}
.fes-ld-head{position:relative;background:linear-gradient(90deg,${C.elec}22,${C.elec}08 60%,transparent);border-bottom:1px solid ${C.line};border-left:4px solid ${C.elec};padding:13px 24px;flex:none}
.fes-ld-head:after{content:'';position:absolute;right:20px;top:14px;width:30px;height:30px;border-radius:9px;background:radial-gradient(circle at 30% 30%,${C.neon}55,${C.elec}22);opacity:.5}
.fes-ld-step{font-family:${C.mono};font-size:11px;letter-spacing:1.2px;color:${C.neon};font-weight:700}
.fes-slide-audio-wrap{position:absolute;right:62px;top:12px;display:flex;gap:6px}
.fes-slide-audio{display:inline-flex;align-items:center;gap:6px;min-height:34px;padding:0 12px;border-radius:999px;border:1px solid ${C.cyan}88;background:${C.cyan}14;color:${C.cyan};font-family:${C.mono};font-size:12px;font-weight:700;cursor:pointer;transition:.15s;-webkit-tap-highlight-color:transparent}
.fes-slide-audio:hover{background:${C.cyan}2a}
.fes-slide-audio.on{background:${C.cyan};color:#061018;border-color:${C.cyan}}
.fes-slide-audio.on.paused{background:${C.amber};border-color:${C.amber};color:#1a1200}
.fes-slide-audio.stop{border-color:${C.dim};color:${C.text};background:transparent}
.fes-slide-audio small{font-weight:500;opacity:.75;margin-left:2px}
@media (max-width:640px){.fes-slide-audio-wrap{position:static;margin-top:8px}}
.fes-ld-step-sep{margin:0 8px;color:${C.dim};letter-spacing:0}
.fes-ld-title{font-size:22px;font-weight:800;color:#fff;margin-top:4px;letter-spacing:-.2px;text-wrap:balance;max-width:92%}
.fes-ld-body{font-size:15px;line-height:1.72;padding:22px 30px 24px;flex:1;min-height:0;overflow-y:auto}
.fes-slideart{margin:20px auto 4px;width:100%;max-width:1000px;border:1px solid ${C.line2};border-radius:14px;overflow:hidden;background:#0b1220;box-shadow:0 10px 34px rgba(0,0,0,.45)}
.fes-slideart svg{display:block;width:100%;height:auto}
.fes-story-split{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:30px;align-items:center;height:100%}
.fes-story-split .fes-manga{margin:0}
.fes-story-split .fes-manga-svg{padding:16px}
.fes-story-split .fes-wk-story{margin:0;font-size:15.5px;line-height:1.78;padding:20px 22px}
.fes-story-split .fes-wk-story-ic{font-size:34px}
@media(max-width:760px){.fes-story-split{grid-template-columns:1fr;align-items:start}}

/* 이론(PPT) 슬라이드 */
.fes-th{height:100%;display:flex;flex-direction:column}
/* 세로 가운데 정렬은 justify-content:center 대신 자동 여백으로 한다. 슬라이드 위에 계기판 그림(fa-wrap)이
   붙고 화면이 낮으면(1280×720 프로젝터) 본문이 칸보다 커지는데, justify-content:center 는 넘친 만큼을
   위로도 밀어내 첫 문단이 그림을 덮었다. 자동 여백은 공간이 모자라면 0 이 되어 위로 넘치지 않는다. */
.fes-th>:first-child{margin-top:auto}.fes-th>:last-child{margin-bottom:auto}
.fes-th-lead{font-size:17px;line-height:1.7;color:#eaf1ff;border-left:3px solid ${C.neon};background:${C.neon}0e;padding:13px 17px;border-radius:0 9px 9px 0;margin-bottom:16px}
.fes-th-lead b{color:${C.neon}}
.fes-th-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:900px){.fes-th-list{grid-template-columns:1fr}}
.fes-th-point{position:relative;background:${C.panel};border:1px solid ${C.line2};border-radius:11px;padding:14px 16px 14px 42px;font-size:15px;line-height:1.66;color:${C.text}}
.fes-th-point b{color:${C.neon};font-weight:700}
.fes-th-mk{position:absolute;left:16px;top:17px;width:10px;height:10px;background:${C.elec};transform:rotate(45deg);border-radius:2px;box-shadow:0 0 8px ${C.elec}88}
.fes-ld-nav{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:14px}
.fes-ld-count{font-family:${C.mono};font-size:12px;color:${C.dim}}
.fes-wk-p{font-size:15px;line-height:1.8;color:${C.text}}.fes-wk-p b{color:${C.cyan}}
.fes-wk-hint{font-size:12.5px;color:${C.dim};margin:14px 0 0}.fes-wk-hint b{color:${C.text}}
.fes-wk-roles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
@media(max-width:600px){.fes-wk-roles{grid-template-columns:1fr}}
.fes-wk-role{background:${C.panel};border:1px solid ${C.line2};border-radius:11px;padding:14px}
.fes-wk-role-h{display:flex;align-items:center;gap:8px;font-size:15px;color:#e8eefc;margin-bottom:8px}
.fes-wk-role-h span{font-size:22px}
.fes-wk-role-en{font-size:12.5px;color:${C.text};line-height:1.6;margin-bottom:8px}
.fes-wk-role-ko{font-size:11.5px;color:${C.dim};border-top:1px solid ${C.line};padding-top:8px}
.fes-wk-diag{display:flex;flex-direction:column;gap:12px}
.fes-pd-wrap{display:grid;grid-template-columns:1.55fr 1fr;gap:14px;align-items:start}
@media(max-width:640px){.fes-pd-wrap{grid-template-columns:1fr}}
.fes-pd-legend{display:flex;flex-direction:column;gap:7px}
.fes-pd-leg{display:flex;align-items:center;gap:11px;text-align:left;background:${C.panel};border:1px solid ${C.line2};border-radius:9px;padding:8px 11px;cursor:pointer;transition:.12s}
.fes-pd-leg:hover{border-color:${C.neon}88}
.fes-pd-leg.on{border-color:${C.neon};background:${C.neon}14}
.fes-pd-num{width:22px;height:22px;border-radius:50%;background:${C.elec};color:#fff;font-family:${C.mono};font-size:12px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex:none}
.fes-pd-leg b{color:#e8f6ff;font-size:13px}
.fes-pd-ko{display:block;color:${C.dim};font-size:11px;margin-top:1px}
.fes-wk-svg{width:100%;border:1px solid ${C.line};border-radius:10px;display:block}
.fes-wk-partinfo{background:${C.panel};border:1px solid ${C.line2};border-left:3px solid ${C.cyan};border-radius:10px;padding:14px}
.fes-wk-partinfo-en{font-size:17px;font-weight:800;color:${C.cyan}}
.fes-wk-partinfo-ko{font-size:12px;color:${C.dim};font-weight:400;margin-left:6px}
.fes-wk-partinfo-desc{font-size:13.5px;color:${C.text};line-height:1.6;margin-top:8px}
.fes-wk-partinfo-hint{font-size:11px;color:${C.dim};margin-top:12px}
.fes-wk-manual{background:#060c17;border:1px solid ${C.line};border-radius:10px;padding:16px 18px}
.fes-wk-manual-h{font-family:${C.mono};font-size:11px;letter-spacing:1px;color:${C.cyan};margin-bottom:10px}
.fes-wk-manual p{font-size:14.5px;line-height:1.9;color:${C.text};margin:0}
.fes-wk-manual b{color:#bfe9f5;font-weight:700}
.fes-wk-quiz-intro{font-size:12.5px;color:${C.dim};margin:0 0 12px}
.fes-wk-qn{font-family:${C.mono};color:${C.cyan};font-size:12px;margin-right:4px}
/* ===== 모사 EDA 툴 GUI ===== */
.eda{border:1px solid ${C.line2};border-radius:9px;overflow:hidden;background:#101a28;font-family:${C.mono};box-shadow:0 6px 20px rgba(0,0,0,.32)}
.eda-tb{display:flex;align-items:center;gap:7px;background:#0c1521;padding:6px 11px;border-bottom:1px solid #22334c}
.eda-dot{width:10px;height:10px;border-radius:50%;display:inline-block}
.eda-app{font-weight:800;color:#dbe8fb;font-size:12px;margin-left:4px}.eda-doc{color:#6f86a6;font-size:11.5px}
.eda-menus{margin-left:16px;display:flex;gap:13px;color:#8ea4c4;font-size:11px}
.eda-tools{display:flex;gap:6px;padding:5px 11px;background:#0f1a29;border-bottom:1px solid #1c2c44}
.eda-tool{font-size:10.5px;color:#a9bcd8;border:1px solid #2a3d5f;border-radius:4px;padding:2px 9px;background:#13202f}
.eda-tool.on{background:${C.cyan};color:#062230;border-color:${C.cyan};font-weight:700}
.eda-slide{height:100%;display:flex;flex-direction:column}
.eda-slide>:first-child{margin-top:auto}.eda-slide>:last-child{margin-bottom:auto}   /* .fes-th 와 같은 이유 */
.eda-slide .fes-doc-tag{margin-bottom:6px}
.eda-slide .fes-doc-help{margin-top:8px;padding:8px 13px}
.eda-slide .fes-doc-help-h{margin-bottom:4px}
.eda-slide .fes-doc-gloss{gap:4px 16px}
.eda-slide .fes-doc-gloss span{font-size:12px}
.eda-body{display:flex;height:clamp(160px,24vh,250px)}
.eda-left{width:138px;flex:none;background:#0d1725;border-right:1px solid #1c2c44;padding:7px 8px}
.eda-ph{font-size:9.5px;letter-spacing:1px;color:#7f96b6;margin-bottom:7px;text-transform:uppercase}
.eda-row{display:flex;align-items:center;gap:5px;padding:2.5px 0;font-size:11px;color:#c2d2ea}
.eda-sw{width:11px;height:11px;border-radius:2px;border:1px solid #33465f;flex:none}.eda-sw.off{background:transparent}
.eda-chk{color:#6f86a6;font-size:11px}.eda-chk.off{color:#3d4d63}
.eda-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.eda-canvas{flex:1;min-width:0;background:#0a1420;background-image:linear-gradient(#26364a55 1px,transparent 1px),linear-gradient(90deg,#26364a55 1px,transparent 1px);background-size:48px 48px;background-position:-1px -1px;display:flex;align-items:stretch;overflow:hidden}
.eda-canvas svg{display:block;width:100%;height:100%}
.eda-console{background:#0a121e;border-top:1px solid #1c2c44;padding:5px 11px;font-size:11px;line-height:1.5;color:#8ea4c4}
.eda-log.err{color:#f28b7d}.eda-log.ok{color:#6fe0a0}
.eda-status{background:#0c1521;border-top:1px solid #22334c;padding:4px 11px;font-size:10px;color:#6f86a6}
/* ===== 매뉴얼 표본 (printed English document look) ===== */
.fes-doc-tag{font-size:11.5px;color:${C.dim};margin:0 0 8px;font-weight:600}
.fes-doc{background:#f4efe2;color:#1c1913;border:1px solid #cabf9f;border-radius:8px;padding:18px 20px;box-shadow:0 6px 20px rgba(0,0,0,.3);font-family:'Georgia','Times New Roman',serif}
.fes-doc-hd{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #1c1913;padding-bottom:7px;margin-bottom:12px;flex-wrap:wrap}
.fes-doc-name{font-weight:800;font-size:13px;letter-spacing:.3px;text-transform:uppercase}
.fes-doc-meta{font-family:${C.mono};font-size:10.5px;color:#6b6350}
.fes-doc-h{font-size:16px;font-weight:800;margin:0 0 10px}
.fes-doc-intro{font-size:13.5px;line-height:1.6;margin:0 0 10px;color:#3a352a}
.fes-doc-steps{margin:0;padding:0 0 0 4px;list-style:none;counter-reset:dc}
.fes-doc-steps>li{counter-increment:dc;position:relative;padding:5px 0 5px 30px;font-size:14px;line-height:1.55;border-bottom:1px dotted #cabf9f}
.fes-doc-steps>li:last-child{border-bottom:none}
.fes-doc-steps>li::before{content:counter(dc) ".";position:absolute;left:0;top:5px;font-weight:800;color:#8a5a1a}
.fes-doc em{font-style:normal;font-weight:800;background:#e4d29a;border-radius:3px;padding:0 3px}
.fes-doc-note{margin:8px 0 4px;padding:7px 11px;border-radius:5px;font-family:${C.sans};font-size:12.5px;line-height:1.5;border-left:4px solid}
.fes-doc-note b{font-family:${C.mono};font-size:11px;letter-spacing:.5px;margin-right:6px}
.fes-doc-warning,.fes-doc-danger{background:#f6dcd6;border-color:#c4402f;color:#5c1810}
.fes-doc-caution{background:#f6e6c8;border-color:#d38a25;color:#5a3c08}
.fes-doc-note.fes-doc-note{background:#e6ecd6;border-color:#7a8a4a;color:#33401a}
.fes-doc-fig{margin-top:11px;font-style:italic;font-size:12.5px;color:#6b6350}
.fes-doc-email .fes-mail-hd{border-bottom:1px solid #cabf9f;padding-bottom:9px;margin-bottom:11px;font-family:${C.mono};font-size:12.5px;line-height:1.9}
.fes-mail-hd span{display:inline-block;width:62px;color:#6b6350;font-size:10.5px;text-transform:uppercase;letter-spacing:.5px}
.fes-mail-body p{font-size:13.5px;line-height:1.65;margin:0 0 9px}
.fes-mail-sign{font-size:13px;color:#3a352a;border-top:1px dotted #cabf9f;padding-top:9px;white-space:pre-line}
.fes-parts{width:100%;border-collapse:collapse;font-family:${C.mono};font-size:12px}
.fes-parts th{text-align:left;background:#e6dcc0;border:1px solid #cabf9f;padding:6px 9px;font-size:10.5px;letter-spacing:.5px;text-transform:uppercase}
.fes-parts td{border:1px solid #cabf9f;padding:6px 9px}
.fes-doc-help{margin-top:10px;background:${C.panel};border:1px solid ${C.line2};border-radius:9px;padding:11px 14px}
.fes-doc-help-h{font-size:11px;font-weight:700;letter-spacing:1px;color:${C.cyan};margin-bottom:7px}
.fes-doc-gloss{display:flex;flex-wrap:wrap;gap:7px 18px}
.fes-doc-gloss span{font-size:12.5px;color:${C.text}}
.fes-doc-gloss b{color:#e8f6ff}
/* ===== 오늘의 현장 · 상황 설정 브리핑 ===== */
.fes-scene{background:linear-gradient(135deg,#111d33,#0b1626);border:1px solid ${C.line2};border-left:4px solid ${C.amber};border-radius:14px;padding:18px 20px;box-shadow:0 8px 26px rgba(0,0,0,.3)}
.fes-scene-bg{margin:-4px -6px 15px;border-radius:10px;overflow:hidden;border:1px solid ${C.line2};box-shadow:0 4px 14px rgba(0,0,0,.25)}
.fes-scene-bg svg{width:100%;height:auto;display:block}
.fes-scene-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px dashed ${C.line2}}
.fes-scene-k{font-size:16px;font-weight:800;color:${C.amber}}
.fes-scene-tag{font-family:${C.mono};font-size:10.5px;font-weight:700;letter-spacing:2px;color:${C.dim};border:1px solid ${C.line2};border-radius:5px;padding:3px 9px}
.fes-scene-rows{display:flex;flex-direction:column;gap:12px}
.fes-scene-row{display:flex;gap:12px;align-items:flex-start}
.fes-scene-ic{font-size:19px;flex:none;width:24px;text-align:center;margin-top:1px}
.fes-scene-lbl{font-family:${C.mono};font-size:10.5px;font-weight:700;letter-spacing:1.2px;color:${C.dim};margin-bottom:3px}
.fes-scene-val{font-size:14.5px;line-height:1.65;color:${C.text}}
.fes-scene-meet{margin-top:15px;padding-top:13px;border-top:1px dashed ${C.line2}}
.fes-scene-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}
.fes-scene-chip{font-size:12px;color:#dbe8fb;background:${C.cyan}14;border:1px solid ${C.cyan}44;border-radius:20px;padding:5px 12px}
.fes-scene-goal{margin-top:15px;background:${C.amber}12;border:1px solid ${C.amber}44;border-radius:10px;padding:11px 14px;font-size:13.5px;line-height:1.6;color:#f4e6cf}
.fes-scene-goal b{color:${C.amber}}
.fes-scene-cue{margin-top:13px;font-size:12px;color:${C.dim};font-style:italic;text-align:center}
/* ===== 현장 자료 삽화 (field artifacts) ===== */
.fa-wrap{display:flex;flex-wrap:wrap;gap:12px;margin:0 0 16px}
.fa-fig{margin:0;flex:1 1 240px;min-width:0;display:flex;flex-direction:column}
.fa-fig>*:first-child{flex:1}
.fa-cap{font-size:11px;color:${C.dim};margin-top:6px;line-height:1.5}
.fa-en{font-family:${C.sans};font-weight:800;color:#f3f6fb;letter-spacing:.2px}
.fa-ko{font-size:11.5px;color:${C.dim};margin-top:3px;line-height:1.5}
.fa-fig em,.fa-log em,.fa-note em,.fa-step em{font-style:normal;font-weight:800;color:${C.cyan};background:${C.cyan}1a;border-radius:4px;padding:0 3px}
/* sticker / placard */
.fa-sticker{border:2px solid;border-radius:10px;overflow:hidden;background:#0e1726}
.fa-st-hd{font-family:${C.mono};font-size:11px;font-weight:800;letter-spacing:2px;padding:5px 11px;color:#0e1726}
.fa-st-bd{padding:11px 13px}.fa-st-bd .fa-en{font-size:16px;line-height:1.35}
.fa-danger{border-color:${C.red}}.fa-danger .fa-st-hd{background:${C.red}}
.fa-warn{border-color:${C.amber}}.fa-warn .fa-st-hd{background:${C.amber}}
.fa-caution{border-color:#eab308}.fa-caution .fa-st-hd{background:#eab308}
.fa-info{border-color:${C.cyan}}.fa-info .fa-st-hd{background:${C.cyan}}
.fa-note.fa-note{border:none}
.fa-danger .fa-en{color:#ffd9d3}.fa-warn .fa-en,.fa-caution .fa-en{color:#ffe9c2}
/* HMI screen */
.fa-hmi{border:2px solid ${C.line2};border-radius:10px;background:#0a1420;overflow:hidden;box-shadow:inset 0 0 0 4px #060d16}
.fa-hmi-top{display:flex;justify-content:space-between;align-items:center;padding:7px 11px;background:#0d1a2b;font-family:${C.mono};font-size:11px;color:${C.dim};border-bottom:1px solid ${C.line}}
.fa-chip{font-weight:800;padding:2px 9px;border-radius:5px;font-size:10.5px;letter-spacing:1px}
.fa-s-idle{background:#334155;color:#cbd5e1}.fa-s-run{background:${C.emerald};color:#052e1b}.fa-s-fault{background:${C.red};color:#3a0a06}.fa-s-down{background:${C.amber};color:#3a2a05}
.fa-hmi-body{padding:9px 11px;font-family:${C.mono};font-size:12px}
.fa-hmi-row{display:flex;justify-content:space-between;padding:3px 0;color:#b7c6de;border-bottom:1px dashed ${C.line}}
.fa-hmi-row:last-child{border-bottom:none}
.fa-v-ok{color:${C.emerald};font-weight:700}.fa-v-high,.fa-v-bad{color:${C.red};font-weight:800}.fa-v-warn{color:${C.amber};font-weight:800}
.fa-hmi-bn{padding:6px 11px;font-family:${C.mono};font-size:12px;font-weight:800;text-align:center;color:#fff}
.fa-hmi-bn b{display:block;font-weight:500;font-size:10.5px;opacity:.85;margin-top:1px}
.fa-hmi-bn.fa-danger{background:${C.red}}.fa-hmi-bn.fa-warn{background:${C.amber};color:#3a2a05}
/* alarm banner */
.fa-alarm{display:flex;gap:10px;align-items:center;border-radius:9px;padding:10px 13px;border-left:5px solid}
.fa-alarm.fa-danger{background:${C.red}1e;border-color:${C.red}}.fa-alarm.fa-warn{background:${C.amber}1e;border-color:${C.amber}}
.fa-al-ic{font-size:18px}.fa-alarm.fa-danger .fa-al-ic{color:${C.red}}.fa-alarm.fa-warn .fa-al-ic{color:${C.amber}}
.fa-al-tx .fa-en{font-size:14.5px}.fa-al-code{font-family:${C.mono};font-size:11px;background:#0e1726;color:${C.dim};padding:1px 6px;border-radius:4px;margin-right:7px}
/* meter SP/PV */
.fa-meter{border:1px solid ${C.line2};border-radius:9px;padding:10px 13px;background:${C.panel}}
.fa-mt-nm{font-size:11px;color:${C.dim};font-family:${C.mono};margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px}
.fa-mt-vals{display:flex;align-items:baseline;gap:12px;font-family:${C.mono}}
.fa-mt-sp{font-size:13px;color:#8aa0bf}.fa-mt-pv{font-size:19px;font-weight:800}.fa-mt-u{font-size:12px;color:${C.dim}}
.fa-mt-pv.fa-v-ok{color:${C.emerald}}
/* buttons */
.fa-btns{display:flex;flex-wrap:wrap;gap:8px}
.fa-btn{font-family:${C.mono};font-size:12px;font-weight:800;letter-spacing:1px;padding:8px 15px;border-radius:7px;border:1.5px solid ${C.line2};color:#c8d6ec;background:${C.panel2}}
.fa-b-go{background:${C.emerald};color:#052e1b;border-color:${C.emerald}}.fa-b-stop{background:${C.red};color:#fff;border-color:${C.red}}.fa-b-warn{background:${C.amber};color:#3a2a05;border-color:${C.amber}}
/* log printout */
.fa-log{border:1px solid ${C.line2};border-radius:9px;overflow:hidden;background:#0b1422}
.fa-log-hd{font-family:${C.mono};font-size:11px;font-weight:800;letter-spacing:1px;color:${C.amber};padding:7px 12px;background:#111e30;border-bottom:1px solid ${C.line}}
.fa-log-bd{padding:9px 12px;font-family:${C.mono};font-size:11.5px;line-height:1.7;color:#b7c6de}
.fa-log-ln{white-space:pre-wrap}
/* work-instruction note */
.fa-note{border:1px solid ${C.amber}66;border-left:4px solid ${C.amber};border-radius:9px;padding:10px 13px;background:${C.amber}12}
.fa-nt-hd{font-family:${C.mono};font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:${C.amber};margin-bottom:5px}
.fa-note .fa-en{font-size:14.5px;line-height:1.4}
/* SOP steps */
.fa-step{border:1px solid ${C.line2};border-radius:9px;padding:10px 13px 10px 10px;background:${C.panel}}
.fa-sp-hd{font-family:${C.mono};font-size:10.5px;font-weight:800;letter-spacing:1.5px;color:${C.cyan};margin:0 0 6px 3px}
.fa-sp-ol{margin:0;padding:0 0 0 4px;list-style:none;counter-reset:sp}
.fa-sp-ol li{counter-increment:sp;position:relative;padding:4px 0 4px 30px;border-bottom:1px dashed ${C.line}}
.fa-sp-ol li:last-child{border-bottom:none}
.fa-sp-ol li::before{content:counter(sp);position:absolute;left:0;top:4px;width:20px;height:20px;border-radius:50%;background:${C.cyan};color:#052430;font-weight:800;font-size:11px;text-align:center;line-height:20px}
.fa-sp-ol .fa-en{font-size:13.5px;display:inline}.fa-sp-ol .fa-ko{display:inline;margin-left:8px}
/* layer stack */
.fa-stack{border:2px solid ${C.line2};border-radius:8px;overflow:hidden}
.fa-sk-row{display:flex;justify-content:space-between;align-items:center;padding:7px 12px;border-bottom:1px solid #0006}
.fa-sk-row:last-child{border-bottom:none}.fa-sk-row .fa-en{color:#10202e;font-size:13px}.fa-sk-row .fa-ko{color:#10202e;opacity:.7;margin-top:0}
.fes-manga{margin:0 0 14px}
.fes-manga-svg{background:linear-gradient(135deg,#132338,#0e1a2e);border:1px solid ${C.line2};border-radius:14px;padding:12px;box-shadow:0 6px 22px rgba(0,0,0,.28)}
.fes-manga-svg svg{width:100%;height:auto;display:block;border-radius:6px}
.fes-wk-story{display:flex;gap:14px;align-items:flex-start;background:linear-gradient(135deg,#132338,#0e1a2e);border:1px solid ${C.line2};border-left:3px solid ${C.amber};border-radius:12px;padding:16px 18px;font-size:14px;line-height:1.8;color:${C.text}}
.fes-wk-story-ic{font-size:30px;flex:none}
.fes-wk-story b{color:${C.amber}}.fes-wk-story i{color:#bfe9f5;font-style:italic}
.fes-wk-gloss{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
@media(max-width:600px){.fes-wk-gloss{grid-template-columns:1fr 1fr}}
.fes-wk-gloss-item{background:${C.panel};border:1px solid ${C.line2};border-radius:10px;padding:12px}
.fes-wk-gloss-en{font-size:16px;font-weight:800;color:${C.cyan}}
.fes-wk-gloss-ko{font-size:12px;color:#e8eefc;margin:2px 0 6px}
.fes-wk-gloss-d{font-size:11.5px;color:${C.dim};line-height:1.5}
.fes-wk-table{width:100%;border-collapse:collapse;font-size:13px}
.fes-wk-table th{background:${C.panel};color:${C.cyan};font-family:${C.mono};font-size:11px;letter-spacing:.5px;text-align:left;padding:9px 12px;border:1px solid ${C.line2}}
.fes-wk-table td{border:1px solid ${C.line};padding:9px 12px;color:${C.text};vertical-align:top}
.fes-wk-td-en{color:#bfe9f5;font-family:${C.mono};font-weight:700}
.fes-wk-gloss-ex{font-family:${C.mono};font-size:11px;color:${C.emerald};margin-top:6px;font-style:italic}

/* Chapter book */
.fes-cb-progress{display:flex;align-items:center;gap:10px;font-size:12px;color:${C.dim};margin-bottom:12px}
.fes-cb-bar{flex:1;height:8px;background:#0a1526;border-radius:20px;overflow:hidden}
.fes-cb-bar>div{height:100%;background:linear-gradient(90deg,${C.cyan},${C.emerald});transition:width .4s}
.fes-cb-rail{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin-bottom:14px}
.fes-cb-chip{position:relative;display:flex;flex-direction:column;gap:2px;text-align:left;background:${C.panel};border:1px solid ${C.line2};color:${C.text};border-radius:10px;padding:9px 11px;cursor:pointer;transition:.14s}
.fes-cb-chip:hover:not(:disabled){border-color:${C.cyan}}
.fes-cb-chip.on{background:${C.cyan}18;border-color:${C.cyan}}
.fes-cb-chip.off{opacity:.45;cursor:not-allowed}
.fes-cb-chip.done{border-color:${C.emerald}66}
.fes-cb-chip-n{font-family:${C.mono};font-size:10px;letter-spacing:1px;color:${C.cyan}}
.fes-cb-chip.off .fes-cb-chip-n{color:${C.dim}}
.fes-cb-chip-t{font-size:12.5px;font-weight:600;color:#e8eefc}
.fes-cb-chip.off .fes-cb-chip-t{color:${C.dim}}
.fes-cb-check{position:absolute;top:8px;right:9px;color:${C.emerald};font-weight:800;font-size:13px}
.fes-cb-lock{position:absolute;top:8px;right:9px;font-size:11px}
.fes-cb-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.fes-cb-head-t{font-size:16px;font-weight:800;color:#e8eefc}
.fes-cb-done-tag{font-size:10.5px;color:${C.emerald};border:1px solid ${C.emerald}55;border-radius:20px;padding:3px 10px}
.fes-cb-summary{margin:0 0 14px;padding-left:20px;font-size:14px;line-height:2}
.fes-cb-summary b{color:${C.cyan}}
.fes-cb-complete{background:${C.emerald}12;border:1px solid ${C.emerald}44;border-radius:10px;padding:12px 14px;font-size:13px;color:#d7ffe9}
.fes-cb-complete b{color:${C.emerald}}
.fes-wr-prompt{font-size:14.5px;line-height:1.7;color:${C.text};margin-bottom:10px}
.fes-wr-prompt b{color:${C.cyan}}
.fes-wr-en{display:inline-block;margin-top:6px;font-family:${C.mono};font-size:14px;color:#bfe9f5;background:#0b1424;border:1px solid ${C.line2};border-radius:6px;padding:6px 10px}
.fes-wr-ko{display:inline-block;margin-top:6px;font-size:15px;color:#e8eefc;background:#0b1424;border:1px solid ${C.line2};border-radius:6px;padding:6px 10px}

/* 현장 둘러보기 (tour) */
.fes-tour{display:flex;flex-direction:column;gap:8px}
.fes-tour-item{display:flex;align-items:center;gap:12px;background:${C.panel};border:1px solid ${C.line2};border-radius:10px;padding:11px 14px}
.fes-tour-ic{font-size:24px;flex:none}
.fes-tour-area{font-size:13px;font-weight:700;color:#e8eefc}
.fes-tour-en{font-family:${C.mono};font-size:12.5px;color:#bfe9f5;margin:2px 0}
.fes-tour-ko{font-size:11.5px;color:${C.dim}}

/* 대화문 (dialogue) */
.fes-dlg{display:flex;flex-direction:column;gap:10px}
.fes-dlg-row{display:flex;flex-direction:column;max-width:80%}
.fes-dlg-row.me{align-self:flex-end;align-items:flex-end}
.fes-dlg-who{font-family:${C.mono};font-size:10.5px;color:${C.dim};margin-bottom:3px;padding:0 4px}
.fes-dlg-bubble{background:${C.panel2};border:1px solid ${C.line2};border-radius:12px 12px 12px 4px;padding:10px 13px}
.fes-dlg-row.me .fes-dlg-bubble{background:${C.cyan}14;border-color:${C.cyan}44;border-radius:12px 12px 4px 12px}
.fes-dlg-en{font-size:14px;color:#e8f6ff}
.fes-dlg-ko{font-size:11.5px;color:${C.dim};margin-top:3px}

/* 영어 소스 3곳 (매뉴얼/지시문/HMI) */
.fes-src{display:flex;flex-direction:column;gap:10px}
.fes-src-item{background:#08101f;border:1px solid ${C.line2};border-left:3px solid ${C.cyan};border-radius:10px;padding:12px 15px}
.fes-src-top{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.fes-src-ic{font-size:18px}
.fes-src-k{font-family:${C.mono};font-size:12px;color:${C.cyan};font-weight:700;letter-spacing:.4px}
.fes-src-en{font-size:15px;color:#e8f6ff;line-height:1.5}
.fes-src-ko{font-size:11.5px;color:${C.dim};margin-top:4px}

/* Course Map 정적 안내 */
.fes-cm-guide-note{background:${C.cyan}12;border:1px solid ${C.cyan}33;border-radius:9px;padding:10px 13px;font-size:12.5px;color:#bfe9f5;margin-bottom:12px}
.fes-cm-guide-note b{color:#fff}
.fes-cm-what{font-size:13.5px;line-height:1.7;color:${C.text};margin-bottom:14px}
.fes-cm-day1{background:${C.panel};border:1px solid ${C.line2};border-radius:9px;padding:10px 14px;font-size:13.5px;font-weight:700;color:#e8eefc;margin:14px 0}
.fes-cm-parts{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:600px){.fes-cm-parts{grid-template-columns:1fr}}
.fes-cm-part{background:${C.panel};border:1px solid ${C.line2};border-radius:12px;padding:14px}
.fes-cm-part-full{margin-top:14px}
.fes-cm-part-h{font-family:${C.mono};font-size:12px;font-weight:700;letter-spacing:.4px;padding:7px 11px;border-radius:8px;margin-bottom:10px}
.fes-cm-part-h.fes-a{background:${C.cyan}14;color:${C.cyan};border:1px solid ${C.cyan}40}
.fes-cm-part-h.fes-b{background:${C.violet}14;color:${C.violet};border:1px solid ${C.violet}40}
.fes-cm-part-h.fes-c{background:${C.emerald}14;color:${C.emerald};border:1px solid ${C.emerald}40}
.fes-cm-part-row{display:flex;gap:11px;align-items:flex-start;padding:8px 4px;border-top:1px solid ${C.line}}
.fes-cm-part-row:first-of-type{border-top:none}
.fes-cm-part-ch{font-family:${C.mono};font-size:11px;color:${C.amber};border:1px solid ${C.amber}44;border-radius:6px;padding:2px 7px;flex:none;margin-top:1px}
.fes-cm-part-row div{display:flex;flex-direction:column}
.fes-cm-part-row b{font-size:13.5px;color:#e8eefc}
.fes-cm-part-row span{font-size:11.5px;color:${C.dim};margin-top:1px}

/* 장치 계기판 디스플레이 */
.fes-dev-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}
.fes-dev-led{background:#04070d;border:1px solid ${C.line2};border-radius:9px;padding:10px 12px}
.fes-dev-led-label{font-family:${C.mono};font-size:10px;letter-spacing:1px;color:${C.dim}}
.fes-dev-led-val{font-family:${C.mono};font-size:24px;font-weight:700;color:${C.emerald};text-shadow:0 0 8px ${C.emerald}66;margin-top:3px;line-height:1}
.fes-dev-led-val.bad{color:${C.red};text-shadow:0 0 8px ${C.red}66;animation:fesBlink 1s infinite}
.fes-dev-led-unit{font-size:11px;color:${C.dim};margin-left:4px;text-shadow:none;font-weight:400}
.fes-dev-led-ko{font-size:10.5px;color:${C.dim};margin-top:4px}
.fes-dev-row{display:grid;grid-template-columns:1fr 1.3fr;gap:10px;margin-top:10px}
@media(max-width:560px){.fes-dev-row{grid-template-columns:1fr}}
.fes-dev-status,.fes-dev-vib{background:#04070d;border:1px solid ${C.line2};border-radius:9px;padding:11px 13px}
.fes-dev-sub{font-family:${C.mono};font-size:10px;letter-spacing:1px;color:${C.cyan};margin-bottom:8px}
.fes-dev-vibko{color:${C.dim};letter-spacing:0}
.fes-dev-stat{display:flex;align-items:center;gap:8px;font-family:${C.mono};font-size:12px;color:${C.text};padding:3px 0}
.fes-dev-dot{width:10px;height:10px;border-radius:50%;flex:none}
.fes-dev-dot.grn{background:${C.emerald};box-shadow:0 0 6px ${C.emerald}}
.fes-dev-dot.red{background:${C.red};box-shadow:0 0 6px ${C.red};animation:fesBlink 1s infinite}
.fes-dev-dot.off{background:#28344a}
.fes-vib-svg{width:100%;height:56px;display:block;background:#060c17;border-radius:6px}
.fes-dev-vib-val{font-family:${C.mono};font-size:13px;color:${C.emerald};margin-top:6px}
.fes-dev-vib-val.bad{color:${C.red}}

/* 의사소통 코너 */
.fes-comm{display:flex;flex-direction:column;gap:14px}
.fes-comm-turn{background:${C.panel};border:1px solid ${C.line2};border-radius:12px;padding:14px}
.fes-comm-sit{font-size:12.5px;color:${C.amber};margin-bottom:10px}
.fes-comm-sit b{color:${C.amber}}
.fes-comm-who{font-family:${C.mono};font-size:10.5px;color:${C.dim};display:block;margin-bottom:4px}
.fes-comm-them{background:${C.panel2};border:1px solid ${C.line2};border-radius:10px 10px 10px 3px;padding:10px 13px;margin-bottom:10px}
.fes-comm-you{background:${C.cyan}12;border:1px solid ${C.cyan}44;border-radius:10px 10px 3px 10px;padding:10px 13px;margin-top:10px}
.fes-comm-en{font-size:14.5px;color:#e8f6ff;line-height:1.5}
.fes-comm-ko{font-size:11.5px;color:${C.dim};margin-top:3px}
/* ▶ 발음 버튼 — 터치 영역은 32px(모바일), 보이는 알약은 22px 로 문장 옆에 작게. 음수 margin 으로 줄 높이를 키우지 않는다 */
.fes-speak{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;margin:-6px 0 -6px 3px;width:32px;height:32px;padding:0;border:0;background:transparent;cursor:pointer;opacity:.85;transition:.15s;-webkit-tap-highlight-color:transparent}
.fes-speak-ic{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border:1px solid ${C.line2};background:${C.panel};border-radius:7px;font-size:9px;color:${C.cyan};line-height:1;padding-left:1px;transition:.15s}
.fes-speak:hover{opacity:1}
.fes-speak:hover .fes-speak-ic{border-color:${C.cyan};background:${C.panel2}}
.fes-speak:active .fes-speak-ic{transform:scale(.9)}
.fes-speak.on .fes-speak-ic{background:${C.cyan};border-color:${C.cyan};color:#061018;padding-left:0}
.fes-speak:focus-visible{outline:2px solid ${C.cyan};outline-offset:-2px;border-radius:9px}
.fes-doc .fes-speak-ic,.fa-sticker .fes-speak-ic,.fa-alarm .fes-speak-ic{background:#fff;border-color:#8a99ad;color:#1d4e6b}
.fes-doc .fes-speak.on .fes-speak-ic,.fa-sticker .fes-speak.on .fes-speak-ic,.fa-alarm .fes-speak.on .fes-speak-ic{background:#1d4e6b;border-color:#1d4e6b;color:#fff}

/* 약어 설명 박스 */
.fes-wk-acr{background:${C.violet}12;border:1px solid ${C.violet}44;border-radius:8px;padding:9px 12px;font-size:12.5px;color:#d9ccff;line-height:1.6;margin-bottom:12px}
.fes-wk-acr b{color:${C.violet};font-family:${C.mono}}
.fes-illus-svg{width:100%;border:1px solid ${C.line};border-radius:10px;display:block;background:#0a0f1a;margin-top:4px}
.fes-art{margin:0}
.fes-art-img{width:100%;display:block;border-radius:12px;border:1px solid ${C.line};box-shadow:0 6px 24px #0007}
.fes-art-cap{font-size:12px;color:${C.dim};margin-top:9px;text-align:center}
.fes-illus-legend{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;font-size:11.5px;color:${C.dim}}
.fes-illus-legend b{color:#bfe9f5;font-family:${C.mono}}
.fes-wk-partinfo-role{font-size:12.5px;color:${C.emerald};margin-top:8px}
.fes-pm{display:flex;flex-direction:column;gap:8px}
.fes-pm-item{display:flex;align-items:center;gap:11px;background:${C.panel};border:1px solid ${C.line2};border-radius:9px;padding:11px 13px;cursor:pointer}
.fes-pm-item.on{border-color:${C.emerald};background:${C.emerald}12}
.fes-pm-item input{accent-color:${C.emerald};width:17px;height:17px;flex:none}
.fes-pm-en{font-size:14px;color:#e8f6ff}
.fes-pm-ko{font-size:11.5px;color:${C.dim};margin-top:2px}

/* ═══ 챕터 PDF 저장 ═══
   화면은 한 단계씩 넘기지만, 저장할 때는 챕터 전체를 종이용으로 펼친다.
   인쇄 대화상자의 "배경 그래픽" 이 기본으로 꺼져 있어서, 배경에 기대지 않고
   흰 종이 + 검은 글자로 뒤집는다. 학생이 그냥 눌러도 읽히는 PDF 가 나온다. */
.fes-ld-save{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:12px;
  padding-top:12px;border-top:1px dashed ${C.line}}
.fes-btn.pdf{background:linear-gradient(180deg,#16324f,#122438);border-color:${C.cyan};color:#e8f7fb;font-weight:700}
.fes-btn.pdf:hover:not(:disabled){border-color:#67e8f9;color:#fff}
.fes-ld-save-hint{font-size:11.5px;color:${C.dim};line-height:1.6}
.fes-ld-save-hint b{color:${C.text}}
.fes-print-doc{display:none}

@media print{
  @page{ size:297mm 210mm; margin:13mm 14mm 15mm; }
  html,body{ background:#fff !important; }
  body:has(> .fes-print-doc) > *{ display:none !important; }
  body > .fes-print-doc{ display:block !important; }

  .fes-print-doc{
    background:#fff !important; color:#1d2939 !important;
    border:0 !important; border-radius:0 !important; padding:0 !important;
    margin:0 !important; min-height:0 !important;
    font-size:11.5pt; line-height:1.62; }
  /* 배경·그림자를 걷어내고 글자를 종이 색으로 뒤집는다 */
  .fes-print-doc *, .fes-print-doc *::before, .fes-print-doc *::after{
    background:none !important; box-shadow:none !important; text-shadow:none !important;
    color:#1d2939 !important; -webkit-text-fill-color:#1d2939 !important;
    border-color:#d0d5dd !important; }
  .fes-print-doc h1,.fes-print-doc h2,.fes-print-doc h3,.fes-print-doc h4,
  .fes-print-doc b,.fes-print-doc strong{
    color:#0b2f45 !important; -webkit-text-fill-color:#0b2f45 !important; }
  /* SVG 삽화는 원래 색을 유지한다 (fill 은 CSS color 가 아니라 그대로 인쇄된다) */
  .fes-print-doc svg, .fes-print-doc svg *{ -webkit-text-fill-color:initial !important; }

  .fes-print-cover{ text-align:center; padding:56mm 0 0; break-after:page; page-break-after:always; }
  .fes-print-cover .fes-print-eyebrow{ font-family:${C.mono}; font-size:10pt; letter-spacing:.22em;
    color:#5b7488 !important; -webkit-text-fill-color:#5b7488 !important; margin-bottom:10mm; }
  .fes-print-cover h1{ font-size:30pt; font-weight:800; margin:0 0 8mm; line-height:1.3; }
  .fes-print-meta{ font-family:${C.mono}; font-size:10pt; color:#5b7488 !important;
    -webkit-text-fill-color:#5b7488 !important; }

  .fes-print-page{ break-after:page; page-break-after:always; break-inside:auto; }
  .fes-print-page:last-child{ break-after:auto; page-break-after:auto; }
  .fes-print-head{ display:flex; justify-content:space-between; font-family:${C.mono};
    font-size:8.5pt; letter-spacing:.1em; color:#7086a0 !important;
    -webkit-text-fill-color:#7086a0 !important;
    border-bottom:1px solid #d0d5dd !important; padding-bottom:2.5mm; margin-bottom:5mm; }
  .fes-print-title{ font-size:19pt; font-weight:800; margin:0 0 6mm; line-height:1.32; }
  .fes-print-body{ font-size:11.5pt; }
  .fes-print-body img,.fes-print-body svg{ max-width:100%; height:auto; }
  .fes-print-simnote{ border:1px solid #d0d5dd !important; border-left:3px solid #0b4f6c !important;
    padding:5mm 6mm; font-size:11pt; }
  /* 화면용 스크롤·고정 높이는 종이에서 풀어 준다 */
  .fes-print-doc [class*="fes-"]{ max-height:none !important; overflow:visible !important; }
}
`}</style>
  );
}
