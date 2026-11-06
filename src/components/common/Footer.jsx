import React from 'react';
import { useLab } from '../../context/LabContext';
import { Radio, ShieldAlert, Cpu, Award, BookOpen, Terminal } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, openExperiment } = useLab();

  return (
    <footer className="border-t border-cyber-700/80 bg-cyber-950/95 text-slate-400 mt-20 relative overflow-hidden">
      {/* Background glow strip */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyber-850 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-white text-base tracking-wider">
                  WIRELESS COMMUNICATION COMMAND CENTER
                </h3>
                <p className="text-xs text-cyan-400 font-medium">
                  Interactive Wireless Communication Laboratory
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A futuristic, interactive virtual laboratory platform for undergraduate Computer Science & Telecommunication Engineering students. Learn concepts, configure virtual networks, simulate wireless wave propagation, inspect frames, and test viva mastery.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-cyan-400/90">
              <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Simulated Lab Environment • Safe Demo Data Only</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => { setActiveTab('experiments'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">
                  19 Lab Experiments
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('simulations'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">
                  Virtual Simulations Hub
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('modulation'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">
                  Analog & Digital Modulation Lab
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('bluetooth'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">
                  Bluetooth Discovery & Chat
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('security'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">
                  WLAN Security & Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Academic & Assessment */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Evaluation & Tools
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => { setActiveTab('viva'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">
                  Viva Preparation Center
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('progress'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">
                  Progress Tracking & Badges
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('notes'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">
                  My Student Notes
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo(0,0); }} className="hover:text-cyan-400 transition-colors">
                  Laboratory Syllabus & Info
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-cyber-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 font-mono">
          <div>
            Educational Project • Simulation Environment
          </div>
          <div>
            Undergraduate Computer Science & Wireless Communication Practical Lab
          </div>
        </div>
      </div>
    </footer>
  );
};
