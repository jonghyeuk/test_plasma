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

tutorialDefinitions.plasma_surface_flow = [
  { step: 1, message: 'Wet Bench로 표면 오염을 제거합니다.', highlight: 'wet_bench' },
  { step: 2, message: 'O₂ Plasma로 표면 활성화. 100 W / 60 sec 권장. 과도하면 plasma damage 발생.', highlight: 'plasma_cleaner' },
  { step: 3, message: 'Contact Angle Meter로 친수성 변화를 정량 측정합니다.', highlight: 'contact_angle_meter' },
  { step: 4, message: 'Sputter로 Al 박막을 증착합니다.', highlight: 'sputter' },
  { step: 5, message: 'Profilometer로 center-edge 두께 분포를 측정합니다.', highlight: 'profilometer' },
];

tutorialDefinitions.moscap_flow = [
  { step: 1, message: 'Wet Bench 세정 — 산화막 성장 전 RCA-like 세정이 핵심.', highlight: 'wet_bench' },
  { step: 2, message: 'Thermal Furnace에서 Si 표면에 SiO₂를 성장시킵니다. 950°C / 30 min / dry_O₂ 권장.', highlight: 'thermal_oxidation_furnace' },
  { step: 3, message: 'Sputter로 Al 전극을 증착합니다.', highlight: 'sputter' },
  { step: 4, message: 'Mask Aligner로 전극 패턴 형성.', highlight: 'mask_aligner' },
  { step: 5, message: 'RIE로 Al을 식각해 전극을 분리합니다. 절연막에 over-etch 주의.', highlight: 'rie' },
  { step: 6, message: 'LCR Meter로 capacitance 측정 — C = ε₀εr·A/d 관계 확인.', highlight: 'lcr_meter' },
];

export const getTutorial = (id) => tutorialDefinitions[id] || [];
