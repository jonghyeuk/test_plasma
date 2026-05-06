// Sequence Validator
// 자유모드에서 사용자가 짠 process 순서를 검증하고 경고를 반환한다.
// 각 rule은 (steps, idx) → null | { severity, message } 를 반환.

const last = (arr, fn, beforeIdx) => {
  for (let i = beforeIdx - 1; i >= 0; i--) if (fn(arr[i])) return { step: arr[i], idx: i };
  return null;
};

const has = (arr, fn, beforeIdx) => last(arr, fn, beforeIdx) !== null;

// step: { equipment_id, process_id }
const RULES = [
  // 1. 식각 후 패턴 위에 곧바로 증착하면 패턴이 묻혀 사라진다
  (steps, i) => {
    const s = steps[i];
    if (s.process_id !== 'metal_deposition' && s.process_id !== 'pecvd_deposition') return null;
    const lastEtch = last(steps, (x) => x.process_id === 'plasma_etch', i);
    const cleaningBetween = lastEtch && has(steps,
      (x) => x.process_id === 'cleaning' || x.process_id === 'lithography',
      i,
    ) && last(steps, (x) => x.process_id === 'cleaning' || x.process_id === 'lithography', i).idx > lastEtch.idx;
    if (lastEtch && !cleaningBetween) {
      return {
        severity: 'warn',
        message: '직전 식각으로 형성한 패턴 위에 추가 증착이 진행됩니다. 패턴이 묻혀 형상이 둔화/소실될 수 있습니다.',
      };
    }
    return null;
  },

  // 2. PR 코팅/리소그래피 직전에 cleaning 또는 dehydration이 없다 → adhesion 위험
  (steps, i) => {
    const s = steps[i];
    if (s.process_id !== 'pr_coating' && s.process_id !== 'lithography') return null;
    const recentClean = last(steps,
      (x) => x.process_id === 'cleaning' || (x.process_id === 'soft_bake' && x.params?.mode === 'dehydration_bake') || x.process_id === 'o2_plasma',
      i,
    );
    if (!recentClean) {
      return {
        severity: 'warn',
        message: 'Photolithography 직전에 cleaning 또는 dehydration bake가 없습니다. PR adhesion 약화 위험.',
      };
    }
    return null;
  },

  // 3. 식각인데 패턴(PR)이 없다 → 전면 식각
  (steps, i) => {
    const s = steps[i];
    if (s.process_id !== 'plasma_etch') return null;
    const lastLitho = last(steps, (x) => x.process_id === 'lithography', i);
    const lastEtchAfter = lastLitho && last(steps, (x) => x.process_id === 'plasma_etch', i);
    const ok = lastLitho && (!lastEtchAfter || lastEtchAfter.idx < lastLitho.idx);
    if (!ok) {
      return {
        severity: 'warn',
        message: 'Lithography로 PR 패턴을 형성하지 않은 상태에서 plasma etch가 수행됩니다. 전면 식각이 발생합니다.',
      };
    }
    return null;
  },

  // 4. Implant 전 oxide window가 열려 있어야 한다
  (steps, i) => {
    const s = steps[i];
    if (s.process_id !== 'ion_implantation') return null;
    const ox = last(steps, (x) => x.process_id === 'thermal_oxidation' || x.process_id === 'pecvd_deposition', i);
    if (ox) {
      const opened = last(steps, (x) => x.process_id === 'plasma_etch', i);
      if (!opened || opened.idx < ox.idx) {
        return {
          severity: 'warn',
          message: 'Oxide/Nitride 후 식각 단계가 없어 implant가 차단될 수 있습니다 (윈도우 미개방).',
        };
      }
    }
    return null;
  },

  // 5. Ion implant 후 anneal이 없으면 활성화 안됨
  (steps, i) => {
    const s = steps[i];
    if (s.process_id !== 'iv_measurement' && s.process_id !== 'capacitance_measurement') return null;
    const implanted = last(steps, (x) => x.process_id === 'ion_implantation', i);
    if (!implanted) return null;
    const annealed = last(steps, (x) => x.process_id === 'rapid_thermal_anneal', i);
    if (!annealed || annealed.idx < implanted.idx) {
      return {
        severity: 'warn',
        message: 'Implant 이후 RTA가 없습니다. 도펀트가 활성화되지 않아 측정이 비정상일 수 있습니다.',
      };
    }
    return null;
  },

  // 6. 동일 식각/증착의 단순 반복은 비효율
  (steps, i) => {
    const s = steps[i];
    if (i === 0) return null;
    if (s.process_id === steps[i - 1].process_id && (s.process_id === 'plasma_etch' || s.process_id === 'metal_deposition')) {
      return {
        severity: 'info',
        message: '같은 공정이 연속됩니다. 의도가 아닌 경우 통합을 고려하세요.',
      };
    }
    return null;
  },

  // 7. Bake 없이 PR 노광 → solvent 잔류 가능
  (steps, i) => {
    const s = steps[i];
    if (s.process_id !== 'lithography') return null;
    const coat = last(steps, (x) => x.process_id === 'pr_coating', i);
    if (!coat) return null;
    const baked = last(steps, (x) => x.process_id === 'soft_bake', i);
    if (!baked || baked.idx < coat.idx) {
      return {
        severity: 'info',
        message: 'PR 코팅 후 soft bake 없이 노광이 수행됩니다. 용매 잔류 가능.',
      };
    }
    return null;
  },
];

export const validateSequence = (steps) => {
  const issues = [];
  steps.forEach((_, i) => {
    for (const rule of RULES) {
      const r = rule(steps, i);
      if (r) issues.push({ step_index: i, ...r });
    }
  });
  return issues;
};
