import React from 'react';
import { Radio, ShieldAlert, Cpu, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { SimulationBadge } from '../components/common/SimulationBadge';

export const AboutPage = () => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            ACADEMIC PROFILE & MISSION
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            About the Command Center
          </h1>
        </div>
        <SimulationBadge />
      </div>

      {/* Main Mission Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyber-700/80 space-y-4">
        <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyan-400" />
          WIRELESS COMMUNICATION COMMAND CENTER (WCC)
        </h2>
        <p className="text-sm font-tech text-slate-300 leading-relaxed">
          The <strong>Wireless Communication Command Center</strong> is a state-of-the-art virtual laboratory platform purpose-built for undergraduate Computer Science, Information Technology, and Telecommunication Engineering curricula.
        </p>
        <p className="text-sm font-tech text-slate-300 leading-relaxed">
          Unlike standard passive text websites, this platform enables students to interact directly with simulated communication channels, configure enterprise Wireless LAN Controllers (WLC) and RADIUS AAA authenticators, evaluate 802.11 management beacon frames, observe real-time analog/digital modulation waveforms, and prepare thoroughly for oral viva examinations.
        </p>
      </div>

      {/* Safety & Sandbox Disclosure */}
      <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-cyan-400" />
          <span>SAFETY, PRIVACY & SANDBOX PRINCIPLES</span>
        </div>
        <p className="text-xs font-tech text-slate-200 leading-relaxed">
          All network scanning, packet sniffing, Bluetooth discovery, Wi-Fi channel analysis, and security vulnerability reporting routines execute entirely inside the client-side browser using mathematically accurate <strong>SIMULATED DEMO DATA ONLY</strong>.
        </p>
        <ul className="text-xs font-mono text-cyan-300 space-y-1 list-disc list-inside">
          <li>No real Wi-Fi network interfaces are accessed or modified.</li>
          <li>No physical Bluetooth adapters or nearby wireless devices are queried.</li>
          <li>No real-world packet captures or network credentials are harvested or stored.</li>
        </ul>
      </div>

      {/* Academic Standards Matrix */}
      <div className="glass-card rounded-2xl p-6 border border-cyber-700/80 space-y-4">
        <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-teal-400" />
          COVERED TELECOMMUNICATION STANDARDS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
          <div className="p-3.5 rounded-xl bg-cyber-900 border border-cyber-800">
            <span className="text-cyan-400 font-bold block mb-1">IEEE 802.11 (Wi-Fi)</span>
            <p className="text-slate-400 font-tech text-xs">
              802.11b, 802.11g, 802.11n (Wi-Fi 4), 802.11ac (Wi-Fi 5), and 802.11ax (Wi-Fi 6 OFDMA). Split-MAC CAPWAP architectures.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-cyber-900 border border-cyber-800">
            <span className="text-blue-400 font-bold block mb-1">Bluetooth SIG Specifications</span>
            <p className="text-slate-400 font-tech text-xs">
              Bluetooth Core 4.2 / 5.0 / 5.3, Generic Access Profile (GAP), Generic Attribute Profile (GATT), RFCOMM serial, and OBEX OPP.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-cyber-900 border border-cyber-800">
            <span className="text-purple-400 font-bold block mb-1">3GPP & Cellular Standards</span>
            <p className="text-slate-400 font-tech text-xs">
              Direct-Sequence CDMA, orthogonal Walsh-Hadamard codes, Multi-Carrier OFDM sinc orthogonal synthesis, and cyclic prefix.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-cyber-900 border border-cyber-800">
            <span className="text-amber-400 font-bold block mb-1">IETF & OSI Protocols</span>
            <p className="text-slate-400 font-tech text-xs">
              RFC 2131 (DHCP DORA), RFC 793 (TCP 3-Way Handshake), RFC 768 (UDP Datagrams), and RFC 2865 (RADIUS AAA Port 1812).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
