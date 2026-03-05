import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ReferenceLine, ScatterChart, Scatter } from 'recharts';

// ============================================================
// OES Emission Line Database
// ============================================================
const OES_DATABASE = {
  Ar: {
    name: 'Argon (Ar)',
    color: '#8B5CF6',
    plasmaColor: '#C4B5FD',
    lines: [
      { wavelength: 696.5, intensity: 0.45, species: 'Ar I', transition: '4p→4s' },
      { wavelength: 706.7, intensity: 0.35, species: 'Ar I', transition: '4p→4s' },
      { wavelength: 738.4, intensity: 0.55, species: 'Ar I', transition: '4p→4s' },
      { wavelength: 750.4, intensity: 0.85, species: 'Ar I', transition: '4p[1/2]→4s[3/2]' },
      { wavelength: 763.5, intensity: 0.95, species: 'Ar I', transition: '4p[3/2]→4s[3/2]' },
      { wavelength: 772.4, intensity: 0.40, species: 'Ar I', transition: '4p→4s' },
      { wavelength: 794.8, intensity: 0.35, species: 'Ar I', transition: '4p→4s' },
      { wavelength: 811.5, intensity: 1.00, species: 'Ar I', transition: '4p[5/2]→4s[3/2]' },
      { wavelength: 826.5, intensity: 0.30, species: 'Ar I', transition: '4p→4s' },
      { wavelength: 842.5, intensity: 0.60, species: 'Ar I', transition: '4p→4s' },
      { wavelength: 852.1, intensity: 0.25, species: 'Ar I', transition: '4p→4s' },
      { wavelength: 912.3, intensity: 0.40, species: 'Ar I', transition: '4p→4s' },
    ]
  },
  N2: {
    name: 'Nitrogen (N₂)',
    color: '#3B82F6',
    plasmaColor: '#93C5FD',
    lines: [
      { wavelength: 315.9, intensity: 0.40, species: 'N₂ SPS', transition: 'C³Πu→B³Πg' },
      { wavelength: 337.1, intensity: 1.00, species: 'N₂ SPS', transition: 'C³Πu(0)→B³Πg(0)' },
      { wavelength: 357.7, intensity: 0.80, species: 'N₂ SPS', transition: 'C³Πu(0)→B³Πg(1)' },
      { wavelength: 380.5, intensity: 0.55, species: 'N₂ SPS', transition: 'C³Πu(0)→B³Πg(2)' },
      { wavelength: 391.4, intensity: 0.65, species: 'N₂⁺ FNS', transition: 'B²Σu⁺→X²Σg⁺' },
      { wavelength: 405.9, intensity: 0.30, species: 'N₂ SPS', transition: 'C³Πu(0)→B³Πg(3)' },
      { wavelength: 427.8, intensity: 0.45, species: 'N₂⁺ FNS', transition: 'B²Σu⁺(0)→X²Σg⁺(1)' },
      { wavelength: 580.4, intensity: 0.25, species: 'N₂ FPS', transition: 'B³Πg→A³Σu⁺' },
      { wavelength: 654.5, intensity: 0.30, species: 'N₂ FPS', transition: 'B³Πg→A³Σu⁺' },
      { wavelength: 746.8, intensity: 0.20, species: 'N I', transition: '3p→3s' },
      { wavelength: 868.0, intensity: 0.15, species: 'N I', transition: '3p→3s' },
    ]
  },
  O2: {
    name: 'Oxygen (O₂)',
    color: '#EF4444',
    plasmaColor: '#FCA5A5',
    lines: [
      { wavelength: 391.2, intensity: 0.15, species: 'O II', transition: '3p→3s' },
      { wavelength: 436.8, intensity: 0.20, species: 'O II', transition: '3p→3s' },
      { wavelength: 533.0, intensity: 0.25, species: 'O I', transition: '3p³P→3s³S' },
      { wavelength: 615.7, intensity: 0.20, species: 'O I', transition: '5p→4d' },
      { wavelength: 700.2, intensity: 0.15, species: 'O I', transition: '3p→3s' },
      { wavelength: 777.4, intensity: 1.00, species: 'O I', transition: '3p⁵P→3s⁵S' },
      { wavelength: 795.0, intensity: 0.15, species: 'O I', transition: '3p→3s' },
      { wavelength: 844.6, intensity: 0.70, species: 'O I', transition: '3p³P→3s³S' },
      { wavelength: 926.6, intensity: 0.10, species: 'O I', transition: '3p→3s' },
    ]
  },
  CF4: {
    name: 'CF₄ (Tetrafluoromethane)',
    color: '#10B981',
    plasmaColor: '#6EE7B7',
    lines: [
      { wavelength: 251.9, intensity: 0.50, species: 'CF₂', transition: 'Ã¹A₁→X̃¹A₁' },
      { wavelength: 259.5, intensity: 0.45, species: 'CF₂', transition: 'Ã→X̃' },
      { wavelength: 271.6, intensity: 0.30, species: 'CF', transition: 'A²Σ⁺→X²Π' },
      { wavelength: 290.0, intensity: 0.20, species: 'CF', transition: 'B²Δ→A²Σ⁺' },
      { wavelength: 316.5, intensity: 0.15, species: 'C I', transition: '3p→3s' },
      { wavelength: 601.4, intensity: 0.25, species: 'F I', transition: '3p→3s' },
      { wavelength: 685.6, intensity: 0.80, species: 'F I', transition: '3p⁴P→3s⁴P' },
      { wavelength: 703.7, intensity: 0.65, species: 'F I', transition: '3p²P→3s²P' },
      { wavelength: 712.8, intensity: 0.40, species: 'F I', transition: '3p→3s' },
      { wavelength: 739.9, intensity: 0.30, species: 'F I', transition: '3p→3s' },
      { wavelength: 775.5, intensity: 0.15, species: 'F I', transition: '3p→3s' },
    ]
  },
  He: {
    name: 'Helium (He)',
    color: '#F59E0B',
    plasmaColor: '#FCD34D',
    lines: [
      { wavelength: 388.9, intensity: 0.35, species: 'He I', transition: '3p³P→2s³S' },
      { wavelength: 447.1, intensity: 0.25, species: 'He I', transition: '4d→2p' },
      { wavelength: 471.3, intensity: 0.15, species: 'He I', transition: '4s→2p' },
      { wavelength: 501.6, intensity: 0.20, species: 'He I', transition: '3p¹P→2s¹S' },
      { wavelength: 587.6, intensity: 1.00, species: 'He I', transition: '3d³D→2p³P' },
      { wavelength: 667.8, intensity: 0.70, species: 'He I', transition: '3d¹D→2p¹P' },
      { wavelength: 706.5, intensity: 0.45, species: 'He I', transition: '3s³S→2p³P' },
      { wavelength: 728.1, intensity: 0.30, species: 'He I', transition: '3s¹S→2p¹P' },
    ]
  }
};

// Generate spectrum data from emission lines
const generateSpectrumData = (gasType, power, noise = true) => {
  const gas = OES_DATABASE[gasType];
  if (!gas) return [];
  const data = [];
  const powerFactor = power / 300;
  for (let wl = 200; wl <= 950; wl += 1) {
    let intensity = 0;
    gas.lines.forEach(line => {
      const width = 2.5 + Math.random() * 0.5;
      const dist = Math.abs(wl - line.wavelength);
      if (dist < width * 5) {
        intensity += line.intensity * powerFactor * Math.exp(-0.5 * Math.pow(dist / width, 2));
      }
    });
    if (noise) {
      intensity += (Math.random() - 0.5) * 0.02 * powerFactor;
    }
    intensity = Math.max(0, intensity);
    data.push({ wavelength: wl, intensity: parseFloat(intensity.toFixed(4)) });
  }
  return data;
};

// Normalize spectrum data
const normalizeSpectrum = (data) => {
  const maxIntensity = Math.max(...data.map(d => d.intensity));
  if (maxIntensity === 0) return data;
  return data.map(d => ({
    wavelength: d.wavelength,
    intensity: parseFloat((d.intensity / maxIntensity).toFixed(4)),
    rawIntensity: d.intensity
  }));
};

// Wavelength to RGB color
const wavelengthToColor = (wavelength) => {
  let r = 0, g = 0, b = 0;
  if (wavelength >= 200 && wavelength < 380) { r = 100; g = 0; b = 180; }
  else if (wavelength >= 380 && wavelength < 440) { r = -(wavelength - 440) / 60 * 255; g = 0; b = 255; }
  else if (wavelength >= 440 && wavelength < 490) { r = 0; g = (wavelength - 440) / 50 * 255; b = 255; }
  else if (wavelength >= 490 && wavelength < 510) { r = 0; g = 255; b = -(wavelength - 510) / 20 * 255; }
  else if (wavelength >= 510 && wavelength < 580) { r = (wavelength - 510) / 70 * 255; g = 255; b = 0; }
  else if (wavelength >= 580 && wavelength < 645) { r = 255; g = -(wavelength - 645) / 65 * 255; b = 0; }
  else if (wavelength >= 645 && wavelength <= 950) { r = 255; g = 0; b = 0; }
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
};


// ============================================================
// SVG Components
// ============================================================

// OES System Schematic SVG
const OESSystemDiagram = () => (
  <svg width="100%" viewBox="0 0 800 400" className="max-w-3xl mx-auto">
    <defs>
      <linearGradient id="chamberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#1F2937" />
      </linearGradient>
      <linearGradient id="plasmaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#C084FC" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.6" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="fiberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>

    {/* Chamber */}
    <rect x="200" y="60" width="250" height="280" rx="15" fill="url(#chamberGrad)" stroke="#6B7280" strokeWidth="3"/>
    <text x="325" y="45" textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">플라즈마 챔버</text>

    {/* Plasma glow */}
    <ellipse cx="325" cy="200" rx="90" ry="100" fill="url(#plasmaGrad)" filter="url(#glow)">
      <animate attributeName="rx" values="85;95;85" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="ry" values="95;105;95" dur="2.5s" repeatCount="indefinite"/>
    </ellipse>

    {/* Electrodes */}
    <rect x="215" y="80" width="15" height="240" fill="#EF4444" rx="3"/>
    <rect x="420" y="80" width="15" height="240" fill="#3B82F6" rx="3"/>
    <text x="210" y="340" fill="#EF4444" fontSize="11" fontWeight="bold">RF전극</text>
    <text x="415" y="340" fill="#3B82F6" fontSize="11" fontWeight="bold">접지전극</text>

    {/* Viewport / Window */}
    <circle cx="450" cy="200" r="20" fill="#60A5FA" fillOpacity="0.3" stroke="#93C5FD" strokeWidth="2"/>
    <text x="455" y="175" fill="#93C5FD" fontSize="10">뷰포트</text>

    {/* Light path arrows */}
    <line x1="470" y1="200" x2="530" y2="200" stroke="#FBBF24" strokeWidth="3" strokeDasharray="5,3">
      <animate attributeName="strokeDashoffset" values="0;-16" dur="1s" repeatCount="indefinite"/>
    </line>
    <text x="480" y="190" fill="#FBBF24" fontSize="10">광신호</text>

    {/* Collection Lens */}
    <ellipse cx="545" cy="200" rx="10" ry="30" fill="#60A5FA" fillOpacity="0.4" stroke="#93C5FD" strokeWidth="2"/>
    <text x="530" y="245" fill="#93C5FD" fontSize="10">집광렌즈</text>

    {/* Optical Fiber */}
    <path d="M 555 200 Q 600 200, 620 170 Q 640 140, 660 140" fill="none" stroke="url(#fiberGrad)" strokeWidth="4"/>
    <text x="580" y="160" fill="#F59E0B" fontSize="10">광섬유</text>

    {/* Spectrometer */}
    <rect x="650" y="110" width="120" height="80" rx="8" fill="#1E40AF" stroke="#3B82F6" strokeWidth="2"/>
    <text x="710" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">분광기</text>
    <text x="710" y="165" textAnchor="middle" fill="#93C5FD" fontSize="10">(Spectrometer)</text>

    {/* CCD/Detector */}
    <rect x="660" y="210" width="100" height="50" rx="5" fill="#064E3B" stroke="#10B981" strokeWidth="2"/>
    <text x="710" y="235" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="bold">CCD 검출기</text>
    <line x1="710" y1="190" x2="710" y2="210" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    {/* Computer */}
    <rect x="660" y="280" width="100" height="60" rx="5" fill="#312E81" stroke="#6366F1" strokeWidth="2"/>
    <text x="710" y="305" textAnchor="middle" fill="#A5B4FC" fontSize="11" fontWeight="bold">PC</text>
    <text x="710" y="320" textAnchor="middle" fill="#818CF8" fontSize="9">데이터 분석</text>
    <line x1="710" y1="260" x2="710" y2="280" stroke="#6366F1" strokeWidth="2"/>

    {/* Gas inlet */}
    <line x1="325" y1="20" x2="325" y2="60" stroke="#10B981" strokeWidth="3"/>
    <text x="340" y="30" fill="#10B981" fontSize="11">가스 유입</text>
    <polygon points="320,55 330,55 325,65" fill="#10B981"/>

    {/* Pump */}
    <line x1="325" y1="340" x2="325" y2="380" stroke="#6B7280" strokeWidth="3"/>
    <text x="340" y="375" fill="#6B7280" fontSize="11">진공 펌프</text>
    <polygon points="320,375 330,375 325,385" fill="#6B7280"/>

    {/* RF Power */}
    <rect x="30" y="170" width="120" height="60" rx="8" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2"/>
    <text x="90" y="198" textAnchor="middle" fill="#FCA5A5" fontSize="12" fontWeight="bold">RF 전원</text>
    <text x="90" y="215" textAnchor="middle" fill="#F87171" fontSize="10">13.56 MHz</text>
    <line x1="150" y1="200" x2="215" y2="200" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2"/>
  </svg>
);

