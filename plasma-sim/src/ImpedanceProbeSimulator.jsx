import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// ============================================================
// Story Step SVG Illustrations for Impedance Probe
// ============================================================
const ImpedanceStoryIllustration = ({ step, isVisible }) => {
  const illustrations = {
    0: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <rect x="40" y="60" width="220" height="180" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2"/>
        <text x="150" y="45" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">RF 플라즈마 시스템</text>
        <rect x="55" y="80" width="60" height="40" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
        <text x="85" y="105" textAnchor="middle" fill="#93c5fd" fontSize="9">RF Gen</text>
        <text x="85" y="115" textAnchor="middle" fill="#60a5fa" fontSize="7">13.56MHz</text>
        <line x1="115" y1="100" x2="140" y2="100" stroke="#fbbf24" strokeWidth="2"/>
        <rect x="140" y="75" width="55" height="50" rx="6" fill="#422006" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="167" y="98" textAnchor="middle" fill="#fcd34d" fontSize="8">Matching</text>
        <text x="167" y="110" textAnchor="middle" fill="#fbbf24" fontSize="7">Network</text>
        <rect x="60" y="155" width="80" height="70" rx="8" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5"/>
        <ellipse cx="100" cy="185" rx="25" ry="20" fill="#7c3aed" opacity="0.4">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
        </ellipse>
        <text x="100" y="190" textAnchor="middle" fill="#c4b5fd" fontSize="8">Plasma</text>
        <rect x="155" y="145" width="90" height="35" rx="6" fill="#0c4a2e" stroke="#10b981" strokeWidth="2">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
        </rect>
        <text x="200" y="160" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">VI Probe</text>
        <text x="200" y="172" textAnchor="middle" fill="#34d399" fontSize="7">V, I, θ 측정</text>
        <text x="150" y="260" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">전력 효율의 비밀을 밝혀라!</text>
      </svg>
    ),
    1: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <text x="150" y="25" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">V, I, θ 관계</text>
        <line x1="40" y1="150" x2="280" y2="150" stroke="#475569" strokeWidth="1"/>
        <path d="M 40 150 Q 80 80 120 150 Q 160 220 200 150 Q 240 80 280 150" fill="none" stroke="#3b82f6" strokeWidth="2.5"/>
        <text x="270" y="100" fill="#60a5fa" fontSize="10">V</text>
        <path d="M 60 150 Q 100 90 140 150 Q 180 210 220 150 Q 260 90 280 135" fill="none" stroke="#ef4444" strokeWidth="2.5"/>
        <text x="270" y="130" fill="#fca5a5" fontSize="10">I</text>
        <path d="M 80 82 A 30 30 0 0 1 100 92" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        <text x="105" y="82" fill="#fcd34d" fontSize="10" fontWeight="bold">θ</text>
        <rect x="30" y="210" width="240" height="70" rx="8" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1"/>
        <text x="150" y="235" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">P = V × I × cos(θ)</text>
        <text x="150" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">θ=0° → 100% 효율 | θ=90° → 0%</text>
      </svg>
    ),
    2: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <text x="150" y="25" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">임피던스 매칭</text>
        <rect x="20" y="50" width="80" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
        <text x="60" y="72" textAnchor="middle" fill="#93c5fd" fontSize="9">RF Gen</text>
        <text x="60" y="87" textAnchor="middle" fill="#60a5fa" fontSize="8">50Ω</text>
        <line x1="100" y1="75" x2="130" y2="75" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="130" y="45" width="80" height="60" rx="6" fill="#422006" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="170" y="70" textAnchor="middle" fill="#fcd34d" fontSize="9">Matching</text>
        <text x="170" y="85" textAnchor="middle" fill="#fbbf24" fontSize="8">Z → 50Ω</text>
        <line x1="210" y1="75" x2="240" y2="75" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="240" y="50" width="50" height="50" rx="6" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5"/>
        <text x="265" y="72" textAnchor="middle" fill="#c4b5fd" fontSize="8">Plasma</text>
        <text x="265" y="86" textAnchor="middle" fill="#a78bfa" fontSize="7">Z_L</text>
        <text x="150" y="135" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">매칭 성공</text>
        <line x1="60" y1="155" x2="260" y2="155" stroke="#10b981" strokeWidth="2.5"/>
        <polygon points="260,155 252,150 252,160" fill="#10b981"/>
        <text x="160" y="170" textAnchor="middle" fill="#6ee7b7" fontSize="9">전력 100% →</text>
        <text x="150" y="200" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">매칭 실패</text>
        <line x1="60" y1="220" x2="180" y2="220" stroke="#3b82f6" strokeWidth="2"/>
        <polygon points="180,220 172,215 172,225" fill="#3b82f6"/>
        <line x1="180" y1="230" x2="90" y2="230" stroke="#ef4444" strokeWidth="2"/>
        <polygon points="90,230 98,225 98,235" fill="#ef4444"/>
        <text x="135" y="250" fill="#fca5a5" fontSize="8">Reflected!</text>
        <text x="150" y="280" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Γ = (Z_L - 50) / (Z_L + 50)</text>
      </svg>
    ),
    3: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <text x="150" y="25" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">소스별 임피던스 특성</text>
        <rect x="20" y="45" width="120" height="100" rx="8" fill="#172554" stroke="#3b82f6" strokeWidth="1.5"/>
        <text x="80" y="65" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">CCP</text>
        <line x1="55" y1="95" x2="65" y2="95" stroke="#60a5fa" strokeWidth="2"/>
        <line x1="65" y1="85" x2="65" y2="105" stroke="#60a5fa" strokeWidth="1"/>
        <line x1="75" y1="85" x2="75" y2="105" stroke="#60a5fa" strokeWidth="1"/>
        <line x1="75" y1="95" x2="85" y2="95" stroke="#60a5fa" strokeWidth="2"/>
        <text x="95" y="98" fill="#93c5fd" fontSize="7">+ R</text>
        <text x="80" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8">용량성 (X{'<'}0)</text>
        <rect x="160" y="45" width="120" height="100" rx="8" fill="#1e1b2e" stroke="#a855f7" strokeWidth="1.5"/>
        <text x="220" y="65" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="bold">ICP</text>
        <path d="M 195 95 Q 200 85 205 95 Q 210 105 215 95 Q 220 85 225 95" fill="none" stroke="#a78bfa" strokeWidth="2"/>
        <text x="240" y="98" fill="#c4b5fd" fontSize="7">+ R</text>
        <text x="220" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8">유도성 (X{'>'}0)</text>
        <rect x="30" y="170" width="240" height="100" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1"/>
        <text x="150" y="195" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">공정 변화 → 임피던스 변화</text>
        <text x="150" y="215" textAnchor="middle" fill="#94a3b8" fontSize="9">파워 ↑ → R ↓ | 압력 ↑ → R ↑</text>
        <text x="150" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">가스 변경 → Z 전체 변화</text>
        <text x="150" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">매칭이 계속 바뀌어야 하는 이유!</text>
      </svg>
    ),
    4: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <text x="150" y="25" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">당신도 진단 전문가!</text>
        {[
          { x: 50, y: 80, label: '스토리', icon: '📖' },
          { x: 150, y: 60, label: '이론', icon: '📐' },
          { x: 250, y: 80, label: '개요', icon: '🔍' },
          { x: 100, y: 160, label: '시뮬레이터', icon: '🖥️' },
          { x: 200, y: 160, label: '문제풀이', icon: '📝' },
        ].map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="28" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2">
              <animate attributeName="stroke" values="#818cf8;#c084fc;#818cf8" dur="3s" begin={`${i*0.4}s`} repeatCount="indefinite"/>
            </circle>
            <text x={n.x} y={n.y+5} textAnchor="middle" fontSize="20">{n.icon}</text>
            <text x={n.x} y={n.y+35} textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="bold">{n.label}</text>
          </g>
        ))}
        <text x="150" y="230" textAnchor="middle" fill="#fbbf24" fontSize="20">⭐</text>
        <text x="150" y="255" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">임피던스 진단 전문가</text>
      </svg>
    ),
  };
  return (
    <div className={`transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      {illustrations[step] || null}
    </div>
  );
};


// ============================================================
// CCP / ICP Source Diagram SVG
// ============================================================
const SourceDiagramSVG = ({ sourceType }) => {
  if (sourceType === 'CCP') return (
    <svg viewBox="0 0 260 200" className="w-full h-full">
      <text x="130" y="18" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">CCP (Capacitively Coupled Plasma)</text>
      {/* Chamber */}
      <rect x="50" y="30" width="160" height="140" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
      {/* Top electrode */}
      <rect x="70" y="40" width="120" height="10" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1"/>
      <text x="130" y="48" textAnchor="middle" fill="#94a3b8" fontSize="6">상부 전극 (RF)</text>
      {/* Bottom electrode */}
      <rect x="70" y="140" width="120" height="10" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1"/>
      <text x="130" y="148" textAnchor="middle" fill="#94a3b8" fontSize="6">하부 전극 (Wafer)</text>
      {/* Sheath regions */}
      <rect x="75" y="52" width="110" height="12" rx="2" fill="#3b82f6" opacity="0.15"/>
      <text x="130" y="62" textAnchor="middle" fill="#60a5fa" fontSize="6">Sheath (C)</text>
      <rect x="75" y="126" width="110" height="12" rx="2" fill="#3b82f6" opacity="0.15"/>
      <text x="130" y="136" textAnchor="middle" fill="#60a5fa" fontSize="6">Sheath (C)</text>
      {/* Plasma bulk */}
      <ellipse cx="130" cy="95" rx="45" ry="25" fill="#7c3aed" opacity="0.25">
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      <text x="130" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">Plasma (R)</text>
      <text x="130" y="103" textAnchor="middle" fill="#a78bfa" fontSize="7">Bulk</text>
      {/* RF connection */}
      <line x1="130" y1="30" x2="130" y2="22" stroke="#f59e0b" strokeWidth="2"/>
      <text x="130" y="20" textAnchor="middle" fill="#fbbf24" fontSize="7">RF ~</text>
      {/* Equivalent circuit */}
      <text x="130" y="185" textAnchor="middle" fill="#94a3b8" fontSize="8">등가: C_sh + R_p + C_sh (용량성)</text>
      <text x="130" y="196" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">X {'<'} 0 | 추천: L-Type</text>
    </svg>
  );

  if (sourceType === 'ICP') return (
    <svg viewBox="0 0 260 200" className="w-full h-full">
      <text x="130" y="18" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold">ICP (Inductively Coupled Plasma)</text>
      {/* Chamber */}
      <rect x="50" y="30" width="160" height="140" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
      {/* Coil on top */}
      <path d="M 70 45 Q 85 35 100 45 Q 115 55 130 45 Q 145 35 160 45 Q 175 55 190 45" fill="none" stroke="#a855f7" strokeWidth="2.5"/>
      <text x="130" y="38" textAnchor="middle" fill="#c4b5fd" fontSize="6">RF 코일 (L)</text>
      {/* Dielectric window */}
      <rect x="65" y="50" width="130" height="6" rx="1" fill="#1e3a5f" stroke="#0ea5e9" strokeWidth="0.5"/>
      <text x="130" y="68" textAnchor="middle" fill="#67e8f9" fontSize="5">유전체 창</text>
      {/* Induced E-field arrows */}
      {[80,110,140,170].map((x,i) => (
        <g key={i}>
          <line x1={x} y1="75" x2={x} y2="95" stroke="#a78bfa" strokeWidth="1" opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${1.5+i*0.2}s`} repeatCount="indefinite"/>
          </line>
          <polygon points={`${x},95 ${x-3},88 ${x+3},88`} fill="#a78bfa" opacity="0.5"/>
        </g>
      ))}
      <text x="130" y="82" textAnchor="middle" fill="#c4b5fd" fontSize="6">유도 전기장</text>
      {/* Plasma bulk */}
      <ellipse cx="130" cy="115" rx="50" ry="25" fill="#7c3aed" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      <text x="130" y="112" textAnchor="middle" fill="#c4b5fd" fontSize="8">Plasma (R)</text>
      <text x="130" y="123" textAnchor="middle" fill="#a78bfa" fontSize="7">고밀도</text>
      {/* Bottom electrode */}
      <rect x="70" y="150" width="120" height="8" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1"/>
      <text x="130" y="157" textAnchor="middle" fill="#94a3b8" fontSize="5">Wafer (Bias)</text>
      {/* RF connection */}
      <line x1="130" y1="30" x2="130" y2="22" stroke="#f59e0b" strokeWidth="2"/>
      <text x="130" y="20" textAnchor="middle" fill="#fbbf24" fontSize="7">RF ~</text>
      {/* Equivalent circuit */}
      <text x="130" y="185" textAnchor="middle" fill="#94a3b8" fontSize="8">등가: L_coil + R_p (유도성)</text>
      <text x="130" y="196" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">X {'>'} 0 | 추천: Gamma-Type</text>
    </svg>
  );

  if (sourceType === 'Hybrid') return (
    <svg viewBox="0 0 260 200" className="w-full h-full">
      <text x="130" y="18" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">Hybrid (CCP + ICP Dual Source)</text>
      {/* Chamber */}
      <rect x="50" y="30" width="160" height="140" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
      {/* ICP Coil on top */}
      <path d="M 70 42 Q 85 32 100 42 Q 115 52 130 42 Q 145 32 160 42 Q 175 52 190 42" fill="none" stroke="#a855f7" strokeWidth="2">
        <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
      </path>
      <text x="130" y="36" textAnchor="middle" fill="#c4b5fd" fontSize="5">ICP 코일 (Source RF)</text>
      {/* Dielectric window */}
      <rect x="65" y="48" width="130" height="5" rx="1" fill="#1e3a5f" stroke="#0ea5e9" strokeWidth="0.5"/>
      {/* Induced E-field */}
      {[90,120,150].map((x,i) => (
        <g key={i}>
          <line x1={x} y1="58" x2={x} y2="72" stroke="#a78bfa" strokeWidth="0.8" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
          </line>
          <polygon points={`${x},72 ${x-2},67 ${x+2},67`} fill="#a78bfa" opacity="0.4"/>
        </g>
      ))}
      {/* Plasma bulk - larger due to dual source */}
      <ellipse cx="130" cy="100" rx="50" ry="28" fill="#7c3aed" opacity="0.35">
        <animate attributeName="opacity" values="0.25;0.45;0.25" dur="1.8s" repeatCount="indefinite"/>
      </ellipse>
      <text x="130" y="96" textAnchor="middle" fill="#c4b5fd" fontSize="7">Plasma</text>
      <text x="130" y="107" textAnchor="middle" fill="#e879f9" fontSize="6">고밀도 + 이온제어</text>
      {/* Bottom electrode (CCP bias) */}
      <rect x="70" y="138" width="120" height="10" rx="2" fill="#475569" stroke="#3b82f6" strokeWidth="1.2"/>
      <text x="130" y="146" textAnchor="middle" fill="#93c5fd" fontSize="5">하부 전극 (Bias RF)</text>
      {/* Sheath at bottom */}
      <rect x="75" y="128" width="110" height="8" rx="1" fill="#3b82f6" opacity="0.12"/>
      <text x="130" y="135" textAnchor="middle" fill="#60a5fa" fontSize="4.5">Sheath (C)</text>
      {/* Dual RF connections */}
      <line x1="130" y1="30" x2="130" y2="22" stroke="#a855f7" strokeWidth="1.5"/>
      <text x="130" y="20" textAnchor="middle" fill="#c4b5fd" fontSize="6">Source RF ~</text>
      <line x1="130" y1="148" x2="130" y2="160" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="130" y="168" textAnchor="middle" fill="#60a5fa" fontSize="6">Bias RF ~</text>
      {/* Equivalent circuit */}
      <text x="130" y="182" textAnchor="middle" fill="#94a3b8" fontSize="7">등가: L_coil + C_sh + R_p (복합)</text>
      <text x="130" y="194" textAnchor="middle" fill="#fb7185" fontSize="7" fontWeight="bold">X 부호 가변 | 추천: Pi-Type</text>
    </svg>
  );

  // Helicon
  return (
    <svg viewBox="0 0 260 200" className="w-full h-full">
      <text x="130" y="18" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="bold">Helicon Wave Plasma Source</text>
      {/* Chamber - cylindrical representation */}
      <rect x="50" y="30" width="160" height="140" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
      {/* Helicon antenna (double-saddle coil) */}
      <ellipse cx="130" cy="50" rx="55" ry="8" fill="none" stroke="#14b8a6" strokeWidth="2"/>
      <ellipse cx="130" cy="50" rx="55" ry="8" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite"/>
      </ellipse>
      <text x="130" y="38" textAnchor="middle" fill="#5eead4" fontSize="5">헬리콘 안테나</text>
      {/* Magnetic field lines (axial B0) */}
      {[85,110,135,160,175].map((x,i) => (
        <g key={i}>
          <line x1={x} y1="62" x2={x} y2="145" stroke="#2dd4bf" strokeWidth="0.6" opacity="0.25" strokeDasharray="2 3"/>
          <polygon points={`${x},145 ${x-2},139 ${x+2},139`} fill="#2dd4bf" opacity="0.3"/>
        </g>
      ))}
      <text x="215" y="100" textAnchor="start" fill="#2dd4bf" fontSize="5" transform="rotate(90,215,100)">B0 (축방향 자기장)</text>
      {/* Helicon wave pattern */}
      <path d={`M 70 95 Q 85 80 100 95 Q 115 110 130 95 Q 145 80 160 95 Q 175 110 190 95`}
        fill="none" stroke="#67e8f9" strokeWidth="1.2" opacity="0.5">
        <animate attributeName="stroke-dashoffset" values="0;-40" dur="1.5s" repeatCount="indefinite"/>
      </path>
      <text x="130" y="75" textAnchor="middle" fill="#67e8f9" fontSize="5">헬리콘 파동</text>
      {/* Ultra-high density plasma */}
      <ellipse cx="130" cy="110" rx="50" ry="22" fill="#7c3aed" opacity="0.45">
        <animate attributeName="opacity" values="0.3;0.55;0.3" dur="1.5s" repeatCount="indefinite"/>
      </ellipse>
      <text x="130" y="107" textAnchor="middle" fill="#e9d5ff" fontSize="7">Plasma</text>
      <text x="130" y="118" textAnchor="middle" fill="#c084fc" fontSize="6">초고밀도 (10¹³/cm³)</text>
      {/* Wafer */}
      <rect x="75" y="148" width="110" height="6" rx="2" fill="#475569" stroke="#64748b" strokeWidth="0.8"/>
      <text x="130" y="154" textAnchor="middle" fill="#94a3b8" fontSize="4.5">Wafer</text>
      {/* Magnet coils on sides */}
      <rect x="42" y="55" width="8" height="90" rx="2" fill="#0d9488" opacity="0.4" stroke="#14b8a6" strokeWidth="0.5"/>
      <rect x="210" y="55" width="8" height="90" rx="2" fill="#0d9488" opacity="0.4" stroke="#14b8a6" strokeWidth="0.5"/>
      <text x="38" y="100" textAnchor="middle" fill="#2dd4bf" fontSize="4" transform="rotate(-90,38,100)">전자석</text>
      {/* RF connection */}
      <line x1="130" y1="30" x2="130" y2="22" stroke="#f59e0b" strokeWidth="2"/>
      <text x="130" y="20" textAnchor="middle" fill="#fbbf24" fontSize="6">RF (13.56MHz)</text>
      {/* Equivalent circuit */}
      <text x="130" y="177" textAnchor="middle" fill="#94a3b8" fontSize="7">등가: L_ant + R_wave + R_p (강유도성)</text>
      <text x="130" y="190" textAnchor="middle" fill="#5eead4" fontSize="7" fontWeight="bold">X {'>'} 0 (강) | 낮은 R | 추천: T-Type</text>
    </svg>
  );
};

