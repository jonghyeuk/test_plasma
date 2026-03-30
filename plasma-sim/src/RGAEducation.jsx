import { useState } from 'react';

const tabs = [
  { id: 'education', name: 'RGA 교육', icon: '📘' },
  { id: 'principle', name: '동작 원리', icon: '⚙️' },
  { id: 'quadrupole', name: 'Quadrupole 인터랙티브', icon: '🔬' },
];

export default function RGAEducation() {
  const [activeTab, setActiveTab] = useState('education');

  const srcMap = {
    education: '/rgaeducation.html',
    principle: '/rgaprinciple.html',
    quadrupole: '/rga_quadrupole_interactive_v2.html',
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Tab Navigation - same style as OES / Impedance Probe */}
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

      {/* Content - iframe */}
      <iframe
        key={activeTab}
        src={srcMap[activeTab]}
        title={activeTab}
        style={{ flex: 1, width: '100%', border: 'none', minHeight: 'calc(100vh - 56px)' }}
      />
    </div>
  );
}
