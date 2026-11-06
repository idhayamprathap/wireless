import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Download, 
  Printer, 
  Lock, 
  Unlock,
  Radio,
  Sliders
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp15_SecurityReport = ({ onMarkComplete, isCompleted }) => {
  // Configuration options
  const [ssid, setSsid] = useState('Campus_Secure_WiFi');
  const [authMode, setAuthMode] = useState('WPA2-Enterprise'); // 'WPA3-SAE', 'WPA2-Enterprise', 'WPA2-Personal', 'WEP'
  const [encryption, setEncryption] = useState('AES-CCMP'); // 'AES-CCMP', 'TKIP', 'None'
  const [passwordPolicy, setPasswordPolicy] = useState('STRONG'); // 'STRONG', 'MODERATE', 'WEAK'
  const [wpaVersion, setWpaVersion] = useState('WPA2/WPA3 Mixed'); // 'WPA3 Only', 'WPA2/WPA3 Mixed', 'WPA2 Only', 'WPA1/Legacy'
  const [wpsEnabled, setWpsEnabled] = useState(false);
  const [radiusIntegrated, setRadiusIntegrated] = useState(true);
  const [guestIsolation, setGuestIsolation] = useState(true);

  const [reportGenerated, setReportGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Compute security status and score
  const calculateAudit = () => {
    let score = 100;
    const issues = [];
    const recommendations = [];

    // Check Auth
    let authStatus = 'SECURE';
    if (authMode === 'WEP') {
      score -= 50;
      authStatus = 'REVIEW';
      issues.push("WEP encryption is obsolete and fundamentally broken; RC4 key recovery is trivial.");
      recommendations.push("Upgrade immediately to WPA2-Enterprise or WPA3-Personal.");
    } else if (authMode === 'WPA2-Personal' && passwordPolicy === 'WEAK') {
      score -= 25;
      authStatus = 'WARNING';
      issues.push("WPA2-PSK with weak password is vulnerable to offline dictionary brute-forcing.");
      recommendations.push("Enforce complex 16+ character passphrases or migrate to 802.1X.");
    }

    // Check Encryption
    let encStatus = 'SECURE';
    if (encryption === 'TKIP') {
      score -= 20;
      encStatus = 'WARNING';
      issues.push("TKIP cipher relies on deprecated RC4 and limits Wi-Fi throughput to 54 Mbps.");
      recommendations.push("Enforce pure AES-CCMP (or GCMP-256 for WPA3).");
    } else if (encryption === 'None') {
      score -= 40;
      encStatus = 'REVIEW';
      issues.push("Open network transmits all frame payloads in unencrypted plaintext.");
      recommendations.push("Enable Opportunistic Wireless Encryption (OWE / Enhanced Open) or WPA3.");
    }

    // Check WPS
    let accessStatus = 'SECURE';
    if (wpsEnabled) {
      score -= 25;
      accessStatus = 'WARNING';
      issues.push("Wi-Fi Protected Setup (WPS) PIN feature enables offline brute-force attack vectors.");
      recommendations.push("Disable WPS PIN in AP firmware immediately.");
    }

    // Check RADIUS
    let entStatus = radiusIntegrated ? 'SECURE' : 'REVIEW';
    if (!radiusIntegrated && authMode.includes('Enterprise')) {
      score -= 20;
      entStatus = 'REVIEW';
      issues.push("Enterprise mode selected but RADIUS AAA server integration is missing.");
      recommendations.push("Point WLC to active RADIUS/NPS server on UDP port 1812.");
    }

    // Check Guest Isolation
    if (!guestIsolation) {
      score -= 10;
      issues.push("Guest clients can access internal subnet workstations without client isolation.");
      recommendations.push("Enable Layer 2 Client Isolation (Private VLAN) on guest SSIDs.");
    }

    const finalScore = Math.max(10, Math.min(100, score));

    return {
      score: finalScore,
      authStatus,
      encStatus,
      accessStatus,
      entStatus,
      issues,
      recommendations
    };
  };

  const audit = calculateAudit();

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      if (!isCompleted) onMarkComplete();
    }, 1200);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SECURE':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">SECURE</span>;
      case 'WARNING':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">WARNING</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">REVIEW</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              WLAN SECURITY AUDIT & REPORT GENERATOR
            </h3>
            <p className="text-xs text-slate-400">
              Audit simulated wireless security configurations, calculate risk scores, and generate hardening reports.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration Form */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80 space-y-4">
          <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-amber-400 pb-2 border-b border-cyber-800">
            Wireless Security Policies
          </h4>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Target SSID:</label>
              <input
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-cyan-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Authentication Protocol:</label>
              <select
                value={authMode}
                onChange={(e) => setAuthMode(e.target.value)}
                className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
              >
                <option value="WPA3-SAE">WPA3-Personal (Dragonfly SAE)</option>
                <option value="WPA2-Enterprise">WPA2-Enterprise (802.1X / EAP)</option>
                <option value="WPA2-Personal">WPA2-Personal (Pre-Shared Key)</option>
                <option value="WEP">WEP (Legacy 64/128-bit RC4)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Encryption:</label>
                <select
                  value={encryption}
                  onChange={(e) => setEncryption(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                >
                  <option value="AES-CCMP">AES-CCMP (128-bit)</option>
                  <option value="TKIP">TKIP (Legacy RC4)</option>
                  <option value="None">None (Open/Cleartext)</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Password Policy:</label>
                <select
                  value={passwordPolicy}
                  onChange={(e) => setPasswordPolicy(e.target.value)}
                  className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                >
                  <option value="STRONG">Strong (16+ chars)</option>
                  <option value="MODERATE">Moderate (8-10 chars)</option>
                  <option value="WEAK">Weak (&lt;8 chars)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">WPA Compatibility Version:</label>
              <select
                value={wpaVersion}
                onChange={(e) => setWpaVersion(e.target.value)}
                className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
              >
                <option value="WPA3 Only">WPA3 Only (High Security)</option>
                <option value="WPA2/WPA3 Mixed">WPA2 / WPA3 Mixed Mode</option>
                <option value="WPA2 Only">WPA2 Only</option>
                <option value="WPA1/Legacy">WPA1 / Legacy</option>
              </select>
            </div>

            {/* Checkbox Toggles */}
            <div className="pt-2 border-t border-cyber-800 space-y-2 text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wpsEnabled}
                  onChange={(e) => setWpsEnabled(e.target.checked)}
                  className="accent-amber-400 rounded"
                />
                <span>Enable WPS (Wi-Fi Protected Setup)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={radiusIntegrated}
                  onChange={(e) => setRadiusIntegrated(e.target.checked)}
                  className="accent-cyan-400 rounded"
                />
                <span>Centralized RADIUS AAA Server Active</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={guestIsolation}
                  onChange={(e) => setGuestIsolation(e.target.checked)}
                  className="accent-teal-400 rounded"
                />
                <span>Client L2 Isolation (Guest Network)</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-glow-orange transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FileText className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'GENERATING REPORT...' : 'GENERATE SECURITY REPORT'}</span>
          </button>
        </div>

        {/* Right: Security Status & Generated Report */}
        <div className="lg:col-span-7 space-y-4">
          {/* Status Matrix */}
          <div className="p-5 rounded-xl bg-cyber-950 border border-cyber-700/80">
            <div className="flex items-center justify-between pb-3 border-b border-cyber-800 text-xs font-mono mb-4">
              <span className="text-cyan-400 font-bold">LIVE SECURITY POSTURE MATRIX</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Score:</span>
                <span className={`text-base font-bold ${audit.score >= 80 ? 'text-emerald-400' : audit.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {audit.score} / 100
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-cyber-900 border border-cyber-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Authentication</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">{authMode}</div>
                </div>
                {getStatusBadge(audit.authStatus)}
              </div>

              <div className="p-3 rounded-xl bg-cyber-900 border border-cyber-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Encryption Cipher</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">{encryption}</div>
                </div>
                {getStatusBadge(audit.encStatus)}
              </div>

              <div className="p-3 rounded-xl bg-cyber-900 border border-cyber-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Access Control</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">WPS {wpsEnabled ? 'Active' : 'Off'}</div>
                </div>
                {getStatusBadge(audit.accessStatus)}
              </div>

              <div className="p-3 rounded-xl bg-cyber-900 border border-cyber-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Enterprise AAA</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">{radiusIntegrated ? 'RADIUS Linked' : 'Stand-Alone'}</div>
                </div>
                {getStatusBadge(audit.entStatus)}
              </div>
            </div>
          </div>

          {/* Generated Formal Report */}
          {reportGenerated && (
            <div className="p-5 rounded-xl bg-cyber-850 border-2 border-cyan-500/40 shadow-glow-cyan-sm space-y-4 animate-in fade-in zoom-in-95 duration-200 font-tech">
              <div className="flex items-center justify-between pb-3 border-b border-cyber-700">
                <div>
                  <h4 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    WLAN SECURITY CONFIGURATION AUDIT REPORT
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Target: {ssid} • Generated in Educational Simulation Mode
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => window.print()}
                    className="p-1.5 rounded-lg bg-cyber-800 hover:bg-cyber-700 text-slate-300 text-xs font-mono border border-cyber-700 flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Identified Issues */}
              <div>
                <h5 className="font-mono font-bold text-xs uppercase text-rose-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Potential Configuration Issues ({audit.issues.length})
                </h5>
                {audit.issues.length === 0 ? (
                  <p className="text-xs text-emerald-400 font-mono bg-emerald-950/40 p-2.5 rounded border border-emerald-800">
                    No critical vulnerabilities detected in target wireless configuration.
                  </p>
                ) : (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {audit.issues.map((issue, idx) => (
                      <li key={idx} className="p-2 rounded bg-cyber-900 border border-rose-900/40 flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Hardening Recommendations */}
              <div>
                <h5 className="font-mono font-bold text-xs uppercase text-teal-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Hardening Recommendations ({audit.recommendations.length})
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {audit.recommendations.map((rec, idx) => (
                    <li key={idx} className="p-2 rounded bg-cyber-900 border border-teal-900/40 flex items-start gap-2">
                      <span className="text-teal-400 font-bold">✓</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
