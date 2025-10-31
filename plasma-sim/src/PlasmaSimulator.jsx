import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// DC 플라즈마 1단계 애니메이션 컴포넌트
const DCPlasmaStep1Animation = () => {
  const [step1Active, setStep1Active] = useState(false);
  const [step2Active, setStep2Active] = useState(false);
  const [step3Active, setStep3Active] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-blue-800">
          {step3Active ? "3단계: 이온화 반응 (양이온+전자 생성)" :
           step2Active ? "2단계: 양이온 충돌 + 2차 전자 방출" :
           step1Active ? "1단계: 양이온이 Cathode로 이동" : "DC 플라즈마 - 시작 전"}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => {setStep1Active(!step1Active); setStep2Active(false); setStep3Active(false);}}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold"
          >
            {step1Active ? '1단계 정지' : '1단계 시작'}
          </button>
          <button
            onClick={() => {setStep2Active(!step2Active); setStep1Active(false); setStep3Active(false);}}
            className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-xs font-bold"
          >
            {step2Active ? '2단계 정지' : '2단계 시작'}
          </button>
          <button
            onClick={() => {setStep3Active(!step3Active); setStep1Active(false); setStep2Active(false);}}
            className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-bold"
          >
            {step3Active ? '3단계 정지' : '3단계 시작'}
          </button>
        </div>
      </div>

      <svg width="300" height="200" className="border rounded bg-gray-50">
        <defs>
          <linearGradient id="spaceChargeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8"/>
            <stop offset="70%" stopColor="#A78BFA" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.3"/>
          </linearGradient>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#DC2626" />
          </marker>
        </defs>

        {/* 전극 */}
        <rect x="30" y="40" width="20" height="120" fill="#8B5CF6" rx="2"/>
        <rect x="250" y="40" width="20" height="120" fill="#EF4444" rx="2"/>

        {/* 전극 레이블 */}
        <text x="5" y="30" fontSize="12" fill="#8B5CF6" fontWeight="bold">Cathode</text>
        <text x="15" y="20" fontSize="14" fill="#8B5CF6">-</text>
        <text x="235" y="30" fontSize="12" fill="#EF4444" fontWeight="bold">Anode</text>
        <text x="275" y="20" fontSize="14" fill="#EF4444">+</text>

        {/* 0V 기준선 */}
        <line x1="40" y1="100" x2="260" y2="100" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
        <text x="145" y="95" fontSize="10" fill="#10B981" fontWeight="bold">0V</text>

        {/* Space Charge 영역 */}
        <rect x="70" y="50" width="160" height="100" fill="url(#spaceChargeGradient2)" rx="4"/>
        <text x="75" y="45" fontSize="10" fill="#8B5CF6" fontWeight="bold">Space charge</text>

        {/* 양이온들 - Cathode sheath가 끝나는 지점(플라즈마 왼쪽 경계)에 집중 배치 */}
        <circle cx="70" cy="70" r="7" fill="#EF4444">
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="cx" values="70;40" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2s" repeatCount="indefinite"/>
            </>
          )}
        </circle>
        <text x="70" y="75" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
          +
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="x" values="70;40" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2s" repeatCount="indefinite"/>
            </>
          )}
        </text>

        <circle cx="72" cy="85" r="7" fill="#EF4444">
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="cx" values="72;40" dur="1.7s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.2s" repeatCount="indefinite"/>
            </>
          )}
        </circle>
        <text x="72" y="90" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
          +
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="x" values="72;40" dur="1.7s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.2s" repeatCount="indefinite"/>
            </>
          )}
        </text>

        <circle cx="68" cy="100" r="7" fill="#EF4444">
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="cx" values="68;40" dur="1.3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="1.8s" repeatCount="indefinite"/>
            </>
          )}
        </circle>
        <text x="68" y="105" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
          +
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="x" values="68;40" dur="1.3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="1.8s" repeatCount="indefinite"/>
            </>
          )}
        </text>

        <circle cx="74" cy="115" r="7" fill="#EF4444">
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="cx" values="74;40" dur="2.0s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.5s" repeatCount="indefinite"/>
            </>
          )}
        </circle>
        <text x="74" y="120" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
          +
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="x" values="74;40" dur="2.0s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.5s" repeatCount="indefinite"/>
            </>
          )}
        </text>

        <circle cx="69" cy="130" r="7" fill="#EF4444">
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="cx" values="69;40" dur="1.6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.1s" repeatCount="indefinite"/>
            </>
          )}
        </circle>
        <text x="69" y="135" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
          +
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="x" values="69;40" dur="1.6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.1s" repeatCount="indefinite"/>
            </>
          )}
        </text>

        <circle cx="71" cy="125" r="7" fill="#EF4444">
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="cx" values="71;40" dur="1.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="1.9s" repeatCount="indefinite"/>
            </>
          )}
        </circle>
        <text x="71" y="130" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
          +
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="x" values="71;40" dur="1.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="1.9s" repeatCount="indefinite"/>
            </>
          )}
        </text>

        <circle cx="73" cy="95" r="7" fill="#EF4444">
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="cx" values="73;40" dur="1.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.3s" repeatCount="indefinite"/>
            </>
          )}
        </circle>
        <text x="73" y="100" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
          +
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="x" values="73;40" dur="1.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.3s" repeatCount="indefinite"/>
            </>
          )}
        </text>

        <circle cx="67" cy="110" r="7" fill="#EF4444">
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="cx" values="67;40" dur="1.9s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.4s" repeatCount="indefinite"/>
            </>
          )}
        </circle>
        <text x="67" y="115" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
          +
          {(step1Active || step2Active || step3Active) && (
            <>
              <animate attributeName="x" values="67;40" dur="1.9s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0;0;1" dur="2.4s" repeatCount="indefinite"/>
            </>
          )}
        </text>

        {/* 2단계: Cathode에서 방출되는 2차 전자들 */}
        {(step2Active || step3Active) && (
          <>
            {/* 전자 1 - 중간까지 */}
            <circle cx="50" cy="75" r="5" fill="#7C3AED">
              <animate attributeName="cx" values="50;120" dur="1.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <text x="50" y="79" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">
              -
              <animate attributeName="x" values="50;120" dur="1.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
            </text>

            {/* 전자 2 - 초반까지만 */}
            <circle cx="50" cy="90" r="5" fill="#7C3AED">
              <animate attributeName="cx" values="50;85" dur="0.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="1.1s" repeatCount="indefinite"/>
            </circle>
            <text x="50" y="94" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">
              -
              <animate attributeName="x" values="50;85" dur="0.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="1.1s" repeatCount="indefinite"/>
            </text>

            {/* 전자 3 - Anode 쪽 끝까지 */}
            <circle cx="50" cy="105" r="5" fill="#7C3AED">
              <animate attributeName="cx" values="50;220" dur="2.0s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="2.3s" repeatCount="indefinite"/>
            </circle>
            <text x="50" y="109" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">
              -
              <animate attributeName="x" values="50;220" dur="2.0s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="2.3s" repeatCount="indefinite"/>
            </text>

            {/* 전자 4 - 중간 정도 */}
            <circle cx="50" cy="120" r="5" fill="#7C3AED">
              <animate attributeName="cx" values="50;140" dur="1.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="1.7s" repeatCount="indefinite"/>
            </circle>
            <text x="50" y="124" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">
              -
              <animate attributeName="x" values="50;140" dur="1.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="1.7s" repeatCount="indefinite"/>
            </text>

            {/* 전자 5 - 짧은 거리 */}
            <circle cx="50" cy="135" r="5" fill="#7C3AED">
              <animate attributeName="cx" values="50;95" dur="0.9s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite"/>
            </circle>
            <text x="50" y="139" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">
              -
              <animate attributeName="x" values="50;95" dur="0.9s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite"/>
            </text>

            {/* 전자 6 - 멀리까지 */}
            <circle cx="50" cy="150" r="5" fill="#7C3AED">
              <animate attributeName="cx" values="50;200" dur="1.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="2.1s" repeatCount="indefinite"/>
            </circle>
            <text x="50" y="154" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">
              -
              <animate attributeName="x" values="50;200" dur="1.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;0" dur="2.1s" repeatCount="indefinite"/>
            </text>
          </>
        )}

        {/* 3단계: 이온화 반응 - 충분한 에너지를 가진 전자만 이온화 일으킴 */}
        {step3Active && (
          <>
            {/* 이온화 지점 1 - 중간 위치에서 발생 */}
            <g>
              {/* 이온화 섬광 효과 */}
              <circle cx="120" cy="85" r="3" fill="#FFF200" opacity="0.8">
                <animate attributeName="r" values="3;8;3" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite"/>
              </circle>

              {/* 새로 생성된 양이온 - 왼쪽으로 이동 */}
              <circle cx="120" cy="85" r="4" fill="#EF4444">
                <animate attributeName="cx" values="120;75" dur="1.2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/>
              </circle>
              <text x="120" y="89" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">
                +
                <animate attributeName="x" values="120;75" dur="1.2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/>
              </text>

              {/* 새로 생성된 전자 - 오른쪽으로 이동 */}
              <circle cx="120" cy="85" r="3" fill="#7C3AED">
                <animate attributeName="cx" values="120;200" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="2.0s" repeatCount="indefinite"/>
              </circle>
              <text x="120" y="88" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">
                -
                <animate attributeName="x" values="120;200" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="2.0s" repeatCount="indefinite"/>
              </text>
            </g>

            {/* 이온화 지점 2 - 다른 위치에서 발생 */}
            <g>
              <circle cx="140" cy="110" r="3" fill="#FFF200" opacity="0.8">
                <animate attributeName="r" values="3;8;3" dur="1.8s" repeatCount="indefinite" begin="0.5s"/>
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.8s" repeatCount="indefinite" begin="0.5s"/>
              </circle>

              <circle cx="140" cy="110" r="4" fill="#EF4444">
                <animate attributeName="cx" values="140;75" dur="1.3s" repeatCount="indefinite" begin="0.5s"/>
                <animate attributeName="opacity" values="0;1;0" dur="1.9s" repeatCount="indefinite" begin="0.5s"/>
              </circle>
              <text x="140" y="114" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">
                +
                <animate attributeName="x" values="140;75" dur="1.3s" repeatCount="indefinite" begin="0.5s"/>
                <animate attributeName="opacity" values="0;1;0" dur="1.9s" repeatCount="indefinite" begin="0.5s"/>
              </text>

              <circle cx="140" cy="110" r="3" fill="#7C3AED">
                <animate attributeName="cx" values="140;210" dur="1.6s" repeatCount="indefinite" begin="0.5s"/>
                <animate attributeName="opacity" values="0;1;0" dur="2.1s" repeatCount="indefinite" begin="0.5s"/>
              </circle>
              <text x="140" y="113" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">
                -
                <animate attributeName="x" values="140;210" dur="1.6s" repeatCount="indefinite" begin="0.5s"/>
                <animate attributeName="opacity" values="0;1;0" dur="2.1s" repeatCount="indefinite" begin="0.5s"/>
              </text>
            </g>

            {/* 이온화 지점 3 - 더 멀리서 발생 */}
            <g>
              <circle cx="170" cy="95" r="3" fill="#FFF200" opacity="0.8">
                <animate attributeName="r" values="3;8;3" dur="2.0s" repeatCount="indefinite" begin="1.0s"/>
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.0s" repeatCount="indefinite" begin="1.0s"/>
              </circle>

              <circle cx="170" cy="95" r="4" fill="#EF4444">
                <animate attributeName="cx" values="170;75" dur="1.4s" repeatCount="indefinite" begin="1.0s"/>
                <animate attributeName="opacity" values="0;1;0" dur="2.0s" repeatCount="indefinite" begin="1.0s"/>
              </circle>
              <text x="170" y="99" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">
                +
                <animate attributeName="x" values="170;75" dur="1.4s" repeatCount="indefinite" begin="1.0s"/>
                <animate attributeName="opacity" values="0;1;0" dur="2.0s" repeatCount="indefinite" begin="1.0s"/>
              </text>

              <circle cx="170" cy="95" r="3" fill="#7C3AED">
                <animate attributeName="cx" values="170;220" dur="1.7s" repeatCount="indefinite" begin="1.0s"/>
                <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" begin="1.0s"/>
              </circle>
              <text x="170" y="98" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">
                -
                <animate attributeName="x" values="170;220" dur="1.7s" repeatCount="indefinite" begin="1.0s"/>
                <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" begin="1.0s"/>
              </text>
            </g>
          </>
        )}

        {/* 더 멀리 있는 양이온들 */}
        <circle cx="150" cy="80" r="2" fill="#EF4444"/>
        <text x="153" y="84" fontSize="8" fill="#EF4444">+</text>
        <circle cx="170" cy="100" r="2" fill="#EF4444"/>
        <text x="173" y="104" fontSize="8" fill="#EF4444">+</text>
        <circle cx="160" cy="120" r="2" fill="#EF4444"/>
        <text x="163" y="124" fontSize="8" fill="#EF4444">+</text>
        <circle cx="180" cy="70" r="2" fill="#EF4444"/>
        <text x="183" y="74" fontSize="8" fill="#EF4444">+</text>

        {/* Potential 곡선과 전위 표시 - 연속된 하나의 곡선 */}
        <path d="M 50 160 L 90 70 L 230 70 Q 240 75 250 80" fill="none" stroke="#1E40AF" strokeWidth="3" strokeDasharray="8,4"/>

        {/* Plasma Potential (Vp) 표시점과 라벨 */}
        <circle cx="85" cy="70" r="2" fill="#1E40AF"/>
        <text x="70" y="85" fontSize="8" fill="#1E40AF">Vp</text>
        <text x="95" y="60" fontSize="10" fill="#1E40AF" fontWeight="bold">Plasma Potential (Vp)</text>

        {/* Floating Potential (Vf) - Anode 근처에서 살짝 떨어진 전위 */}
        <circle cx="235" cy="73" r="2" fill="#7C3AED"/>
        <text x="220" y="90" fontSize="8" fill="#7C3AED">Vf</text>
        <text x="180" y="85" fontSize="10" fill="#7C3AED" fontWeight="bold">Floating Potential (Vf)</text>

        {/* Cathode Sheath 레이블 */}
        <text x="60" y="175" fontSize="10" fill="#8B5CF6" fontWeight="bold">Cathode Sheath</text>

        {/* 단계 설명 */}
        <text x="10" y="190" fontSize="9" fill="#374151" fontWeight="bold">
          {step3Active ? "전자-중성입자 충돌로 이온화 반응이 일어나 새로운 양이온과 전자가 생성됩니다" :
           step2Active ? "양이온이 Cathode에 충돌하면서 동시에 2차 전자가 방출됩니다" :
           step1Active ? "양이온들이 전기장에 의해 Cathode로 가속됩니다" :
           "Space charge 왼쪽의 양이온들이 준비된 상태"}
        </text>
      </svg>
    </div>
  );
};

