// Lab Map — Mini Fab landing screen
// 사용자가 Mini Fab 탭에 진입하면 보이는 첫 화면.
// fab 평면도 스타일로 장비를 즐비하게 배치하고, 하단에 Tutorial/Free Mode 진입점.
import { listEquipment } from '../definitions/equipment.js';
import { listScenarios } from '../definitions/scenarios.js';
import { EquipmentIcon } from '../icons/EquipmentIcons.jsx';

const SectionTitle = ({ children, sub }) => (
  <div className="flex items-end gap-3 mb-3 border-b border-cyan-900/40 pb-1">
    <span className="text-[12px] tracking-[2px] text-cyan-300/80 font-mono uppercase">{children}</span>
    {sub && <span className="text-[11px] text-gray-500 font-mono">{sub}</span>}
  </div>
);

const StatusItem = ({ label, value, tone = 'cyan' }) => {
  const colorMap = {
    cyan: 'text-cyan-300', green: 'text-emerald-300', amber: 'text-amber-300', text: 'text-gray-200',
  };
  return (
    <div className="flex flex-col items-center gap-0.5 px-3 border-l border-cyan-900/40 first:border-l-0">
      <span className="text-[11px] tracking-[1.5px] text-gray-500 font-mono uppercase">{label}</span>
      <span className={`text-[13px] font-bold font-mono ${colorMap[tone]}`} style={{ textShadow: '0 0 6px currentColor' }}>{value}</span>
    </div>
  );
};

