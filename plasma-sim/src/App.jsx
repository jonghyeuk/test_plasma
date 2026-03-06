import { useState } from 'react'
import PlasmaSimulatorI from './PlasmaSimulatorI'
import PlasmaSimulatorII from './PlasmaSimulatorII'
import PlasmaSimulatorIII from './PlasmaSimulatorIII'
import OESSimulator from './OESSimulator'
import './App.css'

function App() {
  const [selectedSimulator, setSelectedSimulator] = useState('oes');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    }
  ];

  const SelectedComponent = simulators.find(s => s.id === selectedSimulator)?.component;

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
        fixed lg:relative z-40 h-full w-80
        bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900
        text-white shadow-2xl flex flex-col
        transform transition-transform duration-300 ease-in-out
        border-r border-gray-700/50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold mb-2 text-cyan-400">진단기술</h1>
          <h2 className="text-xl font-semibold mb-3 text-gray-200">실습센터</h2>
          <p className="text-sm text-gray-400">Plasma Diagnostic Training Center</p>
          <span className="text-xs text-gray-500 mt-2 inline-block">ver 1.3</span>
        </div>

        {/* Simulator Navigation */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          <div className="text-xs font-bold text-cyan-500 mb-3 px-2">
            진단 모듈 선택
          </div>
          {simulators.map((sim) => (
            <button
              key={sim.id}
              onClick={() => {
                setSelectedSimulator(sim.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full text-left p-4 rounded-xl transition-all duration-300 transform
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
                <div className="flex-1">
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
        <div className="p-4 border-t border-white/10">
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
          {SelectedComponent && <SelectedComponent />}
        </main>
      </div>
    </div>
  );
}

export default App
