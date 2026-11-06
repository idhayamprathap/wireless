import React from 'react';
import { LabProvider, useLab } from './context/LabContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ExperimentsListPage } from './pages/ExperimentsListPage';
import { ExperimentShell } from './components/experiments/ExperimentShell';
import { VirtualSimulationsPage } from './pages/VirtualSimulationsPage';
import { NetworkAnalyzerPage } from './pages/NetworkAnalyzerPage';
import { ModulationLabPage } from './pages/ModulationLabPage';
import { BluetoothLabPage } from './pages/BluetoothLabPage';
import { WlanSecurityPage } from './pages/WlanSecurityPage';
import { VivaPreparationPage } from './pages/VivaPreparationPage';
import { ProgressPage } from './pages/ProgressPage';
import { MyNotesPage } from './pages/MyNotesPage';
import { AboutPage } from './pages/AboutPage';

function AppContent() {
  const { activeTab, setActiveTab, selectedExpId } = useLab();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'experiments':
        return <ExperimentsListPage />;
      case 'experiment-detail':
        return (
          <ExperimentShell
            expId={selectedExpId}
            onBackToList={() => setActiveTab('experiments')}
          />
        );
      case 'simulations':
        return <VirtualSimulationsPage />;
      case 'analyzer':
        return <NetworkAnalyzerPage />;
      case 'modulation':
        return <ModulationLabPage />;
      case 'bluetooth':
        return <BluetoothLabPage />;
      case 'security':
        return <WlanSecurityPage />;
      case 'viva':
        return <VivaPreparationPage />;
      case 'progress':
        return <ProgressPage />;
      case 'notes':
        return <MyNotesPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cyber-950 text-slate-100 font-tech selection:bg-cyan-500 selection:text-black">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderActiveView()}
      </main>
      <Footer />
      <SearchModal />
    </div>
  );
}

export default function App() {
  return (
    <LabProvider>
      <AppContent />
    </LabProvider>
  );
}
