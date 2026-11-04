import React, { useState } from 'react';
import { Navigation, TabType } from './components/Navigation';
import { CurrentRoutinePage } from './pages/CurrentRoutinePage';
import { CalendarProgressPage } from './pages/CalendarProgressPage';
import { RoutineManagementPage } from './pages/RoutineManagementPage';
import { ExerciseCatalogPage } from './pages/ExerciseCatalogPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('scheda');

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'scheda':
        return <CurrentRoutinePage onNavigateToTab={(tab) => setActiveTab(tab)} />;
      case 'calendario':
        return <CalendarProgressPage />;
      case 'gestione':
        return <RoutineManagementPage onNavigateToTab={(tab) => setActiveTab(tab)} />;
      case 'esercizi':
        return <ExerciseCatalogPage />;
      case 'profilo':
        return <ProfilePage />;
      default:
        return <CurrentRoutinePage onNavigateToTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8faf7] flex justify-center text-[#132a13]">
      <div className="w-full max-w-2xl min-h-screen bg-white shadow-xs md:border-x md:border-[#e8efe5] flex flex-col relative">
        <main className="flex-1 flex flex-col min-h-0">
          {renderCurrentPage()}
        </main>
        <Navigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      </div>
    </div>
  );
}
