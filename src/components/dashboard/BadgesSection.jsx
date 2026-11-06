import React from 'react';
import { useLab } from '../../context/LabContext';
import { Award, Zap, ShieldCheck, Crown, Lock } from 'lucide-react';

export const BadgesSection = () => {
  const { badges, completedCount } = useLab();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Award': return Award;
      case 'Zap': return Zap;
      case 'ShieldCheck': return ShieldCheck;
      case 'Crown': return Crown;
      default: return Award;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-cyber-700/80">
      <div className="flex items-center justify-between pb-4 border-b border-cyber-800">
        <div>
          <h3 className="font-mono font-bold text-base text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            ACHIEVEMENT BADGES
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Earn official laboratory milestones as you complete virtual experiments.
          </p>
        </div>
        <span className="text-xs font-mono text-cyan-400">
          {badges.filter(b => b.unlocked).length} / {badges.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {badges.map((badge) => {
          const Icon = getIcon(badge.icon);
          return (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-amber-500/10 via-cyber-850 to-cyber-900 border-amber-500/40 shadow-glow-orange-sm'
                  : 'bg-cyber-900/50 border-cyber-800 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    badge.unlocked
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-cyber-800 text-slate-600 border border-cyber-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {badge.unlocked ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-800 text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    LOCKED
                  </span>
                )}
              </div>

              <div className="mt-4">
                <h4 className={`font-mono font-bold text-sm ${badge.unlocked ? 'text-amber-300' : 'text-slate-400'}`}>
                  {badge.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
