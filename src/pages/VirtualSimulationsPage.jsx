import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { CommunicationFlowVisualizer } from '../components/visualizers/CommunicationFlowVisualizer';
import { TopologyBuilder } from '../components/visualizers/TopologyBuilder';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { 
  Cpu, 
  Layers, 
  Activity, 
  Wifi, 
  Bluetooth, 
  ShieldCheck, 
  ArrowRight,
  Radio
} from 'lucide-react';

export const VirtualSimulationsPage = () => {
  const { openExperiment } = useLab();
  const [activeView, setActiveView] = useState('ALL'); // 'ALL', 'FLOW', 'BUILDER'

  const simulationCards = [
    { id: 1, title: 'WLAN Infrastructure Topology', category: 'WLAN', expNum: '01', desc: 'Clickable client, AP, router, and cloud WAN.' },
    { id: 2, title: 'AP & DHCP 4-Way DORA Handshake', category: 'DHCP', expNum: '02', desc: 'Configure SSID & IP pools; watch Discover/Offer/Request/ACK.' },
    { id: 3, title: 'Centralized WLC & CAPWAP Join', category: 'WLC', expNum: '03', desc: 'Deploy SSIDs on VLANs and register 3 Lightweight APs.' },
    { id: 6, title: 'CDMA Orthogonal Walsh Spreading', category: 'CDMA', expNum: '06', desc: 'Multiply user bits by Walsh chips and despread composite signal.' },
    { id: 7, title: 'Analog Modulation Waveforms', category: 'Modulation', expNum: '07', desc: 'Dynamic AM, FM, and PM envelope and frequency deviation.' },
    { id: 8, title: 'Digital Modulation & QPSK Constellation', category: 'Digital', expNum: '08', desc: 'BASK, BFSK, BPSK, and 4-quadrant QPSK I/Q constellation.' },
    { id: 10, title: 'OFDM Multi-Carrier Sinc Spectrum', category: 'OFDM', expNum: '10', desc: 'Orthogonal subcarrier zero-ICI overlapping frequency graphs.' },
    { id: 13, title: 'TCP vs UDP LAN Packet Transmission', category: 'Transport', expNum: '13', desc: 'Inspect 3-way handshake ACKs vs fire-and-forget datagrams.' },
    { id: 18, title: 'Peer-to-Peer Bluetooth RFCOMM Chat', category: 'Bluetooth', expNum: '18', desc: 'Simulated 2-way terminal chat between Laptop and Phone.' },
    { id: 19, title: 'Bluetooth OBEX Object Push File Transfer', category: 'Bluetooth', expNum: '19', desc: 'Simulated chunk-by-chunk file transmission and speed tracking.' }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            INTERACTIVE SANDBOX
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            Virtual Simulations Hub
          </h1>
        </div>
        <SimulationBadge />
      </div>

      {/* Universal Communication Flow Visualizer */}
      <CommunicationFlowVisualizer />

      {/* Topology Builder */}
      <TopologyBuilder />

      {/* Direct Simulators Launchpad Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
              DIRECT ACCESS
            </span>
            <h2 className="text-lg font-mono font-bold text-white">
              Launch Dedicated Experiment Simulators
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">10 Core Simulators</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {simulationCards.map((sim) => (
            <div
              key={sim.id}
              onClick={() => openExperiment(sim.id)}
              className="glass-card rounded-2xl p-5 border border-cyber-700/80 hover:border-cyan-500/50 cursor-pointer transition-all hover:scale-[1.01] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/80 font-bold">
                    EXP {sim.expNum}
                  </span>
                  <span className="text-slate-400">{sim.category}</span>
                </div>
                <h3 className="font-mono font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                  {sim.title}
                </h3>
                <p className="text-xs text-slate-400 font-tech mt-1.5 leading-relaxed">
                  {sim.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-cyber-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
                <span>Open Simulator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
