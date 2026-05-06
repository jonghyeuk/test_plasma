import { useMemo, useState } from 'react';
import { listScenarios, getScenario } from './miniFab/definitions/scenarios.js';
import { getEquipment } from './miniFab/definitions/equipment.js';
import { getTutorial } from './miniFab/definitions/tutorials.js';
import { createInitialSample, summarizeSample } from './miniFab/core/sampleStateEngine.js';
import { runProcess } from './miniFab/core/processRuleEngine.js';
import { runMeasurement } from './miniFab/core/measurementEngine.js';
import { initWorkflow, isStepUnlocked, completeStep, getStepDef } from './miniFab/core/workflowEngine.js';
import { diagnose } from './miniFab/core/diagnosisEngine.js';

const defaultParams = (eq) => {
  const out = {};
  (eq?.parameters || []).forEach((p) => {
    out[p.key] = p.default;
  });
  return out;
};

function ParameterField({ p, value, onChange }) {
  if (p.type === 'select') {
    return (
      <label className="block text-xs text-gray-300 mb-2">
        <span className="block mb-1 text-gray-400">{p.label}</span>
        <select
          value={value}
          onChange={(e) => onChange(p.key, e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm"
        >
          {p.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <label className="block text-xs text-gray-300 mb-2">
      <span className="flex justify-between mb-1">
        <span className="text-gray-400">{p.label}</span>
        <span className="text-cyan-300 font-mono">{value} {p.unit}</span>
      </span>
      <input
        type="range"
        min={p.min}
        max={p.max}
        step={p.step || 1}
        value={value}
        onChange={(e) => onChange(p.key, Number(e.target.value))}
        className="w-full accent-cyan-500"
      />
    </label>
  );
}

function StateBadge({ label, value, ok }) {
  const tone = ok === true
    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    : ok === false
      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
      : 'bg-gray-700/40 text-gray-300 border-gray-600/40';
  return (
    <div className={`px-2.5 py-1.5 rounded border ${tone} text-xs flex justify-between gap-3`}>
      <span className="text-gray-400">{label}</span>
      <span className="font-mono">{String(value)}</span>
    </div>
  );
}

export default function MiniFabSimulator() {
  const scenarios = useMemo(() => listScenarios(), []);
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.scenario_id || '');
  const [sample, setSample] = useState(() => createInitialSample());
  const [workflow, setWorkflow] = useState(() => initWorkflow(scenarios[0].scenario_id));
  const [activeStep, setActiveStep] = useState(1);
  const [paramsByStep, setParamsByStep] = useState({});
  const [notesLog, setNotesLog] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);

  const scenario = getScenario(scenarioId);
  const tutorial = getTutorial(scenarioId);
  const stepDef = getStepDef(scenarioId, activeStep);
  const equipment = stepDef ? getEquipment(stepDef.equipment) : null;
  const isMeasurement = equipment?.type === 'measurement';
  const stepCompleted = workflow.completed.includes(activeStep);
  const stepUnlocked = isStepUnlocked(workflow, activeStep);

  const currentParams = paramsByStep[activeStep] ?? defaultParams(equipment);

  const setParam = (key, val) => {
    setParamsByStep((prev) => ({
      ...prev,
      [activeStep]: { ...(prev[activeStep] ?? defaultParams(equipment)), [key]: val },
    }));
  };

  const resetAll = () => {
    setSample(createInitialSample());
    setWorkflow(initWorkflow(scenarioId));
    setActiveStep(1);
    setParamsByStep({});
    setNotesLog([]);
    setDiagnosis(null);
  };

  const switchScenario = (id) => {
    setScenarioId(id);
    setSample(createInitialSample());
    setWorkflow(initWorkflow(id));
    setActiveStep(1);
    setParamsByStep({});
    setNotesLog([]);
    setDiagnosis(null);
  };

  const handleRun = () => {
    if (!stepDef || !stepUnlocked || stepCompleted) return;

    if (isMeasurement) {
      const result = runMeasurement(sample, stepDef.equipment, currentParams);
      const wf = completeStep(workflow, activeStep, result);
      setWorkflow(wf);
      setNotesLog((log) => [
        { step: activeStep, equipment: equipment.name, kind: 'measure', detail: result },
        ...log,
      ]);
      // 마지막 단계면 자동 진단
      const nextStep = activeStep + 1;
      const total = scenario.steps.length;
      if (activeStep === total) {
        setDiagnosis(diagnose(sample, scenarioId, wf.results));
      } else {
        setActiveStep(nextStep);
      }
    } else {
      const { sample: next, notes } = runProcess(sample, stepDef.process, currentParams);
      setSample(next);
      const wf = completeStep(workflow, activeStep);
      setWorkflow(wf);
      setNotesLog((log) => [
        { step: activeStep, equipment: equipment.name, kind: 'process', notes, params: currentParams },
        ...log,
      ]);
      setActiveStep(activeStep + 1);
    }
  };

  const summary = summarizeSample(sample);
  const tutorialMsg = tutorial.find((t) => t.step === activeStep)?.message;

  return (
    <div className="p-4 sm:p-6 text-gray-100 min-h-full">
      {/* 상단: 시나리오 선택 */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2 className="text-xl font-bold text-cyan-300">🏭 Mini Fab Workflow</h2>
          <span className="text-xs text-gray-400">시편 상태 누적 기반 공정 시뮬레이션 · Phase 1 MVP</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <button
              key={s.scenario_id}
              onClick={() => switchScenario(s.scenario_id)}
              className={`px-3 py-2 rounded-lg text-sm border transition ${
                scenarioId === s.scenario_id
                  ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-200'
                  : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-700/60'
              }`}
            >
              {s.title}
              <span className="ml-2 text-[10px] text-gray-500">{s.difficulty}</span>
            </button>
          ))}
          <button
            onClick={resetAll}
            className="px-3 py-2 rounded-lg text-sm border bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-rose-900/40 ml-auto"
          >
            ↺ Reset Sample
          </button>
        </div>
        {scenario && (
          <p className="mt-2 text-sm text-gray-400">{scenario.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 좌측: 공정 단계 목록 + Mini Lab */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <div className="text-xs font-bold text-cyan-400 mb-3">공정 단계</div>
            <ol className="space-y-2">
              {scenario?.steps.map((s) => {
                const eq = getEquipment(s.equipment);
                const done = workflow.completed.includes(s.step);
                const unlocked = isStepUnlocked(workflow, s.step);
                const active = activeStep === s.step;
                return (
                  <li key={s.step}>
                    <button
                      onClick={() => unlocked && setActiveStep(s.step)}
                      disabled={!unlocked}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-sm flex items-center gap-3 transition ${
                        active
                          ? 'border-cyan-500/60 bg-cyan-600/10 text-cyan-200'
                          : done
                            ? 'border-emerald-700/40 bg-emerald-900/10 text-emerald-200/80'
                            : unlocked
                              ? 'border-gray-700 bg-gray-800/40 text-gray-200 hover:bg-gray-800'
                              : 'border-gray-800 bg-gray-900/30 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-lg">{eq?.icon}</span>
                      <span className="flex-1">
                        <span className="block font-semibold">Step {s.step}. {eq?.name}</span>
                        <span className="block text-[11px] text-gray-500">{s.process}</span>
                      </span>
                      <span className="text-xs">
                        {done ? '✅' : unlocked ? '▶' : '🔒'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <div className="text-xs font-bold text-cyan-400 mb-3">Mini Process Lab</div>
            <div className="grid grid-cols-3 gap-2">
              {scenario?.steps.map((s) => {
                const eq = getEquipment(s.equipment);
                const active = activeStep === s.step;
                const done = workflow.completed.includes(s.step);
                return (
                  <div
                    key={s.step}
                    className={`aspect-square rounded-lg border flex flex-col items-center justify-center text-center p-1 transition ${
                      active
                        ? 'border-cyan-400 bg-cyan-500/10 shadow-md shadow-cyan-500/20'
                        : done
                          ? 'border-emerald-600/40 bg-emerald-900/20'
                          : 'border-gray-700 bg-gray-800/30'
                    }`}
                  >
                    <div className="text-2xl">{eq?.icon}</div>
                    <div className="text-[10px] mt-1 text-gray-300 leading-tight">{eq?.name}</div>
                    <div className="text-[10px] text-gray-500">#{s.step}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 중앙: 활성 장비 파라미터 패널 */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-cyan-400">활성 장비</div>
              {equipment && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isMeasurement ? 'bg-emerald-900/40 text-emerald-300' : 'bg-amber-900/40 text-amber-300'
                }`}>
                  {isMeasurement ? 'Measurement' : 'Process'}
                </span>
              )}
            </div>
            {equipment ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{equipment.icon}</span>
                  <div>
                    <div className="font-bold">{equipment.name}</div>
                    <div className="text-xs text-gray-500">{equipment.category}</div>
                  </div>
                </div>
                {tutorialMsg && (
                  <div className="text-xs bg-indigo-900/30 border border-indigo-700/40 text-indigo-200 rounded-lg p-2 mb-3">
                    💡 {tutorialMsg}
                  </div>
                )}
                <div className="space-y-1 mb-3">
                  {(equipment.parameters || []).map((p) => (
                    <ParameterField
                      key={p.key}
                      p={p}
                      value={currentParams[p.key]}
                      onChange={setParam}
                    />
                  ))}
                </div>
                <button
                  onClick={handleRun}
                  disabled={!stepUnlocked || stepCompleted}
                  className={`w-full py-2.5 rounded-lg text-sm font-bold transition ${
                    stepCompleted
                      ? 'bg-emerald-700/40 text-emerald-200 cursor-default'
                      : stepUnlocked
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {stepCompleted
                    ? '✓ 완료됨'
                    : isMeasurement
                      ? '📏 측정 실행'
                      : '▶ 공정 실행'}
                </button>
              </>
            ) : (
              <div className="text-sm text-gray-500">시나리오를 선택하세요.</div>
            )}
          </div>
        </div>

        {/* 우측: Sample State */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <div className="text-xs font-bold text-cyan-400 mb-3">Sample State (누적)</div>
            <div className="grid grid-cols-1 gap-1.5">
              <StateBadge label="Substrate" value={`${sample.base.substrate} ${sample.base.orientation}`} />
              <StateBadge label="Contamination" value={summary.contamination} ok={['low', 'very_low', 'none'].includes(summary.contamination)} />
              <StateBadge label="Hydrophilicity" value={summary.hydrophilicity} />
              <StateBadge label="Plasma Damage" value={summary.plasma_damage} ok={summary.plasma_damage === 'none'} />
              <StateBadge label="Top Layer" value={summary.top_layer} />
              <StateBadge label="PR Status" value={summary.pr_status} />
              <StateBadge label="Pattern Quality" value={summary.pattern_quality} />
              <StateBadge label="Line Width Error" value={`${summary.line_width_error_nm} nm`} />
              <StateBadge label="Particle" value={summary.particle} />
              <StateBadge label="Bridge Defect" value={summary.bridge ? 'YES' : 'no'} ok={!summary.bridge} />
              <StateBadge label="Open Defect" value={summary.open ? 'YES' : 'no'} ok={!summary.open} />
            </div>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <div className="text-xs font-bold text-cyan-400 mb-3">공정 이력</div>
            {sample.history.length === 0 ? (
              <div className="text-xs text-gray-500">아직 수행된 공정이 없습니다.</div>
            ) : (
              <ul className="space-y-1.5 text-xs max-h-44 overflow-auto">
                {sample.history.map((h, i) => (
                  <li key={i} className="text-gray-300 border-l-2 border-cyan-700/40 pl-2">
                    <span className="text-cyan-300">{h.process_id}</span>
                    <span className="text-gray-500"> · {Object.entries(h.params).map(([k, v]) => `${k}=${v}`).join(', ')}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 하단: 측정 결과 + 진단 */}
        <div className="lg:col-span-12 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
              <div className="text-xs font-bold text-cyan-400 mb-3">측정 결과 / 노트</div>
              {notesLog.length === 0 ? (
                <div className="text-xs text-gray-500">아직 결과가 없습니다.</div>
              ) : (
                <ul className="space-y-2 max-h-72 overflow-auto">
                  {notesLog.map((n, i) => (
                    <li key={i} className="text-xs bg-gray-800/40 border border-gray-700/50 rounded-lg p-2">
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>Step {n.step} · {n.equipment}</span>
                        <span className={n.kind === 'measure' ? 'text-emerald-300' : 'text-amber-300'}>
                          {n.kind === 'measure' ? '📏 measurement' : '⚙ process'}
                        </span>
                      </div>
                      {n.kind === 'measure' ? (
                        <pre className="text-[11px] text-cyan-200 whitespace-pre-wrap font-mono">
{JSON.stringify(n.detail, null, 2)}
                        </pre>
                      ) : (
                        <>
                          <div className="text-[11px] text-gray-300 mb-1">
                            params: {Object.entries(n.params).map(([k, v]) => `${k}=${v}`).join(', ')}
                          </div>
                          {n.notes.length > 0 && (
                            <ul className="list-disc list-inside text-[11px] text-amber-200">
                              {n.notes.map((note, j) => <li key={j}>{note}</li>)}
                            </ul>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="text-xs font-bold text-cyan-400">Diagnosis</div>
                <button
                  onClick={() => setDiagnosis(diagnose(sample, scenarioId, workflow.results))}
                  className="text-[11px] px-2 py-1 rounded bg-indigo-700/50 hover:bg-indigo-600/60"
                >
                  진단 실행
                </button>
              </div>
              {!diagnosis ? (
                <div className="text-xs text-gray-500">
                  모든 공정/측정 완료 후 자동 진단이 실행됩니다. 또는 수동으로 실행하세요.
                </div>
              ) : (
                <div className="space-y-3">
                  <div className={`text-sm font-bold ${
                    diagnosis.overall === 'PASS' ? 'text-emerald-300' : 'text-rose-300'
                  }`}>
                    {diagnosis.overall === 'PASS' ? '✅ PASS' : '⚠ NEEDS REVIEW'} — {diagnosis.summary}
                  </div>

                  {diagnosis.comparison.length > 0 && (
                    <div>
                      <div className="text-[11px] text-gray-400 mb-1">Golden Sample 비교</div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px]">
                          <thead className="text-gray-500">
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-1">항목</th>
                              <th className="text-left py-1">목표</th>
                              <th className="text-left py-1">실측</th>
                              <th className="text-left py-1">판정</th>
                            </tr>
                          </thead>
                          <tbody>
                            {diagnosis.comparison.map((c, i) => (
                              <tr key={i} className="border-b border-gray-800/50">
                                <td className="py-1 text-gray-300">{c.item}</td>
                                <td className="py-1 text-gray-400">{c.target}</td>
                                <td className="py-1 text-gray-200 font-mono">{c.actual}</td>
                                <td className={`py-1 ${c.ok ? 'text-emerald-300' : 'text-rose-300'}`}>
                                  {c.ok ? 'OK' : 'NG'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {diagnosis.failures.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[11px] text-gray-400">검출된 결함 / 권장 개선</div>
                      {diagnosis.failures.map((f) => (
                        <div key={f.id} className="bg-rose-900/20 border border-rose-700/40 rounded-lg p-2">
                          <div className="text-rose-300 text-xs font-bold mb-1">⚠ {f.name}</div>
                          <div className="text-[11px] text-gray-200 mb-1">{f.message}</div>
                          <ul className="list-disc list-inside text-[11px] text-emerald-200">
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

          <div className="text-[11px] text-gray-500 px-2">
            확장 구조: <span className="text-gray-400">/miniFab/definitions</span> 에 equipment / processes / measurements / scenarios / failures / tutorials / goldenSamples JSON-style 정의가 분리되어 있습니다.
            새 장비·공정·시나리오는 코어 코드 수정 없이 정의 파일에 항목을 추가하는 방식으로 확장합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
