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
    <div className="flex h-screen bg-gray-50 relative">
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
        bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900
        text-white shadow-2xl flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/20">
          <h1 className="text-2xl font-bold mb-2">진단기술</h1>
          <h2 className="text-xl font-semibold mb-3">실습센터</h2>
          <p className="text-sm text-indigo-200">Plasma Diagnostic Training Center</p>
        </div>

        {/* Simulator Navigation */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          <div className="text-xs font-bold text-indigo-300 mb-3 px-2">
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
                  ? 'bg-white text-indigo-900 shadow-lg scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20 hover:scale-102'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{sim.icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-sm mb-1">{sim.name}</div>
                  <div className={`text-xs ${selectedSimulator === sim.id ? 'text-indigo-600' : 'text-white/80'}`}>
                    {sim.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/20">
          <div className="text-xs text-indigo-300">
            <div className="font-semibold mb-1">확장 가능한 구조</div>
            <div className="text-indigo-400">각 시뮬레이터는 독립적으로 관리됩니다</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-md border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 pl-12 lg:pl-0">
            {simulators.find(s => s.id === selectedSimulator)?.icon}{' '}
            {simulators.find(s => s.id === selectedSimulator)?.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 pl-12 lg:pl-0">
            {simulators.find(s => s.id === selectedSimulator)?.description}
          </p>
        </header>

        {/* Simulator Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {SelectedComponent && <SelectedComponent />}
        </main>
      </div>
    </div>
  );
}

export default App
