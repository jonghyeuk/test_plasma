// Diagnosis Engine
// 측정 결과 + sample state + history + golden sample을 비교하여
// 가능한 원인 후보와 개선 레시피를 반환한다.
import { listFailures } from '../definitions/failures.js';
import { getGolden } from '../definitions/goldenSamples.js';

// 실패 → history 후보 매칭 휴리스틱
const traceFailureCause = (failure, sample) => {
  const findLast = (id) => [...sample.history].reverse().find((h) => h.process_id === id);
  switch (failure.failure_id) {
    case 'bridge_defect': {
      const etch = findLast('plasma_etch');
      if (etch) {
        if ((etch.params?.time ?? 0) < 60) return `RIE Step의 time(${etch.params.time}s)이 짧아 under-etch 가능성.`;
        if ((etch.params?.rf_power ?? 0) < 100) return `RIE RF power(${etch.params.rf_power}W)가 낮아 식각이 부족합니다.`;
      }
      const litho = findLast('lithography');
      if (litho && litho.params?.alignment_quality === 'poor') return 'Lithography alignment poor → PR 보호 실패 가능.';
      return 'RIE 식각이 부족하거나 PR 패턴이 부정확합니다.';
    }
    case 'open_defect': {
      const etch = findLast('plasma_etch');
      if (etch) {
        if ((etch.params?.time ?? 0) > 150) return `RIE time(${etch.params.time}s)이 길어 over-etch.`;
        if ((etch.params?.rf_power ?? 0) > 300) return `RIE RF power(${etch.params.rf_power}W) 과도.`;
      }
      return 'RIE over-etch 또는 PR lifting이 의심됩니다.';
    }
    case 'thin_metal': {
      const dep = findLast('metal_deposition');
      if (dep) {
        if ((dep.params?.time ?? 0) < 50) return `Sputter time(${dep.params.time}s)이 짧습니다.`;
        if ((dep.params?.power ?? 0) < 150) return `Sputter power(${dep.params.power}W)가 낮습니다.`;
        if ((dep.params?.pressure ?? 0) > 15) return `Pressure(${dep.params.pressure} mTorr)가 높아 deposition rate 저하.`;
      }
      return 'Sputter 조건이 목표 두께에 부족합니다.';
    }
    case 'pr_lifting': {
      const clean = findLast('cleaning');
      if (!clean) return '세정 step이 누락되었습니다.';
      if ((clean.params?.time ?? 0) < 60) return `Cleaning time(${clean.params.time}s) 부족.`;
      return '세정 강도 부족 또는 표면 친수성 부족.';
    }
    case 'plasma_damage': {
      const causes = [];
      const o2 = findLast('o2_plasma');
      const etch = findLast('plasma_etch');
      const dep = findLast('metal_deposition');
      if (o2 && (o2.params?.rf_power ?? 0) * (o2.params?.time ?? 0) > 18000) causes.push('O₂ Plasma dose 과도');
      if (etch && (etch.params?.rf_power ?? 0) > 300) causes.push('RIE RF power 과도');
      if (dep && (dep.params?.power ?? 0) > 400) causes.push('Sputter power 과도');
      return causes.length ? causes.join(', ') : '누적된 RF 노출이 과도합니다.';
    }
    case 'inactive_dopant': {
      const rta = findLast('rapid_thermal_anneal');
      if (!rta) return 'RTA가 수행되지 않았습니다.';
      if ((rta.params?.temperature ?? 0) < 900) return `RTA 온도(${rta.params.temperature}°C)가 활성화에 부족합니다.`;
      if ((rta.params?.time ?? 0) < 20) return `RTA time(${rta.params.time}s)이 짧습니다.`;
      return 'RTA 조건이 활성화에 부족합니다.';
    }
    case 'implant_blocked': {
      const etch = findLast('plasma_etch');
      const ox = findLast('thermal_oxidation');
      if (etch && ox) return `RIE 식각이 SiO₂ 마스크(${ox.params?.time}분 oxidation)를 충분히 제거하지 못했습니다.`;
      return 'Oxide 윈도우 식각 또는 implant energy를 점검하세요.';
    }
    case 'high_leakage_diode': {
      const etch = findLast('plasma_etch');
      if (etch && (etch.params?.rf_power ?? 0) > 250) return `RIE RF power(${etch.params.rf_power}W) 과도로 junction damage.`;
      const rta = findLast('rapid_thermal_anneal');
      if (rta && rta.params?.ambient !== 'forming_gas') return 'Forming gas anneal 미수행 — 계면 trap 잔존.';
      return 'Plasma damage 또는 contact contamination이 의심됩니다.';
    }
    default:
      return null;
  }
};