// RF 플라즈마 통합 애니메이션 컨테이너
const RFPlasmaAnimationContainer = () => {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    let animationId;
    let lastTime = 0;

    const animate = (currentTime) => {
      if (currentTime - lastTime >= 16) { // 60fps
        setTime(prev => (prev + 0.04) % (2 * Math.PI)); // 2x 속도 증가
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-indigo-800">RF 파형과 Sheath Potential 동시 시각화</h3>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg text-sm font-bold hover:bg-indigo-200 transition-colors"
          >
            {isPlaying ? '⏸️ 일시정지' : '▶️ 재생'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold text-indigo-700 mb-3">RF 파형 (13.56 MHz)</h4>
            <RFWaveformAnimation time={time} isPlaying={isPlaying} />
          </div>

          <div>
            <h4 className="text-md font-semibold text-indigo-700 mb-3">Sheath Potential 변화</h4>
            <SheathPotentialAnimation time={time} isPlaying={isPlaying} />
          </div>
        </div>

        <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-bold text-indigo-800 mb-3">💡 상관관계 분석</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 p-2 rounded border-l-4 border-gray-400">
              <strong>① V = 0 (중성):</strong><br/>
              양쪽 전극 모두 중성 상태
            </div>
            <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
              <strong>② +V (양전압):</strong><br/>
              Ground 전극에 음전계<br/>
              → 이온이 왼쪽으로 강하게 가속
            </div>
            <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
              <strong>③ -V (음전압):</strong><br/>
              RF 전극에 음전계<br/>
              → 이온이 오른쪽으로 강하게 가속
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// RF Self-bias 시뮬레이션 컴포넌트
const RFPlasmaSimulation = ({
  externalFrequency = null,
  externalPower = null,
  externalElectrodeRatio = null,
  externalPressure = null,
  showControls = true,
  showTitle = true,
  showStartButton = false
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [electrodeAreaRatio, setElectrodeAreaRatio] = useState(0.5);
  const [time, setTime] = useState(0);
  const [selfBiasVoltage, setSelfBiasVoltage] = useState(0);
  const [rfVoltage, setRfVoltage] = useState(0);
  const [electrons, setElectrons] = useState([]);
  const [ions, setIons] = useState([]);
  const intervalRef = useRef(null);
  const waveformCanvasRef = useRef(null);
  const biasCanvasRef = useRef(null);

  // Use external values if provided, otherwise use internal state
  const activeElectrodeRatio = externalElectrodeRatio !== null
    ? (1.0 / externalElectrodeRatio) // Convert from ratio (10:1) to fraction (0.1)
    : electrodeAreaRatio;

  // 주파수에 따른 시간 증가 속도 조정 (기준: 13.56MHz)
  const activeFrequency = externalFrequency !== null ? externalFrequency : 13.56;
  const frequencyScale = activeFrequency / 13.56; // 주파수 비율

  // RF parameters - influenced by frequency and power
  const baseFrequency = externalFrequency !== null ? externalFrequency / 20 : 0.3; // Scale down for animation
  const rfFrequency = Math.max(0.1, Math.min(5, baseFrequency)); // Limit for visual clarity

  const basePower = externalPower !== null ? externalPower : 300;
  const rfAmplitude = Math.sqrt(basePower / 10) * 5; // Power affects voltage amplitude

  // Calculate electrode sizes based on area ratio
  const getElectrodeConfig = () => {
    const baseHeight = 80;
    const leftHeight = baseHeight * activeElectrodeRatio;
    const rightHeight = baseHeight;

    return {
      left: {
        width: 8,
        height: leftHeight,
        x: 80,
        y: 110 - leftHeight/2,
        area: leftHeight * 8
      },
      right: {
        width: 8,
        height: rightHeight,
        x: 170,
        y: 110 - rightHeight/2,
        area: rightHeight * 8
      }
    };
  };

  // Generate particles
  const generateParticles = () => {
    const newElectrons = [];
    const newIons = [];
    const electrodes = getElectrodeConfig();

    // 전극 사이즈에 따른 축적 전자 개수 결정 (전체 전자는 항상 많지만 축적 비율만 변경)
    const accumulationFactor = activeElectrodeRatio < 1.0 ? (1.0 - activeElectrodeRatio) * 1.8 : 0;
    const accumulatedCount = Math.floor(accumulationFactor * 15); // 최대 15개까지 축적 가능

    for (let i = 0; i < 25; i++) {
      if (i < accumulatedCount) {
        // 축적된 전자 - 좌측 전극 앞에 집중적으로 모임
        const yCenter = electrodes.left.y + electrodes.left.height / 2;
        const ySpread = Math.min(electrodes.left.height * 0.8, 20); // 전극 높이의 80% 또는 최대 20
        newElectrons.push({
          id: i,
          x: electrodes.left.x + electrodes.left.width + 1 + Math.random() * 2, // 전극 바로 앞
          y: yCenter + (Math.random() - 0.5) * ySpread, // 전극 중심 주위에 집중
          vx: 0,
          vy: (Math.random() - 0.5) * 0.05,
          accumulated: true
        });
      } else {
        // 일반 전자 - 전극 사이 공간에 자연스러운 분포 (전극 크기와 무관하게 충분한 개수)
        newElectrons.push({
          id: i,
          x: electrodes.left.x + electrodes.left.width + 5 + Math.random() * (electrodes.right.x - electrodes.left.x - electrodes.left.width - 10), // 전극 사이 영역
          y: 50 + Math.random() * 120, // 전극 높이 범위
          vx: (Math.random() - 0.5) * 0.5, // 초기 속도 범위 증가
          vy: (Math.random() - 0.5) * 0.3, // 초기 속도 범위 증가
          accumulated: false
        });
      }
    }

    for (let i = 0; i < 15; i++) {
      newIons.push({
        id: i,
        x: electrodes.left.x + electrodes.left.width + 10 + Math.random() * (electrodes.right.x - electrodes.left.x - electrodes.left.width - 20), // 전극 사이 중앙 영역
        y: 70 + Math.random() * 80,  // 자연스러운 높이 분포
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.1
      });
    }

    setElectrons(newElectrons);
    setIons(newIons);
  };

  // Calculate self-bias (물리적 원리 반영)
  // Self-bias 극대화 조건: 주파수↓, 파워↑, 압력↓, 면적비↑
  // 원리: 전극 유입 전자 수 감소 → Floating Potential 낮춤 → Sheath Voltage 증가
  const calculateSelfBias = (areaRatio, freq, pwr, press) => {
    const baseBias = -15;

    // 면적비 효과: 작은 전극일수록 전자 축적 증가
    const areaEffect = (1 - areaRatio) * 60;

    // 주파수 효과: 낮을수록 전자가 전극에 더 오래 머물러 충돌 증가
    // 기준 주파수 13.56MHz 대비 역비례
    // 스케일링: 5MHz에서 30MHz처럼 동작하도록 6배 적용
    const scaledFreq = freq !== null ? freq * 6 : null;
    const freqEffect = scaledFreq !== null ? (13.56 / (scaledFreq / 20)) * 15 : 0;

    // 파워 효과: 높을수록 RF 전압 진폭 증가 → Self-bias 증가
    // 기준 파워 300W 대비 비례
    const powerEffect = pwr !== null ? ((pwr - 300) / 700) * 20 : 0;

    // 압력 효과: 낮을수록 평균자유행로 증가, 전극 충돌 감소 → Self-bias 증가
    // 기준 압력 50mTorr 대비 역비례
    const pressureEffect = press !== null ? ((50 - press) / 50) * 25 : 0;

    return baseBias - areaEffect - freqEffect + powerEffect - pressureEffect;
  };

  // Update simulation
  const updateSimulation = () => {
    const electrodes = getElectrodeConfig();
    const currentRfVoltage = rfAmplitude * Math.sin(time * 0.5);
    setRfVoltage(currentRfVoltage);

    // Update electrons - RF 한 사이클에 양 전극 모두 터치
    setElectrons(prevElectrons => {
      return prevElectrons.map(electron => {
        // 축적된 전자는 고정 위치에 머물음 (전극 범위 내)
        if (electron.accumulated) {
          const electrodes = getElectrodeConfig();
          let newY = electron.y + electron.vy;

          // 전극 높이 범위 내로 제한
          if (newY < electrodes.left.y) {
            newY = electrodes.left.y;
            electron.vy = Math.abs(electron.vy) * 0.5;
          }
          if (newY > electrodes.left.y + electrodes.left.height) {
            newY = electrodes.left.y + electrodes.left.height;
            electron.vy = -Math.abs(electron.vy) * 0.5;
          }

          return {
            ...electron,
            y: newY,
            vy: electron.vy * 0.95 // 약간의 수직 움직임만
          };
        }

        let newX = electron.x + electron.vx;
        let newY = electron.y + electron.vy;

        // 매우 강한 RF 필드로 한 사이클에 양 전극 터치 (전극이 작아져도 활발한 움직임)
        // 주파수에 비례하여 전자 속도 조정 - 고주파일수록 빠르게 왕복
        const fieldStrength = 4.0 * frequencyScale;

        if (currentRfVoltage > 0) {
          // RF positive: 좌측 전극이 플러스 → 전자는 좌측 전극으로 이동
          electron.vx = -fieldStrength;

          // 좌측 전극의 작은 면적으로 수렴하면서 이동
          const leftElectrodeCenter = electrodes.left.y + electrodes.left.height / 2;
          const leftElectrodeTop = electrodes.left.y;
          const leftElectrodeBottom = electrodes.left.y + electrodes.left.height;

          // 전극이 작을수록 전극 근처에서 더 오래 머무름 (체류 시간 증가)
          const residenceEffect = (1.0 - activeElectrodeRatio) * 0.3; // 전극이 작을수록 큰 값

          // 현재 위치에서 좌측 전극 범위로 점진적 수렴
          if (electron.y < leftElectrodeTop) {
            electron.vy += 0.2; // 아래로 수렴
          } else if (electron.y > leftElectrodeBottom) {
            electron.vy -= 0.2; // 위로 수렴
          } else {
            // 이미 전극 범위 내에 있으면 중심으로 약간 수렴
            if (electron.y > leftElectrodeCenter) {
              electron.vy -= 0.1;
            } else {
              electron.vy += 0.1;
            }
          }

          // 전극 근처에서 속도 감소 (체류 효과)
          if (electron.x < electrodes.left.x + electrodes.left.width + 10) {
            electron.vx *= (1.0 - residenceEffect);
          }
        } else {
          // RF negative: 좌측 전극이 마이너스 → 전자는 우측 전극으로 이동
          electron.vx = fieldStrength;

          // 우측 전극(전체 높이)으로 확산하면서 이동
          const chamberCenter = 110; // 챔버 중심
          const expansionForce = 0.15;

          // 챔버 전체 높이로 확산
          if (Math.abs(electron.y - chamberCenter) < 40) {
            // 중심 근처에 있으면 위아래로 확산
            if (Math.random() > 0.5) {
              electron.vy += expansionForce;
            } else {
              electron.vy -= expansionForce;
            }
          }
        }

        // 랜덤 노이즈로 자연스러운 움직임 (전극이 작아져도 활발함)
        electron.vy += (Math.random() - 0.5) * 0.008;
        electron.vy *= 0.98;

        // 추가 랜덤 움직임
        electron.vy += (Math.random() - 0.5) * 0.008;
        electron.vy *= 0.98;

        // 전극 접촉 가능하도록 넓은 범위 (전극 내부 면과 접촉)
        if (newX < electrodes.left.x + electrodes.left.width) {
          electron.vx = Math.abs(fieldStrength);
          newX = electrodes.left.x + electrodes.left.width;
        }
        if (newX > electrodes.right.x) {
          electron.vx = -Math.abs(fieldStrength);
          newX = electrodes.right.x;
        }

        // 전극 높이 범위에 따른 자연스러운 상하 경계
        const chamberTop = 45;
        const chamberBottom = 175;
        if (newY < chamberTop || newY > chamberBottom) {
          electron.vy *= -1.0; // 완전 탄성 반사
        }

        // 실제 전극 접촉 시 즉시 반대 방향 (전극 안쪽 면과 접촉)
        if (newX <= electrodes.left.x + electrodes.left.width && electron.vx < 0) {
          electron.vx = Math.abs(fieldStrength);
        }
        if (newX >= electrodes.right.x && electron.vx > 0) {
          electron.vx = -Math.abs(fieldStrength);
        }

        return {
          ...electron,
          x: Math.max(electrodes.left.x + electrodes.left.width, Math.min(electrodes.right.x, newX)),
          y: Math.max(chamberTop, Math.min(chamberBottom, newY))
        };
      });
    });

    // Update ions - 전자보다는 느리지만 충분히 큰 진동
    setIons(prevIons => {
      return prevIons.map(ion => {
        const electrodes = getElectrodeConfig();
        let newX = ion.x + ion.vx;
        let newY = ion.y + ion.vy;

        // 전자보다 훨씬 느린 RF 필드 (이온은 전극 크기에 덜 민감)
        const ionFieldStrength = 0.8;

        if (currentRfVoltage > 0) {
          // RF positive: 좌측 전극이 플러스 → 이온은 우측으로 (천천히)
          ion.vx += ionFieldStrength * 0.1;
        } else {
          // RF negative: 좌측 전극이 마이너스 → 이온은 좌측으로 (천천히)
          ion.vx -= ionFieldStrength * 0.1;
        }

        // 이온의 속도 감쇠 (관성 효과)
        ion.vx *= 0.95;
        ion.vy *= 0.97;

        // 자연스러운 수직 움직임 (랜덤 노이즈)
        ion.vy += (Math.random() - 0.5) * 0.005;
        ion.vy *= 0.98;

        // 전극 사이 공간에서만 움직임 (전극과 접촉 방지)
        const leftBoundary = electrodes.left.x + electrodes.left.width + 5;
        const rightBoundary = electrodes.right.x - 5;

        if (newX < leftBoundary) {
          ion.vx = Math.abs(ionFieldStrength);
          newX = leftBoundary;
        }
        if (newX > rightBoundary) {
          ion.vx = -Math.abs(ionFieldStrength);
          newX = rightBoundary;
        }

        // 전극 높이 범위에 따른 자연스러운 상하 경계
        const ionChamberTop = 65;
        const ionChamberBottom = 155;
        if (newY < ionChamberTop || newY > ionChamberBottom) {
          ion.vy *= -1.0; // 완전 탄성 반사
        }

        return {
          ...ion,
          x: Math.max(leftBoundary, Math.min(rightBoundary, newX)),
          y: Math.max(ionChamberTop, Math.min(ionChamberBottom, newY))
        };
      });
    });

    // Self-bias 계산 (축적된 전자 개수 및 모든 파라미터 반영)
    const accumulatedElectrons = electrons.filter(e => e.accumulated).length;
    const newSelfBias = calculateSelfBias(
      activeElectrodeRatio,
      externalFrequency,
      externalPower,
      externalPressure
    ) - (accumulatedElectrons * 2);
    setSelfBiasVoltage(newSelfBias);
  };

  useEffect(() => {
    generateParticles();
  }, [activeElectrodeRatio]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        // 주파수에 비례하여 시간 증가 속도 조정
        setTime(prevTime => prevTime + (0.2 * frequencyScale));
        updateSimulation();
      }, 20);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time, electrons, ions, activeElectrodeRatio, frequencyScale]);

  // Draw waveforms
  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // High DPI support for better quality
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = (i / 10) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // RF voltage waveform
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const rfCenter = height * 0.25;
    const rfScale = height * 0.15 / rfAmplitude;

    // 주파수에 따라 파형 밀도와 속도 동기화
    // 공간적 주파수: frequencyScale에 비례
    // 시간적 주파수: time이 이미 frequencyScale로 증가 중이므로 추가 곱 불필요

    for (let i = 0; i < width; i++) {
      const x = i;
      const t = (i / width) * 6 * Math.PI * frequencyScale + time * 0.5;
      const y = rfCenter - rfAmplitude * Math.sin(t) * rfScale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Current time indicator - 주파수에 맞춰 동기화
    const currentTimePos = ((time * 0.5) % (6 * Math.PI / frequencyScale)) / (6 * Math.PI / frequencyScale) * width;
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(currentTimePos, rfCenter - 25);
    ctx.lineTo(currentTimePos, rfCenter + 25);
    ctx.stroke();
    ctx.setLineDash([]);

    // Self-bias voltage
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const biasCenter = height * 0.75;
    const biasScale = height * 0.1 / 50;
    const biasY = biasCenter - selfBiasVoltage * biasScale;
    ctx.moveTo(0, biasY);
    ctx.lineTo(width, biasY);
    ctx.stroke();

    // Zero lines
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, rfCenter);
    ctx.lineTo(width, rfCenter);
    ctx.moveTo(0, biasCenter);
    ctx.lineTo(width, biasCenter);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = '#3b82f6';
    ctx.font = '10px sans-serif';
    ctx.fillText('Vp (RF)', 5, 15);
    ctx.fillText(`${rfVoltage.toFixed(0)}V`, 5, 25);

    ctx.fillStyle = '#ef4444';
    ctx.fillText('VDC', 5, height - 25);
    ctx.fillText(`${selfBiasVoltage.toFixed(0)}V`, 5, height - 15);
  }, [time, rfVoltage, selfBiasVoltage, rfAmplitude, rfFrequency, frequencyScale]);

  // Draw bias potential
  useEffect(() => {
    const canvas = biasCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // High DPI support for better quality
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = (i / 10) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const centerY = height * 0.5; // x축을 중앙에 위치

    // RF + DC potential
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const position = x / width;
      let potential;

      if (position < 0.3) {
        potential = rfVoltage + selfBiasVoltage * (1 - activeElectrodeRatio);
      } else if (position > 0.7) {
        potential = 0;
      } else {
        const t = (position - 0.3) / 0.4;
        const leftPotential = rfVoltage + selfBiasVoltage * (1 - activeElectrodeRatio);
        potential = leftPotential * (1 - t);
      }

      const y = centerY - potential * 0.4;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // DC bias component
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const position = x / width;
      let dcPotential;

      if (position < 0.3) {
        dcPotential = selfBiasVoltage * (1 - activeElectrodeRatio);
      } else if (position > 0.7) {
        dcPotential = 0;
      } else {
        const t = (position - 0.3) / 0.4;
        const leftDcPotential = selfBiasVoltage * (1 - activeElectrodeRatio);
        dcPotential = leftDcPotential * (1 - t);
      }

      const y = centerY - dcPotential * 0.4;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Electrode indicators
    ctx.fillStyle = '#6b7280';
    ctx.fillRect(width * 0.25, 5, 2, 15);
    ctx.fillRect(width * 0.75, 5, 2, 15);

    // Labels
    ctx.fillStyle = '#8b5cf6';
    ctx.font = '10px sans-serif';
    ctx.fillText('RF+DC', 5, 15);
    ctx.fillStyle = '#ef4444';
    ctx.fillText('DC bias', 5, 25);
    ctx.fillStyle = '#6b7280';
    ctx.fillText('V', 5, height - 5);

    // Zero line
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Current values
    ctx.fillStyle = '#8b5cf6';
    ctx.font = '10px sans-serif';
    ctx.fillText(`RF: ${rfVoltage.toFixed(0)}V`, width - 60, 15);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`DC: ${selfBiasVoltage.toFixed(0)}V`, width - 60, 25);
  }, [rfVoltage, selfBiasVoltage, activeElectrodeRatio, time]);

  const electrodes = getElectrodeConfig();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border mt-8">
      {showTitle && (
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          RF 플라즈마 Self-bias 형성 및 입자 거동 시뮬레이션
        </h1>
      )}

      {/* 시작/정지 버튼 (showStartButton일 때만) */}
      {showStartButton && (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all ${
              isRunning
                ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
            }`}
          >
            {isRunning ? '⏸ 정지' : '▶ 시작'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Figure 1: Voltage Waveforms */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-base font-semibold mb-3 text-center">전압 파형 (Voltage Waveforms)</h3>
          <canvas
            ref={waveformCanvasRef}
            className="border border-gray-300 w-full"
            style={{ width: '100%', height: '200px' }}
          />
          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <p><span className="font-semibold">RF 전압:</span> {rfVoltage.toFixed(0)}V</p>
            <p><span className="font-semibold">DC Self-bias:</span> {selfBiasVoltage.toFixed(0)}V</p>
            <p className="text-xs text-gray-600">• 파란선: RF 교류 전압 (주파수에 따라 주기 변화)</p>
            <p className="text-xs text-gray-600">• 빨간선: DC Self-bias</p>
          </div>
        </div>

        {/* Figure 2: Particle Motion */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-base font-semibold mb-3 text-center">입자 거동 (Particle Motion)</h3>
          <div className="relative border border-gray-300" style={{ width: '100%', height: '200px' }}>
            <svg width="100%" height="200" viewBox="0 0 250 220" preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="4"
                        refX="6" refY="2" orient="auto" fill="#666">
                  <polygon points="0 0, 6 2, 0 4" />
                </marker>
              </defs>

              {/* Chamber */}
              <rect x="70" y="40" width="110" height="140"
                    fill="rgba(240,240,240,0.3)" stroke="#666" strokeWidth="1" />

              {/* RF Source */}
              <circle cx="30" cy="110" r="12" fill="none" stroke="#3b82f6" strokeWidth="1" />
              <text x="26" y="114" className="text-xs fill-blue-600">RF</text>

              {/* Blocking Capacitor */}
              <line x1="52" y1="105" x2="52" y2="115" stroke="#000" strokeWidth="2" />
              <line x1="56" y1="105" x2="56" y2="115" stroke="#000" strokeWidth="2" />

              {/* Connections */}
              <line x1="42" y1="110" x2="52" y2="110" stroke="#000" strokeWidth="1" />
              <line x1="56" y1="110" x2="70" y2="110" stroke="#000" strokeWidth="1" />
              <line x1="70" y1="110" x2={electrodes.left.x} y2="110" stroke="#000" strokeWidth="1" />

              {/* Left Electrode (RF) */}
              <rect
                x={electrodes.left.x}
                y={electrodes.left.y}
                width={electrodes.left.width}
                height={electrodes.left.height}
                fill={rfVoltage > 0 ? "#ff6b6b" : "#4ecdc4"}
                stroke="#333"
                strokeWidth="1"
              />
              <text
                x={electrodes.left.x - 10}
                y={electrodes.left.y + electrodes.left.height/2 + 3}
                textAnchor="middle"
                className="text-xs font-bold"
              >
                {rfVoltage > 0 ? "+" : "-"}
              </text>

              {/* Right Electrode (Grounded) */}
              <rect
                x={electrodes.right.x}
                y={electrodes.right.y}
                width={electrodes.right.width}
                height={electrodes.right.height}
                fill="#9ca3af"
                stroke="#333"
                strokeWidth="1"
              />
              <text
                x={electrodes.right.x + electrodes.right.width + 10}
                y={electrodes.right.y + electrodes.right.height/2 + 3}
                textAnchor="middle"
                className="text-xs font-bold"
              >
                GND
              </text>

              {/* Ground connection */}
              <line
                x1={electrodes.right.x + electrodes.right.width}
                y1={electrodes.right.y + electrodes.right.height/2}
                x2="190"
                y2={electrodes.right.y + electrodes.right.height/2}
                stroke="#000"
                strokeWidth="1"
              />
              <line
                x1="190"
                y1={electrodes.right.y + electrodes.right.height/2}
                x2="190"
                y2="200"
                stroke="#000"
                strokeWidth="1"
              />
              <line x1="185" y1="200" x2="195" y2="200" stroke="#000" strokeWidth="1" />
              <line x1="187" y1="202" x2="193" y2="202" stroke="#000" strokeWidth="1" />
              <line x1="189" y1="204" x2="191" y2="204" stroke="#000" strokeWidth="1" />

              {/* Electrons - 축적된 전자는 빨간색 */}
              {electrons.map(electron => (
                <circle
                  key={electron.id}
                  cx={electron.x}
                  cy={electron.y}
                  r="1.5"
                  fill={electron.accumulated ? "#dc2626" : "#22c55e"}
                  stroke={electron.accumulated ? "#991b1b" : "#16a34a"}
                  strokeWidth="0.5"
                />
              ))}

              {/* Ions - 더 큰 크기 */}
              {ions.map(ion => (
                <circle
                  key={ion.id}
                  cx={ion.x}
                  cy={ion.y}
                  r="3.5"
                  fill="#3b82f6"
                  stroke="#1d4ed8"
                  strokeWidth="0.8"
                />
              ))}

              {/* Legend */}
              <g transform="translate(15, 15)">
                <circle cx="0" cy="0" r="1.5" fill="#22c55e" />
                <text x="5" y="3" className="text-xs">e⁻ 자유</text>

                <circle cx="0" cy="12" r="1.5" fill="#dc2626" />
                <text x="5" y="15" className="text-xs">e⁻ 축적</text>

                <circle cx="0" cy="24" r="3.5" fill="#3b82f6" />
                <text x="8" y="27" className="text-xs">Ion⁺</text>
              </g>
            </svg>
          </div>
          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <p className="text-xs text-gray-600">• 전자는 RF에 빠르게 반응</p>
            <p className="text-xs text-gray-600">• 이온은 느리게 움직임</p>
          </div>
        </div>

        {/* Figure 3: RF Bias Potential */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-base font-semibold mb-3 text-center">RF Bias 전위 (Potential Distribution)</h3>
          <canvas
            ref={biasCanvasRef}
            className="border border-gray-300 w-full"
            style={{ width: '100%', height: '200px' }}
          />
          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <p><span className="font-semibold">전극 면적비:</span> {activeElectrodeRatio.toFixed(2)}</p>
            <p><span className="font-semibold">축적 전자:</span> {electrons.filter(e => e.accumulated).length}개</p>
            <p className="text-xs text-gray-600">• 보라선: RF + DC 합성 전위</p>
            <p className="text-xs text-gray-600">• 빨간 점선: DC 성분</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            <div>
              <label className="block text-xs font-medium mb-1">
                전극 면적비: {electrodeAreaRatio.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={electrodeAreaRatio}
                onChange={(e) => setElectrodeAreaRatio(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`py-2 px-3 rounded text-sm font-medium ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isRunning ? '정지' : '시작'}
            </button>

            <button
              onClick={() => {
                setTime(0);
                setSelfBiasVoltage(0);
                generateParticles();
              }}
              className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium"
            >
              리셋
            </button>

            <div className="text-xs space-y-1">
              <div>RF: {rfVoltage.toFixed(0)}V</div>
              <div>Self-bias: {selfBiasVoltage.toFixed(0)}V</div>
            </div>
          </div>

          <div className="mt-3 p-3 bg-indigo-50 rounded text-xs text-indigo-700 space-y-2">
            <div>
              <strong>기본 원리:</strong> 전자는 가벼워서 RF 변화에 즉시 반응하여 양쪽 전극을 빠르게 왔다갔다함.
              이온은 무거워서 RF를 따라가지 못하고 상대적으로 안정적으로 움직임.
            </div>
            <div>
              <strong>전극 면적과 Self-bias 관계:</strong> 전극 면적이 작아질수록 <span className="font-bold text-indigo-900">Self-bias가 커집니다.</span>
              작은 전극은 전자가 충돌할 확률이 줄어들어 전극 근처에 전자가 축적되고,
              Blocking Capacitor에 의해 이 음전하가 DC로 유지되어 더 큰 음(-)의 Self-bias가 형성됩니다.
              면적비가 1:10일 때, 작은 전극에는 약 -60V 이상의 Self-bias가 발생하여 이온 충돌 에너지를 크게 증가시킵니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// RF 파형 애니메이션 컴포넌트
const RFWaveformAnimation = ({ time, isPlaying }) => {
  const i = 10;
  const t = (i / 150) * 4 * Math.PI - time;
  const voltage = Math.sin(t);

  let phaseText = '';
  let phaseColor = '';
  let phaseNumber = 1;

  if (Math.abs(voltage) < 0.1) {
    phaseText = 'V = 0 (중성)';
    phaseColor = '#6B7280';
    phaseNumber = 1;
  } else if (voltage > 0) {
    phaseText = '+V (양전압)';
    phaseColor = '#DC2626';
    phaseNumber = 2;
  } else {
    phaseText = '-V (음전압)';
    phaseColor = '#2563EB';
    phaseNumber = 3;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold" style={{color: phaseColor}}>
          단계 {phaseNumber}: {phaseText}
        </span>
      </div>

      <svg width="300" height="150" className="border rounded">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="300" height="150" fill="url(#grid)" />

        <line x1="0" y1="75" x2="300" y2="75" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="5,5"/>

        <path
          d={`M 0 ${75 - 50 * Math.sin(-time)} ${Array.from({length: 150}, (_, i) => {
            const t = (i / 150) * 4 * Math.PI - time;
            const y = 75 - 50 * Math.sin(t);
            return `L ${i * 2} ${y}`;
          }).join(' ')}`}
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2"
        />

        <line x1="20" y1="20" x2="20" y2="130" stroke="#374151" strokeWidth="3"/>
        <text x="25" y="35" fontSize="10" fill="#374151" fontWeight="bold">RF 전극</text>

        <circle
          cx={20}
          cy={75 - 50 * voltage}
          r="5"
          fill={phaseColor}
          stroke="white"
          strokeWidth="2"
        />

        <line
          x1="20"
          y1="75"
          x2="20"
          y2={75 - 50 * voltage}
          stroke={phaseColor}
          strokeWidth="2"
          strokeDasharray="3,3"
        />

        <text x="10" y="20" fontSize="12" fill="#374151" fontWeight="bold">
          13.56 MHz RF 파형
        </text>
        <text x="10" y="140" fontSize="12" fill={phaseColor} fontWeight="bold">
          전극 전압: {voltage.toFixed(2)}V
        </text>

        <text x="200" y="140" fontSize="10" fill="#6B7280">
          → 시간 (13.56 MHz)
        </text>
      </svg>

      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
        <strong>💡 해석:</strong> 왼쪽 세로선이 RF 전극이고, 원형 점이 현재 전극에 가해지는 전압을 실시간으로 보여줍니다.
        파형이 오른쪽으로 흘러가면서 전극 전압이 +V ↔ 0 ↔ -V를 반복합니다.
      </div>
    </div>
  );
};

// Sheath Potential 애니메이션 컴포넌트
const SheathPotentialAnimation = ({ time, isPlaying }) => {
  const voltage = Math.sin(time);

  // 연속적인 색상 변화 계산
  const getElectrodeColor = (voltage) => {
    if (voltage > 0) {
      const intensity = Math.abs(voltage);
      const red = Math.floor(220 * intensity + 35);
      const green = Math.floor(38 * (1 - intensity) + 38);
      const blue = Math.floor(38 * (1 - intensity) + 38);
      return `rgb(${red}, ${green}, ${blue})`;
    } else {
      const intensity = Math.abs(voltage);
      const red = Math.floor(59 * (1 - intensity) + 59);
      const green = Math.floor(130 * intensity + 130);
      const blue = Math.floor(246 * intensity + 130);
      return `rgb(${red}, ${green}, ${blue})`;
    }
  };

  // 연속적인 Sheath 두께 계산
  const sheathDepthLeft = 15 + 10 * Math.abs(voltage);
  const sheathDepthRight = 15 + 10 * Math.abs(-voltage);

  // 연속적인 이온 충돌 강도
  const leftIonIntensity = Math.max(0, voltage);
  const rightIonIntensity = Math.max(0, -voltage);

  // Powered 전극의 전위 높이 (RF 파형과 동일한 방향으로 변화하지만 플라즈마보다 낮게)
  const poweredPotentialY = 130 + voltage * 30; // 변화폭을 줄여서 플라즈마보다 낮게 유지

  // 플라즈마 포텐셜 높이 - 항상 가장 높은 전위 유지
  const plasmaPotentialY = 90 + voltage * 5; // 작은 변화폭으로 안정성 유지

  // 현재 상태 텍스트
  let statusText = '';
  if (Math.abs(voltage) < 0.1) {
    statusText = '플라즈마 포텐셜 기준점 - Ground는 항상 0V';
  } else if (voltage > 0) {
    statusText = `Powered +${voltage.toFixed(2)}V → 플라즈마 포텐셜 (더 높음) → Ground 0V`;
  } else {
    statusText = `Powered ${voltage.toFixed(2)}V → 플라즈마 포텐셜 (양수 유지) → Ground 0V`;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-indigo-700">
          RF 전압: {voltage.toFixed(2)}V (연속 변화)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 왼쪽: 현재 애니메이션 */}
        <div>
          <h5 className="text-sm font-semibold text-indigo-700 mb-2">실시간 Sheath Potential 변화</h5>
          <svg width="300" height="200" className="border rounded bg-gray-50">
            {/* 0V 기준선 (Ground 전극 높이) */}
            <line x1="0" y1="130" x2="300" y2="130" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
            <text x="280" y="125" fontSize="10" fill="#10B981" fontWeight="bold">0V</text>

            {/* 전극 - Powered는 검정 고정, Ground는 같은 길이 */}
            <rect x="20" y="20" width="15" height="160" fill="#374151" rx="2"/>
            <rect x="265" y="20" width="15" height="160" fill="#6B7280" rx="2"/>

            {/* 전극 라벨 */}
            <text x="5" y="15" fontSize="9" fill="#374151" fontWeight="bold">Powered</text>
            <text x="245" y="15" fontSize="9" fill="#374151" fontWeight="bold">Ground</text>
            <text x="275" y="185" fontSize="8" fill="#6B7280" fontWeight="bold">0V</text>

            {/* 플라즈마 영역 */}
            <rect x="50" y="60" width="200" height="80" fill="#DBEAFE" fillOpacity="0.6" rx="4"/>
            <text x="135" y="105" fontSize="12" fill="#1E40AF" fontWeight="bold">플라즈마</text>

            {/* 플라즈마 포텐셜 수평선 - 전체가 동일한 전위, 약간의 변화 */}
            <line x1="50" y1={plasmaPotentialY} x2="250" y2={plasmaPotentialY} stroke="#1E40AF" strokeWidth="2" strokeDasharray="5,5"/>
            <text x="140" y={plasmaPotentialY - 5} fontSize="10" fill="#1E40AF" fontWeight="bold">플라즈마 포텐셜 (+)</text>

            {/* Sheath 영역 - 연속적 두께 변화 */}
            <rect x="35" y="70" width={sheathDepthLeft} height="60" fill="#FCA5A5" fillOpacity="0.8" rx="2"/>
            <rect x={250-sheathDepthRight} y="70" width={sheathDepthRight} height="60" fill="#FCA5A5" fillOpacity="0.8" rx="2"/>

            {/* 연속적으로 변화하는 전위 분포 곡선 - 플라즈마 내부는 등전위 */}
            <path
              d={`M 35 ${poweredPotentialY} Q 50 ${(poweredPotentialY + plasmaPotentialY) / 2} 50 ${plasmaPotentialY} L 250 ${plasmaPotentialY} Q 260 ${(plasmaPotentialY + 130) / 2} 275 130`}
              fill="none"
              stroke={getElectrodeColor(voltage)}
              strokeWidth="3"
              strokeDasharray="5,5"
            />

            {/* 전위 라벨 */}
            <text x="40" y="195" fontSize="8" fill="#1E40AF">Vs</text>
            <text x="260" y="195" fontSize="8" fill="#7C3AED">Vg</text>

            {/* 연속적 이온 충돌 효과 */}
            {leftIonIntensity > 0.1 && (
              <>
                <circle cx="45" cy="80" r="2" fill="#EF4444" opacity={leftIonIntensity}>
                  <animate attributeName="cy" values="80;75;80" dur="0.3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="45" cy="100" r="2" fill="#EF4444" opacity={leftIonIntensity}>
                  <animate attributeName="cy" values="100;95;100" dur="0.4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="45" cy="120" r="2" fill="#EF4444" opacity={leftIonIntensity}>
                  <animate attributeName="cy" values="120;115;120" dur="0.5s" repeatCount="indefinite"/>
                </circle>
                <text x="10" y="50" fontSize="10" fill="#DC2626" fontWeight="bold">강한 충돌</text>
              </>
            )}

            {rightIonIntensity > 0.1 && (
              <>
                <circle cx="255" cy="80" r="2" fill="#EF4444" opacity={rightIonIntensity}>
                  <animate attributeName="cy" values="80;75;80" dur="0.3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="255" cy="100" r="2" fill="#EF4444" opacity={rightIonIntensity}>
                  <animate attributeName="cy" values="100;95;100" dur="0.4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="255" cy="120" r="2" fill="#EF4444" opacity={rightIonIntensity}>
                  <animate attributeName="cy" values="120;115;120" dur="0.5s" repeatCount="indefinite"/>
                </circle>
                <text x="220" y="50" fontSize="10" fill="#DC2626" fontWeight="bold">강한 충돌</text>
              </>
            )}
          </svg>
        </div>

        {/* 오른쪽: RF 전압 0V 상태 (정적 스틸샷) */}
        <div>
          <h5 className="text-sm font-semibold text-indigo-700 mb-2">Average Plasma Potential</h5>
          <svg width="300" height="200" className="border rounded bg-gray-50">
            {/* 0V 기준선 (Ground 전극 높이) */}
            <line x1="0" y1="130" x2="300" y2="130" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
            <text x="280" y="125" fontSize="10" fill="#10B981" fontWeight="bold">0V</text>

            {/* 전극 - Powered는 검정 고정, Ground는 같은 길이 */}
            <rect x="20" y="20" width="15" height="160" fill="#374151" rx="2"/>
            <rect x="265" y="20" width="15" height="160" fill="#6B7280" rx="2"/>

            {/* 전극 라벨 */}
            <text x="5" y="15" fontSize="9" fill="#374151" fontWeight="bold">Powered</text>
            <text x="245" y="15" fontSize="9" fill="#374151" fontWeight="bold">Ground</text>
            <text x="275" y="185" fontSize="8" fill="#6B7280" fontWeight="bold">0V</text>

            {/* 플라즈마 영역 */}
            <rect x="50" y="60" width="200" height="80" fill="#DBEAFE" fillOpacity="0.6" rx="4"/>
            <text x="135" y="105" fontSize="12" fill="#1E40AF" fontWeight="bold">플라즈마</text>

            {/* 플라즈마 포텐셜 수평선 - voltage=0일 때 고정 높이 */}
            <line x1="50" y1="90" x2="250" y2="90" stroke="#1E40AF" strokeWidth="2" strokeDasharray="5,5"/>
            <text x="140" y="85" fontSize="10" fill="#1E40AF" fontWeight="bold">플라즈마 포텐셜 (+)</text>

            {/* Sheath 영역 - voltage=0일 때 기본 두께 15px */}
            <rect x="35" y="70" width="15" height="60" fill="#FCA5A5" fillOpacity="0.8" rx="2"/>
            <rect x="235" y="70" width="15" height="60" fill="#FCA5A5" fillOpacity="0.8" rx="2"/>

            {/* 전위 분포 곡선 - voltage=0일 때 중성색 (회색) */}
            <path
              d="M 35 130 Q 50 110 50 90 L 250 90 Q 260 110 275 130"
              fill="none"
              stroke="#6B7280"
              strokeWidth="3"
              strokeDasharray="5,5"
            />

            {/* 전위 라벨 */}
            <text x="40" y="195" fontSize="8" fill="#1E40AF">Vs</text>
            <text x="260" y="195" fontSize="8" fill="#7C3AED">Vg</text>

            {/* 이온 충돌 없음 (voltage=0이므로) */}
          </svg>
        </div>
      </div>

      {/* 해석 부분 */}
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
        <h4 className="font-bold text-indigo-800 mb-3">💡 RF 전압 0V 상태의 의미</h4>
        <div className="text-sm text-indigo-700 space-y-2">
          <p>
            <strong>중성 상태:</strong> RF 전압이 0V일 때는 양쪽 전극이 전기적으로 중성 상태입니다.
            이 순간에는 이온이 어느 쪽으로도 강하게 가속되지 않습니다.
          </p>
          <p>
            <strong>Sheath 최소 두께:</strong> 전압이 0V일 때 Sheath 영역의 두께가 가장 얇습니다.
            양쪽 전극 모두 동일한 최소 두께의 Sheath를 가지게 됩니다.
          </p>
          <p>
            <strong>양쪽 전극 교대 충돌:</strong> RF 사이클 동안 ±V가 반복되면서 양이온이 양쪽 전극에 교대로 충돌하게 됩니다.
            0V일 때는 전기장이 약하여 충돌이 없지만, +V와 -V 상태에서는 각각 다른 전극으로 이온이 가속됩니다.
          </p>
          <p>
            <strong className="text-red-700">문제점:</strong> RF 플라즈마는 한 전극에만 양이온이 충돌하는 것이 아니라 두 전극에 왔다갔다 하면서 충돌하기 때문에,
            특정 전극(예: 웨이퍼가 있는 전극)에만 선택적으로 높은 에너지 이온을 충돌시키는 효과를 얻을 수 없습니다.
          </p>
          <p>
            <strong className="text-green-700">해결책 - RF Self-bias:</strong> 이러한 문제를 해결하기 위해 전극 면적비를 조절하여 DC Self-bias를 형성합니다.
            면적이 작은 전극 쪽에 더 높은 전압이 걸리게 되어, 해당 전극에 더 강한 이온 충돌을 유도할 수 있습니다.
            이를 통해 선택적 식각 및 증착 공정이 가능해집니다.
          </p>
        </div>
      </div>

      {/* 실시간 설명 */}
      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
        <strong>현재 상태:</strong> {statusText}
      </div>
    </div>
  );
};

