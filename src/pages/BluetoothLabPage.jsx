import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { Exp16_BtDiscovery } from '../components/experiments/simulators/Exp16_BtDiscovery';
import { Exp17_BtDetails } from '../components/experiments/simulators/Exp17_BtDetails';
import { Exp18_BtChat } from '../components/experiments/simulators/Exp18_BtChat';
import { Exp19_BtFileTransfer } from '../components/experiments/simulators/Exp19_BtFileTransfer';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { Bluetooth, Radio, MessageSquare, FileText, Smartphone } from 'lucide-react';

export const BluetoothLabPage = () => {
  const { markComplete, completedExperiments } = useLab();
  const [activeTab, setActiveTab] = useState('DISCOVERY'); // 'DISCOVERY', 'DETAILS', 'CHAT', 'TRANSFER'

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
            SHORT RANGE WPAN SUITE
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            Bluetooth & BLE Laboratory
          </h1>
        </div>
        <SimulationBadge />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap rounded-xl bg-cyber-900 p-1 border border-cyber-700/80 w-fit gap-1">
        <button
          onClick={() => setActiveTab('DISCOVERY')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'DISCOVERY' ? 'bg-blue-600 text-white shadow-glow-cyan' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Device Discovery (Exp 16)</span>
        </button>

        <button
          onClick={() => setActiveTab('DETAILS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'DETAILS' ? 'bg-cyan-500 text-black shadow-glow-cyan' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>GATT & Device Details (Exp 17)</span>
        </button>

        <button
          onClick={() => setActiveTab('CHAT')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'CHAT' ? 'bg-teal-500 text-black shadow-glow-teal' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>RFCOMM Chat (Exp 18)</span>
        </button>

        <button
          onClick={() => setActiveTab('TRANSFER')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
            activeTab === 'TRANSFER' ? 'bg-amber-500 text-black shadow-glow-orange' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>OBEX File Transfer (Exp 19)</span>
        </button>
      </div>

      {/* Render Active Studio */}
      <div className="glass-card rounded-2xl p-6 border border-cyber-700/80 animate-in fade-in duration-150">
        {activeTab === 'DISCOVERY' && (
          <Exp16_BtDiscovery
            onMarkComplete={() => markComplete(16)}
            isCompleted={completedExperiments.includes(16)}
            onSelectDeviceForDetails={() => setActiveTab('DETAILS')}
          />
        )}
        {activeTab === 'DETAILS' && (
          <Exp17_BtDetails
            onMarkComplete={() => markComplete(17)}
            isCompleted={completedExperiments.includes(17)}
          />
        )}
        {activeTab === 'CHAT' && (
          <Exp18_BtChat
            onMarkComplete={() => markComplete(18)}
            isCompleted={completedExperiments.includes(18)}
          />
        )}
        {activeTab === 'TRANSFER' && (
          <Exp19_BtFileTransfer
            onMarkComplete={() => markComplete(19)}
            isCompleted={completedExperiments.includes(19)}
          />
        )}
      </div>
    </div>
  );
};
