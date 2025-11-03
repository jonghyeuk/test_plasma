import { useState } from 'react'
import PlasmaSimulatorI from './PlasmaSimulatorI'
import PlasmaSimulatorII from './PlasmaSimulatorII'
import './App.css'

function App() {
  const [selectedSimulator, setSelectedSimulator] = useState('simulator2');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold">반도체 공정 플라즈마 시뮬레이터</h1>
              <p className="text-sm text-purple-100">Semiconductor Process Plasma Simulator</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedSimulator('simulator1')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedSimulator === 'simulator1'
                    ? 'bg-white text-purple-600 shadow-lg scale-105'
                    : 'bg-purple-500 text-white hover:bg-purple-400'
                }`}
              >
                시뮬레이터 I
              </button>
              <button
                onClick={() => setSelectedSimulator('simulator2')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedSimulator === 'simulator2'
                    ? 'bg-white text-blue-600 shadow-lg scale-105'
                    : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
              >
                시뮬레이터 II
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {selectedSimulator === 'simulator1' && <PlasmaSimulatorI />}
        {selectedSimulator === 'simulator2' && <PlasmaSimulatorII />}
      </div>
    </div>
  )
}

export default App
