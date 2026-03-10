import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ReferenceLine } from 'recharts';

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
        <line x1="115" y1="100" x2="140" y2="100" stroke="#fbbf24" strokeWidth="2">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="0.5s" repeatCount="indefinite"/>
        </line>
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
        <text x="150" y="260" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">
          전력 효율의 비밀을 밝혀라!
        </text>
        <text x="200" y="198" textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold">?</text>
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
      </svg>
    ),
    1: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <text x="150" y="25" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">V, I, θ 관계</text>
        <line x1="40" y1="150" x2="280" y2="150" stroke="#475569" strokeWidth="1"/>
        <path d="M 40 150 Q 80 80 120 150 Q 160 220 200 150 Q 240 80 280 150" fill="none" stroke="#3b82f6" strokeWidth="2.5">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite"/>
        </path>
        <text x="270" y="100" fill="#60a5fa" fontSize="10">V</text>
        <path d="M 60 150 Q 100 90 140 150 Q 180 210 220 150 Q 260 90 280 135" fill="none" stroke="#ef4444" strokeWidth="2.5">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite"/>
        </path>
        <text x="270" y="130" fill="#fca5a5" fontSize="10">I</text>
        <line x1="80" y1="82" x2="100" y2="92" stroke="#fbbf24" strokeWidth="1.5"/>
        <path d="M 80 82 A 30 30 0 0 1 100 92" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        <text x="105" y="82" fill="#fcd34d" fontSize="10" fontWeight="bold">θ</text>
        <rect x="30" y="210" width="240" height="70" rx="8" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1"/>
        <text x="150" y="235" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">P = V × I × cos(θ)</text>
        <text x="150" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">θ가 0°에 가까울수록 전력 전달 효율↑</text>
        <text x="150" y="270" textAnchor="middle" fill="#94a3b8" fontSize="9">θ가 ±90°에 가까울수록 전력 낭비↑</text>
      </svg>
    ),
    2: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <text x="150" y="25" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">임피던스 매칭</text>
        <rect x="20" y="50" width="80" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
        <text x="60" y="72" textAnchor="middle" fill="#93c5fd" fontSize="9">RF Gen</text>
        <text x="60" y="87" textAnchor="middle" fill="#60a5fa" fontSize="8">Z₀ = 50Ω</text>
        <line x1="100" y1="75" x2="130" y2="75" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="130" y="45" width="80" height="60" rx="6" fill="#422006" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="170" y="70" textAnchor="middle" fill="#fcd34d" fontSize="9">Matching</text>
        <text x="170" y="85" textAnchor="middle" fill="#fbbf24" fontSize="8">Z → 50Ω</text>
        <line x1="210" y1="75" x2="240" y2="75" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="240" y="50" width="50" height="50" rx="6" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5"/>
        <text x="265" y="72" textAnchor="middle" fill="#c4b5fd" fontSize="8">Plasma</text>
        <text x="265" y="86" textAnchor="middle" fill="#a78bfa" fontSize="7">Z_L</text>
        <g>
          <text x="150" y="135" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">매칭 성공 시</text>
          <line x1="60" y1="155" x2="260" y2="155" stroke="#10b981" strokeWidth="2.5"/>
          <polygon points="260,155 252,150 252,160" fill="#10b981"/>
          <text x="160" y="170" textAnchor="middle" fill="#6ee7b7" fontSize="9">전력 100% 전달 →</text>
        </g>
        <g>
          <text x="150" y="200" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">매칭 실패 시</text>
          <line x1="60" y1="220" x2="180" y2="220" stroke="#3b82f6" strokeWidth="2"/>
          <polygon points="180,220 172,215 172,225" fill="#3b82f6"/>
          <text x="120" y="215" fill="#93c5fd" fontSize="8">Forward</text>
          <line x1="180" y1="230" x2="90" y2="230" stroke="#ef4444" strokeWidth="2"/>
          <polygon points="90,230 98,225 98,235" fill="#ef4444"/>
          <text x="135" y="245" fill="#fca5a5" fontSize="8">Reflected (반사!)</text>
        </g>
        <text x="150" y="280" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
          Γ = (Z_L - Z₀) / (Z_L + Z₀)
        </text>
      </svg>
    ),
    3: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <text x="150" y="25" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">소스별 임피던스 특성</text>
        <rect x="20" y="45" width="120" height="100" rx="8" fill="#172554" stroke="#3b82f6" strokeWidth="1.5"/>
        <text x="80" y="65" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">CCP</text>
        <line x1="40" y1="80" x2="120" y2="80" stroke="#475569" strokeWidth="0.5"/>
        <line x1="55" y1="95" x2="65" y2="95" stroke="#60a5fa" strokeWidth="2"/>
        <line x1="65" y1="85" x2="65" y2="105" stroke="#60a5fa" strokeWidth="1"/>
        <line x1="75" y1="85" x2="75" y2="105" stroke="#60a5fa" strokeWidth="1"/>
        <line x1="75" y1="95" x2="85" y2="95" stroke="#60a5fa" strokeWidth="2"/>
        <text x="95" y="98" fill="#93c5fd" fontSize="7">+ R</text>
        <text x="80" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8">용량성 (X {'<'} 0)</text>
        <rect x="160" y="45" width="120" height="100" rx="8" fill="#1e1b2e" stroke="#a855f7" strokeWidth="1.5"/>
        <text x="220" y="65" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="bold">ICP</text>
        <line x1="180" y1="80" x2="260" y2="80" stroke="#475569" strokeWidth="0.5"/>
        <path d="M 195 95 Q 200 85 205 95 Q 210 105 215 95 Q 220 85 225 95" fill="none" stroke="#a78bfa" strokeWidth="2"/>
        <text x="240" y="98" fill="#c4b5fd" fontSize="7">+ R</text>
        <text x="220" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8">유도성 (X {'>'} 0)</text>
        <rect x="30" y="170" width="240" height="100" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1"/>
        <text x="150" y="195" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">공정 변화 → 임피던스 변화</text>
        <text x="150" y="215" textAnchor="middle" fill="#94a3b8" fontSize="9">파워 ↑ → R ↓ (더 잘 전도)</text>
        <text x="150" y="230" textAnchor="middle" fill="#94a3b8" fontSize="9">압력 ↑ → R ↑ (충돌 증가)</text>
        <text x="150" y="245" textAnchor="middle" fill="#94a3b8" fontSize="9">가스 변경 → Z 전체 변화</text>
        <text x="150" y="260" textAnchor="middle" fill="#94a3b8" fontSize="9">매칭이 계속 바뀌어야 하는 이유!</text>
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
        <line x1="78" y1="80" x2="122" y2="70" stroke="#6366f1" strokeWidth="1.5" opacity="0.5"/>
        <line x1="178" y1="65" x2="222" y2="75" stroke="#6366f1" strokeWidth="1.5" opacity="0.5"/>
        <line x1="60" y1="108" x2="90" y2="135" stroke="#6366f1" strokeWidth="1.5" opacity="0.5"/>
        <line x1="240" y1="108" x2="210" y2="135" stroke="#6366f1" strokeWidth="1.5" opacity="0.5"/>
        <line x1="130" y1="160" x2="170" y2="160" stroke="#6366f1" strokeWidth="1.5" opacity="0.5"/>
        <text x="150" y="230" textAnchor="middle" fill="#fbbf24" fontSize="20">⭐</text>
        <text x="150" y="255" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">임피던스 진단 전문가</text>
        <text x="150" y="280" textAnchor="middle" fill="#ec4899" fontSize="10">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
          지금 시작하세요!
        </text>
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
  const [frequency, setFrequency] = useState(13.56);
  const [matchC1, setMatchC1] = useState(50);
  const [matchC2, setMatchC2] = useState(50);

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
      step: 1,
      title: "보이지 않는 전력의 흐름",
      content: "반도체 공장의 에칭 장비실. 엔지니어 지현은 새로 설치한 플라즈마 장비 앞에서 고민에 빠졌습니다.\n\nRF 발생기에서 **500W**를 보내고 있는데, 실제 에칭 결과가 **300W** 수준밖에 안 나오는 겁니다. 나머지 **200W**는 도대체 어디로 사라진 걸까요?\n\n\"전력이 새고 있는 건가? 매칭이 안 맞는 건가?\"\n\n지현에게는 이 미스터리를 풀 도구가 있습니다. 바로 __VI Probe(임피던스 프로브)__ — RF 회로의 *전압, 전류, 위상각*을 실시간으로 측정하는 장치입니다!",
      color: "from-emerald-600 to-teal-700"
    },
    {
      step: 2,
      title: "V, I, cos(θ)의 삼각관계",
      content: "VI Probe가 측정하는 세 가지 값을 알아봅시다.\n\n**전압(V)**: RF 신호의 전압 크기입니다. 보통 수백~수천 V 범위죠.\n**전류(I)**: RF 신호의 전류 크기입니다.\n**위상각(θ)**: 전압과 전류 사이의 시간차입니다. 이것이 핵심!\n\n일반 가정의 콘센트는 V와 I가 동시에 움직입니다(θ≈0°). 하지만 플라즈마는 *전도성 기체*이면서 동시에 __커패시터__나 __인덕터__ 성분도 가지고 있어서, V와 I가 어긋나게 됩니다.\n\n실제 전달되는 전력은 **P = V × I × cos(θ)**입니다. θ가 0°이면 cos(0°)=1로 100% 전달. θ가 60°이면 cos(60°)=0.5로 50%만 전달!\n\n지현의 장비에서 θ가 너무 크다면, 전력의 절반이 *허수 전력(reactive power)*으로 낭비되고 있는 겁니다.",
      color: "from-blue-600 to-indigo-700"
    },
    {
      step: 3,
      title: "매칭 네트워크의 마법",
      content: "RF 발생기의 출력 임피던스는 **50Ω**(순수 저항)으로 설계되어 있습니다. 하지만 플라즈마의 임피던스는 수Ω~수백Ω의 저항(R)에 큰 리액턴스(X) 성분이 더해진 복소수입니다.\n\n이 불일치가 있으면 RF 파가 **반사**됩니다! 마치 밧줄의 굵기가 갑자기 바뀌면 파동이 튕겨 돌아오는 것처럼요.\n\n**매칭 네트워크**는 이 문제를 해결합니다. 가변 커패시터 2개(C₁, C₂)를 조절하여 플라즈마의 복잡한 임피던스를 __정확히 50Ω__으로 변환합니다.\n\n반사 계수: __Γ = (Z_L - 50) / (Z_L + 50)__\n반사 전력: **P_reflected = P_forward × |Γ|²**\n\n완벽한 매칭이면 Γ=0, 반사 전력=0! 모든 전력이 플라즈마에 전달됩니다.",
      color: "from-amber-600 to-orange-700"
    },
    {
      step: 4,
      title: "소스가 바뀌면 모든 것이 바뀐다",
      content: "지현이 조사를 시작합니다. VI Probe를 매칭 네트워크 출력단에 설치하고 측정을 시작했습니다.\n\n**CCP(용량결합)**에서 측정하니: Z = 5 - j120 Ω. *용량성* 리액턴스가 지배적입니다. 전극 사이의 쉬스(sheath)가 큰 커패시터 역할을 하기 때문이죠.\n\n**ICP(유도결합)**으로 바꾸니: Z = 3 + j45 Ω. *유도성* 리액턴스입니다. 코일에 의한 유도 성분이 나타납니다.\n\n__RF 파워를 올리면?__ R이 감소합니다. 전자밀도가 높아져 플라즈마가 더 잘 전도되니까요.\n__압력을 올리면?__ R이 증가합니다. 전자-중성입자 충돌이 잦아져 저항이 커집니다.\n\n문제를 찾았습니다! 가스를 바꾼 후 매칭을 다시 안 잡았던 것입니다. 매칭을 재조정하자 **θ가 58°에서 5°로** 떨어지고, 전력 효율이 **95%**로 회복되었습니다!",
      color: "from-rose-600 to-pink-700"
    },
    {
      step: 5,
      title: "당신도 임피던스 진단 전문가!",
      content: "이 시뮬레이터에서 직접 체험해보세요!\n\n**이론 탭**: V, I, θ의 관계, 임피던스 매칭 원리, 반사 계수와 효율 공식을 배웁니다.\n\n**개요 탭**: VI Probe 시스템 구성도와 CCP/ICP별 등가회로를 확인합니다.\n\n**시뮬레이터 탭**: 소스 타입(CCP/ICP), RF 파워, 압력, 가스를 바꾸면서:\n• 임피던스(R + jX)가 어떻게 변하는지\n• 매칭 커패시터를 조절해 반사를 최소화\n• 위상각 θ와 cos(θ) 효율의 변화\n• 전달 전력 vs 반사 전력 실시간 계산\n\n**문제풀이 탭**에서 배운 내용을 확인하세요!\n\n자, **전력의 흐름을 읽는 여정**을 시작합시다!",
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
        } else {
          clearInterval(typingInterval);
        }
      }, 25);
      return () => clearInterval(typingInterval);
    }
  }, [isTheoryPlaying, theoryStep]);

  const formatTheoryContent = useCallback((text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <br key={i} />;
      let formatted = line;
      const parts = [];
      let lastIndex = 0;
      const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(__(.+?)__)/g;
      let match;
      while ((match = regex.exec(formatted)) !== null) {
        if (match.index > lastIndex) parts.push(formatted.slice(lastIndex, match.index));
        if (match[1]) parts.push(<strong key={`b${i}-${match.index}`} className="text-yellow-300">{match[2]}</strong>);
        else if (match[3]) parts.push(<span key={`i${i}-${match.index}`} className="text-cyan-300 font-semibold">{match[4]}</span>);
        else if (match[5]) parts.push(<span key={`u${i}-${match.index}`} className="underline">{match[6]}</span>);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < formatted.length) parts.push(formatted.slice(lastIndex));
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
    let R, X;
    const gasFactors = { Ar: 1.0, O2: 1.3, N2: 1.2, CF4: 1.5, Cl2: 1.4 };
    const gf = gasFactors[gasType] || 1.0;

    if (sourceType === 'CCP') {
      R = (800 / (rfPower + 50)) * (pressure / 10) * gf + 2;
      X = -(200 - rfPower * 0.15 + pressure * 0.8) * gf;
    } else {
      R = (400 / (rfPower + 100)) * (pressure / 8) * gf + 1;
      X = (60 - rfPower * 0.08 + pressure * 1.2) * gf;
    }
    return { R: Math.round(R * 10) / 10, X: Math.round(X * 10) / 10 };
  }, [sourceType, rfPower, pressure, gasType]);

  const calcMatchedImpedance = useCallback(() => {
    const plasma = calcPlasmaImpedance();
    const c1Factor = (matchC1 - 50) * 0.8;
    const c2Factor = (matchC2 - 50) * 0.6;
    let R_matched = plasma.R + c1Factor * 0.05;
    let X_matched = plasma.X + c1Factor + c2Factor;

    const targetR = 50;
    const rDist = Math.abs(R_matched - targetR);
    const xDist = Math.abs(X_matched);

    R_matched = Math.max(1, R_matched);
    return {
      R: Math.round(R_matched * 10) / 10,
      X: Math.round(X_matched * 10) / 10,
      magnitude: Math.round(Math.sqrt(R_matched * R_matched + X_matched * X_matched) * 10) / 10,
      isMatched: rDist < 15 && xDist < 15
    };
  }, [calcPlasmaImpedance, matchC1, matchC2]);

  const calcAll = useCallback(() => {
    const plasma = calcPlasmaImpedance();
    const matched = calcMatchedImpedance();
    const Z0 = 50;

    const Zr = matched.R;
    const Zi = matched.X;
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
    const V = Math.sqrt(pDelivered * Zmag) * 1.414;
    const I = V / Zmag;

    const efficiency = ((pDelivered / pForward) * 100);
    const matchLoss = rfPower * 0.03;

    return {
      plasma, matched,
      gamma: Math.round(gamma * 1000) / 1000,
      pForward: Math.round(pForward),
      pReflected: Math.round(pReflected * 10) / 10,
      pDelivered: Math.round(pDelivered * 10) / 10,
      pPlasma: Math.round((pDelivered - matchLoss) * 10) / 10,
      matchLoss: Math.round(matchLoss * 10) / 10,
      V: Math.round(V),
      I: Math.round(I * 100) / 100,
      theta: Math.round(theta * 10) / 10,
      cosTheta: Math.round(cosTheta * 1000) / 1000,
      efficiency: Math.round(efficiency * 10) / 10,
      Zmag: Math.round(Zmag * 10) / 10
    };
  }, [calcPlasmaImpedance, calcMatchedImpedance, rfPower]);

  // Generate V-I waveform data
  const generateWaveform = useCallback(() => {
    const calc = calcAll();
    const data = [];
    for (let t = 0; t <= 360; t += 5) {
      const rad = t * Math.PI / 180;
      const thetaRad = calc.theta * Math.PI / 180;
      data.push({
        t,
        V: Math.round(calc.V * Math.sin(rad)),
        I: Math.round(calc.I * Math.sin(rad - thetaRad) * 100) / 100
      });
    }
    return data;
  }, [calcAll]);

  // Generate impedance vs parameter sweep
  const generateSweepData = useCallback(() => {
    const data = [];
    for (let p = 50; p <= 800; p += 50) {
      const gf = { Ar: 1.0, O2: 1.3, N2: 1.2, CF4: 1.5, Cl2: 1.4 }[gasType] || 1;
      let R, X;
      if (sourceType === 'CCP') {
        R = (800 / (p + 50)) * (pressure / 10) * gf + 2;
        X = -(200 - p * 0.15 + pressure * 0.8) * gf;
      } else {
        R = (400 / (p + 100)) * (pressure / 8) * gf + 1;
        X = (60 - p * 0.08 + pressure * 1.2) * gf;
      }
      data.push({ power: p, R: Math.round(R * 10) / 10, X: Math.round(X * 10) / 10 });
    }
    return data;
  }, [sourceType, pressure, gasType]);

  const calc = calcAll();

  // ============================================================
  // Quiz Data
  // ============================================================
  const quizQuestions = [
    {
      question: 'VI Probe가 측정하는 세 가지 물리량은?',
      options: ['전압, 전류, 저항', '전압, 전류, 위상각', '전력, 주파수, 임피던스', '전압, 주파수, 반사계수'],
      answer: 1,
      explanation: 'VI Probe는 전압(V), 전류(I), 위상각(θ)을 직접 측정합니다. 이 세 값으로부터 전력, 임피던스, 반사계수 등을 계산합니다.'
    },
    {
      question: '실제 전달 전력(Real Power)을 구하는 공식은?',
      options: ['P = V × I', 'P = V² / R', 'P = V × I × cos(θ)', 'P = I² × Z'],
      answer: 2,
      explanation: 'P = V × I × cos(θ)입니다. cos(θ)는 역률(power factor)로, 위상차가 있으면 전력 전달 효율이 떨어집니다.'
    },
    {
      question: 'RF 매칭 네트워크의 목적은?',
      options: ['주파수를 변환한다', '플라즈마 임피던스를 50Ω으로 변환한다', '전압을 증폭한다', 'DC를 RF로 변환한다'],
      answer: 1,
      explanation: '매칭 네트워크는 플라즈마의 복소 임피던스를 RF 발생기의 출력 임피던스(50Ω)에 맞춰 반사를 최소화합니다.'
    },
    {
      question: '반사 계수 Γ = 0.3일 때, 반사 전력은 전진 전력의 몇 %인가?',
      options: ['3%', '9%', '30%', '60%'],
      answer: 1,
      explanation: 'P_reflected = P_forward × |Γ|² = P_forward × 0.3² = P_forward × 0.09 = 9%입니다.'
    },
    {
      question: 'CCP 플라즈마의 임피던스 특성은?',
      options: ['순수 저항성', '유도성 (X > 0)', '용량성 (X < 0)', '주파수에 무관'],
      answer: 2,
      explanation: 'CCP는 전극 사이의 쉬스(sheath)가 커패시터 역할을 하므로 용량성(X < 0) 리액턴스가 지배적입니다.'
    },
    {
      question: 'RF 파워를 높이면 플라즈마 저항(R)은 어떻게 변하는가?',
      options: ['증가한다', '감소한다', '변하지 않는다', '진동한다'],
      answer: 1,
      explanation: '파워가 높아지면 전자밀도가 증가하여 플라즈마의 전도성이 좋아지므로 저항(R)이 감소합니다.'
    },
    {
      question: '위상각 θ = 0°일 때의 의미는?',
      options: ['전력이 전혀 전달되지 않는다', '전압과 전류가 완전히 동위상이다', '임피던스가 0이다', '플라즈마가 꺼진 상태이다'],
      answer: 1,
      explanation: 'θ = 0°는 전압과 전류가 완전히 동위상(in-phase)임을 의미하며, cos(0°) = 1로 전력 전달 효율이 100%입니다.'
    },
    {
      question: '매칭이 완벽하게 이루어졌을 때 반사 계수 Γ의 값은?',
      options: ['Γ = 1', 'Γ = 0.5', 'Γ = 0', 'Γ = -1'],
      answer: 2,
      explanation: '완벽한 매칭 시 Z_L = Z₀ = 50Ω이므로 Γ = (Z_L - Z₀)/(Z_L + Z₀) = 0/100 = 0입니다. 반사 전력이 0!'
    }
  ];


  // ============================================================
  // Tab definitions
  // ============================================================
  const tabs = [
    { id: 'storytelling', name: '스토리텔링', icon: '📖' },
    { id: 'theory', name: '이론', icon: '📐' },
    { id: 'overview', name: '개요', icon: '🔍' },
    { id: 'simulator', name: '시뮬레이터', icon: '🖥️' },
    { id: 'quiz', name: '문제풀이', icon: '📝' },
  ];

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">📡</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Impedance Probe</h1>
          <p className="text-sm text-gray-400">RF 임피던스 진단 · V, I, Phase 측정 · 매칭 최적화</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2 border-b border-gray-700">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-semibold whitespace-nowrap transition-all
              ${activeTab === tab.id
                ? 'bg-gray-800 text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}`}>
            <span>{tab.icon}</span> {tab.name}
          </button>
        ))}
      </div>

      {/* ================================================================ */}
      {/* TAB: STORYTELLING */}
      {/* ================================================================ */}
      {activeTab === 'storytelling' && (
        <div className="space-y-6">
          {!isTheoryPlaying && !showDetailedContent ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📡</div>
              <h2 className="text-3xl font-bold text-gray-100 mb-4">임피던스 프로브: 전력의 비밀</h2>
              <p className="text-gray-400 mb-8 text-lg">RF 플라즈마의 전력 흐름을 추적하는 여정</p>
              <button onClick={startTheory}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                스토리 시작하기 ▶
              </button>
            </div>
          ) : isTheoryPlaying ? (
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-400">Step {theoryStep + 1} / {storySteps.length}</span>
                <div className="flex gap-2">
                  {storySteps.map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full transition-all ${i <= theoryStep ? 'bg-emerald-500 scale-110' : 'bg-gray-700'}`}/>
                  ))}
                </div>
                <button onClick={skipTheory} className="text-sm text-gray-400 hover:text-gray-300">건너뛰기 →</button>
              </div>
              <div className={`bg-gradient-to-br ${storySteps[theoryStep].color} rounded-2xl shadow-2xl min-h-[420px] flex flex-col lg:flex-row overflow-hidden`}>
                <div className="lg:w-2/5 w-full p-6 flex items-center justify-center bg-black/20 border-b lg:border-b-0 lg:border-r border-white/10">
                  <div className="w-full max-w-[280px]">
                    <ImpedanceStoryIllustration step={theoryStep} isVisible={svgVisible} />
                  </div>
                </div>
                <div className="lg:w-3/5 w-full p-8 text-white flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-6">{storySteps[theoryStep].title}</h3>
                  <div className="text-base leading-relaxed overflow-y-auto max-h-[320px]">
                    {formatTheoryContent(typedText)}
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={prevTheoryStep} disabled={theoryStep === 0}
                  className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold disabled:opacity-30 hover:bg-gray-600 transition-all">
                  ← 이전
                </button>
                <button onClick={nextTheoryStep}
                  className="px-6 py-3 bg-gray-800 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-900/30 transition-all">
                  {theoryStep === storySteps.length - 1 ? '완료 ✓' : '다음 →'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">스토리텔링 완료!</h3>
              <p className="text-gray-400 mb-6">이론, 개요, 시뮬레이터 탭에서 더 깊이 학습해보세요.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => {setShowDetailedContent(false); setIsTheoryPlaying(false);}}
                  className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600">
                  다시 보기
                </button>
                <button onClick={() => setActiveTab('theory')}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700">
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
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-100">임피던스 프로브 이론</h2>

          {/* 1. V, I, Phase */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6 space-y-4">
            <h3 className="text-xl font-bold text-emerald-400">1. 전압, 전류, 위상각의 관계</h3>
            <p className="text-gray-300 leading-relaxed">
              RF 시스템에서 전압과 전류는 같은 주파수의 정현파이지만, 부하의 임피던스에 따라 <strong>위상차(θ)</strong>가 발생합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 space-y-2">
                <h4 className="font-bold text-amber-300">핵심 공식</h4>
                <div className="space-y-2 font-mono text-sm">
                  <div className="bg-gray-800 rounded p-2">
                    <span className="text-cyan-300">V(t) = V₀ sin(ωt)</span>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <span className="text-red-300">I(t) = I₀ sin(ωt - θ)</span>
                  </div>
                  <div className="bg-amber-900/30 rounded p-2 border border-amber-700/50">
                    <span className="text-amber-300 font-bold">P_real = ½V₀I₀ cos(θ)</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 space-y-2">
                <h4 className="font-bold text-amber-300">위상각에 따른 전력</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div className="flex justify-between"><span>θ = 0°</span><span className="text-green-400">cos(θ) = 1.000 → 100% 효율</span></div>
                  <div className="flex justify-between"><span>θ = 30°</span><span className="text-green-300">cos(θ) = 0.866 → 86.6%</span></div>
                  <div className="flex justify-between"><span>θ = 45°</span><span className="text-yellow-300">cos(θ) = 0.707 → 70.7%</span></div>
                  <div className="flex justify-between"><span>θ = 60°</span><span className="text-orange-300">cos(θ) = 0.500 → 50.0%</span></div>
                  <div className="flex justify-between"><span>θ = 80°</span><span className="text-red-300">cos(θ) = 0.174 → 17.4%</span></div>
                  <div className="flex justify-between"><span>θ = 90°</span><span className="text-red-500">cos(θ) = 0.000 → 0% (!)</span></div>
                </div>
              </div>
            </div>
            <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-800/30">
              <h4 className="font-bold text-indigo-300 mb-2">왜 위상이 생기는가?</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                순수 저항(R)만 있으면 θ=0°입니다. 하지만 플라즈마에는 <strong className="text-cyan-300">커패시턴스(C)</strong>와
                <strong className="text-cyan-300"> 인덕턴스(L)</strong> 성분이 있습니다.
                커패시터는 전류가 전압보다 앞서가고(θ {'<'} 0), 인덕터는 전류가 뒤처집니다(θ {'>'} 0).
                이 리액턴스 성분이 클수록 θ가 커지고, 전력 효율이 떨어집니다.
              </p>
            </div>
          </div>

          {/* 2. Impedance */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6 space-y-4">
            <h3 className="text-xl font-bold text-emerald-400">2. 복소 임피던스 (Z = R + jX)</h3>
            <p className="text-gray-300 leading-relaxed">
              임피던스는 <strong>저항(R)</strong>과 <strong>리액턴스(X)</strong>의 합으로 표현됩니다.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-900/30 rounded-lg p-4">
                <h4 className="font-bold text-blue-300 mb-2">저항 R (Ω)</h4>
                <p className="text-xs text-gray-300">실제 전력이 소모되는 성분. 플라즈마에서 R은 전자-중성입자 충돌에 의해 결정됩니다.</p>
              </div>
              <div className="bg-purple-900/30 rounded-lg p-4">
                <h4 className="font-bold text-purple-300 mb-2">리액턴스 X (Ω)</h4>
                <p className="text-xs text-gray-300">에너지를 저장했다 돌려주는 성분. X {'>'} 0이면 유도성, X {'<'} 0이면 용량성입니다.</p>
              </div>
              <div className="bg-amber-900/30 rounded-lg p-4">
                <h4 className="font-bold text-amber-300 mb-2">크기 |Z| = √(R²+X²)</h4>
                <p className="text-xs text-gray-300">임피던스의 절대값. 옴의 법칙에서 V = |Z| × I 관계가 됩니다.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <svg viewBox="0 0 300 200" className="w-full max-w-sm">
                <line x1="50" y1="100" x2="270" y2="100" stroke="#475569" strokeWidth="1"/>
                <line x1="150" y1="20" x2="150" y2="180" stroke="#475569" strokeWidth="1"/>
                <text x="275" y="105" fill="#94a3b8" fontSize="10">R</text>
                <text x="155" y="18" fill="#94a3b8" fontSize="10">+jX (유도성)</text>
                <text x="155" y="192" fill="#94a3b8" fontSize="10">-jX (용량성)</text>
                <line x1="150" y1="100" x2="230" y2="55" stroke="#fbbf24" strokeWidth="2.5"/>
                <circle cx="230" cy="55" r="4" fill="#fbbf24"/>
                <text x="240" y="50" fill="#fcd34d" fontSize="10" fontWeight="bold">Z = R + jX</text>
                <line x1="150" y1="100" x2="230" y2="100" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2"/>
                <text x="185" y="115" fill="#60a5fa" fontSize="9">R</text>
                <line x1="230" y1="100" x2="230" y2="55" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2"/>
                <text x="235" y="80" fill="#c4b5fd" fontSize="9">jX</text>
                <path d="M 170 100 A 20 20 0 0 0 166 90" fill="none" stroke="#fbbf24" strokeWidth="1"/>
                <text x="175" y="92" fill="#fcd34d" fontSize="9">θ</text>
              </svg>
            </div>
          </div>

          {/* 3. Matching & Reflection */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6 space-y-4">
            <h3 className="text-xl font-bold text-emerald-400">3. 매칭과 반사</h3>
            <div className="space-y-3">
              <p className="text-gray-300 leading-relaxed">
                RF 발생기(Z₀=50Ω)와 플라즈마(Z_L) 사이에 <strong>임피던스 불일치</strong>가 있으면 RF 파가 반사됩니다.
              </p>
              <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-amber-300">핵심 수식</h4>
                <div className="grid sm:grid-cols-2 gap-3 font-mono text-sm">
                  <div className="bg-gray-800 rounded p-3 text-center">
                    <p className="text-cyan-300 mb-1">반사 계수</p>
                    <p className="text-amber-300 text-lg font-bold">Γ = (Z_L - Z₀) / (Z_L + Z₀)</p>
                  </div>
                  <div className="bg-gray-800 rounded p-3 text-center">
                    <p className="text-cyan-300 mb-1">반사 전력</p>
                    <p className="text-amber-300 text-lg font-bold">P_ref = P_fwd × |Γ|²</p>
                  </div>
                  <div className="bg-gray-800 rounded p-3 text-center">
                    <p className="text-cyan-300 mb-1">전달 전력</p>
                    <p className="text-amber-300 text-lg font-bold">P_del = P_fwd - P_ref</p>
                  </div>
                  <div className="bg-gray-800 rounded p-3 text-center">
                    <p className="text-cyan-300 mb-1">전달 효율</p>
                    <p className="text-amber-300 text-lg font-bold">η = (1 - |Γ|²) × 100%</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-800/30">
                <h4 className="font-bold text-green-300 mb-2">매칭 네트워크의 역할</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  L-type 매칭 네트워크는 두 개의 가변 커패시터(C₁: 튜닝, C₂: 로딩)를 사용합니다.
                  <strong className="text-green-300"> C₁</strong>은 주로 리액턴스(X)를 상쇄하고,
                  <strong className="text-green-300"> C₂</strong>는 저항(R) 성분을 50Ω에 맞춥니다.
                  두 값을 조절하여 Γ → 0, 즉 반사를 최소화합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Source Types */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6 space-y-4">
            <h3 className="text-xl font-bold text-emerald-400">4. 소스 타입별 임피던스 특성</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800/30">
                <h4 className="font-bold text-blue-300 mb-2">CCP (용량결합 플라즈마)</h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-2">
                  두 전극 사이의 <strong className="text-blue-300">쉬스(sheath)</strong>가 직렬 커패시터 역할.
                  리액턴스가 <strong className="text-red-300">음수(X {'<'} 0)</strong>, 용량성 부하.
                </p>
                <div className="bg-gray-900/50 rounded p-2 font-mono text-sm text-center">
                  <span className="text-blue-300">Z_CCP ≈ R_p + 1/(jωC_sheath)</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">일반적: R = 2~20Ω, X = -50~-200Ω</p>
              </div>
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800/30">
                <h4 className="font-bold text-purple-300 mb-2">ICP (유도결합 플라즈마)</h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-2">
                  코일에 의한 <strong className="text-purple-300">유도 성분</strong>이 지배적.
                  리액턴스가 <strong className="text-green-300">양수(X {'>'} 0)</strong>, 유도성 부하.
                </p>
                <div className="bg-gray-900/50 rounded p-2 font-mono text-sm text-center">
                  <span className="text-purple-300">Z_ICP ≈ R_p + jωL_coil</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">일반적: R = 1~10Ω, X = +20~+80Ω</p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ================================================================ */}
      {/* TAB: OVERVIEW */}
      {/* ================================================================ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-100">VI Probe 시스템 개요</h2>

          {/* System Diagram */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">RF 전력 전달 시스템 구성도</h3>
            <div className="flex justify-center">
              <svg viewBox="0 0 600 220" className="w-full max-w-3xl">
                <rect x="10" y="60" width="100" height="80" rx="8" fill="#172554" stroke="#3b82f6" strokeWidth="2"/>
                <text x="60" y="95" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">RF Generator</text>
                <text x="60" y="115" textAnchor="middle" fill="#60a5fa" fontSize="10">13.56 MHz</text>
                <text x="60" y="130" textAnchor="middle" fill="#60a5fa" fontSize="10">Z₀ = 50Ω</text>
                <line x1="110" y1="100" x2="160" y2="100" stroke="#fbbf24" strokeWidth="3">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="0.5s" repeatCount="indefinite"/>
                </line>
                <text x="135" y="90" textAnchor="middle" fill="#fbbf24" fontSize="8">RF Power</text>
                <rect x="160" y="50" width="120" height="100" rx="8" fill="#422006" stroke="#f59e0b" strokeWidth="2"/>
                <text x="220" y="85" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">Matching</text>
                <text x="220" y="102" textAnchor="middle" fill="#fbbf24" fontSize="10">Network</text>
                <text x="220" y="120" textAnchor="middle" fill="#d97706" fontSize="9">C₁ (Tune)</text>
                <text x="220" y="135" textAnchor="middle" fill="#d97706" fontSize="9">C₂ (Load)</text>
                <line x1="280" y1="100" x2="330" y2="100" stroke="#94a3b8" strokeWidth="3"/>
                <rect x="330" y="40" width="90" height="55" rx="6" fill="#052e16" stroke="#10b981" strokeWidth="2.5">
                  <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
                </rect>
                <text x="375" y="63" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">VI Probe</text>
                <text x="375" y="80" textAnchor="middle" fill="#34d399" fontSize="9">V, I, θ 측정</text>
                <line x1="330" y1="100" x2="460" y2="100" stroke="#94a3b8" strokeWidth="3"/>
                <rect x="460" y="50" width="120" height="100" rx="8" fill="#1e1b2e" stroke="#a855f7" strokeWidth="2"/>
                <ellipse cx="520" cy="95" rx="35" ry="25" fill="#7c3aed" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite"/>
                </ellipse>
                <text x="520" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold">Plasma</text>
                <text x="520" y="108" textAnchor="middle" fill="#a78bfa" fontSize="9">Z_L = R + jX</text>
                <text x="520" y="140" textAnchor="middle" fill="#a78bfa" fontSize="9">변동 부하</text>
                <path d="M 375 95 L 375 170 L 500 170" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2"/>
                <rect x="440" y="160" width="120" height="45" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1"/>
                <text x="500" y="178" textAnchor="middle" fill="#6ee7b7" fontSize="9">→ P, Z, Γ, η 계산</text>
                <text x="500" y="195" textAnchor="middle" fill="#34d399" fontSize="8">실시간 모니터링</text>
                <line x1="190" y1="150" x2="150" y2="180" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3"/>
                <text x="120" y="195" fill="#fca5a5" fontSize="9">반사파 ← 매칭 안될 때</text>
              </svg>
            </div>
          </div>

          {/* Matching Detail Dropdown */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 overflow-hidden">
            <button onClick={() => setShowMatchingDetail(!showMatchingDetail)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-700 transition-all">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔧</span>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-emerald-400">L-Type 매칭 네트워크 상세</h3>
                  <p className="text-sm text-gray-400">등가 회로, 매칭 원리, CCP/ICP 차이 (클릭하여 펼치기)</p>
                </div>
              </div>
              <span className={`text-2xl text-emerald-400 transition-transform duration-300 ${showMatchingDetail ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showMatchingDetail && (
              <div className="px-6 pb-6 border-t border-gray-700">
                <div className="mt-4 space-y-4">
                  <div className="flex justify-center">
                    <svg viewBox="0 0 400 200" className="w-full max-w-lg">
                      <text x="200" y="20" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">L-Type 매칭 네트워크 등가회로</text>
                      <line x1="30" y1="80" x2="80" y2="80" stroke="#94a3b8" strokeWidth="2"/>
                      <text x="55" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">50Ω in</text>
                      <line x1="80" y1="80" x2="80" y2="110" stroke="#f59e0b" strokeWidth="2"/>
                      <line x1="70" y1="110" x2="90" y2="110" stroke="#f59e0b" strokeWidth="2"/>
                      <line x1="70" y1="118" x2="90" y2="118" stroke="#f59e0b" strokeWidth="2"/>
                      <line x1="80" y1="118" x2="80" y2="150" stroke="#f59e0b" strokeWidth="2"/>
                      <line x1="65" y1="150" x2="95" y2="150" stroke="#94a3b8" strokeWidth="1"/>
                      <text x="80" y="170" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">C₁ (Shunt)</text>
                      <text x="80" y="182" textAnchor="middle" fill="#d97706" fontSize="8">리액턴스 조절</text>
                      <line x1="80" y1="80" x2="180" y2="80" stroke="#94a3b8" strokeWidth="2"/>
                      <line x1="180" y1="70" x2="180" y2="90" stroke="#f59e0b" strokeWidth="2"/>
                      <line x1="195" y1="70" x2="195" y2="90" stroke="#f59e0b" strokeWidth="2"/>
                      <line x1="195" y1="80" x2="250" y2="80" stroke="#94a3b8" strokeWidth="2"/>
                      <text x="187" y="60" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">C₂ (Series)</text>
                      <text x="187" y="108" textAnchor="middle" fill="#d97706" fontSize="8">저항 매칭</text>
                      <rect x="260" y="60" width="80" height="40" rx="6" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5"/>
                      <text x="300" y="82" textAnchor="middle" fill="#c4b5fd" fontSize="9">Z_plasma</text>
                      <line x1="340" y1="80" x2="370" y2="80" stroke="#94a3b8" strokeWidth="2"/>
                      <line x1="250" y1="80" x2="260" y2="80" stroke="#94a3b8" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800/30">
                      <h5 className="font-bold text-blue-300 text-sm mb-1">CCP 매칭 전략</h5>
                      <p className="text-xs text-gray-300">용량성 부하(X{'<'}0)를 상쇄하기 위해 인덕터 또는 C₁을 크게 설정. 쉬스 캐패시턴스의 변화에 따라 C₂로 미세 조정.</p>
                    </div>
                    <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-800/30">
                      <h5 className="font-bold text-purple-300 text-sm mb-1">ICP 매칭 전략</h5>
                      <p className="text-xs text-gray-300">유도성 부하(X{'>'}0)를 상쇄하기 위해 직렬 커패시터(C₂)를 작게 설정. 코일 인덕턴스에 맞춰 C₁으로 튜닝.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Measurement Points */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">VI Probe 측정 파라미터</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: '전압 (V)', desc: 'RF 전압 진폭 (Vpp/Vrms)', unit: '수백~수천 V', color: 'blue' },
                { name: '전류 (I)', desc: 'RF 전류 진폭', unit: '수~수십 A', color: 'red' },
                { name: '위상각 (θ)', desc: 'V와 I 사이의 위상차', unit: '-90° ~ +90°', color: 'amber' },
                { name: '임피던스 (Z)', desc: 'Z = V/I, R + jX', unit: 'Ω (복소수)', color: 'purple' },
                { name: '전달 전력 (P)', desc: 'P = V×I×cos(θ)', unit: 'W', color: 'green' },
                { name: '반사 계수 (Γ)', desc: '매칭 품질 지표', unit: '0 (완벽) ~ 1 (전반사)', color: 'rose' },
              ].map((param, i) => (
                <div key={i} className={`bg-${param.color}-900/20 rounded-lg p-3 border border-${param.color}-800/30`}>
                  <h4 className={`font-bold text-${param.color}-300 text-sm mb-1`}>{param.name}</h4>
                  <p className="text-xs text-gray-300">{param.desc}</p>
                  <p className="text-xs text-gray-500 mt-1">{param.unit}</p>
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
          <h2 className="text-2xl font-bold text-gray-100">임피던스 시뮬레이터</h2>

          {/* Controls */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">플라즈마 소스 설정</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">소스 타입</label>
                <div className="flex gap-2">
                  {['CCP', 'ICP'].map(t => (
                    <button key={t} onClick={() => setSourceType(t)}
                      className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all
                        ${sourceType === t ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">RF Power: {rfPower}W</label>
                <input type="range" min="50" max="1000" step="10" value={rfPower} onChange={e => setRfPower(Number(e.target.value))}
                  className="w-full accent-emerald-500"/>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">압력: {pressure} mTorr</label>
                <input type="range" min="1" max="100" step="1" value={pressure} onChange={e => setPressure(Number(e.target.value))}
                  className="w-full accent-emerald-500"/>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">가스</label>
                <select value={gasType} onChange={e => setGasType(e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 text-sm">
                  {['Ar', 'O2', 'N2', 'CF4', 'Cl2'].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Matching Controls */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4">매칭 네트워크 조절</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-400 block mb-1">C₁ (Tune): {matchC1} pF</label>
                <input type="range" min="0" max="100" step="1" value={matchC1} onChange={e => setMatchC1(Number(e.target.value))}
                  className="w-full accent-amber-500"/>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">C₂ (Load): {matchC2} pF</label>
                <input type="range" min="0" max="100" step="1" value={matchC2} onChange={e => setMatchC2(Number(e.target.value))}
                  className="w-full accent-amber-500"/>
              </div>
            </div>
            <div className={`mt-3 text-center py-2 rounded-lg text-sm font-bold ${calc.gamma < 0.1 ? 'bg-green-900/30 text-green-400' : calc.gamma < 0.3 ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'}`}>
              {calc.gamma < 0.1 ? '✅ 매칭 양호! (Γ < 0.1)' : calc.gamma < 0.3 ? '⚠️ 매칭 보통 (반사 존재)' : '❌ 매칭 불량! C₁, C₂를 조절하세요'}
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">플라즈마 임피던스</div>
              <div className="text-xl font-bold text-cyan-300">{calc.plasma.R} {calc.plasma.X >= 0 ? '+' : ''}{calc.plasma.X}j Ω</div>
              <div className="text-xs text-gray-500 mt-1">{calc.plasma.X < 0 ? '용량성' : '유도성'}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">위상각 / 역률</div>
              <div className="text-xl font-bold text-amber-300">{calc.theta}° / cos(θ)={calc.cosTheta}</div>
              <div className="text-xs text-gray-500 mt-1">V: {calc.V}V, I: {calc.I}A</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">반사 계수 Γ</div>
              <div className={`text-xl font-bold ${calc.gamma < 0.1 ? 'text-green-400' : calc.gamma < 0.3 ? 'text-yellow-400' : 'text-red-400'}`}>{calc.gamma}</div>
              <div className="text-xs text-gray-500 mt-1">|Γ|² = {(calc.gamma * calc.gamma * 100).toFixed(1)}% 반사</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">전력 효율</div>
              <div className={`text-xl font-bold ${calc.efficiency > 90 ? 'text-green-400' : calc.efficiency > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{calc.efficiency}%</div>
              <div className="text-xs text-gray-500 mt-1">{calc.pDelivered}W / {calc.pForward}W</div>
            </div>
          </div>

          {/* Power Flow */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">전력 흐름 다이어그램</h3>
            <div className="flex justify-center">
              <svg viewBox="0 0 500 120" className="w-full max-w-2xl">
                <rect x="10" y="30" width="100" height="60" rx="8" fill="#172554" stroke="#3b82f6" strokeWidth="1.5"/>
                <text x="60" y="55" textAnchor="middle" fill="#93c5fd" fontSize="10">RF Generator</text>
                <text x="60" y="72" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">{calc.pForward}W</text>
                <line x1="110" y1="60" x2="175" y2="60" stroke="#3b82f6" strokeWidth="3"/>
                <polygon points="175,60 168,55 168,65" fill="#3b82f6"/>
                <text x="142" y="50" textAnchor="middle" fill="#60a5fa" fontSize="8">Forward</text>
                {calc.pReflected > 0.5 && (
                  <g>
                    <line x1="175" y1="70" x2="115" y2="70" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2"/>
                    <polygon points="115,70 122,65 122,75" fill="#ef4444"/>
                    <text x="145" y="85" textAnchor="middle" fill="#fca5a5" fontSize="8">Reflected: {calc.pReflected}W</text>
                  </g>
                )}
                <rect x="180" y="25" width="100" height="70" rx="8" fill="#422006" stroke="#f59e0b" strokeWidth="1.5"/>
                <text x="230" y="50" textAnchor="middle" fill="#fcd34d" fontSize="10">Matching</text>
                <text x="230" y="68" textAnchor="middle" fill="#d97706" fontSize="8">Loss: {calc.matchLoss}W</text>
                <text x="230" y="82" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">{calc.pDelivered}W →</text>
                <line x1="280" y1="60" x2="350" y2="60" stroke="#10b981" strokeWidth="3"/>
                <polygon points="350,60 343,55 343,65" fill="#10b981"/>
                <text x="315" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="8">Delivered</text>
                <rect x="355" y="25" width="130" height="70" rx="8" fill="#1e1b2e" stroke="#a855f7" strokeWidth="1.5"/>
                <ellipse cx="420" cy="55" rx="30" ry="18" fill="#7c3aed" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite"/>
                </ellipse>
                <text x="420" y="52" textAnchor="middle" fill="#c4b5fd" fontSize="10">Plasma</text>
                <text x="420" y="72" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">{calc.pPlasma}W</text>
                <text x="420" y="88" textAnchor="middle" fill="#a78bfa" fontSize="8">실제 플라즈마 전력</text>
              </svg>
            </div>
          </div>

          {/* Waveform Chart */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4">V-I 파형 (위상차 θ = {calc.theta}°)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={generateWaveform()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                  <XAxis dataKey="t" tick={{fontSize: 10, fill: '#9ca3af'}} label={{value: '각도 (°)', position: 'insideBottom', offset: -5, style: {fontSize: 10, fill: '#9ca3af'}}}/>
                  <YAxis yAxisId="v" tick={{fontSize: 10, fill: '#60a5fa'}} label={{value: 'V', angle: -90, position: 'insideLeft', style: {fontSize: 10, fill: '#60a5fa'}}}/>
                  <YAxis yAxisId="i" orientation="right" tick={{fontSize: 10, fill: '#f87171'}} label={{value: 'A', angle: 90, position: 'insideRight', style: {fontSize: 10, fill: '#f87171'}}}/>
                  <Tooltip contentStyle={{backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px'}} labelStyle={{color: '#9ca3af'}}/>
                  <Line yAxisId="v" type="monotone" dataKey="V" stroke="#3b82f6" strokeWidth={2} dot={false} name="전압 (V)"/>
                  <Line yAxisId="i" type="monotone" dataKey="I" stroke="#ef4444" strokeWidth={2} dot={false} name="전류 (A)"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4">R, X vs RF Power (파워 스윕)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={generateSweepData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                  <XAxis dataKey="power" tick={{fontSize: 10, fill: '#9ca3af'}} label={{value: 'RF Power (W)', position: 'insideBottom', offset: -5, style: {fontSize: 10, fill: '#9ca3af'}}}/>
                  <YAxis tick={{fontSize: 10, fill: '#9ca3af'}} label={{value: 'Ω', angle: -90, position: 'insideLeft', style: {fontSize: 10, fill: '#9ca3af'}}}/>
                  <Tooltip contentStyle={{backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px'}} labelStyle={{color: '#9ca3af'}}/>
                  <ReferenceLine y={0} stroke="#475569"/>
                  <Line type="monotone" dataKey="R" stroke="#3b82f6" strokeWidth={2} dot={false} name="R (저항)"/>
                  <Line type="monotone" dataKey="X" stroke="#a855f7" strokeWidth={2} dot={false} name="X (리액턴스)"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Calculation Detail */}
          <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">수식 계산 과정</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm font-mono">
              <div className="space-y-2">
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">1. 플라즈마 임피던스</p>
                  <p className="text-cyan-300">Z_plasma = {calc.plasma.R} {calc.plasma.X >= 0 ? '+' : ''} {calc.plasma.X}j Ω</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">2. 매칭 후 부하 임피던스</p>
                  <p className="text-cyan-300">Z_load = {calc.matched.R} {calc.matched.X >= 0 ? '+' : ''} {calc.matched.X}j Ω</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">3. 반사 계수</p>
                  <p className="text-amber-300">Γ = (Z_L - 50)/(Z_L + 50) = {calc.gamma}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">4. 전력 계산</p>
                  <p className="text-green-300">P_fwd = {calc.pForward}W</p>
                  <p className="text-red-300">P_ref = {calc.pForward} × {calc.gamma}² = {calc.pReflected}W</p>
                  <p className="text-emerald-300">P_del = {calc.pForward} - {calc.pReflected} = {calc.pDelivered}W</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-gray-500 mb-1">5. VI 측정값</p>
                  <p className="text-blue-300">V = {calc.V}V, I = {calc.I}A</p>
                  <p className="text-amber-300">θ = {calc.theta}°, cos(θ) = {calc.cosTheta}</p>
                  <p className="text-green-300">P = V×I×cos(θ) = {calc.pDelivered}W ✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ================================================================ */}
      {/* TAB: QUIZ */}
      {/* ================================================================ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-100">임피던스 프로브 문제풀이</h2>

          {!quizCompleted ? (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">문제 {currentQuestion + 1} / {quizQuestions.length}</span>
                <span className="text-sm text-emerald-400">점수: {score} / {quizQuestions.length}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{width: `${((currentQuestion) / quizQuestions.length) * 100}%`}}/>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg shadow-black/20 p-6">
                <h3 className="text-lg font-bold text-gray-100 mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((opt, i) => (
                    <button key={i}
                      onClick={() => {
                        if (!showResult) {
                          setSelectedAnswer(i);
                          setShowResult(true);
                          if (i === quizQuestions[currentQuestion].answer) setScore(score + 1);
                        }
                      }}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        showResult
                          ? i === quizQuestions[currentQuestion].answer
                            ? 'border-green-500 bg-green-900/30 text-green-300'
                            : i === selectedAnswer
                              ? 'border-red-500 bg-red-900/30 text-red-300'
                              : 'border-gray-700 text-gray-400'
                          : selectedAnswer === i
                            ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300'
                            : 'border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                      }`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          showResult && i === quizQuestions[currentQuestion].answer ? 'bg-green-600 text-white'
                          : showResult && i === selectedAnswer ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-400'
                        }`}>{String.fromCharCode(65 + i)}</span>
                        <span className="text-sm">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {showResult && (
                  <div className={`mt-4 p-4 rounded-lg ${selectedAnswer === quizQuestions[currentQuestion].answer ? 'bg-green-900/20 border border-green-800/30' : 'bg-red-900/20 border border-red-800/30'}`}>
                    <p className={`text-sm font-bold mb-1 ${selectedAnswer === quizQuestions[currentQuestion].answer ? 'text-green-300' : 'text-red-300'}`}>
                      {selectedAnswer === quizQuestions[currentQuestion].answer ? '정답! ✅' : '오답 ❌'}
                    </p>
                    <p className="text-sm text-gray-300">{quizQuestions[currentQuestion].explanation}</p>
                  </div>
                )}
                {showResult && (
                  <button onClick={() => {
                    if (currentQuestion < quizQuestions.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                      setSelectedAnswer(null);
                      setShowResult(false);
                    } else {
                      setQuizCompleted(true);
                    }
                  }}
                    className="mt-4 w-full py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all">
                    {currentQuestion < quizQuestions.length - 1 ? '다음 문제 →' : '결과 보기'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="text-6xl mb-4">{score >= quizQuestions.length * 0.8 ? '🏆' : score >= quizQuestions.length * 0.5 ? '👍' : '📚'}</div>
              <h3 className="text-2xl font-bold text-gray-100 mb-2">퀴즈 완료!</h3>
              <p className="text-4xl font-bold text-emerald-400 mb-4">{score} / {quizQuestions.length}</p>
              <p className="text-gray-400 mb-6">
                {score >= quizQuestions.length * 0.8 ? '훌륭합니다! 임피던스 진단 전문가!' :
                 score >= quizQuestions.length * 0.5 ? '잘했습니다! 조금 더 학습하면 완벽!' : '이론 탭에서 복습 후 다시 도전하세요!'}
              </p>
              <button onClick={() => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setQuizCompleted(false); }}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700">
                다시 도전하기
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ImpedanceProbeSimulator;
