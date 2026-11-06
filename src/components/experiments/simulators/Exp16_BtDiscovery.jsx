import React, { useState } from 'react';
import { 
  Bluetooth, 
  RefreshCw, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Volume2, 
  Signal, 
  CheckCircle2,
  Radio
} from 'lucide-react';
import { DEMO_BLUETOOTH_DEVICES } from '../../../data/bluetoothDevicesData';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp16_BtDiscovery = ({ onMarkComplete, isCompleted, onSelectDeviceForDetails }) => {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const startDiscovery = () => {
    setIsScanning(true);
    setDevices([]);
    setSelectedDevice(null);

    // Staggered discovery animation
    DEMO_BLUETOOTH_DEVICES.forEach((dev, idx) => {
      setTimeout(() => {
        setDevices(prev => [...prev, dev]);
        if (idx === DEMO_BLUETOOTH_DEVICES.length - 1) {
          setIsScanning(false);
          setSelectedDevice(DEMO_BLUETOOTH_DEVICES[0]);
          if (!isCompleted) onMarkComplete();
        }
      }, (idx + 1) * 700);
    });
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Bluetooth className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              BLUETOOTH & BLE DEVICE INQUIRY DISCOVERY
            </h3>
            <p className="text-xs text-slate-400">
              Scans 2.4 GHz BLE advertising channels 37, 38, 39 and BR/EDR inquiry frequencies.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Discovery Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
        <button
          onClick={startDiscovery}
          disabled={isScanning}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'INQUIRY IN PROGRESS...' : 'START DISCOVERY'}</span>
        </button>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span>Inquiry Channel Hop Rate: 1600 hops/sec • 32 Carrier Frequencies</span>
        </div>
      </div>

      {/* Discovery Table & Radar Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table of Discovered Devices */}
        <div className="lg:col-span-8 p-5 rounded-xl bg-cyber-950 border border-cyber-700/80">
          <div className="flex items-center justify-between pb-3 border-b border-cyber-800 text-xs font-mono mb-3">
            <span className="text-blue-400 font-bold">
              DISCOVERED BLUETOOTH DEVICES ({devices.length} / {DEMO_BLUETOOTH_DEVICES.length})
            </span>
            <span className="text-slate-400 text-[11px]">
              DEMO DATA ONLY
            </span>
          </div>

          {devices.length === 0 && !isScanning ? (
            <div className="py-16 text-center space-y-2 text-slate-500 text-xs font-mono">
              <Bluetooth className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p>Click [START DISCOVERY] to initiate Bluetooth RF inquiry...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-cyber-800 text-slate-400 bg-cyber-900/60">
                    <th className="p-3">Device Name</th>
                    <th className="p-3">Device Type</th>
                    <th className="p-3">BD_ADDR (MAC)</th>
                    <th className="p-3">Signal (RSSI)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-800/80">
                  {devices.map((dev) => {
                    const Icon = getDeviceIcon(dev.type);
                    const isSelected = selectedDevice?.id === dev.id;
                    return (
                      <tr
                        key={dev.id}
                        onClick={() => setSelectedDevice(dev)}
                        className={`cursor-pointer transition-all ${
                          isSelected ? 'bg-blue-950/40 text-white font-bold border-l-2 border-blue-400' : 'hover:bg-cyber-900'
                        }`}
                      >
                        <td className="p-3 font-bold text-white flex items-center gap-2">
                          <Icon className="w-4 h-4 text-blue-400" />
                          <span>{dev.name}</span>
                        </td>
                        <td className="p-3 text-slate-300">{dev.type}</td>
                        <td className="p-3 text-cyan-300">{dev.address}</td>
                        <td className="p-3 text-emerald-400 font-bold">{dev.rssi} dBm</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-cyber-850 text-slate-300 border border-cyber-700 text-[11px]">
                            {dev.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Radar Visualizer Animation */}
        <div className="lg:col-span-4 p-5 rounded-xl bg-cyber-950 border border-cyber-700/80 flex flex-col items-center justify-between">
          <span className="text-xs font-mono text-blue-400 font-bold block mb-2 w-full text-left">
            RF RADAR SWEEP (2.4 GHz)
          </span>

          {/* Circular Radar Sweep Screen */}
          <div className="w-48 h-48 rounded-full border-2 border-blue-500/30 relative flex items-center justify-center my-4 overflow-hidden bg-cyber-900/40">
            {/* Concentric distance circles */}
            <div className="absolute inset-4 rounded-full border border-blue-500/20"></div>
            <div className="absolute inset-10 rounded-full border border-blue-500/20"></div>
            <div className="absolute inset-16 rounded-full border border-blue-500/20"></div>

            {/* Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-blue-500/30"></div>
            <div className="absolute inset-y-0 left-1/2 w-px bg-blue-500/30"></div>

            {/* Sweep line */}
            <div className={`absolute inset-0 origin-center bg-gradient-to-r from-transparent via-transparent to-blue-400/20 rounded-full ${
              isScanning ? 'animate-[radarSweep_3s_linear_infinite]' : ''
            }`}></div>

            {/* Center Host Dot */}
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-glow-cyan z-10"></div>

            {/* Discovered Device Blips */}
            {devices.map((d, idx) => {
              const angles = [45, 120, 210, 290, 340];
              const dists = [50, 65, 40, 70, 55];
              const angle = (angles[idx % angles.length] * Math.PI) / 180;
              const r = dists[idx % dists.length];
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <div
                  key={d.id}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className="absolute w-2.5 h-2.5 rounded-full bg-blue-400 shadow-glow-cyan"
                  title={`${d.name} (${d.rssi} dBm)`}
                ></div>
              );
            })}
          </div>

          <div className="text-center text-[11px] font-mono text-slate-400 w-full pt-2 border-t border-cyber-800">
            {isScanning ? 'Pinging advertising channels...' : `${devices.length} Devices Registered`}
          </div>
        </div>
      </div>
    </div>
  );
};
