import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// ============================================================
// OES Database (same emission lines)
// ============================================================
const GAS_DB = {
  Ar: { name: 'Argon', symbol: 'Ar', color: '#8B5CF6', mfc: 'MFC-1',
    lines: [
      { wl: 696.5, int: 0.45, sp: 'Ar I' }, { wl: 706.7, int: 0.35, sp: 'Ar I' },
      { wl: 738.4, int: 0.55, sp: 'Ar I' }, { wl: 750.4, int: 0.85, sp: 'Ar I' },
      { wl: 763.5, int: 0.95, sp: 'Ar I' }, { wl: 772.4, int: 0.40, sp: 'Ar I' },
      { wl: 811.5, int: 1.00, sp: 'Ar I' }, { wl: 842.5, int: 0.60, sp: 'Ar I' },
    ]},
  N2: { name: 'Nitrogen', symbol: 'N₂', color: '#3B82F6', mfc: 'MFC-2',
    lines: [
      { wl: 315.9, int: 0.40, sp: 'N₂ SPS' }, { wl: 337.1, int: 1.00, sp: 'N₂ SPS' },
      { wl: 357.7, int: 0.80, sp: 'N₂ SPS' }, { wl: 380.5, int: 0.55, sp: 'N₂ SPS' },
      { wl: 391.4, int: 0.65, sp: 'N₂⁺ FNS' }, { wl: 427.8, int: 0.45, sp: 'N₂⁺ FNS' },
      { wl: 746.8, int: 0.20, sp: 'N I' },
    ]},
  O2: { name: 'Oxygen', symbol: 'O₂', color: '#EF4444', mfc: 'MFC-3',
    lines: [
      { wl: 533.0, int: 0.25, sp: 'O I' }, { wl: 615.7, int: 0.20, sp: 'O I' },
      { wl: 777.4, int: 1.00, sp: 'O I' }, { wl: 844.6, int: 0.70, sp: 'O I' },
    ]},
  CF4: { name: 'CF₄', symbol: 'CF₄', color: '#10B981', mfc: 'MFC-4',
    lines: [
      { wl: 251.9, int: 0.50, sp: 'CF₂' }, { wl: 259.5, int: 0.45, sp: 'CF₂' },
      { wl: 271.6, int: 0.30, sp: 'CF' }, { wl: 685.6, int: 0.80, sp: 'F I' },
      { wl: 703.7, int: 0.65, sp: 'F I' }, { wl: 712.8, int: 0.40, sp: 'F I' },
    ]},
  He: { name: 'Helium', symbol: 'He', color: '#F59E0B', mfc: 'MFC-5',
    lines: [
      { wl: 388.9, int: 0.35, sp: 'He I' }, { wl: 447.1, int: 0.25, sp: 'He I' },
      { wl: 501.6, int: 0.20, sp: 'He I' }, { wl: 587.6, int: 1.00, sp: 'He I' },
      { wl: 667.8, int: 0.70, sp: 'He I' }, { wl: 706.5, int: 0.45, sp: 'He I' },
    ]},
};

// Generate mixed spectrum from multiple gases with flow rates
const generateMixedSpectrum = (gasFlows, power) => {
  const data = [];
  const powerFactor = power / 300;
  const totalFlow = Object.values(gasFlows).reduce((sum, f) => sum + f, 0);
  if (totalFlow === 0 || power === 0) return [];

  for (let wl = 200; wl <= 950; wl += 1) {
    let intensity = 0;
    Object.entries(gasFlows).forEach(([gasKey, flow]) => {
      if (flow <= 0) return;
      const gas = GAS_DB[gasKey];
      if (!gas) return;
      const flowFactor = Math.sqrt(flow / 100); // non-linear: even small flow is detectable
      gas.lines.forEach(line => {
        const width = 2.5 + Math.random() * 0.3;
        const dist = Math.abs(wl - line.wl);
        if (dist < width * 5) {
          intensity += line.int * powerFactor * flowFactor * Math.exp(-0.5 * Math.pow(dist / width, 2));
        }
      });
    });
    // noise
    intensity += (Math.random() - 0.5) * 0.015 * powerFactor;
    intensity = Math.max(0, intensity);
    data.push({ wavelength: wl, intensity: parseFloat(intensity.toFixed(4)) });
  }
  return data;
};

