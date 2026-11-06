import React, { useState } from 'react';
import { 
  FileText, 
  Binary, 
  Activity, 
  Send, 
  Radio, 
  Wifi, 
  RadioTower, 
  RotateCcw, 
  FileCheck, 
  ArrowRight,
  Info
} from 'lucide-react';

export const CommunicationFlowVisualizer = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);

  const stages = [
    {
      id: 0,
      name: "Information Source",
      short: "Info Source",
      icon: FileText,
      color: "cyan",
      desc: "Generates the raw analog or digital information signal m(t) to be communicated (voice, sensor telemetry, video frames, or web text data)."
    },
    {
      id: 1,
      name: "Source & Channel Encoding",
      short: "Encoding",
      icon: Binary,
      color: "teal",
      desc: "Converts information into compressed digital binary codewords and introduces systematic error-detecting/correcting parity bits (e.g. CRC, Turbo, LDPC)."
    },
    {
      id: 2,
      name: "Digital/Analog Modulation",
      short: "Modulation",
      icon: Activity,
      color: "blue",
      desc: "Imprints baseband symbols onto high-frequency sinusoidal carriers (e.g. QPSK, 64-QAM, OFDM, or FM) to allow efficient radio frequency radiation."
    },
    {
      id: 3,
      name: "RF Transmitter & Mixer",
      short: "Transmitter",
      icon: Send,
      color: "purple",
      desc: "Upconverts IF signals to designated RF transmission frequencies (e.g. 2.4 GHz, 5 GHz) and amplifies power via High Power Amplifiers (HPA)."
    },
    {
      id: 4,
      name: "Transmit Antenna",
      short: "Tx Antenna",
      icon: RadioTower,
      color: "orange",
      desc: "Converts guided radio frequency electrical currents into electromagnetic waves radiating into free space with specific radiation patterns."
    },
    {
      id: 5,
      name: "Wireless Channel",
      short: "RF Channel",
      icon: Wifi,
      color: "rose",
      desc: "Physical transmission medium subjected to free-space path loss, Rayleigh/Rician multipath fading, shadow fading, Doppler shift, and AWGN noise."
    },
    {
      id: 6,
      name: "Receive Antenna",
      short: "Rx Antenna",
      icon: RadioTower,
      color: "orange",
      desc: "Intercepts radiated electromagnetic RF wave fronts and converts them into tiny induced high-frequency electrical signals."
    },
    {
      id: 7,
      name: "RF Receiver & LNA",
      short: "Receiver",
      icon: Radio,
      color: "purple",
      desc: "Amplifies ultra-weak received radio signals via Low Noise Amplifiers (LNA) and downconverts them from RF band down to baseband."
    },
    {
      id: 8,
      name: "Demodulation & Equalization",
      short: "Demodulation",
      icon: Activity,
      color: "blue",
      desc: "Extracts original baseband symbols from the received carrier wave, compensating for multipath phase distortion and frequency offsets."
    },
    {
      id: 9,
      name: "Channel & Source Decoding",
      short: "Decoding",
      icon: Binary,
      color: "teal",
      desc: "Calculates syndrome checks, corrects bit errors using Viterbi/LDPC algorithms, decompresses symbols, and reconstructs original data."
    },
    {
      id: 10,
      name: "Information Sink / Output",
      short: "Info Sink",
      icon: FileCheck,
      color: "cyan",
      desc: "Delivers reconstructed information m'(t) to the destination application (audio speaker, display screen, database, or client browser)."
    }
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-cyber-700/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-cyber-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-mono font-bold text-lg text-white">
              UNIVERSAL WIRELESS COMMUNICATION PIPELINE
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/80">
              END-TO-END FLOW
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            10-Stage Transmitter-to-Receiver Signal Journey. Click any stage to inspect its physical function.
          </p>
        </div>

        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
            isSimulating 
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-glow-cyan-sm' 
              : 'bg-cyber-850 text-slate-400 border-cyber-700'
          }`}
        >
          {isSimulating ? 'PAUSE WAVE ANIMATION' : 'RESUME WAVE ANIMATION'}
        </button>
      </div>

      {/* Pipeline Diagram Horizontal Scrollable Track */}
      <div className="py-6 overflow-x-auto">
        <div className="min-w-[950px] flex items-center justify-between relative px-2">
          {/* Background connecting rail */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-cyber-800 -translate-y-1/2 z-0"></div>

          {/* Animated signal pulse traveling along rail */}
          {isSimulating && (
            <div className="absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 z-0 overflow-hidden pointer-events-none">
              <div className="w-24 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[signalFlow_2.5s_linear_infinite]"></div>
            </div>
          )}

          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;
            return (
              <div key={stage.id} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => setActiveStage(idx)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-cyan-500 to-teal-600 text-black shadow-glow-cyan scale-110 border-2 border-white'
                      : 'bg-cyber-850 text-slate-400 border border-cyber-700 hover:border-cyan-500/50 hover:text-cyan-300'
                  }`}
                  title={stage.name}
                >
                  <Icon className="w-5 h-5" />
                </button>
                <span className={`text-[11px] font-mono mt-2 text-center max-w-[70px] truncate ${
                  isSelected ? 'text-cyan-300 font-bold' : 'text-slate-400'
                }`}>
                  {stage.short}
                </span>
                <span className="text-[9px] font-mono text-slate-600">
                  Step {idx}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Breakdown Panel */}
      <div className="mt-2 p-4 rounded-xl bg-cyber-850 border border-cyber-700/80 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 shrink-0">
          <Info className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-800 text-cyan-400 border border-cyber-700">
              STAGE {activeStage} of {stages.length - 1}
            </span>
            <h4 className="font-mono font-bold text-sm text-white">
              {stages[activeStage].name}
            </h4>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed font-tech">
            {stages[activeStage].desc}
          </p>
          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-cyber-800 text-[11px] font-mono text-slate-400">
            <span>Next Stage:</span>
            <button
              onClick={() => setActiveStage((activeStage + 1) % stages.length)}
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              {stages[(activeStage + 1) % stages.length].name}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
