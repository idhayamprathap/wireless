import React from 'react';
import { useLab } from '../context/LabContext';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { LiveTelemetry } from '../components/dashboard/LiveTelemetry';
import { BadgesSection } from '../components/dashboard/BadgesSection';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { 
  Activity, 
  Layers, 
  Wifi, 
  Bluetooth, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  Cpu,
  FileText
} from 'lucide-react';

export const DashboardPage = () => {
  const { setActiveTab } = useLab();

  const labHubs = [
    { id: 'experiments', title: 'All 19 Experiments', desc: '10-tab interactive lab modules with theory and procedures.', icon: Layers, color: 'text-cyan-400' },
    { id: 'simulations', title: 'Virtual Simulations Hub', desc: 'Universal comm flow and build-your-own network topology canvas.', icon: Cpu, color: 'text-teal-400' },
    { id: 'analyzer', title: 'Wi-Fi & Channel Analyzer', desc: '2.4 & 5 GHz channel overlap graphs and interference meters.', icon: Wifi, color: 'text-blue-400' },
    { id: 'modulation', title: 'Analog & Digital Modulation', desc: 'Real-time AM/FM/PM, BASK/BFSK/BPSK/QPSK waveforms.', icon: Activity, color: 'text-amber-400' },
    { id: 'bluetooth', title: 'Bluetooth Discovery & Chat', desc: 'BLE advertising scanner, GATT inspector, and RFCOMM chat.', icon: Bluetooth, color: 'text-purple-400' },
    { id: 'security', title: 'WLAN Security & Audit', desc: 'WLC + RADIUS 802.1X enterprise and security report generator.', icon: ShieldCheck, color: 'text-rose-400' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            COMMAND CONSOLE
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            Live Laboratory Dashboard
          </h1>
        </div>
        <SimulationBadge />
      </div>

      {/* Real-time Telemetry Deck */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-slate-400 font-bold">
          SYSTEM TELEMETRY:
        </span>
        <LiveTelemetry />
      </div>

      {/* Main Stats Overview & Continue Laboratory Card */}
      <StatsOverview />

      {/* Achievement Badges */}
      <BadgesSection />

      {/* Quick Launchpad Hubs */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold">
          SPECIALIZED LABORATORY STUDIOS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {labHubs.map((hub) => {
            const Icon = hub.icon;
            return (
              <div
                key={hub.id}
                onClick={() => { setActiveTab(hub.id); window.scrollTo(0,0); }}
                className="glass-card rounded-2xl p-5 border border-cyber-700/80 hover:border-cyan-500/50 cursor-pointer transition-all hover:scale-[1.01] group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyber-900 border border-cyber-800 flex items-center justify-center mb-3">
                    <Icon className={`w-5 h-5 ${hub.color}`} />
                  </div>
                  <h3 className="font-mono font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {hub.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-tech mt-1.5 leading-relaxed">
                    {hub.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cyber-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
                  <span>Launch Studio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
