// Tutorial Scripts (코드와 분리)
export const tutorialDefinitions = {
  metal_pattern_flow: [
    { step: 1, message: 'Wet Bench에서 표면 오염을 제거합니다. SC1, 120초가 표준입니다.', highlight: 'wet_bench' },
    { step: 2, message: 'Sputter로 Al 박막을 증착합니다. 200 W / 5 mTorr / 60 sec → 약 100 nm 목표.', highlight: 'sputter' },
    { step: 3, message: 'Mask Aligner에서 노광합니다. Dose ~120 mJ/cm², alignment good 권장.', highlight: 'mask_aligner' },
    { step: 4, message: 'RIE로 Al을 패턴 식각합니다. Over-etch / Under-etch에 주의.', highlight: 'rie' },
    { step: 5, message: 'Microscope로 패턴/결함을 관찰합니다.', highlight: 'optical_microscope' },
    { step: 6, message: '4-Point Probe로 sheet resistance를 측정하고 진단합니다.', highlight: 'four_point_probe' },
  ],
};

export const getTutorial = (id) => tutorialDefinitions[id] || [];
