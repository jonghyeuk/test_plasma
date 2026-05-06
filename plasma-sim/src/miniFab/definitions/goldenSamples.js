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

goldenSamples.plasma_surface_flow = {
  surface_state_target: 'super-hydrophilic',
  contact_angle_deg: { min: 5, max: 35 },
  metal_thickness_nm: { target: 100, tolerance: 15 },
  plasma_damage_max: 'low',
};

goldenSamples.moscap_flow = {
  oxide_thickness_nm: { target: 90, tolerance: 30 }, // 950°C dry O₂ 30분 ≈ 90 nm
  metal: 'Al',
  metal_thickness_nm: { target: 100, tolerance: 15 },
  capacitance_pF: { min: 250, max: 500 }, // ~Area 1 mm², SiO2 ~90 nm 기준
  defects: { bridge: false, open: false },
  leakage_target: 'normal',
};

export const getGolden = (id) => goldenSamples[id];
