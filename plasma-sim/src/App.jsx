import { useState } from 'react'
import PlasmaSimulatorI from './PlasmaSimulatorI'
import PlasmaSimulatorII from './PlasmaSimulatorII'
import PlasmaSimulatorIII from './PlasmaSimulatorIII'
import './App.css'

function App() {
  const [selectedSimulator, setSelectedSimulator] = useState('sim3');

  const simulators = [
    {
      id: 'sim1',
      name: '플라즈마 시뮬레이터 I',
      description: '기초 플라즈마 물리 원리',
      icon: '🔬',
      color: 'blue',
      component: PlasmaSimulatorI
    },
    {
      id: 'sim2',
      name: '플라즈마 시뮬레이터 II',
      description: '공정 응용 및 실무',
      icon: '🏭',
      color: 'purple',
      component: PlasmaSimulatorII
    },
    {
      id: 'sim3',
      name: '플라즈마 시뮬레이터 III',
      description: 'DC/RF 플라즈마 심화',
      icon: '⚡',
      color: 'green',
      component: PlasmaSimulatorIII
    }
  ];

  const SelectedComponent = simulators.find(s => s.id === selectedSimulator)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">플라즈마 전문 교육 시뮬레이터</h1>
              <p className="text-indigo-200 text-sm mt-1">Plasma Professional Education Simulator</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-indigo-200">확장 가능한 구조</div>
              <div className="text-xs text-indigo-300">Modular Architecture</div>
            </div>
          </div>

          {/* Simulator Selection Tabs */}
          <div className="flex gap-3 mt-4">
            {simulators.map((sim) => (
              <button
                key={sim.id}
                onClick={() => setSelectedSimulator(sim.id)}
                className={`
                  flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform
                  ${selectedSimulator === sim.id
                    ? 'bg-white text-indigo-900 shadow-lg scale-105 border-2 border-white'
                    : 'bg-white/10 text-white hover:bg-white/20 border-2 border-transparent'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{sim.icon}</span>
                  <span className="text-sm font-bold">{sim.name}</span>
                  <span className="text-xs opacity-80">{sim.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Simulator Content */}
      <div className="w-full">
        {SelectedComponent && <SelectedComponent />}
      </div>

      {/* Footer Info */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            📁 구조: src/PlasmaSimulatorI.jsx | src/PlasmaSimulatorII.jsx | src/PlasmaSimulatorIII.jsx
          </p>
          <p className="text-xs text-gray-500 mt-1">
            각 시뮬레이터는 독립적인 파일로 관리되며 확장 가능합니다
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App
