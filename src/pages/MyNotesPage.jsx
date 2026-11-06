import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { EXPERIMENTS } from '../data/experimentsData';
import { 
  FileText, 
  Save, 
  Trash2, 
  ArrowRight, 
  Plus, 
  Download, 
  CheckCircle2 
} from 'lucide-react';
import { SimulationBadge } from '../components/common/SimulationBadge';

export const MyNotesPage = () => {
  const { notes, saveNote, deleteNote, openExperiment } = useLab();
  const [selectedExpId, setSelectedExpId] = useState(1);
  const [activeNoteText, setActiveNoteText] = useState(notes[1] || '');
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSelectExp = (id) => {
    setSelectedExpId(id);
    setActiveNoteText(notes[id] || '');
  };

  const handleSave = () => {
    saveNote(selectedExpId, activeNoteText);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(selectedExpId);
      setActiveNoteText('');
    }
  };

  const handleExportAll = () => {
    const lines = [];
    lines.push("# WIRELESS COMMUNICATION COMMAND CENTER - STUDENT NOTES");
    lines.push(`Generated: ${new Date().toLocaleString()}`);
    lines.push("=====================================================\n");

    EXPERIMENTS.forEach(exp => {
      const note = notes[exp.id];
      if (note && note.trim()) {
        lines.push(`## EXP ${exp.number}: ${exp.title}`);
        lines.push(note);
        lines.push("\n-----------------------------------------------------\n");
      }
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wireless_lab_notes_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeExp = EXPERIMENTS.find(e => e.id === selectedExpId) || EXPERIMENTS[0];
  const totalNotesCount = Object.values(notes).filter(n => n && n.trim()).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            STUDENT REPOSITORY
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            My Laboratory Notes
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportAll}
            disabled={totalNotesCount === 0}
            className="px-3.5 py-2 rounded-xl bg-cyber-850 hover:bg-cyber-800 border border-cyber-700 text-cyan-300 font-mono text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT ALL NOTES ({totalNotesCount})</span>
          </button>
          <SimulationBadge />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List: 19 Experiments with note indicators */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-cyber-900/90 border border-cyber-700/80 space-y-2 max-h-[600px] overflow-y-auto">
          <span className="text-xs font-mono text-slate-400 font-bold block mb-2 px-1">
            EXPERIMENT SELECTOR:
          </span>
          {EXPERIMENTS.map((exp) => {
            const hasNote = !!(notes[exp.id] && notes[exp.id].trim());
            const isSelected = selectedExpId === exp.id;
            return (
              <div
                key={exp.id}
                onClick={() => handleSelectExp(exp.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyber-800 border-cyan-500/60 shadow-glow-cyan-sm text-white'
                    : 'bg-cyber-850 border-cyber-800/80 text-slate-400 hover:text-white hover:bg-cyber-800'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-cyber-900 text-slate-500'
                  }`}>
                    {exp.number}
                  </span>
                  <span className="text-xs font-mono truncate">{exp.title}</span>
                </div>
                {hasNote && (
                  <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" title="Notes Saved"></span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Area: Note Editor */}
        <div className="lg:col-span-8 p-6 rounded-xl bg-cyber-850 border border-cyber-700/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-cyber-700 gap-2">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                  EXP {activeExp.number} • {activeExp.category}
                </span>
                <h3 className="text-base font-mono font-bold text-white mt-0.5">
                  {activeExp.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openExperiment(activeExp.id)}
                  className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="mt-4">
              <textarea
                rows={14}
                value={activeNoteText}
                onChange={(e) => setActiveNoteText(e.target.value)}
                placeholder="Type your observations, calculations, formulas, hardware addresses, or viva answers for this experiment here..."
                className="w-full bg-cyber-900 border border-cyber-700 rounded-xl p-4 text-xs font-tech text-slate-200 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-cyber-700/80">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-black" />
                <span>SAVE NOTES</span>
              </button>

              {activeNoteText && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2.5 rounded-xl bg-cyber-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-cyber-700 font-mono text-xs transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>DELETE</span>
                </button>
              )}
            </div>

            {savedAlert && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved to LocalStorage</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
