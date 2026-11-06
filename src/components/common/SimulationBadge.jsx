import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const SimulationBadge = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-glow-cyan-sm backdrop-blur-md ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
      </span>
      <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
      <span>SIMULATION / DEMO DATA ONLY</span>
    </div>
  );
};
