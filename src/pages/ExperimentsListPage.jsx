import React, { useState, useMemo } from 'react';
import { useLab } from '../context/LabContext';
import { EXPERIMENTS } from '../data/experimentsData';
import { 
  Layers, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Cpu, 
  Radio, 
  Wifi, 
  Bluetooth, 
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { SimulationBadge } from '../components/common/SimulationBadge';

export const ExperimentsListPage = () => {
  const { completedExperiments, openExperiment } = useLab();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'COMPLETED', 'PENDING'

  const categories = [
    'ALL',
    'WLAN & Infrastructure',
    'Modulation & Signal Analysis',
    'Wi-Fi Scanning & Security',
    'Short Range & Bluetooth',
    'Protocol & Transport'
  ];

  const filteredExperiments = useMemo(() => {
    return EXPERIMENTS.filter((exp) => {
      // Category check
      if (selectedCategory !== 'ALL' && exp.category !== selectedCategory) return false;

      // Status check
      const isDone = completedExperiments.includes(exp.id);
      if (statusFilter === 'COMPLETED' && !isDone) return false;
      if (statusFilter === 'PENDING' && isDone) return false;

      // Search keyword
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = exp.title.toLowerCase().includes(q);
        const matchesDesc = exp.shortDesc.toLowerCase().includes(q);
        const matchesNum = exp.number.includes(q);
        if (!matchesTitle && !matchesDesc && !matchesNum) return false;
      }

      return true;
    });
  }, [selectedCategory, statusFilter, searchTerm, completedExperiments]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            ACADEMIC CURRICULUM
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            All 19 Laboratory Experiments
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-3 py-1.5 rounded-lg border border-cyan-800 font-bold">
            {completedExperiments.length} of {EXPERIMENTS.length} Completed
          </span>
          <SimulationBadge />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search experiments by name, number, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-cyber-850 border border-cyber-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-tech"
            />
          </div>

          {/* Status Filter */}
          <div className="flex rounded-xl bg-cyber-850 p-1 border border-cyber-700 text-xs font-mono shrink-0">
            {['ALL', 'COMPLETED', 'PENDING'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === s ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-slate-500 text-[11px] mr-1 shrink-0">Domain:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-cyber-800 text-cyan-300 border-cyan-500/60 font-bold shadow-glow-cyan-sm'
                  : 'bg-cyber-850 text-slate-400 border-cyber-750 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExperiments.map((exp) => {
          const isDone = completedExperiments.includes(exp.id);
          return (
            <div
              key={exp.id}
              onClick={() => openExperiment(exp.id)}
              className={`glass-card rounded-2xl p-5 border cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between group ${
                isDone
                  ? 'border-emerald-500/40 bg-cyber-900/90 hover:border-emerald-400'
                  : 'border-cyber-700/80 hover:border-cyan-500/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    isDone ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-cyan-950 text-cyan-400 border border-cyan-800/80'
                  }`}>
                    EXP {exp.number}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {exp.category}
                  </span>
                </div>

                <h3 className="font-mono font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  {exp.title}
                </h3>

                <p className="text-xs text-slate-400 font-tech mt-2 line-clamp-3 leading-relaxed">
                  {exp.shortDesc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-cyber-800/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{exp.estimatedTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isDone ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>COMPLETED</span>
                    </span>
                  ) : (
                    <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                      <span>ENTER LAB</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
