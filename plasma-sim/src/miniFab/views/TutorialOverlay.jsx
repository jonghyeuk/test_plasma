// TutorialOverlay
// 시나리오 튜토리얼의 step-by-step 가이드 팝업.
// 단계마다: (1) 도입 설명 (2) 어떤 장비를 누르고 어떤 액션을 하는지 안내.
// 사용자가 그 액션을 수행하면 다음 단계로 자동 진행.

const PHASE = {
  INTRO: 'intro',          // 시나리오 전체 소개
  PLAN: 'plan',            // 실험 계획 / 장비 배치 설명
  STEP_INTRO: 'step_intro', // 현 step 도입
  STEP_LOAD: 'step_load',   // sample load 안내
  STEP_RUN: 'step_run',     // run 안내
  STEP_UNLOAD: 'step_unload', // unload 안내
  COMPLETE: 'complete',     // 완료
};

export { PHASE };

export default function TutorialOverlay({
  scenario,
  step,            // current step number
  phase,           // PHASE.*
  totalSteps,
  onAdvance,
  onSkip,
  stepEquipment,
  stepTutorialMsg,
}) {
  if (!scenario) return null;

  const eqLabel = stepEquipment?.name || '?';

  const titleByPhase = {
    [PHASE.INTRO]: '실험 소개',
    [PHASE.PLAN]: '실험 계획 — 어떤 장비를 어떤 순서로?',
    [PHASE.STEP_INTRO]: `STEP ${step} · ${eqLabel}`,
    [PHASE.STEP_LOAD]: `STEP ${step} · Sample 로드`,
    [PHASE.STEP_RUN]: `STEP ${step} · 실행`,
    [PHASE.STEP_UNLOAD]: `STEP ${step} · 언로드`,
    [PHASE.COMPLETE]: '실험 완료',
  };

  const bodyByPhase = () => {
    switch (phase) {
      case PHASE.INTRO:
        return (
          <>
            <div className="text-[11px] text-gray-300 leading-relaxed mb-2">
              <span className="text-cyan-300 font-bold">{scenario.title}</span> 시나리오를 시작합니다.
            </div>
            <div className="text-[10px] text-gray-400 leading-relaxed mb-2">{scenario.description}</div>
            <div className="text-[10px] text-gray-500 leading-relaxed">
              <div className="text-gray-400 mb-1">목표 구조</div>
              <div className="font-mono text-cyan-300">
                Substrate <span className="text-gray-600">·</span> {scenario.target_structure?.substrate}<br/>
                Layers <span className="text-gray-600">·</span> {(scenario.target_structure?.layers || []).join(' / ') || '없음'}
                {scenario.target_structure?.junction && <><br/>Junction <span className="text-gray-600">·</span> {scenario.target_structure.junction}</>}
              </div>
            </div>
          </>
        );
      case PHASE.PLAN:
        return (
          <>
            <div className="text-[11px] text-gray-300 leading-relaxed mb-2">
              이 실험에는 <span className="text-cyan-300 font-bold">{totalSteps}개 단계</span>가 필요합니다.
              먼저 어떤 장비를 어떤 순서로 사용하는지 살펴봅니다.
            </div>
            <ol className="text-[10px] text-gray-400 space-y-0.5 max-h-44 overflow-auto pr-1">
              {scenario.steps.map((s) => (
                <li key={s.step} className="font-mono">
                  <span className="text-gray-600 inline-block w-5">{String(s.step).padStart(2, '0')}</span>
                  <span className="text-cyan-300">{s.equipment.replace(/_/g, ' ')}</span>
                  <span className="text-gray-600"> → </span>
                  <span className="text-gray-300">{s.process}</span>
                </li>
              ))}
            </ol>
            <div className="text-[10px] text-gray-500 mt-2 leading-relaxed">
              실행 시 시편을 각 장비로 직접 옮겨야 합니다 (LOAD → RUN → UNLOAD).
            </div>
          </>
        );
      case PHASE.STEP_INTRO:
        return (
          <div className="text-[11px] text-gray-300 leading-relaxed">
            {stepTutorialMsg || `${eqLabel}로 이동하여 다음 단계를 진행합니다.`}
          </div>
        );
      case PHASE.STEP_LOAD:
        return (
          <div className="text-[11px] text-gray-300 leading-relaxed">
            <span className="text-cyan-300 font-bold">[LOAD SAMPLE]</span> 버튼을 눌러 시편을 <span className="text-cyan-300">{eqLabel}</span>으로 이송합니다.
            <div className="text-[9px] text-gray-500 mt-1">실제 fab에서는 wafer를 cassette에서 chamber로 옮기는 단계입니다.</div>
          </div>
        );
      case PHASE.STEP_RUN:
        return (
          <div className="text-[11px] text-gray-300 leading-relaxed">
            파라미터를 확인/조정하고 <span className="text-cyan-300 font-bold">[RUN PROCESS]</span> 또는 <span className="text-cyan-300 font-bold">[MEASURE]</span> 버튼을 누르세요.
            {stepTutorialMsg && <div className="mt-1 text-[10px] text-cyan-200">💡 {stepTutorialMsg}</div>}
          </div>
        );
      case PHASE.STEP_UNLOAD:
        return (
          <div className="text-[11px] text-gray-300 leading-relaxed">
            실행 완료. <span className="text-cyan-300 font-bold">[UNLOAD]</span> 버튼을 눌러 다음 장비로 이동할 준비를 합니다.
          </div>
        );
      case PHASE.COMPLETE:
        return (
          <div className="text-[11px] text-gray-300 leading-relaxed">
            모든 단계가 완료되었습니다. 우측 <span className="text-cyan-300">Sample State</span> 패널과 하단 <span className="text-cyan-300">Diagnosis</span>에서 결과를 확인하세요.
          </div>
        );
      default:
        return null;
    }
  };

  // 사용자 행동을 기다리는 phase는 다음 버튼을 비활성화
  const waiting = phase === PHASE.STEP_LOAD || phase === PHASE.STEP_RUN || phase === PHASE.STEP_UNLOAD;
  const lastPhase = phase === PHASE.COMPLETE;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-[calc(100%-2rem)] sm:w-96 font-mono"
      style={{ pointerEvents: 'auto' }}>
      <div className="border border-cyan-500/60 bg-[#0a1018]/95 backdrop-blur shadow-2xl"
        style={{ boxShadow: '0 0 20px rgba(0,212,255,0.25), 0 8px 30px rgba(0,0,0,0.6)' }}>
        {/* Header */}
        <div className="flex items-center gap-2 px-3 h-8 border-b border-cyan-700/40"
          style={{ background: 'linear-gradient(180deg,#0e1922,#0a0e14)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 6px #00d4ff', animation: 'pulse 1.4s infinite' }} />
          <span className="text-[10px] tracking-[2px] text-cyan-300 uppercase">TUTORIAL</span>
          <span className="ml-auto text-[9px] tracking-[1px] text-gray-500 uppercase">
            {phase.replace('_', ' ')}
            {step && (phase === PHASE.STEP_INTRO || phase === PHASE.STEP_LOAD || phase === PHASE.STEP_RUN || phase === PHASE.STEP_UNLOAD) && (
              <span className="ml-2 text-cyan-400">{step}/{totalSteps}</span>
            )}
          </span>
        </div>

        {/* Body */}
        <div className="p-3">
          <div className="text-[9px] tracking-[2px] text-cyan-500 mb-1 uppercase">{titleByPhase[phase]}</div>
          {bodyByPhase()}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-3 h-9 border-t border-cyan-900/40 bg-[#080c12]">
          <button
            onClick={onSkip}
            className="text-[9px] tracking-[1.5px] text-gray-600 hover:text-rose-300 uppercase"
          >
            ✕ SKIP TUTORIAL
          </button>
          <button
            onClick={onAdvance}
            disabled={waiting}
            className={`px-3 py-1 text-[10px] tracking-[2px] uppercase border transition ${
              waiting
                ? 'border-gray-800 text-gray-700 cursor-not-allowed'
                : 'border-cyan-500 bg-cyan-700/30 text-cyan-200 hover:bg-cyan-600/50'
            }`}
            style={!waiting ? { textShadow: '0 0 4px #00d4ff' } : undefined}
          >
            {waiting
              ? '⏳ 위 액션을 수행하세요'
              : lastPhase ? '✓ FINISH' : phase === PHASE.INTRO ? 'NEXT — 실험계획 ▷' : phase === PHASE.PLAN ? 'NEXT — 실행 시작 ▷' : 'NEXT ▷'}
          </button>
        </div>
      </div>
    </div>
  );
}
