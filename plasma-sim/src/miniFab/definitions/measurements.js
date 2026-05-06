// Measurement Definitions
// 측정 장비는 sample state를 "장비 관점"으로 해석하여 출력한다.
// outputs는 raw state의 단순 복사가 아니라 measurement model을 통과한 결과여야 한다.

const noisy = (v, pct = 0.05) => v * (1 + (Math.random() - 0.5) * 2 * pct);

export const measurementDefinitions = {
  optical_microscope: {
    measurement_id: 'optical_microscope',
    reads: ['photo.pattern_quality', 'photo.line_width_error', 'defects', 'layers[*].uniformity'],
    outputs: ['pattern_quality', 'visible_defects', 'cd_estimate', 'uniformity_visual'],
    required_sample_condition: [],
    measure: (sample, params) => {
      const mag = params?.magnification || '200x';
      const detail = { '50x': 1, '200x': 2, '1000x': 3 }[mag] || 2;

      const top = sample.layers[sample.layers.length - 1];
      const visible = [];
      if (sample.defects.bridge) visible.push('Bridge defect 관찰됨');
      if (sample.defects.open) visible.push('Open defect 관찰됨');
      if (detail >= 2 && sample.defects.particle && sample.defects.particle !== 'none' && sample.defects.particle !== 'very_low') {
        visible.push(`Particle: ${sample.defects.particle}`);
      }
      if (detail >= 3 && sample.surface.plasma_damage !== 'none') {
        visible.push(`Plasma damage 흔적: ${sample.surface.plasma_damage}`);
      }
      if (visible.length === 0) visible.push('특이 결함 없음');

      const baseCD = (sample.photo.mask_pattern === 'line_2um') ? 2000 : 5000; // nm
      const cd = top?.patterned
        ? Math.round(noisy(baseCD - sample.photo.line_width_error, 0.02))
        : null;

      return {
        title: 'Optical Microscope Inspection',
        magnification: mag,
        outputs: {
          pattern_quality: sample.photo.pattern_quality || 'n/a',
          visible_defects: visible,
          cd_estimate_nm: cd,
          uniformity_visual: top?.uniformity || 'n/a',
        },
        confidence: detail >= 2 ? 'medium-high' : 'medium',
      };
    },
  },

  four_point_probe: {
    measurement_id: 'four_point_probe',
    reads: ['layers[top].thickness_nm', 'layers[top].material', 'defects.open', 'defects.bridge'],
    outputs: ['sheet_resistance', 'confidence'],
    required_sample_condition: ['conductive_top_layer'],
    measure: (sample) => {
      const top = sample.layers[sample.layers.length - 1];
      if (!top || top.thickness_nm <= 0) {
        return {
          title: '4-Point Probe',
          outputs: { sheet_resistance: null, note: '도전 박막 없음 — 측정 불가.' },
          confidence: 'low',
        };
      }
      // ρ_Al ≈ 2.65e-8 Ω·m → bulk Rs (Ω/sq) = ρ / t
      const rho = { Al: 2.65e-8, Cu: 1.68e-8, Ti: 4.2e-7 }[top.material] || 3e-8;
      const tMeters = top.thickness_nm * 1e-9;
      let rs = rho / tMeters; // Ω/sq

      // 결함 보정
      if (sample.defects.open) rs *= 5;
      if (top.uniformity === 'poor') rs *= 1.4;
      if (top.uniformity === 'moderate') rs *= 1.15;

      const measured = noisy(rs, 0.04);
      return {
        title: '4-Point Probe',
        outputs: {
          sheet_resistance_ohm_sq: Number(measured.toFixed(3)),
          top_layer_material: top.material,
          inferred_thickness_nm: top.thickness_nm,
        },
        confidence: sample.defects.open ? 'low' : 'high',
      };
    },
  },
};

export const getMeasurement = (id) => measurementDefinitions[id];
