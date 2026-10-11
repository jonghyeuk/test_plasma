import { useState, lazy, Suspense } from 'react'
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 데스크톱 사이드바 접기 — 접으면 아이콘 줄만 남아 본문(교재·시뮬)이 넓어진다. 이 브라우저에만 기억한다.
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('sidebarCollapsed') === '1'; } catch { return false; }
  });
  const toggleCollapsed = () => setCollapsed(c => {
    const next = !c;
    try { localStorage.setItem('sidebarCollapsed', next ? '1' : '0'); } catch { /* 저장 못 해도 화면은 동작 */ }
    return next;
  });
  // 접힘은 데스크톱(lg)에서만 — 모바일은 기존 열기/닫기 그대로
  const hideWhenCollapsed = collapsed ? 'lg:hidden' : '';

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

  return (
    <div className="flex h-screen bg-gray-950 relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-indigo-900 text-white rounded-lg shadow-lg
          active:scale-95 touch-manipulation transition-transform duration-150"
        aria-label="메뉴 열기/닫기"
      >
        {sidebarOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 touch-manipulation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`
        fixed lg:relative z-40 h-full w-80 ${collapsed ? 'lg:w-20' : ''}
        bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900
        text-white shadow-2xl flex flex-col
        transform transition-all duration-300 ease-in-out
        border-r border-gray-700/50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className={`relative border-b border-white/10 ${collapsed ? 'p-6 lg:px-2 lg:py-4' : 'p-6'}`}>
          {/* 접기/펼치기 (데스크톱) */}
          <button
            onClick={toggleCollapsed}
            className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-cyan-300 hover:bg-white/20 transition-colors
              ${collapsed ? 'mx-auto' : 'absolute top-4 right-4'}`}
            aria-label={collapsed ? '메뉴 펼치기' : '메뉴 접기'}
            title={collapsed ? '메뉴 펼치기' : '메뉴 접기'}
          >
            {collapsed ? '»' : '«'}
          </button>
          <div className={hideWhenCollapsed}>
          <h1 className="text-2xl font-bold mb-2 text-cyan-400">진단기술</h1>
          <h2 className="text-xl font-semibold mb-3 text-gray-200">실습센터</h2>
          <p className="text-sm text-gray-400">Plasma Diagnostic Training Center</p>
          <span className="text-xs text-gray-500 mt-2 inline-block">ver 1.4</span>
          </div>
        </div>

        {/* Simulator Navigation */}
        <nav className={`flex-1 space-y-3 overflow-y-auto ${collapsed ? 'p-4 lg:p-2' : 'p-4'}`}>
          <div className={`text-xs font-bold text-cyan-500 mb-3 px-2 ${hideWhenCollapsed}`}>
            진단 모듈 선택
          </div>
          {simulators.map((sim) => (
            <button
              key={sim.id}
              title={collapsed ? sim.name : undefined}
              onClick={() => {
                setSelectedSimulator(sim.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full text-left rounded-xl transition-all duration-300 transform
                ${collapsed ? 'p-4 lg:p-2 lg:flex lg:justify-center' : 'p-4'}
                min-h-[56px] touch-manipulation
                active:scale-95
                ${selectedSimulator === sim.id
                  ? 'bg-cyan-600/20 text-cyan-300 shadow-lg shadow-cyan-500/10 scale-105 border border-cyan-500/40'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-102 border border-transparent'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{sim.icon}</span>
                <div className={`flex-1 ${hideWhenCollapsed}`}>
                  <div className="font-bold text-sm mb-1">{sim.name}</div>
                  <div className={`text-xs ${selectedSimulator === sim.id ? 'text-cyan-400' : 'text-gray-500'}`}>
                    {sim.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t border-white/10 ${hideWhenCollapsed}`}>
          <div className="text-xs text-gray-500">
            <div className="font-semibold mb-1 text-gray-400">확장 가능한 구조</div>
            <div>각 시뮬레이터는 독립적으로 관리됩니다</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Header */}
        <header className="bg-gray-900 shadow-md border-b border-gray-700/50 px-4 sm:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-100 mb-1 sm:mb-2 pl-12 lg:pl-0">
            {simulators.find(s => s.id === selectedSimulator)?.icon}{' '}
            {simulators.find(s => s.id === selectedSimulator)?.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 pl-12 lg:pl-0">
            {simulators.find(s => s.id === selectedSimulator)?.description}
          </p>
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
    </div>
  );
}

export default App
