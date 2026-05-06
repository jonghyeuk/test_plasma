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
};

export const getProcess = (id) => processDefinitions[id];
