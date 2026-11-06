import React, { useState } from 'react';
import { 
  Server, 
  Monitor, 
  HardDrive, 
  Play, 
  CheckCircle2, 
  Settings, 
  Terminal, 
  Send,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp04_ServerClientPing = ({ onMarkComplete, isCompleted }) => {
  const [serverIp, setServerIp] = useState('192.168.30.10');
  const [pc1Ip, setPc1Ip] = useState('192.168.30.11');
  const [pc2Ip, setPc2Ip] = useState('192.168.30.12');
  const [pc3Ip, setPc3Ip] = useState('192.168.30.13');

  const [serverConfigured, setServerConfigured] = useState(false);
  const [clientsConfigured, setClientsConfigured] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [activeHop, setActiveHop] = useState(0); // 1: PC1->Switch, 2: Switch->Server, 3: Server->Switch, 4: Switch->PC1
  const [pingSuccess, setPingSuccess] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);

  const handleConfigureServer = () => {
    setServerConfigured(true);
    setTerminalLines(prev => [
      ...prev,
      `[SERVER CONFIG] IP ${serverIp} mask 255.255.255.0 set on eth0. Service daemon listening.`
    ]);
  };

  const handleConfigureClients = () => {
    setClientsConfigured(true);
    setTerminalLines(prev => [
      ...prev,
      `[CLIENT CONFIG] PC1 set to ${pc1Ip}, PC2 set to ${pc2Ip}, PC3 set to ${pc3Ip}. Default GW: 192.168.30.1`
    ]);
  };

  const handleTestConnectivity = () => {
    if (!serverConfigured || !clientsConfigured) {
      alert("Please configure both Server and Clients first.");
      return;
    }
    setIsPinging(true);
    setPingSuccess(false);
    setActiveHop(1);

    setTerminalLines(prev => [
      ...prev,
      `user@PC1:~$ ping -c 4 ${serverIp}`,
      `PING ${serverIp} (${serverIp}) 56(84) bytes of data.`
    ]);

    // Hop 1: PC1 -> Switch
    setTimeout(() => {
      setActiveHop(2);
    }, 700);

    // Hop 2: Switch -> Server (Echo Request)
    setTimeout(() => {
      setActiveHop(3);
      setTerminalLines(prev => [...prev, `64 bytes from ${serverIp}: icmp_seq=1 ttl=64 time=1.24 ms`]);
    }, 1500);

    // Hop 3: Server -> Switch (Echo Reply)
    setTimeout(() => {
      setActiveHop(4);
    }, 2200);

    // Hop 4: Switch -> PC1 (Complete)
    setTimeout(() => {
      setActiveHop(0);
      setIsPinging(false);
      setPingSuccess(true);
      setTerminalLines(prev => [
        ...prev,
        `64 bytes from ${serverIp}: icmp_seq=2 ttl=64 time=1.12 ms`,
        `64 bytes from ${serverIp}: icmp_seq=3 ttl=64 time=1.31 ms`,
        `64 bytes from ${serverIp}: icmp_seq=4 ttl=64 time=1.09 ms`,
        `--- ${serverIp} ping statistics ---`,
        `4 packets transmitted, 4 received, 0% packet loss, time 3004ms`,
        `rtt min/avg/max = 1.09/1.19/1.31 ms`,
        `>>> PING SUCCESSFUL <<<`
      ]);
      if (!isCompleted) onMarkComplete();
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              CLIENT-SERVER NETWORK & ICMP CONNECTIVITY
            </h3>
            <p className="text-xs text-slate-400">
              Configure static subnets, Layer 2 switch forwarding, and run animated ICMP ping.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Config & Triggers */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80 space-y-4">
          <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-cyan-400 pb-2 border-b border-cyber-800">
            Network Addressing Setup
          </h4>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Central Server IP:</label>
              <input
                type="text"
                value={serverIp}
                onChange={(e) => setServerIp(e.target.value)}
                className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-cyan-300 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 block">Workstation Client IPs:</label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 block">PC1:</span>
                  <input
                    type="text"
                    value={pc1Ip}
                    onChange={(e) => setPc1Ip(e.target.value)}
                    className="w-full bg-cyber-800 border border-cyber-700 rounded px-2 py-1.5 text-[11px] text-slate-200"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">PC2:</span>
                  <input
                    type="text"
                    value={pc2Ip}
                    onChange={(e) => setPc2Ip(e.target.value)}
                    className="w-full bg-cyber-800 border border-cyber-700 rounded px-2 py-1.5 text-[11px] text-slate-200"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">PC3:</span>
                  <input
                    type="text"
                    value={pc3Ip}
                    onChange={(e) => setPc3Ip(e.target.value)}
                    className="w-full bg-cyber-800 border border-cyber-700 rounded px-2 py-1.5 text-[11px] text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfigureServer}
              className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                serverConfigured
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50'
                  : 'bg-cyber-800 hover:bg-cyber-750 text-white border border-cyber-600'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{serverConfigured ? '1. SERVER CONFIGURED' : '1. CONFIGURE SERVER'}</span>
            </button>

            <button
              onClick={handleConfigureClients}
              className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                clientsConfigured
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50'
                  : 'bg-cyber-800 hover:bg-cyber-750 text-white border border-cyber-600'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{clientsConfigured ? '2. CLIENTS CONFIGURED' : '2. CONFIGURE CLIENTS'}</span>
            </button>

            <button
              onClick={handleTestConnectivity}
              disabled={isPinging}
              className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-glow-cyan disabled:opacity-50"
            >
              <Send className={`w-3.5 h-3.5 ${isPinging ? 'animate-pulse' : ''}`} />
              <span>{isPinging ? 'TRANSMITTING ICMP ECHO...' : '3. TEST CONNECTIVITY (PING)'}</span>
            </button>
          </div>
        </div>

        {/* Right Panel: Topology & Terminal */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-cyber-950 border border-cyber-700/80 relative">
            <div className="text-xs font-mono text-cyan-400 mb-4 flex items-center justify-between">
              <span>TOPOLOGY: SERVER ── SWITCH ── [PC1, PC2, PC3]</span>
              {pingSuccess && (
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  PING SUCCESSFUL
                </span>
              )}
            </div>

            {/* Tree Topology Structure */}
            <div className="py-4 flex flex-col items-center">
              {/* Server (Top) */}
              <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                serverConfigured ? 'bg-cyber-850 border-cyan-500/50 shadow-glow-cyan-sm' : 'bg-cyber-900 border-cyber-800'
              } ${activeHop === 2 || activeHop === 3 ? 'ring-2 ring-cyan-400' : ''}`}>
                <div className="w-10 h-10 rounded-lg bg-cyber-900 flex items-center justify-center text-cyan-400 border border-cyber-700">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white">Central Server</div>
                  <div className="text-[10px] font-mono text-cyan-300">{serverIp}</div>
                </div>
              </div>

              {/* Vertical link line to switch */}
              <div className="w-0.5 h-8 bg-cyber-700 my-1 relative">
                {(activeHop === 2 || activeHop === 3) && (
                  <div className="absolute inset-0 bg-cyan-400 animate-pulse"></div>
                )}
              </div>

              {/* Layer 2 Switch */}
              <div className="p-2.5 px-6 rounded-xl bg-cyber-850 border border-cyber-700 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-mono font-bold text-slate-200">24-Port L2 Switch (CAM Forwarding)</span>
              </div>

              {/* Bus branch to 3 PCs */}
              <div className="w-4/5 h-0.5 bg-cyber-700 my-2"></div>

              {/* 3 Client Workstations */}
              <div className="grid grid-cols-3 gap-4 w-full">
                {/* PC1 */}
                <div className={`p-2.5 rounded-xl border text-center transition-all ${
                  clientsConfigured ? 'bg-cyber-850 border-cyan-500/40' : 'bg-cyber-900 border-cyber-800'
                } ${activeHop === 1 || activeHop === 4 ? 'ring-2 ring-amber-400 bg-amber-950/20' : ''}`}>
                  <Monitor className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-[11px] font-mono font-bold text-white">PC1 (Tester)</div>
                  <div className="text-[10px] font-mono text-amber-300">{pc1Ip}</div>
                </div>

                {/* PC2 */}
                <div className="p-2.5 rounded-xl bg-cyber-900 border border-cyber-800 text-center">
                  <Monitor className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                  <div className="text-[11px] font-mono font-bold text-slate-300">PC2</div>
                  <div className="text-[10px] font-mono text-slate-400">{pc2Ip}</div>
                </div>

                {/* PC3 */}
                <div className="p-2.5 rounded-xl bg-cyber-900 border border-cyber-800 text-center">
                  <Monitor className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                  <div className="text-[11px] font-mono font-bold text-slate-300">PC3</div>
                  <div className="text-[10px] font-mono text-slate-400">{pc3Ip}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Ping Output */}
          <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-800 font-mono text-[11px] text-emerald-400 max-h-36 overflow-y-auto space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 pb-1 border-b border-cyber-800 mb-1">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>TERMINAL OUTPUT (PC1 PING CONSOLE)</span>
            </div>
            {terminalLines.length === 0 ? (
              <div className="text-slate-600 italic">Click [3. TEST CONNECTIVITY] to initiate ping...</div>
            ) : (
              terminalLines.map((line, idx) => (
                <div key={idx} className={line.includes('SUCCESSFUL') ? 'text-cyan-300 font-bold bg-cyan-950/60 p-1 rounded' : ''}>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
