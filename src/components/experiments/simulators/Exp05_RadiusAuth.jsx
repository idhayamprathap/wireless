import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Laptop, 
  Radio, 
  Cpu, 
  Server, 
  Lock, 
  Unlock, 
  Play, 
  CheckCircle2, 
  ArrowRight,
  Key
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp05_RadiusAuth = ({ onMarkComplete, isCompleted }) => {
  const [wlcIp, setWlcIp] = useState('192.168.40.20');
  const [ssid, setSsid] = useState('Secure_WLAN');
  const [vlanId, setVlanId] = useState('40');
  const [radiusIp, setRadiusIp] = useState('192.168.40.10');
  const [authPort, setAuthPort] = useState('1812');
  const [sharedSecret, setSharedSecret] = useState('RadiusKey@2026');
  const [username, setUsername] = useState('student_user');
  const [password, setPassword] = useState('SecurePass#2026');

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 1: Client->AP, 2: AP->WLC, 3: WLC->RADIUS, 4: RADIUS Verify, 5: Granted
  const [authSuccess, setAuthSuccess] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);

  const handleStartAuth = () => {
    setIsAuthenticating(true);
    setAuthSuccess(false);
    setActiveStep(1);

    setAuditLogs([
      `[0.00s] Supplicant (${username}) initiated EAPOL-Start on SSID "${ssid}"`
    ]);

    // Step 1: Client -> AP (EAP-Response Identity)
    setTimeout(() => {
      setActiveStep(1);
      setAuditLogs(prev => [...prev, `[0.30s] [EAPOL] Client -> LAP: Identity Response (${username})`]);
    }, 600);

    // Step 2: AP -> WLC (CAPWAP 802.11 Control)
    setTimeout(() => {
      setActiveStep(2);
      setAuditLogs(prev => [...prev, `[0.90s] [CAPWAP] LAP -> WLC: Encapsulated 802.1X frame delivered`]);
    }, 1600);

    // Step 3: WLC -> RADIUS (Access-Request UDP 1812)
    setTimeout(() => {
      setActiveStep(3);
      setAuditLogs(prev => [
        ...prev,
        `[1.60s] [RADIUS] WLC (${wlcIp}) -> RADIUS (${radiusIp}:${authPort}): Access-Request (Protected with SharedSecret)`
      ]);
    }, 2800);

    // Step 4: RADIUS Server Verifies
    setTimeout(() => {
      setActiveStep(4);
      setAuditLogs(prev => [
        ...prev,
        `[2.30s] [AAA ENGINE] User credentials verified in enterprise LDAP directory. Generating Master Session Key (MSK)...`
      ]);
    }, 4000);

    // Step 5: RADIUS Access-Accept & Access Granted
    setTimeout(() => {
      setActiveStep(5);
      setIsAuthenticating(false);
      setAuthSuccess(true);
      setAuditLogs(prev => [
        ...prev,
        `[2.90s] [RADIUS] RADIUS -> WLC: Access-Accept (Attribute: VLAN ${vlanId})`,
        `[3.10s] [EAP-SUCCESS] WLC unblocks 802.1X controlled port. 4-Way WPA2 Handshake complete!`,
        `>>> AUTHENTICATION SUCCESSFUL — ACCESS GRANTED <<<`
      ]);
      if (!isCompleted) onMarkComplete();
    }, 5200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              ENTERPRISE 802.1X / RADIUS AUTHENTICATION
            </h3>
            <p className="text-xs text-slate-400">
              Supplicant, Authenticator (AP/WLC), and External AAA RADIUS server handshake.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Config */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80 space-y-4">
          <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-amber-400 pb-2 border-b border-cyber-800">
            AAA Server & 802.1X Settings
          </h4>

          <div className="space-y-3 text-xs font-mono">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">WLC Controller IP:</label>
                <input
                  type="text"
                  value={wlcIp}
                  onChange={(e) => setWlcIp(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">RADIUS Server IP:</label>
                <input
                  type="text"
                  value={radiusIp}
                  onChange={(e) => setRadiusIp(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-amber-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">SSID:</label>
                <input
                  type="text"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-cyan-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">VLAN ID:</label>
                <input
                  type="text"
                  value={vlanId}
                  onChange={(e) => setVlanId(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Auth Port:</label>
                <input
                  type="text"
                  value={authPort}
                  onChange={(e) => setAuthPort(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Shared Secret:</label>
                <input
                  type="password"
                  value={sharedSecret}
                  onChange={(e) => setSharedSecret(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-cyber-800">
              <span className="text-slate-400 block text-[11px] mb-1 font-semibold">User Credentials (Supplicant):</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full bg-cyber-800 border border-cyber-700 rounded px-2.5 py-1.5 text-xs text-slate-200"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-cyber-800 border border-cyber-700 rounded px-2.5 py-1.5 text-xs text-slate-200"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleStartAuth}
            disabled={isAuthenticating}
            className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-glow-orange transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Key className={`w-4 h-4 ${isAuthenticating ? 'animate-spin' : ''}`} />
            <span>{isAuthenticating ? 'VALIDATING WITH RADIUS...' : 'AUTHENTICATE CLIENT'}</span>
          </button>
        </div>

        {/* Right Panel: 802.1X Flow & Status */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-cyber-950 border border-cyber-700/80">
            <div className="text-xs font-mono text-amber-400 mb-4 flex items-center justify-between">
              <span>AUTHENTICATION PIPELINE: CLIENT ── AP ── WLC ── RADIUS</span>
              {authSuccess && (
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                  <Unlock className="w-3 h-3" />
                  AUTHENTICATION SUCCESSFUL
                </span>
              )}
            </div>

            {/* 4 Pipeline Stages */}
            <div className="grid grid-cols-4 gap-2 text-center py-4">
              {/* Client */}
              <div className={`p-3 rounded-xl border transition-all ${
                activeStep >= 1 ? 'bg-cyber-850 border-cyan-400 text-cyan-300' : 'bg-cyber-900 border-cyber-800 text-slate-600'
              }`}>
                <Laptop className="w-6 h-6 mx-auto mb-1" />
                <div className="text-[11px] font-mono font-bold text-white">Supplicant</div>
                <div className="text-[9px] font-mono text-slate-400">{username}</div>
              </div>

              {/* AP */}
              <div className={`p-3 rounded-xl border transition-all ${
                activeStep >= 2 ? 'bg-cyber-850 border-teal-400 text-teal-300' : 'bg-cyber-900 border-cyber-800 text-slate-600'
              }`}>
                <Radio className="w-6 h-6 mx-auto mb-1" />
                <div className="text-[11px] font-mono font-bold text-white">LAP</div>
                <div className="text-[9px] font-mono text-slate-400">Authenticator</div>
              </div>

              {/* WLC */}
              <div className={`p-3 rounded-xl border transition-all ${
                activeStep >= 3 ? 'bg-cyber-850 border-purple-400 text-purple-300' : 'bg-cyber-900 border-cyber-800 text-slate-600'
              }`}>
                <Cpu className="w-6 h-6 mx-auto mb-1" />
                <div className="text-[11px] font-mono font-bold text-white">WLC</div>
                <div className="text-[9px] font-mono text-slate-400">{wlcIp}</div>
              </div>

              {/* RADIUS */}
              <div className={`p-3 rounded-xl border transition-all ${
                activeStep >= 4 ? 'bg-cyber-850 border-amber-400 text-amber-300' : 'bg-cyber-900 border-cyber-800 text-slate-600'
              }`}>
                <Server className="w-6 h-6 mx-auto mb-1" />
                <div className="text-[11px] font-mono font-bold text-white">RADIUS AAA</div>
                <div className="text-[9px] font-mono text-slate-400">Port {authPort}</div>
              </div>
            </div>

            {/* Banner Result */}
            {authSuccess && (
              <div className="mt-2 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    ACCESS GRANTED — VLAN {vlanId}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5 font-tech">
                    Master Session Key (MSK) installed. Station port unblocked.
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
            )}
          </div>

          {/* Audit Logs Console */}
          <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-800 font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 pb-1 border-b border-cyber-800 mb-1">
              <span className="text-amber-400 font-bold">RADIUS AAA AUDIT LOG</span>
            </div>
            {auditLogs.length === 0 ? (
              <div className="text-slate-600 italic">Click [AUTHENTICATE CLIENT] to trigger 802.1X exchange...</div>
            ) : (
              auditLogs.map((log, idx) => (
                <div key={idx} className={log.includes('SUCCESSFUL') ? 'text-emerald-400 font-bold' : ''}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
