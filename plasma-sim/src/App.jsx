import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import PlasmaSimulatorI from './PlasmaSimulatorI'
import PlasmaSimulatorII from './PlasmaSimulatorII'
import PlasmaSimulatorIII from './PlasmaSimulatorIII'
import OESSimulator from './OESSimulator'
import ImpedanceProbeSimulator from './ImpedanceProbeSimulator'
import RGAEducation from './RGAEducation'
import RGAViewer from './RGAViewer'
import MiniFabSimulator from './MiniFabSimulator'
import './App.css'

// 데모(semiconductor-simulator)에서 들인 두 교재 — 데이터가 커서 누를 때 받는다.
// 직무영어는 데모 판 + 서고 상황 삽화(SLIDE_ART), 이송 로봇은 public/topic-sims 의 iframe 래퍼.
const FieldEnglishSimulator = lazy(() => import('./simulators/FieldEnglishSimulator'))
const WaferTransferSim = lazy(() => import('./simulators/WaferTransferSim'))

function App() {
  const [selectedSimulator, setSelectedSimulator] = useState('oes');
  // 고른 탭이 가로 탭 줄 밖에 있으면 보이는 곳으로 끌어온다
  const tabRefs = useRef({});
  useEffect(() => {
    tabRefs.current[selectedSimulator]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [selectedSimulator]);

  const simulators = [
    {
      id: 'oes',
      name: 'OES',
      description: 'Optical Emission Spectroscopy',
      icon: '🌈',
      color: 'from-violet-500 to-purple-600',
      component: OESSimulator
    },
    {
      id: 'oes-sim',
      name: 'OES 시뮬레이터',
      description: 'OES Monitor · Plasma Process Control',
      icon: '📊',
      color: 'from-violet-500 to-indigo-600',
      iframeSrc: '/OES_simulator.html'
    },
    {
      id: 'impedance',
      name: 'Impedance Probe',
      description: 'RF 임피던스 진단 · V, I, Phase',
      icon: '📡',
      color: 'from-emerald-500 to-teal-600',
      component: ImpedanceProbeSimulator
    },
    {
      id: 'rga',
      name: 'RGA',
      description: 'Residual Gas Analyzer',
      icon: '📘',
      color: 'from-orange-500 to-amber-600',
      component: RGAEducation
    },
    {
      id: 'rga-sim',
      name: 'RGA 시뮬레이터',
      description: 'RGA 측정 시뮬레이션',
      icon: '🧪',
      color: 'from-amber-500 to-orange-600',
      iframeSrc: '/rgasimulator.html'
    },
    {
      id: 'rga-sim2',
      name: 'RGA 시뮬레이터 II',
      description: 'RGA Console GUI Simulator',
      icon: '🧪',
      color: 'from-cyan-500 to-blue-600',
      iframeSrc: '/rga_console_gui_simulator.html'
    },
    {
      id: 'sem',
      name: 'SEM',
      description: 'Scanning Electron Microscope Training',
      icon: '🔬',
      color: 'from-pink-500 to-rose-600',
      iframeSrc: '/SEM.html'
    },
    {
      id: 'xps',
      name: 'XPS',
      description: 'X-ray Photoelectron Spectroscopy',
      icon: '⚛️',
      color: 'from-yellow-500 to-orange-600',
      iframeSrc: '/xps.html'
    },
    {
      id: 'xrd',
      name: 'XRD',
      description: 'X-ray Diffraction',
      icon: '💎',
      color: 'from-sky-500 to-blue-600',
      iframeSrc: '/xrd.html'
    },
    {
      id: 'afm',
      name: 'AFM',
      description: 'Atomic Force Microscopy',
      icon: '🪡',
      color: 'from-teal-500 to-cyan-600',
      iframeSrc: '/afm.html'
    },
    {
      id: 'sim1',
      name: '플라즈마 시뮬레이터 I',
      description: '기초 플라즈마 물리 원리',
      icon: '🔬',
      color: 'from-blue-500 to-blue-600',
      component: PlasmaSimulatorI
    },
    {
      id: 'sim2',
      name: '플라즈마 시뮬레이터 II',
      description: '공정 응용 및 실무',
      icon: '🏭',
      color: 'from-purple-500 to-purple-600',
      component: PlasmaSimulatorII
    },
    {
      id: 'sim3',
      name: '플라즈마 시뮬레이터 III',
      description: 'DC/RF 플라즈마 심화',
      icon: '⚡',
      color: 'from-green-500 to-green-600',
      component: PlasmaSimulatorIII
    },
    {
      id: 'mini-fab',
      name: 'Mini Fab',
      description: '시편 상태 누적 기반 Mini Fab Workflow Simulator',
      icon: '🏭',
      color: 'from-fuchsia-500 to-pink-600',
      component: MiniFabSimulator
    },
    {
      id: 'field-english',
      name: '현장 실무영어',
      description: 'Field English · 장비 화면·알람·DRC/LVS 영어',
      icon: '📖',
      color: 'from-indigo-500 to-blue-600',
      component: FieldEnglishSimulator
    },
    {
      id: 'wafer-transfer',
      name: '웨이퍼 이송 로봇',
      description: 'Wafer Transfer Robot · 센서·인터록 15강',
      icon: '🤖',
      color: 'from-slate-500 to-cyan-600',
      component: WaferTransferSim
    }
  ];

  const selected = simulators.find(s => s.id === selectedSimulator);
  const SelectedComponent = selected?.component;

  // 위쪽 탭 줄 하나로 모듈을 고른다(데모 demo.semifabai.com 처럼) — 왼쪽 메뉴·제목 머리를 없애 본문을 넓게 쓴다.
  // 모듈 설명은 탭에 마우스를 올리면 보인다.
  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <header className="flex items-stretch gap-3 bg-gray-900 border-b border-gray-700/50 px-3 shrink-0">
        <div className="flex items-center gap-2 pr-3 border-r border-white/10 shrink-0" title="Plasma Diagnostic Training Center · ver 1.4">
          <span className="text-sm font-bold text-cyan-400 whitespace-nowrap">진단기술</span>
          <span className="text-sm font-semibold text-gray-300 whitespace-nowrap hidden sm:inline">실습센터</span>
        </div>
        <nav className="flex-1 flex items-stretch gap-1 overflow-x-auto py-1.5 [scrollbar-width:thin]" aria-label="진단 모듈 선택">
          {simulators.map((sim) => (
            <button
              key={sim.id}
              ref={(el) => { tabRefs.current[sim.id] = el; }}
              onClick={() => setSelectedSimulator(sim.id)}
              title={`${sim.name} — ${sim.description}`}
              aria-current={selectedSimulator === sim.id ? 'page' : undefined}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-semibold
                transition-colors touch-manipulation shrink-0 border
                ${selectedSimulator === sim.id
                  ? 'bg-cyan-600/20 text-cyan-300 border-cyan-500/50'
                  : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200'
                }
              `}
            >
              <span className="text-base leading-none">{sim.icon}</span>
              <span>{sim.name}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Simulator Content */}
      <main className="flex-1 overflow-auto bg-gray-950">
        {SelectedComponent && (
          <Suspense fallback={<div className="p-8 text-gray-400">불러오는 중…</div>}>
            <SelectedComponent />
          </Suspense>
        )}
        {selected?.iframeSrc && <RGAViewer src={selected.iframeSrc} />}
      </main>
    </div>
  );
}

export default App
