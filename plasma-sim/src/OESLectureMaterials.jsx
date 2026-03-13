import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// CSS Keyframe Animations (injected once)
// ============================================================
const styleId = 'oes-lecture-animations';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes lectPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
    @keyframes lectBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
    @keyframes lectGlow { 0%,100%{text-shadow:0 0 5px rgba(99,102,241,0.5)} 50%{text-shadow:0 0 20px rgba(99,102,241,1),0 0 40px rgba(139,92,246,0.5)} }
    @keyframes lectUnderline { 0%{width:0} 100%{width:100%} }
    @keyframes lectFadeUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
    @keyframes lectSlideIn { 0%{opacity:0;transform:translateX(-30px)} 100%{opacity:1;transform:translateX(0)} }
    @keyframes lectFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes lectRotate { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
    @keyframes lectWave { 0%,100%{transform:scaleY(0.3)} 50%{transform:scaleY(1)} }
    @keyframes lectPhoton { 0%{transform:translateX(0);opacity:1} 100%{transform:translateX(120px);opacity:0} }
    @keyframes lectDash { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
    @keyframes lectScaleIn { 0%{transform:scale(0);opacity:0} 100%{transform:scale(1);opacity:1} }
    @keyframes lectTypewriter { from{width:0} to{width:100%} }
    @keyframes lectShimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    .lect-pulse { animation: lectPulse 2s ease-in-out infinite; }
    .lect-blink { animation: lectBlink 1.5s ease-in-out infinite; }
    .lect-glow { animation: lectGlow 2s ease-in-out infinite; }
    .lect-float { animation: lectFloat 3s ease-in-out infinite; }
    .lect-rotate { animation: lectRotate 8s linear infinite; }
    .lect-fade-up { animation: lectFadeUp 0.6s ease-out forwards; }
    .lect-slide-in { animation: lectSlideIn 0.5s ease-out forwards; }
    .lect-scale-in { animation: lectScaleIn 0.4s ease-out forwards; }
    .lect-underline-anim { position:relative; display:inline-block; }
    .lect-underline-anim::after { content:''; position:absolute; bottom:-2px; left:0; height:3px; background:linear-gradient(90deg,#818cf8,#c084fc); animation:lectUnderline 1s ease-out forwards; }
    .lect-shimmer { background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%); background-size: 200% 100%; animation: lectShimmer 3s linear infinite; }
    .lect-keyword { font-weight:700; color:#a78bfa; animation:lectGlow 2.5s ease-in-out infinite; }
    .lect-highlight { background:linear-gradient(120deg,rgba(99,102,241,0.3) 0%,rgba(139,92,246,0.3) 100%); padding:2px 8px; border-radius:4px; font-weight:600; }
    .lect-big { font-size:1.5em; font-weight:800; color:#818cf8; animation:lectPulse 2s ease-in-out infinite; display:inline-block; }
    .lect-formula { font-family:'Courier New',monospace; background:rgba(0,0,0,0.4); padding:12px 20px; border-radius:8px; border-left:4px solid #818cf8; margin:12px 0; font-size:1.1em; color:#e0e7ff; display:block; }
  `;
  document.head.appendChild(style);
}

// ============================================================
// Emphasis Components
// ============================================================
const Keyword = ({ children }) => <span className="lect-keyword">{children}</span>;
const Highlight = ({ children }) => <span className="lect-highlight">{children}</span>;
const Big = ({ children }) => <span className="lect-big">{children}</span>;
const Blink = ({ children }) => <span className="lect-blink" style={{display:'inline-block',color:'#fbbf24',fontWeight:700}}>{children}</span>;
const Underline = ({ children }) => <span className="lect-underline-anim">{children}</span>;
const Formula = ({ children }) => <span className="lect-formula">{children}</span>;
const FadeUp = ({ children, delay = 0 }) => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{opacity: show?1:0, transform: show?'translateY(0)':'translateY(20px)', transition:'all 0.6s ease-out'}}>{children}</div>;
};


// ============================================================
// SVG Illustrations for Slides
// ============================================================
const PlasmaGlowSVG = () => (
  <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
    <defs>
      <radialGradient id="pglow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8">
          <animate attributeName="stopOpacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stopColor="#4c1d95" stopOpacity="0"/>
      </radialGradient>
      <filter id="pblur"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <rect x="30" y="30" width="240" height="140" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2"/>
    <circle cx="150" cy="100" r="50" fill="url(#pglow)" filter="url(#pblur)">
      <animate attributeName="r" values="45;55;45" dur="3s" repeatCount="indefinite"/>
    </circle>
    {[0,1,2,3,4,5].map(i => (
      <circle key={i} cx={100+Math.random()*100} cy={60+Math.random()*80} r="2" fill="#e0e7ff" opacity="0.8">
        <animate attributeName="cx" values={`${100+i*20};${120+i*15};${100+i*20}`} dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur={`${1+i*0.2}s`} repeatCount="indefinite"/>
      </circle>
    ))}
    <text x="150" y="185" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="600">Plasma Chamber</text>
  </svg>
);

const EnergyLevelSVG = () => (
  <svg viewBox="0 0 300 220" className="w-full max-w-md mx-auto">
    <defs>
      <marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,6 L3,0 L6,6" fill="#818cf8"/>
      </marker>
      <marker id="arrowDown" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L3,6 L6,0" fill="#f59e0b"/>
      </marker>
    </defs>
    {/* Ground state */}
    <line x1="60" y1="180" x2="240" y2="180" stroke="#6366f1" strokeWidth="3"/>
    <text x="45" y="184" fill="#a5b4fc" fontSize="11" textAnchor="end">E₀</text>
    <text x="255" y="184" fill="#94a3b8" fontSize="10">Ground State</text>
    {/* Excited states */}
    <line x1="60" y1="120" x2="240" y2="120" stroke="#818cf8" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="45" y="124" fill="#a5b4fc" fontSize="11" textAnchor="end">E₁</text>
    <line x1="60" y1="70" x2="240" y2="70" stroke="#a78bfa" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="45" y="74" fill="#a5b4fc" fontSize="11" textAnchor="end">E₂</text>
    <text x="255" y="74" fill="#94a3b8" fontSize="10">Excited States</text>
    {/* Excitation arrow */}
    <line x1="110" y1="175" x2="110" y2="75" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowUp)">
      <animate attributeName="stroke-dashoffset" values="200;0" dur="2s" repeatCount="indefinite"/>
    </line>
    <text x="95" y="130" fill="#818cf8" fontSize="10" textAnchor="end">여기</text>
    {/* De-excitation arrow + photon */}
    <line x1="190" y1="75" x2="190" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowDown)"/>
    <text x="205" y="130" fill="#f59e0b" fontSize="10">이완</text>
    {/* Photon wavy line */}
    <path d="M200,120 Q210,115 215,120 Q220,125 225,120 Q230,115 235,120 Q240,125 250,120" fill="none" stroke="#fbbf24" strokeWidth="2">
      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
    </path>
    <text x="255" y="118" fill="#fbbf24" fontSize="10">hν</text>
    <text x="150" y="210" textAnchor="middle" fill="#94a3b8" fontSize="11">ΔE = hν = hc/λ</text>
  </svg>
);

const SpectrometerSVG = () => (
  <svg viewBox="0 0 320 200" className="w-full max-w-md mx-auto">
    <defs>
      <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6366f1"/>
        <stop offset="25%" stopColor="#06b6d4"/>
        <stop offset="50%" stopColor="#22c55e"/>
        <stop offset="75%" stopColor="#eab308"/>
        <stop offset="100%" stopColor="#ef4444"/>
      </linearGradient>
    </defs>
    {/* Slit */}
    <rect x="20" y="80" width="8" height="40" rx="2" fill="#374151"/>
    <line x1="24" y1="95" x2="24" y2="105" stroke="#fbbf24" strokeWidth="2"/>
    <text x="24" y="75" textAnchor="middle" fill="#94a3b8" fontSize="9">Slit</text>
    {/* Light beam */}
    <line x1="28" y1="100" x2="100" y2="100" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7">
      <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite"/>
    </line>
    {/* Lens */}
    <ellipse cx="105" cy="100" rx="5" ry="25" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <text x="105" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Lens</text>
    {/* Collimated beam */}
    <line x1="110" y1="100" x2="170" y2="100" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6"/>
    {/* Grating */}
    <rect x="170" y="70" width="12" height="60" rx="2" fill="#4338ca" stroke="#818cf8" strokeWidth="1"/>
    {[0,1,2,3,4,5,6,7].map(i => (
      <line key={i} x1="172" y1={74+i*7} x2="180" y2={74+i*7} stroke="#a5b4fc" strokeWidth="0.5"/>
    ))}
    <text x="176" y="63" textAnchor="middle" fill="#94a3b8" fontSize="9">Grating</text>
    {/* Dispersed beams */}
    <line x1="182" y1="90" x2="260" y2="60" stroke="#6366f1" strokeWidth="1.5" opacity="0.8"/>
    <line x1="182" y1="95" x2="260" y2="80" stroke="#06b6d4" strokeWidth="1.5" opacity="0.8"/>
    <line x1="182" y1="100" x2="260" y2="100" stroke="#22c55e" strokeWidth="1.5" opacity="0.8"/>
    <line x1="182" y1="105" x2="260" y2="120" stroke="#eab308" strokeWidth="1.5" opacity="0.8"/>
    <line x1="182" y1="110" x2="260" y2="140" stroke="#ef4444" strokeWidth="1.5" opacity="0.8"/>
    {/* CCD Detector */}
    <rect x="260" y="50" width="40" height="100" rx="4" fill="#1f2937" stroke="#6366f1" strokeWidth="1.5"/>
    <rect x="265" y="55" width="30" height="90" rx="2" fill="url(#rainbow)" opacity="0.3">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite"/>
    </rect>
    <text x="280" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">CCD Detector</text>
  </svg>
);

const OESSystemSVG = () => (
  <svg viewBox="0 0 340 220" className="w-full max-w-lg mx-auto">
    <defs>
      <radialGradient id="chamberGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0"/>
      </radialGradient>
    </defs>
    {/* Chamber */}
    <rect x="20" y="40" width="120" height="100" rx="8" fill="#1e1b4b" stroke="#4338ca" strokeWidth="2"/>
    <circle cx="80" cy="90" r="30" fill="url(#chamberGlow)">
      <animate attributeName="r" values="28;35;28" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <text x="80" y="155" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="600">Plasma Chamber</text>
    {/* Viewport */}
    <rect x="140" y="75" width="20" height="30" rx="3" fill="#312e81" stroke="#818cf8" strokeWidth="1.5"/>
    <text x="150" y="118" textAnchor="middle" fill="#94a3b8" fontSize="8">Viewport</text>
    {/* Fiber */}
    <path d="M160,90 C180,90 180,90 210,90" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,2">
      <animate attributeName="stroke-dashoffset" values="12;0" dur="1s" repeatCount="indefinite"/>
    </path>
    <text x="185" y="82" textAnchor="middle" fill="#94a3b8" fontSize="8">Optical Fiber</text>
    {/* Spectrometer */}
    <rect x="210" y="65" width="60" height="50" rx="6" fill="#1f2937" stroke="#6366f1" strokeWidth="2"/>
    <text x="240" y="88" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="600">Spectro-</text>
    <text x="240" y="100" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="600">meter</text>
    <text x="240" y="128" textAnchor="middle" fill="#94a3b8" fontSize="8">분광기</text>
    {/* Cable */}
    <line x1="270" y1="90" x2="290" y2="90" stroke="#4ade80" strokeWidth="2"/>
    {/* Computer */}
    <rect x="290" y="70" width="40" height="40" rx="4" fill="#1f2937" stroke="#22c55e" strokeWidth="1.5"/>
    <rect x="295" y="75" width="30" height="22" rx="2" fill="#064e3b"/>
    {/* Spectrum bars on screen */}
    {[0,1,2,3,4].map(i => (
      <rect key={i} x={298+i*6} y={97-[10,15,8,18,12][i]} width="3" height={[10,15,8,18,12][i]} fill={['#6366f1','#06b6d4','#22c55e','#eab308','#ef4444'][i]} rx="1">
        <animate attributeName="height" values={`${[10,15,8,18,12][i]};${[13,18,11,21,15][i]};${[10,15,8,18,12][i]}`} dur={`${1.5+i*0.2}s`} repeatCount="indefinite"/>
      </rect>
    ))}
    <text x="310" y="128" textAnchor="middle" fill="#94a3b8" fontSize="8">PC / Software</text>
    {/* Title */}
    <text x="170" y="200" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="700">OES System Configuration</text>
  </svg>
);

const SpectrumPeaksSVG = ({ gasName = 'Ar', color = '#8B5CF6' }) => {
  const peaks = gasName === 'Ar' ? [696,750,763,811,842] :
                gasName === 'O' ? [533,615,777,844] :
                gasName === 'N2' ? [337,357,391,427] :
                [252,685,703,713];
  return (
    <svg viewBox="0 0 300 160" className="w-full max-w-md mx-auto">
      <line x1="30" y1="130" x2="280" y2="130" stroke="#4b5563" strokeWidth="1"/>
      <line x1="30" y1="130" x2="30" y2="20" stroke="#4b5563" strokeWidth="1"/>
      <text x="155" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Wavelength (nm)</text>
      <text x="15" y="75" fill="#94a3b8" fontSize="10" transform="rotate(-90,15,75)">Intensity</text>
      {peaks.map((p, i) => {
        const x = 30 + ((p - 200) / 800) * 250;
        const h = 30 + Math.random() * 70;
        return (
          <g key={i}>
            <rect x={x-3} y={130-h} width="6" height={h} fill={color} opacity="0.8" rx="1">
              <animate attributeName="height" values={`${h};${h+10};${h}`} dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
              <animate attributeName="y" values={`${130-h};${130-h-10};${130-h}`} dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
            </rect>
            <text x={x} y={130-h-5} textAnchor="middle" fill={color} fontSize="8">{p}</text>
          </g>
        );
      })}
    </svg>
  );
};

const BoltzmannSVG = () => (
  <svg viewBox="0 0 300 180" className="w-full max-w-md mx-auto">
    {/* Boltzmann distribution curve */}
    <line x1="40" y1="150" x2="270" y2="150" stroke="#4b5563" strokeWidth="1"/>
    <line x1="40" y1="150" x2="40" y2="20" stroke="#4b5563" strokeWidth="1"/>
    <text x="155" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">Energy (eV)</text>
    <text x="15" y="85" fill="#94a3b8" fontSize="9" transform="rotate(-90,15,85)">Population</text>
    <path d="M45,40 Q80,42 110,60 Q150,90 190,120 Q230,140 265,148" fill="none" stroke="#818cf8" strokeWidth="2.5">
      <animate attributeName="stroke-dashoffset" values="300;0" dur="2s" fill="freeze"/>
    </path>
    <circle cx="70" cy="42" r="4" fill="#22c55e">
      <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
    </circle>
    <text x="70" y="35" textAnchor="middle" fill="#22c55e" fontSize="9">n₀ (ground)</text>
    <circle cx="190" cy="120" r="4" fill="#f59e0b"/>
    <text x="190" y="113" textAnchor="middle" fill="#f59e0b" fontSize="9">nₖ (excited)</text>
    <text x="155" y="15" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="600">Boltzmann Distribution</text>
  </svg>
);

const ActinometrySVG = () => (
  <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
    {/* Two gas comparison */}
    <text x="150" y="20" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="700">Actinometry Principle</text>
    {/* Gas X */}
    <rect x="20" y="40" width="120" height="70" rx="8" fill="#1e1b4b" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="80" y="60" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="600">Reactive Gas (X)</text>
    <text x="80" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">I_X at λ_X</text>
    <circle cx="80" cy="98" r="4" fill="#ef4444">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    {/* Gas A (actinometer) */}
    <rect x="160" y="40" width="120" height="70" rx="8" fill="#1e1b4b" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="220" y="60" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="600">Actinometer (A)</text>
    <text x="220" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">I_A at λ_A</text>
    <circle cx="220" cy="98" r="4" fill="#22c55e">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    {/* Ratio */}
    <rect x="60" y="130" width="180" height="50" rx="8" fill="#0f172a" stroke="#818cf8" strokeWidth="2"/>
    <text x="150" y="155" textAnchor="middle" fill="#e0e7ff" fontSize="13" fontWeight="700">n_X ∝ I_X / I_A</text>
    <text x="150" y="172" textAnchor="middle" fill="#94a3b8" fontSize="9">밀도 비례 관계</text>
    {/* Arrows */}
    <line x1="80" y1="110" x2="120" y2="130" stroke="#ef4444" strokeWidth="1.5"/>
    <line x1="220" y1="110" x2="180" y2="130" stroke="#22c55e" strokeWidth="1.5"/>
  </svg>
);

const EndpointDetectionSVG = () => (
  <svg viewBox="0 0 300 180" className="w-full max-w-md mx-auto">
    <text x="150" y="18" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="700">Endpoint Detection</text>
    <line x1="40" y1="150" x2="270" y2="150" stroke="#4b5563" strokeWidth="1"/>
    <line x1="40" y1="150" x2="40" y2="25" stroke="#4b5563" strokeWidth="1"/>
    <text x="155" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">Time</text>
    <text x="15" y="90" fill="#94a3b8" fontSize="9" transform="rotate(-90,15,90)">OES Intensity</text>
    {/* Etching signal - stable then drops */}
    <path d="M45,50 L100,50 L105,48 L110,52 L115,50 L160,50 L170,80 L180,120 L190,140 L260,142" fill="none" stroke="#818cf8" strokeWidth="2.5"/>
    {/* Endpoint marker */}
    <line x1="165" y1="30" x2="165" y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3">
      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
    </line>
    <text x="165" y="26" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700">Endpoint!</text>
    {/* Regions */}
    <text x="100" y="40" textAnchor="middle" fill="#22c55e" fontSize="9">Etching</text>
    <text x="230" y="135" textAnchor="middle" fill="#f59e0b" fontSize="9">Over-etch</text>
  </svg>
);


const WavelengthColorSVG = () => (
  <svg viewBox="0 0 300 100" className="w-full max-w-md mx-auto">
    <defs>
      <linearGradient id="visSpectrum" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7c3aed"/>
        <stop offset="15%" stopColor="#3b82f6"/>
        <stop offset="30%" stopColor="#06b6d4"/>
        <stop offset="45%" stopColor="#22c55e"/>
        <stop offset="60%" stopColor="#eab308"/>
        <stop offset="75%" stopColor="#f97316"/>
        <stop offset="100%" stopColor="#ef4444"/>
      </linearGradient>
    </defs>
    <rect x="20" y="20" width="260" height="30" rx="6" fill="url(#visSpectrum)" opacity="0.8"/>
    <text x="20" y="68" fill="#a78bfa" fontSize="10">380nm</text>
    <text x="80" y="68" fill="#06b6d4" fontSize="10">480nm</text>
    <text x="150" y="68" fill="#22c55e" fontSize="10">550nm</text>
    <text x="210" y="68" fill="#f97316" fontSize="10">620nm</text>
    <text x="260" y="68" fill="#ef4444" fontSize="10">780nm</text>
    <text x="150" y="90" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">Visible Spectrum (가시광선 영역)</text>
  </svg>
);

const DiffractionGratingSVG = () => (
  <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
    <text x="150" y="18" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="700">Diffraction Grating</text>
    {/* Incoming light */}
    <line x1="30" y1="100" x2="120" y2="100" stroke="#fbbf24" strokeWidth="2"/>
    <text x="75" y="92" textAnchor="middle" fill="#fbbf24" fontSize="9">White Light</text>
    {/* Grating */}
    <rect x="120" y="40" width="15" height="120" rx="2" fill="#312e81" stroke="#6366f1" strokeWidth="1.5"/>
    {Array.from({length:12}).map((_,i) => (
      <line key={i} x1="122" y1={45+i*10} x2="133" y2={45+i*10} stroke="#818cf8" strokeWidth="0.7"/>
    ))}
    {/* Dispersed colors */}
    <line x1="135" y1="80" x2="260" y2="45" stroke="#7c3aed" strokeWidth="2" opacity="0.8"/>
    <line x1="135" y1="90" x2="260" y2="70" stroke="#3b82f6" strokeWidth="2" opacity="0.8"/>
    <line x1="135" y1="100" x2="260" y2="100" stroke="#22c55e" strokeWidth="2" opacity="0.8"/>
    <line x1="135" y1="110" x2="260" y2="130" stroke="#eab308" strokeWidth="2" opacity="0.8"/>
    <line x1="135" y1="120" x2="260" y2="155" stroke="#ef4444" strokeWidth="2" opacity="0.8"/>
    <text x="272" y="48" fill="#7c3aed" fontSize="9">UV</text>
    <text x="272" y="73" fill="#3b82f6" fontSize="9">Blue</text>
    <text x="272" y="103" fill="#22c55e" fontSize="9">Green</text>
    <text x="272" y="133" fill="#eab308" fontSize="9">Yellow</text>
    <text x="272" y="158" fill="#ef4444" fontSize="9">Red</text>
    <text x="150" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">d·sinθ = mλ (회절 조건)</text>
  </svg>
);

const CCDDetectorSVG = () => (
  <svg viewBox="0 0 300 180" className="w-full max-w-md mx-auto">
    <text x="150" y="18" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="700">CCD Linear Array Detector</text>
    {/* CCD chip */}
    <rect x="40" y="40" width="220" height="60" rx="6" fill="#0f172a" stroke="#6366f1" strokeWidth="2"/>
    {/* Pixel array */}
    {Array.from({length:20}).map((_,i) => {
      const h = 10 + Math.sin(i*0.5)*20 + Math.random()*15;
      const colors = ['#6366f1','#818cf8','#06b6d4','#22c55e','#84cc16','#eab308','#f59e0b','#ef4444'];
      return (
        <rect key={i} x={50+i*10} y={90-h} width="8" height={h} fill={colors[i%8]} opacity="0.7" rx="1">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur={`${1.5+i*0.1}s`} repeatCount="indefinite"/>
        </rect>
      );
    })}
    {/* Labels */}
    <text x="150" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">← λ_min ─── Pixel Array ─── λ_max →</text>
    <text x="150" y="145" textAnchor="middle" fill="#e0e7ff" fontSize="10">각 픽셀 = 특정 파장 범위의 광자 수 측정</text>
    <text x="150" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">Resolution ~ 0.1-1.0 nm/pixel</text>
  </svg>
);


const PlasmaProcessSVG = () => (
  <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
    <text x="150" y="18" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="700">Plasma Process Monitoring</text>
    {/* Chamber */}
    <rect x="60" y="40" width="180" height="100" rx="10" fill="#1e1b4b" stroke="#4338ca" strokeWidth="2"/>
    {/* Wafer */}
    <rect x="100" y="115" width="100" height="8" rx="2" fill="#475569" stroke="#94a3b8" strokeWidth="1"/>
    <text x="150" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">Wafer</text>
    {/* Plasma glow */}
    <ellipse cx="150" cy="80" rx="60" ry="25" fill="#7c3aed" opacity="0.2">
      <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/>
    </ellipse>
    {/* Particles */}
    {[0,1,2,3,4,5].map(i => (
      <circle key={i} cx={100+i*20} cy={70+Math.sin(i)*15} r="2" fill="#e0e7ff">
        <animate attributeName="cy" values={`${70+Math.sin(i)*15};${80+Math.cos(i)*15};${70+Math.sin(i)*15}`} dur={`${1+i*0.2}s`} repeatCount="indefinite"/>
      </circle>
    ))}
    {/* Gas in */}
    <text x="30" y="70" fill="#22c55e" fontSize="9">Gas In →</text>
    {/* Pump */}
    <text x="255" y="130" fill="#f59e0b" fontSize="9">→ Pump</text>
    {/* OES viewport */}
    <rect x="240" y="72" width="15" height="16" rx="2" fill="#312e81" stroke="#818cf8" strokeWidth="1"/>
    <path d="M255,80 L280,80" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,2">
      <animate attributeName="stroke-dashoffset" values="10;0" dur="0.8s" repeatCount="indefinite"/>
    </path>
    <text x="290" y="83" fill="#fbbf24" fontSize="8">OES</text>
    <text x="150" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">실시간 공정 모니터링 가능</text>
  </svg>
);

const ElectronCollisionSVG = () => (
  <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
    <text x="150" y="18" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="700">Electron Impact Excitation</text>
    {/* Electron */}
    <circle cx="50" cy="100" r="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5">
      <animate attributeName="cx" values="50;120;50" dur="3s" repeatCount="indefinite"/>
    </circle>
    <text x="50" y="125" fill="#60a5fa" fontSize="9">e⁻</text>
    {/* Atom before */}
    <circle cx="150" cy="100" r="20" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
    <circle cx="150" cy="100" r="5" fill="#8b5cf6"/>
    {/* Orbital electron */}
    <circle cx="170" cy="100" r="3" fill="#22c55e">
      <animate attributeName="cx" values="170;170;190" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="100;100;70" dur="3s" repeatCount="indefinite"/>
    </circle>
    {/* Arrow */}
    <text x="100" y="85" fill="#94a3b8" fontSize="9">collision</text>
    {/* Photon emission */}
    <path d="M195,65 Q205,60 210,65 Q215,70 220,65 Q225,60 235,65" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0">
      <animate attributeName="opacity" values="0;0;1;0" dur="3s" repeatCount="indefinite"/>
    </path>
    <text x="230" y="55" fill="#fbbf24" fontSize="9" opacity="0">
      <animate attributeName="opacity" values="0;0;1;0" dur="3s" repeatCount="indefinite"/>
      hν
    </text>
    {/* Excited state indication */}
    <circle cx="150" cy="100" r="25" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,3" opacity="0">
      <animate attributeName="opacity" values="0;0;0.6;0" dur="3s" repeatCount="indefinite"/>
    </circle>
    <text x="150" y="155" textAnchor="middle" fill="#e0e7ff" fontSize="10">e⁻ + A → A* + e⁻ → A + hν + e⁻</text>
    <text x="150" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">전자 충돌 → 여기 → 광자 방출</text>
  </svg>
);


// ============================================================
// 30 Lecture Slides Data
// ============================================================
const createSlides = () => [
  // ---- SECTION 1: 개요 (Overview) ----
  {
    id: 1,
    section: '개요',
    title: 'OES란 무엇인가?',
    subtitle: 'Optical Emission Spectroscopy',
    gradient: 'from-violet-600 to-indigo-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            <Big>OES</Big>는 <Keyword>광학 발광 분광법</Keyword>으로,
            플라즈마에서 방출되는 <Underline>빛을 분석</Underline>하여
            내부 상태를 진단하는 기술입니다.
          </p>
        </FadeUp>
        <FadeUp delay={400}>
          <div className="bg-black/30 rounded-xl p-4 mt-4">
            <p className="text-base text-gray-300">
              플라즈마 내 입자들이 <Highlight>들뜬 상태에서 바닥 상태로 전이</Highlight>할 때
              방출하는 <Blink>고유한 파장의 빛</Blink>을 측정합니다.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={800}>
          <PlasmaGlowSVG />
        </FadeUp>
      </div>
    )
  },
  {
    id: 2,
    section: '개요',
    title: 'OES의 역사와 발전',
    subtitle: '분광학의 기원에서 반도체까지',
    gradient: 'from-indigo-600 to-blue-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-indigo-300 font-bold mb-2">역사적 배경</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• 1800년대: <Highlight>Kirchhoff & Bunsen</Highlight> - 원소별 스펙트럼 발견</li>
                <li>• 1913년: <Highlight>Bohr 모델</Highlight> - 양자화된 에너지 준위</li>
                <li>• 1960년대: 플라즈마 진단에 OES 적용 시작</li>
                <li>• 1980년대~: <Keyword>반도체 공정</Keyword> 모니터링 핵심 기술</li>
              </ul>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-indigo-300 font-bold mb-2">현대의 OES</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• 에칭/증착 <Keyword>실시간 모니터링</Keyword></li>
                <li>• <Underline>Endpoint Detection</Underline> (종점 검출)</li>
                <li>• 플라즈마 상태 진단 & 제어</li>
                <li>• <Blink>비접촉, 비파괴</Blink> 측정의 장점</li>
              </ul>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={500}>
          <WavelengthColorSVG />
        </FadeUp>
      </div>
    )
  },
  {
    id: 3,
    section: '개요',
    title: 'OES의 핵심 장점',
    subtitle: '왜 OES를 사용하는가?',
    gradient: 'from-blue-600 to-cyan-700',
    content: (
      <div className="space-y-4">
        {[
          { icon: '👁️', title: '비접촉 (Non-invasive)', desc: '플라즈마에 영향을 주지 않고 측정', delay: 0 },
          { icon: '⚡', title: '실시간 (Real-time)', desc: '공정 중 즉각적인 데이터 획득 가능', delay: 200 },
          { icon: '🎯', title: '원소 식별 (Species ID)', desc: '각 원자/분자의 고유 스펙트럼으로 식별', delay: 400 },
          { icon: '💰', title: '경제적 (Cost-effective)', desc: '비교적 간단한 장비 구성, 유지보수 용이', delay: 600 },
        ].map((item, i) => (
          <FadeUp key={i} delay={item.delay}>
            <div className="flex items-start gap-4 bg-black/20 rounded-xl p-4 border border-white/5">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h4 className="text-cyan-300 font-bold text-lg">{item.title}</h4>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    )
  },
  {
    id: 4,
    section: '개요',
    title: 'OES 시스템 구성',
    subtitle: 'System Configuration',
    gradient: 'from-cyan-600 to-teal-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <OESSystemSVG />
        </FadeUp>
        <FadeUp delay={500}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { name: 'Viewport', desc: '챔버 창', color: 'border-violet-500' },
              { name: 'Fiber Optic', desc: '광섬유 전송', color: 'border-yellow-500' },
              { name: 'Spectrometer', desc: '분광기', color: 'border-blue-500' },
              { name: 'PC/Software', desc: '데이터 분석', color: 'border-green-500' },
            ].map((c, i) => (
              <div key={i} className={`bg-black/30 rounded-lg p-3 border-l-4 ${c.color}`}>
                <p className="font-bold text-sm text-white">{c.name}</p>
                <p className="text-xs text-gray-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    )
  },

  // ---- SECTION 2: 원리 (Principles) ----
  {
    id: 5,
    section: '원리',
    title: '빛의 발생 원리',
    subtitle: 'Emission Mechanism',
    gradient: 'from-purple-600 to-violet-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            플라즈마 속 <Keyword>고에너지 전자</Keyword>가 원자와 충돌하면,
            원자의 전자가 <Underline>들뜬 상태(Excited State)</Underline>로 전이됩니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <EnergyLevelSVG />
        </FadeUp>
        <FadeUp delay={600}>
          <Formula>
            ΔE = E₂ - E₁ = hν = hc/λ
          </Formula>
          <p className="text-sm text-gray-400 mt-2">
            h = 6.626×10⁻³⁴ J·s (플랑크 상수), c = 3×10⁸ m/s (광속), λ = 파장
          </p>
        </FadeUp>
      </div>
    )
  },
  {
    id: 6,
    section: '원리',
    title: '전자 충돌 여기',
    subtitle: 'Electron Impact Excitation',
    gradient: 'from-violet-600 to-purple-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <ElectronCollisionSVG />
        </FadeUp>
        <FadeUp delay={400}>
          <div className="bg-black/30 rounded-xl p-4">
            <p className="text-base leading-relaxed text-gray-300">
              <Keyword>전자 충돌 여기</Keyword>는 OES 신호의 주요 원인입니다:
            </p>
            <Formula>e⁻(fast) + A(ground) → A*(excited) + e⁻(slow)</Formula>
            <Formula>A*(excited) → A(ground) + hν (photon)</Formula>
            <p className="text-sm text-gray-400 mt-2">
              여기서 A*는 들뜬 상태의 원자, hν는 방출된 광자입니다.
              방출 광자의 파장은 <Highlight>원자 고유의 에너지 준위 차이</Highlight>에 의해 결정됩니다.
            </p>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 7,
    section: '원리',
    title: '원자 스펙트럼의 특성',
    subtitle: 'Atomic Emission Lines',
    gradient: 'from-indigo-600 to-violet-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg">
            각 원자는 <Big>고유한 발광선</Big>을 가지며,
            이것은 원자의 <Keyword>전자 구조</Keyword>에 의해 결정됩니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-violet-300 font-bold mb-2">Argon (Ar) Spectrum</h4>
              <SpectrumPeaksSVG gasName="Ar" color="#8B5CF6" />
              <p className="text-xs text-gray-400 text-center">주요 라인: 750.4, 763.5, <Blink>811.5nm</Blink></p>
            </div>
            <div>
              <h4 className="text-red-300 font-bold mb-2">Oxygen (O) Spectrum</h4>
              <SpectrumPeaksSVG gasName="O" color="#EF4444" />
              <p className="text-xs text-gray-400 text-center">주요 라인: <Blink>777.4nm</Blink>, 844.6nm</p>
            </div>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 8,
    section: '원리',
    title: '분자 스펙트럼',
    subtitle: 'Molecular Band Spectra',
    gradient: 'from-blue-600 to-indigo-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            <Keyword>분자</Keyword>는 원자와 달리 <Underline>회전·진동 에너지 준위</Underline>가 
            추가되어 <Highlight>밴드 스펙트럼</Highlight>을 형성합니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-blue-300 font-bold mb-2">N₂ Band Spectrum</h4>
              <SpectrumPeaksSVG gasName="N2" color="#3B82F6" />
              <p className="text-xs text-gray-400 text-center">SPS: 337.1nm (가장 강한 밴드)</p>
            </div>
            <div>
              <h4 className="text-green-300 font-bold mb-2">CF₄ Fragments</h4>
              <SpectrumPeaksSVG gasName="CF4" color="#10B981" />
              <p className="text-xs text-gray-400 text-center">CF₂, CF, F 라디칼 발광</p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <Formula>
            E_total = E_electronic + E_vibrational + E_rotational
          </Formula>
        </FadeUp>
      </div>
    )
  },
  {
    id: 9,
    section: '원리',
    title: '발광 세기와 플라즈마 변수',
    subtitle: 'Emission Intensity Relationship',
    gradient: 'from-teal-600 to-blue-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            OES <Keyword>발광 세기</Keyword>는 플라즈마의 여러 변수에 의존합니다:
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <Formula>
            I_λ = n_e · n_X · {'<σ·v>'}_exc · A_ki / (Σ A_kj)
          </Formula>
          <div className="bg-black/20 rounded-lg p-4 mt-3 space-y-1 text-sm text-gray-300">
            <p>• <Highlight>n_e</Highlight> : 전자 밀도 (electron density)</p>
            <p>• <Highlight>n_X</Highlight> : 여기 대상 입자 밀도</p>
            <p>• <Highlight>{'<σ·v>'}_exc</Highlight> : 여기 속도 계수 (excitation rate coefficient)</p>
            <p>• <Highlight>A_ki</Highlight> : Einstein 자발 전이 확률 (transition probability)</p>
            <p>• <Highlight>Σ A_kj</Highlight> : 상위 준위에서의 모든 전이 확률의 합</p>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <p className="text-sm text-yellow-300/80">
            ⚠️ 발광 세기는 n_e와 n_X <Underline>모두에 의존</Underline>하므로, 
            단순한 세기 비교만으로는 밀도를 직접 결정할 수 없습니다!
          </p>
        </FadeUp>
      </div>
    )
  },
  {
    id: 10,
    section: '원리',
    title: '여기 속도 계수',
    subtitle: 'Excitation Rate Coefficient',
    gradient: 'from-purple-600 to-pink-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            <Keyword>여기 속도 계수</Keyword>는 전자 에너지 분포 함수(EEDF)와 
            충돌 단면적의 적분으로 결정됩니다:
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <Formula>
            {'<σ·v>'}_exc = ∫₀^∞ σ_exc(ε) · v(ε) · f(ε) dε
          </Formula>
          <div className="bg-black/20 rounded-lg p-4 mt-3 space-y-1 text-sm text-gray-300">
            <p>• <Highlight>σ_exc(ε)</Highlight> : 여기 충돌 단면적 (energy dependent)</p>
            <p>• <Highlight>v(ε)</Highlight> : 전자 속도 = √(2ε/m_e)</p>
            <p>• <Highlight>f(ε)</Highlight> : 전자 에너지 분포 함수 (EEDF)</p>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <BoltzmannSVG />
          <p className="text-sm text-gray-400 text-center mt-2">
            <Highlight>전자 온도(T_e)</Highlight>가 높을수록 고에너지 전자 비율 증가 → 여기율 증가
          </p>
        </FadeUp>
      </div>
    )
  },

  // ---- SECTION 3: 분광기 구조 (Spectrometer) ----
  {
    id: 11,
    section: '분광기 구조',
    title: '분광기의 핵심: 회절격자',
    subtitle: 'Diffraction Grating',
    gradient: 'from-emerald-600 to-teal-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <DiffractionGratingSVG />
        </FadeUp>
        <FadeUp delay={400}>
          <div className="bg-black/30 rounded-xl p-4">
            <p className="text-base leading-relaxed text-gray-300 mb-3">
              <Keyword>회절격자</Keyword>는 미세한 홈(groove)이 촘촘히 새겨진 광학 소자로,
              빛을 파장별로 <Underline>공간적으로 분리</Underline>합니다.
            </p>
            <Formula>d · sin(θ) = m · λ</Formula>
            <p className="text-sm text-gray-400 mt-2">
              d = 격자 간격, θ = 회절 각도, m = 회절 차수, λ = 파장
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={700}>
          <p className="text-sm text-cyan-300">
            일반적 OES 격자: <Highlight>1200-3600 grooves/mm</Highlight> → 높은 분해능
          </p>
        </FadeUp>
      </div>
    )
  },
  {
    id: 12,
    section: '분광기 구조',
    title: 'CCD 검출기',
    subtitle: 'Charge-Coupled Device Detector',
    gradient: 'from-teal-600 to-cyan-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <CCDDetectorSVG />
        </FadeUp>
        <FadeUp delay={400}>
          <div className="bg-black/30 rounded-xl p-4 space-y-3">
            <p className="text-base text-gray-300">
              <Keyword>CCD(전하결합소자)</Keyword> 검출기가 분광된 빛을 전기 신호로 변환합니다.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 p-3 rounded-lg">
                <p className="text-cyan-300 font-bold text-sm">파장 범위</p>
                <p className="text-white text-lg font-bold">200~1100 nm</p>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <p className="text-cyan-300 font-bold text-sm">분해능</p>
                <p className="text-white text-lg font-bold">~0.1 nm</p>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <p className="text-cyan-300 font-bold text-sm">측정 속도</p>
                <p className="text-white text-lg font-bold">~ms 단위</p>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <p className="text-cyan-300 font-bold text-sm">픽셀 수</p>
                <p className="text-white text-lg font-bold">2048~4096</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 13,
    section: '분광기 구조',
    title: '광학 해상도와 기기 함수',
    subtitle: 'Spectral Resolution & Instrument Function',
    gradient: 'from-cyan-600 to-blue-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            분광기의 <Keyword>스펙트럼 분해능(Resolution)</Keyword>은 
            두 인접 파장을 구분할 수 있는 능력을 나타냅니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <Formula>R = λ / Δλ</Formula>
          <div className="bg-black/20 rounded-lg p-4 mt-3">
            <p className="text-sm text-gray-300">
              • <Highlight>Δλ</Highlight>: 최소 구분 파장 차이 (FWHM of instrument function)
            </p>
            <p className="text-sm text-gray-300 mt-1">
              • R이 클수록 더 미세한 스펙트럼 구조를 관찰 가능
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-blue-300 font-bold mb-2">기기 함수 (Instrument Function)</h4>
            <p className="text-sm text-gray-300">
              실제 측정된 스펙트럼은 <Underline>실제 발광 스펙트럼</Underline>과 
              <Highlight>기기 함수의 컨볼루션</Highlight>입니다:
            </p>
            <Formula>I_measured(λ) = I_real(λ) ⊛ G(λ)</Formula>
            <p className="text-xs text-gray-400 mt-2">
              G(λ)는 주로 Gaussian 또는 Voigt 함수 형태
            </p>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 14,
    section: '분광기 구조',
    title: 'Czerny-Turner 분광기',
    subtitle: '가장 널리 사용되는 구조',
    gradient: 'from-indigo-600 to-purple-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <SpectrometerSVG />
        </FadeUp>
        <FadeUp delay={400}>
          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-purple-300 font-bold mb-3">Czerny-Turner 구조 특징</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>1. <Highlight>입사 슬릿(Slit)</Highlight>: 빛의 입구, 폭이 분해능에 영향</p>
              <p>2. <Highlight>콜리메이팅 미러</Highlight>: 발산광을 평행광으로 변환</p>
              <p>3. <Highlight>회절격자</Highlight>: 파장별 분산 (핵심 분광 소자)</p>
              <p>4. <Highlight>포커싱 미러</Highlight>: 분산된 빛을 검출기에 집속</p>
              <p>5. <Highlight>CCD 검출기</Highlight>: 전체 파장을 동시에 측정</p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={700}>
          <p className="text-sm text-yellow-300/80">
            💡 슬릿 폭 ↓ → 분해능 ↑ 이지만 <Blink>빛 투과량 ↓</Blink> (트레이드오프)
          </p>
        </FadeUp>
      </div>
    )
  },

  // ---- SECTION 4: 수식과 정량분석 ----
  {
    id: 15,
    section: '수식과 정량분석',
    title: 'Corona 모델',
    subtitle: 'Corona Equilibrium Model',
    gradient: 'from-rose-600 to-pink-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            저밀도 플라즈마에서는 <Keyword>Corona 모델</Keyword>이 적용됩니다:
            <Underline>전자 충돌 여기</Underline>와 <Underline>자발 복사</Underline>만 고려합니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-pink-300 font-bold mb-2">가정 조건</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>✓ 여기: <Highlight>전자 충돌</Highlight>만 (e⁻ + A → A* + e⁻)</li>
              <li>✓ 이완: <Highlight>자발 복사</Highlight>만 (A* → A + hν)</li>
              <li>✗ 무시: 입자 충돌 이완, 재흡수, 다단계 여기</li>
            </ul>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <Formula>
            n_k = n_e · n₀ · {'<σ_exc·v>'} / A_k
          </Formula>
          <Formula>
            I_ki = n_k · A_ki · hν_ki / (4π)
          </Formula>
          <p className="text-sm text-gray-400 mt-2">
            n_k: 들뜬 상태 밀도, A_k: 총 전이 확률, A_ki: k→i 전이 확률
          </p>
        </FadeUp>
      </div>
    )
  },
  {
    id: 16,
    section: '수식과 정량분석',
    title: 'Boltzmann Plot 방법',
    subtitle: '전자 온도 측정',
    gradient: 'from-orange-600 to-rose-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            <Keyword>Boltzmann Plot</Keyword>은 같은 원소의 여러 발광선을 이용하여
            <Big>전자 온도(T_e)</Big>를 결정하는 방법입니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <Formula>
            ln(I_ki · λ_ki / (g_k · A_ki)) = -E_k / (k_B · T_exc) + C
          </Formula>
          <div className="bg-black/20 rounded-lg p-4 mt-3 text-sm text-gray-300 space-y-1">
            <p>• <Highlight>I_ki</Highlight>: 발광선 세기</p>
            <p>• <Highlight>g_k</Highlight>: 상위 준위의 통계적 가중치 (degeneracy)</p>
            <p>• <Highlight>E_k</Highlight>: 상위 준위 에너지</p>
            <p>• <Highlight>k_B</Highlight>: 볼츠만 상수 (1.38×10⁻²³ J/K)</p>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <div className="bg-black/30 rounded-xl p-4">
            <p className="text-sm text-gray-300">
              y축: ln(Iλ/gA) vs x축: E_k 로 플롯하면 
              <Highlight>기울기 = -1/(k_B · T_exc)</Highlight>에서 온도 결정!
            </p>
            <BoltzmannSVG />
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 17,
    section: '수식과 정량분석',
    title: 'Actinometry (악티노메트리)',
    subtitle: '정량적 밀도 측정',
    gradient: 'from-amber-600 to-orange-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            <Keyword>Actinometry</Keyword>는 알려진 농도의 <Underline>기준 가스(actinometer)</Underline>를 
            소량 첨가하여, 라디칼의 <Big>절대 밀도</Big>를 추정하는 기법입니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <ActinometrySVG />
        </FadeUp>
        <FadeUp delay={600}>
          <Formula>
            n_X / n_A = (I_X / I_A) · (k_A / k_X) · (A_A / A_X)
          </Formula>
          <div className="bg-black/20 rounded-lg p-4 mt-3 text-sm text-gray-300">
            <p>• <Highlight>Actinometer</Highlight>: 보통 <Blink>Ar (750.4nm)</Blink> 사용</p>
            <p>• 조건: 두 전이의 여기 문턱 에너지가 비슷해야 함</p>
            <p>• 장점: n_e 의존성이 상쇄되어 밀도 비율 직접 측정 가능</p>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 18,
    section: '수식과 정량분석',
    title: '스펙트럼 정규화',
    subtitle: 'Spectrum Normalization',
    gradient: 'from-yellow-600 to-amber-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            <Keyword>정규화(Normalization)</Keyword>는 스펙트럼 데이터를 비교 가능하게 만드는 
            <Underline>필수적인 전처리</Underline> 과정입니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-amber-300 font-bold mb-2">Max Normalization</h4>
              <Formula>I_norm = I(λ) / I_max</Formula>
              <p className="text-xs text-gray-400 mt-2">최대 피크를 1로 스케일링</p>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-amber-300 font-bold mb-2">Area Normalization</h4>
              <Formula>I_norm = I(λ) / ∫I(λ)dλ</Formula>
              <p className="text-xs text-gray-400 mt-2">전체 면적을 1로 스케일링</p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-amber-300 font-bold mb-2">Reference Line Normalization</h4>
            <Formula>I_norm(λ) = I(λ) / I_ref</Formula>
            <p className="text-xs text-gray-400 mt-2">
              <Highlight>Ar 811.5nm</Highlight> 등 안정적인 기준선 대비 비율 → 공정 조건 변화 모니터링에 유리
            </p>
          </div>
        </FadeUp>
      </div>
    )
  },

  // ---- SECTION 5: 응용 (Applications) ----
  {
    id: 19,
    section: '응용',
    title: 'Endpoint Detection (종점 검출)',
    subtitle: '에칭 공정의 핵심 응용',
    gradient: 'from-red-600 to-rose-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <EndpointDetectionSVG />
        </FadeUp>
        <FadeUp delay={400}>
          <div className="bg-black/30 rounded-xl p-4">
            <p className="text-base leading-relaxed text-gray-300">
              <Keyword>종점 검출</Keyword>은 에칭 공정에서 <Underline>대상 물질이 완전히 제거되는 시점</Underline>을 
              OES로 감지하는 기술입니다.
            </p>
            <div className="mt-3 space-y-2 text-sm text-gray-300">
              <p>• 에칭 대상 물질의 <Highlight>부산물 피크</Highlight>를 실시간 추적</p>
              <p>• 피크 세기가 <Blink>급격히 변화</Blink>하는 순간 = Endpoint</p>
              <p>• 예: Si 에칭 시 SiF₄의 440nm 밴드 모니터링</p>
            </div>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 20,
    section: '응용',
    title: '플라즈마 공정 모니터링',
    subtitle: 'Process Monitoring & Control',
    gradient: 'from-pink-600 to-red-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <PlasmaProcessSVG />
        </FadeUp>
        <FadeUp delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-red-300 font-bold mb-2">모니터링 대상</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <Highlight>가스 조성</Highlight> 변화 감지</li>
                <li>• <Highlight>플라즈마 밀도</Highlight> 변동 추적</li>
                <li>• <Highlight>오염 물질</Highlight> (Air leak, H₂O) 검출</li>
                <li>• 챔버 벽 상태 (chamber wall condition)</li>
              </ul>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-red-300 font-bold mb-2">제어 활용</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <Keyword>APC</Keyword> (Advanced Process Control)</li>
                <li>• Run-to-Run 제어</li>
                <li>• Fault Detection & Classification</li>
                <li>• <Underline>Virtual Metrology</Underline> 입력 데이터</li>
              </ul>
            </div>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 21,
    section: '응용',
    title: '가스별 주요 발광선',
    subtitle: 'Key Emission Lines by Gas',
    gradient: 'from-violet-600 to-pink-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg">
            반도체 공정에서 자주 사용되는 가스들의 <Keyword>주요 발광선</Keyword>입니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2 text-gray-300">가스/Species</th>
                  <th className="text-left p-2 text-gray-300">파장 (nm)</th>
                  <th className="text-left p-2 text-gray-300">전이</th>
                  <th className="text-left p-2 text-gray-300">용도</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {[
                  ['Ar I', '811.5', '4p→4s', '기준선 / Actinometry'],
                  ['Ar I', '750.4', '4p→4s', 'Actinometer'],
                  ['O I', '777.4', '3p⁵P→3s⁵S', '산소 라디칼 모니터링'],
                  ['N₂', '337.1', 'C³Πu→B³Πg', '질소 오염 검출'],
                  ['F I', '685.6', '3p→3s', '불소 라디칼 (에칭)'],
                  ['CF₂', '251.9', 'Ã→X̃', 'CF₄ 해리 모니터링'],
                  ['H_α', '656.3', 'n=3→2', '수소 플라즈마'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-700/50">
                    <td className="p-2 font-bold text-indigo-300">{row[0]}</td>
                    <td className="p-2"><Highlight>{row[1]}</Highlight></td>
                    <td className="p-2 font-mono text-xs">{row[2]}</td>
                    <td className="p-2 text-xs">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 22,
    section: '응용',
    title: '공정 이상 감지',
    subtitle: 'Fault Detection with OES',
    gradient: 'from-red-600 to-orange-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            OES는 <Keyword>공정 이상</Keyword>을 실시간으로 감지하는 강력한 도구입니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="space-y-3">
            {[
              { fault: 'Air Leak (공기 누출)', sign: 'N₂ 337nm, O 777nm 피크 비정상 출현', color: 'border-red-500', icon: '🚨' },
              { fault: 'Gas Flow 이상', sign: '특정 가스 피크 세기 급변', color: 'border-yellow-500', icon: '⚠️' },
              { fault: 'Chamber Contamination', sign: '비정상적 피크 출현 (Si, Al, Cu 등)', color: 'border-orange-500', icon: '🔍' },
              { fault: 'RF Power Drift', sign: '전체 스펙트럼 세기 비례적 변화', color: 'border-purple-500', icon: '📡' },
            ].map((item, i) => (
              <div key={i} className={`bg-black/20 rounded-xl p-4 border-l-4 ${item.color} flex items-start gap-3`}>
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="text-white font-bold">{item.fault}</h4>
                  <p className="text-sm text-gray-400">감지 방법: <Highlight>{item.sign}</Highlight></p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    )
  },

  // ---- SECTION 6: 사용 방법 (Practical Usage) ----
  {
    id: 23,
    section: '사용 방법',
    title: 'OES 측정 절차',
    subtitle: 'Step-by-Step Measurement',
    gradient: 'from-green-600 to-emerald-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg">
            <Keyword>OES 측정</Keyword>의 표준 절차를 단계별로 알아봅니다.
          </p>
        </FadeUp>
        <FadeUp delay={200}>
          <div className="space-y-3">
            {[
              { step: 1, title: '장비 연결', desc: '광섬유 → Viewport에 정렬, 분광기 → PC 연결' },
              { step: 2, title: 'Dark Spectrum 측정', desc: '플라즈마 OFF 상태에서 배경 노이즈 측정' },
              { step: 3, title: '파장 보정 (Calibration)', desc: '수은(Hg) 램프 등으로 파장 정확도 확인' },
              { step: 4, title: 'Integration Time 설정', desc: '노출 시간 최적화 (너무 짧으면 노이즈, 너무 길면 포화)' },
              { step: 5, title: '플라즈마 점화 & 측정', desc: '플라즈마 ON 후 스펙트럼 연속 측정 시작' },
              { step: 6, title: '데이터 처리', desc: 'Dark 보정 → 정규화 → 피크 식별 → 분석' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">{item.step}</span>
                <div>
                  <h4 className="text-emerald-300 font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 24,
    section: '사용 방법',
    title: 'Dark Spectrum 보정',
    subtitle: 'Background Subtraction',
    gradient: 'from-emerald-600 to-green-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            <Keyword>Dark Spectrum</Keyword>은 플라즈마가 꺼진 상태에서 측정한 배경 신호로,
            실제 측정에서 <Underline>반드시 차감</Underline>해야 합니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <Formula>
            I_corrected(λ) = I_measured(λ) - I_dark(λ)
          </Formula>
        </FadeUp>
        <FadeUp delay={500}>
          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-green-300 font-bold mb-2">Dark Spectrum에 포함되는 것들</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• <Highlight>CCD 암전류</Highlight> (Dark Current): 열에 의한 전자 생성</li>
              <li>• <Highlight>전자 노이즈</Highlight>: 회로 내 열 잡음</li>
              <li>• <Highlight>주변광</Highlight>: 외부 광원에 의한 배경</li>
              <li>• <Highlight>고정 패턴 노이즈</Highlight>: 픽셀별 감도 차이</li>
            </ul>
          </div>
        </FadeUp>
        <FadeUp delay={700}>
          <p className="text-sm text-yellow-300/80">
            💡 Tip: 온도가 변하면 Dark Spectrum도 변하므로, <Blink>주기적으로 재측정</Blink> 필요!
          </p>
        </FadeUp>
      </div>
    )
  },
  {
    id: 25,
    section: '사용 방법',
    title: '파장 보정 (Wavelength Calibration)',
    subtitle: 'Ensuring Accuracy',
    gradient: 'from-lime-600 to-emerald-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            <Keyword>파장 보정</Keyword>은 CCD 픽셀 위치를 정확한 파장으로 변환하는 과정입니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-lime-300 font-bold mb-2">보정 방법</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>1. <Highlight>기준 광원</Highlight> 사용 (Hg, Ne, Ar lamp)</p>
              <p>2. 알려진 파장의 피크 위치 측정</p>
              <p>3. <Underline>다항식 피팅</Underline>으로 pixel → wavelength 변환식 결정</p>
            </div>
            <Formula>
              λ(pixel) = a₀ + a₁·p + a₂·p² + a₃·p³
            </Formula>
            <p className="text-xs text-gray-400 mt-2">
              보통 3차 다항식이면 충분한 정확도 확보
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <div className="bg-black/20 rounded-lg p-3 text-sm text-gray-300">
            <p><Blink>⚠️</Blink> 보정 정확도가 떨어지면 피크 식별 오류 발생!</p>
            <p className="text-xs text-gray-400 mt-1">
              일반적 요구 정확도: ±0.1~0.5 nm
            </p>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 26,
    section: '사용 방법',
    title: '피크 분석 방법',
    subtitle: 'Peak Identification & Analysis',
    gradient: 'from-teal-600 to-green-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            측정된 스펙트럼에서 <Keyword>피크를 식별</Keyword>하고 분석하는 것이 OES의 핵심입니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-teal-300 font-bold mb-2">피크 식별 절차</h4>
              <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                <li>노이즈 제거 (Smoothing)</li>
                <li>피크 검출 (Threshold 기반)</li>
                <li><Highlight>파장 매칭</Highlight> (DB 조회)</li>
                <li>피크 강도 계산</li>
                <li>Species 동정</li>
              </ol>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-teal-300 font-bold mb-2">피크 파라미터</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <Highlight>위치(λ₀)</Highlight>: 중심 파장</li>
                <li>• <Highlight>높이(I₀)</Highlight>: 최대 세기</li>
                <li>• <Highlight>FWHM</Highlight>: 반치전폭</li>
                <li>• <Highlight>면적</Highlight>: 적분 세기</li>
                <li>• <Highlight>S/N</Highlight>: 신호 대 잡음비</li>
              </ul>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <Formula>
            FWHM ≈ 2.355 · σ (Gaussian 피크의 경우)
          </Formula>
        </FadeUp>
      </div>
    )
  },
  {
    id: 27,
    section: '사용 방법',
    title: 'Integration Time 최적화',
    subtitle: 'Optimizing Signal Quality',
    gradient: 'from-cyan-600 to-teal-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            <Keyword>Integration Time</Keyword>(적분 시간)은 CCD가 광자를 수집하는 시간으로,
            <Underline>신호 품질</Underline>에 직접적으로 영향을 줍니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <p className="text-red-400 font-bold text-sm">너무 짧으면</p>
              <p className="text-3xl my-2">📉</p>
              <p className="text-xs text-gray-400">낮은 S/N ratio</p>
              <p className="text-xs text-gray-400">노이즈에 묻힘</p>
            </div>
            <div className="bg-black/30 rounded-xl p-4 text-center border border-green-500/30">
              <p className="text-green-400 font-bold text-sm">최적 설정</p>
              <p className="text-3xl my-2">✅</p>
              <p className="text-xs text-gray-400">좋은 S/N ratio</p>
              <p className="text-xs text-gray-400">포화 없음</p>
            </div>
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <p className="text-red-400 font-bold text-sm">너무 길면</p>
              <p className="text-3xl my-2">📈</p>
              <p className="text-xs text-gray-400">CCD 포화</p>
              <p className="text-xs text-gray-400">시간 분해능 ↓</p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <Formula>
            S/N ∝ √(Integration Time)
          </Formula>
          <p className="text-sm text-gray-400 text-center mt-2">
            적분 시간을 4배로 하면 S/N은 <Highlight>2배</Highlight> 향상
          </p>
        </FadeUp>
      </div>
    )
  },

  // ---- SECTION 7: 고급 주제 ----
  {
    id: 28,
    section: '고급 주제',
    title: 'OES와 머신러닝',
    subtitle: 'AI-Driven Plasma Diagnostics',
    gradient: 'from-fuchsia-600 to-purple-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg leading-relaxed">
            최근 <Big>머신러닝</Big>과 <Keyword>OES</Keyword>의 결합이 
            플라즈마 진단의 새로운 패러다임을 열고 있습니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-fuchsia-300 font-bold mb-2">ML 활용 분야</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <Highlight>PCA</Highlight>: 스펙트럼 차원 축소</li>
                <li>• <Highlight>CNN</Highlight>: 스펙트럼 패턴 인식</li>
                <li>• <Highlight>LSTM</Highlight>: 시계열 예측</li>
                <li>• <Highlight>Autoencoder</Highlight>: 이상 감지</li>
              </ul>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-fuchsia-300 font-bold mb-2">적용 사례</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Virtual Metrology (가상 계측)</li>
                <li>• Predictive Maintenance</li>
                <li>• <Underline>실시간 공정 최적화</Underline></li>
                <li>• 결함 자동 분류</li>
              </ul>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <div className="bg-black/20 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-300">
              OES 풀 스펙트럼 (~2000 파장점) → <Keyword>ML 모델</Keyword> → 공정 상태 예측
            </p>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 29,
    section: '고급 주제',
    title: 'OES vs 다른 진단 기법',
    subtitle: 'Comparison with Other Diagnostics',
    gradient: 'from-purple-600 to-indigo-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <p className="text-lg">
            OES를 다른 플라즈마 진단 기법과 <Keyword>비교</Keyword>해봅니다.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2 text-gray-300">기법</th>
                  <th className="text-left p-2 text-gray-300">측정 대상</th>
                  <th className="text-left p-2 text-gray-300">침습성</th>
                  <th className="text-left p-2 text-gray-300">장점</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-700/50 bg-indigo-900/20">
                  <td className="p-2 font-bold text-indigo-300">OES</td>
                  <td className="p-2">발광 종 조성</td>
                  <td className="p-2"><span className="text-green-400">비침습</span></td>
                  <td className="p-2">실시간, 저비용</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="p-2 font-bold text-gray-300">Langmuir Probe</td>
                  <td className="p-2">n_e, T_e, EEPF</td>
                  <td className="p-2"><span className="text-red-400">침습</span></td>
                  <td className="p-2">직접 측정</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="p-2 font-bold text-gray-300">Mass Spec (QMS)</td>
                  <td className="p-2">중성 종/이온</td>
                  <td className="p-2"><span className="text-yellow-400">반침습</span></td>
                  <td className="p-2">정량적</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="p-2 font-bold text-gray-300">LIF</td>
                  <td className="p-2">특정 종 밀도</td>
                  <td className="p-2"><span className="text-green-400">비침습</span></td>
                  <td className="p-2">공간분해</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="p-2 font-bold text-gray-300">Impedance Probe</td>
                  <td className="p-2">임피던스</td>
                  <td className="p-2"><span className="text-green-400">비침습</span></td>
                  <td className="p-2">전기적 진단</td>
                </tr>
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    )
  },
  {
    id: 30,
    section: '고급 주제',
    title: '정리 및 핵심 요약',
    subtitle: 'Summary & Key Takeaways',
    gradient: 'from-indigo-600 to-violet-700',
    content: (
      <div className="space-y-4">
        <FadeUp>
          <div className="text-center mb-4">
            <Big>OES 핵심 정리</Big>
          </div>
        </FadeUp>
        <FadeUp delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: '원리', items: ['전자 충돌 여기 → 광자 방출', 'ΔE = hν = hc/λ', '각 원소 고유의 발광선'], color: 'border-violet-500' },
              { title: '장비', items: ['Viewport → 광섬유 → 분광기 → CCD', '회절격자로 파장 분해', '200~1100nm 범위 측정'], color: 'border-blue-500' },
              { title: '분석', items: ['피크 식별 & Species 동정', 'Actinometry (정량 분석)', 'Boltzmann Plot (온도)'], color: 'border-green-500' },
              { title: '응용', items: ['Endpoint Detection', '공정 모니터링 & 제어', 'Fault Detection + ML'], color: 'border-orange-500' },
            ].map((box, i) => (
              <div key={i} className={`bg-black/30 rounded-xl p-4 border-l-4 ${box.color}`}>
                <h4 className="text-white font-bold mb-2">{box.title}</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  {box.items.map((item, j) => <li key={j}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={600}>
          <div className="bg-gradient-to-r from-indigo-900/50 to-violet-900/50 rounded-xl p-4 text-center border border-indigo-500/30">
            <p className="text-lg text-white font-bold">
              OES = <Keyword>빛으로 플라즈마를 읽는 기술</Keyword>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              비접촉 · 실시간 · 경제적 — 반도체 공정의 <Blink>필수 진단 도구</Blink>
            </p>
          </div>
        </FadeUp>
      </div>
    )
  },
];


// ============================================================
// Main Lecture Materials Component
// ============================================================
const OESLectureMaterials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const containerRef = useRef(null);

  const slides = createSlides();
  const totalSlides = slides.length;
  const slide = slides[currentSlide];

  // Section info
  const sections = [...new Set(slides.map(s => s.section))];
  const sectionColors = {
    '개요': 'bg-violet-600',
    '원리': 'bg-purple-600',
    '분광기 구조': 'bg-teal-600',
    '수식과 정량분석': 'bg-orange-600',
    '응용': 'bg-red-600',
    '사용 방법': 'bg-green-600',
    '고급 주제': 'bg-fuchsia-600',
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setSlideDirection(index > currentSlide ? 'next' : 'prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
      setShowOverview(false);
    }, 200);
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      if (e.key === 'Escape') setShowOverview(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentSlide, isAnimating]);

  return (
    <div className="space-y-4" ref={containerRef}>
      {/* Header Bar */}
      <div className="bg-gray-800/80 backdrop-blur rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-gray-700/50">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎓</span>
          <div>
            <h2 className="text-xl font-bold text-white">OES 강의 자료</h2>
            <p className="text-sm text-gray-400">Optical Emission Spectroscopy — Interactive Lecture</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-full ${sectionColors[slide.section] || 'bg-gray-600'} text-white font-semibold`}>
            {slide.section}
          </span>
          <button
            onClick={() => setShowOverview(!showOverview)}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            {showOverview ? '✕ 닫기' : '📋 전체 목차'}
          </button>
        </div>
      </div>

      {/* Overview Panel */}
      {showOverview && (
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-bold text-white mb-3">전체 슬라이드 목차</h3>
          <div className="space-y-2">
            {sections.map(section => (
              <div key={section}>
                <h4 className={`text-sm font-bold px-2 py-1 rounded ${sectionColors[section]} text-white mb-1`}>
                  {section}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 ml-2">
                  {slides.filter(s => s.section === section).map(s => (
                    <button
                      key={s.id}
                      onClick={() => goToSlide(s.id - 1)}
                      className={`text-left px-3 py-2 rounded-lg text-xs transition-all ${
                        currentSlide === s.id - 1
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                      }`}
                    >
                      <span className="font-bold">{s.id}.</span> {s.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Slide Content */}
      <div
        className={`bg-gradient-to-br ${slide.gradient} rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isAnimating
            ? slideDirection === 'next' ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'
            : 'opacity-100 translate-x-0'
        }`}
        style={{ minHeight: '520px' }}
      >
        {/* Slide Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-white/60 font-mono">
              {String(slide.id).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <span className="text-xs text-white/40">|</span>
            <span className="text-xs text-white/60">{slide.section}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{slide.title}</h2>
          <p className="text-sm text-white/60 mt-1">{slide.subtitle}</p>
        </div>

        {/* Slide Body */}
        <div className="px-6 sm:px-8 py-6 text-white overflow-y-auto" style={{ maxHeight: '420px' }}>
          {slide.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
            currentSlide === 0
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-105'
          }`}
        >
          ← 이전
        </button>

        {/* Slide dots (mini) */}
        <div className="hidden md:flex items-center gap-1 flex-wrap justify-center max-w-md">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentSlide
                  ? 'bg-indigo-400 scale-125'
                  : i < currentSlide
                  ? 'bg-indigo-600/60 hover:bg-indigo-500'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              title={`${i + 1}. ${slides[i].title}`}
            />
          ))}
        </div>

        {/* Mobile slide counter */}
        <div className="md:hidden text-sm text-gray-400 font-mono">
          {currentSlide + 1} / {totalSlides}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
            currentSlide === totalSlides - 1
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 shadow-lg shadow-indigo-600/30'
          }`}
        >
          다음 →
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="text-center text-xs text-gray-500">
        💡 키보드: ← → 방향키 또는 Space로 넘기기 | ESC로 목차 닫기
      </div>
    </div>
  );
};

export default OESLectureMaterials;
