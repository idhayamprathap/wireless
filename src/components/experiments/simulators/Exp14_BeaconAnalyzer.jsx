import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Layers, 
  CheckCircle2, 
  Wifi, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight,
  Database,
  Terminal
} from 'lucide-react';
import { DEMO_BEACON_FRAMES } from '../../../data/beaconFramesData';
import { SimulationBadge } from '../../common/SimulationBadge';

export const Exp14_BeaconAnalyzer = ({ onMarkComplete, isCompleted }) => {
  const [frames, setFrames] = useState(DEMO_BEACON_FRAMES);
  const [selectedFrame, setSelectedFrame] = useState(DEMO_BEACON_FRAMES[0]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [highlightedBlock, setHighlightedBlock] = useState('mac_header'); // 'mac_header', 'frame_body', 'ie'

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setSelectedFrame(DEMO_BEACON_FRAMES[0]);
      if (!isCompleted) onMarkComplete();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-cyber-900 border border-cyber-700/80">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">
              802.11 BEACON MANAGEMENT FRAME DISSECTOR
            </h3>
            <p className="text-xs text-slate-400">
              Dissects MAC headers, TBTT timestamps, capability masks, and tagged Information Elements (IEs).
            </p>
          </div>
        </div>
        <SimulationBadge />
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-cyber-900/90 border border-cyber-700/80">
        <button
          onClick={handleCapture}
          disabled={isCapturing}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isCapturing ? 'animate-spin' : ''}`} />
          <span>{isCapturing ? 'CAPTURING DEMO FRAMES...' : 'CAPTURE DEMO FRAMES'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Highlight Field Block:</span>
          <div className="flex rounded-lg bg-cyber-850 p-0.5 border border-cyber-700">
            <button
              onClick={() => setHighlightedBlock('mac_header')}
              className={`px-3 py-1 rounded text-xs transition-all ${
                highlightedBlock === 'mac_header' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              MAC Header
            </button>
            <button
              onClick={() => setHighlightedBlock('frame_body')}
              className={`px-3 py-1 rounded text-xs transition-all ${
                highlightedBlock === 'frame_body' ? 'bg-teal-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Frame Body
            </button>
            <button
              onClick={() => setHighlightedBlock('ie')}
              className={`px-3 py-1 rounded text-xs transition-all ${
                highlightedBlock === 'ie' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Information Elements
            </button>
          </div>
        </div>
      </div>

      {/* Captured Frames Packet Table */}
      <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-700/80">
        <span className="text-xs font-mono text-cyan-400 font-bold block mb-3">
          CAPTURED SIMULATED BEACON BUFFER (CLICK TO DISSECT):
        </span>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-cyber-800 text-slate-400 bg-cyber-900/60">
                <th className="p-2.5">Time</th>
                <th className="p-2.5">BSSID (AP MAC)</th>
                <th className="p-2.5">SSID</th>
                <th className="p-2.5">Channel</th>
                <th className="p-2.5">Signal</th>
                <th className="p-2.5">Frame Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-800/80">
              {frames.map((frame) => {
                const isSelected = selectedFrame?.id === frame.id;
                return (
                  <tr
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame)}
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'bg-cyan-950/60 text-white font-bold border-l-2 border-cyan-400' : 'hover:bg-cyber-900'
                    }`}
                  >
                    <td className="p-2.5 text-cyan-300">{frame.timestamp}</td>
                    <td className="p-2.5 text-teal-300">{frame.bssid}</td>
                    <td className="p-2.5 font-bold text-white">{frame.ssid}</td>
                    <td className="p-2.5">Ch {frame.channel}</td>
                    <td className="p-2.5 text-amber-300">{frame.signalDbm} dBm</td>
                    <td className="p-2.5 text-slate-400">{frame.frameSubtype}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Hierarchical Packet Dissector Tree */}
      {selectedFrame && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              DISSECTING FRAME: <strong className="text-white">{selectedFrame.ssid}</strong> ({selectedFrame.bssid})
            </span>
            <span className="text-cyan-400 font-mono">Sequence #{selectedFrame.seqNumber}</span>
          </div>

          {/* 3 Major Structural Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. MAC Header */}
            <div className={`p-4 rounded-xl border transition-all ${
              highlightedBlock === 'mac_header' ? 'bg-cyber-850 border-cyan-400 shadow-glow-cyan-sm' : 'bg-cyber-900/60 border-cyber-800'
            }`}>
              <div className="text-xs font-mono font-bold text-cyan-300 pb-2 border-b border-cyber-800 mb-2 flex items-center justify-between">
                <span>1. MAC HEADER (24 Bytes)</span>
                <span className="text-[10px] text-slate-500">802.11 Layer 2</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                <div>Frame Control: <span className="text-cyan-400 font-bold">Type 00, Subtype 1000 (Beacon)</span></div>
                <div>Duration: <span className="text-slate-400">0 μs</span></div>
                <div>Destination (DA): <span className="text-slate-200">FF:FF:FF:FF:FF:FF (Broadcast)</span></div>
                <div>Source (SA): <span className="text-teal-300">{selectedFrame.bssid}</span></div>
                <div>BSSID: <span className="text-teal-300">{selectedFrame.bssid}</span></div>
                <div>Sequence Number: <span className="text-slate-200">{selectedFrame.seqNumber}</span></div>
              </div>
            </div>

            {/* 2. Frame Body Fixed Parameters */}
            <div className={`p-4 rounded-xl border transition-all ${
              highlightedBlock === 'frame_body' ? 'bg-cyber-850 border-teal-400 shadow-glow-teal-sm' : 'bg-cyber-900/60 border-cyber-800'
            }`}>
              <div className="text-xs font-mono font-bold text-teal-300 pb-2 border-b border-cyber-800 mb-2 flex items-center justify-between">
                <span>2. FRAME BODY (Fixed Parameters)</span>
                <span className="text-[10px] text-slate-500">Synchronization</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                <div>TSF Timestamp: <span className="text-slate-200">{selectedFrame.tsfMicroseconds} μs</span></div>
                <div>Beacon Interval: <span className="text-cyan-400 font-bold">{selectedFrame.beaconIntervalTU} TU (102.4 ms)</span></div>
                <div>Capability ESS: <span className="text-emerald-400 font-bold">Active (1)</span></div>
                <div>Capability Privacy: <span className={selectedFrame.capabilities.privacy ? 'text-cyan-300' : 'text-rose-400'}>{selectedFrame.capabilities.privacy ? 'Enabled (WEP/WPA)' : 'Open (0)'}</span></div>
                <div>Short Preamble: <span className="text-slate-200">Allowed</span></div>
                <div>Channel Center: <span className="text-teal-300">{selectedFrame.frequencyMhz} MHz</span></div>
              </div>
            </div>

            {/* 3. Information Elements (IEs) */}
            <div className={`p-4 rounded-xl border transition-all ${
              highlightedBlock === 'ie' ? 'bg-cyber-850 border-amber-400 shadow-glow-orange-sm' : 'bg-cyber-900/60 border-cyber-800'
            }`}>
              <div className="text-xs font-mono font-bold text-amber-300 pb-2 border-b border-cyber-800 mb-2 flex items-center justify-between">
                <span>3. INFORMATION ELEMENTS (TLV)</span>
                <span className="text-[10px] text-slate-500">Variable Length</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                {selectedFrame.informationElements.map((ie) => (
                  <div key={ie.id} className="p-2 rounded bg-cyber-950/80 border border-cyber-800">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-400 font-bold">Tag {ie.id}: {ie.name}</span>
                      <span className="text-slate-500">Len: {ie.length}B</span>
                    </div>
                    <div className="text-slate-200 text-[11px] mt-0.5">{ie.value}</div>
                    <div className="text-[9px] text-slate-500 font-mono mt-1 truncate">Hex: {ie.hex}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
