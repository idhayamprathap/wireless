import React, { useState } from 'react';
import { 
  Laptop, 
  Radio, 
  Settings, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Server,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp02_DhcpSimulator = ({ onMarkComplete, isCompleted }) => {
  // Configuration state
  const [ssid, setSsid] = useState('College_WiFi');
  const [ipAddress, setIpAddress] = useState('192.168.10.1');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [gateway, setGateway] = useState('192.168.10.1');
  const [dhcpStart, setDhcpStart] = useState('192.168.10.100');
  const [dhcpEnd, setDhcpEnd] = useState('192.168.10.200');
  const [dnsServer, setDnsServer] = useState('8.8.8.8');

  // Simulation execution state
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Discover, 2: Offer, 3: Request, 4: ACK, 5: Bound
  const [assignedIp, setAssignedIp] = useState(null);
  const [logs, setLogs] = useState([]);

  const runDhcpHandshake = () => {
    setIsSimulating(true);
    setCurrentStep(1);
    setAssignedIp(null);
    setLogs([`[0.00s] AP Configured with SSID "${ssid}" & Scope ${dhcpStart} - ${dhcpEnd}`]);

    // Step 1: Discover
    setTimeout(() => {
      setCurrentStep(1);
      setLogs(prev => [...prev, `[0.25s] [DHCP DISCOVER] Laptop (0.0.0.0:68) -> Broadcast (255.255.255.255:67)`]);
    }, 500);

    // Step 2: Offer
    setTimeout(() => {
      setCurrentStep(2);
      setLogs(prev => [...prev, `[0.75s] [DHCP OFFER] AP (${ipAddress}:67) -> Offered IP ${dhcpStart} to Client`]);
    }, 1800);

    // Step 3: Request
    setTimeout(() => {
      setCurrentStep(3);
      setLogs(prev => [...prev, `[1.30s] [DHCP REQUEST] Laptop -> Accepting Offered IP ${dhcpStart}`]);
    }, 3100);

    // Step 4: ACK
    setTimeout(() => {
      setCurrentStep(4);
      setLogs(prev => [...prev, `[1.85s] [DHCP ACK] AP (${ipAddress}) -> Lease committed (24h). Subnet: ${subnetMask}, GW: ${gateway}, DNS: ${dnsServer}`]);
    }, 4400);

    // Step 5: Completed / Bound
    setTimeout(() => {
      setCurrentStep(5);
      setAssignedIp(dhcpStart);
      setIsSimulating(false);
      setLogs(prev => [...prev, `[2.10s] SUCCESS: IP ADDRESS ASSIGNED: ${dhcpStart}`]);
      if (!isCompleted) onMarkComplete();
    }, 5600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              ACCESS POINT & DHCP POOL CONFIGURATOR
            </h3>
            <p className="text-xs text-slate-400">
              Configure AP parameters and observe 4-way DORA packet exchange.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Main Configuration Form & DORA Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: AP Parameters */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80 space-y-4">
          <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-cyan-400 pb-2 border-b border-cyber-800">
            Access Point Settings
          </h4>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Wireless SSID:</label>
              <input
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                disabled={isSimulating}
                className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">AP IP Address:</label>
                <input
                  type="text"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  disabled={isSimulating}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Subnet Mask:</label>
                <input
                  type="text"
                  value={subnetMask}
                  onChange={(e) => setSubnetMask(e.target.value)}
                  disabled={isSimulating}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Default Gateway:</label>
              <input
                type="text"
                value={gateway}
                onChange={(e) => setGateway(e.target.value)}
                disabled={isSimulating}
                className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">DHCP Start IP:</label>
                <input
                  type="text"
                  value={dhcpStart}
                  onChange={(e) => setDhcpStart(e.target.value)}
                  disabled={isSimulating}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-teal-300 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">DHCP End IP:</label>
                <input
                  type="text"
                  value={dhcpEnd}
                  onChange={(e) => setDhcpEnd(e.target.value)}
                  disabled={isSimulating}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-teal-300 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">DNS Server:</label>
              <input
                type="text"
                value={dnsServer}
                onChange={(e) => setDnsServer(e.target.value)}
                disabled={isSimulating}
                className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            onClick={runDhcpHandshake}
            disabled={isSimulating}
            className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'EXECUTING DORA HANDSHAKE...' : 'CONFIGURE ACCESS POINT'}</span>
          </button>
        </div>

        {/* Right Panel: Animated DORA Handshake & Status */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Animated Exchange Stage */}
          <div className="p-5 rounded-xl bg-cyber-950 border border-cyber-700/80">
            <div className="flex items-center justify-between pb-3 border-b border-cyber-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold">DHCP 4-WAY HANDSHAKE (DORA)</span>
              <span className="text-slate-400">
                {currentStep === 0 && 'Ready to Connect'}
                {currentStep === 1 && '1/4: Discovering Server...'}
                {currentStep === 2 && '2/4: Offer Received'}
                {currentStep === 3 && '3/4: Requesting Lease...'}
                {currentStep === 4 && '4/4: ACK Received'}
                {currentStep === 5 && 'Connected & Bound'}
              </span>
            </div>

            {/* Visual Node Diagram */}
            <div className="py-8 px-4 flex items-center justify-between relative">
              {/* Client Node */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  assignedIp 
                    ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 shadow-glow-teal' 
                    : 'bg-cyber-850 text-cyan-400 border border-cyber-700'
                }`}>
                  <Laptop className="w-7 h-7" />
                </div>
                <span className="font-mono font-bold text-xs text-white mt-2">Wireless Laptop</span>
                <span className="font-mono text-[11px] text-cyan-300 mt-0.5">
                  {assignedIp ? assignedIp : '0.0.0.0 (Unbound)'}
                </span>
              </div>

              {/* Central Transmission Path with Step Arrows */}
              <div className="flex-1 mx-6 flex flex-col items-center justify-center space-y-2">
                {/* Step 1: Discover -> */}
                <div className={`w-full flex items-center justify-between px-3 py-1 rounded text-[10px] font-mono transition-all ${
                  currentStep === 1 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500 shadow-glow-cyan' 
                    : currentStep > 1 ? 'text-slate-500 bg-cyber-900/50' : 'text-slate-600'
                }`}>
                  <span>DHCP DISCOVER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

                {/* Step 2: <- Offer */}
                <div className={`w-full flex items-center justify-between px-3 py-1 rounded text-[10px] font-mono transition-all ${
                  currentStep === 2 
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500 shadow-glow-teal' 
                    : currentStep > 2 ? 'text-slate-500 bg-cyber-900/50' : 'text-slate-600'
                }`}>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>DHCP OFFER</span>
                </div>

                {/* Step 3: Request -> */}
                <div className={`w-full flex items-center justify-between px-3 py-1 rounded text-[10px] font-mono transition-all ${
                  currentStep === 3 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500 shadow-glow-orange' 
                    : currentStep > 3 ? 'text-slate-500 bg-cyber-900/50' : 'text-slate-600'
                }`}>
                  <span>DHCP REQUEST</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

                {/* Step 4: <- ACK */}
                <div className={`w-full flex items-center justify-between px-3 py-1 rounded text-[10px] font-mono transition-all ${
                  currentStep === 4 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' 
                    : currentStep > 4 ? 'text-slate-500 bg-cyber-900/50' : 'text-slate-600'
                }`}>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>DHCP ACK</span>
                </div>
              </div>

              {/* AP Node */}
              <div className="flex flex-col items-center z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyber-850 text-blue-400 border border-cyber-700 flex items-center justify-center">
                  <Radio className="w-7 h-7" />
                </div>
                <span className="font-mono font-bold text-xs text-white mt-2">AP-DHCP-Server</span>
                <span className="font-mono text-[11px] text-blue-300 mt-0.5">{ipAddress}</span>
              </div>
            </div>

            {/* Assignment Alert Banner */}
            {assignedIp && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center animate-in fade-in zoom-in-95 duration-200">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                  IP ADDRESS ASSIGNED
                </span>
                <span className="text-2xl font-mono font-black text-white mt-1 block">
                  {assignedIp}
                </span>
                <span className="text-xs font-mono text-slate-300 mt-1 block">
                  Subnet Mask: {subnetMask} • Gateway: {gateway} • DNS: {dnsServer}
                </span>
              </div>
            )}
          </div>

          {/* Console / Terminal Log Output */}
          <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-800 font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 pb-1 border-b border-cyber-800 mb-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>DHCP TRANSACTION LOG</span>
            </div>
            {logs.length === 0 ? (
              <div className="text-slate-600 italic">Click [CONFIGURE ACCESS POINT] to start transaction...</div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="leading-tight">
                  <span className="text-cyan-400">{log.slice(0, 8)}</span>
                  <span>{log.slice(8)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
