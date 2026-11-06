import React, { useState, useEffect, useMemo } from 'react';
import { useLab } from '../../context/LabContext';
import { EXPERIMENTS } from '../../data/experimentsData';
import { VIVA_QUESTIONS } from '../../data/vivaData';
import { Search, X, Layers, BookOpen, Cpu, HelpCircle, FileText, ArrowRight } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, openExperiment, setActiveTab, notes } = useLab();
  const [searchTerm, setSearchTerm] = useState('');

  // Close on Escape, Open on Ctrl+K or /
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) {
      return { experiments: [], viva: [], notesList: [] };
    }
    const q = searchTerm.toLowerCase();

    // Matching experiments
    const matchingExp = EXPERIMENTS.filter(exp => 
      exp.title.toLowerCase().includes(q) ||
      exp.shortDesc.toLowerCase().includes(q) ||
      exp.aim.toLowerCase().includes(q) ||
      exp.theory.overview.toLowerCase().includes(q) ||
      exp.theory.keyPoints.some(k => k.toLowerCase().includes(q))
    );

    // Matching viva questions
    const matchingViva = VIVA_QUESTIONS.filter(v =>
      v.question.toLowerCase().includes(q) ||
      v.answer.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q)
    );

    // Matching user notes
    const matchingNotes = Object.entries(notes)
      .filter(([expId, noteText]) => noteText.toLowerCase().includes(q))
      .map(([expId, noteText]) => {
        const exp = EXPERIMENTS.find(e => e.id === parseInt(expId, 10));
        return { expId: parseInt(expId, 10), title: exp?.title || `Experiment ${expId}`, noteText };
      });

    return {
      experiments: matchingExp,
      viva: matchingViva,
      notesList: matchingNotes
    };
  }, [searchTerm, notes]);

  if (!isSearchOpen) return null;

  const quickPills = ["WLC", "CDMA", "OFDM", "RADIUS", "Bluetooth", "Beacon", "QPSK", "TCP", "DHCP"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-cyber-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-cyber-900 border border-cyber-700 rounded-2xl shadow-2xl overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-cyber-700/80 bg-cyber-850">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search experiments, theory, viva, or simulation terms (e.g. WLC, OFDM, CDMA)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none text-sm font-tech"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-mono bg-cyber-800 hover:bg-cyber-700 text-slate-400 hover:text-white px-2 py-1 rounded border border-cyber-700"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Suggestions */}
        <div className="px-4 py-2 bg-cyber-950/60 border-b border-cyber-800 flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-slate-400 font-mono text-[11px] mr-1">Quick:</span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setSearchTerm(pill)}
              className="px-2 py-0.5 rounded-full bg-cyber-800 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-500/40 text-slate-300 text-[11px] font-mono border border-cyber-700 transition-colors"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!searchTerm.trim() ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              <p>Type keywords to search across all 19 experiments, theory topics, simulations, viva flashcards, and student notes.</p>
            </div>
          ) : results.experiments.length === 0 && results.viva.length === 0 && results.notesList.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              <p>No results found matching "{searchTerm}". Try a different keyword like "SSID", "BPSK", or "AP".</p>
            </div>
          ) : (
            <>
              {/* Experiments Results */}
              {results.experiments.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Experiments & Theory ({results.experiments.length})
                  </h4>
                  <div className="space-y-2">
                    {results.experiments.map(exp => (
                      <div
                        key={exp.id}
                        onClick={() => {
                          openExperiment(exp.id);
                          setIsSearchOpen(false);
                        }}
                        className="p-3 rounded-xl bg-cyber-850 hover:bg-cyber-800 border border-cyber-700/60 hover:border-cyan-500/40 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                              EXP {exp.number}
                            </span>
                            <h5 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                              {exp.title}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                            {exp.shortDesc}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Viva Questions */}
              {results.viva.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Viva Questions & Answers ({results.viva.length})
                  </h4>
                  <div className="space-y-2">
                    {results.viva.slice(0, 5).map(v => (
                      <div
                        key={v.id}
                        onClick={() => {
                          setActiveTab('viva');
                          setIsSearchOpen(false);
                        }}
                        className="p-3 rounded-xl bg-cyber-850 hover:bg-cyber-800 border border-cyber-700/60 hover:border-amber-500/40 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60">
                            {v.category} • {v.difficulty}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {v.expTitle.split('—')[0]}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-200 mt-1.5">
                          Q: {v.question}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 italic line-clamp-1">
                          A: {v.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* User Notes */}
              {results.notesList.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    My Notes Matches ({results.notesList.length})
                  </h4>
                  <div className="space-y-2">
                    {results.notesList.map(n => (
                      <div
                        key={n.expId}
                        onClick={() => {
                          openExperiment(n.expId);
                          setIsSearchOpen(false);
                        }}
                        className="p-3 rounded-xl bg-cyber-850 hover:bg-cyber-800 border border-cyber-700/60 hover:border-teal-500/40 transition-all cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-teal-300">
                          {n.title}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          "{n.noteText}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
