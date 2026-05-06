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

  // ---- Phase 3 신규 측정 장비 ----
  profilometer: {
    measurement_id: 'profilometer',
    reads: ['layers[top].thickness_nm', 'layers[top].uniformity', 'surface.roughness'],
    outputs: ['center_thickness', 'edge_thickness', 'variation', 'roughness'],
    measure: (sample, params) => {
      const top = sample.layers[sample.layers.length - 1];
      if (!top) {
        return { title: 'Profilometer', outputs: { note: '측정 가능한 step이 없습니다.' }, confidence: 'low' };
      }
      const t = top.thickness_nm;
      const variancePct = { excellent: 0.02, good: 0.04, moderate: 0.10, poor: 0.20 }[top.uniformity] ?? 0.05;
      const center = Math.round(noisy(t, 0.02));
      const edge = Math.round(noisy(t * (1 - variancePct), 0.02));
      const roughnessLevel = sample.surface.roughness;
      return {
        title: 'Profilometer (Step Height Scan)',
        scan_length_um: params?.scan_length || 500,
        outputs: {
          center_thickness_nm: center,
          edge_thickness_nm: edge,
          variation_pct: Math.round((1 - edge / center) * 100 * 10) / 10,
          surface_roughness: roughnessLevel,
        },
        confidence: variancePct > 0.15 ? 'medium' : 'high',
      };
    },
  },

  contact_angle_meter: {
    measurement_id: 'contact_angle_meter',
    reads: ['surface.hydrophilicity'],
    outputs: ['contact_angle_deg', 'surface_state'],
    measure: (sample, params) => {
      const map = { very_low: 105, low: 85, medium: 65, high: 35, very_high: 15, none: 95 };
      const base = map[sample.surface.hydrophilicity] ?? 70;
      const liquidOffset = params?.liquid === 'Glycerol' ? 10 : 0;
      const angle = Math.round(noisy(base + liquidOffset, 0.04));
      let state;
      if (angle > 90) state = 'hydrophobic';
      else if (angle > 60) state = 'mildly hydrophilic';
      else if (angle > 30) state = 'hydrophilic';
      else state = 'super-hydrophilic';
      return {
        title: 'Contact Angle Meter',
        outputs: {
          contact_angle_deg: angle,
          surface_state: state,
          liquid: params?.liquid || 'DI Water',
        },
        confidence: 'high',
      };
    },
  },

  lcr_meter: {
    measurement_id: 'lcr_meter',
    reads: ['layers (oxide)', 'top_metal (electrode)'],
    outputs: ['capacitance_pF', 'leakage_indication'],
    measure: (sample, params) => {
      const area_mm2 = params?.electrode_area_mm2 || 1;
      const A = area_mm2 * 1e-6; // m²
      const oxide = sample.layers.find((l) => l.material === 'SiO2' || l.material === 'SiN');
      const topMetal = sample.layers[sample.layers.length - 1];
      const hasMetalElectrode = topMetal && ['Al', 'Cu', 'Ti'].includes(topMetal.material);
      if (!oxide || !hasMetalElectrode) {
        return {
          title: 'LCR Meter',
          outputs: { note: 'MOS 구조(절연막 + 금속 전극)가 형성되지 않아 측정 불가.' },
          confidence: 'low',
        };
      }
      const epsilon0 = 8.854e-12;
      const epsR = oxide.material === 'SiN' ? 7.0 : 3.9;
      const d = oxide.thickness_nm * 1e-9;
      const C = epsilon0 * epsR * A / d; // F
      const C_pF = C * 1e12;
      const damage = sample.surface.plasma_damage;
      const leakage = damage === 'high' ? 'elevated' : damage === 'very_high' ? 'severe' : 'normal';
      return {
        title: 'LCR Meter (MOS Capacitance)',
        frequency_kHz: params?.frequency || 100,
        outputs: {
          capacitance_pF: Number(noisy(C_pF, 0.03).toFixed(2)),
          oxide_thickness_nm: oxide.thickness_nm,
          oxide_material: oxide.material,
          leakage_indication: leakage,
        },
        confidence: leakage === 'severe' ? 'low' : 'high',
      };
    },
  },
};

export const getMeasurement = (id) => measurementDefinitions[id];

// equipment_id → measurement_id 매핑 (Free Mode에서 사용)
export const measurementByEquipment = {
  optical_microscope: 'optical_microscope',
  four_point_probe: 'four_point_probe',
  profilometer: 'profilometer',
  contact_angle_meter: 'contact_angle_meter',
  lcr_meter: 'lcr_meter',
};
