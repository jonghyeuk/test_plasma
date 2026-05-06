// ExperimentPlanner
// Free Mode 진입 시 사용자가 실험 계획서를 작성하고 장비 시퀀스를 직접 배치한다.
// (1) 제목/목적/필요사항 작성 (2) 좌측 장비 풀에서 클릭으로 시퀀스에 추가
// (3) 시퀀스 검증 → 경고 표시 (4) Run으로 실험 모드 진입
import { useMemo } from 'react';
import { listEquipment, getEquipment } from '../definitions/equipment.js';
import { EquipmentIcon } from '../icons/EquipmentIcons.jsx';
import { validateSequence } from '../core/sequenceValidator.js';

export default function ExperimentPlanner({
  plan,         // { title, purpose, requires, sequence: [{equipment_id, process_id}] }
  onPlanChange,
  onRun,
  onCancel,
}) {
  const equipment = useMemo(() => listEquipment(), []);
  const issues = useMemo(() => validateSequence(plan.sequence || []), [plan.sequence]);

  const setField = (field, value) => onPlanChange({ ...plan, [field]: value });

  const addStep = (eq) => {
    const process_id = eq.supported_processes?.[0];
    if (!process_id) return;
    onPlanChange({
      ...plan,
      sequence: [...(plan.sequence || []), { equipment_id: eq.equipment_id, process_id }],
    });
  };

  const removeStep = (i) => {
    onPlanChange({
      ...plan,
      sequence: plan.sequence.filter((_, idx) => idx !== i),
    });
  };

  const moveStep = (i, dir) => {
    const arr = [...(plan.sequence || [])];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onPlanChange({ ...plan, sequence: arr });
  };

  const groups = {
    'WET / SURFACE': equipment.filter((e) => ['cleaning', 'surface'].includes(e.category)),
    'LITHOGRAPHY': equipment.filter((e) => e.category === 'lithography'),
    'THERMAL': equipment.filter((e) => ['thermal', 'oxidation'].includes(e.category)),
    'DEPOSITION': equipment.filter((e) => e.category === 'deposition'),
    'ETCH': equipment.filter((e) => e.category === 'etch'),
    'DOPING': equipment.filter((e) => e.category === 'doping'),
    'METROLOGY': equipment.filter((e) => e.type === 'measurement'),
  };

  const seq = plan.sequence || [];
  const canRun = seq.length > 0 && plan.title?.trim();

  const issuesByIdx = {};
  issues.forEach((i) => {
    issuesByIdx[i.step_index] = issuesByIdx[i.step_index] || [];
    issuesByIdx[i.step_index].push(i);
  });

  return (
    <div className="font-mono text-gray-200 bg-[#0a0c10] min-h-full">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 h-11 border-b-2 border-fuchsia-700/60"
        style={{ background: 'linear-gradient(180deg,#1a0e22,#0a0612)' }}>
        <button onClick={onCancel}
          className="text-[12px] tracking-[1.5px] text-gray-500 hover:text-fuchsia-300 uppercase">
          ◁ BACK TO LAB
        </button>
        <div className="ml-2 text-[14px] font-bold tracking-[2px] text-fuchsia-300"
          style={{ textShadow: '0 0 8px #d946ef' }}>
          FREE MODE — EXPERIMENT PLANNER
        </div>
        <div className="ml-auto flex items-center gap-3 text-[12px] text-gray-500">
          <span>STEPS <span className="text-fuchsia-300 font-bold">{seq.length}</span></span>
          <span>WARNINGS <span className={issues.length ? 'text-amber-300 font-bold' : 'text-gray-600'}>{issues.length}</span></span>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
        {/* Left: Plan form + equipment palette */}
        <div className="space-y-4">
          {/* Plan form */}
          <div className="border border-fuchsia-900/40 bg-[#0d1117] p-4">
            <div className="text-[11px] tracking-[2px] text-fuchsia-400 mb-2 uppercase">실험 계획서</div>
            <label className="block mb-2">
              <span className="text-[11px] tracking-[1.5px] text-gray-500 uppercase block mb-1">Title</span>
              <input
                type="text"
                value={plan.title || ''}
                onChange={(e) => setField('title', e.target.value)}
                placeholder="예: SiO₂ 위 Al 패턴 두께 영향 실험"
                className="w-full bg-[#050709] border border-fuchsia-900/40 text-fuchsia-100 text-[13px] font-mono p-1.5 placeholder-gray-700"
              />
            </label>
            <label className="block mb-2">
              <span className="text-[11px] tracking-[1.5px] text-gray-500 uppercase block mb-1">Purpose</span>
              <textarea
                rows={2}
                value={plan.purpose || ''}
                onChange={(e) => setField('purpose', e.target.value)}
                placeholder="이 실험의 목적과 학습 목표를 입력합니다."
                className="w-full bg-[#050709] border border-fuchsia-900/40 text-gray-200 text-[13px] font-mono p-1.5 placeholder-gray-700 resize-none"
              />
            </label>
            <label className="block">
              <span className="text-[11px] tracking-[1.5px] text-gray-500 uppercase block mb-1">Requires</span>
              <input
                type="text"
                value={plan.requires || ''}
                onChange={(e) => setField('requires', e.target.value)}
                placeholder="예: p-Si 100 mm wafer, Al target, mask line_5um"
                className="w-full bg-[#050709] border border-fuchsia-900/40 text-gray-200 text-[13px] font-mono p-1.5 placeholder-gray-700"
              />
            </label>
          </div>

          {/* Equipment palette */}
          <div className="border border-fuchsia-900/40 bg-[#0d1117] p-4">
            <div className="text-[11px] tracking-[2px] text-fuchsia-400 mb-2 uppercase">장비 풀 — 클릭하여 시퀀스에 추가</div>
            <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
              {Object.entries(groups).filter(([, list]) => list.length).map(([name, list]) => (
                <div key={name}>
                  <div className="text-[11px] tracking-[2px] text-gray-500 uppercase mb-1">{name}</div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {list.map((eq) => (
                      <button
                        key={eq.equipment_id}
                        onClick={() => addStep(eq)}
                        className={`flex flex-col items-center gap-0.5 p-1.5 border transition
                          ${eq.type === 'measurement'
                            ? 'border-emerald-900/40 hover:border-emerald-500/70 hover:bg-emerald-950/30 text-emerald-300'
                            : 'border-amber-900/40 hover:border-amber-500/70 hover:bg-amber-950/30 text-amber-300'}
                          bg-[#0a0e14]`}
                      >
                        <div className="w-8 h-8"><EquipmentIcon id={eq.equipment_id} /></div>
                        <div className="text-[11px] tracking-[1px] uppercase text-gray-300 leading-tight text-center">
                          {eq.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sequence builder */}
        <div className="space-y-4">
          <div className="border border-fuchsia-900/40 bg-[#0d1117] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-[11px] tracking-[2px] text-fuchsia-400 uppercase">실험 시퀀스</div>
              <div className="flex-1 h-px bg-fuchsia-900/30" />
              <button
                onClick={() => onPlanChange({ ...plan, sequence: [] })}
                disabled={!seq.length}
                className="text-[11px] text-gray-500 hover:text-rose-300 disabled:text-gray-700 uppercase tracking-[1px]"
              >
                ✕ clear
              </button>
            </div>
            {seq.length === 0 ? (
              <div className="text-[12px] text-gray-500 leading-relaxed border border-dashed border-gray-800 p-4 text-center">
                좌측 장비 풀에서 장비를 클릭해 시퀀스에 추가하세요.<br/>
                <span className="text-gray-600">순서가 없으면 실행할 수 없습니다.</span>
              </div>
            ) : (
              <ol className="space-y-1.5">
                {seq.map((s, i) => {
                  const eq = getEquipment(s.equipment_id);
                  const myIssues = issuesByIdx[i] || [];
                  const tone = myIssues.some((x) => x.severity === 'warn') ? 'amber'
                    : myIssues.length ? 'cyan' : 'gray';
                  return (
                    <li key={i} className={`border bg-[#0a0e14] ${
                      tone === 'amber' ? 'border-amber-700/60' : tone === 'cyan' ? 'border-cyan-800/40' : 'border-gray-800'
                    }`}>
                      <div className="flex items-center gap-2 p-2">
                        <span className="text-[11px] tracking-[1px] text-gray-500 font-mono w-6">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className={`w-7 h-7 ${eq?.type === 'measurement' ? 'text-emerald-300' : 'text-amber-300'}`}>
                          <EquipmentIcon id={s.equipment_id} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[13px] text-gray-200 tracking-wide">{eq?.name}</div>
                          <div className="text-[11px] text-gray-500 uppercase tracking-[1px]">{s.process_id.replace(/_/g, ' ')}</div>
                        </div>
                        <button onClick={() => moveStep(i, -1)} disabled={i === 0}
                          className="text-[12px] text-gray-500 hover:text-cyan-300 disabled:text-gray-800 px-1">▲</button>
                        <button onClick={() => moveStep(i, +1)} disabled={i === seq.length - 1}
                          className="text-[12px] text-gray-500 hover:text-cyan-300 disabled:text-gray-800 px-1">▼</button>
                        <button onClick={() => removeStep(i)}
                          className="text-[12px] text-gray-500 hover:text-rose-300 px-1">✕</button>
                      </div>
                      {myIssues.length > 0 && (
                        <div className="border-t border-gray-800 px-2 py-1.5 space-y-0.5 bg-[#080c12]">
                          {myIssues.map((iss, k) => (
                            <div key={k} className={`text-[12px] flex gap-1.5 ${
                              iss.severity === 'warn' ? 'text-amber-300' : 'text-cyan-300'
                            }`}>
                              <span>{iss.severity === 'warn' ? '⚠' : 'ℹ'}</span>
                              <span className="text-gray-300">{iss.message}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          {/* Validation summary */}
          <div className="border border-fuchsia-900/40 bg-[#0d1117] p-4">
            <div className="text-[11px] tracking-[2px] text-fuchsia-400 uppercase mb-2">시퀀스 검증</div>
            {issues.length === 0 ? (
              <div className="text-[12px] text-emerald-300">✓ 명백한 순서 오류 없음.</div>
            ) : (
              <div className="space-y-1">
                {issues.filter((x) => x.severity === 'warn').length > 0 && (
                  <div className="text-[12px] text-amber-300">
                    ⚠ {issues.filter((x) => x.severity === 'warn').length}건의 경고 — 패턴 손실 / 활성화 누락 / 차단 위험.
                  </div>
                )}
                {issues.filter((x) => x.severity === 'info').length > 0 && (
                  <div className="text-[12px] text-cyan-300">
                    ℹ {issues.filter((x) => x.severity === 'info').length}건의 안내 — 권장 단계 누락 가능.
                  </div>
                )}
                <div className="text-[11px] text-gray-500 mt-1">경고가 있어도 실행은 가능합니다. 결과에서 영향을 확인하세요.</div>
              </div>
            )}
          </div>

          {/* Run */}
          <button
            onClick={onRun}
            disabled={!canRun}
            className={`w-full py-3 text-[14px] tracking-[3px] uppercase border transition ${
              canRun
                ? 'border-fuchsia-400 bg-fuchsia-700/40 text-white hover:bg-fuchsia-600/60'
                : 'border-gray-800 bg-gray-900/40 text-gray-600 cursor-not-allowed'
            }`}
            style={canRun ? { textShadow: '0 0 6px #d946ef' } : undefined}
          >
            ▶ ENTER LAB · 실험 시작
          </button>
          {!canRun && (
            <div className="text-[11px] text-gray-500 text-center">
              실행하려면 제목과 1개 이상의 시퀀스가 필요합니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
