import React from 'react';
import { useLab } from '../context/LabContext';
import { EXPERIMENTS } from '../data/experimentsData';
import { TECH_COMPARISONS } from '../data/techComparisonData';
import { CommunicationFlowVisualizer } from '../components/visualizers/CommunicationFlowVisualizer';
import { TopologyBuilder } from '../components/visualizers/TopologyBuilder';
import { LiveTelemetry } from '../components/dashboard/LiveTelemetry';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { 
  Radio, 
  Cpu, 
  ArrowRight, 
  Layers, 
  Wifi, 
  Bluetooth, 
  ShieldCheck, 
  Activity, 
  HelpCircle, 
  Laptop, 
  Server, 
  Router, 
  CheckCircle2,
  Sparkles,
  Play
} from 'lucide-react';

export const HomePage = () => {
  const { setActiveTab, openExperiment, completedCount, totalCount } = useLab();

  const floatingTech = [
    { name: "CDMA", desc: "Spread Spectrum", color: "from-purple-500 to-indigo-500", border: "border-purple-500/40" },
    { name: "OFDM", desc: "Multi-Carrier", color: "from-teal-500 to-emerald-500", border: "border-teal-500/40" },
    { name: "Wi-Fi 6", desc: "802.11ax OFDMA", color: "from-cyan-500 to-blue-500", border: "border-cyan-500/40" },
    { name: "Bluetooth", desc: "BLE & Classic", color: "from-blue-500 to-cyan-400", border: "border-blue-500/40" },
    { name: "WLAN", desc: "BSS & ESS Infra", color: "from-amber-500 to-orange-500", border: "border-amber-500/40" },
    { name: "LoRa", desc: "Long Range LPWAN", color: "from-rose-500 to-pink-500", border: "border-rose-500/40" }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        {/* Futuristic glowing backdrop blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-teal-500/10 to-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-glow-cyan-sm">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>LEARN • CONFIGURE • SIMULATE • ANALYZE • EXPERIMENT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-black tracking-tight text-white leading-tight">
            WIRELESS COMMUNICATION<br />
            <span className="neon-text-cyan">COMMAND CENTER</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-tech max-w-2xl mx-auto leading-relaxed">
            Your Interactive Laboratory for Wireless Networks, Communication Systems and Signal Analysis.
            Master 19 undergraduate experiments through real-time simulators, frame dissectors, and viva preparation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => { setActiveTab('dashboard'); window.scrollTo(0,0); }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-sm shadow-glow-cyan transition-all flex items-center gap-2 group"
            >
              <span>ENTER VIRTUAL LAB</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => { setActiveTab('experiments'); window.scrollTo(0,0); }}
              className="px-6 py-3.5 rounded-xl bg-cyber-850 hover:bg-cyber-800 text-cyan-300 border border-cyber-700 hover:border-cyan-500/50 font-mono font-bold text-sm transition-all"
            >
              EXPLORE 19 EXPERIMENTS
            </button>
          </div>
        </div>

        {/* HERO ANIMATION: Laptop -> AP -> Wireless Waves -> WLC -> Server + Floating Nodes */}
        <div className="max-w-6xl mx-auto mt-12 px-4 relative z-10">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyber-700/80 relative overflow-hidden">
            <div className="text-center pb-4 text-xs font-mono text-cyan-400">
              FUTURISTIC COMMUNICATION HIGHWAY • SIMULATED PACKET TRAIN
            </div>

            {/* Central Animated Architecture Chain */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center justify-center relative py-6">
              {/* Node 1: Laptop */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-cyber-900 border border-cyan-500/50 text-cyan-400 flex items-center justify-center shadow-glow-cyan-sm">
                  <Laptop className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold text-white mt-2">Laptop (STA)</span>
                <span className="text-[10px] font-mono text-cyan-400">192.168.10.105</span>
              </div>

              {/* Node 2: Access Point */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-cyber-900 border border-teal-500/50 text-teal-400 flex items-center justify-center">
                  <Radio className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold text-white mt-2">Access Point</span>
                <span className="text-[10px] font-mono text-teal-400">CAPWAP Joined</span>
              </div>

              {/* Node 3: Wireless Waves (Central) */}
              <div className="col-span-2 sm:col-span-1 flex flex-col items-center py-2">
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-cyan-950/50 border border-cyan-500/60 shadow-glow-cyan">
                  <Wifi className="w-8 h-8 text-cyan-300 animate-pulse" />
                  <span className="absolute inset-0 rounded-full border border-cyan-400 opacity-75 animate-ping"></span>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-300 mt-2">RF Waves</span>
                <span className="text-[10px] font-mono text-slate-400">2.4 / 5 GHz</span>
              </div>

              {/* Node 4: WLC */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-cyber-900 border border-purple-500/50 text-purple-400 flex items-center justify-center">
                  <Cpu className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold text-white mt-2">WLC Controller</span>
                <span className="text-[10px] font-mono text-purple-400">192.168.20.10</span>
              </div>

              {/* Node 5: Server */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-cyber-900 border border-emerald-500/50 text-emerald-400 flex items-center justify-center">
                  <Server className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold text-white mt-2">Enterprise Server</span>
                <span className="text-[10px] font-mono text-emerald-400">192.168.30.10</span>
              </div>
            </div>

            {/* Floating Technology Nodes Bar */}
            <div className="mt-6 pt-6 border-t border-cyber-800 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {floatingTech.map((tech) => (
                <div
                  key={tech.name}
                  className={`p-3 rounded-xl bg-cyber-900/80 border ${tech.border} text-center transition-all hover:scale-105`}
                >
                  <span className="font-mono font-bold text-xs text-white block">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                    {tech.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE TELEMETRY DASHBOARD PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              REAL-TIME CONTROL DECK
            </span>
            <h2 className="text-xl font-mono font-bold text-white">
              Live Laboratory Telemetry
            </h2>
          </div>
          <SimulationBadge />
        </div>
        <LiveTelemetry />
      </section>

      {/* UNIVERSAL COMMUNICATION FLOW VISUALIZER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommunicationFlowVisualizer />
      </section>

      {/* INTERACTIVE TOPOLOGY BUILDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopologyBuilder />
      </section>

      {/* TECHNOLOGY COMPARISON MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
              CROSS-PLATFORM ANALYSIS
            </span>
            <h2 className="text-xl font-mono font-bold text-white">
              Wireless Technology Comparison Matrix
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_COMPARISONS.map((tech) => (
            <div
              key={tech.tech}
              className="glass-card rounded-2xl p-5 border border-cyber-700/80 space-y-3 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
                <h3 className="font-mono font-bold text-sm text-white">
                  {tech.tech}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-800 text-cyan-400 border border-cyber-700">
                  {tech.category}
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                <div>Range: <span className="text-slate-100 font-bold">{tech.range}</span></div>
                <div>Data Rate: <span className="text-teal-300 font-bold">{tech.dataRate}</span></div>
                <div>Power: <span className="text-amber-300">{tech.power}</span></div>
                <div>Frequency: <span className="text-cyan-300">{tech.freqBand}</span></div>
              </div>

              <div className="pt-2 border-t border-cyber-800 text-xs font-tech text-slate-300">
                <span className="text-cyan-400 font-mono font-bold block mb-0.5">Key Advantage:</span>
                {tech.advantage}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 19 EXPERIMENTS GRID OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-cyber-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              ACADEMIC SYLLABUS
            </span>
            <h2 className="text-xl font-mono font-bold text-white">
              All 19 Laboratory Experiments
            </h2>
          </div>
          <button
            onClick={() => { setActiveTab('experiments'); window.scrollTo(0,0); }}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
          >
            <span>View Catalog & Filters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPERIMENTS.slice(0, 6).map((exp) => (
            <div
              key={exp.id}
              onClick={() => openExperiment(exp.id)}
              className="glass-card rounded-2xl p-5 border border-cyber-700/80 hover:border-cyan-500/50 cursor-pointer transition-all hover:scale-[1.01] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/80 font-bold">
                    EXP {exp.number}
                  </span>
                  <span className="text-slate-400">{exp.category}</span>
                </div>
                <h3 className="font-mono font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-slate-400 font-tech mt-2 line-clamp-2 leading-relaxed">
                  {exp.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-cyber-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{exp.estimatedTime}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                  <span>Open Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => { setActiveTab('experiments'); window.scrollTo(0,0); }}
            className="px-6 py-3 rounded-xl bg-cyber-850 hover:bg-cyber-800 text-cyan-300 border border-cyber-700 hover:border-cyan-500/50 font-mono text-xs font-bold transition-all"
          >
            SEE ALL 19 EXPERIMENTS ({totalCount - completedCount} REMAINING) &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
