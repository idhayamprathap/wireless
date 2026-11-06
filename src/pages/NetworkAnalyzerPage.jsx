import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { Exp11_WifiScanner } from '../components/experiments/simulators/Exp11_WifiScanner';
import { Exp12_WifiAnalyzer } from '../components/experiments/simulators/Exp12_WifiAnalyzer';
import { Exp14_BeaconAnalyzer } from '../components/experiments/simulators/Exp14_BeaconAnalyzer';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { Wifi, Activity, FileText } from 'lucide-react';

export const NetworkAnalyzerPage = () => {
  const { markComplete, completedExperiments } = useLab();
  const [activeTab, setActiveTab] = useState('SCANNER'); // 'SCANNER', 'SPECTRUM', 'BEACONS'

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            RF TRAFFIC & SPECTRUM SUITE
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            Network Analyzer Studio
          </h1>
        </div>
        <SimulationBadge />
      </div>

      {/* Tabs Bar */}
      <div className="flex rounded-xl bg-cyber-900 p-1 border border-cyber-700/80 w-fit">
        <button
          onClick={() => setActiveTab('SCANNER')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'SCANNER' ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wifi className="w-4 h-4" />
          <span>Wi-Fi Network Scanner (Exp 11)</span>
        </button>

        <button
          onClick={() => setActiveTab('SPECTRUM')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'SPECTRUM' ? 'bg-teal-500 text-slate-950 shadow-glow-teal' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Channel Overlap & Interference (Exp 12)</span>
        </button>

        <button
          onClick={() => setActiveTab('BEACONS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'BEACONS' ? 'bg-amber-500 text-slate-950 shadow-glow-orange' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Beacon Frame Dissector (Exp 14)</span>
        </button>
      </div>

      {/* Render Active Studio Tool */}
      <div className="glass-card rounded-2xl p-6 border border-cyber-700/80 animate-in fade-in duration-150">
        {activeTab === 'SCANNER' && (
          <Exp11_WifiScanner
            onMarkComplete={() => markComplete(11)}
            isCompleted={completedExperiments.includes(11)}
          />
        )}
        {activeTab === 'SPECTRUM' && (
          <Exp12_WifiAnalyzer
            onMarkComplete={() => markComplete(12)}
            isCompleted={completedExperiments.includes(12)}
          />
        )}
        {activeTab === 'BEACONS' && (
          <Exp14_BeaconAnalyzer
            onMarkComplete={() => markComplete(14)}
            isCompleted={completedExperiments.includes(14)}
          />
        )}
      </div>
    </div>
  );
};
