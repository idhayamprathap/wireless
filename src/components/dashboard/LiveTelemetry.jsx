import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Radio, 
  Users, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  HardDrive,
  Signal
} from 'lucide-react';

export const LiveTelemetry = () => {
  const [packetCount, setPacketCount] = useState(1248);
  const [signalRssi, setSignalRssi] = useState(-48);

  useEffect(() => {
    const interval = setInterval(() => {
      // Minor simulated packet drift
      setPacketCount(prev => prev + Math.floor(Math.random() * 5) + 1);
      // Minor jitter in RSSI: -48 +/- 1 dBm
      setSignalRssi(-48 + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: "WIRELESS STATUS",
      val: "ONLINE",
      sub: "802.11ax Dual-Band",
      icon: Wifi,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/20"
    },
    {
      label: "SIGNAL LEVEL",
      val: `${signalRssi} dBm`,
      sub: "Excellent (SNR: 38 dB)",
      icon: Signal,
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      bg: "bg-cyan-950/20"
    },
    {
      label: "ACCESS POINTS",
      val: "3 Active",
      sub: "CAPWAP Joined (Ch 1, 6, 36)",
      icon: Radio,
      color: "text-teal-400",
      border: "border-teal-500/30",
      bg: "bg-teal-950/20"
    },
    {
      label: "CLIENT STATIONS",
      val: "12 Connected",
      sub: "DHCP Pool: 192.168.10.x",
      icon: Users,
      color: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-blue-950/20"
    },
    {
      label: "WLC CONTROLLER",
      val: "WLC-LAB",
      sub: "Management IP: 192.168.20.10",
      icon: Cpu,
      color: "text-purple-400",
      border: "border-purple-500/30",
      bg: "bg-purple-950/20"
    },
    {
      label: "SECURITY SUITE",
      val: "WPA2 / WPA3",
      sub: "802.1X + RADIUS Enabled",
      icon: ShieldCheck,
      color: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-950/20"
    },
    {
      label: "SIMULATED PACKETS",
      val: packetCount.toLocaleString(),
      sub: "0 Frame Errors / Retries",
      icon: Activity,
      color: "text-orange-400",
      border: "border-orange-500/30",
      bg: "bg-orange-950/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${m.border} ${m.bg} bg-cyber-900/60 backdrop-blur-md transition-all hover:scale-[1.02] flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-mono tracking-wider font-semibold">
                {m.label}
              </span>
              <Icon className={`w-3.5 h-3.5 ${m.color}`} />
            </div>
            <div>
              <div className={`text-base font-mono font-bold ${m.color} truncate`}>
                {m.val}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                {m.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
