import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Binary, 
  Layers, 
  Cpu, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp06_CdmaSimulator = ({ onMarkComplete, isCompleted }) => {
  const [userAData, setUserAData] = useState('1011');
  const [userBData, setUserBData] = useState('0101');
  const [isSimulating, setIsSimulating] = useState(false);
  const [step, setStep] = useState(0); // 0: Idle, 1: Spreading, 2: Channel, 3: Despreading, 4: Done

  // Walsh Codes (N=4 chips)
  // Code A = [+1, +1, +1, +1]
  // Code B = [+1, -1, +1, -1]
  // Check orthogonality: 1*1 + 1*(-1) + 1*1 + 1*(-1) = 0!
  const codeA = [1, 1, 1, 1];
  const codeB = [1, -1, 1, -1];

  // Convert binary char to NRZ bipolar: '1' -> +1, '0' -> -1
  const toBipolar = (bitStr) => bitStr.split('').map(b => b === '1' ? 1 : -1);

  const bipolarA = toBipolar(userAData || '0');
  const bipolarB = toBipolar(userBData || '0');

  // Spread each bit into 4 chips
  const spreadSignalA = bipolarA.flatMap(bit => codeA.map(chip => bit * chip));
  const spreadSignalB = bipolarB.flatMap(bit => codeB.map(chip => bit * chip));

  // Minimum length for composite channel
  const minLen = Math.min(spreadSignalA.length, spreadSignalB.length);
  const combinedChannel = [];
  for (let i = 0; i < minLen; i++) {
    combinedChannel.push(spreadSignalA[i] + spreadSignalB[i]);
  }

  // Despreading at receiver: inner product with codeA / 4 and codeB / 4
  const numBits = Math.floor(minLen / 4);
  const recoveredA = [];
  const recoveredB = [];

  for (let b = 0; b < numBits; b++) {
    const chunk = combinedChannel.slice(b * 4, b * 4 + 4);
    // Dot product with codeA
    const dotA = chunk.reduce((sum, val, idx) => sum + val * codeA[idx], 0) / 4;
    recoveredA.push(dotA > 0 ? '1' : '0');

    // Dot product with codeB
    const dotB = chunk.reduce((sum, val, idx) => sum + val * codeB[idx], 0) / 4;
    recoveredB.push(dotB > 0 ? '1' : '0');
  }

  const recoveredAStr = recoveredA.join('');
  const recoveredBStr = recoveredB.join('');

  const runSimulation = () => {
    setIsSimulating(true);
    setStep(1);

    setTimeout(() => setStep(2), 1200);
    setTimeout(() => setStep(3), 2400);
    setTimeout(() => {
      setStep(4);
      setIsSimulating(false);
      if (!isCompleted) onMarkComplete();
    }, 3600);
  };

  const handleDataAChange = (e) => {
    const val = e.target.value.replace(/[^01]/g, '').slice(0, 6);
    setUserAData(val);
  };

  const handleDataBChange = (e) => {
    const val = e.target.value.replace(/[^01]/g, '').slice(0, 6);
    setUserBData(val);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Binary className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              CDMA MULTIPLEXING & ORTHOGONAL DESPREADING
            </h3>
            <p className="text-xs text-slate-400">
              Direct-Sequence Spread Spectrum (DSSS) using 4-chip Walsh Hadamard orthogonal codes.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Input Configuration & Action Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
        <div>
          <label className="text-xs font-mono text-cyan-400 block mb-1 font-bold">
            User A Data (Binary, max 6 bits):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userAData}
              onChange={handleDataAChange}
              className="bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-cyan-300 font-mono text-sm tracking-widest focus:outline-none focus:border-cyan-500 w-full"
              placeholder="e.g. 1011"
            />
            <span className="text-[11px] font-mono text-slate-500">
              Code A: [+1,+1,+1,+1]
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-amber-400 block mb-1 font-bold">
            User B Data (Binary, max 6 bits):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userBData}
              onChange={handleDataBChange}
              className="bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-amber-300 font-mono text-sm tracking-widest focus:outline-none focus:border-amber-500 w-full"
              placeholder="e.g. 0101"
            />
            <span className="text-[11px] font-mono text-slate-500">
              Code B: [+1,-1,+1,-1]
            </span>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={runSimulation}
            disabled={isSimulating || !userAData || !userBData}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'SPREADING & DESPREADING...' : 'RUN CDMA SIMULATION'}</span>
          </button>
        </div>
      </div>

      {/* CDMA Pipeline Stages */}
      <div className="space-y-4">
        {/* Stage 1: Spreading */}
        <div className={`p-4 rounded-xl border transition-all ${
          step >= 1 ? 'bg-cyber-850 border-cyan-500/50' : 'bg-cyber-950/60 border-cyber-800'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-cyber-800 text-xs font-mono">
            <span className="text-cyan-400 font-bold flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-[10px]">1</span>
              SPREADING PROCESS (BIT ⊗ WALSH CODE)
            </span>
            <span className="text-slate-400 text-[11px]">Processing Gain G = 4 chips/bit</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs font-mono">
            {/* User A Spreading */}
            <div className="p-3 rounded-lg bg-cyber-900 border border-cyber-800">
              <div className="text-cyan-300 font-bold mb-1">User A (Data: {userAData} → Bipolar: {bipolarA.map(v => v > 0 ? '+1' : '-1').join(' ')})</div>
              <div className="text-slate-400 text-[11px] mb-2">Multiplied by Code A [+1, +1, +1, +1]:</div>
              <div className="flex flex-wrap gap-1 text-[11px]">
                {spreadSignalA.slice(0, 16).map((val, idx) => (
                  <span key={idx} className={`px-1.5 py-0.5 rounded ${val > 0 ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}`}>
                    {val > 0 ? '+1' : '-1'}
                  </span>
                ))}
              </div>
            </div>

            {/* User B Spreading */}
            <div className="p-3 rounded-lg bg-cyber-900 border border-cyber-800">
              <div className="text-amber-300 font-bold mb-1">User B (Data: {userBData} → Bipolar: {bipolarB.map(v => v > 0 ? '+1' : '-1').join(' ')})</div>
              <div className="text-slate-400 text-[11px] mb-2">Multiplied by Code B [+1, -1, +1, -1]:</div>
              <div className="flex flex-wrap gap-1 text-[11px]">
                {spreadSignalB.slice(0, 16).map((val, idx) => (
                  <span key={idx} className={`px-1.5 py-0.5 rounded ${val > 0 ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}`}>
                    {val > 0 ? '+1' : '-1'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stage 2: Composite Transmission Channel */}
        <div className={`p-4 rounded-xl border transition-all ${
          step >= 2 ? 'bg-cyber-850 border-purple-500/50' : 'bg-cyber-950/60 border-cyber-800'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-cyber-800 text-xs font-mono">
            <span className="text-purple-400 font-bold flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500/50 flex items-center justify-center text-[10px]">2</span>
              COMPOSITE TRANSMISSION CHANNEL: S_total = (Spread A) + (Spread B)
            </span>
            <span className="text-slate-400 text-[11px]">Simultaneous Airwaves Sum</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5 items-center font-mono text-xs">
            {combinedChannel.slice(0, 16).map((val, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 rounded font-bold ${
                  val === 2 ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700' :
                  val === -2 ? 'bg-rose-900/60 text-rose-300 border border-rose-700' :
                  'bg-cyber-800 text-slate-300 border border-cyber-700'
                }`}
              >
                {val > 0 ? `+${val}` : val}
              </span>
            ))}
            <span className="text-slate-500 text-[11px] ml-2">... (Shared over-the-air composite waveform)</span>
          </div>
        </div>

        {/* Stage 3: Correlator Despreading & Recovery */}
        <div className={`p-4 rounded-xl border transition-all ${
          step >= 3 ? 'bg-cyber-850 border-emerald-500/50' : 'bg-cyber-950/60 border-cyber-800'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-cyber-800 text-xs font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-[10px]">3</span>
              RECEIVER DESPREADING (INNER DOT PRODUCT & THRESHOLD)
            </span>
            <span className="text-slate-400 text-[11px]">Interference Cancels to 0 via Orthogonality</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {/* User A Decoded */}
            <div className="p-4 rounded-lg bg-cyber-900 border border-cyber-800">
              <span className="text-xs font-mono text-slate-400 block mb-1">
                Recovered User A Bitstream:
              </span>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-black text-cyan-300 tracking-widest">
                  {step >= 3 ? recoveredAStr : '----'}
                </span>
                {step >= 3 && recoveredAStr === userAData.slice(0, recoveredAStr.length) && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Exact Match
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-tech">
                Formula: (S_composite · Code_A) / 4 = User A Bits. Cross-correlation with User B code is exactly zero.
              </p>
            </div>

            {/* User B Decoded */}
            <div className="p-4 rounded-lg bg-cyber-900 border border-cyber-800">
              <span className="text-xs font-mono text-slate-400 block mb-1">
                Recovered User B Bitstream:
              </span>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-black text-amber-300 tracking-widest">
                  {step >= 3 ? recoveredBStr : '----'}
                </span>
                {step >= 3 && recoveredBStr === userBData.slice(0, recoveredBStr.length) && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Exact Match
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-tech">
                Formula: (S_composite · Code_B) / 4 = User B Bits. No multi-user interference occurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
