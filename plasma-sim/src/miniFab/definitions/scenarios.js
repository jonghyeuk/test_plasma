// Scenario Definitions
// 새 시나리오 추가 시 이 객체에 항목을 추가한다.
export const scenarioDefinitions = {
  metal_pattern_flow: {
    scenario_id: 'metal_pattern_flow',
    title: 'Metal Pattern Mini Flow',
    description: 'Si 기판 위에 Al 박막을 증착하고 lithography + RIE로 패턴을 형성한 뒤 측정·진단까지 수행하는 기본 흐름.',
    difficulty: 'beginner',
    target_structure: { substrate: 'Si', layers: ['Al pattern'] },
    steps: [
      { step: 1, equipment: 'wet_bench', process: 'cleaning', required: true },
      { step: 2, equipment: 'sputter', process: 'metal_deposition', required: true },
      { step: 3, equipment: 'mask_aligner', process: 'lithography', required: true },
      { step: 4, equipment: 'rie', process: 'plasma_etch', required: true },
      { step: 5, equipment: 'optical_microscope', process: 'inspection', required: true },
      { step: 6, equipment: 'four_point_probe', process: 'resistance_measurement', required: true },
    ],
  },

  plasma_surface_flow: {
    scenario_id: 'plasma_surface_flow',
    title: 'Plasma Surface + Deposition Flow',
    description: 'Wet 세정 → O₂ Plasma 표면처리 → Sputter 증착 흐름. Surface energy / 박막 두께 측정으로 표면 처리의 효과를 학습.',
    difficulty: 'beginner',
    target_structure: { substrate: 'Si', layers: ['Al thin film'] },
    steps: [
      { step: 1, equipment: 'wet_bench', process: 'cleaning', required: true },
      { step: 2, equipment: 'plasma_cleaner', process: 'o2_plasma', required: true },
      { step: 3, equipment: 'contact_angle_meter', process: 'surface_energy_measurement', required: true },
      { step: 4, equipment: 'sputter', process: 'metal_deposition', required: true },
      { step: 5, equipment: 'profilometer', process: 'thickness_measurement', required: true },
    ],
  },

  pn_diode_flow: {
    scenario_id: 'pn_diode_flow',
    title: 'PN Diode Mini Flow',
    description: 'p-Si 기판에 SiO₂ mask를 이용해 n-region 윈도우를 열고, P 도펀트를 implant한 뒤 RTA로 활성화. Al 컨택트를 증착하고 I-V로 다이오드 특성을 진단.',
    difficulty: 'advanced',
    target_structure: { substrate: 'Si', layers: ['SiO2 (mask)', 'Al contact'], junction: 'pn' },
    steps: [
      { step: 1, equipment: 'wet_bench', process: 'cleaning', required: true },
      { step: 2, equipment: 'thermal_oxidation_furnace', process: 'thermal_oxidation', required: true },
      { step: 3, equipment: 'mask_aligner', process: 'lithography', required: true },
      { step: 4, equipment: 'rie', process: 'plasma_etch', required: true },
      { step: 5, equipment: 'ion_implanter', process: 'ion_implantation', required: true },
      { step: 6, equipment: 'rta_chamber', process: 'rapid_thermal_anneal', required: true },
      { step: 7, equipment: 'sputter', process: 'metal_deposition', required: true },
      { step: 8, equipment: 'sem', process: 'sem_inspection', required: true },
      { step: 9, equipment: 'iv_analyzer', process: 'iv_measurement', required: true },
    ],
  },

  moscap_flow: {
    scenario_id: 'moscap_flow',
    title: 'MOS Capacitor Mini Flow',
    description: 'Si 기판 위에 thermal SiO₂ 절연막을 성장시키고 Al 전극을 증착·패터닝하여 MOS 커패시터를 형성하고 LCR Meter로 측정.',
    difficulty: 'intermediate',
    target_structure: { substrate: 'Si', layers: ['SiO2 (thermal)', 'Al electrode'] },
    steps: [
      { step: 1, equipment: 'wet_bench', process: 'cleaning', required: true },
      { step: 2, equipment: 'thermal_oxidation_furnace', process: 'thermal_oxidation', required: true },
      { step: 3, equipment: 'sputter', process: 'metal_deposition', required: true },
      { step: 4, equipment: 'mask_aligner', process: 'lithography', required: true },
      { step: 5, equipment: 'rie', process: 'plasma_etch', required: true },
      { step: 6, equipment: 'lcr_meter', process: 'capacitance_measurement', required: true },
    ],
  },
};

export const listScenarios = () => Object.values(scenarioDefinitions);
export const getScenario = (id) => scenarioDefinitions[id];

// 가상 시나리오 — Free Mode에서 사용
export const FREE_MODE_ID = '__free__';