// ============================================================
// Matching Circuit SVG Diagrams per Topology
// ============================================================
const MatchingCircuitSVG = ({ type, c1, c2, c3, isMatched }) => {
  const glow = isMatched ? '#22c55e' : '#ef4444';
  const glowOp = isMatched ? 0.4 : 0.2;

  // Common SVG elements
  const rfSource = (
    <g>
      <rect x="5" y="55" width="40" height="30" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.2"/>
      <text x="25" y="68" textAnchor="middle" fill="#93c5fd" fontSize="6" fontWeight="bold">RF</text>
      <text x="25" y="77" textAnchor="middle" fill="#60a5fa" fontSize="5">50Ω</text>
      <line x1="45" y1="70" x2="60" y2="70" stroke="#fbbf24" strokeWidth="1.5"/>
    </g>
  );
  const plasmaLoad = (
    <g>
      <rect x="235" y="55" width="40" height="30" rx="4" fill="#3b0764" stroke="#a855f7" strokeWidth="1.2">
        <animate attributeName="fill-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
      </rect>
      <text x="255" y="68" textAnchor="middle" fill="#c4b5fd" fontSize="6" fontWeight="bold">Plasma</text>
      <text x="255" y="77" textAnchor="middle" fill="#a78bfa" fontSize="5">Z_L</text>
    </g>
  );
  const groundLine = (y) => (
    <g>
      <line x1="60" y1={y} x2="220" y2={y} stroke="#475569" strokeWidth="1" strokeDasharray="3 2"/>
    </g>
  );
  // Capacitor symbol (vertical, at x,y center)
  const capSym = (cx, cy, label, value, color = '#f59e0b') => (
    <g>
      <line x1={cx} y1={cy - 8} x2={cx} y2={cy - 3} stroke={color} strokeWidth="1.5"/>
      <line x1={cx - 6} y1={cy - 3} x2={cx + 6} y2={cy - 3} stroke={color} strokeWidth="1.5"/>
      <line x1={cx - 6} y1={cy + 3} x2={cx + 6} y2={cy + 3} stroke={color} strokeWidth="1.5"/>
      <line x1={cx} y1={cy + 3} x2={cx} y2={cy + 8} stroke={color} strokeWidth="1.5"/>
      <text x={cx + 10} y={cy - 2} fill={color} fontSize="5.5" fontWeight="bold">{label}</text>
      <text x={cx + 10} y={cy + 5} fill="#94a3b8" fontSize="4.5">{value}</text>
    </g>
  );
  // Inductor symbol (horizontal, from x1 to x2 at y)
  const indSym = (x1, x2, y, label, color = '#8b5cf6') => {
    const mid = (x1 + x2) / 2;
    const w = x2 - x1;
    return (
      <g>
        <path d={`M ${x1} ${y} Q ${x1 + w * 0.125} ${y - 8} ${x1 + w * 0.25} ${y} Q ${x1 + w * 0.375} ${y + 8} ${mid} ${y} Q ${x1 + w * 0.625} ${y - 8} ${x1 + w * 0.75} ${y} Q ${x1 + w * 0.875} ${y + 8} ${x2} ${y}`}
          fill="none" stroke={color} strokeWidth="1.5"/>
        <text x={mid} y={y - 10} textAnchor="middle" fill={color} fontSize="5.5" fontWeight="bold">{label}</text>
      </g>
    );
  };

  // Status glow behind matching box region
  const statusGlow = (
    <rect x="58" y="42" width="164" height="60" rx="6" fill={glow} opacity={glowOp}>
      <animate attributeName="opacity" values={`${glowOp * 0.5};${glowOp};${glowOp * 0.5}`} dur="2s" repeatCount="indefinite"/>
    </rect>
  );

  if (type === 'L') return (
    <svg viewBox="0 0 280 140" className="w-full h-full">
      <text x="140" y="14" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">L-Type Matching Network</text>
      <text x="140" y="24" textAnchor="middle" fill="#94a3b8" fontSize="5.5">C1 (Shunt) + C2 (Series)</text>
      {statusGlow}
      {rfSource}
      {/* Matching box outline */}
      <rect x="60" y="44" width="160" height="56" rx="6" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2"/>
      {/* Signal path: top line */}
      <line x1="60" y1="70" x2="100" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {/* C1 shunt (vertical) */}
      {capSym(100, 85, 'C1', `${c1.toFixed(0)}%`)}
      <line x1="100" y1="70" x2="100" y2={85 - 8} stroke="#fbbf24" strokeWidth="1.2"/>
      <line x1="100" y1={85 + 8} x2="100" y2="100" stroke="#475569" strokeWidth="1"/>
      {/* Continue line */}
      <line x1="100" y1="70" x2="140" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {/* C2 series (horizontal as capacitor) */}
      <line x1="140" y1="70" x2="150" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      <line x1="150" y1="62" x2="150" y2="78" stroke="#f59e0b" strokeWidth="1.5"/>
      <line x1="156" y1="62" x2="156" y2="78" stroke="#f59e0b" strokeWidth="1.5"/>
      <line x1="156" y1="70" x2="170" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      <text x="153" y="58" textAnchor="middle" fill="#f59e0b" fontSize="5.5" fontWeight="bold">C2</text>
      <text x="153" y="88" textAnchor="middle" fill="#94a3b8" fontSize="4.5">{c2.toFixed(0)}%</text>
      {/* To plasma */}
      <line x1="170" y1="70" x2="235" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {plasmaLoad}
      {/* Ground */}
      <line x1="100" y1="100" x2="100" y2="105" stroke="#475569" strokeWidth="1"/>
      <line x1="92" y1="105" x2="108" y2="105" stroke="#475569" strokeWidth="1.5"/>
      <line x1="95" y1="108" x2="105" y2="108" stroke="#475569" strokeWidth="1"/>
      <line x1="97" y1="111" x2="103" y2="111" stroke="#475569" strokeWidth="0.8"/>
      <text x="140" y="135" textAnchor="middle" fill="#94a3b8" fontSize="5">가장 일반적인 구조 | CCP/ICP 범용</text>
    </svg>
  );

  if (type === 'Pi') return (
    <svg viewBox="0 0 280 140" className="w-full h-full">
      <text x="140" y="14" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontWeight="bold">Pi (π)-Type Matching Network</text>
      <text x="140" y="24" textAnchor="middle" fill="#94a3b8" fontSize="5.5">C1 (Shunt) + L (Series) + C2 (Shunt)</text>
      {statusGlow}
      {rfSource}
      <rect x="60" y="44" width="160" height="56" rx="6" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 2"/>
      {/* Top line */}
      <line x1="60" y1="70" x2="85" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {/* C1 shunt left */}
      {capSym(85, 85, 'C1', `${c1.toFixed(0)}%`, '#8b5cf6')}
      <line x1="85" y1="70" x2="85" y2={85 - 8} stroke="#fbbf24" strokeWidth="1.2"/>
      <line x1="85" y1={85 + 8} x2="85" y2="100" stroke="#475569" strokeWidth="1"/>
      {/* L series */}
      <line x1="85" y1="70" x2="110" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {indSym(110, 170, 70, 'L', '#8b5cf6')}
      <line x1="170" y1="70" x2="195" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {/* C2 shunt right */}
      {capSym(195, 85, 'C2', `${c2.toFixed(0)}%`, '#8b5cf6')}
      <line x1="195" y1="70" x2="195" y2={85 - 8} stroke="#fbbf24" strokeWidth="1.2"/>
      <line x1="195" y1={85 + 8} x2="195" y2="100" stroke="#475569" strokeWidth="1"/>
      {/* To plasma */}
      <line x1="195" y1="70" x2="235" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {plasmaLoad}
      {/* Ground symbols */}
      {[85, 195].map(gx => (
        <g key={gx}>
          <line x1={gx} y1="100" x2={gx} y2="105" stroke="#475569" strokeWidth="1"/>
          <line x1={gx - 8} y1="105" x2={gx + 8} y2="105" stroke="#475569" strokeWidth="1.5"/>
          <line x1={gx - 5} y1="108" x2={gx + 5} y2="108" stroke="#475569" strokeWidth="1"/>
          <line x1={gx - 3} y1="111" x2={gx + 3} y2="111" stroke="#475569" strokeWidth="0.8"/>
        </g>
      ))}
      <text x="140" y="135" textAnchor="middle" fill="#94a3b8" fontSize="5">넓은 매칭 범위 | 고조파 필터링 우수</text>
    </svg>
  );

  if (type === 'T') return (
    <svg viewBox="0 0 280 140" className="w-full h-full">
      <text x="140" y="14" textAnchor="middle" fill="#0ea5e9" fontSize="8" fontWeight="bold">T-Type Matching Network</text>
      <text x="140" y="24" textAnchor="middle" fill="#94a3b8" fontSize="5.5">L1 (Series) + C (Shunt) + L2 (Series)</text>
      {statusGlow}
      {rfSource}
      <rect x="60" y="44" width="160" height="56" rx="6" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 2"/>
      {/* L1 series */}
      <line x1="60" y1="70" x2="70" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {indSym(70, 115, 70, 'L1', '#0ea5e9')}
      <line x1="115" y1="70" x2="140" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {/* C shunt center */}
      {capSym(140, 85, 'C', `${c1.toFixed(0)}%`, '#0ea5e9')}
      <line x1="140" y1="70" x2="140" y2={85 - 8} stroke="#fbbf24" strokeWidth="1.2"/>
      <line x1="140" y1={85 + 8} x2="140" y2="100" stroke="#475569" strokeWidth="1"/>
      {/* L2 series */}
      <line x1="140" y1="70" x2="155" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {indSym(155, 200, 70, 'L2', '#0ea5e9')}
      <line x1="200" y1="70" x2="235" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {plasmaLoad}
      {/* Ground */}
      <line x1="140" y1="100" x2="140" y2="105" stroke="#475569" strokeWidth="1"/>
      <line x1="132" y1="105" x2="148" y2="105" stroke="#475569" strokeWidth="1.5"/>
      <line x1="135" y1="108" x2="145" y2="108" stroke="#475569" strokeWidth="1"/>
      <line x1="137" y1="111" x2="143" y2="111" stroke="#475569" strokeWidth="0.8"/>
      <text x="140" y="135" textAnchor="middle" fill="#94a3b8" fontSize="5">고전력용 | 넓은 임피던스 변환 범위</text>
    </svg>
  );

  // Gamma type
  return (
    <svg viewBox="0 0 280 140" className="w-full h-full">
      <text x="140" y="14" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="bold">Gamma (Γ)-Type Matching Network</text>
      <text x="140" y="24" textAnchor="middle" fill="#94a3b8" fontSize="5.5">L (Series) + C (Shunt)</text>
      {statusGlow}
      {rfSource}
      <rect x="60" y="44" width="160" height="56" rx="6" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2"/>
      {/* L series */}
      <line x1="60" y1="70" x2="80" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {indSym(80, 140, 70, 'L', '#10b981')}
      <line x1="140" y1="70" x2="170" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {/* C shunt */}
      {capSym(170, 85, 'C', `${c1.toFixed(0)}%`, '#10b981')}
      <line x1="170" y1="70" x2="170" y2={85 - 8} stroke="#fbbf24" strokeWidth="1.2"/>
      <line x1="170" y1={85 + 8} x2="170" y2="100" stroke="#475569" strokeWidth="1"/>
      {/* To plasma */}
      <line x1="170" y1="70" x2="235" y2="70" stroke="#fbbf24" strokeWidth="1.2"/>
      {plasmaLoad}
      {/* Ground */}
      <line x1="170" y1="100" x2="170" y2="105" stroke="#475569" strokeWidth="1"/>
      <line x1="162" y1="105" x2="178" y2="105" stroke="#475569" strokeWidth="1.5"/>
      <line x1="165" y1="108" x2="175" y2="108" stroke="#475569" strokeWidth="1"/>
      <line x1="167" y1="111" x2="173" y2="111" stroke="#475569" strokeWidth="0.8"/>
      <text x="140" y="135" textAnchor="middle" fill="#94a3b8" fontSize="5">심플 구조 | ICP 유도성 부하에 적합</text>
    </svg>
  );
};


