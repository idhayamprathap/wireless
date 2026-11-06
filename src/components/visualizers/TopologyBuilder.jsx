import React, { useState } from 'react';
import { 
  Laptop, 
  Server, 
  Router, 
  Radio, 
  Cpu, 
  ShieldCheck, 
  HardDrive, 
  Plus, 
  Trash2, 
  Play, 
  RotateCcw,
  Monitor,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { SimulationBadge } from '../common/SimulationBadge';

export const TopologyBuilder = () => {
  const deviceCatalog = [
    { type: 'pc', label: 'Workstation PC', icon: Monitor, defaultIp: '192.168.10.15' },
    { type: 'laptop', label: 'Wireless Laptop', icon: Laptop, defaultIp: '192.168.10.50' },
    { type: 'ap', label: 'Access Point', icon: Radio, defaultIp: '192.168.10.1' },
    { type: 'switch', label: 'L2 Switch', icon: HardDrive, defaultIp: 'VLAN 10' },
    { type: 'router', label: 'Core Router', icon: Router, defaultIp: '192.168.10.254' },
    { type: 'wlc', label: 'WLC Controller', icon: Cpu, defaultIp: '192.168.10.20' },
    { type: 'server', label: 'App Server', icon: Server, defaultIp: '192.168.10.100' },
    { type: 'radius', label: 'RADIUS AAA', icon: ShieldCheck, defaultIp: '192.168.10.80' }
  ];

  const defaultNodes = [
    { id: 1, type: 'laptop', label: 'Laptop-01', x: 80, y: 150, ip: '192.168.10.101' },
    { id: 2, type: 'ap', label: 'AP-Central', x: 260, y: 150, ip: '192.168.10.1' },
    { id: 3, type: 'switch', label: 'Switch-Core', x: 440, y: 150, ip: '192.168.10.2' },
    { id: 4, type: 'wlc', label: 'WLC-Enterprise', x: 620, y: 80, ip: '192.168.10.20' },
    { id: 5, type: 'server', label: 'Web-Server', x: 620, y: 220, ip: '192.168.10.100' }
  ];

  const defaultLinks = [
    { from: 1, to: 2, type: 'wireless' },
    { from: 2, to: 3, type: 'wired' },
    { from: 3, to: 4, type: 'capwap' },
    { from: 3, to: 5, type: 'wired' }
  ];

  const [nodes, setNodes] = useState(defaultNodes);
  const [links, setLinks] = useState(defaultLinks);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Click on a node or link to configure, or connect two nodes.");

  const addDevice = (device) => {
    const newId = Date.now();
    const newNode = {
      id: newId,
      type: device.type,
      label: `${device.label.split(' ')[0]}-${nodes.length + 1}`,
      x: 100 + (nodes.length % 5) * 120,
      y: 100 + (Math.floor(nodes.length / 5) * 100),
      ip: device.defaultIp
    };
    setNodes([...nodes, newNode]);
    setStatusMessage(`Added ${newNode.label}. Click another node to connect.`);
  };

  const handleNodeClick = (id) => {
    if (selectedNodeId === null) {
      setSelectedNodeId(id);
      setStatusMessage(`Selected Node ${nodes.find(n => n.id === id)?.label}. Click another node to create a link.`);
    } else if (selectedNodeId === id) {
      setSelectedNodeId(null);
      setStatusMessage("Node deselected.");
    } else {
      // Connect selectedNodeId and id
      const exists = links.some(
        l => (l.from === selectedNodeId && l.to === id) || (l.from === id && l.to === selectedNodeId)
      );
      if (!exists) {
        setLinks([...links, { from: selectedNodeId, to: id, type: 'wired' }]);
        setStatusMessage(`Connected ${nodes.find(n => n.id === selectedNodeId)?.label} <-> ${nodes.find(n => n.id === id)?.label}`);
      } else {
        setStatusMessage("Link already exists between these devices.");
      }
      setSelectedNodeId(null);
    }
  };

  const deleteSelectedNode = () => {
    if (selectedNodeId) {
      setNodes(nodes.filter(n => n.id !== selectedNodeId));
      setLinks(links.filter(l => l.from !== selectedNodeId && l.to !== selectedNodeId));
      setSelectedNodeId(null);
      setStatusMessage("Node deleted.");
    }
  };

  const resetTopology = () => {
    setNodes(defaultNodes);
    setLinks(defaultLinks);
    setSelectedNodeId(null);
    setIsSimulating(false);
    setStatusMessage("Restored default enterprise wireless topology.");
  };

  const triggerSimulation = () => {
    setIsSimulating(true);
    setStatusMessage("Simulating ICMP / CAPWAP packet exchanges across all active links...");
    setTimeout(() => {
      setStatusMessage("Simulation finished. 100% packet delivery verified across virtual links.");
      setIsSimulating(false);
    }, 4000);
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'laptop': return Laptop;
      case 'server': return Server;
      case 'router': return Router;
      case 'ap': return Radio;
      case 'wlc': return Cpu;
      case 'radius': return ShieldCheck;
      case 'switch': return HardDrive;
      default: return Monitor;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-cyber-700/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-cyber-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-mono font-bold text-lg text-white">
              INTERACTIVE TOPOLOGY BUILDER
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-800/80">
              BUILD YOUR NETWORK
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Assemble virtual wireless nodes, create links, and trace simulated data transmission.
          </p>
        </div>
        <SimulationBadge />
      </div>

      {/* Device Palette */}
      <div className="py-4 border-b border-cyber-800/80">
        <span className="text-xs font-mono text-slate-400 block mb-2 font-semibold">
          ADD DEMO DEVICES TO CANVAS:
        </span>
        <div className="flex flex-wrap gap-2">
          {deviceCatalog.map((dev) => {
            const Icon = dev.icon;
            return (
              <button
                key={dev.type}
                onClick={() => addDevice(dev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyber-850 hover:bg-cyber-800 border border-cyber-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <Icon className="w-3.5 h-3.5 text-teal-400" />
                <span>{dev.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Controls & Status Bar */}
      <div className="flex flex-wrap items-center justify-between py-3 gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30 font-bold transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'TRANSMITTING...' : 'SIMULATE PACKETS'}</span>
          </button>

          <button
            onClick={resetTopology}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyber-850 text-slate-400 border border-cyber-700 hover:text-white transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>

          {selectedNodeId && (
            <button
              onClick={deleteSelectedNode}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800/80 hover:bg-rose-900/60 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>DELETE SELECTED</span>
            </button>
          )}
        </div>

        <div className="text-slate-400 text-[11px] bg-cyber-900 px-3 py-1.5 rounded-lg border border-cyber-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>{statusMessage}</span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[360px] rounded-xl bg-cyber-950/90 border border-cyber-800 overflow-hidden select-none">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1c2d52_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

        {/* Links (SVG Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {links.map((link, idx) => {
            const fromNode = nodes.find(n => n.id === link.from);
            const toNode = nodes.find(n => n.id === link.to);
            if (!fromNode || !toNode) return null;

            return (
              <g key={`link-${idx}`}>
                <line
                  x1={fromNode.x + 36}
                  y1={fromNode.y + 36}
                  x2={toNode.x + 36}
                  y2={toNode.y + 36}
                  stroke={link.type === 'wireless' ? '#00f2fe' : '#38bdf8'}
                  strokeWidth="2"
                  strokeDasharray={link.type === 'wireless' ? '6,6' : '0'}
                  className={isSimulating ? 'animate-pulse' : ''}
                  opacity="0.75"
                />
                {isSimulating && (
                  <circle
                    r="4"
                    fill="#00f2fe"
                    className="animate-ping"
                    cx={(fromNode.x + toNode.x) / 2 + 36}
                    cy={(fromNode.y + toNode.y) / 2 + 36}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Device Nodes */}
        {nodes.map((node) => {
          const Icon = getDeviceIcon(node.type);
          const isSelected = selectedNodeId === node.id;
          return (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              className={`absolute cursor-pointer flex flex-col items-center p-2 rounded-xl transition-all ${
                isSelected
                  ? 'bg-cyber-800 border-2 border-cyan-400 shadow-glow-cyan scale-105 z-20'
                  : 'bg-cyber-850/90 border border-cyber-700/80 hover:border-cyan-500/50 hover:bg-cyber-800 z-10'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-cyber-900 border border-cyber-700 flex items-center justify-center text-cyan-400">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-200 mt-1 truncate max-w-[80px]">
                {node.label}
              </span>
              <span className="text-[9px] font-mono text-cyan-400/90">
                {node.ip}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
