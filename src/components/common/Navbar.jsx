import React, { useState } from 'react';
import { useLab } from '../../context/LabContext';
import { 
  Radio, 
  Search, 
  Menu, 
  X, 
  Cpu, 
  Activity, 
  Wifi, 
  Bluetooth, 
  ShieldCheck, 
  HelpCircle, 
  TrendingUp,
  FileText,
  Layers
} from 'lucide-react';

export const Navbar = () => {
  const { activeTab, setActiveTab, setIsSearchOpen, completedCount, totalCount } = useLab();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Radio },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'experiments', label: 'Experiments', icon: Layers, badge: `${completedCount}/${totalCount}` },
    { id: 'simulations', label: 'Simulations', icon: Cpu },
    { id: 'analyzer', label: 'Analyzer', icon: Wifi },
    { id: 'modulation', label: 'Modulation', icon: Activity },
    { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'viva', label: 'Viva', icon: HelpCircle },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'notes', label: 'My Notes', icon: FileText }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyber-700/80 bg-cyber-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-teal-500/10 to-blue-600/30 border border-cyan-500/50 group-hover:border-cyan-400 group-hover:shadow-glow-cyan transition-all">
            <Radio className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-xl tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                WCC
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                v2.6 LAB
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 tracking-tight leading-none group-hover:text-slate-300">
              Wireless Communication Command Center
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'experiments' && activeTab === 'experiment-detail');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-300 bg-cyber-800/90 border border-cyan-500/40 shadow-glow-cyan-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1 rounded font-mono ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyber-800 text-slate-400'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Search & Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyber-900/90 border border-cyber-700/80 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all shadow-inner"
            title="Global Search (Press / or Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search Lab...</span>
            <kbd className="hidden sm:inline-block text-[10px] bg-cyber-800 px-1.5 py-0.5 rounded text-slate-400 border border-cyber-700">
              ⌘K
            </kbd>
          </button>

          {/* Quick Telemetry Indicator */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-cyber-900/80 border border-cyber-700/70 text-[11px] font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">-48 dBm</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-cyber-900 border border-cyber-700 text-slate-300 hover:text-cyan-400 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-cyber-700 bg-cyber-950/98 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyber-850 border border-cyan-500/40 shadow-glow-cyan-sm'
                      : 'text-slate-400 hover:text-white hover:bg-cyber-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-cyber-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>PROGRESS: {completedCount}/{totalCount} Completed</span>
            <span className="text-cyan-400 font-bold">{Math.round((completedCount/totalCount)*100)}%</span>
          </div>
        </div>
      )}
    </header>
  );
};
