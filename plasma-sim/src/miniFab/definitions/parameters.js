// Parameter Registry
// 측정/상태 파라미터의 메타데이터. 항목이 늘어나도 구조가 무너지지 않도록 별도 분리.
export const parameterRegistry = {
  contamination: {
    label: '표면 오염도', unit: 'level', source: 'sample.surface.contamination',
    educational_note: '세정 후 표면에 남은 오염 정도. PR adhesion에 영향.',
  },
  hydrophilicity: {
    label: '친수성', unit: 'level', source: 'sample.surface.hydrophilicity',
    educational_note: '표면 에너지 지표. O₂ 플라즈마/세정으로 증가.',
  },
  plasma_damage: {
    label: 'Plasma Damage', unit: 'level', source: 'sample.surface.plasma_damage',
    educational_note: '과도한 RF/시간 노출 시 누적되는 표면 손상.',
  },
  layer_thickness_nm: {
    label: 'Layer Thickness', unit: 'nm', source: 'sample.layers[*].thickness_nm',
    educational_note: '박막 두께. Sputter time/power와 비례.',
  },
  uniformity: {
    label: 'Uniformity', unit: 'level', source: 'sample.layers[*].uniformity',
    educational_note: 'Center-edge 두께 차이의 정성 지표.',
  },
  pattern_quality: {
    label: 'Pattern Quality', unit: 'level', source: 'sample.photo.pattern_quality',
    educational_note: 'Lithography + Etch 결과의 종합 품질.',
  },
  line_width_error: {
    label: 'Line Width Error', unit: 'nm', source: 'sample.photo.line_width_error',
    educational_note: 'CD 오차. Alignment/Dose/Etch 영향.',
  },
  particle: {
    label: 'Particle', unit: 'level', source: 'sample.defects.particle',
    educational_note: 'Surface particle 수준. Rinse, 환경 영향.',
  },
  bridge: {
    label: 'Bridge Defect', unit: 'bool', source: 'sample.defects.bridge',
    educational_note: '인접 패턴이 잔류 재료로 연결된 결함. Under-etch 의심.',
  },
  open: {
    label: 'Open Defect', unit: 'bool', source: 'sample.defects.open',
    educational_note: '단선 결함. Over-etch / PR lifting 의심.',
  },
  sheet_resistance: {
    label: 'Sheet Resistance', unit: 'Ω/□', source: 'derived',
    educational_note: '4-Point Probe로 측정. 두께·재질·결함에 의존.',
  },
};

export const LEVELS = ['none', 'very_low', 'low', 'medium', 'high', 'very_high'];
export const QUALITY = ['poor', 'marginal', 'moderate', 'good', 'excellent'];

export const stepLevel = (level, delta) => {
  const i = LEVELS.indexOf(level);
  if (i === -1) return level;
  return LEVELS[Math.max(0, Math.min(LEVELS.length - 1, i + delta))];
};

export const stepQuality = (level, delta) => {
  const i = QUALITY.indexOf(level);
  if (i === -1) return level;
  return QUALITY[Math.max(0, Math.min(QUALITY.length - 1, i + delta))];
};
