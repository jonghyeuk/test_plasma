// Process Rule Definitions
// 각 process는 sample state를 변화시키는 apply(sample, params) 함수를 가진다.
// 신규 공정 추가 시 이 객체에 항목을 추가한다 (코드 분기 X).
import { stepLevel, stepQuality } from './parameters.js';

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const recordHistory = (sample, processId, params, notes = []) => {
  sample.history.push({
    process_id: processId,
    params: { ...params },
    notes,
    at: Date.now(),
  });
};

export const processDefinitions = {
  cleaning: {
    process_id: 'cleaning',
    title: 'Cleaning',
    input_requirements: {},
    parameters: ['time', 'chemical', 'rinse_quality'],
    apply: (sample, params) => {
      const notes = [];
      const { time = 120, chemical = 'SC1', rinse_quality = 'good' } = params;

      const strength = { 'SC1': 1, 'SC2': 1, 'Piranha': 2, 'DI Rinse': 0.3 }[chemical] || 1;
      const drop = clamp(Math.round((time / 120) * strength), 0, 3);

      sample.surface.contamination = stepLevel(sample.surface.contamination, -drop);
      sample.surface.hydrophilicity = stepLevel(sample.surface.hydrophilicity, +Math.min(drop, 2));

      if (rinse_quality === 'poor') {
        sample.defects.particle = stepLevel(sample.defects.particle, +1);
        notes.push('Rinse 품질이 낮아 particle이 증가했습니다.');
      } else if (rinse_quality === 'good') {
        sample.defects.particle = stepLevel(sample.defects.particle, -1);
      }

      if (chemical === 'Piranha' && time > 300) {
        sample.surface.roughness = 'rough';
        notes.push('Piranha 장시간 노출로 roughness 증가.');
      }

      recordHistory(sample, 'cleaning', params, notes);
      return notes;
    },
  },

  metal_deposition: {
    process_id: 'metal_deposition',
    title: 'Metal Deposition (Sputter)',
    input_requirements: {},
    parameters: ['power', 'pressure', 'time', 'material'],
    apply: (sample, params) => {
      const notes = [];
      const { power = 200, pressure = 5, time = 60, material = 'Al' } = params;

      // 단순 비례 모델: thickness ∝ power * time / 120, pressure 보정
      const baseRate = power / 200; // 1.0 at 200W
      const pressureFactor = clamp(1 - Math.abs(pressure - 5) * 0.04, 0.6, 1.1);
      const thickness = Math.round(baseRate * (time / 60) * 100 * pressureFactor);

      let uniformity = 'good';
      if (pressure < 3 || pressure > 15) uniformity = 'moderate';
      if (pressure < 2 || pressure > 25) uniformity = 'poor';

      sample.layers.push({
        material,
        thickness_nm: thickness,
        uniformity,
        defect: pressure > 20 ? 'medium' : 'low',
      });

      if (power > 400) {
        sample.surface.plasma_damage = stepLevel(sample.surface.plasma_damage, +1);
        notes.push('고전력으로 인해 plasma damage 누적.');
      }
      if (uniformity === 'poor') notes.push('Pressure 비정상으로 uniformity가 poor입니다.');

      recordHistory(sample, 'metal_deposition', params, notes);
      return notes;
    },
  },

  lithography: {
    process_id: 'lithography',
    title: 'Lithography (Mask Aligner)',
    input_requirements: { needsTopLayer: true },
    parameters: ['exposure_dose', 'alignment_quality', 'mask_pattern'],
    apply: (sample, params) => {
      const notes = [];
      const { exposure_dose = 120, alignment_quality = 'good', mask_pattern = 'line_5um' } = params;

      // PR 코팅이 자동 포함된 단순화 모델 (MVP)
      sample.photo.pr_status = 'patterned';
      sample.photo.adhesion = sample.surface.contamination === 'high' ? 'weak' : 'good';

      let quality = 'good';
      if (exposure_dose < 60) quality = 'poor';
      else if (exposure_dose < 90 || exposure_dose > 220) quality = 'moderate';
      else if (exposure_dose > 180) quality = 'moderate';

      // alignment penalty
      const alignmentPenalty = { poor: 200, moderate: 80, good: 20, excellent: 5 }[alignment_quality] ?? 50;
      sample.photo.line_width_error = alignmentPenalty + (mask_pattern === 'line_2um' ? 30 : 0);
      sample.photo.pattern_quality = quality;
      sample.photo.mask_pattern = mask_pattern;

      if (sample.photo.adhesion === 'weak') {
        notes.push('표면 오염으로 PR adhesion이 약합니다. PR lifting 위험.');
      }
      if (exposure_dose < 60) notes.push('Under-exposure: 패턴이 형성되지 않을 수 있습니다.');

      recordHistory(sample, 'lithography', params, notes);
      return notes;
    },
  },

  plasma_etch: {
    process_id: 'plasma_etch',
    title: 'Plasma Etch (RIE)',
    input_requirements: { needsPattern: true },
    parameters: ['rf_power', 'pressure', 'gas_ratio', 'time'],
    apply: (sample, params) => {
      const notes = [];
      const { rf_power = 150, pressure = 20, gas_ratio = '1:1', time = 90 } = params;

      // pressure 영향: 낮을수록 anisotropy ↑ (line width 잘 유지), 높을수록 lateral etch ↑
      const pressurePenalty = pressure > 50 ? 30 : pressure > 30 ? 15 : 0;

      const topLayer = sample.layers[sample.layers.length - 1];
      if (!topLayer) {
        notes.push('식각 대상 layer가 없습니다.');
        recordHistory(sample, 'plasma_etch', params, notes);
        return notes;
      }
      const targetThickness = topLayer.thickness_nm;

      // etch rate ∝ rf_power, 시간 따라 침식
      const etchRate = (rf_power / 150) * 1.2; // nm/sec at 150W ≈ 1.2
      const etched = Math.round(etchRate * time);
      const overEtchRatio = etched / targetThickness;

      if (sample.photo.pr_status !== 'patterned' || sample.photo.adhesion === 'weak') {
        // 패턴 보호 실패 → 전면 식각, bridge/open 결함
        topLayer.thickness_nm = Math.max(0, targetThickness - etched);
        sample.defects.bridge = sample.photo.adhesion === 'weak';
        notes.push('PR 패턴 보호 부족으로 전면 손상이 발생했습니다.');
      } else {
        // 정상 pattern transfer
        if (overEtchRatio < 0.85) {
          sample.defects.bridge = true;
          notes.push('Under-etch: 잔류 metal로 인한 bridge 결함.');
        } else if (overEtchRatio > 1.4) {
          sample.defects.open = true;
          sample.surface.plasma_damage = stepLevel(sample.surface.plasma_damage, +1);
          notes.push('Over-etch: open defect 및 substrate damage.');
        }
        // 패턴 형성 완료 → top layer는 패터닝된 상태로 표시
        topLayer.patterned = true;
      }

      sample.photo.line_width_error += pressurePenalty;
      if (pressurePenalty > 0) notes.push('Pressure 과도로 lateral etch 발생.');

      // gas ratio 영향
      if (gas_ratio === '1:2') {
        sample.photo.line_width_error += 30;
        notes.push('BCl₃ 비중 과도로 line width 증가.');
      } else if (gas_ratio === '2:1') {
        sample.surface.plasma_damage = stepLevel(sample.surface.plasma_damage, +1);
      }

      if (rf_power > 400) {
        sample.surface.plasma_damage = stepLevel(sample.surface.plasma_damage, +1);
        notes.push('고RF로 plasma damage 누적.');
      }

      // PR 제거 (단순화)
      sample.photo.pr_status = 'stripped';
      sample.photo.pattern_quality = stepQuality(sample.photo.pattern_quality === 'none' ? 'moderate' : sample.photo.pattern_quality, sample.defects.bridge || sample.defects.open ? -1 : 0);

      recordHistory(sample, 'plasma_etch', params, notes);
      return notes;
    },
  },

  // ---- Phase 3 신규 공정 ----
  pr_coating: {
    process_id: 'pr_coating',
    title: 'PR Coating (Spin Coater)',
    parameters: ['rpm', 'spin_time', 'pr_type', 'dispense_quality'],
    apply: (sample, params) => {
      const notes = [];
      const { rpm = 3000, spin_time = 30, pr_type = 'Positive', dispense_quality = 'good' } = params;
      // 두께 ∝ 1/sqrt(rpm) (스핀 코팅 경험식)
      const thickness = Math.round(1500 / Math.sqrt(rpm / 1000));
      sample.photo.pr_status = 'coated';
      sample.photo.pr_thickness_nm = thickness;
      sample.photo.pr_type = pr_type;
      sample.photo.adhesion = sample.surface.contamination === 'high' ? 'weak' :
        sample.surface.hydrophilicity === 'high' || sample.surface.hydrophilicity === 'very_high' ? 'good' : 'good';
      if (dispense_quality === 'poor') {
        sample.photo.coating_defect = 'striation';
        notes.push('Dispense 불량 → striation/기포 결함.');
      }
      if (spin_time < 20) notes.push('Spin time 부족: edge bead 가능.');
      recordHistory(sample, 'pr_coating', params, notes);
      return notes;
    },
  },

  soft_bake: {
    process_id: 'soft_bake',
    title: 'Soft Bake (Hot Plate)',
    parameters: ['temperature', 'time', 'mode'],
    apply: (sample, params) => {
      const notes = [];
      const { temperature = 110, time = 60, mode = 'soft_bake' } = params;
      if (mode === 'dehydration_bake') {
        sample.surface.hydrophilicity = stepLevel(sample.surface.hydrophilicity, -1);
        sample.photo.adhesion = 'good';
        if (time < 60) notes.push('Dehydration bake time 부족 — 수분 잔류 가능.');
        notes.push('Dehydration bake로 표면 수분 제거, adhesion 개선.');
      } else if (mode === 'hard_bake') {
        sample.photo.pr_state = 'hardened';
        if (temperature > 150) notes.push('Hard bake 과열로 develop 어려움 가능.');
        if (time > 300) notes.push('Hard bake 과도 — develop 매우 느려질 수 있음.');
      } else {
        sample.photo.pr_state = 'soft_baked';
        if (temperature < 90) notes.push('Soft bake 온도 부족 → 잔류 용매.');
        if (temperature > 130) notes.push('Soft bake 과열 → PR sensitivity 저하.');
        if (time < 30) notes.push('Soft bake time 부족 → solvent 잔류.');
      }
      recordHistory(sample, 'soft_bake', params, notes);
      return notes;
    },
  },

  o2_plasma: {
    process_id: 'o2_plasma',
    title: 'O₂ Plasma Surface Treatment',
    parameters: ['rf_power', 'time', 'gas'],
    apply: (sample, params) => {
      const notes = [];
      const { rf_power = 100, time = 60, gas = 'O2' } = params;
      if (gas === 'O2') {
        sample.surface.contamination = stepLevel(sample.surface.contamination, -2);
        sample.surface.hydrophilicity = stepLevel(sample.surface.hydrophilicity, +2);
      } else {
        sample.surface.contamination = stepLevel(sample.surface.contamination, -1);
      }
      const dose = (rf_power / 100) * (time / 60);
      if (dose > 3) {
        sample.surface.plasma_damage = stepLevel(sample.surface.plasma_damage, +2);
        notes.push('과도한 dose로 plasma damage 누적.');
      } else if (dose > 1.5) {
        sample.surface.plasma_damage = stepLevel(sample.surface.plasma_damage, +1);
      }
      recordHistory(sample, 'o2_plasma', params, notes);
      return notes;
    },
  },

  pecvd_deposition: {
    process_id: 'pecvd_deposition',
    title: 'PECVD Deposition',
    parameters: ['power', 'pressure', 'time', 'film'],
    apply: (sample, params) => {
      const notes = [];
      const { power = 200, pressure = 800, time = 300, film = 'SiO2' } = params;
      const baseRate = film === 'SiN' ? 10 / 60 : 8 / 60; // nm/sec
      const thickness = Math.round(baseRate * time * (power / 200));
      let uniformity = 'good';
      if (pressure < 200 || pressure > 1500) uniformity = 'moderate';
      if (pressure < 100 || pressure > 1800) uniformity = 'poor';
      sample.layers.push({ material: film, thickness_nm: thickness, uniformity, defect: 'low', refractive_index: film === 'SiN' ? 2.0 : 1.46 });
      if (power > 400) {
        sample.surface.plasma_damage = stepLevel(sample.surface.plasma_damage, +1);
        notes.push('고전력으로 plasma damage 위험.');
      }
      recordHistory(sample, 'pecvd_deposition', params, notes);
      return notes;
    },
  },

  thermal_oxidation: {
    process_id: 'thermal_oxidation',
    title: 'Thermal Oxidation',
    input_requirements: { substrate: 'Si' },
    parameters: ['temperature', 'time', 'ambient'],
    apply: (sample, params) => {
      const notes = [];
      const { temperature = 950, time = 30, ambient = 'dry_O2' } = params;
      if (sample.base.substrate !== 'Si') {
        notes.push('Si 기판이 아닙니다 — thermal oxidation 미동작.');
        recordHistory(sample, 'thermal_oxidation', params, notes);
        return notes;
      }
      // 단순 Deal-Grove 풍 모델
      const baseRate = ambient === 'wet_O2' ? 10 : 3; // nm/min at 950C
      const tempFactor = Math.pow(2, (temperature - 950) / 50);
      const grown = Math.round(baseRate * time * tempFactor);
      // 기존 SiO2 layer가 있으면 두께 누적, 없으면 새로 추가 (기판 위 첫 layer)
      const existing = sample.layers.find((l) => l.material === 'SiO2' && l.from === 'thermal');
      if (existing) {
        existing.thickness_nm += grown;
      } else {
        // 가장 아래(기판 위)에 추가
        sample.layers.unshift({ material: 'SiO2', thickness_nm: grown, uniformity: 'excellent', defect: 'very_low', refractive_index: 1.46, from: 'thermal' });
      }
      if (temperature > 1050) {
        notes.push('Thermal budget 과도 — 후속 doping 분포 영향.');
      }
      recordHistory(sample, 'thermal_oxidation', params, notes);
      return notes;
    },
  },
};

export const getProcess = (id) => processDefinitions[id];