// Normalization Concept Diagram
const NormalizationDiagram = () => (
  <svg width="100%" viewBox="0 0 700 350" className="max-w-2xl mx-auto">
    <defs>
      <linearGradient id="rawGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4"/>
      </linearGradient>
      <linearGradient id="normGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.1"/>
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.4"/>
      </linearGradient>
    </defs>

    {/* Title */}
    <text x="350" y="25" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="bold">Normalization (정규화) 개념</text>

    {/* Raw Data Graph */}
    <rect x="30" y="45" width="280" height="140" rx="5" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="1"/>
    <text x="170" y="65" textAnchor="middle" fill="#3B82F6" fontSize="13" fontWeight="bold">Raw Data (원본 스펙트럼)</text>

    {/* Raw axes */}
    <line x1="60" y1="170" x2="290" y2="170" stroke="#6B7280" strokeWidth="1.5"/>
    <line x1="60" y1="80" x2="60" y2="170" stroke="#6B7280" strokeWidth="1.5"/>
    <text x="175" y="185" textAnchor="middle" fill="#6B7280" fontSize="10">파장 (nm)</text>
    <text x="45" y="125" textAnchor="middle" fill="#6B7280" fontSize="10" transform="rotate(-90,45,125)">세기 (a.u.)</text>

    {/* Raw peaks - different heights representing varying conditions */}
    <path d="M80,165 Q95,165 100,140 Q105,165 115,165 Q125,165 130,100 Q135,165 145,165 Q155,165 160,155 Q165,165 175,165 Q195,165 200,85 Q205,165 215,165 Q230,165 240,120 Q250,165 260,165 Q270,165 275,145 Q280,165 285,165"
      fill="none" stroke="#3B82F6" strokeWidth="2"/>
    <text x="200" y="82" fill="#EF4444" fontSize="9" fontWeight="bold">최대값: 4500</text>

    {/* Arrow */}
    <text x="350" y="120" textAnchor="middle" fill="#F59E0B" fontSize="30" fontWeight="bold">→</text>
    <text x="350" y="145" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="bold">I/I_max</text>

    {/* Normalized Graph */}
    <rect x="400" y="45" width="280" height="140" rx="5" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="1"/>
    <text x="540" y="65" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="bold">Normalized (정규화 스펙트럼)</text>

    {/* Norm axes */}
    <line x1="430" y1="170" x2="660" y2="170" stroke="#6B7280" strokeWidth="1.5"/>
    <line x1="430" y1="80" x2="430" y2="170" stroke="#6B7280" strokeWidth="1.5"/>
    <text x="545" y="185" textAnchor="middle" fill="#6B7280" fontSize="10">파장 (nm)</text>
    <text x="415" y="125" textAnchor="middle" fill="#6B7280" fontSize="10" transform="rotate(-90,415,125)">세기 (0~1)</text>

    {/* Y-axis labels */}
    <text x="425" y="85" fill="#6B7280" fontSize="9" textAnchor="end">1.0</text>
    <text x="425" y="130" fill="#6B7280" fontSize="9" textAnchor="end">0.5</text>
    <text x="425" y="172" fill="#6B7280" fontSize="9" textAnchor="end">0</text>
    <line x1="427" y1="82" x2="660" y2="82" stroke="#D1D5DB" strokeWidth="0.5" strokeDasharray="3,3"/>

    {/* Normalized peaks */}
    <path d="M450,165 Q465,165 470,148 Q475,165 485,165 Q495,165 500,115 Q505,165 515,165 Q525,165 530,158 Q535,165 545,165 Q565,165 570,82 Q575,165 585,165 Q600,165 610,130 Q620,165 630,165 Q640,165 645,150 Q650,165 655,165"
      fill="none" stroke="#10B981" strokeWidth="2"/>
    <text x="570" y="78" fill="#10B981" fontSize="9" fontWeight="bold">1.0</text>

    {/* Benefits box */}
    <rect x="30" y="210" width="640" height="120" rx="8" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5"/>
    <text x="350" y="235" textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="bold">정규화의 장점</text>
    <text x="60" y="260" fill="#78350F" fontSize="12">1. 서로 다른 조건(파워, 가스유량 등)에서 측정한 데이터를 비교할 수 있음</text>
    <text x="60" y="280" fill="#78350F" fontSize="12">2. 상대적인 피크 비율(peak ratio)을 통해 플라즈마 상태 진단 가능</text>
    <text x="60" y="300" fill="#78350F" fontSize="12">3. 장비 간 차이(검출기 감도, 광학계 투과율)를 보정하여 객관적 비교 가능</text>
    <text x="60" y="320" fill="#78350F" fontSize="12">4. Actinometry 기법에서 활성종 밀도 정량 분석의 기초</text>
  </svg>
);


// ============================================================
// Plasma Chamber SVG for Simulator
// ============================================================
const PlasmaChamberSVG = ({ isPlasmaOn, gasType, power }) => {
  const gas = OES_DATABASE[gasType];
  const glowColor = gas ? gas.plasmaColor : '#C4B5FD';
  const glowOpacity = isPlasmaOn ? Math.min(0.3 + power / 500, 0.9) : 0;

  return (
    <svg width="100%" viewBox="0 0 400 350" className="max-w-md mx-auto">
      <defs>
        <radialGradient id="plasmaGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} stopOpacity={glowOpacity}/>
          <stop offset="70%" stopColor={glowColor} stopOpacity={glowOpacity * 0.5}/>
          <stop offset="100%" stopColor={glowColor} stopOpacity="0"/>
        </radialGradient>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Chamber body */}
      <rect x="80" y="30" width="240" height="260" rx="20" fill="#1F2937" stroke="#4B5563" strokeWidth="3"/>
      <rect x="95" y="45" width="210" height="230" rx="12" fill="#111827" stroke="#374151" strokeWidth="1"/>

      {/* Chamber label */}
      <text x="200" y="22" textAnchor="middle" fill="#9CA3AF" fontSize="13" fontWeight="bold">Plasma Chamber</text>

      {/* Electrodes */}
      <rect x="100" y="55" width="12" height="210" fill="#DC2626" rx="3"/>
      <rect x="288" y="55" width="12" height="210" fill="#2563EB" rx="3"/>

      {/* Plasma glow */}
      {isPlasmaOn && (
        <g>
          <ellipse cx="200" cy="160" rx="75" ry="90" fill="url(#plasmaGlow2)" filter="url(#glow2)">
            <animate attributeName="rx" values="70;80;70" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="ry" values="85;95;85" dur="2.5s" repeatCount="indefinite"/>
          </ellipse>
          {/* Plasma particles */}
          {Array.from({length: 15}, (_, i) => (
            <circle key={i} r={1.5 + Math.random() * 2}
              fill={glowColor} opacity={0.6 + Math.random() * 0.4}
              filter="url(#glow2)">
              <animate attributeName="cx"
                values={`${140 + Math.random() * 120};${150 + Math.random() * 100};${140 + Math.random() * 120}`}
                dur={`${1.5 + Math.random() * 2}s`} repeatCount="indefinite"/>
              <animate attributeName="cy"
                values={`${80 + Math.random() * 160};${90 + Math.random() * 140};${80 + Math.random() * 160}`}
                dur={`${1.8 + Math.random() * 2}s`} repeatCount="indefinite"/>
            </circle>
          ))}
        </g>
      )}

      {/* OES viewport */}
      <circle cx="310" cy="160" r="15" fill={isPlasmaOn ? glowColor : '#374151'} fillOpacity={isPlasmaOn ? 0.5 : 1} stroke="#6B7280" strokeWidth="2"/>
      <text x="340" y="155" fill="#9CA3AF" fontSize="9">OES</text>
      <text x="340" y="167" fill="#9CA3AF" fontSize="9">뷰포트</text>

      {/* Light path */}
      {isPlasmaOn && (
        <line x1="325" y1="160" x2="395" y2="160" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4,3" opacity="0.8">
          <animate attributeName="strokeDashoffset" values="0;-14" dur="0.8s" repeatCount="indefinite"/>
        </line>
      )}

      {/* Gas inlet */}
      <rect x="185" y="0" width="30" height="35" fill="#374151" stroke="#6B7280" strokeWidth="1" rx="3"/>
      <text x="200" y="12" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold">{gasType}</text>
      <polygon points="195,30 205,30 200,42" fill="#10B981" opacity={isPlasmaOn ? 1 : 0.3}/>

      {/* Pump outlet */}
      <rect x="185" y="288" width="30" height="30" fill="#374151" stroke="#6B7280" strokeWidth="1" rx="3"/>
      <text x="200" y="308" textAnchor="middle" fill="#6B7280" fontSize="8">PUMP</text>

      {/* Status indicator */}
      <circle cx="105" cy="310" r="6" fill={isPlasmaOn ? '#10B981' : '#EF4444'}/>
      <text x="118" y="314" fill={isPlasmaOn ? '#10B981' : '#EF4444'} fontSize="11" fontWeight="bold">
        {isPlasmaOn ? 'PLASMA ON' : 'PLASMA OFF'}
      </text>

      {/* Power display */}
      <text x="280" y="314" fill="#F59E0B" fontSize="11" fontWeight="bold">
        {power}W
      </text>
    </svg>
  );
};


// ============================================================
// Electron Shell Transition Animation Component
// ============================================================
const ElectronTransitionAnimation = () => {
  const [animPhase, setAnimPhase] = useState('ground'); // ground, exciting, excited, emitting, ground2
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [selectedElement, setSelectedElement] = useState('Ar');

  const elements = {
    Ar: {
      name: 'Argon (Ar)',
      shells: [
        { n: 1, label: '1s²', electrons: 2, radius: 40, sublabel: 'K (n=1)', eV: -3206 },
        { n: 2, label: '2s²2p⁶', electrons: 8, radius: 65, sublabel: 'L (n=2)', eV: -326 },
        { n: 3, label: '3s²3p⁶', electrons: 8, radius: 90, sublabel: 'M (n=3)', eV: -29.2 },
      ],
      // Ar: 전자가 3p → 4p로 여기, 그 다음 4p → 4s로 전이하며 발광
      excitedShell: { n: 4, label: '4p', radius: 135, sublabel: '4p (excited)', eV: -1.59 },
      landingShell: { n: 4, label: '4s', radius: 120, sublabel: '4s', eV: -3.12 },
      emissionWl: '811.5',
      emissionColor: '#EF4444',
      emissionRGB: 'rgb(255,30,30)',
      transitionFrom: '4p[5/2]',
      transitionTo: '4s[3/2]',
      deltaE: '1.53 eV',
      transition: '4p[5/2] → 4s[3/2]',
    },
    He: {
      name: 'Helium (He)',
      shells: [
        { n: 1, label: '1s²', electrons: 2, radius: 40, sublabel: 'K (n=1)', eV: -24.6 },
      ],
      excitedShell: { n: 3, label: '3d', radius: 110, sublabel: '3d (excited)', eV: -1.51 },
      landingShell: { n: 2, label: '2p', radius: 75, sublabel: '2p', eV: -3.62 },
      emissionWl: '587.6',
      emissionColor: '#F59E0B',
      emissionRGB: 'rgb(230,200,0)',
      transitionFrom: '3d³D',
      transitionTo: '2p³P',
      deltaE: '2.11 eV',
      transition: '3d³D → 2p³P',
    },
    O: {
      name: 'Oxygen (O)',
      shells: [
        { n: 1, label: '1s²', electrons: 2, radius: 40, sublabel: 'K (n=1)', eV: -538 },
        { n: 2, label: '2s²2p⁴', electrons: 6, radius: 70, sublabel: 'L (n=2)', eV: -13.6 },
      ],
      excitedShell: { n: 3, label: '3p', radius: 110, sublabel: '3p (excited)', eV: -4.19 },
      landingShell: { n: 3, label: '3s', radius: 90, sublabel: '3s', eV: -5.78 },
      emissionWl: '777.4',
      emissionColor: '#EF4444',
      emissionRGB: 'rgb(255,30,30)',
      transitionFrom: '3p⁵P',
      transitionTo: '3s⁵S',
      deltaE: '1.59 eV',
      transition: '3p⁵P → 3s⁵S',
    },
  };

  const elem = elements[selectedElement];

  useEffect(() => {
    if (!isAutoPlay) return;
    const sequence = ['ground', 'exciting', 'excited', 'emitting', 'ground2'];
    const durations = [800, 1200, 1000, 1800, 1200];
    let step = 0;
    setAnimPhase('ground');

    const advance = () => {
      step++;
      if (step >= sequence.length) step = 0;
      setAnimPhase(sequence[step]);
    };

    let timeout;
    const run = () => {
      timeout = setTimeout(() => {
        advance();
        run();
      }, durations[step]);
    };
    run();

    return () => clearTimeout(timeout);
  }, [isAutoPlay, selectedElement]);

  const showExcitedShell = animPhase === 'exciting' || animPhase === 'excited' || animPhase === 'emitting';
  const showLandingShell = animPhase === 'emitting' || animPhase === 'ground2';
  const electronMovingUp = animPhase === 'exciting';
  const electronMovingDown = animPhase === 'emitting';
  const showPhoton = animPhase === 'emitting' || animPhase === 'ground2';

  // Energy diagram positions
  const edX = 530; // center x of energy diagram
  const edTop = 80;
  const edBottom = 360;
  const edRange = edBottom - edTop;

  // Map shells to Y positions on energy diagram (higher energy = higher position)
  const shellEnergyY = (shellIndex) => edBottom - shellIndex * 55;
  const excitedEnergyY = edBottom - elem.shells.length * 55 - 25;
  const landingEnergyY = edBottom - elem.shells.length * 55 + 20;

  return (
    <div className="space-y-4">
      {/* Element selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-bold text-gray-700">원소 선택:</span>
        {Object.entries(elements).map(([key, el]) => (
          <button key={key} onClick={() => { setSelectedElement(key); setAnimPhase('ground'); setIsAutoPlay(false); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${selectedElement === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {el.name}
          </button>
        ))}
      </div>

      {/* Animation */}
      <div className="bg-gray-900 rounded-xl p-4 relative overflow-hidden">
        <svg width="100%" viewBox="0 0 700 420" className="max-w-3xl mx-auto">
          <defs>
            <filter id="photonGlow">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="shellGlow">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <marker id="arrowDown" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#F59E0B"/>
            </marker>
            <marker id="arrowUp" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#EF4444"/>
            </marker>
          </defs>

          {/* ===== LEFT SIDE: Orbital View ===== */}
          <text x="180" y="25" textAnchor="middle" fill="#D1D5DB" fontSize="13" fontWeight="bold">궤도 모형 (Orbital View)</text>

          {/* Nucleus */}
          <circle cx="180" cy="210" r="18" fill="#F59E0B" stroke="#FBBF24" strokeWidth="2" filter="url(#shellGlow)"/>
          <text x="180" y="215" textAnchor="middle" fill="#1F2937" fontSize="12" fontWeight="bold">{selectedElement}</text>

          {/* Ground state shells */}
          {elem.shells.map((shell, i) => (
            <g key={i}>
              <circle cx="180" cy="210" r={shell.radius} fill="none" stroke="#4B5563" strokeWidth="1" strokeDasharray="4,4" opacity="0.6"/>
              <text x={180 - shell.radius - 3} y="205" textAnchor="end" fill="#9CA3AF" fontSize="8">{shell.sublabel}</text>
              {/* Electrons on shell */}
              {Array.from({length: Math.min(shell.electrons, 8)}, (_, j) => {
                const angle = (j / Math.min(shell.electrons, 8)) * 2 * Math.PI - Math.PI / 2;
                const isLastShellLastElectron = i === elem.shells.length - 1 && j === Math.min(shell.electrons, 8) - 1;
                const shouldHide = isLastShellLastElectron && (animPhase === 'excited' || animPhase === 'emitting');
                return (
                  <circle key={j} cx={180 + shell.radius * Math.cos(angle)} cy={210 + shell.radius * Math.sin(angle)}
                    r="5" fill={shouldHide ? 'transparent' : '#3B82F6'} stroke={shouldHide ? 'transparent' : '#60A5FA'} strokeWidth="1"
                    opacity={shouldHide ? 0 : 0.9}>
                    {!shouldHide && <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>}
                  </circle>
                );
              })}
            </g>
          ))}

          {/* Landing shell (where electron falls TO) */}
          {showLandingShell && (
            <g>
              <circle cx="180" cy="210" r={elem.landingShell.radius} fill="none"
                stroke="#10B981" strokeWidth="2" strokeDasharray="6,3" opacity="0.8">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite"/>
              </circle>
              <text x={180 + elem.landingShell.radius + 3} y="225" fill="#10B981" fontSize="9" fontWeight="bold">
                ← {elem.landingShell.sublabel} (도착)
              </text>
            </g>
          )}

          {/* Excited shell (appears during excitation) */}
          {showExcitedShell && (
            <g>
              <circle cx="180" cy="210" r={elem.excitedShell.radius} fill="none"
                stroke={elem.emissionColor} strokeWidth="1.5" strokeDasharray="6,3" opacity="0.7">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <text x={180 + elem.excitedShell.radius + 3} y="205" fill={elem.emissionColor} fontSize="9" fontWeight="bold">
                {elem.excitedShell.sublabel} {electronMovingUp ? '(여기 중↑)' : animPhase === 'emitting' ? '(출발)' : ''}
              </text>
            </g>
          )}

          {/* Electron moving UP (excitation) */}
          {electronMovingUp && (
            <circle r="6" fill="#FBBF24" filter="url(#photonGlow)">
              <animate attributeName="cx" values={`${180 + elem.shells[elem.shells.length-1].radius};${180 + elem.excitedShell.radius}`} dur="1s" fill="freeze"/>
              <animate attributeName="cy" values="210;210" dur="1s"/>
            </circle>
          )}

          {/* Electron sitting on excited shell */}
          {animPhase === 'excited' && (
            <g>
              <circle cx={180 + elem.excitedShell.radius} cy="210" r="6" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="0.8s" repeatCount="indefinite"/>
              </circle>
              <text x={180 + elem.excitedShell.radius} y="195" textAnchor="middle" fill="#FBBF24" fontSize="8" fontWeight="bold">불안정!</text>
            </g>
          )}

          {/* Electron moving DOWN with transition label */}
          {electronMovingDown && (
            <g>
              <circle r="7" fill="#3B82F6" stroke="#93C5FD" strokeWidth="2" filter="url(#shellGlow)">
                <animate attributeName="cx" values={`${180 + elem.excitedShell.radius};${180 + elem.landingShell.radius}`} dur="1.2s" fill="freeze"/>
                <animate attributeName="cy" values="210;210" dur="1.2s"/>
              </circle>
              {/* Curved arrow showing transition direction on orbital */}
              <path d={`M ${180 + elem.excitedShell.radius - 10} 195 Q ${180 + (elem.excitedShell.radius + elem.landingShell.radius)/2} 180, ${180 + elem.landingShell.radius + 10} 195`}
                fill="none" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowDown)" opacity="0">
                <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze"/>
              </path>
              {/* Transition label on orbital */}
              <text x={180 + (elem.excitedShell.radius + elem.landingShell.radius)/2} y="175"
                textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold" opacity="0">
                {elem.transitionFrom} → {elem.transitionTo}
                <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze"/>
              </text>
            </g>
          )}

          {/* Show transition label after emission too */}
          {animPhase === 'ground2' && (
            <g>
              <text x={180 + (elem.excitedShell.radius + elem.landingShell.radius)/2} y="175"
                textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">
                {elem.transitionFrom} → {elem.transitionTo}
              </text>
            </g>
          )}

          {/* Photon emission (wavy line going outward) */}
          {showPhoton && (
            <g filter="url(#photonGlow)">
              {/* Wavy photon */}
              <path fill="none" stroke={elem.emissionColor} strokeWidth="3" opacity="0">
                <animate attributeName="opacity" values="0;1;1;0.8" dur="1.5s" fill="freeze"/>
                <animate attributeName="d"
                  values="M 180 260 Q 190 248, 200 260 Q 210 272, 220 260 Q 230 248, 240 260 Q 250 272, 260 260;M 200 280 Q 215 262, 230 280 Q 245 298, 260 280 Q 275 262, 290 280 Q 305 298, 320 280 Q 335 262, 350 280"
                  dur="1.5s" fill="freeze"/>
              </path>
              {/* Wavelength + energy label */}
              <g opacity="0">
                <animate attributeName="opacity" values="0;0;1" dur="1s" fill="freeze"/>
                <rect x="260" y="255" width="105" height="50" rx="6" fill="#1F2937" stroke={elem.emissionColor} strokeWidth="1.5"/>
                <text x="312" y="273" textAnchor="middle" fill={elem.emissionColor} fontSize="13" fontWeight="bold">
                  λ = {elem.emissionWl} nm
                </text>
                <text x="312" y="290" textAnchor="middle" fill="#D1D5DB" fontSize="10">
                  ΔE = {elem.deltaE}
                </text>
                <text x="312" y="302" textAnchor="middle" fill="#9CA3AF" fontSize="8">
                  (= hc/λ)
                </text>
              </g>
            </g>
          )}

          {/* Incoming electron (cause of excitation) */}
          {electronMovingUp && (
            <g>
              <circle r="4" fill="#EF4444">
                <animate attributeName="cx" values="30;160" dur="0.8s" fill="freeze"/>
                <animate attributeName="cy" values="130;200" dur="0.8s" fill="freeze"/>
              </circle>
              <text x="35" y="120" fill="#FCA5A5" fontSize="10" fontWeight="bold">고에너지 전자 e⁻ 충돌!</text>
            </g>
          )}

          {/* ===== DIVIDER ===== */}
          <line x1="390" y1="40" x2="390" y2="380" stroke="#374151" strokeWidth="1" strokeDasharray="4,4"/>

          {/* ===== RIGHT SIDE: Energy Level Diagram ===== */}
          <text x={edX + 40} y="25" textAnchor="middle" fill="#D1D5DB" fontSize="13" fontWeight="bold">에너지 준위도</text>

          {/* Energy axis */}
          <line x1={edX - 50} y1={edTop} x2={edX - 50} y2={edBottom} stroke="#4B5563" strokeWidth="1.5"/>
          <polygon points={`${edX-55},${edTop+10} ${edX-45},${edTop+10} ${edX-50},${edTop}`} fill="#9CA3AF"/>
          <text x={edX - 55} y={edTop - 5} textAnchor="middle" fill="#9CA3AF" fontSize="9">E (eV)</text>

          {/* Ground state energy levels */}
          {elem.shells.map((shell, i) => {
            const y = shellEnergyY(i);
            return (
              <g key={i}>
                <line x1={edX - 30} y1={y} x2={edX + 80} y2={y} stroke="#6B7280" strokeWidth="2"/>
                <text x={edX + 85} y={y + 4} fill="#9CA3AF" fontSize="9">{shell.label}</text>
                <text x={edX - 35} y={y + 4} textAnchor="end" fill="#6B7280" fontSize="8">{shell.eV}</text>
              </g>
            );
          })}

          {/* Landing shell energy level (where electron falls to) */}
          {(showExcitedShell || showLandingShell) && (
            <g>
              <line x1={edX - 30} y1={landingEnergyY} x2={edX + 80} y2={landingEnergyY}
                stroke="#10B981" strokeWidth="2.5"/>
              <text x={edX + 85} y={landingEnergyY + 4} fill="#10B981" fontSize="9" fontWeight="bold">
                {elem.landingShell.label}
              </text>
              <text x={edX - 35} y={landingEnergyY + 4} textAnchor="end" fill="#10B981" fontSize="8">
                {elem.landingShell.eV}
              </text>
              {showLandingShell && (
                <text x={edX + 25} y={landingEnergyY - 6} textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold">
                  도착 ↓
                </text>
              )}
            </g>
          )}

          {/* Excited shell energy level */}
          {showExcitedShell && (
            <g>
              <line x1={edX - 30} y1={excitedEnergyY} x2={edX + 80} y2={excitedEnergyY}
                stroke={elem.emissionColor} strokeWidth="2.5" strokeDasharray="6,3"/>
              <text x={edX + 85} y={excitedEnergyY + 4} fill={elem.emissionColor} fontSize="9" fontWeight="bold">
                {elem.excitedShell.label}
              </text>
              <text x={edX - 35} y={excitedEnergyY + 4} textAnchor="end" fill={elem.emissionColor} fontSize="8">
                {elem.excitedShell.eV}
              </text>
            </g>
          )}

          {/* Excitation arrow (UP) on energy diagram */}
          {electronMovingUp && (
            <g>
              <line x1={edX} y1={shellEnergyY(elem.shells.length - 1) - 5}
                x2={edX} y2={excitedEnergyY + 8}
                stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrowUp)">
                <animate attributeName="y2" values={`${shellEnergyY(elem.shells.length - 1) - 5};${excitedEnergyY + 8}`} dur="1s" fill="freeze"/>
              </line>
              <text x={edX + 10} y={(shellEnergyY(elem.shells.length - 1) + excitedEnergyY) / 2} fill="#FCA5A5" fontSize="9" fontWeight="bold">
                여기 ↑
              </text>
            </g>
          )}

          {/* Electron dot on energy diagram */}
          {animPhase === 'excited' && (
            <circle cx={edX + 25} cy={excitedEnergyY} r="5" fill="#FBBF24">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite"/>
            </circle>
          )}

          {/* Transition arrow (DOWN) on energy diagram with photon wave */}
          {(electronMovingDown || animPhase === 'ground2') && (
            <g>
              {/* Down arrow */}
              <line x1={edX + 25} y1={excitedEnergyY + 5} x2={edX + 25} y2={landingEnergyY - 5}
                stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowDown)"/>

              {/* Transition labels */}
              <text x={edX + 38} y={excitedEnergyY + 15} fill={elem.emissionColor} fontSize="9" fontWeight="bold">
                {elem.transitionFrom}
              </text>
              <text x={edX + 38} y={landingEnergyY - 8} fill="#10B981" fontSize="9" fontWeight="bold">
                {elem.transitionTo}
              </text>

              {/* ΔE bracket */}
              <line x1={edX - 15} y1={excitedEnergyY} x2={edX - 15} y2={landingEnergyY} stroke="#FBBF24" strokeWidth="1"/>
              <line x1={edX - 20} y1={excitedEnergyY} x2={edX - 10} y2={excitedEnergyY} stroke="#FBBF24" strokeWidth="1"/>
              <line x1={edX - 20} y1={landingEnergyY} x2={edX - 10} y2={landingEnergyY} stroke="#FBBF24" strokeWidth="1"/>
              <text x={edX - 25} y={(excitedEnergyY + landingEnergyY) / 2 - 3} textAnchor="end" fill="#FBBF24" fontSize="9" fontWeight="bold">
                ΔE
              </text>
              <text x={edX - 25} y={(excitedEnergyY + landingEnergyY) / 2 + 9} textAnchor="end" fill="#FBBF24" fontSize="8">
                = {elem.deltaE}
              </text>

              {/* Photon wavy going right from the transition */}
              <path fill="none" stroke={elem.emissionColor} strokeWidth="2.5" filter="url(#photonGlow)"
                d={`M ${edX + 50} ${(excitedEnergyY + landingEnergyY) / 2} Q ${edX + 60} ${(excitedEnergyY + landingEnergyY) / 2 - 10}, ${edX + 70} ${(excitedEnergyY + landingEnergyY) / 2} Q ${edX + 80} ${(excitedEnergyY + landingEnergyY) / 2 + 10}, ${edX + 90} ${(excitedEnergyY + landingEnergyY) / 2} Q ${edX + 100} ${(excitedEnergyY + landingEnergyY) / 2 - 10}, ${edX + 110} ${(excitedEnergyY + landingEnergyY) / 2}`}>
                <animate attributeName="opacity" values="0;1;1" dur="0.8s" fill="freeze"/>
              </path>
              <text x={edX + 70} y={(excitedEnergyY + landingEnergyY) / 2 - 18} textAnchor="middle" fill={elem.emissionColor} fontSize="11" fontWeight="bold">
                λ = {elem.emissionWl} nm
              </text>

              {/* Formula */}
              <text x={edX + 70} y={(excitedEnergyY + landingEnergyY) / 2 + 28} textAnchor="middle" fill="#9CA3AF" fontSize="8">
                ΔE = hc/λ = {elem.deltaE}
              </text>
            </g>
          )}

          {/* ===== BOTTOM: Phase info box ===== */}
          <rect x="20" y="365" width="660" height="45" rx="8" fill="#1F2937" stroke="#374151" strokeWidth="1"/>
          <text x="350" y="385" textAnchor="middle" fill="#E5E7EB" fontSize="13" fontWeight="bold">
            {animPhase === 'ground' || animPhase === 'ground2' ? '바닥 상태 (Ground State) — 전자가 안정적인 궤도에 위치' :
             animPhase === 'exciting' ? '여기 중 (Excitation) — 전자 충돌로 높은 에너지 궤도로 이동!' :
             animPhase === 'excited' ? '들뜬 상태 (Excited) — 불안정! 곧 낮은 궤도로 떨어짐' :
             `발광! (Emission) — ${elem.transitionFrom} → ${elem.transitionTo} 전이, λ = ${elem.emissionWl} nm 방출`}
          </text>
          {(electronMovingDown || animPhase === 'ground2') && (
            <text x="350" y="403" textAnchor="middle" fill="#FBBF24" fontSize="10">
              에너지 차이 ΔE = {elem.deltaE} → 이 에너지에 해당하는 파장 {elem.emissionWl} nm의 빛(광자)이 방출됩니다
            </text>
          )}
          {(animPhase === 'ground' || animPhase === 'exciting' || animPhase === 'excited') && (
            <text x="350" y="403" textAnchor="middle" fill="#9CA3AF" fontSize="10">
              {animPhase === 'ground' ? `${elem.name} — 전이: ${elem.transition} (${elem.emissionWl} nm)` :
               animPhase === 'exciting' ? `전자가 ${elem.shells[elem.shells.length-1].label} 궤도에서 ${elem.excitedShell.label} 궤도로 올라갑니다` :
               `${elem.excitedShell.label} 궤도의 전자는 불안정하여 곧 ${elem.landingShell.label} 궤도로 떨어집니다`}
            </text>
          )}
        </svg>

        {/* Controls */}
        <div className="flex gap-3 justify-center mt-3">
          <button onClick={() => { setAnimPhase('ground'); setIsAutoPlay(false); }}
            className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg text-sm font-bold hover:bg-gray-600">초기화</button>
          <button onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${isAutoPlay ? 'bg-red-600 text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}>
            {isAutoPlay ? '⏹ 정지' : '▶ 자동 재생'}
          </button>
          {!isAutoPlay && (
            <div className="flex gap-2">
              <button onClick={() => setAnimPhase('exciting')} className="px-3 py-2 bg-yellow-600 text-white rounded-lg text-xs font-bold hover:bg-yellow-700">1. 여기</button>
              <button onClick={() => setAnimPhase('excited')} className="px-3 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700">2. 들뜬</button>
              <button onClick={() => setAnimPhase('emitting')} className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700">3. 발광</button>
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h5 className="font-bold text-blue-800 mb-2">전자 껍데기(Electron Shell)란?</h5>
          <p className="text-sm text-blue-700 leading-relaxed">
            원자의 전자는 <strong>특정 에너지 준위(껍데기)</strong>에만 존재할 수 있습니다.
            안쪽부터 K(n=1), L(n=2), M(n=3), N(n=4)... 순으로 번호를 매기며,
            각 껍데기는 다시 <strong>s, p, d, f 부껍데기(subshell)</strong>로 나뉩니다.
          </p>
          <div className="mt-2 text-xs text-blue-600 space-y-1">
            <p><strong>s</strong>: 구형, 최대 2개 전자</p>
            <p><strong>p</strong>: 아령형, 최대 6개 전자</p>
            <p><strong>d</strong>: 클로버형, 최대 10개 전자</p>
            <p><strong>f</strong>: 복잡한 형태, 최대 14개 전자</p>
          </div>
        </div>
        <div className="bg-amber-50 rounded-lg p-4">
          <h5 className="font-bold text-amber-800 mb-2">OES 전이 표기법 읽는 법</h5>
          <p className="text-sm text-amber-700 leading-relaxed">
            OES 데이터에서 보이는 <strong>4p→4s</strong> 같은 표기는 전자가 4p 부껍데기에서 4s 부껍데기로 전이하면서 빛을 방출했다는 뜻입니다.
          </p>
          <div className="mt-2 text-xs text-amber-600 space-y-1">
            <p><strong>Ar I 811.5nm</strong>: 4p[5/2] → 4s[3/2]</p>
            <p><strong>O I 777.4nm</strong>: 3p⁵P → 3s⁵S</p>
            <p><strong>He I 587.6nm</strong>: 3d³D → 2p³P</p>
            <p className="mt-2 font-semibold">높은 에너지 → 낮은 에너지 = 빛 방출!</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================
// Main OES Simulator Component
// ============================================================
const OESSimulator = () => {
  const [activeTab, setActiveTab] = useState('storytelling');

  // Storytelling states
  const [theoryStep, setTheoryStep] = useState(0);
  const [isTheoryPlaying, setIsTheoryPlaying] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showDetailedContent, setShowDetailedContent] = useState(false);

  // Simulator states
  const [simMode, setSimMode] = useState(1);
  const [isPlasmaOn, setIsPlasmaOn] = useState(false);
  const [selectedGas, setSelectedGas] = useState('Ar');
  const [rfPower, setRfPower] = useState(200);
  const [spectrumData, setSpectrumData] = useState([]);
  const [showNormalized, setShowNormalized] = useState(false);

  // Mode 2 states
  const [mode2Gas, setMode2Gas] = useState('Ar');
  const [mode2Power, setMode2Power] = useState(200);
  const [mode2PlasmaOn, setMode2PlasmaOn] = useState(false);
  const [collectedSpectra, setCollectedSpectra] = useState([]);
  const [userNotes, setUserNotes] = useState('');
  const [identifiedSpecies, setIdentifiedSpecies] = useState([]);
  const [showMode2Answer, setShowMode2Answer] = useState(false);

  // Overview dropdown states
  const [showShellTheory, setShowShellTheory] = useState(false);

  // Mode 2 live spectrum (with noise)
  const [mode2LiveData, setMode2LiveData] = useState([]);

  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const tabs = [
    { id: 'storytelling', name: '스토리텔링', icon: '📖' },
    { id: 'theory', name: '이론', icon: '📚' },
    { id: 'overview', name: '개요', icon: '🔍' },
    { id: 'simulator', name: '시뮬레이터 측정', icon: '🔬' },
    { id: 'quiz', name: '문제풀이', icon: '✏️' },
  ];

  // ============================================================
  // Storytelling Content
  // ============================================================
  const storySteps = [
    {
      step: 1,
      title: "빛으로 플라즈마를 읽다",
      content: "반도체 공장의 에칭 공정실. 엔지니어 민수는 오늘도 플라즈마 챔버 앞에 서 있습니다. 챔버 안에서는 보라빛 플라즈마가 웨이퍼 위의 실리콘을 정밀하게 깎아내고 있죠.\n\n그런데 문제가 생겼습니다. 에칭 결과가 불안정한 겁니다. 어떤 웨이퍼는 잘 깎이고, 어떤 건 너무 많이 깎이고... **\"도대체 플라즈마 안에서 무슨 일이 벌어지고 있는 걸까?\"**\n\n플라즈마는 눈에 보이지 않는 세계입니다. 하지만 민수에게는 비밀 무기가 있습니다. 바로 __OES(Optical Emission Spectroscopy)__ — *광학 발광 분광법*입니다!",
      color: "from-violet-500 to-purple-600"
    },
    {
      step: 2,
      title: "플라즈마가 보내는 빛의 메시지",
      content: "플라즈마 속의 전자들은 엄청난 에너지를 가지고 날아다닙니다. 이 전자들이 가스 원자와 충돌하면, 원자의 전자가 *들뜬 상태(excited state)*로 올라갑니다.\n\n들뜬 전자는 불안정하기 때문에 곧 **바닥 상태로 되돌아오면서 빛을 방출**합니다. 이것이 바로 플라즈마가 빛나는 이유이고, OES가 측정하는 것이죠!\n\n놀라운 점은, 각 원자나 분자는 __고유한 파장의 빛__을 방출한다는 것입니다. 마치 사람마다 다른 지문을 가진 것처럼, 아르곤은 아르곤만의, 산소는 산소만의 *빛의 지문*을 갖고 있습니다.\n\nOES는 이 빛의 지문을 읽어내는 기술입니다!",
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 3,
      title: "분광기의 마법",
      content: "OES 시스템은 어떻게 구성될까요? 생각보다 간단합니다!\n\n**① 뷰포트(Viewport)**: 챔버 벽에 있는 작은 유리창입니다. 플라즈마의 빛이 여기를 통해 나옵니다.\n\n**② 집광 렌즈와 광섬유**: 뷰포트에서 나온 빛을 모아서 광섬유를 통해 분광기로 전달합니다.\n\n**③ 분광기(Spectrometer)**: 핵심 장비! 빛을 파장별로 분해합니다. *회절격자(Diffraction Grating)*가 프리즘처럼 빛을 무지개로 펼쳐놓죠.\n\n**④ CCD 검출기**: 분해된 빛의 세기를 파장별로 측정합니다. 이 데이터가 바로 __OES 스펙트럼__이 됩니다!\n\n민수가 컴퓨터 화면에서 보는 것은 바로 이 스펙트럼입니다. 가로축은 파장(nm), 세로축은 빛의 세기(intensity). 각 피크(peak)가 특정 원자나 분자의 존재를 알려줍니다!",
      color: "from-green-500 to-emerald-500"
    },
    {
      step: 4,
      title: "OES로 풀어낸 미스터리",
      content: "다시 민수의 이야기로 돌아갑시다. 민수는 OES 스펙트럼을 분석하기 시작합니다.\n\n정상적인 에칭에서는 *CF₄ 가스*에서 나온 **불소(F) 라디칼**의 685.6nm 피크가 일정해야 합니다. 그런데 불안정한 웨이퍼에서는 이 피크가 급격히 감소하고 있었습니다!\n\n\"아하! __불소 라디칼이 부족한 거야!__\"\n\n더 자세히 보니, 산소(O)의 777.4nm 피크가 비정상적으로 높았습니다. 챔버 어딘가에서 *미세한 공기 누출(leak)*이 발생하고 있었던 겁니다!\n\n민수는 챔버의 O-ring을 교체하고 진공 상태를 확인했습니다. 결과는? **에칭 균일성이 완벽하게 회복되었습니다!**\n\n이것이 OES의 힘입니다. 눈에 보이지 않는 플라즈마 내부를 빛의 언어로 읽어내는 것. 반도체 공정에서 OES는 __없어서는 안 될 진단 도구__입니다.",
      color: "from-orange-500 to-red-500"
    },
    {
      step: 5,
      title: "당신도 OES 전문가가 될 수 있습니다!",
      content: "이제 여러분의 차례입니다! 이 시뮬레이터에서는 실제 OES 장비를 다루듯이 플라즈마를 켜고, 스펙트럼을 측정하고, 데이터를 분석할 수 있습니다.\n\n**이론 탭**에서는 OES의 물리적 원리와 __데이터 처리 방법(정규화, 피크 분석)__을 배웁니다.\n\n**개요 탭**에서는 OES 시스템의 구성과 각 가스별 발광선 데이터베이스를 확인할 수 있습니다.\n\n**시뮬레이터 측정 탭**에서는 두 가지 모드로 실습합니다:\n• *모드 1*: 플라즈마를 켜고 OES 측정을 직접 관찰\n• *모드 2*: 가스별 스펙트럼을 측정하고, 직접 그래프를 정리하며, 여기된 종(species)을 파악\n\n**문제풀이 탭**에서 배운 내용을 확인해보세요!\n\n자, 이제 **빛으로 플라즈마를 읽는 여정**을 시작합시다!",
      color: "from-pink-500 to-rose-500"
    }
  ];


  // ============================================================
  // Quiz Questions
  // ============================================================
  const quizQuestions = [
    {
      question: 'OES에서 측정하는 것은 무엇인가?',
      options: ['플라즈마의 온도', '플라즈마에서 방출되는 빛의 스펙트럼', '챔버 내부의 압력', '웨이퍼 표면의 거칠기'],
      answer: 1,
      explanation: 'OES(Optical Emission Spectroscopy)는 플라즈마에서 방출되는 빛을 파장별로 분해하여 스펙트럼을 측정하는 기술입니다.',
      type: 'basic'
    },
    {
      question: '플라즈마에서 빛이 발생하는 원리는?',
      options: [
        '이온이 전극에 충돌할 때',
        '들뜬 원자/분자가 바닥 상태로 전이하며 광자를 방출',
        '가스 분자가 열에 의해 발광',
        'RF 전자기파가 직접 가시광으로 변환'
      ],
      answer: 1,
      explanation: '전자 충돌로 들뜬(excited) 원자/분자가 낮은 에너지 준위로 전이할 때 에너지 차이에 해당하는 파장의 광자를 방출합니다. 이것이 OES에서 측정하는 빛의 근원입니다.',
      type: 'basic'
    },
    {
      question: 'Ar 플라즈마에서 가장 강한 발광선의 파장은 약 몇 nm인가?',
      options: ['337.1 nm', '587.6 nm', '777.4 nm', '811.5 nm'],
      answer: 3,
      explanation: 'Ar I의 811.5nm (4p[5/2]→4s[3/2] 전이)가 아르곤 플라즈마에서 가장 강한 발광선입니다. 시뮬레이터에서 Ar 플라즈마를 켜서 직접 확인해보세요!',
      type: 'simulator'
    },
    {
      question: 'OES 스펙트럼 데이터를 정규화(Normalization)하는 주된 이유는?',
      options: [
        '데이터 파일 크기를 줄이기 위해',
        '다른 조건에서 측정한 스펙트럼을 비교하기 위해',
        '파장 보정을 위해',
        '검출기의 수명을 늘리기 위해'
      ],
      answer: 1,
      explanation: '정규화는 최대 피크 세기를 1.0으로 스케일링하여, 서로 다른 조건(파워, 가스유량 등)에서 측정한 스펙트럼의 상대적 비율을 비교할 수 있게 합니다.',
      type: 'basic'
    },
    {
      question: 'CF₄ 플라즈마에서 F(불소) 라디칼의 주요 발광선 파장은?',
      options: ['251.9 nm', '337.1 nm', '685.6 nm', '811.5 nm'],
      answer: 2,
      explanation: 'F I의 685.6nm (3p⁴P→3s⁴P 전이)가 불소 라디칼의 대표적인 발광선입니다. 에칭 공정에서 이 피크를 모니터링하여 에칭 종말점(endpoint)을 검출합니다.',
      type: 'simulator'
    },
    {
      question: '시뮬레이터에서 N₂ 플라즈마를 켰을 때, 337.1nm 피크는 어떤 전이에 해당하는가?',
      options: [
        'N I 원자 전이',
        'N₂ Second Positive System (C³Πu→B³Πg)',
        'N₂⁺ First Negative System',
        'NO 분자 전이'
      ],
      answer: 1,
      explanation: 'N₂의 337.1nm는 Second Positive System(SPS)의 C³Πu(v\'=0)→B³Πg(v\"=0) 전이입니다. 질소 플라즈마에서 가장 강한 발광선으로 UV 영역에 있습니다.',
      type: 'simulator'
    },
    {
      question: 'OES 시스템에서 분광기(Spectrometer)의 핵심 역할은?',
      options: [
        '빛을 증폭한다',
        '빛을 파장별로 분해한다',
        '플라즈마를 점화한다',
        '진공도를 측정한다'
      ],
      answer: 1,
      explanation: '분광기는 회절격자(Diffraction Grating)를 사용하여 입사된 빛을 파장별로 분리(분광)합니다. 이렇게 분해된 빛이 CCD 검출기에 도달하여 스펙트럼이 형성됩니다.',
      type: 'basic'
    },
    {
      question: 'Actinometry에서 비활성 가스(예: Ar)를 소량 추가하는 이유는?',
      options: [
        '플라즈마를 안정화하기 위해',
        '기준(reference) 발광선으로 사용하여 활성종의 절대 밀도를 추정하기 위해',
        '에칭 속도를 높이기 위해',
        'CCD 검출기를 보정하기 위해'
      ],
      answer: 1,
      explanation: 'Actinometry는 알려진 농도의 비활성 가스(Ar 등)의 발광선을 기준으로 활성종(F, O 등)의 발광선 비율을 비교하여 활성종의 상대적 밀도를 정량적으로 추정하는 기법입니다.',
      type: 'basic'
    },
  ];

  // ============================================================
  // Effects
  // ============================================================

  // Typing animation
  useEffect(() => {
    if (isTheoryPlaying && theoryStep < storySteps.length) {
      const fullText = storySteps[theoryStep].content;
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 25);
      return () => clearInterval(typingInterval);
    }
  }, [isTheoryPlaying, theoryStep]);

  // Generate spectrum with real-time noise animation
  useEffect(() => {
    if (!isPlasmaOn) {
      setSpectrumData([]);
      return;
    }
    const updateSpectrum = () => {
      const data = generateSpectrumData(selectedGas, rfPower, true);
      setSpectrumData(showNormalized ? normalizeSpectrum(data) : data);
    };
    updateSpectrum();
    const interval = setInterval(updateSpectrum, 500);
    return () => clearInterval(interval);
  }, [isPlasmaOn, selectedGas, rfPower, showNormalized]);

  // Mode 2 live spectrum with noise
  useEffect(() => {
    if (!mode2PlasmaOn) {
      setMode2LiveData([]);
      return;
    }
    const update = () => {
      const data = generateSpectrumData(mode2Gas, mode2Power, true);
      setMode2LiveData(normalizeSpectrum(data));
    };
    update();
    const interval = setInterval(update, 500);
    return () => clearInterval(interval);
  }, [mode2PlasmaOn, mode2Gas, mode2Power]);

  // Format theory content with styling (same pattern as existing)
  const formatTheoryContent = (text) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((paragraph, pIndex) => {
      const elements = [];
      let remaining = paragraph;
      let key = 0;
      const patterns = [
        { regex: /\*\*([^*]+)\*\*/g, className: 'font-bold text-yellow-300' },
        { regex: /\*([^*]+)\*/g, className: 'text-blue-200 font-semibold' },
        { regex: /__([^_]+)__/g, className: 'underline decoration-2' },
      ];
      while (remaining.length > 0) {
        let earliestMatch = null;
        let earliestPattern = null;
        let earliestIndex = remaining.length;
        patterns.forEach(pattern => {
          const match = pattern.regex.exec(remaining);
          if (match && match.index < earliestIndex) {
            earliestMatch = match;
            earliestPattern = pattern;
            earliestIndex = match.index;
          }
        });
        if (earliestMatch) {
          if (earliestIndex > 0) {
            elements.push(<span key={`${pIndex}-${key++}`}>{remaining.substring(0, earliestIndex)}</span>);
          }
          elements.push(<span key={`${pIndex}-${key++}`} className={earliestPattern.className}>{earliestMatch[1]}</span>);
          remaining = remaining.substring(earliestIndex + earliestMatch[0].length);
          patterns.forEach(p => p.regex.lastIndex = 0);
        } else {
          if (remaining.length > 0) {
            elements.push(<span key={`${pIndex}-${key++}`}>{remaining}</span>);
          }
          break;
        }
      }
      return <p key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>{elements}</p>;
    });
  };

  const startTheory = () => { setIsTheoryPlaying(true); setTheoryStep(0); setTypedText(''); };
  const nextTheoryStep = () => {
    if (theoryStep < storySteps.length - 1) { setTheoryStep(theoryStep + 1); setTypedText(''); }
    else { setShowDetailedContent(true); setIsTheoryPlaying(false); }
  };
  const prevTheoryStep = () => { if (theoryStep > 0) { setTheoryStep(theoryStep - 1); setTypedText(''); } };
  const skipTheory = () => { setShowDetailedContent(true); setIsTheoryPlaying(false); };

  // Mode 2 collect spectrum
  const collectSpectrum = () => {
    if (!mode2PlasmaOn) return;
    const data = generateSpectrumData(mode2Gas, mode2Power);
    const normalized = normalizeSpectrum(data);
    setCollectedSpectra(prev => [...prev, {
      gas: mode2Gas,
      power: mode2Power,
      data: normalized,
      rawData: data,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  // Check identified species
  const toggleSpecies = (species) => {
    setIdentifiedSpecies(prev =>
      prev.includes(species) ? prev.filter(s => s !== species) : [...prev, species]
    );
  };


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold whitespace-nowrap border-b-3 transition-all
                ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-7xl mx-auto">

        {/* ================================================================ */}
        {/* TAB: STORYTELLING */}
        {/* ================================================================ */}
        {activeTab === 'storytelling' && (
          <div className="space-y-6">
            {!isTheoryPlaying && !showDetailedContent ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🌈</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">OES: 빛으로 플라즈마를 읽다</h2>
                <p className="text-gray-600 mb-8 text-lg">Optical Emission Spectroscopy의 세계로 떠나봅시다</p>
                <button onClick={startTheory}
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  스토리 시작하기 ▶
                </button>
              </div>
            ) : isTheoryPlaying ? (
              <div className="max-w-3xl mx-auto">
                {/* Progress */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-500">Step {theoryStep + 1} / {storySteps.length}</span>
                  <div className="flex gap-2">
                    {storySteps.map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full transition-all ${i <= theoryStep ? 'bg-indigo-600 scale-110' : 'bg-gray-300'}`}/>
                    ))}
                  </div>
                  <button onClick={skipTheory} className="text-sm text-gray-500 hover:text-gray-700">건너뛰기 →</button>
                </div>

                {/* Story Card */}
                <div className={`bg-gradient-to-br ${storySteps[theoryStep].color} rounded-2xl p-8 text-white shadow-2xl min-h-[400px]`}>
                  <h3 className="text-2xl font-bold mb-6">{storySteps[theoryStep].title}</h3>
                  <div className="text-lg leading-relaxed">
                    {formatTheoryContent(typedText)}
                    <span className="animate-pulse">|</span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  <button onClick={prevTheoryStep} disabled={theoryStep === 0}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-30 hover:bg-gray-300 transition-all">
                    ← 이전
                  </button>
                  <button onClick={nextTheoryStep}
                    className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all">
                    {theoryStep === storySteps.length - 1 ? '완료 ✓' : '다음 →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">스토리텔링 완료!</h3>
                <p className="text-gray-600 mb-6">이론, 개요, 시뮬레이터 탭에서 더 깊이 학습해보세요.</p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => {setShowDetailedContent(false); setIsTheoryPlaying(false);}}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
                    다시 보기
                  </button>
                  <button onClick={() => setActiveTab('theory')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
                    이론 학습하기 →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}


        {/* ================================================================ */}
        {/* TAB: THEORY */}
        {/* ================================================================ */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">OES 이론</h2>

            {/* 1. Emission Principle */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="text-xl font-bold text-indigo-700">1. 발광 원리 (Emission Principle)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    플라즈마에서 <strong>고에너지 전자</strong>가 중성 원자/분자와 충돌하면, 원자의 전자가 높은 에너지 준위로 여기(excitation)됩니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    여기된 전자는 불안정하여 <strong>낮은 에너지 준위로 전이</strong>하면서 에너지 차이에 해당하는 파장의 광자를 방출합니다.
                  </p>
                  <div className="bg-indigo-50 rounded-lg p-4 font-mono text-center">
                    <p className="text-indigo-800 font-bold">ΔE = E₂ - E₁ = hν = hc/λ</p>
                    <p className="text-sm text-indigo-600 mt-2">h: 플랑크 상수, c: 광속, λ: 파장</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    각 원소/분자마다 에너지 준위 구조가 다르므로, <strong>고유한 파장의 빛</strong>을 방출합니다. 이것이 OES의 핵심 원리입니다.
                  </p>
                </div>
                {/* Energy Level Diagram SVG */}
                <svg viewBox="0 0 300 250" className="w-full max-w-xs mx-auto">
                  <text x="150" y="20" textAnchor="middle" fill="#4338CA" fontSize="13" fontWeight="bold">에너지 준위 전이</text>
                  {/* Ground state */}
                  <line x1="60" y1="220" x2="240" y2="220" stroke="#1F2937" strokeWidth="3"/>
                  <text x="250" y="225" fill="#1F2937" fontSize="11" fontWeight="bold">E₁ (바닥)</text>
                  {/* Excited state */}
                  <line x1="60" y1="80" x2="240" y2="80" stroke="#7C3AED" strokeWidth="3"/>
                  <text x="250" y="85" fill="#7C3AED" fontSize="11" fontWeight="bold">E₂ (들뜬)</text>
                  {/* Excitation arrow (up) */}
                  <line x1="110" y1="215" x2="110" y2="90" stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrowRed)"/>
                  <text x="75" y="155" fill="#EF4444" fontSize="10" fontWeight="bold">전자 충돌</text>
                  <text x="85" y="170" fill="#EF4444" fontSize="10">(여기)</text>
                  {/* Emission arrow (down) */}
                  <line x1="190" y1="85" x2="190" y2="210" stroke="#F59E0B" strokeWidth="2.5" markerEnd="url(#arrowYellow)"/>
                  <text x="200" y="145" fill="#F59E0B" fontSize="10" fontWeight="bold">광자 방출</text>
                  <text x="200" y="160" fill="#F59E0B" fontSize="10">(hν = hc/λ)</text>
                  {/* Wavy photon line */}
                  <path d="M195,175 Q200,170 205,175 Q210,180 215,175 Q220,170 225,175 Q230,180 235,175" fill="none" stroke="#F59E0B" strokeWidth="1.5"/>
                  <text x="240" y="178" fill="#F59E0B" fontSize="10">💡</text>
                  {/* Electron circle */}
                  <circle cx="110" cy="220" r="8" fill="#3B82F6" opacity="0.8"/>
                  <text x="110" y="224" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">e⁻</text>
                  {/* Markers */}
                  <defs>
                    <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="#EF4444"/>
                    </marker>
                    <marker id="arrowYellow" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="#F59E0B"/>
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>

            {/* 2. Spectrum Analysis */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="text-xl font-bold text-indigo-700">2. 스펙트럼 분석</h3>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  OES 스펙트럼은 <strong>가로축: 파장(nm), 세로축: 발광 세기(intensity)</strong>로 표현됩니다.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">피크 위치 (Peak Position)</h4>
                    <p className="text-sm text-blue-700">특정 파장의 피크 → 해당 원소/분자의 <strong>존재 확인</strong> (정성 분석)</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2">피크 세기 (Peak Intensity)</h4>
                    <p className="text-sm text-green-700">피크의 높이 → 해당 종의 <strong>상대적 밀도</strong> (정량 분석)</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-bold text-peak-width800 mb-2">피크 폭 (Peak Width)</h4>
                    <p className="text-sm text-purple-700">피크의 넓이 → <strong>온도, 압력</strong> 정보 (도플러, 압력 확장)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Normalization */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="text-xl font-bold text-indigo-700">3. 데이터 처리: 정규화 (Normalization)</h3>
              <p className="text-gray-700 leading-relaxed">
                서로 다른 조건에서 측정한 스펙트럼을 비교하려면, <strong>정규화(Normalization)</strong>가 필수입니다.
                가장 간단한 방법은 최대 피크 세기로 나누는 것입니다.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-center">
                <p className="text-lg font-bold text-gray-800">I_normalized(λ) = I(λ) / I_max</p>
                <p className="text-sm text-gray-600 mt-1">모든 세기가 0~1 범위로 스케일링됨</p>
              </div>
              <NormalizationDiagram />
            </div>

            {/* 4. Actinometry */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="text-xl font-bold text-indigo-700">4. Actinometry (활성종 정량 분석)</h3>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  OES 발광 세기는 해당 종의 밀도뿐만 아니라, 전자 온도와 밀도에도 의존합니다. 따라서 발광 세기만으로는 절대 밀도를 알 수 없습니다.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Actinometry</strong>는 알려진 농도의 비활성 가스(주로 Ar)를 소량 추가하여, 활성종과 비활성 가스의 발광선 비율로부터 활성종 밀도를 추정하는 기법입니다.
                </p>
                <div className="bg-amber-50 rounded-lg p-4 font-mono text-center">
                  <p className="text-lg font-bold text-amber-800">[X] / [Ar] ∝ I_X / I_Ar</p>
                  <p className="text-sm text-amber-700 mt-2">조건: 두 발광선의 들뜬 에너지 준위가 비슷해야 함</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-sm text-red-700">
                    <strong>주의:</strong> Actinometry의 정확도는 두 전이의 여기 임계 에너지(threshold energy)가 유사할 때만 보장됩니다. 예: F(685.6nm, 14.5eV) vs Ar(750.4nm, 13.5eV)
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Endpoint Detection */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="text-xl font-bold text-indigo-700">5. 종말점 검출 (Endpoint Detection)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    에칭 공정에서 OES의 가장 중요한 응용 중 하나는 <strong>종말점 검출</strong>입니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    에칭 대상 물질이 모두 제거되면, 관련 라디칼/반응 생성물의 발광선 세기가 급격히 변합니다.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">●</span>
                      <span><strong>반응물(etchant)의 세기 증가</strong>: 에칭할 물질이 없으면 반응물이 소모되지 않아 농도 증가</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">●</span>
                      <span><strong>생성물(product)의 세기 감소</strong>: 에칭이 끝나면 반응 생성물이 줄어듦</span>
                    </li>
                  </ul>
                </div>
                {/* Endpoint SVG */}
                <svg viewBox="0 0 300 200" className="w-full max-w-xs mx-auto">
                  <text x="150" y="18" textAnchor="middle" fill="#4338CA" fontSize="12" fontWeight="bold">종말점 검출 원리</text>
                  {/* Axes */}
                  <line x1="40" y1="170" x2="280" y2="170" stroke="#6B7280" strokeWidth="1.5"/>
                  <line x1="40" y1="30" x2="40" y2="170" stroke="#6B7280" strokeWidth="1.5"/>
                  <text x="160" y="190" textAnchor="middle" fill="#6B7280" fontSize="10">시간</text>
                  <text x="15" y="100" fill="#6B7280" fontSize="10" transform="rotate(-90,15,100)">세기</text>
                  {/* Endpoint line */}
                  <line x1="180" y1="30" x2="180" y2="170" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,3"/>
                  <text x="180" y="28" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="bold">종말점</text>
                  {/* Reactant line (increases at endpoint) */}
                  <path d="M50,120 L170,120 Q180,120 190,80 L270,80" fill="none" stroke="#10B981" strokeWidth="2.5"/>
                  <text x="100" y="115" fill="#10B981" fontSize="9" fontWeight="bold">반응물(F)</text>
                  {/* Product line (decreases at endpoint) */}
                  <path d="M50,70 L170,70 Q180,70 190,140 L270,140" fill="none" stroke="#3B82F6" strokeWidth="2.5"/>
                  <text x="100" y="65" fill="#3B82F6" fontSize="9" fontWeight="bold">생성물(SiF₄)</text>
                </svg>
              </div>
            </div>
          </div>
        )}


        {/* ================================================================ */}
        {/* TAB: OVERVIEW */}
        {/* ================================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">OES 시스템 개요</h2>

            {/* System Diagram */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">OES 시스템 구성도</h3>
              <OESSystemDiagram />
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🔭</div>
                  <h4 className="font-bold text-sm text-gray-800">뷰포트</h4>
                  <p className="text-xs text-gray-600">석영(Quartz) 유리창으로 UV~NIR 투과</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🔬</div>
                  <h4 className="font-bold text-sm text-gray-800">집광 광학계</h4>
                  <p className="text-xs text-gray-600">렌즈 + 광섬유로 빛을 분광기에 전달</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🌈</div>
                  <h4 className="font-bold text-sm text-gray-800">분광기</h4>
                  <p className="text-xs text-gray-600">회절격자로 빛을 파장별 분리</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">📊</div>
                  <h4 className="font-bold text-sm text-gray-800">CCD 검출기</h4>
                  <p className="text-xs text-gray-600">파장별 빛의 세기를 전기신호로 변환</p>
                </div>
              </div>
            </div>

            {/* Electron Shell Theory Dropdown */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => setShowShellTheory(!showShellTheory)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚛️</span>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-indigo-700">보강 학습: 전자 껍데기와 전이 이론</h3>
                    <p className="text-sm text-gray-500">spdf 껍데기, 에너지 준위, 여기/발광 원리 (클릭하여 펼치기)</p>
                  </div>
                </div>
                <span className={`text-2xl text-indigo-400 transition-transform duration-300 ${showShellTheory ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {showShellTheory && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="mt-4 space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h4 className="font-bold text-indigo-800 mb-2">왜 이 이론이 중요한가?</h4>
                      <p className="text-sm text-indigo-700 leading-relaxed">
                        OES에서 측정하는 <strong>발광선의 파장</strong>은 원자 내 전자가 높은 에너지 껍데기에서 낮은 껍데기로 떨어질 때 방출되는 빛의 파장입니다.
                        각 원소마다 껍데기 구조가 다르기 때문에 <strong>고유한 파장의 빛</strong>이 나옵니다. 이것이 OES로 원소를 식별하는 핵심 원리입니다.
                      </p>
                    </div>

                    <ElectronTransitionAnimation />

                    <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-800 mb-3">정리: OES 발광 과정</h4>
                      <div className="flex items-center gap-2 flex-wrap text-sm">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full font-bold">1. 전자 충돌</span>
                        <span className="text-gray-400 font-bold">→</span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full font-bold">2. 여기 (↑ 높은 껍데기)</span>
                        <span className="text-gray-400 font-bold">→</span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full font-bold">3. 불안정 (들뜬 상태)</span>
                        <span className="text-gray-400 font-bold">→</span>
                        <span className="bg-red-100 text-red-800 px-3 py-1.5 rounded-full font-bold">4. 전이 (↓ 낮은 껍데기)</span>
                        <span className="text-gray-400 font-bold">→</span>
                        <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-bold">5. 광자 방출 (hν)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Gas Database */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">가스별 주요 발광선 데이터베이스</h3>
              <div className="space-y-4">
                {Object.entries(OES_DATABASE).map(([key, gas]) => (
                  <div key={key} className="border rounded-lg overflow-hidden">
                    <div className="px-4 py-3 font-bold text-white" style={{backgroundColor: gas.color}}>
                      {gas.name}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left">파장 (nm)</th>
                            <th className="px-3 py-2 text-left">상대 세기</th>
                            <th className="px-3 py-2 text-left">종(Species)</th>
                            <th className="px-3 py-2 text-left">전이</th>
                            <th className="px-3 py-2 text-left">색상</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gas.lines.filter(l => l.intensity >= 0.4).map((line, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                              <td className="px-3 py-2 font-mono font-bold">{line.wavelength}</td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div className="h-2 rounded-full" style={{width: `${line.intensity * 100}%`, backgroundColor: gas.color}}/>
                                  </div>
                                  <span className="text-xs">{(line.intensity * 100).toFixed(0)}%</span>
                                </div>
                              </td>
                              <td className="px-3 py-2 font-semibold">{line.species}</td>
                              <td className="px-3 py-2 text-xs font-mono">{line.transition}</td>
                              <td className="px-3 py-2">
                                <div className="w-6 h-6 rounded-full border" style={{backgroundColor: wavelengthToColor(line.wavelength)}}/>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wavelength ranges */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">파장 대역별 색상</h3>
              <div className="flex rounded-lg overflow-hidden h-12">
                {[
                  { range: 'UV (200-380nm)', color: 'bg-purple-800', text: 'white' },
                  { range: '보라 (380-450nm)', color: 'bg-violet-600', text: 'white' },
                  { range: '파랑 (450-495nm)', color: 'bg-blue-500', text: 'white' },
                  { range: '초록 (495-570nm)', color: 'bg-green-500', text: 'white' },
                  { range: '노랑 (570-590nm)', color: 'bg-yellow-400', text: 'black' },
                  { range: '주황 (590-620nm)', color: 'bg-orange-500', text: 'white' },
                  { range: '빨강 (620-750nm)', color: 'bg-red-600', text: 'white' },
                  { range: 'NIR (750-950nm)', color: 'bg-red-900', text: 'white' },
                ].map((band, i) => (
                  <div key={i} className={`flex-1 ${band.color} flex items-center justify-center`}>
                    <span className={`text-${band.text} text-[8px] sm:text-xs font-bold text-center leading-tight px-1`}>{band.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* ================================================================ */}
        {/* TAB: SIMULATOR */}
        {/* ================================================================ */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Mode selector */}
            <div className="flex gap-4">
              <button onClick={() => setSimMode(1)}
                className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${simMode === 1 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                모드 1: OES 측정 관찰
              </button>
              <button onClick={() => setSimMode(2)}
                className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${simMode === 2 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                모드 2: 가스별 분석 실습
              </button>
            </div>

            {/* ===================== MODE 1 ===================== */}
            {simMode === 1 && (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left: Chamber */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">플라즈마 챔버</h3>
                  <PlasmaChamberSVG isPlasmaOn={isPlasmaOn} gasType={selectedGas} power={rfPower} />

                  {/* Controls */}
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-bold text-gray-700 w-20">가스 선택:</label>
                      <div className="flex gap-2 flex-wrap">
                        {Object.keys(OES_DATABASE).map(gas => (
                          <button key={gas} onClick={() => { setSelectedGas(gas); setIsPlasmaOn(false); }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${selectedGas === gas ? 'text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            style={selectedGas === gas ? {backgroundColor: OES_DATABASE[gas].color} : {}}>
                            {gas}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-bold text-gray-700 w-20">RF 파워:</label>
                      <input type="range" min="50" max="500" value={rfPower} onChange={e => setRfPower(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                      <span className="text-sm font-mono font-bold text-gray-700 w-16">{rfPower} W</span>
                    </div>
                    <button onClick={() => setIsPlasmaOn(!isPlasmaOn)}
                      className={`w-full py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-[1.02] ${isPlasmaOn ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                      {isPlasmaOn ? '⬛ PLASMA OFF' : '▶ PLASMA ON'}
                    </button>
                  </div>
                </div>

                {/* Right: OES Spectrum */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">OES 스펙트럼</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">정규화:</span>
                      <button onClick={() => setShowNormalized(!showNormalized)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${showNormalized ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {showNormalized ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  {spectrumData.length > 0 ? (
                    <div>
                      <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={spectrumData} margin={{top: 5, right: 20, bottom: 20, left: 10}}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3}/>
                          <XAxis dataKey="wavelength" type="number" domain={[200, 950]}
                            label={{value: '파장 (nm)', position: 'insideBottom', offset: -10}}
                            tick={{fontSize: 10}}/>
                          <YAxis label={{value: showNormalized ? '세기 (정규화)' : '세기 (a.u.)', angle: -90, position: 'insideLeft', offset: 0}}
                            tick={{fontSize: 10}}/>
                          <Tooltip formatter={(val) => [parseFloat(val).toFixed(4), '세기']}
                            labelFormatter={(val) => `${val} nm`}/>
                          <Line type="monotone" dataKey="intensity" stroke={OES_DATABASE[selectedGas]?.color || '#8B5CF6'}
                            dot={false} strokeWidth={1.5} isAnimationActive={false}/>
                        </LineChart>
                      </ResponsiveContainer>

                      {/* Peak identification */}
                      <div className="mt-4 bg-gray-50 rounded-lg p-4">
                        <h4 className="font-bold text-sm text-gray-700 mb-2">주요 피크 ({OES_DATABASE[selectedGas]?.name})</h4>
                        <div className="flex flex-wrap gap-2">
                          {OES_DATABASE[selectedGas]?.lines.filter(l => l.intensity >= 0.4).map((line, i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono font-bold"
                              style={{backgroundColor: `${OES_DATABASE[selectedGas].color}20`, color: OES_DATABASE[selectedGas].color}}>
                              <span className="w-2 h-2 rounded-full" style={{backgroundColor: wavelengthToColor(line.wavelength)}}/>
                              {line.wavelength}nm ({line.species})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[350px] text-gray-400">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📊</div>
                        <p className="text-lg">플라즈마를 켜면 스펙트럼이 표시됩니다</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}


            {/* ===================== MODE 2 ===================== */}
            {simMode === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">실습 안내</h3>
                  <p className="text-sm text-blue-700">
                    다양한 가스의 플라즈마를 켜보고 OES 스펙트럼을 수집하세요. 각 스펙트럼에서 주요 피크를 찾고, 어떤 여기된 종(species)이 있는지 직접 분석해보세요.
                  </p>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">측정 조건 설정</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <label className="text-sm font-bold text-gray-700 w-20">가스:</label>
                        <div className="flex gap-2 flex-wrap">
                          {Object.keys(OES_DATABASE).map(gas => (
                            <button key={gas} onClick={() => { setMode2Gas(gas); setMode2PlasmaOn(false); }}
                              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${mode2Gas === gas ? 'text-white shadow' : 'bg-gray-100 text-gray-600'}`}
                              style={mode2Gas === gas ? {backgroundColor: OES_DATABASE[gas].color} : {}}>
                              {gas}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-sm font-bold text-gray-700 w-20">파워:</label>
                        <input type="range" min="50" max="500" value={mode2Power}
                          onChange={e => setMode2Power(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                        <span className="text-sm font-mono font-bold w-16">{mode2Power}W</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setMode2PlasmaOn(!mode2PlasmaOn)}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode2PlasmaOn ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                        {mode2PlasmaOn ? '⬛ OFF' : '▶ ON'}
                      </button>
                      <button onClick={collectSpectrum} disabled={!mode2PlasmaOn}
                        className="flex-1 py-3 rounded-xl font-bold bg-indigo-600 text-white disabled:opacity-30 hover:bg-indigo-700 transition-all">
                        📸 스펙트럼 수집
                      </button>
                    </div>
                  </div>
                </div>

                {/* Current Spectrum */}
                {mode2PlasmaOn && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      현재 스펙트럼: {OES_DATABASE[mode2Gas]?.name} ({mode2Power}W)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mode2LiveData}
                        margin={{top: 5, right: 20, bottom: 20, left: 10}}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3}/>
                        <XAxis dataKey="wavelength" type="number" domain={[200, 950]}
                          label={{value: '파장 (nm)', position: 'insideBottom', offset: -10}} tick={{fontSize: 10}}/>
                        <YAxis label={{value: '정규화 세기', angle: -90, position: 'insideLeft'}} tick={{fontSize: 10}}/>
                        <Tooltip formatter={val => [parseFloat(val).toFixed(4), '세기']} labelFormatter={val => `${val} nm`}/>
                        <Line type="monotone" dataKey="intensity" stroke={OES_DATABASE[mode2Gas]?.color}
                          dot={false} strokeWidth={1.5} isAnimationActive={false}/>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Collected Spectra */}
                {collectedSpectra.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800">수집된 스펙트럼 ({collectedSpectra.length}개)</h3>
                      <button onClick={() => setCollectedSpectra([])}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200">
                        전체 삭제
                      </button>
                    </div>

                    {/* Overlay chart */}
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart margin={{top: 5, right: 20, bottom: 20, left: 10}}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3}/>
                        <XAxis dataKey="wavelength" type="number" domain={[200, 950]}
                          label={{value: '파장 (nm)', position: 'insideBottom', offset: -10}} tick={{fontSize: 10}}
                          allowDuplicatedCategory={false}/>
                        <YAxis label={{value: '정규화 세기', angle: -90, position: 'insideLeft'}} tick={{fontSize: 10}}/>
                        <Tooltip/>
                        <Legend/>
                        {collectedSpectra.map((spec, i) => (
                          <Line key={i} data={spec.data} type="monotone" dataKey="intensity"
                            name={`${spec.gas} (${spec.power}W)`}
                            stroke={OES_DATABASE[spec.gas]?.color || '#666'}
                            dot={false} strokeWidth={1.5} isAnimationActive={false}/>
                        ))}
                      </LineChart>
                    </ResponsiveContainer>

                    {/* List */}
                    <div className="mt-4 space-y-2">
                      {collectedSpectra.map((spec, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full" style={{backgroundColor: OES_DATABASE[spec.gas]?.color}}/>
                            <span className="font-bold text-sm">{spec.gas}</span>
                            <span className="text-xs text-gray-500">{spec.power}W · {spec.timestamp}</span>
                          </div>
                          <button onClick={() => setCollectedSpectra(prev => prev.filter((_, j) => j !== i))}
                            className="text-red-400 hover:text-red-600 text-sm">✕</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Species Identification */}
                {collectedSpectra.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">여기된 종(Species) 분석</h3>
                    <p className="text-sm text-gray-600 mb-4">수집된 스펙트럼에서 관찰되는 여기된 종을 모두 선택하세요.</p>

                    <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
                      {['Ar I', 'N₂ SPS', 'N₂⁺ FNS', 'N I', 'O I', 'O II', 'F I', 'CF₂', 'CF', 'C I', 'He I', 'N₂ FPS'].map(species => (
                        <button key={species} onClick={() => toggleSpecies(species)}
                          className={`px-3 py-2 rounded-lg text-sm font-bold border-2 transition-all ${identifiedSpecies.includes(species) ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}>
                          {species}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setShowMode2Answer(!showMode2Answer)}
                        className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-all">
                        {showMode2Answer ? '정답 숨기기' : '정답 확인'}
                      </button>
                    </div>

                    {showMode2Answer && (
                      <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-bold text-green-800 mb-2">정답:</h4>
                        {collectedSpectra.map((spec, i) => (
                          <div key={i} className="mb-2">
                            <span className="font-bold" style={{color: OES_DATABASE[spec.gas]?.color}}>{spec.gas}:</span>
                            <span className="text-sm text-gray-700 ml-2">
                              {OES_DATABASE[spec.gas]?.lines.filter(l => l.intensity >= 0.3).map(l => l.species).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* User Notes */}
                    <div className="mt-4">
                      <label className="text-sm font-bold text-gray-700">분석 노트:</label>
                      <textarea value={userNotes} onChange={e => setUserNotes(e.target.value)}
                        className="w-full mt-1 p-3 border rounded-lg text-sm resize-none h-24 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="관찰한 내용, 피크 위치, 종 식별 결과 등을 기록하세요..."/>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}


        {/* ================================================================ */}
        {/* TAB: QUIZ */}
        {/* ================================================================ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">문제풀이</h2>

            {!quizCompleted ? (
              <div className="space-y-6">
                {/* Progress */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">문제 {currentQuestion + 1} / {quizQuestions.length}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 rounded-full h-2 transition-all"
                      style={{width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`}}/>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">{score}점</span>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${quizQuestions[currentQuestion].type === 'simulator' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {quizQuestions[currentQuestion].type === 'simulator' ? '시뮬레이터 문제' : '기본 문제'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-6">
                    Q{currentQuestion + 1}. {quizQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, i) => (
                      <button key={i}
                        onClick={() => {
                          if (!showResult) {
                            setSelectedAnswer(i);
                            setShowResult(true);
                            if (i === quizQuestions[currentQuestion].answer) {
                              setScore(prev => prev + 1);
                            }
                          }
                        }}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          showResult
                            ? i === quizQuestions[currentQuestion].answer
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : i === selectedAnswer
                                ? 'border-red-500 bg-red-50 text-red-800'
                                : 'border-gray-200 text-gray-400'
                            : selectedAnswer === i
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                              : 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                        }`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            showResult
                              ? i === quizQuestions[currentQuestion].answer ? 'bg-green-500 text-white' : i === selectedAnswer ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {showResult && i === quizQuestions[currentQuestion].answer ? '✓' : showResult && i === selectedAnswer ? '✗' : String.fromCharCode(65 + i)}
                          </span>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Explanation */}
                  {showResult && (
                    <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === quizQuestions[currentQuestion].answer ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                      <p className="font-bold text-sm mb-2">
                        {selectedAnswer === quizQuestions[currentQuestion].answer ? '✅ 정답입니다!' : '❌ 오답입니다.'}
                      </p>
                      <p className="text-sm text-gray-700">{quizQuestions[currentQuestion].explanation}</p>
                      {quizQuestions[currentQuestion].type === 'simulator' && (
                        <p className="text-xs text-indigo-600 mt-2 font-semibold">
                          💡 시뮬레이터 측정 탭에서 직접 확인해볼 수 있습니다!
                        </p>
                      )}
                    </div>
                  )}

                  {/* Next button */}
                  {showResult && (
                    <div className="mt-6 flex justify-end">
                      <button onClick={() => {
                        if (currentQuestion < quizQuestions.length - 1) {
                          setCurrentQuestion(prev => prev + 1);
                          setSelectedAnswer(null);
                          setShowResult(false);
                        } else {
                          setQuizCompleted(true);
                        }
                      }} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all">
                        {currentQuestion === quizQuestions.length - 1 ? '결과 보기' : '다음 문제 →'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Complete */
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-6xl mb-4">{score >= quizQuestions.length * 0.8 ? '🎉' : score >= quizQuestions.length * 0.5 ? '👍' : '📚'}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">문제풀이 완료!</h3>
                <p className="text-4xl font-bold text-indigo-600 mb-4">{score} / {quizQuestions.length}</p>
                <p className="text-gray-600 mb-6">
                  {score >= quizQuestions.length * 0.8 ? '훌륭합니다! OES에 대한 이해도가 높습니다.' :
                   score >= quizQuestions.length * 0.5 ? '좋습니다! 이론과 시뮬레이터를 다시 확인해보세요.' :
                   '이론 탭과 시뮬레이터를 활용하여 더 학습해보세요!'}
                </p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => {
                    setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setQuizCompleted(false);
                  }} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">
                    다시 풀기
                  </button>
                  <button onClick={() => setActiveTab('simulator')}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300">
                    시뮬레이터로 이동
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default OESSimulator;
