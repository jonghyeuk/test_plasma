// Failure Scenario Library
// 각 failure는 매칭 조건과 진단 메시지를 가진다.
export const failureDefinitions = {
  pr_lifting: {
    failure_id: 'pr_lifting',
    name: 'PR Lifting',
    matches: (sample) => sample.surface.contamination === 'high' || sample.photo.adhesion === 'weak',
    visible_in: ['optical_microscope'],
    effects: ['pattern_quality decrease', 'open defect risk'],
    diagnosis_message: '세정 부족으로 PR 접착력이 약해 lifting이 발생했습니다.',
    recommended_fix: ['Cleaning time/강도 증가', 'SC1 또는 Piranha 사용', 'Rinse quality 점검'],
  },
  bridge_defect: {
    failure_id: 'bridge_defect',
    name: 'Bridge Defect',
    matches: (sample) => sample.defects.bridge === true,
    visible_in: ['optical_microscope', 'four_point_probe'],
    effects: ['저항 비정상 감소 또는 단락'],
    diagnosis_message: 'Under-etch 또는 PR 보호 실패로 인접 패턴이 연결되었습니다.',
    recommended_fix: ['RIE time 또는 RF power 증가', 'Cl₂ 비중 확인', 'Lithography 재검토'],
  },
  open_defect: {
    failure_id: 'open_defect',
    name: 'Open Defect',
    matches: (sample) => sample.defects.open === true,
    visible_in: ['optical_microscope', 'four_point_probe'],
    effects: ['저항 비정상 증가, 단선'],
    diagnosis_message: 'Over-etch로 인해 metal line이 단선되었습니다.',
    recommended_fix: ['RIE time 단축', 'End-point detection 적용', 'Selectivity 확보'],
  },
  thin_metal: {
    failure_id: 'thin_metal',
    name: 'Insufficient Metal Thickness',
    matches: (sample, ctx) => {
      const top = sample.layers[sample.layers.length - 1];
      const target = ctx?.golden?.metal_thickness_nm?.target ?? 100;
      const tol = ctx?.golden?.metal_thickness_nm?.tolerance ?? 15;
      return top && top.thickness_nm < target - tol;
    },
    visible_in: ['four_point_probe'],
    effects: ['Sheet resistance 증가'],
    diagnosis_message: 'Sputter time/power 부족으로 metal 두께가 목표보다 낮습니다.',
    recommended_fix: ['Sputter time 증가', 'Power 200W 권장', 'Pressure 5 mTorr 유지'],
  },
  plasma_damage: {
    failure_id: 'plasma_damage',
    name: 'Plasma Damage',
    matches: (sample) => ['high', 'very_high'].includes(sample.surface.plasma_damage),
    visible_in: ['optical_microscope'],
    effects: ['표면 손상, 후속 공정 신뢰도 저하'],
    diagnosis_message: '누적된 RF 노출로 기판 표면 손상이 관찰됩니다.',
    recommended_fix: ['RF power 감소', '식각 시간 최적화', 'End-point 활용'],
  },
};

failureDefinitions.implant_blocked = {
  failure_id: 'implant_blocked',
  name: 'Implant Blocked by Oxide',
  matches: (sample) => {
    if (!sample.implant && sample.history.some((h) => h.process_id === 'ion_implantation')) return true;
    return false;
  },
  visible_in: ['iv_analyzer', 'sem'],
  effects: ['Junction 형성 실패'],
  diagnosis_message: 'Implant 단계가 수행되었으나 dopant가 substrate에 도달하지 못했습니다 (oxide 두께 > Rp).',
  recommended_fix: ['RIE 단계에서 SiO2 윈도우 충분히 식각', 'Implant energy 증가', 'Mask oxide 두께 감소'],
};

failureDefinitions.inactive_dopant = {
  failure_id: 'inactive_dopant',
  name: 'Inactive Dopant',
  matches: (sample) => sample.implant && sample.implant.activated === false && sample.implant.activation_pct < 50,
  visible_in: ['iv_analyzer'],
  effects: ['Diode ideality factor 증가', 'leakage 증가'],
  diagnosis_message: 'Implant은 수행되었으나 활성화율이 낮습니다. RTA 조건을 점검하세요.',
  recommended_fix: ['RTA 온도 ≥ 900°C', 'RTA time ≥ 20 sec', 'Implant damage 회복을 위한 추가 anneal'],
};

failureDefinitions.high_leakage_diode = {
  failure_id: 'high_leakage_diode',
  name: 'High Leakage Diode',
  matches: (sample, ctx) => {
    if (sample.surface.plasma_damage === 'high' || sample.surface.plasma_damage === 'very_high') {
      if (sample.junction) return true;
    }
    if (ctx?.golden?.leakage_at_5V_nA?.max && ctx?.measurements?.leakage_at_5V_nA > ctx.golden.leakage_at_5V_nA.max) return true;
    return false;
  },
  visible_in: ['iv_analyzer'],
  effects: ['Reverse leakage 비정상 증가', 'noise margin 저하'],
  diagnosis_message: 'Plasma damage 또는 contamination으로 junction leakage가 증가했습니다.',
  recommended_fix: ['RIE RF power 감소', 'Forming gas anneal로 trap 감소', '컨택트 형성 전 surface clean 강화'],
};

export const listFailures = () => Object.values(failureDefinitions);
