import { useMemo, useRef, useState } from 'react';
import { listScenarios, getScenario, FREE_MODE_ID } from './miniFab/definitions/scenarios.js';
import { getEquipment } from './miniFab/definitions/equipment.js';
import { getTutorial } from './miniFab/definitions/tutorials.js';
import { createInitialSample, summarizeSample } from './miniFab/core/sampleStateEngine.js';
import { runProcess } from './miniFab/core/processRuleEngine.js';
import { runMeasurement } from './miniFab/core/measurementEngine.js';
import { completeStep } from './miniFab/core/workflowEngine.js';
import { diagnose } from './miniFab/core/diagnosisEngine.js';
import { buildRecipe, downloadRecipe, parseRecipeFile, replayRecipe } from './miniFab/core/recipeIO.js';
import LayerStackView from './miniFab/LayerStackView.jsx';
import LabMap from './miniFab/views/LabMap.jsx';
import EquipmentInstrument from './miniFab/views/EquipmentInstrument.jsx';
import TutorialOverlay, { PHASE } from './miniFab/views/TutorialOverlay.jsx';
import ExperimentPlanner from './miniFab/views/ExperimentPlanner.jsx';
import { EquipmentIcon } from './miniFab/icons/EquipmentIcons.jsx';

const defaultParams = (eq) => {
  const out = {};
  (eq?.parameters || []).forEach((p) => { out[p.key] = p.default; });
  return out;
};

const StateBadge = ({ label, value, ok }) => {
  const tone = ok === true
    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-700/40'
    : ok === false
      ? 'bg-rose-500/10 text-rose-300 border-rose-700/40'
      : 'bg-[#0a0e14] text-gray-300 border-gray-800';
  return (
    <div className={`px-2 py-1 border ${tone} text-[12px] flex justify-between gap-2 font-mono`}>
      <span className="text-gray-500 tracking-[1px] uppercase">{label}</span>
      <span className="font-bold">{String(value)}</span>
    </div>
  );
};

