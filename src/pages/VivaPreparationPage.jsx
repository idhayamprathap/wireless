import React, { useState, useMemo } from 'react';
import { useLab } from '../context/LabContext';
import { VIVA_QUESTIONS } from '../data/vivaData';
import { EXPERIMENTS } from '../data/experimentsData';
import { 
  HelpCircle, 
  Bookmark, 
  CheckCircle2, 
  Search, 
  RotateCcw, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { SimulationBadge } from '../components/common/SimulationBadge';

export const VivaPreparationPage = () => {
  const { importantViva, toggleImportantViva } = useLab();

  const [selectedExpFilter, setSelectedExpFilter] = useState('ALL');
  const [selectedDiffFilter, setSelectedDiffFilter] = useState('ALL');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Active question index in filtered list
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const filteredQuestions = useMemo(() => {
    return VIVA_QUESTIONS.filter((q) => {
      if (selectedExpFilter !== 'ALL' && q.expId !== parseInt(selectedExpFilter, 10)) return false;
      if (selectedDiffFilter !== 'ALL' && q.difficulty !== selectedDiffFilter) return false;
      if (onlyBookmarked && !importantViva.includes(q.id)) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query);
      }
      return true;
    });
  }, [selectedExpFilter, selectedDiffFilter, onlyBookmarked, searchQuery, importantViva]);

  // Handle index boundaries
  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];
  const isBookmarked = currentQ ? importantViva.includes(currentQ.id) : false;
  const isRevealed = currentQ ? !!revealedAnswers[currentQ.id] : false;

  const toggleAnswer = () => {
    if (!currentQ) return;
    setRevealedAnswers(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const nextQuestion = () => {
    if (filteredQuestions.length > 0) {
      setCurrentIndex((currentIndex + 1) % filteredQuestions.length);
    }
  };

  const prevQuestion = () => {
    if (filteredQuestions.length > 0) {
      setCurrentIndex((currentIndex - 1 + filteredQuestions.length) % filteredQuestions.length);
    }
  };

  const randomQuestion = () => {
    if (filteredQuestions.length > 1) {
      const rand = Math.floor(Math.random() * filteredQuestions.length);
      setCurrentIndex(rand);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyber-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            PRACTICAL VIVA PREPARATION CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
            Oral Examination Master System
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-amber-300 bg-amber-950 px-3 py-1.5 rounded-lg border border-amber-800 font-bold">
            {importantViva.length} Questions Marked Important
          </span>
          <SimulationBadge />
        </div>
      </div>

      {/* Filter and Controls Header */}
      <div className="p-5 rounded-xl bg-cyber-900/90 border border-cyber-700/80 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Experiment Filter */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Filter by Experiment:</label>
            <select
              value={selectedExpFilter}
              onChange={(e) => {
                setSelectedExpFilter(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full bg-cyber-800 border border-cyber-700 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
            >
              <option value="ALL">All 19 Experiments</option>
              {EXPERIMENTS.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  Exp {exp.number}: {exp.title}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Difficulty Level:</label>
            <div className="flex rounded-lg bg-cyber-800 p-0.5 border border-cyber-700 text-xs font-mono">
              {['ALL', 'EASY', 'MEDIUM', 'IMPORTANT'].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDiffFilter(d);
                    setCurrentIndex(0);
                  }}
                  className={`flex-1 py-1.5 rounded text-[11px] transition-all ${
                    selectedDiffFilter === d
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Bookmarked Filter Toggle */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setOnlyBookmarked(!onlyBookmarked);
                setCurrentIndex(0);
              }}
              className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                onlyBookmarked
                  ? 'bg-amber-950 text-amber-300 border-amber-500 shadow-glow-orange-sm'
                  : 'bg-cyber-800 text-slate-400 border-cyber-700 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{onlyBookmarked ? 'SHOWING MARKED IMPORTANT' : 'VIEW MARKED IMPORTANT ONLY'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Flashcard Interactive Display */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-cyber-900 border border-cyber-800 space-y-3">
          <HelpCircle className="w-10 h-10 mx-auto text-slate-600" />
          <h3 className="font-mono text-sm font-bold text-slate-300">
            No Viva Questions Match Current Filter
          </h3>
          <p className="text-xs text-slate-500">
            Try resetting your difficulty or experiment filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border-2 border-cyan-500/40 shadow-glow-cyan-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-cyber-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                  CARD {currentIndex + 1} OF {filteredQuestions.length}
                </span>
                <span className="text-slate-400">
                  {currentQ.expTitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  currentQ.difficulty === 'IMPORTANT' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  currentQ.difficulty === 'MEDIUM' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                  'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {currentQ.difficulty}
                </span>

                <button
                  onClick={() => toggleImportantViva(currentQ.id)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    isBookmarked
                      ? 'bg-amber-950 text-amber-300 border-amber-500'
                      : 'bg-cyber-850 text-slate-500 hover:text-white border-cyber-700'
                  }`}
                  title="Mark as Important"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question Header */}
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold">
                QUESTION:
              </span>
              <h2 className="text-lg sm:text-xl font-mono font-bold text-white leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Answer Box Toggle */}
            <div className="pt-2">
              <button
                onClick={toggleAnswer}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono font-bold text-xs shadow-glow-cyan transition-all"
              >
                {isRevealed ? 'HIDE ANSWER' : 'SHOW ANSWER'}
              </button>

              {isRevealed && (
                <div className="mt-4 p-5 rounded-xl bg-cyber-950 border border-cyan-500/50 text-slate-200 leading-relaxed font-tech text-sm animate-in fade-in duration-150">
                  <div className="text-xs font-mono text-cyan-400 font-bold mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    CONCISE VIVA ANSWER:
                  </div>
                  {currentQ.answer}
                </div>
              )}
            </div>
          </div>

          {/* Controls Bar: Prev, Next, Random, Mark Important */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={prevQuestion}
                className="px-4 py-2 rounded-xl bg-cyber-850 hover:bg-cyber-800 text-slate-300 border border-cyber-700 text-xs font-mono transition-all"
              >
                &larr; Previous
              </button>

              <button
                onClick={nextQuestion}
                className="px-4 py-2 rounded-xl bg-cyber-800 hover:bg-cyber-750 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all"
              >
                Next Question &rarr;
              </button>

              <button
                onClick={randomQuestion}
                className="px-4 py-2 rounded-xl bg-cyber-850 hover:bg-cyber-800 text-slate-400 hover:text-white border border-cyber-700 text-xs font-mono transition-all"
              >
                Random Question
              </button>
            </div>

            <button
              onClick={() => toggleImportantViva(currentQ.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
                isBookmarked
                  ? 'bg-amber-950 text-amber-300 border-amber-500'
                  : 'bg-cyber-850 text-slate-300 border-cyber-700 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isBookmarked ? 'Remove Bookmark' : 'Mark Important'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