export const diagnose = (sample, scenarioId, measurements = {}) => {
  const golden = scenarioId ? getGolden(scenarioId) : null;
  const ctx = { golden };
  const matched = [];

  for (const f of listFailures()) {
    try {
      if (f.matches(sample, ctx)) matched.push(f);
    } catch { /* skip */ }
  }

  // Golden Sample 비교
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
    if (golden.oxide_thickness_nm) {
      const ox = sample.layers.find((l) => l.material === 'SiO2');
      if (ox) {
        comparison.push({
          item: 'Oxide Thickness',
          target: `${golden.oxide_thickness_nm.target} ± ${golden.oxide_thickness_nm.tolerance} nm`,
          actual: `${ox.thickness_nm} nm`,
          ok: Math.abs(ox.thickness_nm - golden.oxide_thickness_nm.target) <= golden.oxide_thickness_nm.tolerance,
        });
      } else {
        comparison.push({ item: 'Oxide Layer', target: '존재', actual: '없음', ok: false });
      }
    }
    if (golden.pattern_quality) {
      comparison.push({
        item: 'Pattern Quality',
        target: golden.pattern_quality,
        actual: sample.photo.pattern_quality,
        ok: sample.photo.pattern_quality === golden.pattern_quality,
      });
    }
    comparison.push({ item: 'Bridge Defect', target: 'none', actual: sample.defects.bridge ? 'YES' : 'none', ok: !sample.defects.bridge });
    comparison.push({ item: 'Open Defect', target: 'none', actual: sample.defects.open ? 'YES' : 'none', ok: !sample.defects.open });

    if (golden.plasma_damage_max) {
      const order = ['none', 'very_low', 'low', 'medium', 'high', 'very_high'];
      const ok = order.indexOf(sample.surface.plasma_damage) <= order.indexOf(golden.plasma_damage_max);
      comparison.push({ item: 'Plasma Damage', target: `≤ ${golden.plasma_damage_max}`, actual: sample.surface.plasma_damage, ok });
    }

    // 측정값 기반 비교
    const flat = Object.values(measurements).map((m) => m?.outputs || {});
    const merged = Object.assign({}, ...flat);
    if (golden.sheet_resistance_ohm_sq && merged.sheet_resistance_ohm_sq != null) {
      const rs = merged.sheet_resistance_ohm_sq;
      const { min, max } = golden.sheet_resistance_ohm_sq;
      comparison.push({ item: 'Sheet Resistance', target: `${min} ~ ${max} Ω/□`, actual: `${rs} Ω/□`, ok: rs >= min && rs <= max });
    }
    if (golden.contact_angle_deg && merged.contact_angle_deg != null) {
      const a = merged.contact_angle_deg;
      const { min, max } = golden.contact_angle_deg;
      comparison.push({ item: 'Contact Angle', target: `${min} ~ ${max}°`, actual: `${a}°`, ok: a >= min && a <= max });
    }
    if (golden.capacitance_pF && merged.capacitance_pF != null) {
      const c = merged.capacitance_pF;
      const { min, max } = golden.capacitance_pF;
      comparison.push({ item: 'Capacitance', target: `${min} ~ ${max} pF`, actual: `${c} pF`, ok: c >= min && c <= max });
    }
    if (golden.leakage_target && merged.leakage_indication) {
      comparison.push({
        item: 'Leakage',
        target: golden.leakage_target,
        actual: merged.leakage_indication,
        ok: merged.leakage_indication === golden.leakage_target,
      });
    }

    if (golden.junction_required) {
      comparison.push({
        item: 'PN Junction',
        target: '존재',
        actual: sample.junction ? `${sample.junction.type} (act ${sample.junction.activation_pct ?? 0}%)` : '없음',
        ok: !!sample.junction && (sample.junction.activation_pct ?? 0) >= (golden.activation_pct_min ?? 0),
      });
    }
    if (golden.diode_curve_target && merged.curve_type) {
      comparison.push({
        item: 'Diode Curve',
        target: golden.diode_curve_target,
        actual: merged.curve_type,
        ok: merged.curve_type === golden.diode_curve_target,
      });
    }
    if (golden.vf_at_1mA && merged.vf_at_1mA != null) {
      const v = merged.vf_at_1mA;
      const { min, max } = golden.vf_at_1mA;
      comparison.push({ item: 'Vf @ 1 mA', target: `${min} ~ ${max} V`, actual: `${v} V`, ok: v >= min && v <= max });
    }
    if (golden.leakage_at_5V_nA && merged.leakage_at_5V_nA != null) {
      const l = merged.leakage_at_5V_nA;
      const { max } = golden.leakage_at_5V_nA;
      comparison.push({ item: 'Reverse Leakage @ 5 V', target: `≤ ${max} nA`, actual: `${l} nA`, ok: l <= max });
    }
    if (golden.ideality_factor && merged.ideality_factor != null) {
      const n = merged.ideality_factor;
      const { min, max } = golden.ideality_factor;
      comparison.push({ item: 'Ideality Factor n', target: `${min} ~ ${max}`, actual: `${n}`, ok: n >= min && n <= max });
    }
  }

  const allOk = comparison.length > 0 && comparison.every((c) => c.ok) && matched.length === 0;

  return {
    overall: allOk ? 'PASS' : matched.length || comparison.some((c) => !c.ok) ? 'NEEDS_REVIEW' : 'INSUFFICIENT_DATA',
    comparison,
    failures: matched.map((f) => ({
      id: f.failure_id,
      name: f.name,
      message: f.diagnosis_message,
      fix: f.recommended_fix,
      traced_cause: traceFailureCause(f, sample),
    })),
    summary: allOk
      ? '모든 항목이 Golden Sample 허용 범위 내입니다.'
      : matched.length > 0
        ? `${matched.length}건의 결함 패턴이 검출되었습니다.`
        : comparison.length === 0
          ? 'Golden Sample 기준이 없거나 측정 데이터가 부족합니다 (Free Mode).'
          : 'Golden Sample 대비 일부 항목이 허용 범위를 벗어났습니다.',
  };
};
