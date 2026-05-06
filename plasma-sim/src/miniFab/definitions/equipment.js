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
};

export const listEquipment = () => Object.values(equipmentDefinitions);
export const getEquipment = (id) => equipmentDefinitions[id];
