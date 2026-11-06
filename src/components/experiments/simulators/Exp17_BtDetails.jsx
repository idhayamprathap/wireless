import React, { useState } from 'react';
import { 
  Bluetooth, 
  Layers, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Volume2, 
  CheckCircle2, 
  Key, 
  Wifi, 
  Battery, 
  Info,
  Radio
} from 'lucide-react';
import { DEMO_BLUETOOTH_DEVICES } from '../../../data/bluetoothDevicesData';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp17_BtDetails = ({ onMarkComplete, isCompleted }) => {
  const [selectedDevice, setSelectedDevice] = useState(DEMO_BLUETOOTH_DEVICES[3]); // Smart Watch by default
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      if (!isCompleted) onMarkComplete();
    }, 1800);
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'Smartphone': return Smartphone;
      case 'Computer': return Laptop;
      case 'Audio Device': return Headphones;
      case 'Wearable': return Watch;
      default: return Volume2;
    }
  };

  const Icon = getDeviceIcon(selectedDevice.type);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Bluetooth className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              BLUETOOTH DEVICE GATT & PROFILE INSPECTOR
            </h3>
            <p className="text-xs text-slate-400">
              Inspect device specifications, GAP roles, GATT primary services, and 16-bit/128-bit UUIDs.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Device Picker Row */}
      <div className="p-4 rounded-xl bg-cyber-900/90 border border-cyber-700/80 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 font-bold mr-2">Select Target Device:</span>
        {DEMO_BLUETOOTH_DEVICES.map((d) => {
          const isCurrent = selectedDevice.id === d.id;
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDevice(d);
                setIsConnected(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                isCurrent
                  ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-glow-cyan-sm'
                  : 'bg-cyber-850 text-slate-400 border-cyber-700 hover:text-white'
              }`}
            >
              {d.name}
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Device Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Device Hardware & RF Overview */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-cyber-850 border border-cyber-700/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyber-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyber-900 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-white">
                  {selectedDevice.name}
                </h4>
                <span className="text-xs font-mono text-cyan-400">
                  {selectedDevice.type}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">
              <Battery className="w-4 h-4" />
              <span>{selectedDevice.battery}%</span>
            </div>
          </div>

          {/* Key Properties Grid */}
          <div className="space-y-2.5 text-xs font-mono text-slate-300">
            <div className="flex justify-between p-2 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500">BD_ADDR (MAC):</span>
              <span className="text-cyan-300 font-bold">{selectedDevice.address}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500">Bluetooth Version:</span>
              <span className="text-slate-200">{selectedDevice.version}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500">Signal RSSI:</span>
              <span className="text-emerald-400 font-bold">{selectedDevice.rssi} dBm</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500">Class of Device:</span>
              <span className="text-amber-300">{selectedDevice.classOfDevice}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500">Transmit Power:</span>
              <span className="text-slate-200">{selectedDevice.txPower}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500">Connection State:</span>
              <span className={isConnected ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {isConnected ? 'PAIRED & CONNECTED' : selectedDevice.status}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleConnect}
              disabled={isConnecting || isConnected}
              className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isConnected
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 shadow-glow-cyan'
              } disabled:opacity-50`}
            >
              <Bluetooth className={`w-4 h-4 ${isConnecting ? 'animate-spin' : ''}`} />
              <span>
                {isConnecting ? 'PAIRING VIA NUMERIC COMPARISON...' : isConnected ? 'CONNECTED (ENCRYPTED LINK)' : 'CONNECT SIMULATION'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: GATT Services Tree */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-cyber-950 border border-cyber-700/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyber-800 text-xs font-mono">
            <span className="text-blue-400 font-bold">
              SUPPORTED PROFILES & GATT SERVICES ({selectedDevice.services.length})
            </span>
            <span className="text-slate-500">GATT Database Hierarchy</span>
          </div>

          <div className="space-y-3">
            {selectedDevice.services.map((srv, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-cyber-900/80 border border-cyber-800 space-y-1.5 hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/80 font-bold">
                      {srv.uuid}
                    </span>
                    <span className="font-bold text-white">{srv.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{srv.type}</span>
                </div>
                <p className="text-xs text-slate-300 font-tech">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-cyber-900 border border-cyber-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Attributes expose Read, Write, Notify properties per Bluetooth Core 5.x specification.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
