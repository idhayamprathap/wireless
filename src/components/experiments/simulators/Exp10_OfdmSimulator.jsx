import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Info, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp10_OfdmSimulator = ({ onMarkComplete, isCompleted }) => {
  const [subcarrierCount, setSubcarrierCount] = useState(8); // 4, 8, 16, 32
  const [activeStep, setActiveStep] = useState(2);

  // Generate overlapping orthogonal sinc spectra for subcarrierCount carriers
  // sinc(x) = sin(π*x) / (π*x)
  // Subcarrier k center is at frequency k. At frequency k, sinc(x-m) = 0 for all m != k!
  const freqPoints = 300;
  const spectra = useMemo(() => {
    const fMin = -1;
    const fMax = subcarrierCount;
    const fRange = fMax - fMin;

    return Array.from({ length: subcarrierCount }, (_, k) => {
      const pathPoints = [];
      for (let i = 0; i < freqPoints; i++) {
        const f = fMin + (i / (freqPoints - 1)) * fRange;
        const x = f - k; // distance from center frequency of subcarrier k
        let sincVal = 1;
        if (Math.abs(x) > 0.0001) {
          sincVal = Math.sin(Math.PI * x) / (Math.PI * x);
        }
        pathPoints.push({ f, amp: Math.max(-0.25, sincVal) });
      }
      return { k, pathPoints };
    });
  }, [subcarrierCount]);

  const colors = [
    '#00f2fe', '#14b8a6', '#3b82f6', '#8b5cf6', 
    '#f59e0b', '#10b981', '#f43f5e', '#a855f7'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              ORTHOGONAL FREQUENCY DIVISION MULTIPLEXING (OFDM)
            </h3>
            <p className="text-xs text-slate-400">
              Multi-carrier modulation, subcarrier orthogonality, and spectral overlap analysis.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Architecture Pipeline Flow Diagram */}
      <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-700/80">
        <span className="text-xs font-mono text-cyan-400 font-bold block mb-3">
          OFDM TRANSMITTER & RECEIVER BLOCK CHAIN:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-cyber-900 border border-cyber-800">
            <span className="text-[10px] text-slate-500 block">STEP 1</span>
            <span className="text-slate-200 font-bold">Serial Bits</span>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800 text-cyan-300">
            <span className="text-[10px] text-cyan-500 block">STEP 2</span>
            <span className="font-bold">Serial-to-Parallel</span>
          </div>
          <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-800 text-teal-300">
            <span className="text-[10px] text-teal-500 block">STEP 3</span>
            <span className="font-bold">{subcarrierCount} Subcarriers</span>
          </div>
          <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-800 text-purple-300">
            <span className="text-[10px] text-purple-500 block">STEP 4</span>
            <span className="font-bold">IFFT Summation</span>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300">
            <span className="text-[10px] text-amber-500 block">STEP 5</span>
            <span className="font-bold">Cyclic Prefix</span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300">
            <span className="text-[10px] text-emerald-500 block">STEP 6</span>
            <span className="font-bold">Parallel-to-Serial</span>
          </div>
        </div>
      </div>

      {/* Interactive Subcarrier Slider */}
      <div className="p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <label className="text-xs font-mono text-cyan-400 font-bold block mb-1">
            Number of Orthogonal Subcarriers (N):
          </label>
          <div className="flex items-center gap-3">
            {[4, 8, 16, 32].map((num) => (
              <button
                key={num}
                onClick={() => setSubcarrierCount(num)}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all ${
                  subcarrierCount === num
                    ? 'bg-cyan-500 text-black border-white shadow-glow-cyan'
                    : 'bg-cyber-850 text-slate-400 border-cyber-700 hover:text-white'
                }`}
              >
                {num} Carriers
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-slate-300 bg-cyber-950 px-4 py-2 rounded-xl border border-cyber-800">
          <div>Subcarrier Spacing: <span className="text-teal-400 font-bold">Δf = 1 / Ts = 312.5 kHz</span></div>
          <div>Symbol Duration: <span className="text-cyan-400 font-bold">Ts = 3.2 μs + 0.8 μs CP</span></div>
        </div>
      </div>

      {/* Orthogonal Sinc Spectrum Visualizer */}
      <div className="p-5 rounded-xl bg-cyber-950 border-2 border-cyan-500/40 shadow-glow-cyan-sm">
        <div className="flex items-center justify-between pb-2 border-b border-cyber-800 text-xs font-mono mb-4">
          <span className="text-cyan-400 font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            OVERLAPPING ORTHOGONAL SUBCARRIER SPECTRA (FREQUENCY DOMAIN)
          </span>
          <span className="text-amber-400 font-bold">
            Zero ICI: Peak of each aligns with nulls of others
          </span>
        </div>

        {/* SVG Spectrum Curve Canvas */}
        <div className="w-full h-44 bg-cyber-900/70 rounded-xl overflow-hidden relative p-2">
          <svg viewBox="0 0 600 130" preserveAspectRatio="none" className="w-full h-full">
            {/* Zero frequency horizontal axis */}
            <line x1="0" y1="100" x2="600" y2="100" stroke="#1c2d52" strokeWidth="1.5" />

            {/* Subcarrier Sinc Curves */}
            {spectra.map((sub, idx) => {
              const color = colors[idx % colors.length];
              const pathD = sub.pathPoints.map((pt, pIdx) => {
                const x = (pIdx / (freqPoints - 1)) * 600;
                const y = 100 - pt.amp * 80;
                return `${pIdx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
              }).join(' ');

              return (
                <path
                  key={sub.k}
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  opacity="0.85"
                />
              );
            })}
          </svg>
        </div>

        <div className="mt-3 text-center text-xs font-mono text-slate-400">
          Frequency Axis (f) ── Overlapping sinc functions allow maximum spectral density without cross-talk!
        </div>
      </div>

      {/* "Why OFDM?" Section */}
      <div className="p-5 rounded-xl bg-cyber-850 border border-cyber-700/80">
        <h4 className="font-mono font-bold text-sm text-cyan-300 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          WHY OFDM IN MODERN WIRELESS SYSTEMS?
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-tech text-slate-300">
          <div className="p-3.5 rounded-xl bg-cyber-900 border border-cyber-800">
            <h5 className="font-mono font-bold text-teal-300 mb-1">
              High Spectral Efficiency
            </h5>
            <p className="leading-relaxed text-slate-400">
              Unlike legacy FDM which requires wide guard bands between channels, OFDM subcarriers overlap tightly with zero Inter-Carrier Interference (ICI) because subcarriers are mathematically orthogonal (Δf = 1/Ts).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-cyber-900 border border-cyber-800">
            <h5 className="font-mono font-bold text-cyan-300 mb-1">
              Robust Against Multipath
            </h5>
            <p className="leading-relaxed text-slate-400">
              By dividing a high-rate serial stream into N low-rate parallel streams, each symbol duration Ts increases by factor N. Prepended Cyclic Prefix (CP) absorbs multipath echoes, totally eliminating Inter-Symbol Interference (ISI).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-cyber-900 border border-cyber-800">
            <h5 className="font-mono font-bold text-amber-300 mb-1">
              Used Worldwide in Standard Tech
            </h5>
            <p className="leading-relaxed text-slate-400">
              Powers all high-speed wireless standards: Wi-Fi 4/5/6/7 (802.11n/ac/ax/be), 4G LTE, 5G New Radio (NR), Digital Audio/Video Broadcasting (DAB, DVB-T2).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
