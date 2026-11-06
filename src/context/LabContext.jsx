import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const LabContext = createContext(null);

export const LabProvider = ({ children }) => {
  // Completed experiments
  const [completedExperiments, setCompletedExperiments] = useState(() => {
    try {
      const saved = localStorage.getItem('wcc_completed_experiments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Last opened experiment
  const [lastOpenedExperiment, setLastOpenedExperiment] = useState(() => {
    try {
      const saved = localStorage.getItem('wcc_last_experiment');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // Student notes per experiment
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('wcc_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Bookmarked / Important viva questions
  const [importantViva, setImportantViva] = useState(() => {
    try {
      const saved = localStorage.getItem('wcc_important_viva');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Global search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'dashboard', 'experiments', 'simulations', 'analyzer', 'modulation', 'bluetooth', 'security', 'viva', 'progress', 'notes', 'about', 'experiment-detail'
  const [selectedExpId, setSelectedExpId] = useState(1);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('wcc_completed_experiments', JSON.stringify(completedExperiments));
  }, [completedExperiments]);

  useEffect(() => {
    localStorage.setItem('wcc_last_experiment', lastOpenedExperiment.toString());
  }, [lastOpenedExperiment]);

  useEffect(() => {
    localStorage.setItem('wcc_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('wcc_important_viva', JSON.stringify(importantViva));
  }, [importantViva]);

  // Actions
  const markComplete = (id) => {
    if (!completedExperiments.includes(id)) {
      const next = [...completedExperiments, id];
      setCompletedExperiments(next);
      // Trigger celebration if all completed
      if (next.length === 19) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const toggleComplete = (id) => {
    if (completedExperiments.includes(id)) {
      setCompletedExperiments(completedExperiments.filter(x => x !== id));
    } else {
      markComplete(id);
    }
  };

  const openExperiment = (id) => {
    setSelectedExpId(id);
    setLastOpenedExperiment(id);
    setActiveTab('experiment-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveNote = (expId, content) => {
    setNotes(prev => ({
      ...prev,
      [expId]: content
    }));
  };

  const deleteNote = (expId) => {
    setNotes(prev => {
      const copy = { ...prev };
      delete copy[expId];
      return copy;
    });
  };

  const toggleImportantViva = (questionId) => {
    setImportantViva(prev => 
      prev.includes(questionId) 
        ? prev.filter(q => q !== questionId) 
        : [...prev, questionId]
    );
  };

  const resetAllProgress = () => {
    if (window.confirm("Are you sure you want to reset all lab progress and notes?")) {
      setCompletedExperiments([]);
      setNotes({});
      setImportantViva([]);
      localStorage.removeItem('wcc_completed_experiments');
      localStorage.removeItem('wcc_notes');
      localStorage.removeItem('wcc_important_viva');
    }
  };

  // Metrics
  const totalCount = 19;
  const completedCount = completedExperiments.length;
  const remainingCount = totalCount - completedCount;
  const inProgressCount = (totalCount > completedCount && completedCount > 0) ? 1 : 0;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const badges = [
    {
      id: "first_step",
      title: "FIRST EXPERIMENT",
      desc: "Completed your first wireless communication experiment.",
      unlocked: completedCount >= 1,
      icon: "Award"
    },
    {
      id: "bronze_five",
      title: "5 EXPERIMENTS",
      desc: "Demonstrated strong foundation across 5 lab modules.",
      unlocked: completedCount >= 5,
      icon: "Zap"
    },
    {
      id: "silver_ten",
      title: "10 EXPERIMENTS",
      desc: "Advanced through over half of the virtual lab curriculum.",
      unlocked: completedCount >= 10,
      icon: "ShieldCheck"
    },
    {
      id: "gold_all",
      title: "ALL 19 COMPLETE",
      desc: "Master of Wireless Communication Command Center Virtual Lab.",
      unlocked: completedCount === 19,
      icon: "Crown"
    }
  ];

  return (
    <LabContext.Provider
      value={{
        completedExperiments,
        lastOpenedExperiment,
        notes,
        importantViva,
        isSearchOpen,
        setIsSearchOpen,
        activeTab,
        setActiveTab,
        selectedExpId,
        setSelectedExpId,
        openExperiment,
        markComplete,
        toggleComplete,
        saveNote,
        deleteNote,
        toggleImportantViva,
        resetAllProgress,
        totalCount,
        completedCount,
        inProgressCount,
        remainingCount,
        progressPercentage,
        badges
      }}
    >
      {children}
    </LabContext.Provider>
  );
};

export const useLab = () => {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error('useLab must be used within a LabProvider');
  }
  return context;
};
