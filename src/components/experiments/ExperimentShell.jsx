import React, { useState, useEffect } from 'react';
import { useLab } from '../../context/LabContext';
import { EXPERIMENTS } from '../../data/experimentsData';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Target, 
  Cpu, 
  Network, 
  ListOrdered, 
  Settings, 
  Play, 
  Award, 
  HelpCircle, 
  FileText,
  Save,
  Trash2,
  Bookmark,
  Share2
} from 'lucide-react';
import { SimulationBadge } from '../common/SimulationBadge';

// Import all 19 specialized simulators
import { Exp01_WLANTopology } from './simulators/Exp01_WLANTopology';
import { Exp02_DhcpSimulator } from './simulators/Exp02_DhcpSimulator';
import { Exp03_WlcSimulator } from './simulators/Exp03_WlcSimulator';
import { Exp04_ServerClientPing } from './simulators/Exp04_ServerClientPing';
import { Exp05_RadiusAuth } from './simulators/Exp05_RadiusAuth';
import { Exp06_CdmaSimulator } from './simulators/Exp06_CdmaSimulator';
import { Exp07_AnalogModulation } from './simulators/Exp07_AnalogModulation';
import { Exp08_DigitalModulation } from './simulators/Exp08_DigitalModulation';
import { Exp09_PulseModulation } from './simulators/Exp09_PulseModulation';
import { Exp10_OfdmSimulator } from './simulators/Exp10_OfdmSimulator';
import { Exp11_WifiScanner } from './simulators/Exp11_WifiScanner';
import { Exp12_WifiAnalyzer } from './simulators/Exp12_WifiAnalyzer';
import { Exp13_TcpUdpSimulator } from './simulators/Exp13_TcpUdpSimulator';
import { Exp14_BeaconAnalyzer } from './simulators/Exp14_BeaconAnalyzer';
import { Exp15_SecurityReport } from './simulators/Exp15_SecurityReport';
import { Exp16_BtDiscovery } from './simulators/Exp16_BtDiscovery';
import { Exp17_BtDetails } from './simulators/Exp17_BtDetails';
import { Exp18_BtChat } from './simulators/Exp18_BtChat';
import { Exp19_BtFileTransfer } from './simulators/Exp19_BtFileTransfer';