export default function MiniFabSimulator() {
  // ---- Top-level view state ----
  // 'landing' | 'tutorial' | 'planner' | 'runtime'
  const [view, setView] = useState('landing');

  // ---- Scenario & sequence ----
  const scenarios = useMemo(() => listScenarios(), []);
  const [scenarioId, setScenarioId] = useState(null); // null = free
  const [freePlan, setFreePlan] = useState({
    title: '', purpose: '', requires: '', sequence: [],
  });

  // ---- Sample / workflow ----
  const [sample, setSample] = useState(() => createInitialSample());
  const [workflow, setWorkflow] = useState(null); // initialized when scenario is loaded
  const [activeStep, setActiveStep] = useState(1);
  const [paramsByStep, setParamsByStep] = useState({});
  const [notesLog, setNotesLog] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);

  // Sample location: null (in shipping port) | equipment_id (loaded into chamber)
  const [sampleLocation, setSampleLocation] = useState(null);
  // 마지막 측정 결과 per equipment_id
  const [lastResultByEq, setLastResultByEq] = useState({});

  // ---- Tutorial state ----
  const [tutorialPhase, setTutorialPhase] = useState(PHASE.INTRO);
  const [tutorialEnabled, setTutorialEnabled] = useState(true);

  // ---- Recipe IO ----
  const fileInputRef = useRef(null);
  const [recipeBanner, setRecipeBanner] = useState(null);

  const isFree = scenarioId === null || scenarioId === FREE_MODE_ID;
  const scenario = isFree ? null : getScenario(scenarioId);
  const tutorialMessages = isFree ? [] : getTutorial(scenarioId);

  // 시나리오 모드: 시퀀스는 scenario.steps. Free 모드: freePlan.sequence
  const runSequence = isFree
    ? (freePlan.sequence || []).map((s, i) => ({
        step: i + 1, equipment: s.equipment_id, process: s.process_id, required: true,
      }))
    : scenario?.steps || [];

  const stepDef = runSequence.find((s) => s.step === activeStep);
  const equipment = stepDef ? getEquipment(stepDef.equipment) : null;
  const isMeasure = equipment?.type === 'measurement';
  const sampleLoadedHere = sampleLocation === stepDef?.equipment;
  const stepCompleted = workflow?.completed?.includes(activeStep);

  const currentParams = paramsByStep[activeStep] ?? defaultParams(equipment);

  const setParam = (key, val) => {
    setParamsByStep((prev) => ({
      ...prev,
      [activeStep]: { ...(prev[activeStep] ?? defaultParams(equipment)), [key]: val },
    }));
  };

  // ---- Navigation ----
  const startTutorial = (id) => {
    const sid = id || scenarios[0].scenario_id;
    setScenarioId(sid);
    setSample(createInitialSample());
    setWorkflow({ scenario_id: sid, current_step: 1, completed: [], results: {} });
    setActiveStep(1);
    setParamsByStep({});
    setNotesLog([]);
    setDiagnosis(null);
    setSampleLocation(null);
    setLastResultByEq({});
    setTutorialPhase(PHASE.INTRO);
    setTutorialEnabled(true);
    setView('tutorial');
  };

  const startFreeMode = () => {
    setScenarioId(FREE_MODE_ID);
    setView('planner');
  };

  const enterRuntime = () => {
    setSample(createInitialSample());
    setWorkflow({ scenario_id: scenarioId, current_step: 1, completed: [], results: {} });
    setActiveStep(1);
    setParamsByStep({});
    setNotesLog([]);
    setDiagnosis(null);
    setSampleLocation(null);
    setLastResultByEq({});
    setView('runtime');
  };

  const backToLanding = () => {
    setView('landing');
    setScenarioId(null);
    setDiagnosis(null);
  };

  // ---- Sample transport ----
  const canLoadHere = !sampleLocation && !stepCompleted;

  const handleLoadSample = () => {
    if (!stepDef) return;
    setSampleLocation(stepDef.equipment);
    if (tutorialEnabled && tutorialPhase === PHASE.STEP_LOAD) {
      setTutorialPhase(PHASE.STEP_RUN);
    }
  };

  const handleUnloadSample = () => {
    setSampleLocation(null);
    if (tutorialEnabled && tutorialPhase === PHASE.STEP_UNLOAD) {
      // 다음 단계로
      const total = runSequence.length;
      if (activeStep >= total) {
        setTutorialPhase(PHASE.COMPLETE);
        if (!isFree) setDiagnosis(diagnose(sample, scenarioId, workflow?.results || {}));
      } else {
        setActiveStep(activeStep + 1);
        setTutorialPhase(PHASE.STEP_INTRO);
      }
    }
  };

  // ---- Run process / measurement ----
  const handleRun = () => {
    if (!stepDef || !sampleLoadedHere || stepCompleted) return;
    if (isMeasure) {
      const result = runMeasurement(sample, stepDef.equipment, currentParams);
      const wf = completeStep(workflow, activeStep, result);
      setWorkflow(wf);
      setLastResultByEq((prev) => ({ ...prev, [stepDef.equipment]: result }));
      setNotesLog((log) => [
        { step: activeStep, equipment: equipment.name, kind: 'measure', detail: result }, ...log,
      ]);
      const total = runSequence.length;
      if (activeStep === total && !isFree) {
        setDiagnosis(diagnose(sample, scenarioId, wf.results));
      }
    } else {
      const { sample: next, notes } = runProcess(sample, stepDef.process, currentParams);
      setSample(next);
      const wf = completeStep(workflow, activeStep);
      setWorkflow(wf);
      setNotesLog((log) => [
        { step: activeStep, equipment: equipment.name, kind: 'process', notes, params: currentParams }, ...log,
      ]);
    }
    if (tutorialEnabled && tutorialPhase === PHASE.STEP_RUN) {
      setTutorialPhase(PHASE.STEP_UNLOAD);
    }
  };

  // ---- Tutorial advance (NEXT button) ----
  const handleTutorialAdvance = () => {
    if (tutorialPhase === PHASE.INTRO) setTutorialPhase(PHASE.PLAN);
    else if (tutorialPhase === PHASE.PLAN) setTutorialPhase(PHASE.STEP_INTRO);
    else if (tutorialPhase === PHASE.STEP_INTRO) setTutorialPhase(PHASE.STEP_LOAD);
    else if (tutorialPhase === PHASE.COMPLETE) backToLanding();
  };

  // ---- Step navigation in runtime ----
  const goToStep = (n) => {
    if (n < 1 || n > runSequence.length) return;
    if (sampleLocation) return; // sample이 어딘가에 로드되어 있으면 이동 불가
    setActiveStep(n);
    if (tutorialEnabled) setTutorialPhase(PHASE.STEP_INTRO);
  };

  // ---- Recipe IO ----
  const handleExportRecipe = () => {
    const recipe = buildRecipe(sample, isFree ? null : scenarioId);
    const fname = `${isFree ? 'free' : scenarioId}-recipe-${Date.now()}.json`;
    downloadRecipe(recipe, fname);
    setRecipeBanner({ kind: 'ok', text: `📥 ${fname} 내보냈습니다 (${recipe.steps.length} steps).` });
  };
  const handleImportRecipe = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const recipe = await parseRecipeFile(file);
      const { sample: replayed, replayNotes } = replayRecipe(recipe);
      setSample(replayed);
      setNotesLog(replayNotes.map((n, i) => ({
        step: `R${i + 1}`, equipment: n.process_id, kind: 'process',
        notes: n.notes || (n.error ? [`replay error: ${n.error}`] : []),
        params: n.params || {},
      })));
      setRecipeBanner({ kind: 'ok', text: `📂 ${file.name} 재실행 (${recipe.steps.length} steps).` });
    } catch (err) {
      setRecipeBanner({ kind: 'err', text: `Import 실패: ${err.message}` });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ---- Render ----
  if (view === 'landing') {
    return <LabMap onStartTutorial={startTutorial} onStartFreeMode={startFreeMode} />;
  }
  if (view === 'planner') {
    return (
      <ExperimentPlanner
        plan={freePlan}
        onPlanChange={setFreePlan}
        onRun={enterRuntime}
        onCancel={backToLanding}
      />
    );
  }

  // ---- runtime / tutorial view ----
  const summary = summarizeSample(sample);
  const tutorialStepMsg = tutorialMessages.find((t) => t.step === activeStep)?.message;

  // 강조할 액션 결정 (tutorial mode only)
  const highlight = (tutorialEnabled && view === 'tutorial')
    ? tutorialPhase === PHASE.STEP_LOAD ? 'load'
      : tutorialPhase === PHASE.STEP_RUN ? 'run'
      : tutorialPhase === PHASE.STEP_UNLOAD ? 'unload'
      : null
    : null;

  const status = stepCompleted
    ? 'COMPLETE'
    : sampleLoadedHere
      ? 'LOADED'
      : 'IDLE';

  return (
    <div className="font-mono text-gray-200 bg-[#0a0c10] min-h-full">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 h-11 border-b-2 border-cyan-700/60"
        style={{ background: 'linear-gradient(180deg,#0e1922,#090d12)' }}>
        <button onClick={backToLanding}
          className="text-[12px] tracking-[1.5px] text-gray-500 hover:text-cyan-300 uppercase">
          ◁ LAB
        </button>
        <div className="text-[14px] font-bold tracking-[2px] text-cyan-300"
          style={{ textShadow: '0 0 8px #00d4ff' }}>
          {isFree ? (freePlan.title || 'FREE EXPERIMENT') : scenario.title}
        </div>
        <span className="text-[11px] text-gray-500 ml-2">
          STEP <span className="text-cyan-400 font-bold">{activeStep}</span>/<span className="text-cyan-400 font-bold">{runSequence.length}</span>
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] tracking-[1.5px] text-gray-500">SAMPLE</span>
          <span className={`text-[12px] px-2 py-0.5 border ${
            sampleLocation
              ? 'border-amber-700/60 text-amber-300 bg-amber-950/30'
              : 'border-emerald-700/60 text-emerald-300 bg-emerald-950/20'
          }`}>
            {sampleLocation ? `IN ${getEquipment(sampleLocation)?.name?.toUpperCase()}` : 'SHIPPING PORT'}
          </span>
          <button onClick={handleExportRecipe} disabled={sample.history.length === 0}
            className="text-[11px] tracking-[1.5px] text-gray-500 hover:text-emerald-300 disabled:text-gray-700 uppercase ml-2">📥 EXPORT</button>
          <button onClick={() => fileInputRef.current?.click()}
            className="text-[11px] tracking-[1.5px] text-gray-500 hover:text-cyan-300 uppercase">📂 IMPORT</button>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportRecipe} />
          <button onClick={() => setTutorialEnabled((v) => !v)}
            className={`text-[11px] tracking-[1.5px] uppercase ml-2 ${tutorialEnabled ? 'text-cyan-300' : 'text-gray-600'}`}>
            🎓 TUTORIAL {tutorialEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {recipeBanner && (
        <div className={`px-4 py-1.5 text-[12px] border-b ${
          recipeBanner.kind === 'err' ? 'bg-rose-950/40 text-rose-200 border-rose-800' : 'bg-emerald-950/40 text-emerald-200 border-emerald-800'
        }`}>
          {recipeBanner.text}
          <button onClick={() => setRecipeBanner(null)} className="ml-2 text-gray-500 hover:text-gray-200">✕</button>
        </div>
      )}

      <div className="p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* ---- LEFT: Step list ---- */}
        <div className="lg:col-span-3 space-y-3">
          <div className="border border-cyan-900/40 bg-[#0d1117] p-3">
            <div className="text-[11px] tracking-[2px] text-cyan-400 mb-2 uppercase">시퀀스</div>
            <ol className="space-y-1">
              {runSequence.map((s) => {
                const eq = getEquipment(s.equipment);
                const done = workflow?.completed?.includes(s.step);
                const active = activeStep === s.step;
                const locked = sampleLocation && sampleLocation !== s.equipment && !done;
                return (
                  <li key={s.step}>
                    <button
                      onClick={() => goToStep(s.step)}
                      disabled={!!sampleLocation}
                      className={`w-full text-left p-2 border flex items-center gap-2 transition ${
                        active
                          ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
                          : done
                            ? 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300/80'
                            : locked
                              ? 'border-gray-900 bg-gray-950/40 text-gray-600 cursor-not-allowed'
                              : 'border-gray-800 bg-[#0a0e14] text-gray-300 hover:border-cyan-700/60'
                      }`}
                    >
                      <span className="text-[11px] text-gray-600 font-mono w-5">{String(s.step).padStart(2, '0')}</span>
                      <div className={`w-7 h-7 ${eq?.type === 'measurement' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        <EquipmentIcon id={s.equipment} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] truncate uppercase tracking-[1px]">{eq?.name}</div>
                        <div className="text-[11px] text-gray-500 truncate">{s.process}</div>
                      </div>
                      <span className="text-[11px]">{done ? '✓' : active ? '▶' : ''}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            {sampleLocation && (
              <div className="text-[11px] text-amber-300 mt-2 leading-relaxed">
                ⚠ Sample이 장비에 로드된 상태에서는 다른 단계로 이동할 수 없습니다. UNLOAD 후 이동하세요.
              </div>
            )}
          </div>
        </div>

        {/* ---- CENTER: Equipment instrument ---- */}
        <div className="lg:col-span-5 space-y-3">
          {equipment ? (
            <EquipmentInstrument
              equipment={equipment}
              params={currentParams}
              onParamChange={setParam}
              onRun={handleRun}
              sampleLoaded={sampleLoadedHere}
              canLoad={canLoadHere}
              onLoadSample={handleLoadSample}
              onUnloadSample={handleUnloadSample}
              status={status}
              lastResult={lastResultByEq[stepDef?.equipment]}
              tutorialHint={tutorialEnabled && tutorialPhase === PHASE.STEP_RUN ? tutorialStepMsg : null}
              highlight={highlight}
            />
          ) : (
            <div className="border border-gray-800 p-4 text-[13px] text-gray-500">시퀀스 끝.</div>
          )}

          {/* Notes log */}
          <div className="border border-cyan-900/40 bg-[#0d1117] p-3">
            <div className="text-[11px] tracking-[2px] text-cyan-400 mb-2 uppercase">실행 로그</div>
            {notesLog.length === 0 ? (
              <div className="text-[12px] text-gray-500">아직 기록이 없습니다.</div>
            ) : (
              <ul className="space-y-1.5 max-h-56 overflow-auto">
                {notesLog.map((n, i) => (
                  <li key={i} className="text-[12px] border-l-2 border-cyan-900/40 pl-2">
                    <span className="text-gray-500">[Step {n.step}]</span>{' '}
                    <span className="text-cyan-300">{n.equipment}</span>{' '}
                    <span className={n.kind === 'measure' ? 'text-emerald-400' : 'text-amber-400'}>· {n.kind}</span>
                    {n.kind === 'process' && n.notes?.length > 0 && (
                      <ul className="mt-0.5 ml-2 list-disc list-inside text-amber-200">
                        {n.notes.map((nt, j) => <li key={j}>{nt}</li>)}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ---- RIGHT: Layer Stack + Sample state ---- */}
        <div className="lg:col-span-4 space-y-3">
          <LayerStackView sample={sample} />
          <div className="border border-cyan-900/40 bg-[#0d1117] p-3">
            <div className="text-[11px] tracking-[2px] text-cyan-400 mb-2 uppercase">SAMPLE STATE 누적</div>
            <div className="grid grid-cols-1 gap-1">
              <StateBadge label="Substrate" value={`${sample.base.substrate} ${sample.base.orientation}`} />
              <StateBadge label="Contamination" value={summary.contamination}
                ok={['low', 'very_low', 'none'].includes(summary.contamination)} />
              <StateBadge label="Plasma Damage" value={summary.plasma_damage} ok={summary.plasma_damage === 'none'} />
              <StateBadge label="Top Layer" value={summary.top_layer} />
              <StateBadge label="Pattern Quality" value={summary.pattern_quality} />
              <StateBadge label="Bridge / Open" value={`${summary.bridge ? 'B' : '-'} / ${summary.open ? 'O' : '-'}`}
                ok={!summary.bridge && !summary.open} />
              <StateBadge label="Implant" value={summary.implant} />
              <StateBadge label="Junction" value={summary.junction} />
            </div>
          </div>
        </div>

        {/* ---- BOTTOM: Diagnosis ---- */}
        {(diagnosis || sample.history.length >= runSequence.length) && (
          <div className="lg:col-span-12">
            <div className="border border-cyan-900/40 bg-[#0d1117] p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[11px] tracking-[2px] text-cyan-400 uppercase">DIAGNOSIS</div>
                <button
                  onClick={() => setDiagnosis(diagnose(sample, isFree ? null : scenarioId, workflow?.results || {}))}
                  className="text-[11px] text-gray-500 hover:text-cyan-300 uppercase tracking-[1px] ml-auto"
                >▶ run diagnosis</button>
              </div>
              {!diagnosis ? (
                <div className="text-[12px] text-gray-500">시나리오 마지막 단계 완료 시 자동 실행되거나 수동 트리거하세요.</div>
              ) : (
                <div className="space-y-2">
                  <div className={`text-[13px] font-bold ${diagnosis.overall === 'PASS' ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {diagnosis.overall === 'PASS' ? '✓ PASS' : '⚠ NEEDS REVIEW'} — <span className="text-gray-300 font-normal">{diagnosis.summary}</span>
                  </div>
                  {diagnosis.comparison.length > 0 && (
                    <table className="w-full text-[12px] font-mono">
                      <thead className="text-gray-500"><tr className="border-b border-gray-800">
                        <th className="text-left py-1 tracking-[1px] uppercase">item</th>
                        <th className="text-left py-1 tracking-[1px] uppercase">target</th>
                        <th className="text-left py-1 tracking-[1px] uppercase">actual</th>
                        <th className="text-left py-1 tracking-[1px] uppercase">judge</th>
                      </tr></thead>
                      <tbody>
                        {diagnosis.comparison.map((c, i) => (
                          <tr key={i} className="border-b border-gray-900/50">
                            <td className="py-1 text-gray-300">{c.item}</td>
                            <td className="py-1 text-gray-500">{c.target}</td>
                            <td className="py-1 text-gray-200">{c.actual}</td>
                            <td className={`py-1 ${c.ok ? 'text-emerald-300' : 'text-rose-300'}`}>{c.ok ? 'OK' : 'NG'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {diagnosis.failures.length > 0 && (
                    <div className="space-y-1.5">
                      {diagnosis.failures.map((f) => (
                        <div key={f.id} className="border border-rose-800/40 bg-rose-950/20 p-2">
                          <div className="text-[12px] text-rose-300 font-bold mb-0.5">⚠ {f.name}</div>
                          <div className="text-[12px] text-gray-200">{f.message}</div>
                          {f.traced_cause && <div className="text-[12px] text-amber-200">🔎 {f.traced_cause}</div>}
                          <ul className="text-[12px] text-emerald-200 list-disc list-inside mt-1">
                            {f.fix.map((r, i) => <li key={i}>{r}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tutorial overlay — only in tutorial mode */}
      {view === 'tutorial' && tutorialEnabled && (
        <TutorialOverlay
          scenario={scenario}
          step={activeStep}
          phase={tutorialPhase}
          totalSteps={runSequence.length}
          onAdvance={handleTutorialAdvance}
          onSkip={() => setTutorialEnabled(false)}
          stepEquipment={equipment}
          stepTutorialMsg={tutorialStepMsg}
        />
      )}
    </div>
  );
}
