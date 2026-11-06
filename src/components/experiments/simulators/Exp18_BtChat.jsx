import React, { useState } from 'react';
import { 
  Bluetooth, 
  Send, 
  Laptop, 
  Smartphone, 
  Signal, 
  CheckCircle2, 
  Activity, 
  ArrowLeftRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp18_BtChat = ({ onMarkComplete, isCompleted }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'LAPTOP', text: 'Hello Student Phone, testing Bluetooth RFCOMM virtual serial channel.', time: '10:02 AM' },
    { id: 2, sender: 'PHONE', text: 'Hello Lab Laptop! Link established. RSSI is strong (-58 dBm).', time: '10:03 AM' }
  ]);

  const [laptopInput, setLaptopInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [bytesSent, setBytesSent] = useState(148);
  const [bytesReceived, setBytesReceived] = useState(164);

  const sendMessage = (from, text) => {
    if (!text.trim()) return;
    setIsTransmitting(true);

    const newMsg = {
      id: Date.now(),
      sender: from,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => {
      setMessages(prev => [...prev, newMsg]);
      setIsTransmitting(false);
      if (from === 'LAPTOP') {
        setBytesSent(prev => prev + text.length + 8);
        setLaptopInput('');
      } else {
        setBytesReceived(prev => prev + text.length + 8);
        setPhoneInput('');
      }
      if (!isCompleted) onMarkComplete();
    }, 450);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Bluetooth className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              SIMULATED BLUETOOTH CHAT (RFCOMM / SERIAL PORT PROFILE)
            </h3>
            <p className="text-xs text-slate-400">
              Interactive peer-to-peer serial communication between Lab Laptop and Student Phone.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Connection Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-cyber-900/90 border border-cyber-700/80 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-cyber-850 border border-cyber-700/80 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <div>
            <span className="text-[10px] text-slate-500 block">LINK STATE</span>
            <span className="text-emerald-300 font-bold">CONNECTED</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-cyber-850 border border-cyber-700/80 flex items-center gap-2">
          <Signal className="w-4 h-4 text-cyan-400" />
          <div>
            <span className="text-[10px] text-slate-500 block">SIGNAL RSSI</span>
            <span className="text-cyan-300 font-bold">-58 dBm (Class 2)</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-cyber-850 border border-cyber-700/80 flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-400" />
          <div>
            <span className="text-[10px] text-slate-500 block">DATA SENT</span>
            <span className="text-teal-300 font-bold">{bytesSent} Bytes</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-cyber-850 border border-cyber-700/80 flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-500 block">DATA RECEIVED</span>
            <span className="text-amber-300 font-bold">{bytesReceived} Bytes</span>
          </div>
        </div>
      </div>

      {/* Central Radio Link Animation Banner */}
      <div className="p-3 rounded-xl bg-cyber-950 border border-blue-500/30 flex items-center justify-between text-xs font-mono px-6">
        <div className="flex items-center gap-2 text-blue-300">
          <Laptop className="w-4 h-4" />
          <span>LAB LAPTOP (Master)</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className={`h-1.5 w-16 rounded-full ${isTransmitting ? 'bg-cyan-400 animate-pulse shadow-glow-cyan' : 'bg-cyber-800'}`}></span>
          <ArrowLeftRight className={`w-4 h-4 ${isTransmitting ? 'text-cyan-400 animate-spin' : 'text-slate-600'}`} />
          <span className={`h-1.5 w-16 rounded-full ${isTransmitting ? 'bg-cyan-400 animate-pulse shadow-glow-cyan' : 'bg-cyber-800'}`}></span>
        </div>

        <div className="flex items-center gap-2 text-teal-300">
          <Smartphone className="w-4 h-4" />
          <span>STUDENT PHONE (Slave)</span>
        </div>
      </div>

      {/* Synchronized Dual-Chat Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Terminal A: LAB LAPTOP */}
        <div className="p-5 rounded-xl bg-cyber-850 border border-cyber-700/80 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-cyber-700 text-xs font-mono mb-3">
              <span className="font-bold text-blue-400 flex items-center gap-2">
                <Laptop className="w-4 h-4" />
                TERMINAL A — LAB LAPTOP
              </span>
              <span className="text-[11px] text-slate-500">RFCOMM Channel 1</span>
            </div>

            {/* Message transcript */}
            <div className="space-y-2.5 overflow-y-auto max-h-[260px] pr-1">
              {messages.map((m) => {
                const isMine = m.sender === 'LAPTOP';
                return (
                  <div key={m.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                    <div className="text-[10px] font-mono text-slate-500 mb-0.5">
                      {m.sender} • {m.time}
                    </div>
                    <div className={`p-2.5 rounded-xl text-xs font-tech max-w-[85%] leading-relaxed ${
                      isMine ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-cyber-900 text-slate-200 border border-cyber-800 rounded-tl-none'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage('LAPTOP', laptopInput);
            }}
            className="flex items-center gap-2 pt-3 border-t border-cyber-700"
          >
            <input
              type="text"
              value={laptopInput}
              onChange={(e) => setLaptopInput(e.target.value)}
              placeholder="Type message from Laptop..."
              className="flex-1 bg-cyber-900 border border-cyber-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400 font-tech"
            />
            <button
              type="submit"
              disabled={!laptopInput.trim() || isTransmitting}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Terminal B: STUDENT PHONE */}
        <div className="p-5 rounded-xl bg-cyber-850 border border-cyber-700/80 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-cyber-700 text-xs font-mono mb-3">
              <span className="font-bold text-teal-400 flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                TERMINAL B — STUDENT PHONE
              </span>
              <span className="text-[11px] text-slate-500">RFCOMM Channel 1</span>
            </div>

            {/* Message transcript */}
            <div className="space-y-2.5 overflow-y-auto max-h-[260px] pr-1">
              {messages.map((m) => {
                const isMine = m.sender === 'PHONE';
                return (
                  <div key={m.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                    <div className="text-[10px] font-mono text-slate-500 mb-0.5">
                      {m.sender} • {m.time}
                    </div>
                    <div className={`p-2.5 rounded-xl text-xs font-tech max-w-[85%] leading-relaxed ${
                      isMine ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-cyber-900 text-slate-200 border border-cyber-800 rounded-tl-none'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage('PHONE', phoneInput);
            }}
            className="flex items-center gap-2 pt-3 border-t border-cyber-700"
          >
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Type message from Phone..."
              className="flex-1 bg-cyber-900 border border-cyber-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400 font-tech"
            />
            <button
              type="submit"
              disabled={!phoneInput.trim() || isTransmitting}
              className="p-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold transition-all disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
