import React, { useState } from 'react';
import { 
  Cpu, 
  Radio, 
  HardDrive, 
  CheckCircle2, 
  Settings, 
  Play, 
  Layers, 
  Wifi, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp03_WlcSimulator = ({ onMarkComplete, isCompleted }) => {
  // Configuration fields
  const [wlcName, setWlcName] = useState('WLC-LAB');
  const [mgmtIp, setMgmtIp] = useState('192.168.20.10');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [gateway, setGateway] = useState('192.168.20.1');
  const [ssid, setSsid] = useState('College_WLAN');
  const [vlanId, setVlanId] = useState('20');
  const [security, setSecurity] = useState('WPA2-Enterprise');

  // WLC lifecycle states
  const [wlcConfigured, setWlcConfigured] = useState(false);
  const [wlanCreated, setWlanCreated] = useState(false);
  const [apStatus, setApStatus] = useState({
    ap1: 'Discovered', // Discovered, Joining, Registered
    ap2: 'Discovered',
    ap3: 'Discovered'
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleConfigureWlc = () => {
    setWlcConfigured(true);
    setLogs(prev => [
      ...prev,
      `[WLC INIT] Controller "${wlcName}" initialized on IP ${mgmtIp}/${subnetMask}`,
      `[WLC CAPWAP] CAPWAP UDP listener started on ports 5246 (Control) & 5247 (Data)`
    ]);
  };

  const handleCreateWlan = () => {
    if (!wlcConfigured) {
      alert("Please configure WLC first.");
      return;
    }
    setWlanCreated(true);
    setLogs(prev => [
      ...prev,
      `[WLAN DEPLOY] Created WLAN profile "${ssid}" mapped to 802.1Q VLAN ${vlanId}`,
      `[WLAN SECURITY] Enforced ${security} with AES-CCMP encryption`
    ]);
  };

  const handleRegisterAps = () => {
    if (!wlcConfigured) {
      alert("Please configure the WLC controller first.");
      return;
    }
    setIsRegistering(true);
    setLogs(prev => [...prev, `[CAPWAP DISCOVERY] AP1, AP2, AP3 sending CAPWAP Discovery Requests to ${mgmtIp}...`]);

    setTimeout(() => {
      setApStatus(prev => ({ ...prev, ap1: 'Joining' }));
      setLogs(prev => [...prev, `[DTLS HANDSHAKE] AP1 (192.168.20.101) negotiating DTLS tunnel with ${wlcName}`]);
    }, 800);

    setTimeout(() => {
      setApStatus(prev => ({ ...prev, ap1: 'Registered', ap2: 'Joining' }));
      setLogs(prev => [...prev, `[JOIN ACCEPT] AP1 registered! CAPWAP tunnel active.`]);
    }, 1800);

    setTimeout(() => {
      setApStatus(prev => ({ ...prev, ap2: 'Registered', ap3: 'Joining' }));
      setLogs(prev => [...prev, `[JOIN ACCEPT] AP2 registered! Pushing WLAN "${ssid}" config.`]);
    }, 2800);

    setTimeout(() => {
      setApStatus({ ap1: 'Registered', ap2: 'Registered', ap3: 'Registered' });
      setIsRegistering(false);
      setLogs(prev => [
        ...prev,
        `[ALL APS REGISTERED] AP1, AP2, AP3 successfully bound to ${wlcName}. Broadcasting "${ssid}".`
      ]);
      if (!isCompleted) onMarkComplete();
    }, 3800);
  };

  const allRegistered = apStatus.ap1 === 'Registered' && apStatus.ap2 === 'Registered' && apStatus.ap3 === 'Registered';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              CENTRALIZED WIRELESS LAN CONTROLLER (WLC)
            </h3>
            <p className="text-xs text-slate-400">
              Split-MAC architecture, CAPWAP Discovery, and zero-touch AP registration.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Configuration */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80 space-y-4">
          <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-purple-400 pb-2 border-b border-cyber-800">
            WLC & WLAN Profiles
          </h4>

          <div className="space-y-3 text-xs font-mono">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">WLC Hostname:</label>
                <input
                  type="text"
                  value={wlcName}
                  onChange={(e) => setWlcName(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-purple-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Management IP:</label>
                <input
                  type="text"
                  value={mgmtIp}
                  onChange={(e) => setMgmtIp(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Subnet Mask:</label>
                <input
                  type="text"
                  value={subnetMask}
                  onChange={(e) => setSubnetMask(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Gateway:</label>
                <input
                  type="text"
                  value={gateway}
                  onChange={(e) => setGateway(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Broadcast SSID:</label>
                <input
                  type="text"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-cyan-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Tagged VLAN ID:</label>
                <input
                  type="text"
                  value={vlanId}
                  onChange={(e) => setVlanId(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-amber-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Security Mode:</label>
              <select
                value={security}
                onChange={(e) => setSecurity(e.target.value)}
                className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
              >
                <option value="WPA2-Enterprise">WPA2-Enterprise (802.1X / RADIUS)</option>
                <option value="WPA2-Personal">WPA2-Personal (Pre-Shared Key)</option>
                <option value="WPA3-Enterprise">WPA3-Enterprise (CNSA 192-bit)</option>
              </select>
            </div>
          </div>

          {/* 3 Step Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfigureWlc}
              className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                wlcConfigured
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{wlcConfigured ? '1. WLC CONFIGURED' : '1. CONFIGURE WLC'}</span>
            </button>

            <button
              onClick={handleCreateWlan}
              disabled={!wlcConfigured}
              className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-40 ${
                wlanCreated
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-black'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>{wlanCreated ? '2. WLAN CREATED' : '2. CREATE WLAN'}</span>
            </button>

            <button
              onClick={handleRegisterAps}
              disabled={!wlcConfigured || isRegistering}
              className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-glow-cyan disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRegistering ? 'animate-spin' : ''}`} />
              <span>{isRegistering ? 'REGISTERING ACCESS POINTS...' : '3. REGISTER ACCESS POINT'}</span>
            </button>
          </div>
        </div>

        {/* Right Panel: WLC Star-Bus Topology & Console */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-cyber-950 border border-cyber-700/80">
            <div className="text-xs font-mono text-purple-400 mb-4 flex items-center justify-between">
              <span>WLC TOPOLOGY: AP1, AP2, AP3 ── CAPWAP TUNNEL ── WLC ── CORE</span>
              <span className={`text-[11px] px-2 py-0.5 rounded ${
                allRegistered ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-cyber-800 text-slate-400'
              }`}>
                {allRegistered ? 'ALL 3 LAPs REGISTERED' : 'Awaiting CAPWAP Joins'}
              </span>
            </div>

            {/* Visual Topology Block */}
            <div className="py-6 px-4 flex items-center justify-between relative">
              {/* Left Column: 3 LAPs */}
              <div className="flex flex-col space-y-3 z-10">
                {['ap1', 'ap2', 'ap3'].map((apKey, idx) => {
                  const status = apStatus[apKey];
                  const label = `AP-${idx + 1} (Floor ${idx + 1})`;
                  const ip = `192.168.20.10${idx + 1}`;
                  return (
                    <div
                      key={apKey}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                        status === 'Registered'
                          ? 'bg-emerald-950/30 border-emerald-500/60 shadow-glow-teal-sm'
                          : status === 'Joining'
                          ? 'bg-amber-950/30 border-amber-500/60 animate-pulse'
                          : 'bg-cyber-900 border-cyber-800'
                      }`}
                    >
                      <Radio className={`w-5 h-5 ${status === 'Registered' ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <div>
                        <div className="text-xs font-mono font-bold text-white">{label}</div>
                        <div className="text-[10px] font-mono text-slate-400">{ip}</div>
                      </div>
                      <span className={`text-[9px] font-mono ml-2 px-1.5 py-0.5 rounded ${
                        status === 'Registered' ? 'bg-emerald-900 text-emerald-300' : 'bg-cyber-800 text-slate-500'
                      }`}>
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Central CAPWAP Bus Line */}
              <div className="flex-1 mx-4 h-[2px] bg-cyber-800 relative">
                {isRegistering && (
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 animate-pulse"></div>
                )}
              </div>

              {/* Center: WLC */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                  wlcConfigured
                    ? 'bg-purple-950/60 border-2 border-purple-500 shadow-glow-cyan text-purple-300'
                    : 'bg-cyber-850 border border-cyber-700 text-slate-600'
                }`}>
                  <Cpu className="w-8 h-8" />
                </div>
                <span className="font-mono font-bold text-xs text-white mt-2">{wlcName}</span>
                <span className="font-mono text-[10px] text-purple-400 mt-0.5">{mgmtIp}</span>
              </div>

              {/* Right Line to Core Network */}
              <div className="flex-1 mx-4 h-[2px] bg-cyber-800"></div>

              {/* Right: Core Network */}
              <div className="flex flex-col items-center z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyber-850 border border-cyber-700 flex items-center justify-center text-cyan-400">
                  <HardDrive className="w-7 h-7" />
                </div>
                <span className="font-mono font-bold text-xs text-white mt-2">Core Switch</span>
                <span className="font-mono text-[10px] text-cyan-400 mt-0.5">VLAN {vlanId}</span>
              </div>
            </div>
          </div>

          {/* Console Output */}
          <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-800 font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 pb-1 border-b border-cyber-800 mb-1">
              <span className="text-purple-400 font-bold">WLC CONSOLE CLI</span>
            </div>
            {logs.length === 0 ? (
              <div className="text-slate-600 italic">Click [1. CONFIGURE WLC] to start...</div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="leading-tight">
                  <span className="text-purple-400">{log.split(' ')[0]}</span>{' '}
                  <span className="text-slate-300">{log.split(' ').slice(1).join(' ')}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