export const ExperimentShell = ({ expId, onBackToList }) => {
  const { 
    completedExperiments, 
    toggleComplete, 
    markComplete, 
    openExperiment, 
    notes, 
    saveNote, 
    deleteNote,
    importantViva,
    toggleImportantViva
  } = useLab();

  const experiment = EXPERIMENTS.find(e => e.id === expId) || EXPERIMENTS[0];
  const isCompleted = completedExperiments.includes(experiment.id);

  // 10 Tabs: THEORY, AIM, REQUIREMENTS, TOPOLOGY, PROCEDURE, CONFIGURATION, SIMULATION, RESULT, VIVA, NOTES
  const [activeSubTab, setActiveSubTab] = useState('SIMULATION');

  // Notes state
  const [currentNote, setCurrentNote] = useState('');
  const [noteSavedAlert, setNoteSavedAlert] = useState(false);

  // Viva preparation state inside experiment
  const [activeVivaIdx, setActiveVivaIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setCurrentNote(notes[experiment.id] || '');
    setActiveVivaIdx(0);
    setShowAnswer(false);
  }, [experiment.id, notes]);

  const handleSaveNote = () => {
    saveNote(experiment.id, currentNote);
    setNoteSavedAlert(true);
    setTimeout(() => setNoteSavedAlert(false), 2000);
  };

  const handleDeleteNote = () => {
    if (window.confirm("Delete your notes for this experiment?")) {
      deleteNote(experiment.id);
      setCurrentNote('');
    }
  };

  // Render the matching simulator component
  const renderSimulator = () => {
    const props = {
      onMarkComplete: () => markComplete(experiment.id),
      isCompleted,
      onSwitchTab: (tabName) => setActiveSubTab(tabName)
    };

    switch (experiment.id) {
      case 1: return <Exp01_WLANTopology {...props} />;
      case 2: return <Exp02_DhcpSimulator {...props} />;
      case 3: return <Exp03_WlcSimulator {...props} />;
      case 4: return <Exp04_ServerClientPing {...props} />;
      case 5: return <Exp05_RadiusAuth {...props} />;
      case 6: return <Exp06_CdmaSimulator {...props} />;
      case 7: return <Exp07_AnalogModulation {...props} />;
      case 8: return <Exp08_DigitalModulation {...props} />;
      case 9: return <Exp09_PulseModulation {...props} />;
      case 10: return <Exp10_OfdmSimulator {...props} />;
      case 11: return <Exp11_WifiScanner {...props} />;
      case 12: return <Exp12_WifiAnalyzer {...props} />;
      case 13: return <Exp13_TcpUdpSimulator {...props} />;
      case 14: return <Exp14_BeaconAnalyzer {...props} />;
      case 15: return <Exp15_SecurityReport {...props} />;
      case 16: return <Exp16_BtDiscovery {...props} />;
      case 17: return <Exp17_BtDetails {...props} />;
      case 18: return <Exp18_BtChat {...props} />;
      case 19: return <Exp19_BtFileTransfer {...props} />;
      default: return <Exp01_WLANTopology {...props} />;
    }
  };

  const tabs = [
    { id: 'THEORY', label: 'THEORY', icon: BookOpen },
    { id: 'AIM', label: 'AIM', icon: Target },
    { id: 'REQUIREMENTS', label: 'REQUIREMENTS', icon: Cpu },
    { id: 'TOPOLOGY', label: 'TOPOLOGY', icon: Network },
    { id: 'PROCEDURE', label: 'PROCEDURE', icon: ListOrdered },
    { id: 'CONFIGURATION', label: 'CONFIGURATION', icon: Settings },
    { id: 'SIMULATION', label: 'SIMULATION', icon: Play, highlight: true },
    { id: 'RESULT', label: 'RESULT', icon: Award },
    { id: 'VIVA', label: 'VIVA', icon: HelpCircle },
    { id: 'NOTES', label: 'MY NOTES', icon: FileText }
  ];

  const prevExpId = experiment.id > 1 ? experiment.id - 1 : null;
  const nextExpId = experiment.id < 19 ? experiment.id + 1 : null;

  const currentViva = experiment.viva[activeVivaIdx] || experiment.viva[0];
  const isBookmarked = importantViva.includes(`exp${experiment.id}-viva${activeVivaIdx}`);

  return (
    <div className="space-y-6">
      {/* Header Bar with Back and Next Navigation */}
      <div className="glass-card rounded-2xl p-6 border border-cyber-700/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToList}
              className="p-2 rounded-xl bg-cyber-850 hover:bg-cyber-800 border border-cyber-700 text-slate-300 hover:text-white transition-all"
              title="Back to All Experiments"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                  EXPERIMENT {experiment.number}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {experiment.category}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-mono font-black text-white mt-1">
                {experiment.title}
              </h1>
            </div>
          </div>

          {/* Complete Button & Prev/Next Shortcuts */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => toggleComplete(experiment.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 shadow-glow-teal-sm'
                  : 'bg-cyber-800 hover:bg-cyber-750 text-slate-200 border border-cyber-600'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isCompleted ? 'COMPLETED' : 'MARK COMPLETE'}</span>
            </button>

            {prevExpId && (
              <button
                onClick={() => openExperiment(prevExpId)}
                className="px-3 py-2 rounded-xl bg-cyber-850 hover:bg-cyber-800 border border-cyber-700 text-slate-300 text-xs font-mono transition-all"
                title="Previous Experiment"
              >
                &larr; Prev
              </button>
            )}

            {nextExpId && (
              <button
                onClick={() => openExperiment(nextExpId)}
                className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold transition-all shadow-glow-cyan-sm"
                title="Next Experiment"
              >
                Next &rarr;
              </button>
            )}
          </div>
        </div>

        {/* 10 Fixed Tabs Navigation Strip */}
        <div className="mt-6 pt-4 border-t border-cyber-800/80 overflow-x-auto">
          <div className="flex items-center space-x-1.5 min-w-[780px]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                    isActive
                      ? tab.highlight
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-glow-cyan'
                        : 'bg-cyber-800 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan-sm'
                      : 'text-slate-400 hover:text-white hover:bg-cyber-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive && tab.highlight ? 'text-black' : isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="glass-card rounded-2xl p-6 border border-cyber-700/80">
        {/* 1. THEORY TAB */}
        {activeSubTab === 'THEORY' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                THEORETICAL FOUNDATION
              </span>
              <h2 className="text-lg font-mono font-bold text-white mt-1">
                Background & Fundamental Concepts
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-cyber-900/80 border border-cyber-800 text-sm font-tech text-slate-200 leading-relaxed">
              {experiment.theory.overview}
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 mb-3">
                Key Principles & Mechanisms
              </h3>
              <div className="space-y-2.5">
                {experiment.theory.keyPoints.map((point, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-cyber-850 border border-cyber-800 flex items-start gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-tech text-slate-300 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {experiment.theory.standards && (
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
                  Applicable Specifications & Standards
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono text-slate-300 border-collapse">
                    <thead>
                      <tr className="border-b border-cyber-800 text-slate-400 bg-cyber-900/60">
                        <th className="p-2.5">Standard</th>
                        <th className="p-2.5">Frequency / Port</th>
                        <th className="p-2.5">Data Rate / Capacity</th>
                        <th className="p-2.5">Modulation / Architecture</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cyber-800/80">
                      {experiment.theory.standards.map((s, idx) => (
                        <tr key={idx} className="hover:bg-cyber-900/50">
                          <td className="p-2.5 text-cyan-300 font-bold">{s.std}</td>
                          <td className="p-2.5 text-slate-300">{s.freq}</td>
                          <td className="p-2.5 text-teal-300">{s.maxRate}</td>
                          <td className="p-2.5 text-slate-400">{s.modulation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. AIM TAB */}
        {activeSubTab === 'AIM' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                EXPERIMENT OBJECTIVE
              </span>
              <h2 className="text-lg font-mono font-bold text-white mt-1">
                Aim of the Experiment
              </h2>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-950/40 via-cyber-900 to-cyber-850 border border-cyan-500/40 shadow-glow-cyan-sm">
              <p className="text-sm font-tech text-slate-100 leading-relaxed">
                {experiment.aim}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyber-900 border border-cyber-800 text-xs font-tech text-slate-300 space-y-2">
              <span className="font-mono font-bold text-cyan-400 block">Learning Outcomes:</span>
              <p>• Understand the fundamental wireless communication mechanics of {experiment.title}.</p>
              <p>• Learn parameter configuration for real-world academic laboratory deployment.</p>
              <p>• Observe, measure, and analyze simulated packets, wave transformations, and frame headers.</p>
            </div>
          </div>
        )}

        {/* 3. REQUIREMENTS TAB */}
        {activeSubTab === 'REQUIREMENTS' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                LAB APPARATUS
              </span>
              <h2 className="text-lg font-mono font-bold text-white mt-1">
                Hardware & Software Requirements
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {experiment.requirements.map((req, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-cyber-900 border border-cyber-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyber-850 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-mono text-slate-200">
                    {req}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs font-tech text-cyan-300">
              Note: All physical apparatus, spectrum analyzers, controllers, and transmitters are fully simulated using interactive virtual models in this web laboratory.
            </div>
          </div>
        )}

        {/* 4. TOPOLOGY TAB */}
        {activeSubTab === 'TOPOLOGY' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                NETWORK TOPOLOGY & INTERCONNECTIONS
              </span>
              <h2 className="text-lg font-mono font-bold text-white mt-1">
                {experiment.topology.type}
              </h2>
            </div>

            {/* Topology Flow Pills */}
            <div className="p-4 rounded-xl bg-cyber-900 border border-cyber-800">
              <span className="text-[11px] font-mono text-slate-500 block mb-3 font-bold">
                SIGNAL & PACKET PATH:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {experiment.topology.flow.map((hop, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-3 py-1.5 rounded-lg bg-cyber-850 text-cyan-300 border border-cyber-700 text-xs font-mono font-semibold">
                      {hop}
                    </span>
                    {idx < experiment.topology.flow.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Node Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiment.topology.nodes.map((node) => (
                <div key={node.id} className="p-4 rounded-xl bg-cyber-850 border border-cyber-800 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-cyber-800">
                    <span className="font-mono font-bold text-xs text-white">{node.name}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{node.ip}</span>
                  </div>
                  <div className="text-[11px] font-mono text-teal-400">{node.mac}</div>
                  <p className="text-xs text-slate-300 font-tech leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PROCEDURE TAB */}
        {activeSubTab === 'PROCEDURE' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                STEP-BY-STEP LAB INSTRUCTIONS
              </span>
              <h2 className="text-lg font-mono font-bold text-white mt-1">
                Standard Laboratory Procedure
              </h2>
            </div>

            <div className="space-y-3">
              {experiment.procedure.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-cyber-900 border border-cyber-800 flex items-start gap-4 hover:border-cyan-500/40 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-slate-950 font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-glow-cyan-sm">
                    {idx + 1}
                  </div>
                  <div className="text-xs font-tech text-slate-200 leading-relaxed mt-1">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CONFIGURATION TAB */}
        {activeSubTab === 'CONFIGURATION' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                LAB PARAMETER PROFILE
              </span>
              <h2 className="text-lg font-mono font-bold text-white mt-1">
                Default Configuration Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(experiment.configuration).map(([key, val]) => (
                <div key={key} className="p-3.5 rounded-xl bg-cyber-900 border border-cyber-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-cyber-850 border border-cyber-700/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300">
                Ready to execute with these parameters? Switch to the interactive simulation tab.
              </span>
              <button
                onClick={() => setActiveSubTab('SIMULATION')}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs shadow-glow-cyan transition-all"
              >
                OPEN SIMULATOR
              </button>
            </div>
          </div>
        )}

        {/* 7. SIMULATION TAB (CORE INTERACTIVE LAB ENGINE) */}
        {activeSubTab === 'SIMULATION' && (
          <div className="animate-in fade-in duration-150">
            {renderSimulator()}
          </div>
        )}

        {/* 8. RESULT TAB */}
        {activeSubTab === 'RESULT' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                EXPERIMENT EVALUATION
              </span>
              <h2 className="text-lg font-mono font-bold text-white mt-1">
                Expected Output & Conclusion
              </h2>
            </div>

            {/* Expected Output */}
            <div className="p-5 rounded-xl bg-cyber-900 border border-cyber-800 space-y-2">
              <h3 className="font-mono font-bold text-xs uppercase text-teal-400">
                Expected Output
              </h3>
              <p className="text-xs font-tech text-slate-300 leading-relaxed">
                {experiment.expectedOutput}
              </p>
            </div>

            {/* Formal Result */}
            <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-2">
              <h3 className="font-mono font-bold text-xs uppercase text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Laboratory Conclusion / Result
              </h3>
              <p className="text-xs font-tech text-slate-200 leading-relaxed">
                {experiment.result}
              </p>
            </div>

            <button
              onClick={() => markComplete(experiment.id)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-mono font-bold text-xs shadow-glow-teal transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>MARK EXPERIMENT AS COMPLETED</span>
            </button>
          </div>
        )}

        {/* 9. VIVA TAB */}
        {activeSubTab === 'VIVA' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  ORAL EXAMINATION PRACTICE
                </span>
                <h2 className="text-lg font-mono font-bold text-white mt-1">
                  Viva Preparation ({experiment.viva.length} Questions)
                </h2>
              </div>

              {/* Bookmark Toggle */}
              <button
                onClick={() => toggleImportantViva(`exp${experiment.id}-viva${activeVivaIdx}`)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  isBookmarked
                    ? 'bg-amber-950/80 text-amber-300 border-amber-500/60'
                    : 'bg-cyber-850 text-slate-400 border-cyber-700 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isBookmarked ? 'MARKED IMPORTANT' : 'MARK IMPORTANT'}</span>
              </button>
            </div>

            {/* Flashcard Card */}
            <div className="p-6 rounded-2xl bg-cyber-900 border border-cyber-700/80 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  Question {activeVivaIdx + 1} of {experiment.viva.length}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  currentViva.diff === 'IMPORTANT' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  currentViva.diff === 'MEDIUM' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                  'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {currentViva.diff}
                </span>
              </div>

              <div className="text-base font-mono font-bold text-white leading-snug">
                Q: {currentViva.q}
              </div>

              {/* Show Answer Toggle */}
              <div>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-4 py-2 rounded-xl bg-cyber-850 hover:bg-cyber-800 border border-cyber-700 text-cyan-300 font-mono text-xs font-bold transition-all"
                >
                  {showAnswer ? 'HIDE ANSWER' : 'SHOW ANSWER'}
                </button>

                {showAnswer && (
                  <div className="mt-3 p-4 rounded-xl bg-cyber-950 border border-cyan-500/40 text-xs font-tech text-slate-200 leading-relaxed animate-in fade-in duration-150">
                    <strong className="text-cyan-400 font-mono block mb-1">Answer:</strong>
                    {currentViva.a}
                  </div>
                )}
              </div>
            </div>

            {/* Next / Random Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveVivaIdx((activeVivaIdx + 1) % experiment.viva.length);
                  setShowAnswer(false);
                }}
                className="px-4 py-2 rounded-xl bg-cyber-800 hover:bg-cyber-750 text-slate-200 border border-cyber-700 font-mono text-xs font-bold transition-all"
              >
                Next Question &rarr;
              </button>

              <button
                onClick={() => {
                  const rand = Math.floor(Math.random() * experiment.viva.length);
                  setActiveVivaIdx(rand);
                  setShowAnswer(false);
                }}
                className="px-4 py-2 rounded-xl bg-cyber-850 hover:bg-cyber-800 text-slate-400 hover:text-white border border-cyber-700 font-mono text-xs transition-all"
              >
                Random Question
              </button>
            </div>
          </div>
        )}

        {/* 10. NOTES TAB */}
        {activeSubTab === 'NOTES' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  STUDENT SCRATCHPAD
                </span>
                <h2 className="text-lg font-mono font-bold text-white mt-1">
                  My Laboratory Notes
                </h2>
              </div>

              {noteSavedAlert && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800 animate-in fade-in">
                  ✓ Notes Saved to LocalStorage
                </span>
              )}
            </div>

            <div className="space-y-3">
              <textarea
                rows={8}
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Write your observations, parameters, equations, or viva reminders for this experiment here..."
                className="w-full bg-cyber-900 border border-cyber-700 rounded-xl p-4 text-xs font-tech text-slate-200 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveNote}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>SAVE NOTES</span>
                </button>

                {currentNote && (
                  <button
                    onClick={handleDeleteNote}
                    className="px-4 py-2 rounded-xl bg-cyber-850 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-cyber-700 font-mono text-xs transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>DELETE NOTES</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
