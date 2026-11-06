import React, { useState } from 'react';
import { 
  Laptop, 
  Server, 
  HardDrive, 
  Send, 
  CheckCircle2, 
  Play, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp13_TcpUdpSimulator = ({ onMarkComplete, isCompleted }) => {
  const [protocol, setProtocol] = useState('TCP'); // 'TCP' or 'UDP'
  const [message, setMessage] = useState('HELLO SERVER');
  const [srcIp] = useState('192.168.1.50');
  const [dstIp] = useState('192.168.1.10');
  const [srcPort] = useState(49152);
  const [dstPort] = useState(80);

  const [isTransmitting, setIsTransmitting] = useState(false);
  const [activeStage, setActiveStage] = useState(0); // For TCP: 1: SYN, 2: SYN-ACK, 3: ACK, 4: DATA, 5: ACK-REPLY
  const [logs, setLogs] = useState([]);

  const handleTransmit = () => {
    setIsTransmitting(true);
    setActiveStage(1);

    if (protocol === 'TCP') {
      setLogs([`[0.00s] [TCP SYN] Client -> Server (seq=1000, win=65535, syn=1)`]);

      setTimeout(() => {
        setActiveStage(2);
        setLogs(prev => [...prev, `[0.60s] [TCP SYN-ACK] Server -> Client (seq=5000, ack=1001, syn=1, ack=1)`]);
      }, 800);

      setTimeout(() => {
        setActiveStage(3);
        setLogs(prev => [...prev, `[1.20s] [TCP ACK] Client -> Server (seq=1001, ack=5001, ack=1). 3-WAY HANDSHAKE ESTABLISHED!`]);
      }, 1600);

      setTimeout(() => {
        setActiveStage(4);
        setLogs(prev => [...prev, `[1.90s] [TCP PSH-ACK] Client -> Server: Payload "${message}" (len=${message.length} bytes)`]);
      }, 2500);

      setTimeout(() => {
        setActiveStage(5);
        setIsTransmitting(false);
        setLogs(prev => [
          ...prev,
          `[2.60s] [TCP ACK] Server -> Client: Received & Acknowledged (ack=${1001 + message.length}). DATA TRANSFER COMPLETE.`
        ]);
        if (!isCompleted) onMarkComplete();
      }, 3400);
    } else {
      // UDP: Connectionless fire-and-forget datagram
      setLogs([`[0.00s] [UDP DATAGRAM] Client -> Server: Immediate push (Len=${8 + message.length}B, No Handshake)`]);

      setTimeout(() => {
        setActiveStage(4);
        setLogs(prev => [...prev, `[0.70s] [SWITCH] Forwarding UDP frame to port 80...`]);
      }, 700);

      setTimeout(() => {
        setActiveStage(5);
        setIsTransmitting(false);
        setLogs(prev => [
          ...prev,
          `[1.30s] [UDP DELIVERED] Server received payload: "${message}". Zero acknowledgments generated.`
        ]);
        if (!isCompleted) onMarkComplete();
      }, 1600);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              LAN TRANSPORT PROTOCOL SIMULATOR (TCP vs UDP)
            </h3>
            <p className="text-xs text-slate-400">
              Connection-oriented 3-way handshake & ACK verification vs connectionless datagram streaming.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Protocol Selection & Message Input */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
        <div className="md:col-span-4">
          <label className="text-xs font-mono text-slate-400 font-bold block mb-1">
            Transport Protocol:
          </label>
          <div className="flex rounded-xl bg-cyber-850 p-1 border border-cyber-700">
            <button
              onClick={() => { setProtocol('TCP'); setActiveStage(0); setLogs([]); }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                protocol === 'TCP' ? 'bg-cyan-500 text-black shadow-glow-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              TCP (Reliable)
            </button>
            <button
              onClick={() => { setProtocol('UDP'); setActiveStage(0); setLogs([]); }}
              className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                protocol === 'UDP' ? 'bg-amber-500 text-black shadow-glow-orange' : 'text-slate-400 hover:text-white'
              }`}
            >
              UDP (Connectionless)
            </button>
          </div>
        </div>

        <div className="md:col-span-5">
          <label className="text-xs font-mono text-slate-400 font-bold block mb-1">
            Data Payload Message:
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isTransmitting}
            className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
            placeholder="e.g. HELLO SERVER"
          />
        </div>

        <div className="md:col-span-3 flex items-end">
          <button
            onClick={handleTransmit}
            disabled={isTransmitting || !message}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Send className={`w-3.5 h-3.5 ${isTransmitting ? 'animate-pulse' : ''}`} />
            <span>{isTransmitting ? 'TRANSMITTING...' : 'TRANSMIT PACKET'}</span>
          </button>
        </div>
      </div>

      {/* Visual Topology Path */}
      <div className="p-6 rounded-xl bg-cyber-950 border border-cyber-700/80">
        <div className="text-xs font-mono text-cyan-400 mb-6 flex items-center justify-between">
          <span>TOPOLOGY: CLIENT (192.168.1.50) ── L2 SWITCH ── SERVER (192.168.1.10)</span>
          <span className="text-slate-400">
            {protocol === 'TCP' ? 'TCP 3-Way Handshake + Data + ACK' : 'UDP Fire-and-Forget Datagram'}
          </span>
        </div>

        <div className="flex items-center justify-between relative py-6 px-4">
          {/* Client Node */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              activeStage === 1 || activeStage === 3 || activeStage === 4
                ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-glow-cyan'
                : 'bg-cyber-850 text-slate-400 border border-cyber-700'
            }`}>
              <Laptop className="w-7 h-7" />
            </div>
            <span className="font-mono font-bold text-xs text-white mt-2">Client Station</span>
            <span className="font-mono text-[10px] text-cyan-400">{srcIp}:{srcPort}</span>
          </div>

          {/* Connection Link with animated packet flow */}
          <div className="flex-1 mx-6 flex flex-col items-center justify-center space-y-2">
            <div className="w-full h-1 bg-cyber-800 rounded relative overflow-hidden">
              {isTransmitting && (
                <div className={`h-full w-24 rounded ${
                  protocol === 'TCP' ? 'bg-cyan-400 animate-[signalFlow_1.5s_linear_infinite]' : 'bg-amber-400 animate-[signalFlow_1.0s_linear_infinite]'
                }`}></div>
              )}
            </div>

            {/* Central Switch icon */}
            <div className="p-2 rounded-lg bg-cyber-850 border border-cyber-700 text-teal-400 flex items-center gap-1.5 text-xs font-mono">
              <HardDrive className="w-4 h-4" />
              <span>Layer 2 Switch</span>
            </div>
          </div>

          {/* Server Node */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              activeStage === 2 || activeStage === 5
                ? 'bg-teal-500/20 text-teal-300 border-2 border-teal-400 shadow-glow-teal'
                : 'bg-cyber-850 text-slate-400 border border-cyber-700'
            }`}>
              <Server className="w-7 h-7" />
            </div>
            <span className="font-mono font-bold text-xs text-white mt-2">Target Server</span>
            <span className="font-mono text-[10px] text-teal-400">{dstIp}:{dstPort}</span>
          </div>
        </div>
      </div>

      {/* Packet Header Inspector & Console Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Packet Header Dissection */}
        <div className="p-5 rounded-xl bg-cyber-850 border border-cyber-700/80 space-y-3">
          <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-cyan-400 pb-2 border-b border-cyber-800">
            Decoded Packet Header ({protocol})
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500 block text-[10px]">Source IP:</span>
              <span className="text-cyan-300 font-bold">{srcIp}</span>
            </div>
            <div className="p-2.5 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500 block text-[10px]">Destination IP:</span>
              <span className="text-teal-300 font-bold">{dstIp}</span>
            </div>
            <div className="p-2.5 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500 block text-[10px]">Source Port:</span>
              <span className="text-slate-200">{srcPort}</span>
            </div>
            <div className="p-2.5 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500 block text-[10px]">Destination Port:</span>
              <span className="text-slate-200">{dstPort} ({dstPort === 80 ? 'HTTP' : 'Custom'})</span>
            </div>
            <div className="p-2.5 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500 block text-[10px]">Protocol Type:</span>
              <span className={protocol === 'TCP' ? 'text-cyan-400 font-bold' : 'text-amber-400 font-bold'}>
                {protocol} (Layer 4)
              </span>
            </div>
            <div className="p-2.5 rounded bg-cyber-900 border border-cyber-800">
              <span className="text-slate-500 block text-[10px]">Header Size:</span>
              <span className="text-slate-200">{protocol === 'TCP' ? '20 Bytes' : '8 Bytes'}</span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-cyber-900 border border-cyber-800 text-xs font-mono">
            <span className="text-slate-500 block text-[10px]">Payload Data ({message.length} bytes):</span>
            <span className="text-amber-300 font-mono font-bold">"{message}"</span>
          </div>
        </div>

        {/* Console Log */}
        <div className="p-5 rounded-xl bg-cyber-950 border border-cyber-800 font-mono text-[11px] text-slate-300 flex flex-col justify-between">
          <div>
            <div className="text-slate-400 font-bold pb-2 border-b border-cyber-800 mb-2">
              PROTOCOL EVENT STREAM
            </div>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-slate-600 italic">Click [TRANSMIT PACKET] to begin exchange...</div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className={log.includes('COMPLETE') || log.includes('ESTABLISHED') ? 'text-emerald-400 font-bold' : ''}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-cyber-800 text-[10px] text-slate-500">
            {protocol === 'TCP' ? 'Guarantees reliable, ordered in-sequence byte delivery.' : 'Best effort datagram; no ACK, zero handshake overhead.'}
          </div>
        </div>
      </div>
    </div>
  );
};