// ============================================================
// Education Mode Steps
// ============================================================
const EDUCATION_STEPS = [
  {
    id: 'intro',
    title: '실전 OES 측정 실습에 오신 것을 환영합니다!',
    instruction: '이 실전 시뮬레이터에서는 실제 장비처럼 여러 가스를 동시에 혼합하여 플라즈마를 생성하고, OES 스펙트럼을 분석합니다. 준비가 되면 "다음"을 눌러주세요.',
    action: null,
  },
  {
    id: 'step1',
    title: 'Step 1: Ar 가스 투입',
    instruction: 'Ar(아르곤) 가스의 유량을 100 sccm으로 설정하세요. Ar은 OES에서 기준 가스(actinometry)로 자주 사용됩니다.',
    action: { gas: 'Ar', targetFlow: 100 },
    hint: 'Ar의 MFC-1 슬라이더를 오른쪽으로 드래그하세요.',
  },
  {
    id: 'step2',
    title: 'Step 2: 플라즈마 점화',
    instruction: 'RF 파워를 200W 이상으로 설정하고 PLASMA ON 버튼을 눌러 플라즈마를 점화하세요.',
    action: { requirePlasma: true },
    hint: '파워 슬라이더를 200W 이상으로 올리고 ON 버튼을 누르세요.',
  },
  {
    id: 'step3',
    title: 'Step 3: Ar 스펙트럼 관찰',
    instruction: '오른쪽 OES 스펙트럼을 관찰하세요. Ar I의 대표 발광선 811.5nm, 763.5nm, 750.4nm 피크가 보이나요? 각 피크의 위치와 상대적 세기를 확인하세요.',
    action: null,
  },
  {
    id: 'step4',
    title: 'Step 4: O₂ 가스 추가 투입',
    instruction: '이제 O₂(산소) 가스를 50 sccm 추가하세요. Ar 가스는 그대로 유지합니다. 두 가스를 동시에 넣으면 스펙트럼이 어떻게 변하는지 관찰하세요.',
    action: { gas: 'O2', targetFlow: 50 },
    hint: 'O₂의 MFC-3 슬라이더를 50 sccm으로 설정하세요.',
  },
  {
    id: 'step5',
    title: 'Step 5: 혼합 가스 스펙트럼 분석',
    instruction: '스펙트럼에 O I의 777.4nm, 844.6nm 피크가 새로 나타났습니다! Ar 피크와 O 피크가 공존하는 것을 확인하세요. 이것이 실제 공정에서 가스 누출(leak)을 감지하는 원리입니다.',
    action: null,
  },
  {
    id: 'step6',
    title: 'Step 6: 자유 실험!',
    instruction: '축하합니다! 기본 실습을 완료했습니다. 이제 자유 모드로 전환하여 CF₄, N₂, He 등 다양한 가스를 혼합해보세요. 유량을 바꾸면서 피크의 세기 변화를 관찰해보세요!',
    action: null,
  },
];

