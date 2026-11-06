import React from 'react';
import { useLab } from '../../context/LabContext';
import { EXPERIMENTS } from '../../data/experimentsData';
import { 
  CheckCircle2, 
  Clock, 
  Layers, 
  ArrowRight, 
  PlayCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const StatsOverview = () => {
  const { 
    totalCount, 
    completedCount, 
    inProgressCount, 
    remainingCount, 
    progressPercentage,
    lastOpenedExperiment,
    openExperiment,
    resetAllProgress
  } = useLab();

  const lastExp = EXPERIMENTS.find(e => e.id === lastOpenedExperiment) || EXPERIMENTS[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Progress Block */}
      <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-cyber-700/80 flex flex-col justify-between relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                LAB CURRICULUM STATUS
              </span>
              <h2 className="text-xl font-mono font-bold text-white mt-0.5">
                Wireless Practical Progress
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-black text-cyan-300">
                {progressPercentage}%
              </span>
              <span className="text-xs font-mono text-slate-400">
                OVERALL
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-cyber-900 h-3.5 rounded-full overflow-hidden p-0.5 border border-cyber-700/80 mb-6">
            <div
              className="bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 h-full rounded-full transition-all duration-700 ease-out shadow-glow-cyan-sm relative"
              style={{ width: `${Math.max(progressPercentage, 2)}%` }}
            >
              {progressPercentage > 5 && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              )}
            </div>
          </div>

          {/* 4 Core Counter Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-cyber-850/80 border border-cyber-700/60 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                Total Labs
              </span>
              <span className="text-2xl font-mono font-bold text-white mt-1 block">
                {totalCount}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">19 Modules</span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center">
              <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider block">
                Completed
              </span>
              <span className="text-2xl font-mono font-bold text-emerald-300 mt-1 block">
                {completedCount}
              </span>
              <span className="text-[10px] text-emerald-400/80 font-mono">Verified</span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-center">
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider block">
                In Progress
              </span>
              <span className="text-2xl font-mono font-bold text-amber-300 mt-1 block">
                {inProgressCount}
              </span>
              <span className="text-[10px] text-amber-400/80 font-mono">Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 text-center">
              <span className="text-[10px] font-mono uppercase text-blue-400 tracking-wider block">
                Remaining
              </span>
              <span className="text-2xl font-mono font-bold text-blue-300 mt-1 block">
                {remainingCount}
              </span>
              <span className="text-[10px] text-blue-400/80 font-mono">Pending</span>
            </div>
          </div>
        </div>

        {/* Reset progress option */}
        <div className="mt-5 pt-3 border-t border-cyber-800 flex items-center justify-between text-xs text-slate-400">
          <span>Synced locally to browser LocalStorage</span>
          <button
            onClick={resetAllProgress}
            className="flex items-center gap-1 hover:text-rose-400 transition-colors"
            title="Reset progress to 0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>

      {/* Continue Laboratory / Last Experiment Card */}
      <div className="glass-card rounded-2xl p-6 border border-cyan-500/40 bg-gradient-to-br from-cyber-900 via-cyber-850 to-cyan-950/30 flex flex-col justify-between relative shadow-glow-cyan-sm">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              LAST OPENED EXPERIMENT
            </span>
            <span className="text-xs font-mono text-slate-400">
              EXP {lastExp.number}
            </span>
          </div>

          <h3 className="font-mono font-bold text-lg text-white line-clamp-2">
            {lastExp.title}
          </h3>

          <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
            {lastExp.shortDesc}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-cyber-800 text-slate-300 border border-cyber-700">
              {lastExp.category}
            </span>
            <span className="px-2 py-0.5 rounded bg-cyber-800 text-cyan-400 border border-cyber-700">
              {lastExp.difficulty}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => openExperiment(lastExp.id)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-sm transition-all shadow-glow-cyan group"
          >
            <PlayCircle className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
            <span>CONTINUE LABORATORY</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
