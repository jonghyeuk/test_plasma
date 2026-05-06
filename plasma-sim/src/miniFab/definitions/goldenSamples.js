// Golden Sample Reference (시나리오별 기준 결과)
export const goldenSamples = {
  metal_pattern_flow: {
    metal: 'Al',
    metal_thickness_nm: { target: 100, tolerance: 15 },
    pattern_quality: 'good',
    defects: { bridge: false, open: false },
    sheet_resistance_ohm_sq: { min: 0.2, max: 0.4 }, // 100 nm Al 기준
  },
};

export const getGolden = (id) => goldenSamples[id];