// ============================================================
// Practical Simulator Component
// ============================================================
const OESPracticalSimulator = () => {
  // Mode
  const [mode, setMode] = useState('education'); // 'education' | 'free'
  const [eduStep, setEduStep] = useState(0);
  const [eduTypedText, setEduTypedText] = useState('');

  // Equipment state
  const [gasFlows, setGasFlows] = useState({ Ar: 0, N2: 0, O2: 0, CF4: 0, He: 0 });
  const [rfPower, setRfPower] = useState(0);
  const [isPlasmaOn, setIsPlasmaOn] = useState(false);
  const [pressure, setPressure] = useState(0);

  // Spectrum
  const [spectrumData, setSpectrumData] = useState([]);

  // Log
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: 'System initialized. Ready.', type: 'system' }
  ]);
  const logRef = useRef(null);

  // User data collection
  const [userPeakNotes, setUserPeakNotes] = useState('');

  // Add log
  const addLog = useCallback((msg, type = 'info') => {
    setLogs(prev => [...prev.slice(-50), { time: new Date().toLocaleTimeString(), msg, type }]);
  }, []);

  // Gas flow change
  const setGasFlow = useCallback((gas, flow) => {
    setGasFlows(prev => {
      const next = { ...prev, [gas]: flow };
      if (flow > 0 && prev[gas] === 0) addLog(`${GAS_DB[gas].symbol} gas line opened: ${flow} sccm`, 'gas');
      else if (flow === 0 && prev[gas] > 0) addLog(`${GAS_DB[gas].symbol} gas line closed`, 'gas');
      return next;
    });
  }, [addLog]);

  // Pressure calculation
  useEffect(() => {
    const totalFlow = Object.values(gasFlows).reduce((s, f) => s + f, 0);
    setPressure(totalFlow > 0 ? Math.round(totalFlow * 0.02 * 10) / 10 : 0);
  }, [gasFlows]);

  // Toggle plasma
  const togglePlasma = useCallback(() => {
    const totalFlow = Object.values(gasFlows).reduce((s, f) => s + f, 0);
    if (!isPlasmaOn) {
      if (totalFlow === 0) { addLog('ERROR: No gas flow. Cannot ignite plasma.', 'error'); return; }
      if (rfPower < 50) { addLog('ERROR: RF power too low. Min 50W required.', 'error'); return; }
      setIsPlasmaOn(true);
      addLog(`PLASMA ON - RF Power: ${rfPower}W, Pressure: ${pressure} Torr`, 'plasma');
    } else {
      setIsPlasmaOn(false);
      addLog('PLASMA OFF', 'plasma');
    }
  }, [isPlasmaOn, gasFlows, rfPower, pressure, addLog]);

  // Spectrum update with noise
  useEffect(() => {
    if (!isPlasmaOn) { setSpectrumData([]); return; }
    const update = () => setSpectrumData(generateMixedSpectrum(gasFlows, rfPower));
    update();
    const interval = setInterval(update, 600);
    return () => clearInterval(interval);
  }, [isPlasmaOn, gasFlows, rfPower]);

  // Education mode typing effect
  useEffect(() => {
    if (mode !== 'education') return;
    const step = EDUCATION_STEPS[eduStep];
    if (!step) return;
    const fullText = step.instruction;
    let idx = 0;
    setEduTypedText('');
    const interval = setInterval(() => {
      if (idx <= fullText.length) { setEduTypedText(fullText.slice(0, idx)); idx++; }
      else clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [eduStep, mode]);

  // Scroll log to bottom
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  // Check education step completion
  const canAdvanceEdu = () => {
    const step = EDUCATION_STEPS[eduStep];
    if (!step?.action) return true;
    if (step.action.gas && step.action.targetFlow) {
      return gasFlows[step.action.gas] >= step.action.targetFlow * 0.8;
    }
    if (step.action.requirePlasma) return isPlasmaOn;
    return true;
  };

  const advanceEdu = () => {
    if (eduStep < EDUCATION_STEPS.length - 1) {
      setEduStep(prev => prev + 1);
      addLog(`Education step ${eduStep + 2} started`, 'system');
    } else {
      setMode('free');
      addLog('Switched to FREE mode. Experiment freely!', 'system');
    }
  };

  // Active gases for display
  const activeGases = Object.entries(gasFlows).filter(([, f]) => f > 0);

  return (
    <div className="h-full flex flex-col bg-gray-950 text-gray-200">
      {/* Top Bar - Mode + Signature */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700/50">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button onClick={() => { setMode('education'); setEduStep(0); addLog('Switched to EDUCATION mode', 'system'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'education' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
              교육 모드
            </button>
            <button onClick={() => { setMode('free'); addLog('Switched to FREE mode', 'system'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'free' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
              자유 모드
            </button>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${isPlasmaOn ? 'bg-green-900/50 text-green-400 animate-pulse' : 'bg-gray-800 text-gray-500'}`}>
            {isPlasmaOn ? '● PLASMA ON' : '○ STANDBY'}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-cyan-500 font-bold">OES Practical Simulator v1.0</div>
          <div className="text-[10px] text-gray-600">Plasma Diagnostic Training Center</div>
        </div>
      </div>

      {/* Education Guide Banner */}
      {mode === 'education' && (
        <div className="bg-gradient-to-r from-cyan-900/40 to-indigo-900/40 border-b border-cyan-700/30 px-4 py-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-cyan-600 text-white px-2 py-0.5 rounded font-bold">
                  {EDUCATION_STEPS[eduStep]?.id === 'intro' ? 'INTRO' : `${eduStep}/${EDUCATION_STEPS.length - 1}`}
                </span>
                <span className="text-sm font-bold text-cyan-300">{EDUCATION_STEPS[eduStep]?.title}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {eduTypedText}<span className="animate-pulse text-cyan-400">|</span>
              </p>
              {EDUCATION_STEPS[eduStep]?.hint && (
                <p className="text-xs text-amber-400 mt-1">Hint: {EDUCATION_STEPS[eduStep].hint}</p>
              )}
            </div>
            <button onClick={advanceEdu} disabled={!canAdvanceEdu()}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${canAdvanceEdu() ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
              {eduStep === EDUCATION_STEPS.length - 1 ? '자유 모드로 →' : '다음 →'}
            </button>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5 mt-2">
            {EDUCATION_STEPS.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= eduStep ? 'bg-cyan-500' : 'bg-gray-700'}`}/>
            ))}
          </div>
        </div>
      )}

      {/* Main Content: Equipment (Left) + OES (Right) */}
      <div className="flex-1 flex overflow-hidden">

        {/* ===== LEFT: Equipment Panel ===== */}
        <div className="w-[420px] min-w-[380px] flex flex-col border-r border-gray-700/50 bg-gray-900/50">

          {/* Gas Control Panel */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>GAS CONTROL PANEL
              </h3>
              <span className="text-[10px] text-gray-600">Mass Flow Controllers</span>
            </div>

            {Object.entries(GAS_DB).map(([key, gas]) => (
              <div key={key} className="bg-gray-800/80 rounded-lg p-3 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: gasFlows[key] > 0 ? gas.color : '#374151' }}/>
                    <span className="text-sm font-bold" style={{ color: gasFlows[key] > 0 ? gas.color : '#6B7280' }}>
                      {gas.symbol}
                    </span>
                    <span className="text-[10px] text-gray-600">{gas.mfc}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold" style={{ color: gasFlows[key] > 0 ? gas.color : '#6B7280' }}>
                      {gasFlows[key]}
                    </span>
                    <span className="text-[10px] text-gray-500">sccm</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="500" value={gasFlows[key]}
                    onChange={e => setGasFlow(key, Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: gasFlows[key] > 0
                        ? `linear-gradient(to right, ${gas.color} ${gasFlows[key] / 5}%, #374151 ${gasFlows[key] / 5}%)`
                        : '#374151'
                    }}/>
                  <button onClick={() => setGasFlow(key, 0)}
                    className="text-[10px] text-gray-500 hover:text-red-400 px-1">OFF</button>
                </div>
                {/* Quick presets */}
                <div className="flex gap-1 mt-1.5">
                  {[10, 50, 100, 200].map(v => (
                    <button key={v} onClick={() => setGasFlow(key, v)}
                      className={`text-[10px] px-2 py-0.5 rounded transition-all ${gasFlows[key] === v ? 'bg-gray-600 text-white' : 'bg-gray-700/50 text-gray-500 hover:text-gray-300'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* RF Power Control */}
            <div className="bg-gray-800/80 rounded-lg p-3 border border-red-900/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-red-400">RF POWER</span>
                  <span className="text-[10px] text-gray-600">13.56 MHz</span>
                </div>
                <span className="text-sm font-mono font-bold text-red-400">{rfPower} W</span>
              </div>
              <input type="range" min="0" max="500" value={rfPower}
                onChange={e => setRfPower(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #DC2626 ${rfPower / 5}%, #374151 ${rfPower / 5}%)` }}/>
              <div className="flex gap-1 mt-1.5">
                {[100, 200, 300, 500].map(v => (
                  <button key={v} onClick={() => setRfPower(v)}
                    className={`text-[10px] px-2 py-0.5 rounded transition-all ${rfPower === v ? 'bg-red-900/50 text-red-300' : 'bg-gray-700/50 text-gray-500 hover:text-gray-300'}`}>
                    {v}W
                  </button>
                ))}
              </div>
            </div>

            {/* Plasma ON/OFF Button */}
            <button onClick={togglePlasma}
              className={`w-full py-3 rounded-lg font-bold text-lg transition-all transform active:scale-95 ${
                isPlasmaOn
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/30'
              }`}>
              {isPlasmaOn ? '⬛ PLASMA OFF' : '▶ PLASMA ON'}
            </button>

            {/* Status Panel */}
            <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-700/50">
              <h4 className="text-[10px] text-gray-500 font-bold mb-2">CHAMBER STATUS</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-900/50 rounded p-2">
                  <div className="text-gray-500">Pressure</div>
                  <div className="font-mono font-bold text-gray-300">{pressure} Torr</div>
                </div>
                <div className="bg-gray-900/50 rounded p-2">
                  <div className="text-gray-500">RF Power</div>
                  <div className="font-mono font-bold text-red-400">{rfPower} W</div>
                </div>
                <div className="bg-gray-900/50 rounded p-2">
                  <div className="text-gray-500">Total Flow</div>
                  <div className="font-mono font-bold text-cyan-400">
                    {Object.values(gasFlows).reduce((s, f) => s + f, 0)} sccm
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded p-2">
                  <div className="text-gray-500">Active Gases</div>
                  <div className="font-mono font-bold text-green-400">{activeGases.length}</div>
                </div>
              </div>
              {/* Active gas summary */}
              {activeGases.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {activeGases.map(([key, flow]) => (
                    <span key={key} className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: `${GAS_DB[key].color}20`, color: GAS_DB[key].color }}>
                      {GAS_DB[key].symbol}: {flow}sccm
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Log Panel */}
          <div className="h-40 border-t border-gray-700/50 bg-gray-950 flex flex-col">
            <div className="flex items-center justify-between px-3 py-1.5 bg-gray-900 border-b border-gray-800">
              <span className="text-[10px] font-bold text-gray-500">SYSTEM LOG</span>
              <button onClick={() => setLogs([])} className="text-[10px] text-gray-600 hover:text-gray-400">Clear</button>
            </div>
            <div ref={logRef} className="flex-1 overflow-y-auto px-3 py-1 font-mono text-[11px] space-y-0.5">
              {logs.map((log, i) => (
                <div key={i} className={`${
                  log.type === 'error' ? 'text-red-400' :
                  log.type === 'plasma' ? 'text-green-400' :
                  log.type === 'gas' ? 'text-cyan-400' :
                  'text-gray-500'
                }`}>
                  <span className="text-gray-600">[{log.time}]</span> {log.msg}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== RIGHT: OES Display ===== */}
        <div className="flex-1 flex flex-col bg-gray-950 overflow-hidden">

          {/* Spectrum Chart */}
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                OES SPECTRUM {isPlasmaOn ? '(LIVE)' : ''}
              </h3>
              {isPlasmaOn && (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-[10px] text-green-400">Acquiring...</span>
                </div>
              )}
            </div>

            {spectrumData.length > 0 ? (
              <div className="flex-1 bg-gray-900 rounded-lg border border-gray-700/50 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spectrumData} margin={{ top: 10, right: 20, bottom: 25, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5}/>
                    <XAxis dataKey="wavelength" type="number" domain={[200, 950]}
                      stroke="#6B7280" tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      label={{ value: 'Wavelength (nm)', position: 'insideBottom', offset: -15, fill: '#9CA3AF', fontSize: 11 }}/>
                    <YAxis stroke="#6B7280" tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      label={{ value: 'Intensity (a.u.)', angle: -90, position: 'insideLeft', fill: '#9CA3AF', fontSize: 11 }}/>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px', color: '#E5E7EB' }}
                      formatter={val => [parseFloat(val).toFixed(4), 'Intensity']}
                      labelFormatter={val => `${val} nm`}/>
                    <Line type="monotone" dataKey="intensity" stroke="#22D3EE"
                      dot={false} strokeWidth={1.2} isAnimationActive={false}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex-1 bg-gray-900 rounded-lg border border-gray-700/50 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="text-4xl mb-3">📊</div>
                  <p className="text-sm">가스를 투입하고 플라즈마를 켜면</p>
                  <p className="text-sm">OES 스펙트럼이 실시간으로 표시됩니다</p>
                </div>
              </div>
            )}
          </div>

          {/* Peak Identification Panel */}
          <div className="h-[200px] border-t border-gray-700/50 p-3 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-gray-400">DETECTED EMISSION LINES</h4>
              {activeGases.length > 0 && isPlasmaOn && (
                <span className="text-[10px] text-gray-600">{activeGases.map(([k]) => GAS_DB[k].symbol).join(' + ')}</span>
              )}
            </div>

            {isPlasmaOn && activeGases.length > 0 ? (
              <div className="space-y-2">
                {/* Per-gas peak list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeGases.map(([key, flow]) => (
                    <div key={key} className="bg-gray-900/80 rounded-lg p-2 border border-gray-700/30">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GAS_DB[key].color }}/>
                        <span className="text-xs font-bold" style={{ color: GAS_DB[key].color }}>{GAS_DB[key].symbol}</span>
                        <span className="text-[10px] text-gray-600">{flow} sccm</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {GAS_DB[key].lines.filter(l => l.int >= 0.4).map((line, i) => (
                          <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${GAS_DB[key].color}15`, color: GAS_DB[key].color }}>
                            {line.wl}nm ({line.sp})
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* User notes */}
                <div>
                  <label className="text-[10px] text-gray-500 font-bold">ANALYSIS NOTES</label>
                  <textarea value={userPeakNotes} onChange={e => setUserPeakNotes(e.target.value)}
                    className="w-full mt-1 p-2 bg-gray-900 border border-gray-700/50 rounded text-xs text-gray-300 resize-none h-14 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="관찰한 피크, 종 식별, 유량 변화에 따른 세기 변화 등을 기록하세요..."/>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-600 py-6 text-sm">
                플라즈마 점화 후 발광선이 표시됩니다
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OESPracticalSimulator;
