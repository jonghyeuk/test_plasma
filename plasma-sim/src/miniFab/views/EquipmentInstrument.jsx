// EquipmentInstrument
// 단일 장비를 조작하는 industrial 패널.
// Sample transport (Load → Run → Unload) 메커닉을 포함.
import { useState } from 'react';
import { EquipmentIcon } from '../icons/EquipmentIcons.jsx';

const Knob = ({ p, value, onChange, disabled }) => {
  if (p.type === 'select') {
    return (
      <div className="border border-cyan-900/40 bg-[#0a0e14] p-2">
        <div className="text-[9px] tracking-[1.5px] text-gray-500 uppercase mb-1">{p.label}</div>
        <select
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(p.key, e.target.value)}
          className="w-full bg-[#050709] border border-cyan-900/40 text-cyan-200 text-[11px] font-mono p-1 disabled:opacity-50"
        >
          {p.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  return (
    <div className="border border-cyan-900/40 bg-[#0a0e14] p-2">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[9px] tracking-[1.5px] text-gray-500 uppercase">{p.label}</span>
        <span className="text-[11px] font-bold text-cyan-300 font-mono"
          style={{ textShadow: '0 0 6px #00d4ff' }}>
          {value}<span className="text-gray-500 ml-1 text-[9px]">{p.unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={p.min} max={p.max} step={p.step || 1} value={value}
        disabled={disabled}
        onChange={(e) => onChange(p.key, Number(e.target.value))}
        className="w-full accent-cyan-400 disabled:opacity-50"
      />
      <div className="flex justify-between text-[8px] text-gray-700 font-mono mt-0.5">
        <span>{p.min}</span><span>{p.max}</span>
      </div>
    </div>
  );
};

const LED = ({ on, color = 'cyan', label }) => {
  const colors = { cyan: '#00d4ff', green: '#34d399', amber: '#fbbf24', red: '#f43f5e' };
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full"
        style={{ background: on ? colors[color] : '#1f2937', boxShadow: on ? `0 0 6px ${colors[color]}` : 'none' }} />
      <span className={`text-[9px] tracking-[1px] uppercase ${on ? 'text-gray-200' : 'text-gray-600'}`}>{label}</span>
    </div>
  );
};

export default function EquipmentInstrument({
  equipment,
  params,
  onParamChange,
  onRun,
  sampleLoaded,        // boolean: sample이 이 장비에 있는가
  canLoad,             // boolean: 로드 가능한 상태
  onLoadSample,
  onUnloadSample,
  status,              // 'IDLE' | 'LOADED' | 'RUNNING' | 'COMPLETE'
  lastResult,          // 마지막 실행 결과
  tutorialHint,        // 선택적 가이드 메시지
  highlight,           // 어떤 액션을 강조할지: 'load' | 'run' | 'unload' | null
}) {
  const [showInfo, setShowInfo] = useState(false);
  if (!equipment) return null;
  const isMeasure = equipment.type === 'measurement';
  const accent = isMeasure ? 'emerald' : 'amber';
  const accentColor = isMeasure ? '#34d399' : '#fbbf24';

  const ledRunning = status === 'RUNNING';
  const ledLoaded = sampleLoaded;
  const ledReady = !sampleLoaded && canLoad;
  const ledComplete = status === 'COMPLETE';

  return (
    <div className="border border-cyan-900/40 bg-[#0a0c10] font-mono text-gray-200">
      {/* Chassis header */}
      <div className="flex items-center gap-3 px-3 h-9 border-b border-cyan-900/40"
        style={{ background: 'linear-gradient(180deg,#0e1922,#0a0e14)' }}>
        <span className={`text-[12px] font-bold tracking-[2px]`} style={{ color: accentColor, textShadow: `0 0 6px ${accentColor}` }}>
          {equipment.name.toUpperCase()}
        </span>
        <span className="text-[9px] text-gray-600 font-mono">MODEL · {equipment.equipment_id.slice(0, 6).toUpperCase()}</span>
        <div className="ml-auto flex items-center gap-3">
          <LED on={ledReady} color="cyan" label="READY" />
          <LED on={ledLoaded} color="amber" label="LOADED" />
          <LED on={ledRunning} color="red" label="RUN" />
          <LED on={ledComplete} color="green" label="DONE" />
        </div>
      </div>

      {/* Body: Icon + Display + Controls */}
      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-0">
        {/* Left: Equipment visual */}
        <div className="border-r border-cyan-900/40 p-3 flex flex-col items-center justify-between bg-[#070a0f]">
          <div className={`w-24 h-24 ${ledRunning ? 'animate-pulse' : ''}`} style={{ color: accentColor }}>
            <EquipmentIcon id={equipment.equipment_id} glow={ledRunning || ledLoaded} />
          </div>
          <div className="text-center mt-2">
            <div className="text-[8px] tracking-[1.5px] text-gray-600 uppercase">CATEGORY</div>
            <div className="text-[10px] text-gray-300 uppercase tracking-[1px]">{equipment.category}</div>
            <div className="text-[8px] tracking-[1.5px] text-gray-600 uppercase mt-1">TYPE</div>
            <div className={`text-[10px] uppercase tracking-[1px] ${isMeasure ? 'text-emerald-300' : 'text-amber-300'}`}>
              {equipment.type}
            </div>
          </div>
          <button
            onClick={() => setShowInfo((v) => !v)}
            className="mt-2 text-[8px] tracking-[1.5px] text-gray-600 hover:text-cyan-300 uppercase border border-gray-800 px-2 py-0.5"
          >
            {showInfo ? 'hide spec' : 'spec ▾'}
          </button>
        </div>

        {/* Right: Display + Controls */}
        <div className="p-3">
          {/* Display */}
          <div className="mb-3 border border-cyan-900/40 bg-[#040608] p-2 min-h-[58px]">
            <div className="flex justify-between text-[9px] tracking-[1px] text-gray-500 uppercase mb-1">
              <span>display</span>
              <span>{status}</span>
            </div>
            {tutorialHint ? (
              <div className="text-[10px] text-cyan-200 leading-relaxed">💡 {tutorialHint}</div>
            ) : !sampleLoaded ? (
              <div className="text-[10px] text-gray-500 leading-relaxed">
                Sample이 로드되지 않았습니다. <span className="text-cyan-400">[LOAD SAMPLE]</span> 버튼을 눌러 시편을 챔버로 옮기세요.
              </div>
            ) : status === 'RUNNING' ? (
              <div className="text-[10px] text-amber-300 leading-relaxed">공정 진행 중...</div>
            ) : status === 'COMPLETE' ? (
              <div className="text-[10px] text-emerald-300 leading-relaxed">
                실행 완료. {isMeasure ? '결과는 하단 측정 패널에서 확인.' : 'Sample 상태가 갱신되었습니다.'}
              </div>
            ) : (
              <div className="text-[10px] text-gray-300 leading-relaxed">
                Sample이 로드되었습니다. 파라미터를 설정하고 <span className="text-cyan-400">[{isMeasure ? 'MEASURE' : 'RUN PROCESS'}]</span>를 누르세요.
              </div>
            )}
          </div>

          {/* Spec popout */}
          {showInfo && (
            <div className="mb-3 text-[9px] text-gray-500 leading-relaxed border border-gray-800 p-2 bg-[#0a0e14]">
              <div><span className="text-gray-600">SUPPORTED PROC </span><span className="text-cyan-300">{equipment.supported_processes.join(', ')}</span></div>
              <div><span className="text-gray-600">PARAMETERS </span><span className="text-cyan-300">{equipment.parameters.length}</span></div>
            </div>
          )}

          {/* Parameter knobs */}
          <div className="mb-3">
            <div className="text-[9px] tracking-[2px] text-gray-500 uppercase mb-1.5 flex items-center gap-2">
              <span>parameters</span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(equipment.parameters || []).map((p) => (
                <Knob key={p.key} p={p} value={params[p.key]} onChange={onParamChange}
                  disabled={!sampleLoaded || ledRunning} />
              ))}
            </div>
          </div>

          {/* Control row */}
          <div className="flex flex-wrap gap-2">
            {!sampleLoaded ? (
              <button
                onClick={onLoadSample}
                disabled={!canLoad}
                className={`flex-1 py-2 text-[11px] tracking-[2px] uppercase border transition ${
                  highlight === 'load'
                    ? 'border-cyan-300 bg-cyan-700/40 text-white animate-pulse'
                    : canLoad
                      ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200 hover:bg-cyan-700/30'
                      : 'border-gray-800 bg-gray-900/40 text-gray-600 cursor-not-allowed'
                }`}
                style={canLoad ? { textShadow: '0 0 4px #00d4ff' } : undefined}
              >
                ▷ LOAD SAMPLE
              </button>
            ) : (
              <>
                <button
                  onClick={onRun}
                  disabled={ledRunning || ledComplete}
                  className={`flex-1 py-2 text-[11px] tracking-[2px] uppercase border transition ${
                    highlight === 'run'
                      ? 'border-cyan-300 bg-cyan-700/40 text-white animate-pulse'
                      : ledComplete
                        ? 'border-emerald-700 bg-emerald-950/40 text-emerald-300 cursor-default'
                        : `border-${accent}-500 bg-${accent}-950/30 text-${accent}-200 hover:bg-${accent}-700/30`
                  }`}
                  style={!ledComplete && !ledRunning ? { textShadow: `0 0 4px ${accentColor}` } : undefined}
                >
                  {ledComplete ? '✓ COMPLETE' : isMeasure ? '◉ MEASURE' : '▶ RUN PROCESS'}
                </button>
                <button
                  onClick={onUnloadSample}
                  className={`px-3 py-2 text-[11px] tracking-[2px] uppercase border transition ${
                    highlight === 'unload'
                      ? 'border-cyan-300 bg-cyan-700/40 text-white animate-pulse'
                      : 'border-gray-700 bg-gray-900/60 text-gray-300 hover:bg-rose-900/40'
                  }`}
                >
                  ◁ UNLOAD
                </button>
              </>
            )}
          </div>

          {/* Last result preview */}
          {lastResult && (
            <div className="mt-3 border border-emerald-900/40 bg-[#040608] p-2">
              <div className="text-[9px] tracking-[1.5px] text-emerald-500 uppercase mb-1">
                {lastResult.title || 'last reading'}
              </div>
              <pre className="text-[10px] text-emerald-200 whitespace-pre-wrap break-words">
{JSON.stringify(lastResult.outputs ?? lastResult, null, 2).slice(0, 500)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
