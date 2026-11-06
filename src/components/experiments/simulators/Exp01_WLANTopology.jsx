import React, { useState } from 'react';
import { 
  Laptop, 
  Radio, 
  Router, 
  Globe, 
  Wifi, 
  CheckCircle2, 
  Play, 
  Layers, 
  HelpCircle,
  Info
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp01_WLANTopology = ({ onSwitchTab, onMarkComplete, isCompleted }) => {
  const [selectedNode, setSelectedNode] = useState('ap');
  const [isSimulating, setIsSimulating] = useState(false);
  const [packetStep, setPacketStep] = useState(0);

  const nodes = {
    laptop: {
      name: "Wireless Client Station (STA)",
      ip: "192.168.1.105",
      mac: "00:1A:2B:3C:4D:5E",
      role: "Source / Destination Host",
      desc: "A portable device (e.g., student laptop, tablet, phone) equipped with an 802.11 wireless network interface card (NIC). It performs active/passive scanning, handles 802.11 authentication and 4-way WPA2 key handshake, and generates IP traffic."
    },
    signal: {
      name: "802.11 RF Wireless Wave Link",
      ip: "2.4 GHz ISM / 5 GHz UNII",
      mac: "SSID: Campus_Secure_WiFi",
      role: "Over-the-Air Medium",
      desc: "Half-duplex radio frequency propagation medium operating via CSMA/CA protocol to coordinate contention and avoid frame collisions over the airwaves."
    },
    ap: {
      name: "Wireless Access Point (AP)",
      ip: "192.168.1.1",
      mac: "00:14:22:01:23:45",
      role: "Layer 2 Wireless Bridge",
      desc: "Connects wireless stations to the wired infrastructure by translating 802.11 RF radio frames into 802.3 Ethernet frames. Transmits periodic beacon frames every 102.4 ms to announce the SSID."
    },
    router: {
      name: "Default Gateway / Router",
      ip: "192.168.1.254",
      mac: "00:0C:29:4F:88:11",
      role: "Layer 3 Routing & NAT Gateway",
      desc: "Provides Layer 3 IP routing, Network Address Translation (NAT) between private IP 192.168.1.0/24 and public WAN IP, and forwards packets toward upstream ISP gateways."
    },
    internet: {
      name: "Wide Area Network / Internet",
      ip: "8.8.8.8 / WAN Cloud",
      mac: "ISP Backbone",
      role: "Global Destination Network",
      desc: "Upstream public Internet network providing DNS resolution, cloud databases, web servers, and inter-network routing."
    }
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setPacketStep(1);
    const timer1 = setTimeout(() => setPacketStep(2), 1000);
    const timer2 = setTimeout(() => setPacketStep(3), 2000);
    const timer3 = setTimeout(() => setPacketStep(4), 3000);
    const timer4 = setTimeout(() => {
      setPacketStep(0);
      setIsSimulating(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Header & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-3">
          <button
            onClick={startSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'TRANSMITTING PACKET...' : 'START EXPERIMENT'}</span>
          </button>

          <button
            onClick={() => onSwitchTab('THEORY')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyber-850 hover:bg-cyber-800 text-slate-300 text-xs font-mono border border-cyber-700 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span>VIEW THEORY</span>
          </button>

          <button
            onClick={() => onSwitchTab('VIVA')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyber-850 hover:bg-cyber-800 text-slate-300 text-xs font-mono border border-cyber-700 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>VIEW VIVA</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <SimulationBadge />
          <button
            onClick={onMarkComplete}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50'
                : 'bg-cyber-800 text-slate-300 hover:text-white border border-cyber-600'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'COMPLETED' : 'MARK COMPLETE'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Topology Diagram */}
      <div className="p-6 rounded-2xl bg-cyber-950 border border-cyber-700/80 relative overflow-hidden">
        <div className="text-xs font-mono text-cyan-400 mb-6 flex items-center justify-between">
          <span>INTERACTIVE TOPOLOGY • CLICK ANY COMPONENT TO EXPLAIN</span>
          {isSimulating && (
            <span className="text-amber-400 animate-pulse font-bold">
              PACKET IN FLIGHT (HOP {packetStep}/4)
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center justify-center relative py-6">
          {/* Node 1: Laptop */}
          <div
            onClick={() => setSelectedNode('laptop')}
            className={`cursor-pointer p-4 rounded-xl flex flex-col items-center text-center transition-all ${
              selectedNode === 'laptop'
                ? 'bg-cyber-850 border-2 border-cyan-400 shadow-glow-cyan'
                : 'bg-cyber-900 border border-cyber-800 hover:border-cyan-500/40'
            } ${packetStep === 1 ? 'ring-2 ring-amber-400 scale-105' : ''}`}
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-2">
              <Laptop className="w-6 h-6" />
            </div>
            <span className="font-mono font-bold text-xs text-white">Laptop (STA)</span>
            <span className="text-[10px] font-mono text-cyan-400 mt-1">192.168.1.105</span>
          </div>

          {/* Node 2: Wireless Signal */}
          <div
            onClick={() => setSelectedNode('signal')}
            className={`cursor-pointer p-4 rounded-xl flex flex-col items-center text-center transition-all ${
              selectedNode === 'signal'
                ? 'bg-cyber-850 border-2 border-cyan-400 shadow-glow-cyan'
                : 'bg-cyber-900 border border-cyber-800 hover:border-cyan-500/40'
            } ${packetStep === 2 ? 'ring-2 ring-amber-400 scale-105' : ''}`}
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-2 relative">
              <Wifi className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
              </span>
            </div>
            <span className="font-mono font-bold text-xs text-white">RF Waves</span>
            <span className="text-[10px] font-mono text-teal-400 mt-1">CSMA/CA 2.4G</span>
          </div>

          {/* Node 3: Access Point */}
          <div
            onClick={() => setSelectedNode('ap')}
            className={`cursor-pointer p-4 rounded-xl flex flex-col items-center text-center transition-all ${
              selectedNode === 'ap'
                ? 'bg-cyber-850 border-2 border-cyan-400 shadow-glow-cyan'
                : 'bg-cyber-900 border border-cyber-800 hover:border-cyan-500/40'
            } ${packetStep === 3 ? 'ring-2 ring-amber-400 scale-105' : ''}`}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-2">
              <Radio className="w-6 h-6" />
            </div>
            <span className="font-mono font-bold text-xs text-white">Access Point</span>
            <span className="text-[10px] font-mono text-blue-400 mt-1">192.168.1.1</span>
          </div>

          {/* Node 4: Router */}
          <div
            onClick={() => setSelectedNode('router')}
            className={`cursor-pointer p-4 rounded-xl flex flex-col items-center text-center transition-all ${
              selectedNode === 'router'
                ? 'bg-cyber-850 border-2 border-cyan-400 shadow-glow-cyan'
                : 'bg-cyber-900 border border-cyber-800 hover:border-cyan-500/40'
            } ${packetStep === 4 ? 'ring-2 ring-amber-400 scale-105' : ''}`}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-2">
              <Router className="w-6 h-6" />
            </div>
            <span className="font-mono font-bold text-xs text-white">Gateway Router</span>
            <span className="text-[10px] font-mono text-purple-400 mt-1">192.168.1.254</span>
          </div>

          {/* Node 5: Internet */}
          <div
            onClick={() => setSelectedNode('internet')}
            className={`cursor-pointer p-4 rounded-xl flex flex-col items-center text-center transition-all ${
              selectedNode === 'internet'
                ? 'bg-cyber-850 border-2 border-cyan-400 shadow-glow-cyan'
                : 'bg-cyber-900 border border-cyber-800 hover:border-cyan-500/40'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-2">
              <Globe className="w-6 h-6" />
            </div>
            <span className="font-mono font-bold text-xs text-white">Internet WAN</span>
            <span className="text-[10px] font-mono text-emerald-400 mt-1">8.8.8.8</span>
          </div>
        </div>
      </div>

      {/* Component Explanation Box */}
      {selectedNode && nodes[selectedNode] && (
        <div className="p-5 rounded-xl bg-cyber-850 border border-cyber-700/80">
          <div className="flex items-center justify-between pb-3 border-b border-cyber-800">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <h4 className="font-mono font-bold text-sm text-white">
                {nodes[selectedNode].name}
              </h4>
            </div>
            <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyber-900 border border-cyber-700">
              {nodes[selectedNode].role}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-xs font-mono text-slate-300">
            <div>
              <span className="text-slate-400 block text-[11px]">IP / Frequency:</span>
              <span className="text-cyan-300 font-bold">{nodes[selectedNode].ip}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">MAC / Identifier:</span>
              <span className="text-teal-300">{nodes[selectedNode].mac}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 mt-3 font-tech leading-relaxed">
            {nodes[selectedNode].desc}
          </p>
        </div>
      )}
    </div>
  );
};
