import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Info,
  Clock
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp09_PulseModulation = ({ onMarkComplete, isCompleted }) => {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'PAM', 'PWM', 'PPM'
  const [messageFreq, setMessageFreq] = useState(1.5);
  const [pulseCount, setPulseCount] = useState(16); // Number of sampling pulses

  // Message signal samples
  const samples = useMemo(() => {
    return Array.from({ length: pulseCount }, (_, i) => {
      const t = i / pulseCount;
      const val = Math.sin(2 * Math.PI * messageFreq * t); // -1 to +1
      const normalized = (val + 1) / 2; // 0 to 1
      return { t, val, normalized };
    });
  }, [pulseCount, messageFreq]);

  // Continuous message waveform for background display
  const continuousPoints = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => {
      const t = i / 199;
      return Math.sin(2 * Math.PI * messageFreq * t);
    });
  }, [messageFreq]);

  const generateContinuousSvg = () => {
    return continuousPoints.map((val, idx) => {
      const x = (idx / 199) * 600;
      const y = 35 - val * 25;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              PULSE MODULATION LABORATORY (PAM • PWM • PPM)
            </h3>
            <p className="text-xs text-slate-400">
              Sample-and-hold discretization, pulse width duty cycling, and pulse position time deviation.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Tabs & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
        <div className="flex rounded-xl bg-cyber-850 p-1 border border-cyber-700">
          {['ALL', 'PAM', 'PWM', 'PPM'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-teal-500 text-slate-950 shadow-glow-teal'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'ALL' ? 'Compare All 3' : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Message Freq:</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.5"
              value={messageFreq}
              onChange={(e) => setMessageFreq(parseFloat(e.target.value))}
              className="accent-teal-400 cursor-pointer w-24"
            />
            <span className="text-teal-300 font-bold">{messageFreq} Hz</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sampling Rate:</span>
            <input
              type="range"
              min="12"
              max="24"
              step="4"
              value={pulseCount}
              onChange={(e) => setPulseCount(parseInt(e.target.value, 10))}
              className="accent-cyan-400 cursor-pointer w-24"
            />
            <span className="text-cyan-300 font-bold">{pulseCount} Pulses</span>
          </div>
        </div>
      </div>

      {/* Track 1: Analog Modulating Message Wave */}
      <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-700/80">
        <div className="flex items-center justify-between pb-1 border-b border-cyber-800 text-xs font-mono mb-2">
          <span className="text-cyan-400 font-bold">1. CONTINUOUS ANALOG MESSAGE m(t)</span>
          <span className="text-slate-400 text-[11px]">Sine Wave (fm = {messageFreq} Hz)</span>
        </div>
        <div className="w-full h-20 bg-cyber-900/50 rounded-lg overflow-hidden relative">
          <svg viewBox="0 0 600 70" preserveAspectRatio="none" className="w-full h-full">
            <line x1="0" y1="35" x2="600" y2="35" stroke="#1c2d52" strokeWidth="1" strokeDasharray="4" />
            <path d={generateContinuousSvg()} fill="none" stroke="#00f2fe" strokeWidth="2.5" />
          </svg>
        </div>
      </div>

      {/* Waveform Displays: PAM, PWM, PPM */}
      <div className="space-y-4">
        {/* PAM Display */}
        {(activeTab === 'ALL' || activeTab === 'PAM') && (
          <div className="p-4 rounded-xl bg-cyber-950 border border-cyan-500/30">
            <div className="flex items-center justify-between pb-1 border-b border-cyber-800 text-xs font-mono mb-2">
              <span className="text-cyan-300 font-bold">
                2. PULSE AMPLITUDE MODULATION (PAM) — Height varies with m(t)
              </span>
              <span className="text-slate-400 text-[11px]">Fixed Width • Fixed Position</span>
            </div>
            <div className="w-full h-24 bg-cyber-900/70 rounded-lg p-2 flex items-end justify-between gap-1">
              {samples.map((s, idx) => {
                const heightPct = Math.max(12, Math.round(s.normalized * 85));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-3/5 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-t transition-all duration-200"
                    ></div>
                    <span className="text-[8px] font-mono text-slate-500 mt-1">P{idx}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PWM Display */}
        {(activeTab === 'ALL' || activeTab === 'PWM') && (
          <div className="p-4 rounded-xl bg-cyber-950 border border-teal-500/30">
            <div className="flex items-center justify-between pb-1 border-b border-cyber-800 text-xs font-mono mb-2">
              <span className="text-teal-300 font-bold">
                3. PULSE WIDTH MODULATION (PWM) — Pulse duration / duty cycle varies with m(t)
              </span>
              <span className="text-slate-400 text-[11px]">Fixed Amplitude • Fixed Period</span>
            </div>
            <div className="w-full h-24 bg-cyber-900/70 rounded-lg p-2 flex items-end justify-between gap-1">
              {samples.map((s, idx) => {
                const widthPct = Math.max(15, Math.round(s.normalized * 85));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-start justify-end h-full px-0.5">
                    <div
                      style={{ width: `${widthPct}%`, height: '70%' }}
                      className="bg-gradient-to-t from-teal-600 to-teal-300 rounded-t transition-all duration-200"
                    ></div>
                    <span className="text-[8px] font-mono text-slate-500 mt-1">P{idx}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PPM Display */}
        {(activeTab === 'ALL' || activeTab === 'PPM') && (
          <div className="p-4 rounded-xl bg-cyber-950 border border-amber-500/30">
            <div className="flex items-center justify-between pb-1 border-b border-cyber-800 text-xs font-mono mb-2">
              <span className="text-amber-300 font-bold">
                4. PULSE POSITION MODULATION (PPM) — Arrival timestamp varies with m(t)
              </span>
              <span className="text-slate-400 text-[11px]">Fixed Amplitude • Fixed Width</span>
            </div>
            <div className="w-full h-24 bg-cyber-900/70 rounded-lg p-2 flex items-end justify-between gap-1">
              {samples.map((s, idx) => {
                // Offset left in cell: 0% to 65%
                const offsetPct = Math.round(s.normalized * 60);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-start justify-end h-full px-0.5 relative border-r border-cyber-800">
                    <div
                      style={{ marginLeft: `${offsetPct}%`, width: '25%', height: '70%' }}
                      className="bg-gradient-to-t from-amber-600 to-amber-300 rounded-t transition-all duration-200"
                    ></div>
                    <span className="text-[8px] font-mono text-slate-500 mt-1">P{idx}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Visual Explanation Card */}
      <div className="p-4 rounded-xl bg-cyber-850 border border-cyber-700/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div className="text-xs font-tech text-slate-300 space-y-1">
          <p className="font-bold text-white font-mono">Core Differences:</p>
          <p><strong className="text-cyan-300 font-mono">PAM:</strong> Modulates pulse amplitude. Vulnerable to amplitude noise like continuous AM.</p>
          <p><strong className="text-teal-300 font-mono">PWM:</strong> Modulates pulse duty cycle. Immune to amplitude noise; pulse edges carry information.</p>
          <p><strong className="text-amber-300 font-mono">PPM:</strong> Modulates pulse transmission time delay. High noise immunity with low average transmitter power.</p>
        </div>
      </div>
    </div>
  );
};
