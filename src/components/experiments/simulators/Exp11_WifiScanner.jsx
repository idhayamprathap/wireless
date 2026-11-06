import React, { useState } from 'react';
import { 
  Wifi, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Radio, 
  Filter, 
  Signal, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp11_WifiScanner = ({ onMarkComplete, isCompleted }) => {
  const [bandFilter, setBandFilter] = useState('ALL'); // 'ALL', '2.4', '5'
  const [securityFilter, setSecurityFilter] = useState('ALL'); // 'ALL', 'WPA2', 'WPA3', 'OPEN'
  const [isScanning, setIsScanning] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  const demoNetworks = [
    {
      id: "net-1",
      ssid: "College_WiFi",
      channel: 6,
      frequency: "2.437 GHz",
      band: "2.4",
      rssi: -52,
      quality: 88,
      security: "WPA2-Enterprise",
      secType: "WPA2",
      bssid: "00:14:22:01:23:45",
      status: "Active Broadcast",
      clients: 42
    },
    {
      id: "net-2",
      ssid: "Lab_WiFi",
      channel: 36,
      frequency: "5.180 GHz",
      band: "5",
      rssi: -45,
      quality: 95,
      security: "WPA3-Personal",
      secType: "WPA3",
      bssid: "70:81:05:44:99:A1",
      status: "Active Broadcast",
      clients: 18
    },
    {
      id: "net-3",
      ssid: "Guest_WiFi",
      channel: 1,
      frequency: "2.412 GHz",
      band: "2.4",
      rssi: -78,
      quality: 42,
      security: "Open (None)",
      secType: "OPEN",
      bssid: "CC:44:88:99:00:11",
      status: "Captive Portal",
      clients: 9
    },
    {
      id: "net-4",
      ssid: "Student_Network",
      channel: 11,
      frequency: "2.462 GHz",
      band: "2.4",
      rssi: -64,
      quality: 72,
      security: "WPA2-Personal (AES)",
      secType: "WPA2",
      bssid: "E8:65:D4:AA:77:21",
      status: "Active Broadcast",
      clients: 67
    },
    {
      id: "net-5",
      ssid: "IoT_Lab",
      channel: 149,
      frequency: "5.745 GHz",
      band: "5",
      rssi: -70,
      quality: 58,
      security: "WPA3-Enterprise",
      secType: "WPA3",
      bssid: "AC:7F:3E:22:11:00",
      status: "Restricted M2M",
      clients: 24
    }
  ];

  const filteredNetworks = demoNetworks.filter(net => {
    if (bandFilter !== 'ALL' && net.band !== bandFilter) return false;
    if (securityFilter !== 'ALL' && net.secType !== securityFilter) return false;
    return true;
  });

  const handleScan = () => {
    setIsScanning(true);
    setSelectedNetwork(null);
    setTimeout(() => {
      setIsScanning(false);
      setSelectedNetwork(demoNetworks[0]);
      if (!isCompleted) onMarkComplete();
    }, 2000);
  };

  const renderSignalBars = (rssi) => {
    const bars = rssi >= -55 ? 4 : rssi >= -67 ? 3 : rssi >= -78 ? 2 : 1;
    return (
      <div className="flex items-end gap-0.5 h-4">
        {[1, 2, 3, 4].map(b => (
          <div
            key={b}
            style={{ height: `${b * 25}%` }}
            className={`w-1 rounded-sm ${b <= bars ? 'bg-cyan-400' : 'bg-cyber-800'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              SIMULATED 802.11 WI-FI SCANNER
            </h3>
            <p className="text-xs text-slate-400">
              Discovers simulated beacon broadcasts across 2.4 GHz and 5 GHz frequency bands.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
        <div className="flex flex-wrap items-center gap-3">
          {/* Band Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-slate-400">Band:</span>
            <div className="flex rounded-lg bg-cyber-850 p-0.5 border border-cyber-700">
              {['ALL', '2.4', '5'].map(b => (
                <button
                  key={b}
                  onClick={() => setBandFilter(b)}
                  className={`px-2.5 py-1 rounded text-xs transition-all ${
                    bandFilter === b ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {b === 'ALL' ? 'All Bands' : `${b} GHz`}
                </button>
              ))}
            </div>
          </div>

          {/* Security Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-slate-400">Security:</span>
            <div className="flex rounded-lg bg-cyber-850 p-0.5 border border-cyber-700">
              {['ALL', 'WPA2', 'WPA3', 'OPEN'].map(s => (
                <button
                  key={s}
                  onClick={() => setSecurityFilter(s)}
                  className={`px-2.5 py-1 rounded text-xs transition-all ${
                    securityFilter === s ? 'bg-teal-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scan Trigger */}
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'SCANNING AIRWAVES...' : 'SCAN NETWORKS'}</span>
        </button>
      </div>

      {/* Discovered Networks Table */}
      <div className="p-5 rounded-xl bg-cyber-950 border border-cyber-700/80">
        <div className="flex items-center justify-between pb-3 border-b border-cyber-800 text-xs font-mono mb-3">
          <span className="text-cyan-400 font-bold">
            DISCOVERED WIRELESS NETWORKS ({filteredNetworks.length})
          </span>
          <span className="text-slate-400 text-[11px]">
            DEMO / SIMULATION DATA
          </span>
        </div>

        {isScanning ? (
          <div className="py-14 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-cyan-300">
              DWELLING ACROSS CHANNELS 1-13 (2.4 GHz) & 36-165 (5 GHz)...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-slate-200 border-collapse">
              <thead>
                <tr className="border-b border-cyber-800 text-slate-400 bg-cyber-900/60">
                  <th className="p-3">SSID</th>
                  <th className="p-3">Channel</th>
                  <th className="p-3">Frequency</th>
                  <th className="p-3">Signal (RSSI)</th>
                  <th className="p-3">Security Suite</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-800/80">
                {filteredNetworks.map((net) => {
                  const isSelected = selectedNetwork?.id === net.id;
                  return (
                    <tr
                      key={net.id}
                      onClick={() => setSelectedNetwork(net)}
                      className={`cursor-pointer transition-all ${
                        isSelected ? 'bg-cyan-950/40 border-l-2 border-cyan-400' : 'hover:bg-cyber-900/80'
                      }`}
                    >
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-cyan-400" />
                        <span>{net.ssid}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-cyber-800 text-cyan-300 border border-cyber-700">
                          Ch {net.channel}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300">{net.frequency}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {renderSignalBars(net.rssi)}
                          <span className={`font-bold ${net.rssi >= -60 ? 'text-emerald-400' : net.rssi >= -75 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {net.rssi} dBm
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          net.secType === 'WPA3' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          net.secType === 'WPA2' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                          'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {net.security}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px]">{net.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Network Inspection Card */}
      {selectedNetwork && (
        <div className="p-4 rounded-xl bg-cyber-850 border border-cyber-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 font-bold">
              SELECTED ACCESS POINT: {selectedNetwork.ssid}
            </div>
            <div className="text-xs font-mono text-slate-300 mt-1">
              BSSID: <span className="text-teal-300">{selectedNetwork.bssid}</span> • Clients Associated: <span className="text-amber-300">{selectedNetwork.clients}</span> • Signal Quality: <span className="text-emerald-300">{selectedNetwork.quality}%</span>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-cyber-900 px-3 py-1.5 rounded-lg border border-cyber-800">
            SIMULATION MODE ACTIVE
          </div>
        </div>
      )}
    </div>
  );
};