// 이온 에너지 분포 시뮬레이터 컴포넌트 (IEDF)
const IonEnergyDistribution = () => {
  const [frequency, setFrequency] = useState(13.56); // MHz
  const [icpPower, setIcpPower] = useState(150); // W
  const [biasPower, setBiasPower] = useState(10); // W
  const [pressure, setPressure] = useState(10); // mTorr
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('frequency'); // 'frequency', 'power', 'bias'

  // 가우시안 분포 생성 함수
  const gaussian = (x, mean, sigma, amplitude) => {
    return amplitude * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(sigma, 2)));
  };

  // Lorentzian 분포 (더 날카로운 피크)
  const lorentzian = (x, center, width, amplitude) => {
    return amplitude * (width * width) / ((x - center) * (x - center) + width * width);
  };

  // RF 주파수에 따른 IEDF 계산
  const calculateIEDF = (freq, icp, bias, press) => {
    const points = [];
    const maxEnergy = 400; // eV
    const step = 2;

    // 플라즈마 전위 (ICP power에 비례)
    const plasmaPotential = 10 + (icp / 150) * 15; // 10-25 eV 범위

    // Bias 전압
    const biasVoltage = bias * 10; // 0-400 eV 범위

    for (let energy = -50; energy <= maxEnergy; energy += step) {
      let ionCount = 0;

      if (mode === 'power') {
        // ICP Power 모드: 단일 날카로운 피크
        const peakEnergy = plasmaPotential;
        const peakWidth = 2 + press / 10; // 압력에 따라 폭 증가
        const peakAmplitude = 80 + (icp / 250) * 40; // 파워에 비례한 플럭스

        ionCount += lorentzian(energy, peakEnergy, peakWidth, peakAmplitude);

        // 배경 노이즈 (낮은 에너지)
        if (energy < peakEnergy - 5) {
          ionCount += Math.random() * 0.5;
        }
      }
      else if (mode === 'bias') {
        // Bias Power 모드: 피크가 높은 에너지로 이동
        if (bias === 0) {
          // Bias 없을 때: 단일 피크 (플라즈마 전위)
          ionCount += lorentzian(energy, plasmaPotential, 2, 100);
        } else {
          // Bias 있을 때: 두 개의 피크 (RF의 최대/최소)
          const mainPeakEnergy = plasmaPotential + biasVoltage;
          const peakWidth = 5 + bias * 0.5 + press / 5; // bias와 압력에 따라 폭 증가

          // 주 피크
          ionCount += lorentzian(energy, mainPeakEnergy, peakWidth, 80);

          // 부 피크 (낮은 에너지)
          if (bias > 5) {
            const secondPeakEnergy = plasmaPotential + biasVoltage * 0.3;
            ionCount += lorentzian(energy, secondPeakEnergy, peakWidth * 0.8, 30);
          }

          // 배경 분포
          if (energy > 0 && energy < mainPeakEnergy) {
            ionCount += 0.5;
          }
        }
      }
      else {
        // Frequency 모드: RF 주파수에 따른 변화
        if (freq < 5) {
          // 낮은 주파수: 여러 피크
          ionCount += lorentzian(energy, 15, 8, 60);
          ionCount += lorentzian(energy, 45, 5, 35);
          ionCount += lorentzian(energy, 85, 4, 20);

          // 넓은 배경
          ionCount += gaussian(energy, 40, 30, 10);
        }
        else if (freq < 20) {
          // 중간 주파수: bimodal
          const separation = Math.max(15, 35 - freq * 1.2);
          const peakSharpness = 3 + freq * 0.3;

          ionCount += lorentzian(energy, plasmaPotential + separation, peakSharpness, 70);
          ionCount += lorentzian(energy, plasmaPotential + separation * 2, peakSharpness, 70);

          // 중간 배경
          ionCount += 1;
        }
        else {
          // 높은 주파수: 날카로운 단일 피크
          const sharpness = Math.max(1.5, 4 - freq * 0.05);
          ionCount += lorentzian(energy, plasmaPotential + 15, sharpness, 100);
        }
      }

      // 압력에 따른 충돌 효과 (에너지 분산)
      if (press > 10) {
        const collisionBroadening = (press - 10) / 20;
        ionCount = ionCount * (1 - collisionBroadening * 0.3);
      }

      // 노이즈 추가 (실시간 측정 느낌)
      const baseNoise = ionCount > 5 ? ionCount * 0.03 : 0.3;
      const noise = (Math.random() - 0.5) * baseNoise;

      points.push({
        energy: energy,
        ions: Math.max(0, ionCount + noise)
      });
    }

    return points;
  };

  // 파라미터 변경 시 초기 데이터 로딩
  useEffect(() => {
    setIsUpdating(true);

    // 데이터 읽어들이는 지연 시간 (측정 장비 느낌)
    const delay = setTimeout(() => {
      const newData = calculateIEDF(frequency, icpPower, biasPower, pressure);
      setData(newData);
      setIsUpdating(false);
    }, 300 + Math.random() * 200); // 300-500ms 랜덤 지연

    return () => clearTimeout(delay);
  }, [frequency, icpPower, biasPower, pressure, mode]);

  // 실시간 데이터 업데이트 (계속 흔들림)
  useEffect(() => {
    if (isUpdating) return; // 초기 로딩 중에는 실시간 업데이트 안함

    const interval = setInterval(() => {
      const newData = calculateIEDF(frequency, icpPower, biasPower, pressure);
      setData(newData);
    }, 150 + Math.random() * 100); // 150-250ms마다 업데이트

    return () => clearInterval(interval);
  }, [frequency, icpPower, biasPower, pressure, mode, isUpdating]);

  // 모드별 색상 및 정보
  const getModeInfo = () => {
    if (mode === 'power') {
      return {
        label: 'ICP Power Effect',
        color: '#8B5CF6',
        description: 'Source power에 따른 이온 플럭스 변화'
      };
    } else if (mode === 'bias') {
      const biasColor = biasPower === 0 ? '#000000' : biasPower < 10 ? '#EF4444' : biasPower < 20 ? '#3B82F6' : '#10B981';
      return {
        label: 'Bias Power Effect',
        color: biasColor,
        description: 'RF bias에 따른 이온 에너지 증가'
      };
    } else {
      return {
        label: 'RF Frequency Effect',
        color: frequency < 5 ? '#3B82F6' : frequency < 20 ? '#10B981' : '#EF4444',
        description: '주파수에 따른 IEDF 형태 변화'
      };
    }
  };

  const modeInfo = getModeInfo();

  return (
    <div className="w-full bg-gray-50 p-8">
      <div className="max-w-full bg-white rounded-lg shadow-lg p-6">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Ion Energy Distribution Function (IEDF)
          </h1>
          <p className="text-gray-600">
            RF 주파수에 따른 이온 충돌 에너지 분포 변화
          </p>
        </div>

        {/* 컨트롤 패널 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          {/* 모드 선택 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Measurement Mode (측정 모드)
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('frequency')}
                className={`px-4 py-2 rounded font-medium transition ${
                  mode === 'frequency'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                RF Frequency
              </button>
              <button
                onClick={() => setMode('power')}
                className={`px-4 py-2 rounded font-medium transition ${
                  mode === 'power'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ICP Power
              </button>
              <button
                onClick={() => setMode('bias')}
                className={`px-4 py-2 rounded font-medium transition ${
                  mode === 'bias'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Bias Power
              </button>
            </div>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              {/* RF Frequency 컨트롤 */}
              {mode === 'frequency' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RF Frequency (주파수)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0.5"
                        max="40"
                        step="0.5"
                        value={frequency}
                        onChange={(e) => setFrequency(parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-xl font-bold min-w-[100px]" style={{ color: modeInfo.color }}>
                        {frequency.toFixed(1)} MHz
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setFrequency(1)} className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                      1 MHz
                    </button>
                    <button onClick={() => setFrequency(13.56)} className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                      13.56 MHz
                    </button>
                    <button onClick={() => setFrequency(30)} className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                      30 MHz
                    </button>
                  </div>
                </div>
              )}

              {/* ICP Power 컨트롤 */}
              {mode === 'power' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ICP Power (소스 파워)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="50"
                        max="250"
                        step="10"
                        value={icpPower}
                        onChange={(e) => setIcpPower(parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-xl font-bold min-w-[100px]" style={{ color: modeInfo.color }}>
                        {icpPower} W
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setIcpPower(50)} className="px-3 py-1 bg-purple-400 text-white text-sm rounded hover:bg-purple-500">
                      50 W
                    </button>
                    <button onClick={() => setIcpPower(100)} className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">
                      100 W
                    </button>
                    <button onClick={() => setIcpPower(150)} className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                      150 W
                    </button>
                    <button onClick={() => setIcpPower(200)} className="px-3 py-1 bg-purple-700 text-white text-sm rounded hover:bg-purple-800">
                      200 W
                    </button>
                    <button onClick={() => setIcpPower(250)} className="px-3 py-1 bg-purple-800 text-white text-sm rounded hover:bg-purple-900">
                      250 W
                    </button>
                  </div>
                </div>
              )}

              {/* Bias Power 컨트롤 */}
              {mode === 'bias' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bias Power (바이어스 파워)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={biasPower}
                        onChange={(e) => setBiasPower(parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-xl font-bold min-w-[100px]" style={{ color: modeInfo.color }}>
                        {biasPower} W
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setBiasPower(0)} className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                      0 W
                    </button>
                    <button onClick={() => setBiasPower(4)} className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                      4 W
                    </button>
                    <button onClick={() => setBiasPower(10)} className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                      10 W
                    </button>
                    <button onClick={() => setBiasPower(20)} className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                      20 W
                    </button>
                    <button onClick={() => setBiasPower(30)} className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">
                      30 W
                    </button>
                  </div>
                </div>
              )}

              {/* 공통 파라미터 */}
              <div className="mt-4 pt-4 border-t border-gray-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pressure (압력): {pressure} mTorr
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={pressure}
                  onChange={(e) => setPressure(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* 상태 표시 */}
            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                isUpdating ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  isUpdating ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                {isUpdating ? 'Acquiring Data...' : 'Live Monitoring'}
              </div>
              <div className="mt-2 text-sm font-medium" style={{ color: modeInfo.color }}>
                {modeInfo.label}
              </div>
              <div className="text-xs text-gray-500">
                {modeInfo.description}
              </div>
            </div>
          </div>
        </div>

        {/* 그래프 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="energy"
                label={{ value: 'Ion Energy (eV)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'Number of Ions', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value) => value.toFixed(2)}
                labelFormatter={(label) => `Energy: ${label} eV`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="ions"
                stroke={modeInfo.color}
                strokeWidth={2}
                dot={false}
                name="Ion Count"
                animationDuration={100}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 이론적 배경 섹션 */}
        <div className="mt-6 space-y-6">
          {/* IEDF란 무엇인가? */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">📚 IEDF란 무엇인가?</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Ion Energy Distribution Function (IEDF)</strong>는 플라즈마 내 이온들의 에너지 분포를 나타내는 확률 분포 함수입니다.
                특정 에너지를 가진 이온이 전체 이온 집단에서 차지하는 비율을 보여주며, 이온의 운동 에너지, 속도, 그리고 플럭스에 대한
                귀중한 정보를 제공합니다.
              </p>
              <div className="bg-white rounded p-3 mt-2">
                <p className="font-semibold text-indigo-700">💡 왜 IEDF가 중요한가?</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><strong>식각 공정:</strong> 이온 에너지가 식각 속도, 선택비, 표면 손상을 결정</li>
                  <li><strong>박막 증착:</strong> 이온 플럭스와 에너지가 박막의 미세구조와 특성에 영향</li>
                  <li><strong>이온 주입:</strong> 이온의 깊이 프로파일과 농도 제어에 필수</li>
                  <li><strong>공정 최적화:</strong> 플라즈마 파라미터 튜닝과 재현성 향상</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Plasma Sheath와 Ion Acceleration */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">⚡ Plasma Sheath와 Ion Acceleration</h3>
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                플라즈마 공정에서 이온들은 <strong>플라즈마 쉬스(Plasma Sheath)</strong>를 통과하며 기판 표면으로 가속됩니다.
                쉬스는 기판 표면과 벌크 플라즈마 사이의 전하 불균형 영역으로, 전자와 이온의 속도 차이로 인해 형성됩니다.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-3">
                  <p className="font-semibold text-gray-800 mb-2">🔵 접지 표면 (Grounded Surface)</p>
                  <ul className="list-disc ml-6 space-y-1 text-xs">
                    <li>이온은 <strong>플라즈마 전위</strong>만큼 가속</li>
                    <li>IEDF는 단일 피크를 형성</li>
                    <li>피크 에너지 ≈ 플라즈마 전위 (10-25 eV)</li>
                    <li><strong>관찰 포인트:</strong> ICP Power 모드에서 확인 가능</li>
                  </ul>
                </div>

                <div className="bg-white rounded p-3">
                  <p className="font-semibold text-gray-800 mb-2">🔴 RF Bias 표면</p>
                  <ul className="list-disc ml-6 space-y-1 text-xs">
                    <li>RF 전압으로 쉬스가 주기적으로 변화</li>
                    <li>이온은 더 높은 에너지로 가속</li>
                    <li>IEDF는 <strong>두 개의 피크</strong> 형성 가능</li>
                    <li>두 피크는 RF의 최대/최소 전압에서 진입한 이온들의 transit time 차이</li>
                    <li><strong>관찰 포인트:</strong> Bias Power 모드에서 확인 가능</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3">
                <p className="font-semibold text-yellow-800">📊 IEDF 곡선의 의미</p>
                <p className="text-xs mt-1"><strong>• 피크 위치:</strong> 대표적인 이온 에너지 (최대 이온 수가 가지는 에너지)</p>
                <p className="text-xs"><strong>• 피크 높이:</strong> 해당 에너지를 가진 이온의 수 (플럭스와 관련)</p>
                <p className="text-xs"><strong>• 곡선 아래 면적:</strong> 기판에 도달하는 총 이온 플럭스</p>
                <p className="text-xs"><strong>• 분포 폭:</strong> 이온 에너지의 분산 정도</p>
              </div>
            </div>
          </div>

          {/* 파라미터별 관찰 가이드 */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">🔬 파라미터별 관찰 가이드</h3>

            {/* RF Frequency 모드 */}
            <div className="mb-4">
              <h4 className="font-bold text-blue-700 mb-2 flex items-center">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2">RF Frequency</span>
                주파수가 IEDF에 미치는 영향
              </h4>
              <div className="bg-white rounded p-4 text-sm space-y-2">
                <div className="border-l-4 border-blue-300 pl-3">
                  <p className="font-semibold text-blue-800">📌 무엇을 관찰할까?</p>
                  <p className="text-xs mt-1">주파수를 0.5 MHz → 40 MHz로 변경하면서 IEDF 형태가 어떻게 변하는지 관찰하세요.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-900 text-xs">저주파 (&lt;5 MHz)</p>
                    <p className="text-xs mt-1">• <strong>여러 개의 피크</strong> 관찰</p>
                    <p className="text-xs">• 이온이 RF 한 주기 동안 쉬스를 통과</p>
                    <p className="text-xs">• 다양한 쉬스 전압 경험 → 넓은 에너지 분포</p>
                    <p className="text-xs text-blue-700 font-semibold mt-2">👉 1 MHz에서 테스트해보세요!</p>
                  </div>

                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-900 text-xs">중간 주파수 (5-20 MHz)</p>
                    <p className="text-xs mt-1">• <strong>바이모달(Bimodal) 분포</strong></p>
                    <p className="text-xs">• 두 개의 뚜렷한 피크</p>
                    <p className="text-xs">• 이온이 RF 변화를 부분적으로 따라감</p>
                    <p className="text-xs text-green-700 font-semibold mt-2">👉 13.56 MHz에서 테스트해보세요!</p>
                  </div>

                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-900 text-xs">고주파 (&gt;20 MHz)</p>
                    <p className="text-xs mt-1">• <strong>날카로운 단일 피크</strong></p>
                    <p className="text-xs">• 이온이 RF 주기보다 느리게 이동</p>
                    <p className="text-xs">• 시간 평균된 쉬스 전위 경험</p>
                    <p className="text-xs text-red-700 font-semibold mt-2">👉 30 MHz에서 테스트해보세요!</p>
                  </div>
                </div>

                <div className="bg-blue-100 rounded p-2 mt-3">
                  <p className="text-xs font-semibold">💡 <strong>핵심 포인트:</strong> 주파수가 높을수록 이온이 "평균화된" 전위를 느껴 단일 피크로 수렴합니다.</p>
                </div>
              </div>
            </div>

            {/* ICP Power 모드 */}
            <div className="mb-4">
              <h4 className="font-bold text-purple-700 mb-2 flex items-center">
                <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs mr-2">ICP Power</span>
                소스 파워가 IEDF에 미치는 영향
              </h4>
              <div className="bg-white rounded p-4 text-sm space-y-2">
                <div className="border-l-4 border-purple-300 pl-3">
                  <p className="font-semibold text-purple-800">📌 무엇을 관찰할까?</p>
                  <p className="text-xs mt-1">ICP 파워를 50W → 250W로 변경하면서 <strong>피크 높이</strong>의 변화를 관찰하세요.</p>
                </div>

                <div className="bg-purple-50 p-3 rounded mt-2">
                  <p className="font-semibold text-purple-900 mb-2 text-xs">파워 증가의 효과:</p>
                  <ul className="list-disc ml-6 space-y-1 text-xs">
                    <li><strong>플라즈마 밀도 증가</strong> → 더 많은 이온 생성</li>
                    <li><strong>이온 플럭스 증가</strong> → IEDF 피크 높이 증가 (그래프가 위로 올라감)</li>
                    <li><strong>피크 에너지는 거의 변하지 않음</strong> → 플라즈마 전위에 의해 결정 (10-25 eV)</li>
                    <li>기판에 도달하는 총 이온 수 증가 → 곡선 아래 면적 증가</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-purple-100 p-2 rounded">
                    <p className="text-xs font-semibold">📊 50W vs 250W 비교</p>
                    <p className="text-xs mt-1">• 피크 위치: 거의 동일</p>
                    <p className="text-xs">• 피크 높이: 약 2-3배 차이</p>
                  </div>
                  <div className="bg-purple-100 p-2 rounded">
                    <p className="text-xs font-semibold">🎯 실제 응용</p>
                    <p className="text-xs mt-1">• 높은 파워: 빠른 식각/증착</p>
                    <p className="text-xs">• 낮은 파워: 정밀 제어</p>
                  </div>
                </div>

                <div className="bg-purple-100 rounded p-2 mt-3">
                  <p className="text-xs font-semibold">💡 <strong>핵심 포인트:</strong> ICP 파워는 이온의 "양"을 조절하며, 에너지는 크게 변하지 않습니다.</p>
                </div>
              </div>
            </div>

            {/* Bias Power 모드 */}
            <div className="mb-4">
              <h4 className="font-bold text-green-700 mb-2 flex items-center">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-2">Bias Power</span>
                바이어스 파워가 IEDF에 미치는 영향
              </h4>
              <div className="bg-white rounded p-4 text-sm space-y-2">
                <div className="border-l-4 border-green-300 pl-3">
                  <p className="font-semibold text-green-800">📌 무엇을 관찰할까?</p>
                  <p className="text-xs mt-1">Bias 파워를 0W → 30W로 변경하면서 <strong>피크 위치</strong>가 어떻게 이동하는지 관찰하세요.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  <div className="bg-gray-100 p-3 rounded border-2 border-gray-400">
                    <p className="font-semibold text-gray-900 text-xs">0W (Bias 없음)</p>
                    <p className="text-xs mt-1">• 접지 표면과 동일</p>
                    <p className="text-xs">• <strong>단일 피크</strong> @ 플라즈마 전위</p>
                    <p className="text-xs">• 피크 에너지: ~10-25 eV</p>
                    <p className="text-xs text-gray-700 font-semibold mt-2">👉 0W에서 시작하세요!</p>
                  </div>

                  <div className="bg-green-100 p-3 rounded border-2 border-green-400">
                    <p className="font-semibold text-green-900 text-xs">10-30W (Bias 있음)</p>
                    <p className="text-xs mt-1">• RF bias로 이온 가속</p>
                    <p className="text-xs">• <strong>피크가 높은 에너지로 이동</strong></p>
                    <p className="text-xs">• 고에너지 주 피크 + 저에너지 부 피크</p>
                    <p className="text-xs text-green-700 font-semibold mt-2">👉 20W에서 두 피크를 확인하세요!</p>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded mt-2">
                  <p className="font-semibold text-green-900 mb-2 text-xs">Bias 파워 증가의 효과:</p>
                  <ul className="list-disc ml-6 space-y-1 text-xs">
                    <li><strong>이온 에너지 증가:</strong> 피크가 오른쪽(고에너지)으로 이동</li>
                    <li><strong>두 피크 형성:</strong> RF 최대/최소 전압에서 진입한 이온들의 차이</li>
                    <li><strong>분포 폭 증가:</strong> 에너지 분산 커짐</li>
                    <li><strong>실제 응용:</strong> 고에너지 이온으로 표면 손상 제어, 식각 방향성 향상</li>
                  </ul>
                </div>

                <div className="bg-green-100 rounded p-2 mt-3">
                  <p className="text-xs font-semibold">💡 <strong>핵심 포인트:</strong> Bias 파워는 이온의 "에너지"를 조절하며, 식각 깊이와 방향성에 직접 영향을 미칩니다.</p>
                </div>
              </div>
            </div>

            {/* Pressure 효과 */}
            <div>
              <h4 className="font-bold text-orange-700 mb-2 flex items-center">
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs mr-2">Pressure</span>
                압력이 IEDF에 미치는 영향 (모든 모드 공통)
              </h4>
              <div className="bg-white rounded p-4 text-sm space-y-2">
                <div className="border-l-4 border-orange-300 pl-3">
                  <p className="font-semibold text-orange-800">📌 무엇을 관찰할까?</p>
                  <p className="text-xs mt-1">압력을 1 mTorr → 50 mTorr로 변경하면서 <strong>피크 폭</strong>과 <strong>높이</strong>의 변화를 관찰하세요.</p>
                </div>

                <div className="bg-orange-50 p-3 rounded mt-2">
                  <p className="font-semibold text-orange-900 mb-2 text-xs">압력 증가의 효과:</p>
                  <ul className="list-disc ml-6 space-y-1 text-xs">
                    <li><strong>평균 자유 경로(Mean Free Path) 감소</strong> → 이온 충돌 증가</li>
                    <li><strong>에너지 분산 증가:</strong> 피크가 넓어짐 (broadening)</li>
                    <li><strong>피크 높이 감소:</strong> 충돌로 인해 일부 이온이 에너지 손실</li>
                    <li><strong>이온 플럭스 감소:</strong> 충돌로 기판 도달 이온 수 감소</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-orange-100 p-2 rounded">
                    <p className="text-xs font-semibold">🔽 저압 (1-10 mTorr)</p>
                    <p className="text-xs mt-1">• 날카로운 피크</p>
                    <p className="text-xs">• 높은 이온 플럭스</p>
                    <p className="text-xs">• 충돌 거의 없음</p>
                  </div>
                  <div className="bg-orange-100 p-2 rounded">
                    <p className="text-xs font-semibold">🔼 고압 (30-50 mTorr)</p>
                    <p className="text-xs mt-1">• 넓은 피크</p>
                    <p className="text-xs">• 낮은 이온 플럭스</p>
                    <p className="text-xs">• 충돌 효과 dominant</p>
                  </div>
                </div>

                <div className="bg-orange-100 rounded p-2 mt-3">
                  <p className="text-xs font-semibold">💡 <strong>핵심 포인트:</strong> 압력은 이온의 "충돌 빈도"를 조절하며, 에너지 분포의 "선명도"에 영향을 미칩니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 실습 가이드 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 추천 실습 순서</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white rounded p-3 border-l-4 border-blue-400">
                <p className="font-semibold text-blue-800">1단계: RF Frequency 모드에서 기본 이해</p>
                <p className="text-xs mt-1">• 1 MHz, 13.56 MHz, 30 MHz를 차례로 테스트</p>
                <p className="text-xs">• 주파수에 따른 피크 개수와 형태 변화를 관찰</p>
              </div>

              <div className="bg-white rounded p-3 border-l-4 border-purple-400">
                <p className="font-semibold text-purple-800">2단계: ICP Power 모드에서 플럭스 이해</p>
                <p className="text-xs mt-1">• 50W → 150W → 250W 순서로 변경</p>
                <p className="text-xs">• 피크 높이 변화를 관찰 (에너지는 거의 변하지 않음을 확인)</p>
              </div>

              <div className="bg-white rounded p-3 border-l-4 border-green-400">
                <p className="font-semibold text-green-800">3단계: Bias Power 모드에서 에너지 제어 이해</p>
                <p className="text-xs mt-1">• 0W에서 시작하여 10W, 20W, 30W로 증가</p>
                <p className="text-xs">• 피크가 고에너지로 이동하고 두 개의 피크가 나타나는 것을 확인</p>
              </div>

              <div className="bg-white rounded p-3 border-l-4 border-orange-400">
                <p className="font-semibold text-orange-800">4단계: 각 모드에서 Pressure 효과 확인</p>
                <p className="text-xs mt-1">• 저압(1-5 mTorr)과 고압(30-50 mTorr) 비교</p>
                <p className="text-xs">• 피크 폭 증가와 높이 감소를 관찰</p>
              </div>
            </div>
          </div>

          {/* 면책 사항 */}
          <div className="bg-gray-100 rounded p-4 text-xs text-gray-600 italic border border-gray-300">
            <p className="font-semibold text-gray-700">📝 교육용 시뮬레이터 안내</p>
            <p className="mt-1">
              이 시뮬레이터는 교육 목적으로 제작되었으며, 실제 플라즈마 물리 현상의 경향성과 원리를 보여줍니다.
              실제 측정 값과 다를 수 있으며, 정밀한 연구나 상업적 용도로는 실제 RFEA (Retarding Field Energy Analyzer) 같은
              전문 진단 장비를 사용해야 합니다. 본 시뮬레이터는 IEDF의 개념과 파라미터 간 관계를 학습하는 데 최적화되어 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlasmaSimulator = () => {
  const [activeTheme, setActiveTheme] = useState('tab1');

  const [electronTemp, setElectronTemp] = useState(3);
  const [gasPressure, setGasPressure] = useState(50);
  const [rfPower, setRfPower] = useState(100);

  const [frequency, setFrequency] = useState(13.56);
  const [power, setPower] = useState(100);
  const [electrodeRatio, setElectrodeRatio] = useState(3);
  const [pressure, setPressure] = useState(50); // 공정 압력 (mTorr)

  const [electronDensity, setElectronDensity] = useState(1e11);
  const [electronTemperature, setElectronTemperature] = useState(3);
  const [patternSize, setPatternSize] = useState(100);

  const ionizationRate = Math.min(100, (electronTemp * gasPressure * rfPower) / 5000);
  const plasmaFrequency = Math.sqrt(electronDensity / 1e10) * 9;
  const debyeLength = Math.sqrt(electronTemperature) / Math.sqrt(electronDensity / 1e11) * 0.1;

  // Self-bias 계산 (물리적 원리 반영)
  // Self-bias 극대화: 주파수↓, 파워↑, 압력↓, 면적비↑
  // 스케일링: 5MHz에서 30MHz처럼 동작하도록 6배 적용
  const scaledFrequency = frequency * 6;
  const selfBiasCalc = -(
    (200 * Math.pow(electrodeRatio, 0.8)) / 2 + // 면적비 효과
    (100 / scaledFrequency) * 13.56 + // 주파수 낮을수록 증가
    (power / 1000) * 150 + // 파워 높을수록 Self-bias 더 음수로 (계수 대폭 증가)
    ((100 - pressure) / 100) * 40 // 압력 낮을수록 증가
  );

  const themes = [
    { id: 'tab1', name: 'DC 플라즈마 원리', icon: '🔄', color: 'green' },
    { id: 'tab2', name: 'RF 플라즈마 원리', icon: '⚗️', color: 'indigo' },
    { id: 'tab3', name: '주파수 효과', icon: '📡', color: 'teal' },
    { id: 'tab4', name: '이온 에너지', icon: '⚡', color: 'red' },
    { id: 'tab5', name: '전자 온도', icon: '🌡️', color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        .slider-thumb-green::-webkit-slider-runnable-track {
          width: 100%;
          height: 20px;
          background: linear-gradient(135deg, #059669, #10b981);
          border-radius: 10px;
          border: 2px solid #047857;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-thumb-green::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #059669, #10b981);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          position: relative;
          top: -2px;
        }
        .slider-thumb-red::-webkit-slider-runnable-track {
          width: 100%;
          height: 20px;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          border-radius: 10px;
          border: 2px solid #b91c1c;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-thumb-red::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          position: relative;
          top: -2px;
        }
        .slider-thumb-blue::-webkit-slider-runnable-track {
          width: 100%;
          height: 20px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          border-radius: 10px;
          border: 2px solid #1d4ed8;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-thumb-blue::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          position: relative;
          top: -2px;
        }
        .slider-thumb-orange::-webkit-slider-runnable-track {
          width: 100%;
          height: 20px;
          background: linear-gradient(135deg, #ea580c, #f97316);
          border-radius: 10px;
          border: 2px solid #c2410c;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-thumb-orange::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ea580c, #f97316);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          position: relative;
          top: -2px;
        }
        .slider-thumb-teal::-webkit-slider-runnable-track {
          width: 100%;
          height: 20px;
          background: linear-gradient(135deg, #0d9488, #14b8a6);
          border-radius: 10px;
          border: 2px solid #0f766e;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-thumb-teal::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0d9488, #14b8a6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          position: relative;
          top: -2px;
        }

        .ion-move {
          animation: moveTowardsCathode 2s infinite;
        }
        .ion-move-2 {
          animation: moveTowardsCathode 2.2s infinite;
        }
        .ion-move-3 {
          animation: moveTowardsCathode 1.8s infinite;
        }
        .ion-move-4 {
          animation: moveTowardsCathode 2.5s infinite;
        }
        .ion-move-5 {
          animation: moveTowardsCathode 2.1s infinite;
        }

        @keyframes moveTowardsCathode {
          0% { transform: translateX(0); }
          100% { transform: translateX(-20px); }
        }
      `}</style>

      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">반도체 공정 플라즈마 시뮬레이터</h1>
            <div className="text-sm text-gray-500">Semiconductor Plasma Learning System</div>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {themes.map((theme, index) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTheme === theme.id
                    ? 'bg-blue-100 text-blue-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{theme.icon}</span>
                <span>{index + 1}. {theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-6 py-6">

        {/* 탭 1: DC 플라즈마 기본 원리 */}
        {activeTheme === 'tab1' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border">
              <h2 className="text-2xl font-bold text-green-900 mb-4">🔄 DC 플라즈마 기본 원리</h2>
              <p className="text-green-700 mb-3">DC 바이어스가 인가될 때 전자와 양이온의 움직임 차이로 인한 Space Charge 형성과 Sheath 영역 생성을 학습합니다.</p>
              <div className="text-sm text-green-600 bg-green-100 rounded-lg p-3">
                <strong>학습 포인트:</strong> DC 바이어스에 의한 전자/양이온 분리, Sheath 형성 메커니즘, Potential Drop과 E-field 관계
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-green-800 mb-4">DC 플라즈마 Potential 분포</h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Without Plasma */}
                <div className="text-center">
                  <h4 className="font-bold text-gray-800 mb-4">Without Plasma</h4>
                  <svg width="300" height="200" className="border rounded bg-gray-50">
                    <rect x="30" y="40" width="20" height="120" fill="#8B5CF6" rx="2"/>
                    <rect x="250" y="40" width="20" height="120" fill="#EF4444" rx="2"/>

                    <text x="15" y="30" fontSize="12" fill="#8B5CF6" fontWeight="bold">Cathode</text>
                    <text x="15" y="20" fontSize="14" fill="#8B5CF6">-</text>
                    <text x="235" y="30" fontSize="12" fill="#EF4444" fontWeight="bold">Anode</text>
                    <text x="275" y="20" fontSize="14" fill="#EF4444">+</text>

                    <line x1="40" y1="100" x2="260" y2="100" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
                    <text x="145" y="95" fontSize="10" fill="#10B981" fontWeight="bold">0V</text>

                    <line x1="50" y1="160" x2="250" y2="40" stroke="#374151" strokeWidth="2" strokeDasharray="5,5"/>
                    <text x="130" y="110" fontSize="12" fill="#374151" fontWeight="bold">Potential</text>

                    <text x="100" y="190" fontSize="11" fill="#6B7280">균등한 전기장 분포</text>
                  </svg>
                </div>

                {/* With Plasma */}
                <div className="text-center">
                  <h4 className="font-bold text-blue-800 mb-4">With Plasma</h4>
                  <DCPlasmaStep1Animation />
                </div>
              </div>

              <div className="mt-6 bg-amber-50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-800 mb-3">💡 DC 플라즈마 Sheath 형성 메커니즘</h4>

                <div className="space-y-4 text-sm text-amber-800">
                  <div className="bg-amber-100 p-3 rounded border-l-4 border-amber-400">
                    <h5 className="font-bold mb-2">1. 이동속도 차이와 전하 분리</h5>
                    <p>전자와 이온은 전극으로 향하여 chamber 벽면에서 충돌하거나 재결합하여 소멸됩니다. 하지만 전자가 이온보다 훨씬 이동속도가 빠르기 때문에, 전자가 chamber 벽면으로 이동해서 충돌하고 소멸했을 때 이온은 아직도 플라즈마 bulk 안에 존재합니다.</p>
                  </div>

                  <div className="bg-orange-100 p-3 rounded border-l-4 border-orange-400">
                    <h5 className="font-bold mb-2">2. Plasma Potential과 Floating Potential</h5>
                    <p><strong>Plasma Potential</strong>은 생성된 플라즈마가 가지는 전위를 의미하며, <strong>Floating Potential</strong>은 접지나 기판이 가지는 전위를 의미합니다. 플라즈마 내에는 양이온, 전자와 같은 하전 입자들이 있지만, 준중성 상태이기에 일정한 전위를 가집니다. (Net Charge Q=0 → E Field = 0)</p>
                  </div>

                  <div className="bg-blue-100 p-3 rounded border-l-4 border-blue-400">
                    <h5 className="font-bold mb-2">3. Sheath Voltage 정의</h5>
                    <p>플라즈마 생성 이후, 무수히 많은 자유전자가 Anode 부근으로 빠르게 collecting 되면서 Anode의 표면 전위가 작아집니다. 이러한 이유로 Plasma Potential이 Floating Potential보다 항상 높은 전위값을 가집니다. 즉, <strong>Plasma Potential(Vp)과 Floating Potential(Vf)의 차이를 Sheath Voltage</strong>라고 정의합니다.</p>
                  </div>

                  <div className="bg-red-100 p-3 rounded border-l-4 border-red-400">
                    <h5 className="font-bold mb-2">4. Cathode Sheath와 Anode Sheath</h5>
                    <p>이처럼 전위차가 발생하면 상대적으로 음전위를 띤 chamber 벽면으로 전자는 이동하지 못하고, 양이온만 Sheath potential에 의해 강하게 chamber 벽면(전극)에 충돌하는 현상이 나타납니다. 이를 <strong>정상상태</strong>라고 하며, <strong>Cathode Sheath</strong>뿐만 아니라 <strong>Anode 역시 Sheath 영역이 생성</strong>됩니다.</p>
                  </div>

                  <div className="bg-green-100 p-3 rounded border-l-4 border-green-400">
                    <h5 className="font-bold mb-2">5. 중성입자와 라디칼의 거동</h5>
                    <p>이때 중성입자/라디칼들은 전기적으로 전하를 띠지 않기 때문에 확산에 의해 wafer 표면에서 자유롭게 흡착/화학반응을 일으킵니다.</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-200 rounded-lg">
                  <h5 className="font-bold text-amber-900 mb-2">🔬 Without vs With Plasma 핵심 차이</h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-900">
                    <div>
                      <strong>Without Plasma:</strong><br/>
                      • 균등한 전기장 분포<br/>
                      • 선형적인 Potential 변화<br/>
                      • Space Charge 없음
                    </div>
                    <div>
                      <strong>With Plasma:</strong><br/>
                      • Sheath Voltage = Vp - Vf<br/>
                      • 양쪽 전극에 Sheath 영역 형성<br/>
                      • 중성입자는 자유로운 표면 반응
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Sheath 영역 특성</h3>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">Sheath가 어두운 이유</h4>
                  <p className="text-sm text-gray-700">
                    전자 밀도가 매우 낮아 전자-중성입자 충돌에 의한 Excitation이 거의 일어나지 않음
                  </p>
                </div>

                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">Plasma가 밝은 이유</h4>
                  <p className="text-sm text-yellow-700">
                    충분한 전자 밀도로 인해 전자의 충돌로 Excitation이 활발히 일어나 빛을 방출
                  </p>
                </div>

                <div className="bg-green-100 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Mobility 차이</h4>
                  <p className="text-sm text-green-700">
                    자유전자 훨씬 큰 양이온의 질량 차이로 인한 이동성 차이가 Sheath 형성의 근본 원인
                  </p>
                </div>

                <div className="bg-red-100 p-4 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">2차 전자 방출</h4>
                  <p className="text-sm text-red-700">
                    양이온이 Cathode에 충돌 → 2차전자 방출 → 이온화 → 플라즈마 유지
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-sm text-yellow-800">
                <strong>🔬 핵심 원리:</strong> DC 플라즈마에서는 전자와 양이온의 질량 차이로 인한 이동성(Mobility) 차이가 핵심입니다.
                빠른 전자는 즉시 양극으로 이동하고, 느린 양이온은 음극 근처에 축적되어 Space Charge를 형성합니다.
                이로 인해 Cathode 부근에서 급격한 Potential Drop이 발생하고, 이 영역을 Sheath라고 합니다.
                Sheath Voltage로 가속된 양이온이 Cathode에 충돌하여 2차 전자를 방출하며 플라즈마가 유지됩니다.
              </div>
            </div>

            <div className="bg-indigo-50 p-5 rounded-xl border-2 border-indigo-200 mt-6">
              <h4 className="text-lg font-bold text-indigo-900 mb-4">🤔 생각해보기: 절연체 전극의 경우</h4>

              <div className="bg-white p-4 rounded-lg border border-indigo-200 mb-4">
                <h5 className="font-bold text-indigo-800 mb-3">문제 상황</h5>
                <p className="text-sm text-indigo-700 mb-3">
                  지금까지 우리는 전극이 <strong>도체(conductor)</strong>라고 가정하고 DC 플라즈마를 학습했습니다.
                  그렇다면 만약 전극이 <strong>절연체(insulator)</strong>라면 어떤 일이 일어날까요?
                </p>
                <div className="text-sm text-indigo-600 bg-indigo-100 p-3 rounded">
                  <strong>💭 질문:</strong> 절연체 표면에 DC 전압을 인가했을 때 플라즈마가 지속적으로 유지될 수 있을까요?
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h5 className="font-bold text-red-800 mb-3">힌트 1: 전하 축적</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• 절연체 표면에 전하가 계속 쌓인다면?</li>
                    <li>• 양이온이 충돌해도 전하가 빠져나갈 수 없다면?</li>
                    <li>• 표면 전위가 계속 변한다면?</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h5 className="font-bold text-orange-800 mb-3">힌트 2: 전류 연속성</h5>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• DC 회로에서 전류가 흘러야 한다면?</li>
                    <li>• 절연체를 통과하는 전류는?</li>
                    <li>• 플라즈마 유지를 위한 조건은?</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                <h5 className="font-bold text-green-800 mb-3">힌트 3: 실제 반도체 공정</h5>
                <p className="text-sm text-green-700">
                  반도체 웨이퍼는 대부분 실리콘 기판 위에 <strong>절연막(SiO₂, Si₃N₄ 등)</strong>이 있습니다.
                  그렇다면 이런 절연막 위에서는 어떤 방식의 플라즈마를 사용해야 할까요?
                </p>
                <div className="text-sm text-green-600 bg-green-100 p-3 rounded mt-2">
                  <strong>💡 연결고리:</strong> 이 질문의 답은 다음 탭인 "RF 플라즈마 원리"와 밀접한 관련이 있습니다!
                </div>
              </div>

              <div className="text-xs text-indigo-500 mt-4 p-3 bg-indigo-100 rounded">
                <strong>학습 목표:</strong> 이 문제를 통해 DC와 RF 플라즈마의 근본적 차이점과 각각의 적용 분야를 이해할 수 있습니다.
              </div>
            </div>
          </div>
        )}

        {/* 탭 2: RF 플라즈마 기본 원리 */}
        {activeTheme === 'tab2' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">⚗️ RF 플라즈마 기본 원리</h2>
              <p className="text-indigo-700 mb-3">RF 플라즈마는 13.56MHz 고주파를 이용하여 양극과 음극이 계속 바뀌면서 플라즈마를 생성합니다.</p>
              <div className="text-sm text-indigo-600 bg-indigo-100 rounded-lg p-3">
                <strong>학습 포인트:</strong> RF 주파수에 따른 sheath potential 변화와 이온 충돌 메커니즘
              </div>
            </div>

            <RFPlasmaAnimationContainer />

            <RFPlasmaSimulation />

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">RF 플라즈마 핵심 특징</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <strong>주파수 특성:</strong><br/>
                    • 13.56MHz = 1초에 1,356만번 극성 변화<br/>
                    • 양극과 음극이 빠르게 교대<br/>
                    • 높은 이온화 효율
                  </div>
                  <div>
                    <strong>공정 장점:</strong><br/>
                    • 전자-중성입자 충돌 기회 증가<br/>
                    • DC 플라즈마보다 높은 효율<br/>
                    • 절연막 공정 가능
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">DC vs RF 플라즈마 비교</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">DC 플라즈마</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 고정된 양극/음극</li>
                    <li>• 한쪽 전극에만 이온 충돌</li>
                    <li>• 2차 전자 방출에 의존</li>
                    <li>• 상대적으로 낮은 효율</li>
                    <li>• 절연막 공정 불가</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-3">RF 플라즈마</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 교대로 바뀌는 극성 (13.56MHz)</li>
                    <li>• 양쪽 전극에 이온 충돌</li>
                    <li>• 높은 이온화 효율</li>
                    <li>• 전자-중성입자 충돌 기회 증가</li>
                    <li>• 절연막 공정 가능</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-sm text-yellow-800">
                <strong>🔬 핵심 원리:</strong> RF 플라즈마에서는 13.56MHz 주파수로 전극의 극성이 빠르게 바뀝니다.
                이로 인해 sheath potential도 함께 변하며, 양쪽 전극에서 교대로 이온이 강하게 충돌하게 됩니다.
                이는 DC 플라즈마와 달리 양쪽에서 균등한 처리가 가능하고, 절연막 위에서도 플라즈마를 유지할 수 있게 합니다.
              </div>
            </div>
          </div>
        )}

        {/* 탭 3: 주파수 효과 */}
        {activeTheme === 'tab3' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border">
              <h2 className="text-2xl font-bold text-teal-900 mb-4">📡 주파수 효과 (Frequency Effects)</h2>
              <p className="text-teal-700 mb-3">RF 주파수와 파워, 전극 비율이 플라즈마 특성과 Self-bias에 미치는 영향을 실시간으로 확인하세요.</p>
              <div className="text-sm text-teal-600 bg-teal-100 rounded-lg p-3">
                <strong>💡 아래 슬라이더로 제어하면서 시뮬레이션을 동시에 관찰하세요!</strong>
              </div>
            </div>

            {/* 실시간 시뮬레이션 - 제목 바로 다음에 배치 */}
            <RFPlasmaSimulation
              externalFrequency={frequency}
              externalPower={power}
              externalElectrodeRatio={electrodeRatio}
              externalPressure={pressure}
              showControls={false}
              showTitle={false}
              showStartButton={true}
            />

            {/* 4개 제어 슬라이더 */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border">
              <h3 className="text-xl font-bold text-purple-900 mb-4">🎛️ 파라미터 제어</h3>

              <div className="grid md:grid-cols-4 gap-4">
                {/* 주파수 제어 */}
                <div className="bg-white p-4 rounded-lg border-2 border-teal-200">
                  <label className="block text-sm font-medium text-teal-900 mb-2">
                    <span className="flex items-center justify-between">
                      <span>RF 주파수 (MHz)</span>
                      <span className="bg-teal-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {frequency} MHz
                      </span>
                    </span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="0.1"
                    value={frequency}
                    onChange={(e) => setFrequency(parseFloat(e.target.value))}
                    className="w-full h-3 bg-teal-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-teal-700 mt-2">파형 진동 속도 조절</p>
                </div>

                {/* 파워 제어 */}
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    <span className="flex items-center justify-between">
                      <span>RF 파워 (W)</span>
                      <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {power} W
                      </span>
                    </span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="10"
                    value={power}
                    onChange={(e) => setPower(parseInt(e.target.value))}
                    className="w-full h-3 bg-blue-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-blue-700 mt-2">RF 전압 진폭 조절</p>
                </div>

                {/* 면적비 제어 */}
                <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                  <label className="block text-sm font-medium text-orange-900 mb-2">
                    <span className="flex items-center justify-between">
                      <span>전극 면적비 (대:소)</span>
                      <span className="bg-orange-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {electrodeRatio}:1
                      </span>
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={electrodeRatio}
                    onChange={(e) => setElectrodeRatio(parseFloat(e.target.value))}
                    className="w-full h-3 bg-orange-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-orange-700 mt-2">Self-bias 크기 조절</p>
                </div>

                {/* 압력 제어 */}
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                  <label className="block text-sm font-medium text-purple-900 mb-2">
                    <span className="flex items-center justify-between">
                      <span>공정 압력 (mTorr)</span>
                      <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {pressure} mTorr
                      </span>
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={pressure}
                    onChange={(e) => setPressure(parseInt(e.target.value))}
                    className="w-full h-3 bg-purple-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-purple-700 mt-2">평균자유행로 조절</p>
                </div>
              </div>
            </div>

            {/* 파라미터 영향 상세 설명 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📊 파라미터 영향 상세 설명</h3>

              <div className="space-y-4">
                {/* RF 주파수 */}
                <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-600">
                  <h4 className="font-bold text-teal-900 mb-2 flex items-center gap-2">
                    <span className="bg-teal-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                    RF 주파수 (Frequency)
                  </h4>
                  <div className="text-sm text-teal-800 space-y-2">
                    <p><strong>주파수가 높아지면:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• <strong>파형 주기 단축:</strong> 전압 파형 그래프에서 사인파의 주기가 짧아져 더 빠르게 진동합니다</li>
                      <li>• <strong>전자 운동 활발:</strong> 전자가 양쪽 전극을 더 빠르게 왕복하며 이온화 충돌 증가</li>
                      <li>• <strong>플라즈마 밀도 증가:</strong> 높은 충돌 빈도로 더 많은 이온-전자 쌍 생성</li>
                      <li>• <strong>균일도 향상:</strong> 스킨 깊이가 감소하여 챔버 전체에 균일한 플라즈마 형성</li>
                    </ul>
                    <p className="mt-2"><strong className="text-red-700">⚠️ 주파수가 낮아지면:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• <strong className="text-red-700">Self-bias 증가!</strong> 전자가 전극에 더 오래 머물러 충돌 증가 → Floating Potential 낮춤 → Sheath Voltage 증가</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-teal-200 text-xs bg-white p-2 rounded">
                      <div>📈 현재 플라즈마 밀도: <strong>{(power * frequency / 1000).toFixed(1)} × 10¹¹ cm⁻³</strong></div>
                      <div>📏 현재 스킨 깊이: <strong>{(1000/Math.sqrt(frequency)).toFixed(1)} cm</strong></div>
                    </div>
                  </div>
                </div>

                {/* RF 파워 */}
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <span className="bg-blue-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                    RF 파워 (Power)
                  </h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p><strong>파워가 증가하면:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• <strong>RF 전압 진폭 증가:</strong> 전압 파형 그래프에서 파란선의 진폭(높이)이 커집니다</li>
                      <li>• <strong className="text-red-700">Self-bias 증가!</strong> RF 전압 진폭 증가 → 더 큰 음의 DC Self-bias 발생</li>
                      <li>• <strong>전기장 강도 증가:</strong> 더 강한 전기장으로 입자들이 더 빠르게 가속됩니다</li>
                      <li>• <strong>이온 에너지 상승:</strong> 웨이퍼에 충돌하는 이온의 에너지가 증가하여 식각 속도 향상</li>
                      <li>• <strong>플라즈마 밀도 증가:</strong> 더 많은 에너지 공급으로 이온화율 증가</li>
                      <li>• <strong>공정 속도 향상:</strong> 높은 이온 에너지로 식각/증착 속도 증가</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-blue-200 text-xs bg-white p-2 rounded">
                      <div>⚡ 현재 이온 에너지: <strong>{(Math.abs(selfBiasCalc) + 20).toFixed(0)} eV</strong></div>
                      <div>📊 현재 RF 진폭: <strong>±{(Math.sqrt(power / 10) * 5).toFixed(0)} V</strong></div>
                    </div>
                  </div>
                </div>

                {/* 전극 면적비 */}
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                    <span className="bg-orange-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                    전극 면적비 (Electrode Area Ratio)
                  </h4>
                  <div className="text-sm text-orange-800 space-y-2">
                    <p><strong>면적비가 커지면 (작은 전극):</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• <strong>전자 축적:</strong> 작은 전극 주변에 전자가 축적되어 RF Bias 전위 그래프에서 확인 가능</li>
                      <li>• <strong>Self-bias 증가:</strong> Blocking Capacitor가 음전하를 유지하여 큰 음의 DC 전압 발생</li>
                      <li>• <strong>비대칭 플라즈마:</strong> 작은 전극(웨이퍼)에 더 많은 이온 충돌</li>
                      <li>• <strong>이온 에너지 제어:</strong> Self-bias를 조절하여 원하는 이온 충돌 에너지 달성</li>
                      <li>• <strong>선택적 식각:</strong> 웨이퍼 쪽에만 강한 이온 충돌로 효율적인 공정</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-orange-200 text-xs bg-white p-2 rounded">
                      <div>⚡ 현재 Self-bias: <strong>{selfBiasCalc.toFixed(0)} V</strong></div>
                      <div>📐 현재 전극 비율: <strong>{electrodeRatio}:1</strong> (큰 전극 : 작은 전극)</div>
                    </div>
                  </div>
                </div>

                {/* 공정 압력 */}
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                    <span className="bg-purple-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                    공정 압력 (Process Pressure)
                  </h4>
                  <div className="text-sm text-purple-800 space-y-2">
                    <p><strong className="text-red-700">⚠️ 압력이 낮아지면 (진공도 높아지면):</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• <strong className="text-red-700">Self-bias 극대화!</strong> 평균자유행로(Mean Free Path) 증가 → 전극 유입 전자 수 감소 → Floating Potential 낮춤 → Sheath Voltage 증가</li>
                      <li>• <strong>전자 이동성 증가:</strong> 충돌 빈도 감소로 전자가 더 자유롭게 이동</li>
                      <li>• <strong>이온 에너지 증가:</strong> 충돌 없이 직진하는 이온 증가 → 방향성 좋은 이온 충돌</li>
                      <li>• <strong>이방성 식각 향상:</strong> 직진성 좋은 이온으로 수직 식각 향상</li>
                    </ul>
                    <p className="mt-2"><strong>압력이 높아지면:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• <strong>플라즈마 밀도 증가:</strong> 더 많은 충돌로 이온화율 증가</li>
                      <li>• <strong>균일도 향상:</strong> 충돌로 입자 확산 증가</li>
                      <li>• <strong>Self-bias 감소:</strong> 전극 유입 전자 증가 → Sheath Voltage 감소</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-purple-200 text-xs bg-white p-2 rounded">
                      <div>🌐 현재 압력: <strong>{pressure} mTorr</strong></div>
                      <div>📏 평균자유행로: <strong>{(100 / pressure * 0.5).toFixed(2)} cm</strong> (압력↓ → 증가)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 더 생각해보기 */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-300">
              <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                💡 더 생각해보기
              </h3>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-gray-800 mb-2">🤔 질문 1: 주파수와 면적비의 상호작용</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    주파수를 높이면서 동시에 면적비를 변경하면 어떤 일이 일어날까요?
                  </p>
                  <div className="bg-amber-50 p-3 rounded text-xs text-amber-900">
                    <strong>💡 힌트:</strong> 주파수가 높아지면 전자가 전극에 충돌할 기회가 많아집니다.
                    면적비가 크면 작은 전극에 전자가 축적되기 쉽습니다.
                    두 효과를 함께 조절하면 Self-bias를 더 효과적으로 제어할 수 있습니다!
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-gray-800 mb-2">🤔 질문 2: 파워가 너무 높으면?</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    RF 파워를 계속 높이면 플라즈마 밀도와 이온 에너지가 계속 증가할까요?
                    실제 반도체 공정에서는 어떤 문제가 발생할 수 있을까요?
                  </p>
                  <div className="bg-amber-50 p-3 rounded text-xs text-amber-900">
                    <strong>💡 힌트:</strong> 파워가 너무 높으면 플라즈마가 불안정해지고, 웨이퍼에 손상(damage)이 발생할 수 있습니다.
                    과도한 이온 에너지는 원하는 패턴만 식각하는 것이 아니라 mask나 하부층까지 손상시킬 수 있습니다.
                    또한 열 발생이 증가하여 온도 제어가 어려워집니다.
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-gray-800 mb-2">🤔 질문 3: 주파수 범위의 의미</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    왜 반도체 공정에서는 주로 13.56MHz를 사용할까요?
                    이보다 훨씬 낮거나 높은 주파수를 사용하면 어떤 일이 발생할까요?
                  </p>
                  <div className="bg-amber-50 p-3 rounded text-xs text-amber-900">
                    <strong>💡 힌트:</strong> 13.56MHz는 ISM(Industrial, Scientific, Medical) 대역으로 국제적으로 허용된 주파수입니다.
                    주파수가 너무 낮으면 이온도 RF 전압을 따라가서 Self-bias 형성이 어렵고,
                    주파수가 너무 높으면 플라즈마 균일도는 좋아지지만 투과 깊이(스킨 깊이)가 너무 짧아져 큰 챔버에서는 문제가 될 수 있습니다.
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-gray-800 mb-2">🎯 실습 과제</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    위의 시뮬레이션에서 다음 조건을 만족하는 파라미터 조합을 찾아보세요:
                  </p>
                  <ul className="text-xs text-gray-700 ml-4 space-y-1">
                    <li>• 목표 1: Self-bias가 -50V 이상이 되도록 설정</li>
                    <li>• 목표 2: 플라즈마 밀도가 5 × 10¹¹ cm⁻³ 이상 유지</li>
                    <li>• 목표 3: 이온 에너지가 70 eV 이상</li>
                  </ul>
                  <div className="bg-green-50 p-3 rounded text-xs text-green-900 mt-2">
                    <strong>✅ 해답 예시:</strong> 주파수를 높이고(예: 50MHz), 파워를 증가시키고(예: 600W),
                    면적비를 크게 하면(예: 7:1) 모든 조건을 동시에 만족시킬 수 있습니다!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 4: 이온 에너지 */}
        {activeTheme === 'tab4' && (
          <IonEnergyDistribution />
        )}

        {/* 탭 5: 전자 온도 */}
        {activeTheme === 'tab5' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border">
              <h2 className="text-2xl font-bold text-orange-900 mb-4">🌡️ 전자 온도 (Electron Temperature)</h2>
              <p className="text-orange-700 mb-3">전자의 평균 운동 에너지와 이온화율, 플라즈마 반응성의 관계를 학습합니다.</p>
              <div className="text-sm text-orange-600 bg-orange-100 rounded-lg p-3">
                <strong>학습 포인트:</strong> 전자 온도가 이온화율과 활성종 생성에 미치는 영향
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <h3 className="text-lg font-semibold text-orange-800 mb-4">전자 온도 제어</h3>

                <div className="space-y-6">
                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                    <label className="block text-sm font-medium text-orange-900 mb-3">
                      <span className="flex items-center justify-between">
                        <span>전자 온도 (eV)</span>
                        <span className="bg-orange-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {electronTemp} eV
                        </span>
                      </span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.5"
                      value={electronTemp}
                      onChange={(e) => setElectronTemp(parseFloat(e.target.value))}
                      className="w-full h-4 bg-orange-300 rounded-lg appearance-none cursor-pointer slider-thumb-orange"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <label className="block text-sm font-medium text-blue-900 mb-3">
                      <span className="flex items-center justify-between">
                        <span>가스 압력 (mTorr)</span>
                        <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {gasPressure} mTorr
                        </span>
                      </span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={gasPressure}
                      onChange={(e) => setGasPressure(parseInt(e.target.value))}
                      className="w-full h-4 bg-blue-300 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
                    />
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <label className="block text-sm font-medium text-green-900 mb-3">
                      <span className="flex items-center justify-between">
                        <span>RF 파워 (W)</span>
                        <span className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {rfPower} W
                        </span>
                      </span>
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={rfPower}
                      onChange={(e) => setRfPower(parseInt(e.target.value))}
                      className="w-full h-4 bg-green-300 rounded-lg appearance-none cursor-pointer slider-thumb-green"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <h3 className="text-lg font-semibold text-orange-800 mb-4">이온화율 및 반응성</h3>

                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">이온화율</span>
                      <span className="font-bold text-lg">{ionizationRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${ionizationRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-6xl mb-2">
                        {electronTemp > 8 ? '🔥' : electronTemp > 5 ? '⚡' : electronTemp > 3 ? '💫' : '❄️'}
                      </div>
                      <div className="font-bold text-lg">
                        {electronTemp > 8 ? '고온 플라즈마' :
                         electronTemp > 5 ? '중온 플라즈마' :
                         electronTemp > 3 ? '저온 플라즈마' : '초저온 플라즈마'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>활성종 밀도:</span>
                      <span className="font-bold">{(electronTemp * rfPower / 100).toFixed(1)} × 10¹⁵ cm⁻³</span>
                    </div>
                    <div className="flex justify-between">
                      <span>식각율:</span>
                      <span className="font-bold">{(ionizationRate * 2).toFixed(0)} nm/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>전자-충돌 빈도:</span>
                      <span className="font-bold">{(electronTemp * gasPressure / 10).toFixed(1)} × 10⁶ s⁻¹</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PlasmaSimulator;