// ============================================================
// Matching Box Display UI
// ============================================================
const MatchingBoxDisplay = ({ c1, c2, gamma, mode, matchBoxType, onC1Change, onC2Change }) => {
  const isMatched = gamma < 0.1;
  const ledColor = isMatched ? '#22c55e' : gamma < 0.3 ? '#eab308' : '#ef4444';
  return (
    <div className="bg-gray-950 rounded-xl border-2 border-gray-600 p-4 shadow-xl shadow-black/40">
      {/* Display Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: ledColor, boxShadow: `0 0 8px ${ledColor}`}}/>
          <span className="text-gray-400 text-xs font-mono">MATCHING CONTROLLER ({matchBoxType})</span>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-400">
          {mode === 'auto' ? 'AUTO' : 'MANUAL'}
        </span>
      </div>

      {/* Digital Display */}
      <div className="bg-black rounded-lg p-3 mb-3 border border-gray-700 font-mono">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] text-gray-600 mb-0.5">{matchBoxType === 'T' ? 'C SHUNT' : matchBoxType === 'Gamma' ? 'L SERIES' : 'C1 LOAD'}</div>
            <div className="text-2xl font-bold text-green-400 tabular-nums">{c1.toFixed(1)}<span className="text-sm text-green-600 ml-1">%</span></div>
          </div>
          <div>
            <div className="text-[10px] text-gray-600 mb-0.5">{matchBoxType === 'T' ? 'L RATIO' : matchBoxType === 'Gamma' ? 'C SHUNT' : 'C2 TUNE'}</div>
            <div className="text-2xl font-bold text-green-400 tabular-nums">{c2.toFixed(1)}<span className="text-sm text-green-600 ml-1">%</span></div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-2 pt-2 flex justify-between">
          <div>
            <span className="text-[10px] text-gray-600">Γ </span>
            <span className={`text-sm font-bold ${isMatched ? 'text-green-400' : 'text-red-400'}`}>{gamma.toFixed(3)}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-600">STATUS </span>
            <span className={`text-sm font-bold ${isMatched ? 'text-green-400' : 'text-red-400'}`}>
              {isMatched ? 'MATCHED' : 'MISMATCHED'}
            </span>
          </div>
        </div>
      </div>

      {/* Circuit Topology SVG */}
      <div className="bg-gray-900 rounded-lg p-2 mb-3 border border-gray-700">
        <MatchingCircuitSVG type={matchBoxType} c1={c1} c2={c2} c3={0} isMatched={isMatched} />
      </div>

      {/* Manual Controls */}
      {mode === 'manual' && (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{matchBoxType === 'T' ? 'C SHUNT' : matchBoxType === 'Gamma' ? 'L SERIES' : 'C1 LOAD'}</span>
              <span>{c1.toFixed(1)}%</span>
            </div>
            <input type="range" min="0" max="100" step="0.5" value={c1} onChange={e => onC1Change(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"/>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{matchBoxType === 'T' ? 'L RATIO' : matchBoxType === 'Gamma' ? 'C SHUNT' : 'C2 TUNE'}</span>
              <span>{c2.toFixed(1)}%</span>
            </div>
            <input type="range" min="0" max="100" step="0.5" value={c2} onChange={e => onC2Change(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"/>
          </div>
        </div>
      )}
    </div>
  );
};


// ============================================================
// Main Component
// ============================================================
const ImpedanceProbeSimulator = () => {
  const [activeTab, setActiveTab] = useState('storytelling');

  // Storytelling states
  const [theoryStep, setTheoryStep] = useState(0);
  const [isTheoryPlaying, setIsTheoryPlaying] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showDetailedContent, setShowDetailedContent] = useState(false);
  const [svgVisible, setSvgVisible] = useState(true);

  // Simulator states
  const [sourceType, setSourceType] = useState('CCP');
  const [rfPower, setRfPower] = useState(300);
  const [pressure, setPressure] = useState(20);
  const [gasType, setGasType] = useState('Ar');
  const [matchC1, setMatchC1] = useState(50);
  const [matchC2, setMatchC2] = useState(50);
  const [matchMode, setMatchMode] = useState('manual');
  const [matchBoxType, setMatchBoxType] = useState('L');
  const autoRef = useRef(null);

  // Source → Recommended Matching Circuit mapping
  const sourceMatchMap = { CCP: 'L', ICP: 'Gamma', Hybrid: 'Pi', Helicon: 'T' };
  const handleSourceChange = (newSource) => {
    setSourceType(newSource);
    setMatchBoxType(sourceMatchMap[newSource]);
  };

  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Overview dropdown
  const [showMatchingDetail, setShowMatchingDetail] = useState(false);

  // ============================================================
  // Storytelling Data
  // ============================================================
  const storySteps = [
    {
      step: 1, title: "보이지 않는 전력의 흐름",
      content: "반도체 공장의 에칭 장비실. 엔지니어 지현은 새로 설치한 플라즈마 장비 앞에서 고민에 빠졌습니다.\n\nRF 발생기에서 **500W**를 보내고 있는데, 실제 에칭 결과가 **300W** 수준밖에 안 나오는 겁니다. 나머지 **200W**는 도대체 어디로 사라진 걸까요?\n\n\"전력이 새고 있는 건가? 매칭이 안 맞는 건가?\"\n\n지현에게는 이 미스터리를 풀 도구가 있습니다. 바로 __VI Probe(임피던스 프로브)__ — RF 회로의 *전압, 전류, 위상각*을 실시간으로 측정하는 장치입니다!",
      color: "from-emerald-600 to-teal-700"
    },
    {
      step: 2, title: "V, I, cos(θ)의 삼각관계",
      content: "VI Probe가 측정하는 세 가지 값을 알아봅시다.\n\n**전압(V)**: RF 신호의 전압 크기입니다. 보통 수백~수천 V 범위죠.\n**전류(I)**: RF 신호의 전류 크기입니다.\n**위상각(θ)**: 전압과 전류 사이의 시간차입니다. 이것이 핵심!\n\n일반 가정의 콘센트는 V와 I가 동시에 움직입니다(θ≈0°). 하지만 플라즈마는 *전도성 기체*이면서 동시에 __커패시터__나 __인덕터__ 성분도 가지고 있어서, V와 I가 어긋나게 됩니다.\n\n실제 전달되는 전력은 **P = V × I × cos(θ)**입니다. θ가 0°이면 cos(0°)=1로 100% 전달. θ가 60°이면 cos(60°)=0.5로 50%만 전달!\n\n지현의 장비에서 θ가 너무 크다면, 전력의 절반이 *허수 전력(reactive power)*으로 낭비되고 있는 겁니다.",
      color: "from-blue-600 to-indigo-700"
    },
    {
      step: 3, title: "매칭 네트워크의 마법",
      content: "RF 발생기의 출력 임피던스는 **50Ω**(순수 저항)으로 설계되어 있습니다. 하지만 플라즈마의 임피던스는 수Ω~수백Ω의 저항(R)에 큰 리액턴스(X) 성분이 더해진 복소수입니다.\n\n이 불일치가 있으면 RF 파가 **반사**됩니다! 마치 밧줄의 굵기가 갑자기 바뀌면 파동이 튕겨 돌아오는 것처럼요.\n\n**매칭 네트워크**는 이 문제를 해결합니다. 가변 커패시터 2개(C₁, C₂)를 조절하여 플라즈마의 복잡한 임피던스를 __정확히 50Ω__으로 변환합니다.\n\n반사 계수: __Γ = (Z_L - 50) / (Z_L + 50)__\n반사 전력: **P_reflected = P_forward × |Γ|²**\n\n완벽한 매칭이면 Γ=0, 반사 전력=0! 모든 전력이 플라즈마에 전달됩니다.",
      color: "from-amber-600 to-orange-700"
    },
    {
      step: 4, title: "소스가 바뀌면 모든 것이 바뀐다",
      content: "지현이 조사를 시작합니다. VI Probe를 매칭 네트워크 출력단에 설치하고 측정을 시작했습니다.\n\n**CCP(용량결합)**에서 측정하니: Z = 5 - j120 Ω. *용량성* 리액턴스가 지배적입니다. 전극 사이의 쉬스(sheath)가 큰 커패시터 역할을 하기 때문이죠.\n\n**ICP(유도결합)**으로 바꾸니: Z = 3 + j45 Ω. *유도성* 리액턴스입니다. 코일에 의한 유도 성분이 나타납니다.\n\n__RF 파워를 올리면?__ R이 감소합니다. 전자밀도가 높아져 플라즈마가 더 잘 전도되니까요.\n__압력을 올리면?__ R이 증가합니다. 전자-중성입자 충돌이 잦아져 저항이 커집니다.\n\n문제를 찾았습니다! 가스를 바꾼 후 매칭을 다시 안 잡았던 것입니다. 매칭을 재조정하자 **θ가 58°에서 5°로** 떨어지고, 전력 효율이 **95%**로 회복되었습니다!",
      color: "from-rose-600 to-pink-700"
    },
    {
      step: 5, title: "당신도 임피던스 진단 전문가!",
      content: "이 시뮬레이터에서 직접 체험해보세요!\n\n**이론 탭**: V, I, θ의 관계, 임피던스 매칭 원리, 반사 계수와 효율 공식을 배웁니다.\n\n**개요 탭**: VI Probe 시스템 구성도와 CCP/ICP별 등가회로를 확인합니다.\n\n**시뮬레이터 탭**: 소스 타입(CCP/ICP), RF 파워, 압력, 가스를 바꾸면서:\n• __AUTO 모드__: 매칭 박스가 자동으로 최적점을 찾아갑니다\n• __MANUAL 모드__: C₁, C₂를 직접 돌려 매칭점을 찾아보세요\n• 위상각 θ와 cos(θ) 효율의 변화를 실시간으로 확인!\n\n**문제풀이 탭**에서 배운 내용을 확인하세요!\n\n자, **전력의 흐름을 읽는 여정**을 시작합시다!",
      color: "from-violet-600 to-purple-700"
    }
  ];

  // ============================================================
  // Typing Animation
  // ============================================================
  useEffect(() => {
    if (isTheoryPlaying && theoryStep < storySteps.length) {
      const fullText = storySteps[theoryStep].content;
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else clearInterval(typingInterval);
      }, 25);
      return () => clearInterval(typingInterval);
    }
  }, [isTheoryPlaying, theoryStep]);

  const formatTheoryContent = useCallback((text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <br key={i} />;
      const parts = [];
      let lastIndex = 0;
      const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(__(.+?)__)/g;
      let match;
      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
        if (match[1]) parts.push(<strong key={`b${i}-${match.index}`} className="text-yellow-300">{match[2]}</strong>);
        else if (match[3]) parts.push(<span key={`i${i}-${match.index}`} className="text-cyan-300 font-semibold">{match[4]}</span>);
        else if (match[5]) parts.push(<span key={`u${i}-${match.index}`} className="underline">{match[6]}</span>);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) parts.push(line.slice(lastIndex));
      return <p key={i} className="mb-2">{parts.length > 0 ? parts : line}</p>;
    });
  }, []);

  const startTheory = () => { setIsTheoryPlaying(true); setTheoryStep(0); setTypedText(''); setSvgVisible(true); };
  const changeStep = (newStep) => {
    setSvgVisible(false);
    setTimeout(() => { setTheoryStep(newStep); setTypedText(''); setSvgVisible(true); }, 400);
  };
  const nextTheoryStep = () => {
    if (theoryStep < storySteps.length - 1) changeStep(theoryStep + 1);
    else { setShowDetailedContent(true); setIsTheoryPlaying(false); }
  };
  const prevTheoryStep = () => { if (theoryStep > 0) changeStep(theoryStep - 1); };
  const skipTheory = () => { setShowDetailedContent(true); setIsTheoryPlaying(false); };


  // ============================================================
  // Impedance Calculation Engine
  // ============================================================
  const calcPlasmaImpedance = useCallback(() => {
    const gf = { Ar: 1.0, O2: 1.3, N2: 1.2, CF4: 1.5, Cl2: 1.4 }[gasType] || 1.0;
    let R, X;
    if (sourceType === 'CCP') {
      // 용량성: sheath 캐패시턴스 지배, X < 0
      R = (800 / (rfPower + 50)) * (pressure / 10) * gf + 2;
      X = -(200 - rfPower * 0.15 + pressure * 0.8) * gf;
    } else if (sourceType === 'ICP') {
      // 유도성: 코일 인덕턴스 지배, X > 0
      R = (400 / (rfPower + 100)) * (pressure / 8) * gf + 1;
      X = (60 - rfPower * 0.08 + pressure * 1.2) * gf;
    } else if (sourceType === 'Hybrid') {
      // CCP+ICP 복합: 중간 특성, X는 조건에 따라 부호 변동
      const ccpR = (800 / (rfPower + 50)) * (pressure / 10) * gf + 2;
      const ccpX = -(200 - rfPower * 0.15 + pressure * 0.8) * gf;
      const icpR = (400 / (rfPower + 100)) * (pressure / 8) * gf + 1;
      const icpX = (60 - rfPower * 0.08 + pressure * 1.2) * gf;
      R = (ccpR * 0.4 + icpR * 0.6);  // ICP 소스가 주력, CCP는 바이어스
      X = (ccpX * 0.35 + icpX * 0.65); // X 부호가 조건에 따라 바뀜
    } else {
      // Helicon: 초고밀도, 매우 낮은 R, 강한 유도성 X > 0
      R = (200 / (rfPower + 200)) * (pressure / 5) * gf + 0.5;
      X = (120 - rfPower * 0.05 + pressure * 2.0) * gf;
    }
    return { R: Math.round(R * 10) / 10, X: Math.round(X * 10) / 10 };
  }, [sourceType, rfPower, pressure, gasType]);

  // Optimal C1/C2 for current plasma — varies by circuit topology
  const calcOptimalMatch = useCallback(() => {
    const plasma = calcPlasmaImpedance();
    let optC1, optC2;
    if (matchBoxType === 'L') {
      // L-type: C1 shunt compensates reactance, C2 series matches resistance
      optC1 = 50 - plasma.X * 0.05;
      optC2 = 50 + (50 - plasma.R) * 0.3;
    } else if (matchBoxType === 'Pi') {
      // Pi-type: two shunt caps + series inductor — wider range, better harmonic rejection
      optC1 = 50 - plasma.X * 0.04 + (50 - plasma.R) * 0.1;
      optC2 = 50 + plasma.X * 0.03 + (50 - plasma.R) * 0.2;
    } else if (matchBoxType === 'T') {
      // T-type: two series inductors + shunt cap — high power handling
      optC1 = 50 - plasma.X * 0.06;
      optC2 = 50 + (50 - plasma.R) * 0.25 - plasma.X * 0.02;
    } else {
      // Gamma-type: series L + shunt C — simple, best for inductive loads
      optC1 = 50 - plasma.X * 0.07 + (50 - plasma.R) * 0.15;
      optC2 = 50 + (50 - plasma.R) * 0.35;
    }
    return {
      c1: Math.max(0, Math.min(100, Math.round(optC1 * 10) / 10)),
      c2: Math.max(0, Math.min(100, Math.round(optC2 * 10) / 10))
    };
  }, [calcPlasmaImpedance, matchBoxType]);

  // Auto matching animation
  useEffect(() => {
    if (matchMode === 'auto') {
      const opt = calcOptimalMatch();
      const interval = setInterval(() => {
        setMatchC1(prev => {
          const diff = opt.c1 - prev;
          if (Math.abs(diff) < 0.3) return opt.c1;
          return Math.round((prev + diff * 0.15) * 10) / 10;
        });
        setMatchC2(prev => {
          const diff = opt.c2 - prev;
          if (Math.abs(diff) < 0.3) return opt.c2;
          return Math.round((prev + diff * 0.15) * 10) / 10;
        });
      }, 50);
      autoRef.current = interval;
      return () => clearInterval(interval);
    } else if (autoRef.current) {
      clearInterval(autoRef.current);
    }
  }, [matchMode, calcOptimalMatch, sourceType, rfPower, pressure, gasType, matchBoxType]);

  const calcAll = useCallback(() => {
    const plasma = calcPlasmaImpedance();
    const c1Factor = (matchC1 - 50) * 0.8;
    const c2Factor = (matchC2 - 50) * 0.6;
    let Zr, Zi;
    if (matchBoxType === 'L') {
      // L-type: shunt C1 + series C2
      Zr = Math.max(1, plasma.R + c1Factor * 0.05);
      Zi = plasma.X + c1Factor + c2Factor;
    } else if (matchBoxType === 'Pi') {
      // Pi-type: dual shunt C + series L — smoother transformation, wider range
      Zr = Math.max(1, plasma.R + c1Factor * 0.04 + c2Factor * 0.03);
      Zi = plasma.X + c1Factor * 0.8 + c2Factor * 0.7;
    } else if (matchBoxType === 'T') {
      // T-type: dual series L + shunt C — strong resistance transform
      Zr = Math.max(1, plasma.R + c1Factor * 0.08);
      Zi = plasma.X + c1Factor * 0.9 + c2Factor * 0.5;
    } else {
      // Gamma-type: series L + shunt C — direct, less knobs
      Zr = Math.max(1, plasma.R + c1Factor * 0.06);
      Zi = plasma.X + c1Factor * 1.1 + c2Factor * 0.4;
    }
    const Z0 = 50;
    const dR = Zr - Z0;
    const magSum = (Zr + Z0) * (Zr + Z0) + Zi * Zi;
    const magDiff = dR * dR + Zi * Zi;
    const gamma = Math.sqrt(magDiff / magSum);
    const reflectedFrac = gamma * gamma;
    const pForward = rfPower;
    const pReflected = pForward * reflectedFrac;
    const pDelivered = pForward - pReflected;
    const Zmag = Math.sqrt(Zr * Zr + Zi * Zi);
    const theta = Math.atan2(Zi, Zr) * (180 / Math.PI);
    const cosTheta = Math.cos(theta * Math.PI / 180);
    const V = Math.sqrt(Math.abs(pDelivered) * Zmag) * 1.414;
    const I = Zmag > 0 ? V / Zmag : 0;
    const matchLoss = rfPower * 0.03;
    return {
      plasma, matched: { R: Math.round(Zr*10)/10, X: Math.round(Zi*10)/10 },
      gamma: Math.round(gamma * 1000) / 1000,
      pForward: Math.round(pForward), pReflected: Math.round(pReflected * 10) / 10,
      pDelivered: Math.round(pDelivered * 10) / 10,
      pPlasma: Math.round((pDelivered - matchLoss) * 10) / 10, matchLoss: Math.round(matchLoss * 10) / 10,
      V: Math.round(V), I: Math.round(I * 100) / 100,
      theta: Math.round(theta * 10) / 10, cosTheta: Math.round(cosTheta * 1000) / 1000,
      efficiency: Math.round(((pDelivered / pForward) * 100) * 10) / 10,
      Zmag: Math.round(Zmag * 10) / 10
    };
  }, [calcPlasmaImpedance, matchC1, matchC2, rfPower, matchBoxType]);

  const generateWaveform = useCallback(() => {
    const c = calcAll();
    const data = [];
    for (let t = 0; t <= 360; t += 5) {
      const rad = t * Math.PI / 180;
      const thetaRad = c.theta * Math.PI / 180;
      data.push({ t, V: Math.round(c.V * Math.sin(rad)), I: Math.round(c.I * Math.sin(rad - thetaRad) * 100) / 100 });
    }
    return data;
  }, [calcAll]);

  const generateSweepData = useCallback(() => {
    const data = [];
    const gf = { Ar: 1.0, O2: 1.3, N2: 1.2, CF4: 1.5, Cl2: 1.4 }[gasType] || 1;
    for (let p = 50; p <= 800; p += 50) {
      let R, X;
      if (sourceType === 'CCP') { R = (800/(p+50))*(pressure/10)*gf+2; X = -(200-p*0.15+pressure*0.8)*gf; }
      else if (sourceType === 'ICP') { R = (400/(p+100))*(pressure/8)*gf+1; X = (60-p*0.08+pressure*1.2)*gf; }
      else if (sourceType === 'Hybrid') { R = ((800/(p+50))*(pressure/10)*gf+2)*0.4+((400/(p+100))*(pressure/8)*gf+1)*0.6; X = (-(200-p*0.15+pressure*0.8)*gf)*0.35+((60-p*0.08+pressure*1.2)*gf)*0.65; }
      else { R = (200/(p+200))*(pressure/5)*gf+0.5; X = (120-p*0.05+pressure*2.0)*gf; }
      data.push({ power: p, R: Math.round(R*10)/10, X: Math.round(X*10)/10 });
    }
    return data;
  }, [sourceType, pressure, gasType]);

  const calc = calcAll();

  // ============================================================
  // Quiz Data
  // ============================================================
  const quizQuestions = [
    { question: 'VI Probe가 측정하는 세 가지 물리량은?', options: ['전압, 전류, 저항', '전압, 전류, 위상각', '전력, 주파수, 임피던스', '전압, 주파수, 반사계수'], answer: 1, explanation: 'VI Probe는 전압(V), 전류(I), 위상각(θ)을 직접 측정합니다.' },
    { question: '실제 전달 전력(Real Power) 공식은?', options: ['P = V × I', 'P = V² / R', 'P = V × I × cos(θ)', 'P = I² × Z'], answer: 2, explanation: 'P = V × I × cos(θ). cos(θ)는 역률(power factor)입니다.' },
    { question: 'RF 매칭 네트워크의 목적은?', options: ['주파수를 변환', '플라즈마 임피던스를 50Ω으로 변환', '전압을 증폭', 'DC를 RF로 변환'], answer: 1, explanation: '매칭 네트워크는 플라즈마의 복소 임피던스를 50Ω에 맞춰 반사를 최소화합니다.' },
    { question: 'Γ = 0.3일 때, 반사 전력은 전진 전력의 몇 %?', options: ['3%', '9%', '30%', '60%'], answer: 1, explanation: 'P_ref = P_fwd × |Γ|² = × 0.09 = 9%' },
    { question: 'CCP 플라즈마의 임피던스 특성은?', options: ['순수 저항성', '유도성 (X > 0)', '용량성 (X < 0)', '주파수에 무관'], answer: 2, explanation: 'CCP는 쉬스(sheath)가 커패시터 역할 → 용량성(X < 0)' },
    { question: 'RF 파워를 높이면 플라즈마 저항(R)은?', options: ['증가', '감소', '변하지 않음', '진동'], answer: 1, explanation: '전자밀도 증가 → 전도성 증가 → R 감소' },
    { question: 'θ = 0°일 때의 의미는?', options: ['전력 전달 안됨', 'V와 I가 동위상', '임피던스 = 0', '플라즈마 꺼짐'], answer: 1, explanation: 'θ=0°는 동위상, cos(0°)=1 → 전력 효율 100%' },
    { question: '완벽한 매칭 시 Γ 값은?', options: ['1', '0.5', '0', '-1'], answer: 2, explanation: 'Z_L=Z₀=50Ω → Γ=(50-50)/(50+50)=0' }
  ];

  // ============================================================
  // Tab Definitions
  // ============================================================
  const tabs = [
    { id: 'storytelling', name: '스토리텔링', icon: '📖' },
    { id: 'theory', name: '이론', icon: '📐' },
    { id: 'overview', name: '개요', icon: '🔍' },
    { id: 'simulator', name: '시뮬레이터', icon: '🖥️' },
    { id: 'quiz', name: '문제풀이', icon: '✏️' },
  ];

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Tab Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold whitespace-nowrap border-b-3 transition-all
                ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-400 bg-indigo-900/30'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-700'
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
                <div className="text-8xl mb-6">📡</div>
                <h2 className="text-3xl font-bold text-gray-100 mb-4">임피던스 프로브: 전력의 흐름을 읽다</h2>
                <p className="text-gray-400 mb-8 text-lg">RF 임피던스 진단의 세계로 떠나봅시다</p>
                <button onClick={startTheory}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  스토리 시작하기 ▶
                </button>
              </div>
            ) : isTheoryPlaying ? (
              <div className="max-w-6xl mx-auto">
                {/* Progress */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-400">Step {theoryStep + 1} / {storySteps.length}</span>
                  <div className="flex gap-2">
                    {storySteps.map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full transition-all ${i <= theoryStep ? 'bg-emerald-600 scale-110' : 'bg-gray-700'}`}/>
                    ))}
                  </div>
                  <button onClick={skipTheory} className="text-sm text-gray-400 hover:text-gray-300">건너뛰기 →</button>
                </div>

                {/* Story Card - Two Column Layout (matching OES) */}
                <div className={`bg-gradient-to-br ${storySteps[theoryStep].color} rounded-2xl shadow-2xl min-h-[480px] flex flex-col lg:flex-row overflow-hidden`}>
                  {/* Left: SVG Illustration */}
                  <div className="lg:w-5/12 w-full p-8 flex items-center justify-center bg-black/20 border-b lg:border-b-0 lg:border-r border-white/10">
                    <div className="w-full max-w-[380px]">
                      <ImpedanceStoryIllustration step={theoryStep} isVisible={svgVisible} />
                    </div>
                  </div>
                  {/* Right: Story Text */}
                  <div className="lg:w-3/5 w-full p-8 text-white flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-6">{storySteps[theoryStep].title}</h3>
                    <div className="text-base leading-relaxed overflow-y-auto max-h-[320px]">
                      {formatTheoryContent(typedText)}
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  <button onClick={prevTheoryStep} disabled={theoryStep === 0}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold disabled:opacity-30 hover:bg-gray-600 transition-all">
                    ← 이전
                  </button>
                  <button onClick={nextTheoryStep}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 transition-all">
                    {theoryStep < storySteps.length - 1 ? '다음 →' : '학습 시작! 🚀'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-100 mb-4">스토리 완료!</h2>
                <p className="text-gray-400 mb-6">이제 이론, 개요, 시뮬레이터 탭에서 더 깊이 학습해보세요.</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => { setShowDetailedContent(false); setIsTheoryPlaying(false); }}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">다시 보기</button>
                  <button onClick={() => setActiveTab('theory')}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500">이론 탭으로 →</button>
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
            <h2 className="text-2xl font-bold text-gray-100">임피던스 진단 이론</h2>

            {/* Section 1: V, I, θ */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">1. 전압, 전류, 위상각</h3>
              <p className="text-gray-300 mb-4">RF 플라즈마 시스템에서 VI Probe는 전압(V), 전류(I), 그리고 이 둘 사이의 위상차(θ)를 실시간으로 측정합니다.</p>
              <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
                <div className="text-center space-y-2">
                  <p className="text-yellow-300 font-mono text-lg">V(t) = V₀ sin(ωt)</p>
                  <p className="text-red-400 font-mono text-lg">I(t) = I₀ sin(ωt - θ)</p>
                  <p className="text-gray-500 text-sm mt-2">ω = 2πf, f = 13.56 MHz (RF 표준 주파수)</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">위상각 θ의 의미:</p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li className="flex gap-2"><span className="text-emerald-400">•</span><span><strong className="text-yellow-300">θ = 0°</strong>: V와 I 동위상 → 순수 저항성 부하 → 전력 효율 100%</span></li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span><span><strong className="text-yellow-300">θ &lt; 0°</strong>: I가 V보다 앞섬 → 용량성(Capacitive) → CCP 특성</span></li>
                <li className="flex gap-2"><span className="text-emerald-400">•</span><span><strong className="text-yellow-300">θ &gt; 0°</strong>: I가 V보다 뒤짐 → 유도성(Inductive) → ICP 특성</span></li>
              </ul>
            </div>

            {/* Section 2: Power */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-4">2. 전력 공식</h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
                <div className="text-center space-y-3">
                  <p className="text-yellow-300 font-mono text-xl font-bold">P_real = V × I × cos(θ)</p>
                  <p className="text-gray-400 font-mono">P_reactive = V × I × sin(θ)</p>
                  <p className="text-gray-400 font-mono">P_apparent = V × I</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-lg p-4 text-center">
                  <div className="text-emerald-400 font-bold mb-1">Real Power</div>
                  <div className="text-gray-300 text-sm">실제 플라즈마에 전달되는 유효 전력</div>
                </div>
                <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-4 text-center">
                  <div className="text-amber-400 font-bold mb-1">Reactive Power</div>
                  <div className="text-gray-300 text-sm">전달되지 않고 왕복하는 무효 전력</div>
                </div>
                <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-center">
                  <div className="text-blue-400 font-bold mb-1">Apparent Power</div>
                  <div className="text-gray-300 text-sm">전압×전류의 피상 전력</div>
                </div>
              </div>
            </div>

            {/* Section 3: Impedance */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-purple-400 mb-4">3. 임피던스와 반사 계수</h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
                <div className="text-center space-y-3">
                  <p className="text-cyan-300 font-mono text-lg">Z = R + jX (Ω)</p>
                  <p className="text-yellow-300 font-mono text-lg">Γ = (Z_L - Z₀) / (Z_L + Z₀)</p>
                  <p className="text-red-400 font-mono text-lg">P_reflected = P_forward × |Γ|²</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-emerald-400 font-bold mb-2">이상적 매칭 (Γ = 0)</h4>
                  <p className="text-gray-300 text-sm">Z_L = 50Ω → 반사 없음 → 전력 100% 전달</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-red-400 font-bold mb-2">완전 미스매칭 (Γ = 1)</h4>
                  <p className="text-gray-300 text-sm">Z_L = 0 또는 ∞ → 전력 100% 반사</p>
                </div>
              </div>
            </div>

            {/* Section 4: Matching Network */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-amber-400 mb-4">4. 매칭 네트워크 토폴로지</h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
                <div className="text-center space-y-2">
                  <p className="text-gray-300 font-mono text-sm">소스 임피던스 특성에 따라 최적의 매칭 회로가 달라집니다.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                    <div className="text-xs text-amber-300 font-mono">L: C₁↕ + C₂─</div>
                    <div className="text-xs text-purple-300 font-mono">Pi: C₁↕ + L─ + C₂↕</div>
                    <div className="text-xs text-sky-300 font-mono">T: L₁─ + C↕ + L₂─</div>
                    <div className="text-xs text-emerald-300 font-mono">Γ: L─ + C↕</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-amber-400 font-bold mb-2">Auto Mode</h4>
                  <p className="text-gray-300 text-sm">컨트롤러가 Γ를 모니터링하며 가변 소자를 자동 조절합니다. 반사 전력을 최소화하는 방향으로 스텝 모터가 움직입니다.</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-amber-400 font-bold mb-2">Manual Mode</h4>
                  <p className="text-gray-300 text-sm">엔지니어가 직접 가변 소자를 조절합니다. 특수 공정이나 자동 매칭이 불안정할 때 사용합니다.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB: OVERVIEW */}
        {/* ================================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-100">VI Probe 시스템 개요</h2>

            {/* System Block Diagram */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-emerald-400 mb-4">시스템 구성도</h3>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                  <div className="bg-blue-900/40 border border-blue-600/50 rounded-lg px-4 py-3 text-center">
                    <div className="text-blue-400 font-bold">RF Generator</div>
                    <div className="text-gray-400 text-xs">13.56 MHz</div>
                  </div>
                  <span className="text-yellow-400 text-xl">→</span>
                  <div className="bg-emerald-900/40 border border-emerald-600/50 rounded-lg px-4 py-3 text-center">
                    <div className="text-emerald-400 font-bold">VI Probe</div>
                    <div className="text-gray-400 text-xs">V, I, θ 측정</div>
                  </div>
                  <span className="text-yellow-400 text-xl">→</span>
                  <div className="bg-amber-900/40 border border-amber-600/50 rounded-lg px-4 py-3 text-center">
                    <div className="text-amber-400 font-bold">Matching Box</div>
                    <div className="text-gray-400 text-xs">C₁ Load / C₂ Tune</div>
                  </div>
                  <span className="text-yellow-400 text-xl">→</span>
                  <div className="bg-purple-900/40 border border-purple-600/50 rounded-lg px-4 py-3 text-center">
                    <div className="text-purple-400 font-bold">Plasma</div>
                    <div className="text-gray-400 text-xs">Z = R + jX</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Source Types Comparison (4 types) */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-emerald-400 mb-4">플라즈마 소스 4종 비교</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-4 border border-blue-700/50">
                  <div className="h-72 mb-3">
                    <SourceDiagramSVG sourceType="CCP" />
                  </div>
                  <h4 className="text-blue-400 font-bold text-center">CCP (Capacitively Coupled)</h4>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1">
                    <li>• 두 평행판 전극 사이 방전</li>
                    <li>• Sheath가 커패시터 역할 → <span className="text-blue-400">X &lt; 0 (용량성)</span></li>
                    <li>• 낮은 전자 밀도, 높은 이온 에너지</li>
                    <li>• 추천 매칭: <span className="text-amber-400 font-bold">L-Type</span></li>
                  </ul>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-purple-700/50">
                  <div className="h-72 mb-3">
                    <SourceDiagramSVG sourceType="ICP" />
                  </div>
                  <h4 className="text-purple-400 font-bold text-center">ICP (Inductively Coupled)</h4>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1">
                    <li>• RF 코일에 의한 유도 결합</li>
                    <li>• 코일 인덕턴스 지배 → <span className="text-purple-400">X &gt; 0 (유도성)</span></li>
                    <li>• 높은 전자 밀도, 독립적 이온 에너지 제어</li>
                    <li>• 추천 매칭: <span className="text-emerald-400 font-bold">Gamma-Type</span></li>
                  </ul>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-rose-700/50">
                  <div className="h-72 mb-3">
                    <SourceDiagramSVG sourceType="Hybrid" />
                  </div>
                  <h4 className="text-rose-400 font-bold text-center">Hybrid (CCP + ICP)</h4>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1">
                    <li>• 상부 ICP (소스) + 하부 CCP (바이어스)</li>
                    <li>• 복합 임피던스 → <span className="text-rose-400">X 부호 가변</span></li>
                    <li>• 고밀도 + 이온 에너지 독립 제어</li>
                    <li>• 추천 매칭: <span className="text-purple-400 font-bold">Pi-Type</span> (넓은 매칭 범위)</li>
                  </ul>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-teal-700/50">
                  <div className="h-72 mb-3">
                    <SourceDiagramSVG sourceType="Helicon" />
                  </div>
                  <h4 className="text-teal-400 font-bold text-center">Helicon Wave Plasma</h4>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1">
                    <li>• 헬리콘 파동 + 축방향 자기장</li>
                    <li>• 초고밀도 (10¹³/cm³) → <span className="text-teal-400">매우 낮은 R, 강한 X &gt; 0</span></li>
                    <li>• R&D / 특수 증착에 사용</li>
                    <li>• 추천 매칭: <span className="text-sky-400 font-bold">T-Type</span> (극단 임피던스 대응)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Matching Detail */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <button onClick={() => setShowMatchingDetail(!showMatchingDetail)}
                className="w-full flex items-center justify-between text-lg font-bold text-amber-400">
                <span>매칭 네트워크 4종 상세</span>
                <span className="text-gray-400">{showMatchingDetail ? '▲' : '▼'}</span>
              </button>
              {showMatchingDetail && (
                <div className="mt-4 space-y-4">
                  {/* Source → Circuit Mapping Table */}
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-yellow-300 font-bold mb-3">소스 → 매칭 회로 매핑</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left py-2 px-3 text-gray-300">소스</th>
                            <th className="text-left py-2 px-3 text-gray-300">임피던스 특성</th>
                            <th className="text-left py-2 px-3 text-gray-300">추천 매칭</th>
                            <th className="text-left py-2 px-3 text-gray-300">이유</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700">
                            <td className="py-2 px-3 text-blue-400 font-bold">CCP</td>
                            <td className="py-2 px-3">X &lt; 0 (용량성)</td>
                            <td className="py-2 px-3 text-amber-400 font-bold">L-Type</td>
                            <td className="py-2 px-3 text-xs">범용, 단순 구조로 CCP 매칭 충분</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 px-3 text-purple-400 font-bold">ICP</td>
                            <td className="py-2 px-3">X &gt; 0 (유도성)</td>
                            <td className="py-2 px-3 text-emerald-400 font-bold">Gamma-Type</td>
                            <td className="py-2 px-3 text-xs">직렬 L로 유도성 보상에 최적</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 px-3 text-rose-400 font-bold">Hybrid</td>
                            <td className="py-2 px-3">X 부호 가변</td>
                            <td className="py-2 px-3 text-purple-400 font-bold">Pi-Type</td>
                            <td className="py-2 px-3 text-xs">넓은 매칭 범위, 고조파 억제</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 text-teal-400 font-bold">Helicon</td>
                            <td className="py-2 px-3">낮은 R, 강 X &gt; 0</td>
                            <td className="py-2 px-3 text-sky-400 font-bold">T-Type</td>
                            <td className="py-2 px-3 text-xs">극단 임피던스 변환, 고전력 대응</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 4 Circuit Topologies */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 rounded-lg p-4 border border-amber-700/50">
                      <h4 className="text-amber-300 font-bold mb-2">L-Type (C₁ + C₂)</h4>
                      <p className="text-gray-300 text-sm mb-1">가장 일반적인 RF 매칭 구조.</p>
                      <p className="font-mono text-xs text-gray-400">RF → C₁(Shunt) → C₂(Series) → Plasma</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 border border-purple-700/50">
                      <h4 className="text-purple-300 font-bold mb-2">Pi-Type (C₁ + L + C₂)</h4>
                      <p className="text-gray-300 text-sm mb-1">넓은 매칭 범위, 고조파 필터링 우수.</p>
                      <p className="font-mono text-xs text-gray-400">RF → C₁(Shunt) → L(Series) → C₂(Shunt) → Plasma</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 border border-sky-700/50">
                      <h4 className="text-sky-300 font-bold mb-2">T-Type (L₁ + C + L₂)</h4>
                      <p className="text-gray-300 text-sm mb-1">고전력용, 넓은 임피던스 변환 범위.</p>
                      <p className="font-mono text-xs text-gray-400">RF → L₁(Series) → C(Shunt) → L₂(Series) → Plasma</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 border border-emerald-700/50">
                      <h4 className="text-emerald-300 font-bold mb-2">Gamma-Type (L + C)</h4>
                      <p className="text-gray-300 text-sm mb-1">심플 구조, ICP 유도성 부하에 적합.</p>
                      <p className="font-mono text-xs text-gray-400">RF → L(Series) → C(Shunt) → Plasma</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-1">🟢</div>
                      <div className="text-emerald-400 font-bold text-sm">Γ &lt; 0.1</div>
                      <div className="text-gray-400 text-xs">매칭 양호</div>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-1">🟡</div>
                      <div className="text-yellow-400 font-bold text-sm">0.1 ≤ Γ &lt; 0.3</div>
                      <div className="text-gray-400 text-xs">매칭 보통</div>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-1">🔴</div>
                      <div className="text-red-400 font-bold text-sm">Γ ≥ 0.3</div>
                      <div className="text-gray-400 text-xs">매칭 불량</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Key Parameters Table */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-emerald-400 mb-4">주요 측정 파라미터</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3 text-gray-300">파라미터</th>
                      <th className="text-left py-2 px-3 text-gray-300">기호</th>
                      <th className="text-left py-2 px-3 text-gray-300">단위</th>
                      <th className="text-left py-2 px-3 text-gray-300">의미</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700"><td className="py-2 px-3 text-blue-400">전압</td><td className="py-2 px-3">V</td><td className="py-2 px-3">V</td><td className="py-2 px-3">RF 전압 진폭</td></tr>
                    <tr className="border-b border-gray-700"><td className="py-2 px-3 text-red-400">전류</td><td className="py-2 px-3">I</td><td className="py-2 px-3">A</td><td className="py-2 px-3">RF 전류 진폭</td></tr>
                    <tr className="border-b border-gray-700"><td className="py-2 px-3 text-yellow-400">위상각</td><td className="py-2 px-3">θ</td><td className="py-2 px-3">°</td><td className="py-2 px-3">V-I 위상차</td></tr>
                    <tr className="border-b border-gray-700"><td className="py-2 px-3 text-emerald-400">임피던스</td><td className="py-2 px-3">Z</td><td className="py-2 px-3">Ω</td><td className="py-2 px-3">R + jX 복소 임피던스</td></tr>
                    <tr className="border-b border-gray-700"><td className="py-2 px-3 text-purple-400">반사 계수</td><td className="py-2 px-3">Γ</td><td className="py-2 px-3">-</td><td className="py-2 px-3">0~1 (0=완벽매칭)</td></tr>
                    <tr><td className="py-2 px-3 text-cyan-400">역률</td><td className="py-2 px-3">cos(θ)</td><td className="py-2 px-3">-</td><td className="py-2 px-3">전력 전달 효율</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB: SIMULATOR */}
        {/* ================================================================ */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-100">임피던스 시뮬레이터</h2>

            {/* Controls Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Left: Process Parameters */}
              <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">공정 파라미터</h3>

                {/* Source Type Toggle */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">소스 타입</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'CCP', label: 'CCP', desc: '용량성', active: 'bg-blue-600/30 border-blue-500 text-blue-300' },
                      { id: 'ICP', label: 'ICP', desc: '유도성', active: 'bg-purple-600/30 border-purple-500 text-purple-300' },
                      { id: 'Hybrid', label: 'Hybrid', desc: 'CCP+ICP', active: 'bg-rose-600/30 border-rose-500 text-rose-300' },
                      { id: 'Helicon', label: 'Helicon', desc: '초고밀도', active: 'bg-teal-600/30 border-teal-500 text-teal-300' },
                    ].map(s => (
                      <button key={s.id} onClick={() => handleSourceChange(s.id)}
                        className={`py-2 px-1 rounded-lg text-center transition-all border ${
                          sourceType === s.id
                            ? s.active
                            : 'bg-gray-900 border-gray-700 text-gray-500 hover:bg-gray-800 hover:text-gray-400'
                        }`}>
                        <div className="text-xs font-bold">{s.label}</div>
                        <div className="text-[9px] opacity-70">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                  <div className="text-[10px] text-gray-600 mt-1">소스 변경 시 추천 매칭 회로 자동 선택</div>
                </div>

                {/* Source Diagram */}
                <div className="h-64 bg-gray-900 rounded-lg border border-gray-700 p-2">
                  <SourceDiagramSVG sourceType={sourceType} />
                </div>

                {/* RF Power */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">RF Power</span>
                    <span className="text-yellow-400 font-mono">{rfPower} W</span>
                  </div>
                  <input type="range" min="50" max="1000" step="10" value={rfPower}
                    onChange={e => setRfPower(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"/>
                </div>

                {/* Pressure */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Pressure</span>
                    <span className="text-cyan-400 font-mono">{pressure} mTorr</span>
                  </div>
                  <input type="range" min="1" max="100" step="1" value={pressure}
                    onChange={e => setPressure(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"/>
                </div>

                {/* Gas Type */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">가스</label>
                  <div className="flex flex-wrap gap-2">
                    {['Ar', 'O2', 'N2', 'CF4', 'Cl2'].map(g => (
                      <button key={g} onClick={() => setGasType(g)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          gasType === g ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}>{g}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Matching Box */}
              <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">매칭 네트워크</h3>
                  {/* Mode Toggle */}
                  <div className="flex bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    {['auto', 'manual'].map(m => (
                      <button key={m} onClick={() => setMatchMode(m)}
                        className={`px-4 py-1.5 text-xs font-bold transition-all ${
                          matchMode === m ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-gray-300'
                        }`}>{m.toUpperCase()}</button>
                    ))}
                  </div>
                </div>

                {/* Circuit Type Selector */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">회로 토폴로지</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'L', label: 'L-Type', desc: 'C+C', active: 'bg-amber-600/30 border-amber-500 text-amber-300' },
                      { id: 'Pi', label: 'Pi (π)', desc: 'C+L+C', active: 'bg-purple-600/30 border-purple-500 text-purple-300' },
                      { id: 'T', label: 'T-Type', desc: 'L+C+L', active: 'bg-sky-600/30 border-sky-500 text-sky-300' },
                      { id: 'Gamma', label: 'Gamma', desc: 'L+C', active: 'bg-emerald-600/30 border-emerald-500 text-emerald-300' },
                    ].map(t => (
                      <button key={t.id} onClick={() => setMatchBoxType(t.id)}
                        className={`py-2 px-1 rounded-lg text-center transition-all border ${
                          matchBoxType === t.id
                            ? t.active
                            : 'bg-gray-900 border-gray-700 text-gray-500 hover:bg-gray-800 hover:text-gray-400'
                        }`}>
                        <div className="text-xs font-bold">{t.label}</div>
                        <div className="text-[9px] opacity-70">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Matching Box Display */}
                <MatchingBoxDisplay
                  c1={matchC1} c2={matchC2}
                  gamma={calc.gamma}
                  mode={matchMode}
                  matchBoxType={matchBoxType}
                  onC1Change={setMatchC1} onC2Change={setMatchC2}
                />

                {/* Power Flow */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-xs text-gray-500 font-bold mb-3 uppercase">전력 흐름</h4>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-400">Forward</span>
                    <span className="text-blue-400 font-mono font-bold">{calc.pForward} W</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-400">Reflected</span>
                    <span className="text-red-400 font-mono font-bold">{calc.pReflected} W</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                    <div className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
                      style={{width: `${calc.efficiency}%`}}/>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Delivered</span>
                    <span className="text-emerald-400 font-mono font-bold">{calc.pDelivered} W ({calc.efficiency}%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Measurement Results */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: 'V', value: `${calc.V}V`, color: 'text-blue-400' },
                { label: 'I', value: `${calc.I}A`, color: 'text-red-400' },
                { label: 'θ', value: `${calc.theta}°`, color: 'text-yellow-400' },
                { label: 'cos(θ)', value: calc.cosTheta.toFixed(3), color: 'text-cyan-400' },
                { label: '|Z|', value: `${calc.Zmag}Ω`, color: 'text-purple-400' },
                { label: 'R', value: `${calc.matched.R}Ω`, color: 'text-emerald-400' },
                { label: 'X', value: `${calc.matched.X}Ω`, color: 'text-amber-400' },
                { label: 'Γ', value: calc.gamma.toFixed(3), color: calc.gamma < 0.1 ? 'text-green-400' : 'text-red-400' },
              ].map((m, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
                  <div className="text-[10px] text-gray-500 mb-1">{m.label}</div>
                  <div className={`text-sm font-bold font-mono ${m.color}`}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Waveform Chart */}
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <h3 className="text-sm font-bold text-gray-300 mb-3">V / I 파형 (1주기)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generateWaveform()} margin={{top:5, right:20, left:0, bottom:5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                    <XAxis dataKey="t" stroke="#6b7280" tick={{fontSize:10}} label={{value:'Phase (°)', position:'insideBottomRight', offset:-5, style:{fill:'#6b7280',fontSize:10}}}/>
                    <YAxis yAxisId="v" stroke="#3b82f6" tick={{fontSize:10}} label={{value:'V', angle:-90, position:'insideLeft', style:{fill:'#3b82f6',fontSize:10}}}/>
                    <YAxis yAxisId="i" orientation="right" stroke="#ef4444" tick={{fontSize:10}} label={{value:'A', angle:90, position:'insideRight', style:{fill:'#ef4444',fontSize:10}}}/>
                    <Tooltip contentStyle={{backgroundColor:'#1f2937',border:'1px solid #374151',borderRadius:'8px'}} labelStyle={{color:'#9ca3af'}}/>
                    <ReferenceLine yAxisId="v" y={0} stroke="#4b5563" strokeDasharray="3 3"/>
                    <Line yAxisId="v" type="monotone" dataKey="V" stroke="#3b82f6" strokeWidth={2} dot={false} name="V (V)"/>
                    <Line yAxisId="i" type="monotone" dataKey="I" stroke="#ef4444" strokeWidth={2} dot={false} name="I (A)"/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                위상차 θ = {calc.theta}° | V가 I보다 {calc.theta > 0 ? '앞섬 (유도성)' : calc.theta < 0 ? '뒤짐 (용량성)' : '동위상 (저항성)'}
              </p>
            </div>

            {/* Impedance vs Power Sweep */}
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <h3 className="text-sm font-bold text-gray-300 mb-3">임피던스 vs RF Power (스윕)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generateSweepData()} margin={{top:5, right:20, left:0, bottom:5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                    <XAxis dataKey="power" stroke="#6b7280" tick={{fontSize:10}} label={{value:'Power (W)', position:'insideBottomRight', offset:-5, style:{fill:'#6b7280',fontSize:10}}}/>
                    <YAxis stroke="#6b7280" tick={{fontSize:10}} label={{value:'Ω', angle:-90, position:'insideLeft', style:{fill:'#6b7280',fontSize:10}}}/>
                    <Tooltip contentStyle={{backgroundColor:'#1f2937',border:'1px solid #374151',borderRadius:'8px'}} labelStyle={{color:'#9ca3af'}}/>
                    <ReferenceLine y={0} stroke="#4b5563" strokeDasharray="3 3"/>
                    <Line type="monotone" dataKey="R" stroke="#10b981" strokeWidth={2} dot={false} name="R (Ω)"/>
                    <Line type="monotone" dataKey="X" stroke="#f59e0b" strokeWidth={2} dot={false} name="X (Ω)"/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {sourceType} / {gasType} / {pressure} mTorr — Power 증가 시 R 감소 (전자밀도↑), X 변화
              </p>
            </div>

            {/* Calculation Detail */}
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <h3 className="text-sm font-bold text-gray-300 mb-3">계산 상세</h3>
              <div className="font-mono text-xs space-y-1 text-gray-400">
                <p>Plasma Z = {calc.plasma.R} {calc.plasma.X >= 0 ? '+' : '-'} j{Math.abs(calc.plasma.X)} Ω (원래 임피던스)</p>
                <p>Matched Z = {calc.matched.R} {calc.matched.X >= 0 ? '+' : '-'} j{Math.abs(calc.matched.X)} Ω (매칭 후)</p>
                <p>|Z| = {calc.Zmag} Ω, θ = {calc.theta}°</p>
                <p>Γ = {calc.gamma} → P_ref = {calc.pForward} × {calc.gamma}² = {calc.pReflected} W</p>
                <p>P_delivered = {calc.pForward} - {calc.pReflected} = {calc.pDelivered} W</p>
                <p>P_plasma = {calc.pDelivered} - {calc.matchLoss} (loss) = {calc.pPlasma} W</p>
                <p>Efficiency = {calc.efficiency}%</p>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB: QUIZ */}
        {/* ================================================================ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-100">문제풀이</h2>

            {!quizCompleted ? (
              <div className="max-w-3xl mx-auto">
                {/* Progress */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">문제 {currentQuestion + 1} / {quizQuestions.length}</span>
                  <span className="text-sm text-emerald-400 font-bold">점수: {score}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
                  <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{width: `${((currentQuestion) / quizQuestions.length) * 100}%`}}/>
                </div>

                {/* Question Card */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-gray-100 mb-6">{quizQuestions[currentQuestion].question}</h3>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((opt, i) => (
                      <button key={i}
                        onClick={() => {
                          if (selectedAnswer !== null) return;
                          setSelectedAnswer(i);
                          setShowResult(true);
                          if (i === quizQuestions[currentQuestion].answer) setScore(s => s + 1);
                        }}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          selectedAnswer === null
                            ? 'border-gray-600 bg-gray-900 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                            : i === quizQuestions[currentQuestion].answer
                              ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300'
                              : i === selectedAnswer
                                ? 'border-red-500 bg-red-900/30 text-red-300'
                                : 'border-gray-700 bg-gray-900 text-gray-500'
                        }`}
                      >
                        <span className="font-mono text-sm mr-3">{['A','B','C','D'][i]}</span>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {showResult && (
                    <div className={`mt-4 p-4 rounded-lg border ${
                      selectedAnswer === quizQuestions[currentQuestion].answer
                        ? 'bg-emerald-900/30 border-emerald-600 text-emerald-300'
                        : 'bg-red-900/30 border-red-600 text-red-300'
                    }`}>
                      <p className="font-bold mb-1">
                        {selectedAnswer === quizQuestions[currentQuestion].answer ? '✅ 정답!' : '❌ 오답'}
                      </p>
                      <p className="text-sm text-gray-300">{quizQuestions[currentQuestion].explanation}</p>
                    </div>
                  )}

                  {showResult && (
                    <div className="mt-4 text-right">
                      <button
                        onClick={() => {
                          if (currentQuestion < quizQuestions.length - 1) {
                            setCurrentQuestion(q => q + 1);
                            setSelectedAnswer(null);
                            setShowResult(false);
                          } else {
                            setQuizCompleted(true);
                          }
                        }}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 transition-all"
                      >
                        {currentQuestion < quizQuestions.length - 1 ? '다음 문제 →' : '결과 보기'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto text-center py-12">
                <div className="text-6xl mb-4">{score >= 6 ? '🎉' : score >= 4 ? '👍' : '📚'}</div>
                <h3 className="text-2xl font-bold text-gray-100 mb-2">퀴즈 완료!</h3>
                <p className="text-4xl font-bold text-emerald-400 mb-4">{score} / {quizQuestions.length}</p>
                <p className="text-gray-400 mb-8">
                  {score >= 6 ? '훌륭합니다! 임피던스 진단 전문가 수준입니다!' : score >= 4 ? '잘했습니다! 이론 탭에서 복습하면 더 좋아질 거예요.' : '이론과 시뮬레이터를 다시 살펴보고 도전해보세요!'}
                </p>
                <button
                  onClick={() => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setQuizCompleted(false); }}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 transition-all"
                >
                  다시 도전 🔄
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ImpedanceProbeSimulator;
