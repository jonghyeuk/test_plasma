// Sample State Engine
// 시편 상태를 보유하고 누적 변화를 관리한다.
export const createInitialSample = (id = 'SAMPLE_001') => ({
  sample_id: id,
  base: { substrate: 'Si', type: 'p-type', orientation: '100' },
  surface: {
    contamination: 'medium',
    roughness: 'smooth',
    hydrophilicity: 'medium',
    plasma_damage: 'none',
  },
  layers: [],
  photo: {
    pr_status: 'none',
    adhesion: 'good',
    pattern_quality: 'none',
    line_width_error: 0,
    mask_pattern: null,
  },
  defects: { particle: 'low', bridge: false, open: false, pinhole: false },
  electrical: { resistance: null, leakage: null, capacitance: null },
  history: [],
});

export const cloneSample = (sample) => JSON.parse(JSON.stringify(sample));

export const summarizeSample = (sample) => {
  const top = sample.layers[sample.layers.length - 1];
  return {
    contamination: sample.surface.contamination,
    hydrophilicity: sample.surface.hydrophilicity,
    plasma_damage: sample.surface.plasma_damage,
    layers: sample.layers.length,
    top_layer: top ? `${top.material} ${top.thickness_nm}nm (${top.uniformity})` : '없음',
    pr_status: sample.photo.pr_status,
    pattern_quality: sample.photo.pattern_quality,
    line_width_error_nm: sample.photo.line_width_error,
    bridge: sample.defects.bridge,
    open: sample.defects.open,
    particle: sample.defects.particle,
  };
};
