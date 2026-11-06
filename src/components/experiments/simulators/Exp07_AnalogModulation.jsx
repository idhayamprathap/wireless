import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  HelpCircle,
  Info
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp07_AnalogModulation = ({ onMarkComplete, isCompleted }) => {
  const [activeTab, setActiveTab] = useState('AM'); // 'AM', 'FM', 'PM'
  const [messageAmp, setMessageAmp] = useState(1.0);
  const [messageFreq, setMessageFreq] = useState(2.0); // Hz
  const [carrierAmp, setCarrierAmp] = useState(2.0);
  const [carrierFreq, setCarrierFreq] = useState(24.0); // Hz
  const [modIndex, setModIndex] = useState(0.8); // mu for AM, beta for FM, kp for PM
  const [showComparison, setShowComparison] = useState(false);

  // Generate discrete points for waveforms (t = 0 to 1 sec)
  const numSamples = 400;
  const timeArray = useMemo(() => {
    return Array.from({ length: numSamples }, (_, i) => i / (numSamples - 1));
  }, []);

  // 1. Message signal: m(t) = Am * cos(2π * fm * t)
  const messageWave = useMemo(() => {
    return timeArray.map(t => messageAmp * Math.cos(2 * Math.PI * messageFreq * t));
  }, [timeArray, messageAmp, messageFreq]);

  // 2. Carrier signal: c(t) = Ac * cos(2π * fc * t)
  const carrierWave = useMemo(() => {
    return timeArray.map(t => carrierAmp * Math.cos(2 * Math.PI * carrierFreq * t));
  }, [timeArray, carrierAmp, carrierFreq]);

  // 3. Modulated signal:
  // AM: s_AM(t) = Ac * [1 + mu * cos(2π * fm * t)] * cos(2π * fc * t)
  // FM: s_FM(t) = Ac * cos(2π * fc * t + beta * sin(2π * fm * t))
  // PM: s_PM(t) = Ac * cos(2π * fc * t + kp * cos(2π * fm * t))
  const modulatedWave = useMemo(() => {
    return timeArray.map(t => {
      if (activeTab === 'AM') {
        const envelope = carrierAmp * (1 + modIndex * Math.cos(2 * Math.PI * messageFreq * t));
        return envelope * Math.cos(2 * Math.PI * carrierFreq * t);
      } else if (activeTab === 'FM') {
        const phase = 2 * Math.PI * carrierFreq * t + modIndex * Math.sin(2 * Math.PI * messageFreq * t);
        return carrierAmp * Math.cos(phase);
      } else {
        // PM
        const phase = 2 * Math.PI * carrierFreq * t + modIndex * Math.cos(2 * Math.PI * messageFreq * t);
        return carrierAmp * Math.cos(phase);
      }
    });
  }, [timeArray, activeTab, messageAmp, messageFreq, carrierAmp, carrierFreq, modIndex]);

  // SVG path helper
  const generateSvgPath = (wave, height = 70, scale = 15) => {
    const centerY = height / 2;
    return wave.map((val, idx) => {
      const x = (idx / (numSamples - 1)) * 600;
      const y = centerY - val * scale;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              ANALOG MODULATION LABORATORY (AM • FM • PM)
            </h3>
            <p className="text-xs text-slate-400">
              Interactive continuous-wave synthesis with dynamic envelope, frequency deviation, and phase shift.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Tabs & Comparison Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-xl bg-cyber-900 p-1 border border-cyber-700">
          {['AM', 'FM', 'PM'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'AM' && modIndex > 2) setModIndex(0.8);
                if (tab === 'FM') setModIndex(4.0);
                if (tab === 'PM') setModIndex(1.8);
              }}
              className={`px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'AM' ? 'AM (Amplitude)' : tab === 'FM' ? 'FM (Frequency)' : 'PM (Phase)'}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="px-4 py-2 rounded-xl bg-cyber-850 hover:bg-cyber-800 border border-cyber-700 text-cyan-300 font-mono text-xs transition-all"
        >
          {showComparison ? 'HIDE COMPARISON TABLE' : 'COMPARE AM vs FM vs PM'}
        </button>
      </div>

      {/* Dynamic Sliders Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80 text-xs font-mono">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Message Frequency (fm):</span>
            <span className="text-cyan-400 font-bold">{messageFreq} Hz</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={messageFreq}
            onChange={(e) => setMessageFreq(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Carrier Frequency (fc):</span>
            <span className="text-teal-400 font-bold">{carrierFreq} Hz</span>
          </div>
          <input
            type="range"
            min="16"
            max="40"
            step="2"
            value={carrierFreq}
            onChange={(e) => setCarrierFreq(parseFloat(e.target.value))}
            className="w-full accent-teal-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>
              {activeTab === 'AM' ? 'Modulation Index (μ):' : activeTab === 'FM' ? 'Modulation Index (β):' : 'Phase Deviation (kp):'}
            </span>
            <span className="text-amber-400 font-bold">
              {modIndex} {activeTab === 'AM' && modIndex > 1 ? '(Overmodulated!)' : ''}
            </span>
          </div>
          <input
            type="range"
            min={activeTab === 'AM' ? "0.2" : "0.5"}
            max={activeTab === 'AM' ? "1.8" : "8.0"}
            step={activeTab === 'AM' ? "0.1" : "0.5"}
            value={modIndex}
            onChange={(e) => setModIndex(parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>
      </div>

      {/* 3 Synchronized Real-Time Waveform Displays */}
      <div className="space-y-4">
        {/* Graph 1: Message Signal */}
        <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-700/80">
          <div className="flex items-center justify-between pb-1 border-b border-cyber-800 text-xs font-mono mb-2">
            <span className="text-cyan-400 font-bold">1. MESSAGE SIGNAL m(t) — Low Frequency Baseband</span>
            <span className="text-slate-400 text-[11px]">Am = {messageAmp}V, fm = {messageFreq}Hz</span>
          </div>
          <div className="w-full h-20 bg-cyber-900/50 rounded-lg overflow-hidden relative">
            <svg viewBox="0 0 600 70" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="35" x2="600" y2="35" stroke="#1c2d52" strokeWidth="1" strokeDasharray="4" />
              <path d={generateSvgPath(messageWave, 70, 25)} fill="none" stroke="#00f2fe" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* Graph 2: Carrier Signal */}
        <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-700/80">
          <div className="flex items-center justify-between pb-1 border-b border-cyber-800 text-xs font-mono mb-2">
            <span className="text-teal-400 font-bold">2. RF CARRIER SIGNAL c(t) — High Frequency Sinusoid</span>
            <span className="text-slate-400 text-[11px]">Ac = {carrierAmp}V, fc = {carrierFreq}Hz</span>
          </div>
          <div className="w-full h-20 bg-cyber-900/50 rounded-lg overflow-hidden relative">
            <svg viewBox="0 0 600 70" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="35" x2="600" y2="35" stroke="#1c2d52" strokeWidth="1" strokeDasharray="4" />
              <path d={generateSvgPath(carrierWave, 70, 10)} fill="none" stroke="#14b8a6" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Graph 3: Modulated Waveform */}
        <div className="p-4 rounded-xl bg-cyber-950 border-2 border-cyan-500/40 shadow-glow-cyan-sm">
          <div className="flex items-center justify-between pb-1 border-b border-cyber-800 text-xs font-mono mb-2">
            <span className="text-amber-400 font-bold">
              3. {activeTab} MODULATED SIGNAL s_{activeTab}(t)
            </span>
            <span className="text-slate-400 text-[11px]">
              {activeTab === 'AM' && 'Envelope follows message amplitude'}
              {activeTab === 'FM' && 'Frequency contracts/expands with message'}
              {activeTab === 'PM' && 'Phase advances/retards with message'}
            </span>
          </div>
          <div className="w-full h-24 bg-cyber-900/80 rounded-lg overflow-hidden relative">
            <svg viewBox="0 0 600 70" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="35" x2="600" y2="35" stroke="#1c2d52" strokeWidth="1" strokeDasharray="4" />
              <path d={generateSvgPath(modulatedWave, 70, activeTab === 'AM' ? 7 : 10)} fill="none" stroke="#f59e0b" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Comparison Drawer / Matrix */}
      {showComparison && (
        <div className="p-5 rounded-xl bg-cyber-850 border border-cyber-700/80 space-y-3 animate-in fade-in duration-200">
          <h4 className="font-mono font-bold text-sm text-cyan-300">
            COMPREHENSIVE COMPARISON: AM vs FM vs PM
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-cyber-700 text-slate-400 bg-cyber-900/60">
                  <th className="p-2.5">Parameter</th>
                  <th className="p-2.5 text-cyan-400">AM (Amplitude Mod)</th>
                  <th className="p-2.5 text-teal-400">FM (Frequency Mod)</th>
                  <th className="p-2.5 text-amber-400">PM (Phase Mod)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-800">
                <tr>
                  <td className="p-2.5 text-slate-400">Modulated Property</td>
                  <td className="p-2.5">Carrier Amplitude Ac</td>
                  <td className="p-2.5">Carrier Frequency fc</td>
                  <td className="p-2.5">Carrier Phase φ</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-400">Bandwidth (Carson)</td>
                  <td className="p-2.5">BW = 2 * fm</td>
                  <td className="p-2.5">BW ≈ 2(β + 1)fm</td>
                  <td className="p-2.5">BW ≈ 2(kp*Am + 1)fm</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-400">Noise Immunity</td>
                  <td className="p-2.5 text-rose-400">Poor (Susceptible to noise)</td>
                  <td className="p-2.5 text-emerald-400">Excellent (Clippers remove AM noise)</td>
                  <td className="p-2.5 text-teal-400">High (Equal to FM)</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-400">Transmitter Power</td>
                  <td className="p-2.5">Varies with modulating signal</td>
                  <td className="p-2.5 text-cyan-300">Constant envelope power</td>
                  <td className="p-2.5 text-cyan-300">Constant envelope power</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-400">Typical Applications</td>
                  <td className="p-2.5">AM radio, aircraft VHF comms</td>
                  <td className="p-2.5">FM stereo radio, analog TV sound</td>
                  <td className="p-2.5">Synthesized digital carriers, radar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
