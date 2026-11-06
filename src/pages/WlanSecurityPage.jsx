import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { Exp05_RadiusAuth } from '../components/experiments/simulators/Exp05_RadiusAuth';
import { Exp15_SecurityReport } from '../components/experiments/simulators/Exp15_SecurityReport';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { ShieldCheck, FileText, Key } from 'lucide-react';

export const WlanSecurityPage = () => {
  const { markComplete, completedExperiments } = useLab();
  const [activeTab, setActiveTab] = useState('RADIUS'); // 'RADIUS', 'REPORT'

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            ENTERPRISE WIRELESS SECURITY SUITE
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            WLAN Security & Audit Center
          </h1>
        </div>
        <SimulationBadge />
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-cyber-900 p-1 border border-cyber-700/80 w-fit">
        <button
          onClick={() => setActiveTab('RADIUS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'RADIUS' ? 'bg-amber-500 text-slate-950 shadow-glow-orange' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>WLC + RADIUS 802.1X Auth (Exp 05)</span>
        </button>

        <button
          onClick={() => setActiveTab('REPORT')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'REPORT' ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Security Audit Report Generator (Exp 15)</span>
        </button>
      </div>

      {/* Render Active Studio */}
      <div className="glass-card rounded-2xl p-6 border border-cyber-700/80 animate-in fade-in duration-150">
        {activeTab === 'RADIUS' && (
          <Exp05_RadiusAuth
            onMarkComplete={() => markComplete(5)}
            isCompleted={completedExperiments.includes(5)}
          />
        )}
        {activeTab === 'REPORT' && (
          <Exp15_SecurityReport
            onMarkComplete={() => markComplete(15)}
            isCompleted={completedExperiments.includes(15)}
          />
        )}
      </div>
    </div>
  );
};
