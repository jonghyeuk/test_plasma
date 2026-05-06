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
};

export const listScenarios = () => Object.values(scenarioDefinitions);
export const getScenario = (id) => scenarioDefinitions[id];
