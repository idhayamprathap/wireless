import React, { useState, useEffect, useMemo } from 'react';
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Binary, 
  Compass,
  Info
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp08_DigitalModulation = ({ onMarkComplete, isCompleted }) => {
  const [activeTab, setActiveTab] = useState('QPSK'); // 'BASK', 'BFSK', 'BPSK', 'QPSK'
  const [bitSequence, setBitSequence] = useState('10110101');
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeBitIndex, setActiveBitIndex] = useState(0);

  // Auto-advance active bit when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveBitIndex(prev => (prev + 1) % (activeTab === 'QPSK' ? Math.ceil(bitSequence.length / 2) : bitSequence.length));
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying, bitSequence, activeTab]);

  const bits = useMemo(() => bitSequence.split(''), [bitSequence]);

  // QPSK dibits
  const dibits = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < bitSequence.length; i += 2) {
      pairs.push(bitSequence.slice(i, i + 2).padEnd(2, '0'));
    }
    return pairs;
  }, [bitSequence]);

  // Constellation coordinate mapping for QPSK:
  // 00 -> (-1/√2, -1/√2) [225°]
  // 01 -> (-1/√2, +1/√2) [135°]
  // 11 -> (+1/√2, +1/√2) [45°]
  // 10 -> (+1/√2, -1/√2) [315°]
  const qpskMap = {
    '11': { i: 0.707, q: 0.707, phase: '45°', label: '11' },
    '01': { i: -0.707, q: 0.707, phase: '135°', label: '01' },
    '00': { i: -0.707, q: -0.707, phase: '225°', label: '00' },
    '10': { i: 0.707, q: -0.707, phase: '315°', label: '10' }
  };

  const currentDibit = dibits[activeBitIndex] || '11';
  const activeCoord = qpskMap[currentDibit] || qpskMap['11'];

  // Generate SVG path for modulated digital carrier based on current scheme
  const samplesPerBit = 60;
  const generateModulatedWave = () => {
    const totalPoints = [];
    if (activeTab === 'QPSK') {
      dibits.forEach((dibit, dIdx) => {
        const info = qpskMap[dibit] || qpskMap['11'];
        const phaseRad = (parseFloat(info.phase) * Math.PI) / 180;
        for (let s = 0; s < samplesPerBit * 2; s++) {
          const t = s / (samplesPerBit * 2);
          const y = Math.cos(2 * Math.PI * 2 * t + phaseRad);
          totalPoints.push(y);
        }
      });
    } else {
      bits.forEach((bit, bIdx) => {
        const isOne = bit === '1';
        for (let s = 0; s < samplesPerBit; s++) {
          const t = s / samplesPerBit;
          let y = 0;
          if (activeTab === 'BASK') {
            y = isOne ? Math.cos(2 * Math.PI * 3 * t) : 0;
          } else if (activeTab === 'BFSK') {
            const freq = isOne ? 4 : 2;
            y = Math.cos(2 * Math.PI * freq * t);
          } else if (activeTab === 'BPSK') {
            const phase = isOne ? 0 : Math.PI;
            y = Math.cos(2 * Math.PI * 3 * t + phase);
          }
          totalPoints.push(y);
        }
      });
    }

    const width = 600;
    const height = 70;
    const centerY = height / 2;
    return totalPoints.map((val, idx) => {
      const x = (idx / (totalPoints.length - 1)) * width;
      const y = centerY - val * 24;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  const handleBitInput = (e) => {
    const val = e.target.value.replace(/[^01]/g, '').slice(0, 12);
    setBitSequence(val || '1011');
    setActiveBitIndex(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Binary className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              DIGITAL MODULATION LABORATORY (BASK • BFSK • BPSK • QPSK)
            </h3>
            <p className="text-xs text-slate-400">
              Binary bandpass modulation and 4-quadrant Quadrature Phase Shift Keying I/Q constellation.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-xl bg-cyber-900 p-1 border border-cyber-700">
          {['BASK', 'BFSK', 'BPSK', 'QPSK'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setActiveBitIndex(0);
              }}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Play / Pause / Reset Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyber-850 hover:bg-cyber-800 text-cyan-300 border border-cyber-700 text-xs font-mono transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'PAUSE' : 'START SIMULATION'}</span>
          </button>

          <button
            onClick={() => {
              setActiveBitIndex(0);
              setIsPlaying(false);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyber-850 hover:bg-cyber-800 text-slate-400 hover:text-white border border-cyber-700 text-xs font-mono transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Bit Input Bar */}
      <div className="p-4 rounded-xl bg-cyber-900/90 border border-cyber-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-mono text-slate-400 whitespace-nowrap font-bold">
            Input Binary Sequence:
          </label>
          <input
            type="text"
            value={bitSequence}
            onChange={handleBitInput}
            className="bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-1.5 text-cyan-300 font-mono text-sm tracking-widest focus:outline-none focus:border-cyan-500 w-44"
          />
        </div>

        <div className="flex items-center gap-1 font-mono text-xs text-slate-300">
          <span>Active Symbol:</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
            {activeTab === 'QPSK' ? `Pair "${currentDibit}"` : `Bit "${bits[activeBitIndex] || '1'}"`}
          </span>
        </div>
      </div>

      {/* Main Grid: Waveforms + QPSK Constellation (when QPSK) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Waveform Tracks */}
        <div className={`space-y-4 ${activeTab === 'QPSK' ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          {/* Track 1: Baseband Bits Sequence */}
          <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-700/80">
            <div className="flex items-center justify-between pb-1 border-b border-cyber-800 text-xs font-mono mb-2">
              <span className="text-cyan-400 font-bold">1. DIGITAL INPUT NRZ BITSTREAM</span>
              <span className="text-slate-400 text-[11px]">{bitSequence.length} Bits</span>
            </div>
            <div className="flex items-center gap-1.5 py-3">
              {activeTab === 'QPSK' ? (
                dibits.map((dibit, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 py-2 rounded-lg text-center font-mono font-bold text-xs border transition-all ${
                      idx === activeBitIndex
                        ? 'bg-cyan-500 text-black border-white shadow-glow-cyan scale-105'
                        : 'bg-cyber-850 text-slate-300 border-cyber-700'
                    }`}
                  >
                    {dibit}
                  </div>
                ))
              ) : (
                bits.map((bit, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 py-2 rounded-lg text-center font-mono font-bold text-xs border transition-all ${
                      idx === activeBitIndex
                        ? 'bg-cyan-500 text-black border-white shadow-glow-cyan scale-105'
                        : bit === '1' ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800' : 'bg-cyber-850 text-slate-400 border-cyber-700'
                    }`}
                  >
                    {bit}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Track 2: Modulated RF Waveform */}
          <div className="p-4 rounded-xl bg-cyber-950 border-2 border-cyan-500/40 shadow-glow-cyan-sm">
            <div className="flex items-center justify-between pb-1 border-b border-cyber-800 text-xs font-mono mb-2">
              <span className="text-amber-400 font-bold">
                2. {activeTab} MODULATED SIGNAL
              </span>
              <span className="text-slate-400 text-[11px]">
                {activeTab === 'BASK' && 'Carrier On/Off Keying'}
                {activeTab === 'BFSK' && 'f1 (high) vs f2 (low)'}
                {activeTab === 'BPSK' && '180° Phase Reversal on bit changes'}
                {activeTab === 'QPSK' && 'Quadrature 4-Phase States'}
              </span>
            </div>
            <div className="w-full h-24 bg-cyber-900/80 rounded-lg overflow-hidden relative">
              <svg viewBox="0 0 600 70" preserveAspectRatio="none" className="w-full h-full">
                <line x1="0" y1="35" x2="600" y2="35" stroke="#1c2d52" strokeWidth="1" strokeDasharray="4" />
                <path d={generateModulatedWave()} fill="none" stroke="#00f2fe" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: QPSK Constellation Diagram (only in QPSK or preview) */}
        {activeTab === 'QPSK' && (
          <div className="lg:col-span-5 p-5 rounded-xl bg-cyber-950 border border-cyber-700/80 flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between pb-2 border-b border-cyber-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                I/Q CONSTELLATION DIAGRAM
              </span>
              <span className="text-amber-400 font-bold">{activeCoord.phase}</span>
            </div>

            {/* SVG Constellation Canvas */}
            <div className="w-56 h-56 relative my-3">
              <svg viewBox="-120 -120 240 240" className="w-full h-full overflow-visible">
                {/* Reference circle */}
                <circle cx="0" cy="0" r="85" fill="none" stroke="#1c2d52" strokeWidth="1" strokeDasharray="4" />
                {/* I and Q Axes */}
                <line x1="-105" y1="0" x2="105" y2="0" stroke="#2b4478" strokeWidth="1.5" />
                <line x1="0" y1="-105" x2="0" y2="105" stroke="#2b4478" strokeWidth="1.5" />
                <text x="110" y="4" fill="#64748b" fontSize="10" fontFamily="monospace">I</text>
                <text x="-4" y="-110" fill="#64748b" fontSize="10" fontFamily="monospace">Q</text>

                {/* 4 Constellation Points */}
                {Object.entries(qpskMap).map(([sym, coord]) => {
                  const cx = coord.i * 85;
                  const cy = -coord.q * 85;
                  const isActive = currentDibit === sym;
                  return (
                    <g key={sym}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? "7" : "5"}
                        fill={isActive ? "#00f2fe" : "#1e293b"}
                        stroke={isActive ? "#ffffff" : "#00f2fe"}
                        strokeWidth="2"
                        className={isActive ? 'animate-pulse' : ''}
                      />
                      <text
                        x={cx + (coord.i > 0 ? 10 : -22)}
                        y={cy + (coord.q > 0 ? -8 : 16)}
                        fill={isActive ? "#00f2fe" : "#94a3b8"}
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight={isActive ? "bold" : "normal"}
                      >
                        {sym} ({coord.phase})
                      </text>
                    </g>
                  );
                })}

                {/* Rotating vector towards active symbol */}
                <line
                  x1="0"
                  y1="0"
                  x2={activeCoord.i * 85}
                  y2={-activeCoord.q * 85}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="2"
                />
              </svg>
            </div>

            <div className="w-full text-center text-xs font-mono text-slate-400 pt-2 border-t border-cyber-800">
              Active Dibit: <span className="text-cyan-300 font-bold">{currentDibit}</span> • Symbol Rate: 1/2 Bit Rate
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
