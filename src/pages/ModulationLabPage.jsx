import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { Exp07_AnalogModulation } from '../components/experiments/simulators/Exp07_AnalogModulation';
import { Exp08_DigitalModulation } from '../components/experiments/simulators/Exp08_DigitalModulation';
import { Exp09_PulseModulation } from '../components/experiments/simulators/Exp09_PulseModulation';
import { Exp10_OfdmSimulator } from '../components/experiments/simulators/Exp10_OfdmSimulator';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { Activity, Binary, Clock, Cpu } from 'lucide-react';

export const ModulationLabPage = () => {
  const { markComplete, completedExperiments } = useLab();
  const [activeTab, setActiveTab] = useState('ANALOG'); // 'ANALOG', 'DIGITAL', 'PULSE', 'OFDM'

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            SIGNAL TRANSFORMATION SUITE
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            Modulation Laboratory
          </h1>
        </div>
        <SimulationBadge />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap rounded-xl bg-cyber-900 p-1 border border-cyber-700/80 w-fit gap-1">
        <button
          onClick={() => setActiveTab('ANALOG')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'ANALOG' ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Analog: AM • FM • PM (Exp 07)</span>
        </button>

        <button
          onClick={() => setActiveTab('DIGITAL')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'DIGITAL' ? 'bg-teal-500 text-slate-950 shadow-glow-teal' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Binary className="w-4 h-4" />
          <span>Digital: BASK • BFSK • BPSK • QPSK (Exp 08)</span>
        </button>

        <button
          onClick={() => setActiveTab('PULSE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'PULSE' ? 'bg-amber-500 text-slate-950 shadow-glow-orange' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pulse: PAM • PWM • PPM (Exp 09)</span>
        </button>

        <button
          onClick={() => setActiveTab('OFDM')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'OFDM' ? 'bg-purple-500 text-white shadow-glow-cyan' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Multi-Carrier: OFDM (Exp 10)</span>
        </button>
      </div>

      {/* Render Active Studio */}
      <div className="glass-card rounded-2xl p-6 border border-cyber-700/80 animate-in fade-in duration-150">
        {activeTab === 'ANALOG' && (
          <Exp07_AnalogModulation
            onMarkComplete={() => markComplete(7)}
            isCompleted={completedExperiments.includes(7)}
          />
        )}
        {activeTab === 'DIGITAL' && (
          <Exp08_DigitalModulation
            onMarkComplete={() => markComplete(8)}
            isCompleted={completedExperiments.includes(8)}
          />
        )}
        {activeTab === 'PULSE' && (
          <Exp09_PulseModulation
            onMarkComplete={() => markComplete(9)}
            isCompleted={completedExperiments.includes(9)}
          />
        )}
        {activeTab === 'OFDM' && (
          <Exp10_OfdmSimulator
            onMarkComplete={() => markComplete(10)}
            isCompleted={completedExperiments.includes(10)}
          />
        )}
      </div>
    </div>
  );
};
