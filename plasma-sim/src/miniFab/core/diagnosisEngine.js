// Diagnosis Engine
// 측정 결과 + sample state + history + golden sample을 비교하여
// 가능한 원인 후보와 개선 레시피를 반환한다.
import { listFailures } from '../definitions/failures.js';
import { getGolden } from '../definitions/goldenSamples.js';

export const diagnose = (sample, scenarioId, measurements = {}) => {
  const golden = getGolden(scenarioId);
  const ctx = { golden };
  const matched = [];

  for (const f of listFailures()) {
    try {
      if (f.matches(sample, ctx)) matched.push(f);
    } catch { /* skip */ }
  }

  // Golden sample 비교
  const comparison = [];
  if (golden) {
    const top = sample.layers[sample.layers.length - 1];
    if (top && golden.metal_thickness_nm) {
      comparison.push({
        item: 'Metal Thickness',
        target: `${golden.metal_thickness_nm.target} ± ${golden.metal_thickness_nm.tolerance} nm`,
        actual: `${top.thickness_nm} nm`,
        ok: Math.abs(top.thickness_nm - golden.metal_thickness_nm.target) <= golden.metal_thickness_nm.tolerance,
      });
    }
    if (golden.pattern_quality) {
      comparison.push({
        item: 'Pattern Quality',
        target: golden.pattern_quality,
        actual: sample.photo.pattern_quality,
        ok: sample.photo.pattern_quality === golden.pattern_quality,
      });
    }
    comparison.push({
      item: 'Bridge Defect',
      target: 'none',
      actual: sample.defects.bridge ? 'YES' : 'none',
      ok: !sample.defects.bridge,
    });
    comparison.push({
      item: 'Open Defect',
      target: 'none',
      actual: sample.defects.open ? 'YES' : 'none',
      ok: !sample.defects.open,
    });

    // Rs 측정값이 있으면 비교
    const rsResult = Object.values(measurements).find(
      (m) => m && m.outputs && m.outputs.sheet_resistance_ohm_sq != null
    );
    if (rsResult && golden.sheet_resistance_ohm_sq) {
      const rs = rsResult.outputs.sheet_resistance_ohm_sq;
      const { min, max } = golden.sheet_resistance_ohm_sq;
      comparison.push({
        item: 'Sheet Resistance',
        target: `${min} ~ ${max} Ω/□`,
        actual: `${rs} Ω/□`,
        ok: rs >= min && rs <= max,
      });
    }
  }

  const allOk = comparison.length > 0 && comparison.every((c) => c.ok) && matched.length === 0;

  return {
    overall: allOk ? 'PASS' : 'NEEDS_REVIEW',
    comparison,
    failures: matched.map((f) => ({
      id: f.failure_id,
      name: f.name,
      message: f.diagnosis_message,
      fix: f.recommended_fix,
    })),
    summary: allOk
      ? '모든 항목이 Golden Sample 허용 범위 내입니다.'
      : matched.length > 0
        ? `${matched.length}건의 결함 패턴이 검출되었습니다. 아래 진단을 확인하세요.`
        : 'Golden Sample 대비 일부 항목이 허용 범위를 벗어났습니다.',
  };
};
