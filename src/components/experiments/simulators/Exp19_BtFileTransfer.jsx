import React, { useState } from 'react';
import { 
  Bluetooth, 
  FileText, 
  Play, 
  CheckCircle2, 
  Laptop, 
  Smartphone, 
  RotateCcw, 
  Activity, 
  ArrowRight,
  HardDrive
} from 'lucide-react';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp19_BtFileTransfer = ({ onMarkComplete, isCompleted }) => {
  const demoFiles = [
    { name: 'wireless_notes.pdf', sizeKb: 1840, type: 'PDF Document', mime: 'application/pdf' },
    { name: 'lab_spec_80211ax.bin', sizeKb: 512, type: 'Binary Firmware', mime: 'application/octet-stream' },
    { name: 'rf_signal_capture.dat', sizeKb: 3200, type: 'Raw I/Q Capture', mime: 'application/octet-stream' }
  ];

  const [selectedFile, setSelectedFile] = useState(demoFiles[0]);
  const [progress, setProgress] = useState(0); // 0, 25, 50, 75, 100
  const [isTransferring, setIsTransferring] = useState(false);
  const [speedKbps, setSpeedKbps] = useState(0);
  const [transferStatus, setTransferStatus] = useState('Idle (Awaiting OBEX Put)');
  const [logs, setLogs] = useState([]);

  const startTransfer = () => {
    setIsTransferring(true);
    setProgress(0);
    setSpeedKbps(185);
    setTransferStatus('Initiating OBEX Connection...');
    setLogs([`[0.00s] OBEX CONNECT sent to STUDENT PHONE (BD_ADDR: 44:6D:57:9A:BC:10)`]);

    // 25%
    setTimeout(() => {
      setProgress(25);
      setTransferStatus('Transferring chunks (25%)...');
      setLogs(prev => [...prev, `[0.80s] OBEX PUT (Header: ${selectedFile.name}, Len=${selectedFile.sizeKb}KB) -> 25% delivered`]);
    }, 1000);

    // 50%
    setTimeout(() => {
      setProgress(50);
      setSpeedKbps(192);
      setTransferStatus('Transferring chunks (50%)...');
      setLogs(prev => [...prev, `[1.90s] Sending L2CAP packets 120/240 -> 50% delivered`]);
    }, 2200);

    // 75%
    setTimeout(() => {
      setProgress(75);
      setSpeedKbps(188);
      setTransferStatus('Transferring chunks (75%)...');
      setLogs(prev => [...prev, `[3.10s] Checksum verification chunk 180/240 -> 75% delivered`]);
    }, 3400);

    // 100%
    setTimeout(() => {
      setProgress(100);
      setIsTransferring(false);
      setSpeedKbps(0);
      setTransferStatus('FILE TRANSFER COMPLETED');
      setLogs(prev => [
        ...prev,
        `[4.20s] OBEX SUCCESS (0x20) Received!`,
        `[4.30s] FILE TRANSFER COMPLETED: "${selectedFile.name}" saved to /sdcard/Bluetooth/`
      ]);
      if (!isCompleted) onMarkComplete();
    }, 4600);
  };

  const resetTransfer = () => {
    setProgress(0);
    setIsTransferring(false);
    setSpeedKbps(0);
    setTransferStatus('Idle (Awaiting OBEX Put)');
    setLogs([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <Bluetooth className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              BLUETOOTH OBEX OBJECT PUSH FILE TRANSFER
            </h3>
            <p className="text-xs text-slate-400">
              Simulates Object Exchange (OBEX) protocol transfer, packet chunking, and speed telemetry.
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* File Selection & Action Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
        <div className="md:col-span-6">
          <label className="text-xs font-mono text-slate-400 font-bold block mb-1">
            Select Demo File to Push:
          </label>
          <select
            value={selectedFile.name}
            onChange={(e) => {
              const f = demoFiles.find(item => item.name === e.target.value);
              setSelectedFile(f);
              resetTransfer();
            }}
            disabled={isTransferring}
            className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
          >
            {demoFiles.map((f) => (
              <option key={f.name} value={f.name}>
                {f.name} ({f.sizeKb} KB - {f.type})
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-6 flex items-end gap-2">
          <button
            onClick={startTransfer}
            disabled={isTransferring || progress === 100}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Play className={`w-4 h-4 ${isTransferring ? 'animate-spin' : ''}`} />
            <span>{isTransferring ? 'TRANSMITTING CHUNKS...' : 'INITIATE FILE TRANSFER'}</span>
          </button>

          <button
            onClick={resetTransfer}
            disabled={isTransferring}
            className="p-2.5 rounded-xl bg-cyber-850 hover:bg-cyber-800 text-slate-400 hover:text-white border border-cyber-700 transition-all"
            title="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Animated File Transfer Visualizer */}
      <div className="p-6 rounded-xl bg-cyber-950 border border-cyber-700/80 space-y-6">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-blue-400 font-bold">
            OBEX PUSH CHANNEL: LAPTOP ── 2.4 GHz RFCOMM ── PHONE
          </span>
          <span className="text-slate-400">
            Speed: <strong className="text-cyan-300">{speedKbps > 0 ? `${speedKbps} KB/s` : '0 KB/s'}</strong>
          </span>
        </div>

        {/* Sender -> Path -> Receiver */}
        <div className="flex items-center justify-between relative py-6 px-4">
          {/* Laptop Sender */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
              isTransferring ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-400 shadow-glow-cyan' : 'bg-cyber-850 text-slate-400 border border-cyber-700'
            }`}>
              <Laptop className="w-8 h-8" />
            </div>
            <span className="font-mono font-bold text-xs text-white mt-2">LAB LAPTOP</span>
            <span className="font-mono text-[10px] text-blue-300 mt-0.5">OBEX Client</span>
          </div>

          {/* Central Bluetooth Path & Floating File Icon */}
          <div className="flex-1 mx-8 flex flex-col items-center justify-center space-y-3">
            <div className="w-full bg-cyber-900 h-2.5 rounded-full p-0.5 border border-cyber-800 relative overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 h-full rounded-full transition-all duration-700 ease-out shadow-glow-cyan-sm"
              ></div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
              <FileText className={`w-4 h-4 ${isTransferring ? 'animate-bounce' : ''}`} />
              <span>{selectedFile.name}</span>
            </div>
          </div>

          {/* Student Phone Receiver */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
              progress === 100 ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 shadow-glow-teal' : 'bg-cyber-850 text-slate-400 border border-cyber-700'
            }`}>
              <Smartphone className="w-8 h-8" />
            </div>
            <span className="font-mono font-bold text-xs text-white mt-2">STUDENT PHONE</span>
            <span className="font-mono text-[10px] text-teal-300 mt-0.5">OBEX Server</span>
          </div>
        </div>

        {/* Progress Percent Stepper Bar */}
        <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
          {[0, 25, 50, 75, 100].map((stepVal) => (
            <div
              key={stepVal}
              className={`p-2 rounded-lg border transition-all ${
                progress >= stepVal
                  ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300 font-bold'
                  : 'bg-cyber-900 border-cyber-800 text-slate-600'
              }`}
            >
              {stepVal}%
            </div>
          ))}
        </div>

        {/* Completion Banner */}
        {progress === 100 && (
          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/60 text-center animate-in fade-in zoom-in-95 duration-200">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-bold flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              FILE TRANSFER COMPLETED
            </span>
            <span className="text-sm font-mono text-white mt-1 block">
              Successfully transferred {selectedFile.name} ({selectedFile.sizeKb} KB)
            </span>
          </div>
        )}
      </div>

      {/* Transaction Log */}
      <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-800 font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto space-y-1">
        <div className="text-slate-400 font-bold pb-1 border-b border-cyber-800 mb-1">
          OBEX PROTOCOL SESSION LOG
        </div>
        {logs.length === 0 ? (
          <div className="text-slate-600 italic">Click [INITIATE FILE TRANSFER] to push file...</div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className={log.includes('COMPLETED') ? 'text-emerald-400 font-bold' : ''}>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