const EquipmentTile = ({ eq, onClick }) => {
  const isMeasure = eq.type === 'measurement';
  return (
    <button
      onClick={() => onClick?.(eq)}
      className={`group relative flex flex-col items-center gap-1 p-2 rounded-sm border transition-all
        ${isMeasure
          ? 'border-emerald-900/50 hover:border-emerald-500/70 hover:bg-emerald-950/30'
          : 'border-amber-900/50 hover:border-amber-500/70 hover:bg-amber-950/20'}
        bg-[#0a0e14]`}
      title={`${eq.name} — ${eq.category}`}
    >
      {/* corner LED */}
      <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${isMeasure ? 'bg-emerald-400' : 'bg-amber-400'}`}
        style={{ boxShadow: '0 0 4px currentColor' }} />
      <div className={`w-12 h-12 ${isMeasure ? 'text-emerald-300' : 'text-amber-300'} group-hover:text-white transition-colors`}>
        <EquipmentIcon id={eq.equipment_id} glow />
      </div>
      <div className="text-[11px] tracking-[1px] text-gray-300 font-mono leading-tight text-center uppercase">
        {eq.name}
      </div>
      <div className="text-[11px] text-gray-500 font-mono tracking-[1px] uppercase">
        {eq.category}
      </div>
    </button>
  );
};

export default function LabMap({ onStartTutorial, onStartFreeMode, onSelectEquipment }) {
  const equipment = listEquipment();
  const scenarios = listScenarios();

  // 카테고리 묶음
  const groups = {
    'WET / SURFACE': equipment.filter((e) => ['cleaning', 'surface'].includes(e.category)),
    'LITHOGRAPHY': equipment.filter((e) => e.category === 'lithography'),
    'THERMAL': equipment.filter((e) => ['thermal', 'oxidation'].includes(e.category)),
    'DEPOSITION': equipment.filter((e) => e.category === 'deposition'),
    'ETCH': equipment.filter((e) => e.category === 'etch'),
    'DOPING': equipment.filter((e) => e.category === 'doping'),
    'METROLOGY (THICKNESS / OPTICAL)': equipment.filter((e) => ['thickness', 'optical', 'inspection'].includes(e.category)),
    'METROLOGY (ELECTRICAL)': equipment.filter((e) => e.category === 'electrical'),
  };

  return (
    <div className="font-mono text-gray-200 bg-[#0a0c10] min-h-full">
      {/* Top bar — OES style */}
      <div className="flex items-center gap-4 px-4 h-11 border-b-2 border-cyan-700/60"
        style={{ background: 'linear-gradient(180deg,#0e1922,#090d12)' }}>
        <div className="flex items-baseline gap-1">
          <span className="text-[15px] font-bold tracking-[2px] text-cyan-300" style={{ textShadow: '0 0 10px #00d4ff' }}>SEMIFAB</span>
          <span className="text-[12px] text-gray-500 ml-1">v1.0 | mini fab workflow</span>
        </div>
        <div className="flex items-center ml-auto gap-1">
          <StatusItem label="LAB" value="MINI-01" />
          <StatusItem label="EQUIP" value={equipment.length} tone="cyan" />
          <StatusItem label="PROCESS" value={equipment.filter((e) => e.type === 'process').length} tone="amber" />
          <StatusItem label="METROL" value={equipment.filter((e) => e.type === 'measurement').length} tone="green" />
          <StatusItem label="STATUS" value="READY" tone="green" />
          <span className="ml-3 w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #34d399', animation: 'pulse 1.6s infinite' }} />
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Hero / Start */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
          <div className="border border-cyan-900/40 bg-[#0d1117] p-5"
            style={{ background: 'linear-gradient(180deg,#0d1622,#0a1218)' }}>
            <div className="text-[11px] tracking-[3px] text-cyan-500 mb-1">// SEMIFAB AI</div>
            <h1 className="text-2xl text-cyan-300 font-bold tracking-wide mb-2"
              style={{ textShadow: '0 0 8px #00d4ff' }}>
              MINI FAB WORKFLOW
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              시편 상태 누적 기반 · 확장형 반도체 공정 교육 시뮬레이션 플랫폼.<br/>
              <span className="text-gray-500">표준 시편을 선택하고 여러 장비를 거쳐 공정을 수행하며,
              각 공정의 결과가 시편 상태에 누적되고, 그 누적 상태를 측정·분석·진단합니다.</span>
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => onStartTutorial?.()}
                className="px-4 py-2 border border-cyan-500 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-700/40 hover:text-white text-xs tracking-[2px] font-mono uppercase transition"
                style={{ textShadow: '0 0 4px #00d4ff' }}
              >
                ▶ 시작하기 — TUTORIAL
              </button>
              <button
                onClick={() => onStartFreeMode?.()}
                className="px-4 py-2 border border-fuchsia-500/60 bg-fuchsia-950/30 text-fuchsia-200 hover:bg-fuchsia-700/40 hover:text-white text-xs tracking-[2px] font-mono uppercase transition"
              >
                ⚙ FREE MODE — 실험 설계
              </button>
            </div>
          </div>

          {/* Sample shipping box */}
          <div className="border border-cyan-900/40 bg-[#0d1117] p-4">
            <SectionTitle sub="STANDARD WAFER">SAMPLE PORT</SectionTitle>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 64 64" className="w-16 h-16 text-gray-400">
                <circle cx="32" cy="32" r="24" stroke="currentColor" fill="#1f2937" strokeWidth="1.4" />
                <circle cx="32" cy="32" r="24" stroke="currentColor" fill="none" strokeDasharray="2 4" opacity="0.5" />
                <line x1="32" y1="8" x2="38" y2="14" stroke="currentColor" strokeWidth="1.2" />
                <line x1="38" y1="14" x2="32" y2="14" stroke="currentColor" strokeWidth="1.2" />
                <text x="22" y="36" fontSize="8" fill="#7dd3fc" fontFamily="monospace">p-Si</text>
                <text x="20" y="46" fontSize="6" fill="#64748b" fontFamily="monospace">⟨100⟩</text>
              </svg>
              <div className="text-[12px] text-gray-400 leading-relaxed font-mono">
                <div><span className="text-gray-500">SUB </span><span className="text-cyan-300">Si p-type</span></div>
                <div><span className="text-gray-500">ORI </span><span className="text-cyan-300">⟨100⟩</span></div>
                <div><span className="text-gray-500">DIA </span><span className="text-cyan-300">100 mm</span></div>
                <div><span className="text-gray-500">STAT</span> <span className="text-emerald-300">UNLOADED</span></div>
              </div>
            </div>
            <div className="text-[11px] text-gray-500 mt-2 leading-relaxed">
              실험을 시작하면 이 포트에서 시편을 꺼내 장비로 직접 옮깁니다.<br/>
              튜토리얼 또는 FREE MODE 진입 시 sample transport 메커니즘이 활성화됩니다.
            </div>
          </div>
        </div>

        {/* Lab Floor — Equipment Map */}
        <div className="border border-cyan-900/40 bg-[#0d1117] p-4">
          <SectionTitle sub={`${equipment.length} units · click to inspect`}>LAB FLOOR — EQUIPMENT MAP</SectionTitle>
          <div className="space-y-4">
            {Object.entries(groups).filter(([, list]) => list.length > 0).map(([name, list]) => (
              <div key={name}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] tracking-[2px] text-gray-500 uppercase">{name}</span>
                  <div className="flex-1 h-px bg-gray-800" />
                  <span className="text-[11px] tracking-[1px] text-gray-600 uppercase">{list.length} unit{list.length > 1 ? 's' : ''}</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {list.map((eq) => (
                    <EquipmentTile key={eq.equipment_id} eq={eq} onClick={onSelectEquipment} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Tutorial scenarios + Free Mode */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
          {/* Scenarios */}
          <div className="border border-cyan-900/40 bg-[#0d1117] p-4">
            <SectionTitle sub={`${scenarios.length} scenarios available`}>SCENARIO TUTORIALS</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {scenarios.map((s) => (
                <button
                  key={s.scenario_id}
                  onClick={() => onStartTutorial?.(s.scenario_id)}
                  className="text-left border border-cyan-900/40 bg-[#0a0e14] p-3 hover:border-cyan-500/70 hover:bg-cyan-950/30 transition group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[13px] text-cyan-300 font-bold tracking-wide group-hover:text-white">{s.title}</span>
                    <span className="text-[11px] tracking-[1px] uppercase border border-gray-700 px-1.5 text-gray-400">{s.difficulty}</span>
                  </div>
                  <div className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">{s.description}</div>
                  <div className="flex items-center gap-1 mt-2 text-[11px] text-gray-600">
                    <span>STEPS</span>
                    <span className="text-cyan-400 font-mono">{s.steps.length}</span>
                    <span className="ml-2">EQUIP</span>
                    <span className="text-cyan-400 font-mono">{new Set(s.steps.map((x) => x.equipment)).size}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Free Mode */}
          <div className="border border-fuchsia-900/40 bg-[#0d0a14] p-4">
            <SectionTitle sub="USR · 자유 실험 설계">FREE MODE</SectionTitle>
            <div className="text-[12px] text-gray-400 leading-relaxed mb-3">
              실험 제목 / 목적 / 필요사항을 정의하고, 장비 시퀀스를 직접 배치합니다.
              순서가 합리적이지 않으면 시뮬레이터가 경고를 표시합니다 (예: 식각 후 곧바로 증착 시 패턴 소실).
            </div>
            <ul className="text-[12px] text-gray-500 space-y-1 mb-3 leading-relaxed">
              <li>① 실험 계획서 작성 <span className="text-gray-700">(title · purpose · requires)</span></li>
              <li>② 장비/공정 GUI 배치 <span className="text-gray-700">(drag/click to add)</span></li>
              <li>③ 시퀀스 검증 <span className="text-gray-700">(warning / info)</span></li>
              <li>④ Sample 수동 transport로 실행</li>
            </ul>
            <button
              onClick={() => onStartFreeMode?.()}
              className="w-full py-2 border border-fuchsia-500/60 bg-fuchsia-950/30 text-fuchsia-200 hover:bg-fuchsia-700/40 hover:text-white text-[13px] tracking-[2px] font-mono uppercase transition"
            >
              ⚙ ENTER PLANNER
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[11px] tracking-[1.5px] text-gray-600 font-mono uppercase border-t border-gray-800 pt-2 flex flex-wrap gap-4">
          <span>data-driven definitions · /miniFab/definitions</span>
          <span className="text-gray-700">|</span>
          <span>core engines · sample · process · measurement · workflow · diagnosis</span>
          <span className="ml-auto text-cyan-700">SEMIFAB MINI FAB v1.0</span>
        </div>
      </div>
    </div>
  );
}
