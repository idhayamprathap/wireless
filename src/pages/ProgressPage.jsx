import React, { useRef } from 'react';
import { useLab } from '../context/LabContext';
import { EXPERIMENTS } from '../data/experimentsData';
import { BadgesSection } from '../components/dashboard/BadgesSection';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { 
  Award, 
  CheckCircle2, 
  Printer, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  Radio, 
  Cpu, 
  Layers,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProgressPage = () => {
  const { 
    completedExperiments, 
    totalCount, 
    completedCount, 
    remainingCount, 
    progressPercentage,
    openExperiment 
  } = useLab();

  const isAllComplete = completedCount === 19;

  const triggerCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            ACADEMIC PROGRESS & CERTIFICATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            Student Laboratory Progress
          </h1>
        </div>
        <SimulationBadge />
      </div>

      {/* Main Progress Bar & Metrics */}
      <div className="glass-card rounded-2xl p-6 border border-cyber-700/80 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold">OVERALL LAB COMPLETION</span>
            <div className="text-2xl font-mono font-black text-white mt-0.5">
              {completedCount} / {totalCount} Experiments Completed ({progressPercentage}%)
            </div>
          </div>
          {isAllComplete && (
            <button
              onClick={triggerCelebration}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-mono font-bold text-xs shadow-glow-orange flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>CELEBRATE COMPLETION</span>
            </button>
          )}
        </div>

        {/* Big Progress Bar */}
        <div className="w-full bg-cyber-900 h-4 rounded-full p-0.5 border border-cyber-700/80">
          <div
            style={{ width: `${Math.max(2, progressPercentage)}%` }}
            className="h-full rounded-full bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 shadow-glow-cyan-sm transition-all duration-700 ease-out"
          ></div>
        </div>

        {/* Experiment Mini-Checks Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 pt-2">
          {EXPERIMENTS.map((exp) => {
            const isDone = completedExperiments.includes(exp.id);
            return (
              <div
                key={exp.id}
                onClick={() => openExperiment(exp.id)}
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                    : 'bg-cyber-900 border-cyber-800 text-slate-500 hover:border-cyan-500/40 hover:text-white'
                }`}
                title={exp.title}
              >
                <span className="text-[10px] font-mono block">EXP {exp.number}</span>
                <span className="text-[9px] font-mono font-bold">
                  {isDone ? 'DONE' : 'PENDING'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Section */}
      <BadgesSection />

      {/* CERTIFICATE / COMPLETION CARD */}
      <div className={`p-8 rounded-2xl border-2 transition-all relative overflow-hidden ${
        isAllComplete 
          ? 'bg-gradient-to-br from-cyber-900 via-cyber-850 to-amber-950/30 border-amber-500/60 shadow-glow-orange' 
          : 'bg-cyber-900/60 border-cyber-800'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-cyber-700/80 gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              isAllComplete ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-cyber-800 text-slate-600 border border-cyber-700'
            }`}>
              <Crown className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
                LAB CERTIFICATE OF COMPLETION
              </span>
              <h2 className="text-xl sm:text-2xl font-mono font-black text-white mt-0.5">
                Wireless Virtual Lab Diploma
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              disabled={!isAllComplete}
              className="px-4 py-2.5 rounded-xl bg-cyber-800 hover:bg-cyber-750 text-slate-200 border border-cyber-700 font-mono text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-40"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>PRINT / SAVE PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate Body Container */}
        <div className="py-8 text-center space-y-4 max-w-2xl mx-auto">
          {isAllComplete ? (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <span className="text-3xl sm:text-4xl font-mono font-black text-amber-300 tracking-wider block">
                CONGRATULATIONS!
              </span>
              <p className="text-sm font-tech text-slate-200 leading-relaxed">
                You have successfully completed all <strong>19 experiments</strong> of the <strong>Wireless Communication Command Center Virtual Laboratory</strong>. You have demonstrated rigorous mastery across WLAN infrastructure, modulation waveforms, 802.11 beacon dissection, and short-range Bluetooth networking.
              </p>

              <div className="p-4 rounded-xl bg-cyber-950/80 border border-amber-500/40 text-xs font-mono text-amber-300 inline-block">
                19 / 19 EXPERIMENTS VERIFIED • ACADEMIC CURRICULUM SATISFIED
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-slate-400">
              <p className="text-sm font-tech">
                Complete all 19 experiments to unlock your official <strong>Laboratory Certificate of Completion</strong>.
              </p>
              <p className="text-xs font-mono text-cyan-400">
                Current Status: {completedCount} / 19 Completed ({remainingCount} remaining).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
