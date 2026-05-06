// Equipment Definitions
// type: 'process' | 'measurement'
// 새 장비를 추가할 때 이 파일에 정의 객체를 추가하면 된다.
export const equipmentDefinitions = {
  wet_bench: {
    equipment_id: 'wet_bench',
    name: 'Wet Bench',
    type: 'process',
    category: 'cleaning',
    icon: '🧴',
    color: 'from-sky-500 to-blue-600',
    supported_processes: ['cleaning'],
    parameters: [
      { key: 'time', label: 'Cleaning Time', unit: 'sec', min: 10, max: 600, default: 120, type: 'number' },
      { key: 'chemical', label: 'Chemical', type: 'select', options: ['SC1', 'SC2', 'Piranha', 'DI Rinse'], default: 'SC1' },
      { key: 'rinse_quality', label: 'Rinse Quality', type: 'select', options: ['poor', 'moderate', 'good'], default: 'good' },
    ],
  },
  sputter: {
    equipment_id: 'sputter',
    name: 'Sputter',
    type: 'process',
    category: 'deposition',
    icon: '⚙️',
    color: 'from-amber-500 to-orange-600',
    supported_processes: ['metal_deposition'],
    parameters: [
      { key: 'power', label: 'RF Power', unit: 'W', min: 50, max: 500, default: 200, type: 'number' },
      { key: 'pressure', label: 'Pressure', unit: 'mTorr', min: 1, max: 30, default: 5, type: 'number' },
      { key: 'time', label: 'Time', unit: 'sec', min: 10, max: 600, default: 60, type: 'number' },
      { key: 'material', label: 'Target', type: 'select', options: ['Al', 'Cu', 'Ti'], default: 'Al' },
    ],
  },
  mask_aligner: {
    equipment_id: 'mask_aligner',
    name: 'Mask Aligner',
    type: 'process',
    category: 'lithography',
    icon: '💡',
    color: 'from-violet-500 to-purple-600',
    supported_processes: ['lithography'],
    parameters: [
      { key: 'exposure_dose', label: 'Exposure Dose', unit: 'mJ/cm²', min: 20, max: 300, default: 120, type: 'number' },
      { key: 'alignment_quality', label: 'Alignment', type: 'select', options: ['poor', 'moderate', 'good', 'excellent'], default: 'good' },
      { key: 'mask_pattern', label: 'Mask', type: 'select', options: ['line_5um', 'line_2um', 'pad_array'], default: 'line_5um' },
    ],
  },
  rie: {
    equipment_id: 'rie',
    name: 'RIE',
    type: 'process',
    category: 'etch',
    icon: '⚡',
    color: 'from-rose-500 to-red-600',
    supported_processes: ['plasma_etch'],
    parameters: [
      { key: 'rf_power', label: 'RF Power', unit: 'W', min: 50, max: 500, default: 150, type: 'number' },
      { key: 'pressure', label: 'Pressure', unit: 'mTorr', min: 5, max: 100, default: 20, type: 'number' },
      { key: 'gas_ratio', label: 'Cl₂ : BCl₃', type: 'select', options: ['1:1', '2:1', '1:2'], default: '1:1' },
      { key: 'time', label: 'Time', unit: 'sec', min: 10, max: 600, default: 90, type: 'number' },
    ],
  },
  optical_microscope: {
    equipment_id: 'optical_microscope',
    name: 'Optical Microscope',
    type: 'measurement',
    category: 'inspection',
    icon: '🔍',
    color: 'from-cyan-500 to-teal-600',
    supported_processes: ['inspection'],
    parameters: [
      { key: 'magnification', label: 'Magnification', type: 'select', options: ['50x', '200x', '1000x'], default: '200x' },
    ],
  },
  four_point_probe: {
    equipment_id: 'four_point_probe',
    name: '4-Point Probe',
    type: 'measurement',
    category: 'electrical',
    icon: '📐',
    color: 'from-emerald-500 to-green-600',
    supported_processes: ['resistance_measurement'],
    parameters: [
      { key: 'probe_spacing', label: 'Probe Spacing', unit: 'mm', min: 0.5, max: 2, default: 1, type: 'number' },
    ],
  },

  // ---- Phase 3 신규 process 장비 ----
  spin_coater: {
    equipment_id: 'spin_coater',
    name: 'Spin Coater',
    type: 'process',
    category: 'lithography',
    icon: '🌀',
    color: 'from-pink-500 to-fuchsia-600',
    supported_processes: ['pr_coating'],
    parameters: [
      { key: 'rpm', label: 'Spin RPM', unit: 'rpm', min: 500, max: 6000, default: 3000, type: 'number' },
      { key: 'spin_time', label: 'Spin Time', unit: 'sec', min: 10, max: 120, default: 30, type: 'number' },
      { key: 'pr_type', label: 'PR Type', type: 'select', options: ['Positive', 'Negative'], default: 'Positive' },
      { key: 'dispense_quality', label: 'Dispense', type: 'select', options: ['poor', 'moderate', 'good'], default: 'good' },
    ],
  },
  hot_plate: {
    equipment_id: 'hot_plate',
    name: 'Hot Plate',
    type: 'process',
    category: 'thermal',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
    supported_processes: ['soft_bake', 'hard_bake', 'dehydration_bake'],
    parameters: [
      { key: 'temperature', label: 'Temperature', unit: '°C', min: 60, max: 250, default: 110, type: 'number' },
      { key: 'time', label: 'Time', unit: 'sec', min: 30, max: 600, default: 60, type: 'number' },
      { key: 'mode', label: 'Mode', type: 'select', options: ['soft_bake', 'hard_bake', 'dehydration_bake'], default: 'soft_bake' },
    ],
  },
  plasma_cleaner: {
    equipment_id: 'plasma_cleaner',
    name: 'Plasma Cleaner',
    type: 'process',
    category: 'surface',
    icon: '✨',
    color: 'from-indigo-500 to-violet-600',
    supported_processes: ['o2_plasma'],
    parameters: [
      { key: 'rf_power', label: 'RF Power', unit: 'W', min: 30, max: 400, default: 100, type: 'number' },
      { key: 'time', label: 'Time', unit: 'sec', min: 10, max: 300, default: 60, type: 'number' },
      { key: 'gas', label: 'Gas', type: 'select', options: ['O2', 'Ar'], default: 'O2' },
    ],
  },
  pecvd: {
    equipment_id: 'pecvd',
    name: 'PECVD',
    type: 'process',
    category: 'deposition',
    icon: '🧊',
    color: 'from-teal-500 to-cyan-600',
    supported_processes: ['pecvd_deposition'],
    parameters: [
      { key: 'power', label: 'RF Power', unit: 'W', min: 50, max: 500, default: 200, type: 'number' },
      { key: 'pressure', label: 'Pressure', unit: 'mTorr', min: 100, max: 2000, default: 800, type: 'number' },
      { key: 'time', label: 'Time', unit: 'sec', min: 30, max: 1200, default: 300, type: 'number' },
      { key: 'film', label: 'Film', type: 'select', options: ['SiO2', 'SiN'], default: 'SiO2' },
    ],
  },
  thermal_oxidation_furnace: {
    equipment_id: 'thermal_oxidation_furnace',
    name: 'Thermal Oxidation Furnace',
    type: 'process',
    category: 'oxidation',
    icon: '🏮',
    color: 'from-yellow-500 to-amber-600',
    supported_processes: ['thermal_oxidation'],
    parameters: [
      { key: 'temperature', label: 'Temperature', unit: '°C', min: 800, max: 1200, default: 950, type: 'number' },
      { key: 'time', label: 'Time', unit: 'min', min: 5, max: 240, default: 30, type: 'number' },
      { key: 'ambient', label: 'Ambient', type: 'select', options: ['dry_O2', 'wet_O2'], default: 'dry_O2' },
    ],
  },

  // ---- Phase 3 신규 measurement 장비 ----
  profilometer: {
    equipment_id: 'profilometer',
    name: 'Profilometer',
    type: 'measurement',
    category: 'thickness',
    icon: '📏',
    color: 'from-blue-500 to-sky-600',
    supported_processes: ['thickness_measurement'],
    parameters: [
      { key: 'scan_length', label: 'Scan Length', unit: 'µm', min: 50, max: 5000, default: 500, type: 'number' },
      { key: 'tip_force', label: 'Tip Force', unit: 'mg', min: 0.5, max: 30, default: 5, type: 'number' },
    ],
  },
  contact_angle_meter: {
    equipment_id: 'contact_angle_meter',
    name: 'Contact Angle Meter',
    type: 'measurement',
    category: 'surface',
    icon: '💧',
    color: 'from-cyan-500 to-blue-600',
    supported_processes: ['surface_energy_measurement'],
    parameters: [
      { key: 'liquid', label: 'Liquid', type: 'select', options: ['DI Water', 'Glycerol'], default: 'DI Water' },
    ],
  },
  lcr_meter: {
    equipment_id: 'lcr_meter',
    name: 'LCR Meter',
    type: 'measurement',
    category: 'electrical',
    icon: '🔌',
    color: 'from-lime-500 to-green-600',
    supported_processes: ['capacitance_measurement'],
    parameters: [
      { key: 'frequency', label: 'Frequency', unit: 'kHz', min: 1, max: 1000, default: 100, type: 'number' },
      { key: 'electrode_area_mm2', label: 'Electrode Area', unit: 'mm²', min: 0.1, max: 10, default: 1, type: 'number' },
    ],
  },
};

export const listEquipment = () => Object.values(equipmentDefinitions);
export const getEquipment = (id) => equipmentDefinitions[id];
