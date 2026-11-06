import React, { useState } from 'react';
import { 
  Wifi, 
  Layers, 
  Activity, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders,
  Compass
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp12_WifiAnalyzer = ({ onMarkComplete, isCompleted }) => {
  const [band, setBand] = useState('2.4'); // '2.4' or '5'
  const [selectedChannel, setSelectedChannel] = useState(6);

  // 2.4 GHz active simulated networks with center channel and RSSI
  const networks24 = [
    { name: 'Guest_WiFi', channel: 1, freq: 2412, rssi: -78, width: 22, color: '#f59e0b' },
    { name: 'College_WiFi', channel: 6, freq: 2437, rssi: -52, width: 22, color: '#00f2fe' },
    { name: 'Student_Network', channel: 11, freq: 2462, rssi: -64, width: 22, color: '#10b981' },
    { name: 'Interfering_AP', channel: 4, freq: 2427, rssi: -82, width: 22, color: '#f43f5e' }
  ];

  // 5 GHz active simulated networks
  const networks5 = [
    { name: 'Lab_WiFi', channel: 36, freq: 5180, rssi: -45, width: 20, color: '#00f2fe' },
    { name: 'Staff_5G', channel: 44, freq: 5220, rssi: -58, width: 20, color: '#14b8a6' },
    { name: 'IoT_Lab', channel: 149, freq: 5745, rssi: -70, width: 20, color: '#8b5cf6' }
  ];

  const currentNetworks = band === '2.4' ? networks24 : networks5;

  // Calculate interference for selected channel:
  // For 2.4 GHz: channels within +/- 4 cause overlap!
  const calculateInterference = (ch) => {
    if (band === '5') return 12; // 5 GHz channels are non-overlapping by definition
    let overlapScore = 0;
    networks24.forEach(net => {
      const dist = Math.abs(net.channel - ch);
      if (dist === 0) {
        overlapScore += 35; // Co-channel contention
      } else if (dist < 4) {
        overlapScore += (4 - dist) * 20; // Adjacent interference
      }
    });
    return Math.min(100, overlapScore);
  };

  const interferencePercent = calculateInterference(selectedChannel);
  const selectedNet = currentNetworks.find(n => n.channel === selectedChannel);
  const currentRssi = selectedNet ? selectedNet.rssi : -85;

  const handleSelectChannel = (ch) => {
    setSelectedChannel(ch);
    if (!isCompleted) onMarkComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              WI-FI SPECTRUM & CHANNEL INTERFERENCE ANALYZER
            </h3>
            <p className="text-xs text-slate-400">
              Evaluate RF channel density, adjacent channel bleeding, and co-channel contention.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Band Selector & Channel Quick Jumper */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 font-bold">Select Band:</span>
          <div className="flex rounded-xl bg-cyber-850 p-1 border border-cyber-700">
            <button
              onClick={() => { setBand('2.4'); setSelectedChannel(6); }}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                band === '2.4' ? 'bg-cyan-500 text-black shadow-glow-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              2.4 GHz Band (Ch 1 - 13)
            </button>
            <button
              onClick={() => { setBand('5'); setSelectedChannel(36); }}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                band === '5' ? 'bg-teal-500 text-black shadow-glow-teal' : 'text-slate-400 hover:text-white'
              }`}
            >
              5 GHz Band (UNII 1-3)
            </button>
          </div>
        </div>

        {/* Quick select non-overlapping channels */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Channels:</span>
          {band === '2.4' ? (
            [1, 4, 6, 11].map(ch => (
              <button
                key={ch}
                onClick={() => handleSelectChannel(ch)}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  selectedChannel === ch
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold'
                    : 'bg-cyber-850 text-slate-400 border-cyber-700 hover:text-white'
                }`}
              >
                Ch {ch}
              </button>
            ))
          ) : (
            [36, 40, 44, 149].map(ch => (
              <button
                key={ch}
                onClick={() => handleSelectChannel(ch)}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  selectedChannel === ch
                    ? 'bg-teal-950 text-teal-300 border-teal-500 font-bold'
                    : 'bg-cyber-850 text-slate-400 border-cyber-700 hover:text-white'
                }`}
              >
                Ch {ch}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Interactive Channel Spectrum Graph */}
      <div className="p-5 rounded-xl bg-cyber-950 border-2 border-cyber-700/80">
        <div className="flex items-center justify-between pb-3 border-b border-cyber-800 text-xs font-mono mb-4">
          <span className="text-cyan-400 font-bold">
            RF CHANNEL OVERLAP SPECTRUM ({band} GHz) — Parabolic Channel Masks
          </span>
          <span className="text-slate-400 text-[11px]">
            DEMO / SIMULATION
          </span>
        </div>

        {/* SVG Spectrum Diagram */}
        <div className="w-full h-52 bg-cyber-900/60 rounded-xl relative p-2 overflow-hidden">
          <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="w-full h-full">
            {/* Horizontal baseline */}
            <line x1="0" y1="130" x2="600" y2="130" stroke="#1c2d52" strokeWidth="2" />

            {/* Channel markers along x-axis */}
            {band === '2.4' ? (
              Array.from({ length: 14 }, (_, i) => i + 1).map(ch => {
                const x = 30 + (ch - 1) * 40;
                return (
                  <g key={ch}>
                    <line x1={x} y1="125" x2={x} y2="135" stroke="#2b4478" strokeWidth="1.5" />
                    <text x={x - 6} y="150" fill={ch === selectedChannel ? '#00f2fe' : '#64748b'} fontSize="10" fontFamily="monospace" fontWeight={ch === selectedChannel ? 'bold' : 'normal'}>
                      {ch}
                    </text>
                  </g>
                );
              })
            ) : (
              [36, 40, 44, 48, 52, 149, 153, 157, 161].map((ch, idx) => {
                const x = 50 + idx * 55;
                return (
                  <g key={ch}>
                    <line x1={x} y1="125" x2={x} y2="135" stroke="#2b4478" strokeWidth="1.5" />
                    <text x={x - 8} y="150" fill={ch === selectedChannel ? '#14b8a6' : '#64748b'} fontSize="10" fontFamily="monospace" fontWeight={ch === selectedChannel ? 'bold' : 'normal'}>
                      {ch}
                    </text>
                  </g>
                );
              })
            )}

            {/* Render Parabolic Bell Curves for Networks */}
            {currentNetworks.map((net) => {
              let centerX = 0;
              let curveWidth = 70;
              if (band === '2.4') {
                centerX = 30 + (net.channel - 1) * 40;
              } else {
                const idx = [36, 40, 44, 48, 52, 149, 153, 157, 161].indexOf(net.channel);
                centerX = 50 + Math.max(0, idx) * 55;
                curveWidth = 45;
              }

              const peakHeight = Math.max(30, 130 - (Math.abs(net.rssi) - 30) * 1.6);
              const pathD = `M ${centerX - curveWidth} 130 Q ${centerX} ${peakHeight} ${centerX + curveWidth} 130 Z`;
              const isSelected = net.channel === selectedChannel;

              return (
                <g key={net.name} onClick={() => handleSelectChannel(net.channel)} className="cursor-pointer">
                  <path
                    d={pathD}
                    fill={net.color}
                    fillOpacity={isSelected ? "0.35" : "0.15"}
                    stroke={net.color}
                    strokeWidth={isSelected ? "3" : "1.5"}
                    strokeDasharray={net.name === 'Interfering_AP' ? '4' : '0'}
                  />
                  <text
                    x={centerX - 24}
                    y={peakHeight - 8}
                    fill={net.color}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {net.name} ({net.rssi}dBm)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Signal Strength & Interference Dual Meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Signal Strength Meter */}
        <div className="p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
          <div className="flex items-center justify-between pb-2 border-b border-cyber-800 text-xs font-mono mb-3">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Radio className="w-4 h-4" />
              SIGNAL STRENGTH METER (CHANNEL {selectedChannel})
            </span>
            <span className="text-white font-bold">{currentRssi} dBm</span>
          </div>

          <div className="w-full bg-cyber-950 h-4 rounded-full p-0.5 border border-cyber-800 mb-2">
            <div
              style={{ width: `${Math.max(10, Math.min(100, (currentRssi + 100) * 1.4))}%` }}
              className={`h-full rounded-full transition-all duration-300 ${
                currentRssi >= -60 ? 'bg-gradient-to-r from-teal-500 to-emerald-400' :
                currentRssi >= -75 ? 'bg-gradient-to-r from-teal-500 to-amber-400' :
                'bg-gradient-to-r from-amber-500 to-rose-500'
              }`}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>-100 dBm (Dead)</span>
            <span>-70 dBm (Fair)</span>
            <span>-50 dBm (Strong)</span>
            <span>-30 dBm (Max)</span>
          </div>
        </div>

        {/* Interference Meter */}
        <div className="p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
          <div className="flex items-center justify-between pb-2 border-b border-cyber-800 text-xs font-mono mb-3">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              INTERFERENCE METER (CCI / ACI)
            </span>
            <span className={`font-bold ${interferencePercent > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {interferencePercent}% {interferencePercent > 50 ? '(High)' : '(Low)'}
            </span>
          </div>

          <div className="w-full bg-cyber-950 h-4 rounded-full p-0.5 border border-cyber-800 mb-2">
            <div
              style={{ width: `${interferencePercent}%` }}
              className={`h-full rounded-full transition-all duration-300 ${
                interferencePercent > 60 ? 'bg-rose-500 shadow-glow-orange-sm' :
                interferencePercent > 30 ? 'bg-amber-400' :
                'bg-emerald-400'
              }`}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0% Clean</span>
            <span>35% Moderate</span>
            <span>70% Congested</span>
            <span>100% Saturated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
