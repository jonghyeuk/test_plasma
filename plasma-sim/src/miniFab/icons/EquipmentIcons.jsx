// SVG Equipment Icons — mechanical line drawings, 64x64 viewBox
// Each icon uses currentColor for stroke, accent color per equipment type
import { Fragment } from 'react';

const Frame = ({ children, glow }) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={glow ? { filter: 'drop-shadow(0 0 4px currentColor)' } : undefined}>
    {children}
  </svg>
);

// ---- PROCESS ----

export const WetBenchIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="6" y="20" width="52" height="34" rx="2" />
    <line x1="6" y1="36" x2="58" y2="36" strokeDasharray="2 2" />
    <path d="M10 30 q4 -3 8 0 t8 0 t8 0 t8 0 t8 0" />
    <circle cx="16" cy="44" r="1.2" fill="currentColor" />
    <circle cx="28" cy="48" r="1" fill="currentColor" />
    <circle cx="40" cy="44" r="1.2" fill="currentColor" />
    <circle cx="50" cy="48" r="1" fill="currentColor" />
    <line x1="14" y1="20" x2="14" y2="14" />
    <line x1="50" y1="20" x2="50" y2="14" />
    <rect x="12" y="10" width="4" height="4" />
    <rect x="48" y="10" width="4" height="4" />
  </Frame>
);

export const SputterIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="10" y="10" width="44" height="44" rx="3" />
    <rect x="20" y="14" width="24" height="4" fill="currentColor" opacity="0.4" />
    <line x1="32" y1="20" x2="32" y2="34" strokeDasharray="2 2" />
    <path d="M26 34 l6 6 l6 -6" />
    <rect x="18" y="44" width="28" height="4" />
    <circle cx="14" cy="32" r="1" fill="currentColor" />
    <circle cx="50" cy="32" r="1" fill="currentColor" />
    <text x="44" y="58" fontSize="6" fill="currentColor" stroke="none">Ar+</text>
  </Frame>
);

export const MaskAlignerIcon = ({ glow }) => (
  <Frame glow={glow}>
    <circle cx="32" cy="10" r="4" />
    <line x1="32" y1="14" x2="32" y2="18" />
    <path d="M22 18 L42 18 L38 24 L26 24 Z" opacity="0.5" />
    <rect x="18" y="26" width="28" height="3" />
    <rect x="20" y="29" width="24" height="2" opacity="0.4" fill="currentColor" />
    <line x1="20" y1="32" x2="20" y2="46" strokeDasharray="1 2" />
    <line x1="44" y1="32" x2="44" y2="46" strokeDasharray="1 2" />
    <ellipse cx="32" cy="48" rx="20" ry="3" />
    <line x1="12" y1="48" x2="12" y2="56" />
    <line x1="52" y1="48" x2="52" y2="56" />
  </Frame>
);

export const RIEIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="8" y="10" width="48" height="44" rx="3" />
    <rect x="16" y="14" width="32" height="3" />
    <rect x="16" y="46" width="32" height="3" />
    <ellipse cx="32" cy="32" rx="16" ry="8" opacity="0.4" fill="currentColor" />
    <circle cx="22" cy="28" r="0.8" fill="currentColor" />
    <circle cx="42" cy="30" r="0.8" fill="currentColor" />
    <circle cx="32" cy="34" r="0.8" fill="currentColor" />
    <circle cx="26" cy="36" r="0.8" fill="currentColor" />
    <circle cx="38" cy="26" r="0.8" fill="currentColor" />
    <line x1="14" y1="32" x2="8" y2="32" />
    <line x1="50" y1="32" x2="56" y2="32" />
    <text x="4" y="62" fontSize="6" fill="currentColor" stroke="none">RF</text>
  </Frame>
);

export const SpinCoaterIcon = ({ glow }) => (
  <Frame glow={glow}>
    <ellipse cx="32" cy="32" rx="22" ry="6" />
    <ellipse cx="32" cy="32" rx="22" ry="6" fill="currentColor" opacity="0.15" />
    <ellipse cx="32" cy="32" rx="14" ry="3.5" opacity="0.5" />
    <path d="M14 28 q4 -6 18 -4" strokeDasharray="2 2" />
    <path d="M50 36 q-4 6 -18 4" strokeDasharray="2 2" />
    <path d="M48 28 l3 -2 M51 26 l-1 -3 M51 26 l3 1" />
    <circle cx="32" cy="22" r="2" fill="currentColor" />
    <line x1="32" y1="22" x2="32" y2="32" strokeDasharray="1 2" />
    <line x1="10" y1="42" x2="54" y2="42" />
    <line x1="14" y1="42" x2="14" y2="52" />
    <line x1="50" y1="42" x2="50" y2="52" />
  </Frame>
);

export const HotPlateIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="10" y="32" width="44" height="14" rx="2" />
    <rect x="14" y="36" width="36" height="2" fill="currentColor" opacity="0.5" />
    <path d="M18 28 q2 -4 4 -2 q2 4 4 0 q2 -4 4 -2 q2 4 4 0 q2 -4 4 -2 q2 4 4 0" />
    <path d="M18 22 q2 -4 4 -2 q2 4 4 0 q2 -4 4 -2 q2 4 4 0 q2 -4 4 -2 q2 4 4 0" opacity="0.5" />
    <rect x="46" y="42" width="6" height="3" fill="currentColor" />
    <line x1="10" y1="46" x2="10" y2="52" />
    <line x1="54" y1="46" x2="54" y2="52" />
  </Frame>
);

export const PlasmaCleanerIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="14" y="14" width="36" height="36" rx="3" />
    <rect x="20" y="18" width="24" height="2" />
    <rect x="20" y="44" width="24" height="2" />
    <text x="22" y="32" fontSize="8" fill="currentColor" stroke="none">O₂</text>
    <path d="M36 26 l1.5 1.5 l1.5 -1.5 l-1.5 -1.5 z" fill="currentColor" />
    <path d="M40 32 l1 1 l1 -1 l-1 -1 z" fill="currentColor" />
    <path d="M34 36 l1 1 l1 -1 l-1 -1 z" fill="currentColor" />
    <path d="M44 38 l1.5 1.5 l1.5 -1.5 l-1.5 -1.5 z" fill="currentColor" />
    <line x1="50" y1="32" x2="56" y2="32" />
  </Frame>
);

export const PECVDIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="8" y="10" width="48" height="44" rx="3" />
    <rect x="16" y="14" width="32" height="4" />
    <line x1="20" y1="18" x2="20" y2="22" />
    <line x1="26" y1="18" x2="26" y2="22" />
    <line x1="32" y1="18" x2="32" y2="22" />
    <line x1="38" y1="18" x2="38" y2="22" />
    <line x1="44" y1="18" x2="44" y2="22" />
    <ellipse cx="32" cy="32" rx="14" ry="6" opacity="0.3" fill="currentColor" />
    <rect x="16" y="46" width="32" height="3" />
    <text x="2" y="14" fontSize="6" fill="currentColor" stroke="none">SiH₄</text>
  </Frame>
);

export const ThermalFurnaceIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="4" y="22" width="56" height="20" rx="10" />
    <line x1="10" y1="22" x2="10" y2="42" />
    <line x1="14" y1="22" x2="14" y2="42" />
    <line x1="18" y1="22" x2="18" y2="42" />
    <line x1="46" y1="22" x2="46" y2="42" />
    <line x1="50" y1="22" x2="50" y2="42" />
    <line x1="54" y1="22" x2="54" y2="42" />
    <rect x="22" y="28" width="20" height="8" opacity="0.4" fill="currentColor" />
    <line x1="2" y1="32" x2="6" y2="32" />
    <line x1="58" y1="32" x2="62" y2="32" />
    <text x="24" y="56" fontSize="6" fill="currentColor" stroke="none">950°C</text>
  </Frame>
);

export const IonImplanterIcon = ({ glow }) => (
  <Frame glow={glow}>
    <circle cx="10" cy="32" r="6" />
    <text x="6" y="34" fontSize="6" fill="currentColor" stroke="none">P+</text>
    <line x1="16" y1="32" x2="42" y2="32" />
    <line x1="20" y1="30" x2="22" y2="30" />
    <line x1="26" y1="30" x2="28" y2="30" />
    <line x1="32" y1="30" x2="34" y2="30" />
    <line x1="38" y1="30" x2="40" y2="30" />
    <rect x="22" y="20" width="3" height="6" />
    <rect x="36" y="20" width="3" height="6" />
    <rect x="22" y="38" width="3" height="6" />
    <rect x="36" y="38" width="3" height="6" />
    <rect x="42" y="20" width="14" height="24" rx="2" />
    <rect x="46" y="28" width="6" height="8" fill="currentColor" opacity="0.4" />
  </Frame>
);

export const RTAIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="8" y="14" width="48" height="36" rx="3" />
    <line x1="14" y1="20" x2="50" y2="20" />
    <ellipse cx="18" cy="20" rx="3" ry="2" fill="currentColor" opacity="0.6" />
    <ellipse cx="26" cy="20" rx="3" ry="2" fill="currentColor" opacity="0.6" />
    <ellipse cx="34" cy="20" rx="3" ry="2" fill="currentColor" opacity="0.6" />
    <ellipse cx="42" cy="20" rx="3" ry="2" fill="currentColor" opacity="0.6" />
    <ellipse cx="50" cy="20" rx="3" ry="2" fill="currentColor" opacity="0.6" />
    <path d="M18 24 v4 M26 24 v4 M34 24 v4 M42 24 v4 M50 24 v4" opacity="0.5" />
    <rect x="16" y="40" width="32" height="3" />
    <text x="22" y="56" fontSize="6" fill="currentColor" stroke="none">RTA</text>
  </Frame>
);

// ---- MEASUREMENT ----

export const OpticalMicroscopeIcon = ({ glow }) => (
  <Frame glow={glow}>
    <circle cx="32" cy="12" r="4" />
    <line x1="32" y1="16" x2="32" y2="22" />
    <rect x="26" y="22" width="12" height="14" rx="1" />
    <line x1="22" y1="26" x2="26" y2="26" />
    <line x1="38" y1="26" x2="42" y2="26" />
    <rect x="28" y="36" width="8" height="6" />
    <ellipse cx="32" cy="44" rx="3" ry="1" />
    <rect x="14" y="48" width="36" height="3" />
    <line x1="18" y1="51" x2="18" y2="56" />
    <line x1="46" y1="51" x2="46" y2="56" />
  </Frame>
);

export const ProfilometerIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="6" y="44" width="52" height="4" />
    <line x1="14" y1="48" x2="14" y2="56" />
    <line x1="50" y1="48" x2="50" y2="56" />
    <rect x="20" y="40" width="24" height="4" opacity="0.4" fill="currentColor" />
    <line x1="44" y1="44" x2="48" y2="38" />
    <line x1="48" y1="38" x2="48" y2="14" />
    <rect x="44" y="10" width="8" height="4" />
    <line x1="48" y1="14" x2="48" y2="38" strokeWidth="2" />
    <circle cx="48" cy="40" r="0.8" fill="currentColor" />
    <path d="M20 36 q4 -2 8 0 q4 2 8 0 q4 -2 8 0" opacity="0.6" />
    <line x1="6" y1="20" x2="14" y2="20" />
    <line x1="6" y1="26" x2="14" y2="26" />
    <line x1="6" y1="32" x2="14" y2="32" />
  </Frame>
);

export const FourPointProbeIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="6" y="44" width="52" height="6" />
    <line x1="20" y1="14" x2="20" y2="44" strokeWidth="1.6" />
    <line x1="28" y1="14" x2="28" y2="44" strokeWidth="1.6" />
    <line x1="36" y1="14" x2="36" y2="44" strokeWidth="1.6" />
    <line x1="44" y1="14" x2="44" y2="44" strokeWidth="1.6" />
    <rect x="16" y="8" width="32" height="6" />
    <circle cx="20" cy="44" r="1.2" fill="currentColor" />
    <circle cx="28" cy="44" r="1.2" fill="currentColor" />
    <circle cx="36" cy="44" r="1.2" fill="currentColor" />
    <circle cx="44" cy="44" r="1.2" fill="currentColor" />
    <line x1="6" y1="50" x2="6" y2="56" />
    <line x1="58" y1="50" x2="58" y2="56" />
  </Frame>
);

export const ContactAngleIcon = ({ glow }) => (
  <Frame glow={glow}>
    <line x1="6" y1="42" x2="58" y2="42" strokeWidth="1.6" />
    <path d="M22 42 q4 -16 12 -14 q8 -2 8 14 z" fill="currentColor" opacity="0.3" />
    <path d="M22 42 q4 -16 12 -14 q8 -2 8 14" />
    <path d="M30 42 a8 8 0 0 1 4 -7" strokeDasharray="1 2" />
    <text x="36" y="40" fontSize="6" fill="currentColor" stroke="none">θ</text>
    <line x1="6" y1="50" x2="58" y2="50" />
    <line x1="10" y1="50" x2="10" y2="56" />
    <line x1="54" y1="50" x2="54" y2="56" />
  </Frame>
);

export const LCRMeterIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="6" y="14" width="52" height="36" rx="2" />
    <rect x="10" y="18" width="32" height="14" />
    <text x="12" y="28" fontSize="7" fill="currentColor" stroke="none">345 pF</text>
    <circle cx="50" cy="22" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="50" cy="28" r="2" />
    <rect x="14" y="38" width="6" height="6" fill="currentColor" opacity="0.4" />
    <rect x="24" y="38" width="6" height="6" />
    <rect x="34" y="38" width="6" height="6" />
    <rect x="44" y="38" width="6" height="6" />
    <line x1="14" y1="50" x2="14" y2="54" />
    <line x1="22" y1="50" x2="22" y2="54" />
    <line x1="42" y1="50" x2="42" y2="54" />
    <line x1="50" y1="50" x2="50" y2="54" />
  </Frame>
);

export const SEMIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="26" y="6" width="12" height="8" />
    <line x1="32" y1="14" x2="32" y2="18" />
    <rect x="22" y="18" width="20" height="4" />
    <line x1="32" y1="22" x2="32" y2="26" />
    <rect x="20" y="26" width="24" height="4" />
    <line x1="32" y1="30" x2="32" y2="34" />
    <rect x="24" y="34" width="16" height="4" />
    <line x1="32" y1="38" x2="32" y2="42" />
    <rect x="14" y="42" width="36" height="14" rx="2" />
    <line x1="14" y1="48" x2="50" y2="48" strokeDasharray="1 2" />
    <line x1="6" y1="44" x2="14" y2="44" />
    <rect x="2" y="40" width="6" height="8" fill="currentColor" opacity="0.4" />
  </Frame>
);

export const EllipsometerIcon = ({ glow }) => (
  <Frame glow={glow}>
    <line x1="6" y1="44" x2="58" y2="44" strokeWidth="1.6" />
    <rect x="10" y="44" width="44" height="4" opacity="0.3" fill="currentColor" />
    <line x1="14" y1="14" x2="32" y2="44" />
    <circle cx="14" cy="14" r="3" />
    <line x1="50" y1="14" x2="32" y2="44" />
    <circle cx="50" cy="14" r="3" />
    <path d="M28 38 a6 6 0 0 1 0 -12" strokeDasharray="1 1" />
    <path d="M36 38 a6 6 0 0 0 0 -12" strokeDasharray="1 1" />
    <line x1="6" y1="48" x2="6" y2="56" />
    <line x1="58" y1="48" x2="58" y2="56" />
  </Frame>
);

export const IVAnalyzerIcon = ({ glow }) => (
  <Frame glow={glow}>
    <rect x="6" y="10" width="52" height="36" rx="2" />
    <rect x="10" y="14" width="44" height="22" />
    <line x1="14" y1="32" x2="50" y2="32" />
    <line x1="32" y1="14" x2="32" y2="36" strokeDasharray="1 1" />
    <path d="M14 30 L20 30 L24 28 L28 24 L32 16" />
    <path d="M32 32 L34 32 L36 30 L40 26" opacity="0.7" />
    <circle cx="14" cy="42" r="1.2" fill="currentColor" />
    <circle cx="20" cy="42" r="1.2" fill="currentColor" />
    <circle cx="44" cy="42" r="1.2" fill="currentColor" />
    <circle cx="50" cy="42" r="1.2" fill="currentColor" />
    <line x1="14" y1="46" x2="14" y2="56" />
    <line x1="50" y1="46" x2="50" y2="56" />
  </Frame>
);

// Registry: equipment_id → icon component
export const EquipmentIcon = ({ id, glow }) => {
  const map = {
    wet_bench: WetBenchIcon,
    sputter: SputterIcon,
    mask_aligner: MaskAlignerIcon,
    rie: RIEIcon,
    spin_coater: SpinCoaterIcon,
    hot_plate: HotPlateIcon,
    plasma_cleaner: PlasmaCleanerIcon,
    pecvd: PECVDIcon,
    thermal_oxidation_furnace: ThermalFurnaceIcon,
    ion_implanter: IonImplanterIcon,
    rta_chamber: RTAIcon,
    optical_microscope: OpticalMicroscopeIcon,
    profilometer: ProfilometerIcon,
    four_point_probe: FourPointProbeIcon,
    contact_angle_meter: ContactAngleIcon,
    lcr_meter: LCRMeterIcon,
    sem: SEMIcon,
    ellipsometer: EllipsometerIcon,
    iv_analyzer: IVAnalyzerIcon,
  };
  const Icon = map[id];
  if (!Icon) return <Fragment />;
  return <Icon glow={glow} />;
};
