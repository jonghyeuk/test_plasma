import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const PlasmaSimulatorI = () => {
  const [activeTab, setActiveTab] = useState('plasma-basics');
  const [basicGasPressure, setBasicGasPressure] = useState(3.0);
  const [basicPlasmaEnergy, setBasicPlasmaEnergy] = useState(100);
  const [pressure, setPressure] = useState(1.0);
  const [distance, setDistance] = useState(1.0);
  const [gasType, setGasType] = useState('Ar');
  const [animating, setAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [frequency, setFrequency] = useState(13.56);
  const [inductance, setInductance] = useState(100);
  const [capacitance, setCapacitance] = useState(100);
  const [rfPower, setRfPower] = useState(100);
  const [loadImpedance, setLoadImpedance] = useState(50);
  const [autoMatch, setAutoMatch] = useState(false);

  // Theory opening animation states
  const [theoryStep, setTheoryStep] = useState(0);
  const [isTheoryPlaying, setIsTheoryPlaying] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showDetailedTheory, setShowDetailedTheory] = useState(false);

  const tabs = [
    { id: 'plasma-basics', name: '플라즈마 기초', icon: '⚡' },
    { id: 'plasma-principle1', name: '플라즈마 원리 1', icon: '🔬' },
    { id: 'plasma-principle2', name: '플라즈마 원리 2', icon: '📊' },
    { id: 'rf-matching', name: 'RF 매칭', icon: '📡' },
    { id: 'system-structure', name: '시스템 구조', icon: '🏗️' }
  ];

  // Theory steps for plasma basics
  const theorySteps = [
    {
      step: 1,
      title: "플라즈마란 무엇인가?",
      content: "플라즈마는 고체, 액체, 기체에 이어 물질의 '제4상태'로 불립니다. 우주의 99% 이상이 플라즈마 상태이며, 지구에서는 번개, 오로라, 형광등 등에서 볼 수 있습니다. 반도체 공정에서 사용되는 플라즈마는 '저온 플라즈마'로, 전자의 온도는 매우 높지만 이온과 중성입자의 온도는 상대적으로 낮은 특성을 가집니다.",
      color: "from-blue-500 to-purple-500"
    },
    {
      step: 2,
      title: "플라즈마의 핵심 특성",
      content: "플라즈마는 세 가지 핵심 특성을 가집니다. 첫째, '준중성(Quasi-neutrality)'으로 전체적으로 전기적 중성을 유지합니다. 둘째, '집단 거동(Collective Behavior)'으로 입자들이 서로 영향을 주고받으며 움직입니다. 셋째, '전기전도성'을 가져 전자기파와 상호작용이 가능합니다.",
      color: "from-purple-500 to-pink-500"
    },
    {
      step: 3,
      title: "반도체 공정에서의 플라즈마",
      content: "반도체 제조 공정에서 플라즈마는 필수적인 역할을 합니다. 주요 응용으로는 '식각(Etching)' - 미세 패턴 형성, '증착(Deposition)' - PECVD를 통한 박막 형성, '세정(Cleaning)' - 포토레지스트 제거 및 표면 청정화가 있습니다. 플라즈마를 사용하면 저온에서도 고품질의 공정이 가능합니다.",
      color: "from-pink-500 to-red-500"
    },
    {
      step: 4,
      title: "플라즈마 생성과 제어",
      content: "플라즈마는 기체에 충분한 에너지를 가하면 생성됩니다. 전자가 원자로부터 분리되어 양이온과 자유전자가 공존하는 상태가 되는 것입니다. 압력, 전력, 주파수 등의 파라미터를 조절하여 플라즈마의 밀도, 온도, 화학적 특성을 제어할 수 있습니다.",
      color: "from-red-500 to-orange-500"
    },
    {
      step: 5,
      title: "저온 플라즈마의 특별함",
      content: "반도체 공정에서 사용하는 저온 플라즈마는 '비평형 플라즈마'입니다. 전자 온도는 10,000~100,000K에 달하지만, 이온과 중성입자의 온도는 상온에 가깝습니다. 이러한 특성 덕분에 열에 민감한 반도체 웨이퍼를 손상시키지 않으면서도 높은 반응성을 얻을 수 있습니다. 이것이 바로 플라즈마 공정의 핵심 장점입니다.",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  // Typing animation effect
  useEffect(() => {
    if (isTheoryPlaying && theoryStep < theorySteps.length) {
      const fullText = theorySteps[theoryStep].content;
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30); // Typing speed

      return () => clearInterval(typingInterval);
    }
  }, [isTheoryPlaying, theoryStep]);

  // Theory control functions
  const startTheory = () => {
    setIsTheoryPlaying(true);
    setTheoryStep(0);
    setTypedText('');
  };

  const pauseTheory = () => {
    setIsTheoryPlaying(false);
  };

  const resumeTheory = () => {
    setIsTheoryPlaying(true);
  };

  const nextTheoryStep = () => {
    if (theoryStep < theorySteps.length - 1) {
      setTheoryStep(theoryStep + 1);
      setTypedText('');
    } else {
      setShowDetailedTheory(true);
      setIsTheoryPlaying(false);
    }
  };

  const prevTheoryStep = () => {
    if (theoryStep > 0) {
      setTheoryStep(theoryStep - 1);
      setTypedText('');
    }
  };

  const skipTheory = () => {
    setShowDetailedTheory(true);
    setIsTheoryPlaying(false);
  };

  useEffect(() => {
    if (animating) {
      const initParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        isIon: Math.random() > 0.5
      }));
      setParticles(initParticles);

      const interval = setInterval(() => {
        setParticles(prev => prev.map(p => ({
          ...p,
          x: (p.x + p.vx + 100) % 100,
          y: (p.y + p.vy + 100) % 100
        })));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [animating]);

  const calculateBasicIonizationDegree = () => {
    const optimalPressure = 3.0;
    const pressureFactor = Math.exp(-Math.pow((basicGasPressure - optimalPressure) / 2, 2));
    const energyFactor = basicPlasmaEnergy / (basicPlasmaEnergy + 50);
    return (pressureFactor * energyFactor * 0.0018).toFixed(4);
  };

  const calculateBreakdownVoltage = (p, d) => {
    const pd = p * d;
    const gasConstants = {
      'Ar': { A: 12, B: 180 },
      'Air': { A: 15, B: 365 },
      'He': { A: 34, B: 153 },
      'N2': { A: 14, B: 275 },
      'Ne': { A: 28, B: 140 }
    };
    const { A, B } = gasConstants[gasType] || gasConstants['Ar'];
    const denominator = Math.log(pd) - Math.log(Math.log(1 + 1/0.01));
    return Math.abs((B * pd) / denominator).toFixed(0);
  };

  const generatePaschenCurve = () => {
    const pdValues = Array.from({ length: 50 }, (_, i) => 0.1 * Math.pow(10, i / 12));
    return pdValues.map(pd => ({
      pd: pd.toFixed(2),
      voltage: calculateBreakdownVoltage(pd / distance, distance)
    }));
  };

  const calculateOptimalLC = () => {
    const f = frequency * 1e6;
    const omega = 2 * Math.PI * f;
    const Z_load = loadImpedance;
    const Z_source = 50;

    if (Z_load < Z_source) {
      const Q = Math.sqrt((Z_source / Z_load) - 1);
      const L_optimal = (Q * Z_load) / omega;
      const C_optimal = 1 / (omega * Q * Z_source);
      return {
        L: (L_optimal * 1e9).toFixed(1),
        C: (C_optimal * 1e12).toFixed(1)
      };
    } else {
      const Q = Math.sqrt((Z_load / Z_source) - 1);
      const L_optimal = (Z_source * Q) / omega;
      const C_optimal = Q / (omega * Z_load);
      return {
        L: (L_optimal * 1e9).toFixed(1),
        C: (C_optimal * 1e12).toFixed(1)
      };
    }
  };

  const calculateReflectedPower = () => {
    const Z_in = 50;
    const reflection = Math.abs((loadImpedance - Z_in) / (loadImpedance + Z_in));
    return (rfPower * reflection * reflection).toFixed(1);
  };

  const calculateVSWR = () => {
    const reflection = Math.abs((loadImpedance - 50) / (loadImpedance + 50));
    return ((1 + reflection) / (1 - reflection)).toFixed(2);
  };

  const handleAutoMatch = () => {
    const optimal = calculateOptimalLC();
    setInductance(parseFloat(optimal.L));
    setCapacitance(parseFloat(optimal.C));
    setAutoMatch(true);
    setTimeout(() => setAutoMatch(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">플라즈마 시뮬레이터 I</h1>
            <div className="text-sm text-gray-500">Basic Plasma Physics</div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'plasma-basics' && (
          <div className="space-y-8">
            {/* Theory Opening Section */}
            {!showDetailedTheory ? (
              <div className={`bg-gradient-to-r ${!isTheoryPlaying && theoryStep === 0 ? 'from-blue-600 to-purple-600' : theorySteps[theoryStep]?.color ? theorySteps[theoryStep].color : 'from-blue-500 to-purple-500'} rounded-2xl p-8 shadow-2xl text-white min-h-[500px] flex flex-col justify-between`}>
                {!isTheoryPlaying && theoryStep === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-bold mb-6">플라즈마 기초 이론</h2>
                    <p className="text-xl mb-8 opacity-90">플라즈마의 기본 원리를 단계별로 학습합니다</p>
                    <button
                      onClick={startTheory}
                      className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                    >
                      이론 학습 시작하기 →
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-3xl font-bold">
                            Step {theorySteps[theoryStep].step}: {theorySteps[theoryStep].title}
                          </h3>
                          <button
                            onClick={skipTheory}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-all"
                          >
                            건너뛰기
                          </button>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2 mb-6">
                          <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((theoryStep + 1) / theorySteps.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 min-h-[200px]">
                        <p className="text-lg leading-relaxed">
                          {typedText}
                          {isTheoryPlaying && typedText.length < theorySteps[theoryStep].content.length && (
                            <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse"></span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <button
                        onClick={prevTheoryStep}
                        disabled={theoryStep === 0}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          theoryStep === 0
                            ? 'bg-white/10 text-white/50 cursor-not-allowed'
                            : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}
                      >
                        ← 이전
                      </button>
                      <div className="flex gap-3">
                        <button
                          onClick={isTheoryPlaying ? pauseTheory : resumeTheory}
                          className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all"
                        >
                          {isTheoryPlaying ? '일시정지' : '계속'}
                        </button>
                        <button
                          onClick={nextTheoryStep}
                          className="px-6 py-3 bg-white hover:bg-blue-50 text-blue-600 rounded-lg font-semibold transition-all transform hover:scale-105"
                        >
                          {theoryStep === theorySteps.length - 1 ? '학습 완료 →' : '다음 →'}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : null}

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">⚡ 플라즈마의 기초</h2>
              <p className="text-blue-700 mb-4">
                플라즈마는 고체, 액체, 기체에 이어 물질의 제4상태로 불립니다.
                반도체 공정에서 사용되는 플라즈마는 저온 플라즈마로, 전자 온도는 높지만 이온 온도는 낮은 특성을 가집니다.
              </p>
              <div className="bg-blue-100 rounded-lg p-4 text-sm text-blue-800">
                <strong>핵심 특징:</strong> 준중성(Quasi-neutrality), 집단 거동(Collective Behavior), 전기전도성
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">플라즈마 조건 제어</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      가스 압력: {basicGasPressure.toFixed(1)} mTorr
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={basicGasPressure}
                      onChange={(e) => setBasicGasPressure(parseFloat(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      플라즈마 에너지: {basicPlasmaEnergy} eV
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="10"
                      value={basicPlasmaEnergy}
                      onChange={(e) => setBasicPlasmaEnergy(parseInt(e.target.value))}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">현재 플라즈마 상태</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">이온화도:</span>
                      <div className="text-xl font-bold text-blue-600">{calculateBasicIonizationDegree()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">전자 밀도:</span>
                      <div className="text-xl font-bold text-green-600">
                        {(parseFloat(calculateBasicIonizationDegree()) * 1e12).toExponential(2)} cm⁻³
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">플라즈마 입자 시뮬레이션</h3>
                <div className="relative bg-gray-900 rounded-lg" style={{ height: '300px' }}>
                  {!animating ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setAnimating(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        시뮬레이션 시작
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg width="100%" height="300" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {particles.map(p => (
                          <circle
                            key={p.id}
                            cx={p.x}
                            cy={p.y}
                            r="0.5"
                            fill={p.isIon ? '#ef4444' : '#3b82f6'}
                            opacity="0.8"
                          />
                        ))}
                      </svg>
                      <button
                        onClick={() => setAnimating(false)}
                        className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                      >
                        정지
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-4 flex justify-around text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>전자 (e⁻)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>이온 (+)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">반도체 공정에서의 플라즈마</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">식각 (Etching)</h4>
                  <p className="text-sm text-orange-700">
                    플라즈마 내 라디칼과 이온이 웨이퍼 표면을 선택적으로 제거하여 미세 패턴을 형성합니다.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">증착 (Deposition)</h4>
                  <p className="text-sm text-green-700">
                    PECVD를 통해 저온에서 박막을 형성하며, 절연막이나 보호막 증착에 활용됩니다.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">세정 (Cleaning)</h4>
                  <p className="text-sm text-purple-700">
                    플라즈마 애싱으로 포토레지스트를 제거하거나 웨이퍼 표면을 청정화합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plasma-principle1' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">🔬 플라즈마 원리 1: 압력과 에너지의 영향</h2>
              <p className="text-purple-700 mb-4">
                플라즈마 특성은 압력과 에너지에 크게 영향을 받습니다.
                최적의 조건에서 이온화도가 최대가 되며, 반도체 공정에서는 보통 0.001% 미만의 낮은 이온화도를 사용합니다.
              </p>
              <div className="bg-purple-100 rounded-lg p-4 text-sm text-purple-800">
                <strong>중요 포인트:</strong> 반도체 플라즈마는 저이온화도 플라즈마로, 정밀한 제어가 가능합니다.
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">압력과 에너지에 따른 이온화도 변화</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      가스 압력: {basicGasPressure.toFixed(1)} mTorr
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={basicGasPressure}
                      onChange={(e) => setBasicGasPressure(parseFloat(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      낮은 압력: 평균자유행로 증가 → 높은 압력: 충돌 빈도 증가
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      플라즈마 에너지: {basicPlasmaEnergy} eV
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="10"
                      value={basicPlasmaEnergy}
                      onChange={(e) => setBasicPlasmaEnergy(parseInt(e.target.value))}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      높은 에너지: 이온화 확률 증가 → 플라즈마 밀도 증가
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">계산 결과</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">이온화도:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {(parseFloat(calculateBasicIonizationDegree()) * 100).toFixed(3)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">전자 밀도:</span>
                        <span className="text-xl font-bold text-green-600">
                          {(parseFloat(calculateBasicIonizationDegree()) * 1e12).toExponential(2)} cm⁻³
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">이온 밀도:</span>
                        <span className="text-xl font-bold text-purple-600">
                          {(parseFloat(calculateBasicIonizationDegree()) * 1e12).toExponential(2)} cm⁻³
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">이온화도 vs 압력 그래프</h4>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={Array.from({ length: 100 }, (_, i) => {
                          const p = 0.1 + (i * 0.099);
                          const pressureFactor = Math.exp(-Math.pow((p - 3.0) / 2, 2));
                          const energyFactor = basicPlasmaEnergy / (basicPlasmaEnergy + 50);
                          const ionization = pressureFactor * energyFactor * 0.18;
                          return { pressure: p.toFixed(1), ionization: ionization.toFixed(4) };
                        })}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="pressure" label={{ value: 'Pressure (mTorr)', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Ionization (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="ionization" stroke="#3b82f6" strokeWidth={2} />
                        <ReferenceLine x={basicGasPressure.toFixed(1)} stroke="#ef4444" strokeDasharray="3 3" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">압력과 평균자유행로</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">저압 영역 (1-10 mTorr)</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 평균자유행로: 1-10 cm</li>
                    <li>• 충돌 빈도: 낮음</li>
                    <li>• 이온 방향성: 우수</li>
                    <li>• 응용: 고이방성 식각</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">고압 영역 (100-1000 mTorr)</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• 평균자유행로: 0.1-1 mm</li>
                    <li>• 충돌 빈도: 높음</li>
                    <li>• 이온 방향성: 낮음</li>
                    <li>• 응용: 등방성 식각, 증착</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plasma-principle2' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border">
              <h2 className="text-2xl font-bold text-green-900 mb-4">📊 플라즈마 원리 2: Paschen 법칙</h2>
              <p className="text-green-700 mb-4">
                Paschen 법칙은 기체 방전 개시 전압이 압력과 전극 간격의 곱(pd)에 의해 결정됨을 나타냅니다.
                이는 플라즈마 점화 조건을 이해하는 핵심 원리입니다.
              </p>
              <div className="bg-green-100 rounded-lg p-4 text-sm text-green-800">
                <strong>Paschen 방정식:</strong> V<sub>b</sub> = (B·pd) / ln(A·pd) - ln[ln(1 + 1/γ)]
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Paschen 곡선 시뮬레이터</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      압력 (p): {pressure.toFixed(2)} Torr
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={pressure}
                      onChange={(e) => setPressure(parseFloat(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      전극 간격 (d): {distance.toFixed(2)} cm
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={distance}
                      onChange={(e) => setDistance(parseFloat(e.target.value))}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      가스 종류
                    </label>
                    <select
                      value={gasType}
                      onChange={(e) => setGasType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Ar">아르곤 (Ar)</option>
                      <option value="Air">공기 (Air)</option>
                      <option value="He">헬륨 (He)</option>
                      <option value="N2">질소 (N₂)</option>
                      <option value="Ne">네온 (Ne)</option>
                    </select>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">현재 조건 결과</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">p × d:</span>
                        <span className="text-xl font-bold text-blue-600">
                          {(pressure * distance).toFixed(2)} Torr·cm
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">항복 전압:</span>
                        <span className="text-2xl font-bold text-green-600">
                          {calculateBreakdownVoltage(pressure, distance)} V
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        * 실제 값은 전극 재질, 표면 상태 등에 따라 달라질 수 있습니다.
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Paschen 곡선</h4>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generatePaschenCurve()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="pd"
                          scale="log"
                          domain={['auto', 'auto']}
                          label={{ value: 'p×d (Torr·cm)', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis
                          scale="log"
                          domain={[100, 10000]}
                          label={{ value: 'Breakdown Voltage (V)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip />
                        <Line type="monotone" dataKey="voltage" stroke="#10b981" strokeWidth={2} />
                        <ReferenceLine
                          x={(pressure * distance).toFixed(2)}
                          stroke="#ef4444"
                          strokeDasharray="3 3"
                          label="현재 조건"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Paschen 곡선의 특징</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">최소값 존재</h4>
                  <p className="text-sm text-yellow-800">
                    pd가 특정 값일 때 항복 전압이 최소가 됩니다. 이는 전자의 평균자유행로와 에너지 획득이 최적화되는 지점입니다.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">저압 영역</h4>
                  <p className="text-sm text-blue-800">
                    pd가 작을 때는 충돌 빈도가 낮아 이온화 효율이 떨어져 높은 전압이 필요합니다.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">고압 영역</h4>
                  <p className="text-sm text-green-800">
                    pd가 클 때는 충돌이 너무 빈번하여 전자가 충분한 에너지를 얻기 어려워 높은 전압이 필요합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rf-matching' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border">
              <h2 className="text-2xl font-bold text-red-900 mb-4">📡 RF 임피던스 매칭</h2>
              <p className="text-red-700 mb-4">
                RF 플라즈마 시스템에서 임피던스 매칭은 전력 전달 효율을 최대화하기 위해 필수적입니다.
                일반적으로 50Ω의 표준 임피던스로 매칭합니다.
              </p>
              <div className="bg-red-100 rounded-lg p-4 text-sm text-red-800">
                <strong>매칭 목표:</strong> 반사파 최소화, 전력 전달 효율 최대화, VSWR ≈ 1
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">RF 매칭 네트워크 설계</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RF 주파수: {frequency} MHz
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      step="0.1"
                      value={frequency}
                      onChange={(e) => setFrequency(parseFloat(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      산업 표준: 13.56 MHz (ISM 밴드)
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Load 임피던스: {loadImpedance} Ω
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={loadImpedance}
                      onChange={(e) => setLoadImpedance(parseInt(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RF 파워: {rfPower} W
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={rfPower}
                      onChange={(e) => setRfPower(parseInt(e.target.value))}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      인덕턴스 (L): {inductance} nH
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={inductance}
                      onChange={(e) => setInductance(parseInt(e.target.value))}
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      커패시턴스 (C): {capacitance} pF
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={capacitance}
                      onChange={(e) => setCapacitance(parseInt(e.target.value))}
                      className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={handleAutoMatch}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      autoMatch
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {autoMatch ? '✓ 자동 매칭 완료!' : '자동 매칭 계산'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">매칭 네트워크 성능</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">반사 전력:</span>
                        <span className="text-xl font-bold text-red-600">
                          {calculateReflectedPower()} W
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">전달 전력:</span>
                        <span className="text-xl font-bold text-green-600">
                          {(rfPower - parseFloat(calculateReflectedPower())).toFixed(1)} W
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">VSWR:</span>
                        <span className="text-xl font-bold text-purple-600">
                          {calculateVSWR()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">효율:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {((rfPower - parseFloat(calculateReflectedPower())) / rfPower * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">최적 L-C 값 (계산)</h4>
                    <div className="space-y-2 text-sm text-yellow-800">
                      <div className="flex justify-between">
                        <span>최적 인덕턴스:</span>
                        <span className="font-bold">{calculateOptimalLC().L} nH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>최적 커패시턴스:</span>
                        <span className="font-bold">{calculateOptimalLC().C} pF</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 text-center">매칭 네트워크 회로도</h4>
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      <text x="20" y="100" fontSize="14" fill="#374151" fontWeight="bold">RF Source</text>
                      <text x="25" y="115" fontSize="12" fill="#6b7280">(50Ω)</text>

                      <line x1="90" y1="100" x2="140" y2="100" stroke="#374151" strokeWidth="2"/>

                      <rect x="140" y="85" width="40" height="30" fill="none" stroke="#f97316" strokeWidth="2" rx="5"/>
                      <text x="148" y="105" fontSize="12" fill="#f97316" fontWeight="bold">L</text>

                      <line x1="180" y1="100" x2="220" y2="100" stroke="#374151" strokeWidth="2"/>

                      <line x1="220" y1="100" x2="220" y2="130" stroke="#374151" strokeWidth="2"/>
                      <line x1="215" y1="130" x2="225" y2="130" stroke="#ec4899" strokeWidth="2"/>
                      <line x1="215" y1="135" x2="225" y2="135" stroke="#ec4899" strokeWidth="2"/>
                      <text x="230" y="135" fontSize="12" fill="#ec4899" fontWeight="bold">C</text>
                      <line x1="220" y1="140" x2="220" y2="170" stroke="#374151" strokeWidth="2"/>
                      <line x1="210" y1="170" x2="230" y2="170" stroke="#374151" strokeWidth="2"/>
                      <line x1="213" y1="173" x2="227" y2="173" stroke="#374151" strokeWidth="1"/>
                      <line x1="216" y1="176" x2="224" y2="176" stroke="#374151" strokeWidth="1"/>

                      <line x1="220" y1="100" x2="280" y2="100" stroke="#374151" strokeWidth="2"/>

                      <circle cx="310" cy="100" r="30" fill="none" stroke="#3b82f6" strokeWidth="2"/>
                      <text x="290" y="105" fontSize="12" fill="#3b82f6" fontWeight="bold">Load</text>

                      <text x="145" y="75" fontSize="10" fill="#f97316">{inductance}nH</text>
                      <text x="230" y="125" fontSize="10" fill="#ec4899">{capacitance}pF</text>
                      <text x="285" y="85" fontSize="10" fill="#3b82f6">{loadImpedance}Ω</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">매칭 네트워크의 중요성</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">좋은 매칭 (VSWR ≈ 1)</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• 반사 전력 &lt; 5%</li>
                    <li>• 높은 전력 전달 효율 (&gt;95%)</li>
                    <li>• 안정적인 플라즈마</li>
                    <li>• 재현성 있는 공정</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">나쁜 매칭 (VSWR &gt; 2)</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• 반사 전력 증가 (&gt;20%)</li>
                    <li>• 낮은 전력 전달 효율</li>
                    <li>• 불안정한 플라즈마</li>
                    <li>• RF 소스 손상 위험</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system-structure' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6 border">
              <h2 className="text-2xl font-bold text-cyan-900 mb-4">🏗️ CCP 플라즈마 시스템 구조</h2>
              <p className="text-cyan-700 mb-4">
                CCP (Capacitively Coupled Plasma)는 평행한 두 전극 사이에서 발생하는 플라즈마로,
                반도체 공정에서 가장 널리 사용되는 시스템입니다.
              </p>
              <div className="bg-cyan-100 rounded-lg p-4 text-sm text-cyan-800">
                <strong>핵심 구성:</strong> RF 전원, 평행 전극, 매칭 네트워크, 진공 챔버, 가스 공급 시스템
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">CCP 시스템 구조도</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <svg width="100%" height="400" viewBox="0 0 600 400">
                  <rect x="150" y="100" width="300" height="250" fill="none" stroke="#374151" strokeWidth="3"/>
                  <text x="470" y="120" fontSize="12" fill="#374151" fontWeight="bold">챔버</text>

                  <rect x="200" y="120" width="200" height="15" fill="#6b7280"/>
                  <text x="20" y="130" fontSize="12" fill="#6b7280" fontWeight="bold">상부 전극 (RF)</text>

                  <rect x="200" y="300" width="200" height="15" fill="#6b7280"/>
                  <text x="30" y="310" fontSize="12" fill="#6b7280" fontWeight="bold">하부 전극 (GND)</text>

                  <circle cx="100" cy="50" r="20" fill="none" stroke="#dc2626" strokeWidth="2"/>
                  <path d="M88,50 Q94,43 100,50 Q106,57 112,50" fill="none" stroke="#dc2626" strokeWidth="2"/>
                  <text x="60" y="30" fontSize="12" fill="#dc2626" fontWeight="bold">RF Power</text>

                  <line x1="100" y1="70" x2="100" y2="100" stroke="#dc2626" strokeWidth="2"/>
                  <line x1="100" y1="100" x2="200" y2="100" stroke="#dc2626" strokeWidth="2"/>
                  <line x1="200" y1="100" x2="200" y2="120" stroke="#dc2626" strokeWidth="2"/>

                  <rect x="240" y="200" width="120" height="80" fill="#a855f7" opacity="0.6"/>
                  <text x="300" y="245" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">Plasma</text>

                  <circle cx="260" cy="220" r="3" fill="#3b82f6"/>
                  <circle cx="280" cy="230" r="3" fill="#ef4444"/>
                  <circle cx="300" cy="240" r="3" fill="#3b82f6"/>
                  <circle cx="320" cy="250" r="3" fill="#ef4444"/>
                  <circle cx="340" cy="260" r="3" fill="#3b82f6"/>

                  <line x1="300" y1="315" x2="300" y2="350" stroke="#374151" strokeWidth="2"/>
                  <line x1="290" y1="350" x2="310" y2="350" stroke="#374151" strokeWidth="2"/>
                  <line x1="293" y1="353" x2="307" y2="353" stroke="#374151" strokeWidth="1"/>
                  <line x1="296" y1="356" x2="304" y2="356" stroke="#374151" strokeWidth="1"/>
                  <text x="320" y="355" fontSize="12" fill="#374151">GND</text>

                  <line x1="470" y1="220" x2="520" y2="220" stroke="#10b981" strokeWidth="2"/>
                  <polygon points="520,220 515,217 515,223" fill="#10b981"/>
                  <text x="530" y="225" fontSize="12" fill="#10b981" fontWeight="bold">가스 입구</text>

                  <line x1="130" y1="220" x2="80" y2="220" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="80,220 85,217 85,223" fill="#f59e0b"/>
                  <text x="10" y="225" fontSize="12" fill="#f59e0b" fontWeight="bold">펌프</text>

                  <rect x="350" y="320" width="40" height="20" fill="#3b82f6"/>
                  <text x="470" y="335" fontSize="12" fill="#3b82f6" fontWeight="bold">웨이퍼</text>
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">주요 구성 요소</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-900 mb-2">RF 전원</h4>
                  <p className="text-sm text-red-800">
                    13.56 MHz의 고주파 전력을 공급하여 플라즈마를 생성합니다. 일반적으로 100-1000W의 전력을 사용합니다.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 mb-2">매칭 네트워크</h4>
                  <p className="text-sm text-blue-800">
                    RF 전원과 플라즈마 부하 사이의 임피던스를 매칭하여 전력 전달 효율을 최대화합니다.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-2">가스 공급 시스템</h4>
                  <p className="text-sm text-green-800">
                    MFC(Mass Flow Controller)를 통해 정밀하게 제어된 가스를 챔버로 공급합니다.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-900 mb-2">진공 챔버</h4>
                  <p className="text-sm text-purple-800">
                    고진공 상태를 유지하여 플라즈마를 생성하고, 오염을 방지합니다. 일반적으로 1-100 mTorr 압력에서 동작합니다.
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-900 mb-2">진공 펌프</h4>
                  <p className="text-sm text-orange-800">
                    터보 펌프와 드라이 펌프로 구성되어 챔버 내부를 고진공으로 배기합니다.
                  </p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                  <h4 className="font-semibold text-cyan-900 mb-2">정전척 (ESC)</h4>
                  <p className="text-sm text-cyan-800">
                    웨이퍼를 정전기력으로 고정하고, 헬륨 백사이드 쿨링으로 온도를 제어합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">CCP vs ICP 비교</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left">특성</th>
                      <th className="px-4 py-3 text-center">CCP</th>
                      <th className="px-4 py-3 text-center">ICP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-medium">플라즈마 생성 방식</td>
                      <td className="px-4 py-3 text-center">용량결합 (전기장)</td>
                      <td className="px-4 py-3 text-center">유도결합 (자기장)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium">플라즈마 밀도</td>
                      <td className="px-4 py-3 text-center">10⁹-10¹¹ cm⁻³</td>
                      <td className="px-4 py-3 text-center">10¹¹-10¹² cm⁻³</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">동작 압력</td>
                      <td className="px-4 py-3 text-center">10-1000 mTorr</td>
                      <td className="px-4 py-3 text-center">1-50 mTorr</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium">독립적 제어</td>
                      <td className="px-4 py-3 text-center text-red-600">불가능</td>
                      <td className="px-4 py-3 text-center text-green-600">가능</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">구조 복잡도</td>
                      <td className="px-4 py-3 text-center">단순</td>
                      <td className="px-4 py-3 text-center">복잡</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium">비용</td>
                      <td className="px-4 py-3 text-center">저렴</td>
                      <td className="px-4 py-3 text-center">고가</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">주요 응용</td>
                      <td className="px-4 py-3 text-center">일반 식각, 증착</td>
                      <td className="px-4 py-3 text-center">고밀도 플라즈마 공정</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlasmaSimulatorI;
