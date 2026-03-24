import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

// ============================================================
// Endpoint Detection Simulator
// SiO2 (mask) / Si (target) / TiN (etch stop)
// CF4/O2 plasma etching
// ============================================================

// Emission lines relevant to this process
const ETCH_LINES = {
  // CF4 plasma species
  F:    { wl: 685.6, color: '#10B981', label: 'F (685.6nm)' },
  F2:   { wl: 703.7, color: '#34D399', label: 'F (703.7nm)' },
  CF2:  { wl: 251.9, color: '#6EE7B7', label: 'CF₂ (251.9nm)' },
  // Si etch byproduct
  SiF:  { wl: 440.0, color: '#3B82F6', label: 'SiF (440nm)' },
  Si:   { wl: 288.2, color: '#60A5FA', label: 'Si (288.2nm)' },
  // Oxygen
  O:    { wl: 777.4, color: '#EF4444', label: 'O (777.4nm)' },
  // TiN etch stop - appears at endpoint
  Ti:   { wl: 365.4, color: '#F59E0B', label: 'Ti (365.4nm)' },
  Ti2:  { wl: 399.0, color: '#FBBF24', label: 'Ti (399.0nm)' },
  N:    { wl: 337.1, color: '#A78BFA', label: 'N₂ (337.1nm)' },
  // SiO2 mask erosion byproduct (weak)
  SiO:  { wl: 425.0, color: '#94A3B8', label: 'SiO (425nm)' },
};

// Time phases: 0-40% = Si etching, 40-50% = near endpoint, 50-55% = endpoint transition, 55-100% = overetch into TiN
const calcIntensities = (progress) => {
  const p = Math.max(0, Math.min(100, progress));

  // F radical - stable during etch, slight increase after endpoint (less Si consuming F)
  const F = p < 50 ? 0.75 + Math.random() * 0.03
           : 0.85 + Math.random() * 0.03;

  // SiF - Si etch byproduct: strong during Si etch, drops sharply at endpoint
  const SiF = p < 45 ? 0.70 + Math.random() * 0.03
             : p < 55 ? 0.70 * Math.max(0, 1 - (p - 45) / 10) + Math.random() * 0.02
             : 0.03 + Math.random() * 0.01;

  // Si emission - similar to SiF
  const Si = p < 45 ? 0.50 + Math.random() * 0.02
            : p < 55 ? 0.50 * Math.max(0, 1 - (p - 45) / 10) + Math.random() * 0.02
            : 0.02 + Math.random() * 0.01;

  // O from O2 in CF4/O2 mix - stable
  const O = 0.40 + Math.random() * 0.02;

  // CF2 - stable
  const CF2 = 0.35 + Math.random() * 0.02;

  // Ti - appears at endpoint when TiN exposed
  const Ti = p < 48 ? 0.01 + Math.random() * 0.005
            : p < 55 ? Math.min(0.6, (p - 48) / 7 * 0.6) + Math.random() * 0.02
            : 0.55 + Math.random() * 0.03;

  // N from TiN
  const N = p < 48 ? 0.01 + Math.random() * 0.005
           : p < 55 ? Math.min(0.45, (p - 48) / 7 * 0.45) + Math.random() * 0.02
           : 0.40 + Math.random() * 0.03;

  // SiO from mask erosion (weak, constant)
  const SiO = 0.08 + Math.random() * 0.01;

  return { F, SiF, Si, O, CF2, Ti, N, SiO };
};

// Generate full spectrum at given progress
const generateEtchSpectrum = (progress) => {
  const intensities = calcIntensities(progress);
  const data = [];
  for (let wl = 200; wl <= 950; wl += 1) {
    let total = 0;
    Object.entries(ETCH_LINES).forEach(([key, line]) => {
      const baseKey = key.replace(/\d+$/, ''); // Ti2 → Ti, F2 → F
      const intKey = Object.keys(intensities).includes(key) ? key : baseKey;
      const intensity = intensities[intKey] || 0;
      const width = 2.8;
      const dist = Math.abs(wl - line.wl);
      if (dist < width * 5) {
        total += intensity * Math.exp(-0.5 * Math.pow(dist / width, 2));
      }
    });
    total += (Math.random() - 0.5) * 0.008;
    total = Math.max(0, total);
    data.push({ wavelength: wl, intensity: parseFloat(total.toFixed(4)) });
  }
  return data;
};

// ============================================================
// Wafer Cross-Section SVG
// ============================================================
const WaferCrossSection = ({ progress, isPlaying }) => {
  // Si thickness decreases with progress (0-50%)
  const siEtchFraction = Math.min(1, progress / 50);
  const originalSiH = 80;
  const siH = originalSiH * (1 - siEtchFraction);
  const maskErosion = progress * 0.15; // SiO2 mask erodes slowly

  // Positions
  const baseY = 200;
  const tinH = 25;
  const tinY = baseY - tinH;
  const siY = tinY - siH;
  const maskH = Math.max(0, 40 - maskErosion);
  const maskY = siY - maskH;

  // Etch trench (where mask opening is)
  const trenchLeft = 110;
  const trenchRight = 230;
  const trenchDepth = originalSiH * siEtchFraction;

  return (
    <svg viewBox="0 0 340 260" className="w-full h-full">
      <defs>
        <pattern id="si-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#475569" strokeWidth="0.5"/>
        </pattern>
        <linearGradient id="plasma-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1"/>
        </linearGradient>
        <filter id="etch-glow"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>

      {/* Labels */}
      <text x="170" y="15" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="700">Wafer Cross-Section</text>

      {/* Plasma region above wafer */}
      {isPlaying && (
        <g>
          <rect x="40" y="20" width="260" height={maskY - 20} rx="4" fill="url(#plasma-glow)">
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="1.5s" repeatCount="indefinite"/>
          </rect>
          {/* Plasma particles */}
          {[0,1,2,3,4].map(i => (
            <circle key={i} cx={80 + i * 45} cy={30 + Math.sin(i * 1.5) * 10} r="1.5" fill="#c4b5fd" opacity="0.7">
              <animate attributeName="cy" values={`${30+i*5};${45+i*3};${30+i*5}`} dur={`${1+i*0.3}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          <text x="170" y={maskY - 8} textAnchor="middle" fill="#c4b5fd" fontSize="9">CF₄/O₂ Plasma</text>
        </g>
      )}

      {/* SiO2 Mask - left and right pillars with opening in center */}
      <rect x="40" y={maskY} width={trenchLeft - 40} height={maskH} fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" rx="2"/>
      <rect x={trenchRight} y={maskY} width={300 - trenchRight} height={maskH} fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" rx="2"/>
      <text x="75" y={maskY + maskH/2 + 3} textAnchor="middle" fill="#1e3a5f" fontSize="8" fontWeight="bold">SiO₂</text>
      <text x="265" y={maskY + maskH/2 + 3} textAnchor="middle" fill="#1e3a5f" fontSize="8" fontWeight="bold">SiO₂</text>

      {/* Si layer - under mask (unetched) */}
      <rect x="40" y={maskY + maskH} width={trenchLeft - 40} height={originalSiH} fill="#64748B" stroke="#475569" strokeWidth="1"/>
      <rect x={trenchRight} y={maskY + maskH} width={300 - trenchRight} height={originalSiH} fill="#64748B" stroke="#475569" strokeWidth="1"/>
      {/* Si label on side */}
      <text x="75" y={maskY + maskH + originalSiH/2 + 3} textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">Si</text>

      {/* Si in trench (being etched) */}
      {siH > 0.5 && (
        <rect x={trenchLeft} y={tinY - siH} width={trenchRight - trenchLeft} height={siH}
          fill="#64748B" stroke="#475569" strokeWidth="0.5"/>
      )}

      {/* TiN etch stop layer */}
      <rect x="40" y={maskY + maskH + originalSiH} width="260" height={tinH} fill="#F59E0B" stroke="#D97706" strokeWidth="1" rx="1"/>
      <text x="170" y={maskY + maskH + originalSiH + tinH/2 + 3} textAnchor="middle" fill="#451a03" fontSize="9" fontWeight="bold">TiN (Etch Stop)</text>

      {/* Substrate below TiN */}
      <rect x="40" y={maskY + maskH + originalSiH + tinH} width="260" height="20" fill="#374151" stroke="#4B5563" strokeWidth="0.5"/>
      <text x="170" y={maskY + maskH + originalSiH + tinH + 13} textAnchor="middle" fill="#9CA3AF" fontSize="7">Substrate</text>

      {/* Etch front glow in trench */}
      {isPlaying && siH > 0.5 && (
        <rect x={trenchLeft + 5} y={tinY - siH - 2} width={trenchRight - trenchLeft - 10} height="4"
          fill="#a78bfa" opacity="0.6" filter="url(#etch-glow)" rx="2">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="0.8s" repeatCount="indefinite"/>
        </rect>
      )}

      {/* TiN exposed indicator */}
      {progress > 48 && (
        <g>
          <rect x={trenchLeft + 5} y={tinY} width={trenchRight - trenchLeft - 10} height="3"
            fill="#FBBF24" opacity={Math.min(1, (progress - 48) / 5)} filter="url(#etch-glow)" rx="1">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite"/>
          </rect>
        </g>
      )}

      {/* Dimension arrows */}
      <line x1="310" y1={maskY + maskH} x2="310" y2={maskY + maskH + originalSiH} stroke="#94a3b8" strokeWidth="0.5"/>
      <text x="325" y={maskY + maskH + originalSiH/2 + 3} fill="#94a3b8" fontSize="7" textAnchor="middle">Si</text>
      <text x="325" y={maskY + maskH + originalSiH/2 + 12} fill="#94a3b8" fontSize="7" textAnchor="middle">
        {Math.round((1 - siEtchFraction) * 100)}%
      </text>

      {/* Progress indicator */}
      <rect x="40" y="240" width="260" height="6" rx="3" fill="#1f2937"/>
      <rect x="40" y="240" width={260 * progress / 100} height="6" rx="3"
        fill={progress < 45 ? '#3B82F6' : progress < 55 ? '#F59E0B' : '#EF4444'}/>
      <text x="170" y="255" textAnchor="middle" fill="#94a3b8" fontSize="8">
        {progress < 45 ? 'Si 식각 중...' : progress < 55 ? '⚠️ Endpoint 감지!' : 'Over-etch (TiN 노출)'}
      </text>
    </svg>
  );
};

// ============================================================
// Main Component
// ============================================================
const OESEndpointDetection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [speed, setSpeed] = useState(1);
  const [spectrumData, setSpectrumData] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const timerRef = useRef(null);

  // Update spectrum and time series
  const updateData = useCallback((p) => {
    const spectrum = generateEtchSpectrum(p);
    setSpectrumData(spectrum);

    const intensities = calcIntensities(p);
    setTimeSeriesData(prev => {
      const next = [...prev, {
        time: parseFloat(p.toFixed(1)),
        SiF: parseFloat(intensities.SiF.toFixed(3)),
        F: parseFloat(intensities.F.toFixed(3)),
        Ti: parseFloat(intensities.Ti.toFixed(3)),
        N: parseFloat(intensities.N.toFixed(3)),
        O: parseFloat(intensities.O.toFixed(3)),
      }];
      // Keep last 200 points
      return next.length > 200 ? next.slice(-200) : next;
    });
  }, []);

  // Play/pause logic
  useEffect(() => {
    if (isPlaying && progress < 100) {
      timerRef.current = setInterval(() => {
        setProgress(prev => {
          const next = prev + 0.5 * speed;
          if (next >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return next;
        });
      }, 100);
      return () => clearInterval(timerRef.current);
    }
  }, [isPlaying, speed, progress]);

  // Update data when progress changes
  useEffect(() => {
    updateData(progress);
  }, [progress, updateData]);

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setTimeSeriesData([]);
    setSpectrumData([]);
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (!isPlaying) updateData(val);
  };

  const endpointTime = 50;
  const isNearEndpoint = progress >= 45 && progress <= 55;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur rounded-xl p-4 border border-gray-700/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Endpoint Detection 시뮬레이션
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              SiO₂ 마스크 / Si 식각 / TiN Etch Stop — CF₄/O₂ 플라즈마
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              progress < 45 ? 'bg-blue-600 text-white' :
              progress < 55 ? 'bg-yellow-600 text-white animate-pulse' :
              'bg-red-600 text-white'
            }`}>
              {progress < 45 ? 'Etching Si' : progress < 55 ? 'ENDPOINT' : 'Over-etch'}
            </span>
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
        <div className="flex items-center gap-4">
          <button onClick={() => progress >= 100 ? handleReset() : setIsPlaying(!isPlaying)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
              isPlaying ? 'bg-yellow-600 hover:bg-yellow-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}>
            {progress >= 100 ? '↺' : isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={handleReset}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm">
            Reset
          </button>

          {/* Seek bar */}
          <div className="flex-1">
            <input type="range" min="0" max="100" step="0.5" value={progress} onChange={handleSeek}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 45%, #F59E0B 45%, #F59E0B 55%, #EF4444 55%, #EF4444 100%)`
              }}/>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Si Etch</span>
              <span className="text-yellow-500">Endpoint</span>
              <span className="text-red-500">Over-etch</span>
            </div>
          </div>

          {/* Speed */}
          <div className="flex items-center gap-1">
            {[0.5, 1, 2, 4].map(s => (
              <button key={s} onClick={() => setSpeed(s)}
                className={`px-2 py-1 text-xs rounded ${speed === s ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {s}x
              </button>
            ))}
          </div>

          <span className="text-sm font-mono text-gray-400 min-w-[50px] text-right">
            {progress.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Main Content: Cross-section + Spectrum */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Wafer Cross-Section */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
          <h3 className="text-sm font-bold text-gray-300 mb-2">Wafer Cross-Section</h3>
          <div className="aspect-[17/13]">
            <WaferCrossSection progress={progress} isPlaying={isPlaying} />
          </div>
          {/* Material legend */}
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {[
              { color: '#60A5FA', label: 'SiO₂ (Mask)' },
              { color: '#64748B', label: 'Si (Target)' },
              { color: '#F59E0B', label: 'TiN (Etch Stop)' },
              { color: '#374151', label: 'Substrate' },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: m.color }}/>
                <span className="text-[10px] text-gray-400">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: OES Spectrum */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-300">OES Spectrum (Real-time)</h3>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={showAnnotations} onChange={e => setShowAnnotations(e.target.checked)}
                className="rounded"/>
              <span className="text-[10px] text-gray-400">Peak Labels</span>
            </label>
          </div>
          <div className="h-[250px]">
            {spectrumData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spectrumData} margin={{ top: 5, right: 15, bottom: 20, left: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3}/>
                  <XAxis dataKey="wavelength" type="number" domain={[200, 950]}
                    stroke="#6B7280" tick={{ fontSize: 9, fill: '#9CA3AF' }}
                    label={{ value: 'Wavelength (nm)', position: 'insideBottom', offset: -12, fill: '#9CA3AF', fontSize: 10 }}/>
                  <YAxis stroke="#6B7280" tick={{ fontSize: 9, fill: '#9CA3AF' }} domain={[0, 1]}
                    label={{ value: 'Intensity', angle: -90, position: 'insideLeft', fill: '#9CA3AF', fontSize: 10 }}/>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '11px', color: '#E5E7EB' }}
                    formatter={val => [parseFloat(val).toFixed(3), 'Intensity']}
                    labelFormatter={val => `${val} nm`}/>
                  <Line type="monotone" dataKey="intensity" stroke="#818cf8" dot={false} strokeWidth={1.2} isAnimationActive={false}/>
                  {/* Peak annotations */}
                  {showAnnotations && Object.entries(ETCH_LINES).map(([key, line]) => {
                    const baseKey = key.replace(/\d+$/, '');
                    const intKey = Object.keys(calcIntensities(progress)).includes(key) ? key : baseKey;
                    const intensities = calcIntensities(progress);
                    if ((intensities[intKey] || 0) < 0.05) return null;
                    return (
                      <ReferenceLine key={key} x={line.wl} stroke={line.color} strokeDasharray="2 2" strokeWidth={0.8}
                        label={{ value: line.label, position: 'top', fill: line.color, fontSize: 7 }}/>
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600">
                <p>▶ 재생 버튼을 눌러 시뮬레이션을 시작하세요</p>
              </div>
            )}
          </div>

          {/* Key peaks status */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { key: 'SiF', label: 'SiF (440nm)', desc: 'Si etch byproduct', color: '#3B82F6' },
              { key: 'Ti', label: 'Ti (365nm)', desc: 'TiN exposed', color: '#F59E0B' },
              { key: 'F', label: 'F (685nm)', desc: 'Etchant', color: '#10B981' },
            ].map(item => {
              const v = calcIntensities(progress)[item.key];
              return (
                <div key={item.key} className="bg-gray-900 rounded-lg p-2 border border-gray-700/30">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}/>
                    <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.label}</span>
                  </div>
                  <p className="text-lg font-bold text-white mt-1">{v.toFixed(2)}</p>
                  <p className="text-[9px] text-gray-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time Series - Endpoint Detection Chart */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
        <h3 className="text-sm font-bold text-gray-300 mb-2">
          Emission Intensity vs Time (Endpoint Detection Signal)
        </h3>
        <div className="h-[220px]">
          {timeSeriesData.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 5, right: 15, bottom: 20, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3}/>
                <XAxis dataKey="time" type="number"
                  stroke="#6B7280" tick={{ fontSize: 9, fill: '#9CA3AF' }}
                  label={{ value: 'Process Progress (%)', position: 'insideBottom', offset: -12, fill: '#9CA3AF', fontSize: 10 }}/>
                <YAxis stroke="#6B7280" tick={{ fontSize: 9, fill: '#9CA3AF' }} domain={[0, 1]}/>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '11px', color: '#E5E7EB' }}/>
                <Legend wrapperStyle={{ fontSize: '10px' }}/>
                {/* Endpoint reference line */}
                <ReferenceLine x={endpointTime} stroke="#EF4444" strokeDasharray="4 3" strokeWidth={1.5}
                  label={{ value: 'Endpoint', position: 'top', fill: '#EF4444', fontSize: 10, fontWeight: 700 }}/>
                <Line type="monotone" dataKey="SiF" stroke="#3B82F6" dot={false} strokeWidth={2} name="SiF (440nm)"/>
                <Line type="monotone" dataKey="F" stroke="#10B981" dot={false} strokeWidth={1.5} name="F (685nm)"/>
                <Line type="monotone" dataKey="Ti" stroke="#F59E0B" dot={false} strokeWidth={2} name="Ti (365nm)"/>
                <Line type="monotone" dataKey="N" stroke="#A78BFA" dot={false} strokeWidth={1.5} name="N₂ (337nm)"/>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600">
              <p>재생하면 시간에 따른 피크 세기 변화가 표시됩니다</p>
            </div>
          )}
        </div>
      </div>

      {/* Explanation Panel */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
        <h3 className="text-sm font-bold text-gray-300 mb-3">공정 설명</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`rounded-lg p-3 border transition-all ${progress < 45 ? 'bg-blue-950/50 border-blue-500' : 'bg-gray-900 border-gray-700/30'}`}>
            <h4 className="text-blue-400 font-bold text-sm mb-1">1. Si 식각 단계</h4>
            <p className="text-xs text-gray-400">
              CF₄/O₂ 플라즈마에서 F 라디칼이 Si과 반응하여 <span className="text-blue-300 font-bold">SiF₄</span>가 생성됩니다.
              OES에서 SiF(440nm) 피크가 강하게 관측됩니다.
            </p>
          </div>
          <div className={`rounded-lg p-3 border transition-all ${isNearEndpoint ? 'bg-yellow-950/50 border-yellow-500 animate-pulse' : 'bg-gray-900 border-gray-700/30'}`}>
            <h4 className="text-yellow-400 font-bold text-sm mb-1">2. Endpoint 감지</h4>
            <p className="text-xs text-gray-400">
              Si가 소진되면 <span className="text-blue-300 font-bold">SiF 피크가 급감</span>하고,
              TiN 층이 노출되며 <span className="text-yellow-300 font-bold">Ti(365nm), N₂(337nm)</span> 피크가 출현합니다.
            </p>
          </div>
          <div className={`rounded-lg p-3 border transition-all ${progress >= 55 ? 'bg-red-950/50 border-red-500' : 'bg-gray-900 border-gray-700/30'}`}>
            <h4 className="text-red-400 font-bold text-sm mb-1">3. Over-etch 영역</h4>
            <p className="text-xs text-gray-400">
              Endpoint 이후에도 에칭을 계속하면 TiN이 서서히 손상됩니다.
              <span className="text-red-300 font-bold"> 정확한 Endpoint 감지</span>가 수율의 핵심입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OESEndpointDetection;
