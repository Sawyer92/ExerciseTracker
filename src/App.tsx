import React, { useState, useEffect } from 'react';
import { Navigation, TabType } from './components/Navigation';
import { CurrentRoutinePage } from './pages/CurrentRoutinePage';
import { CalendarProgressPage } from './pages/CalendarProgressPage';
import { RoutineManagementPage } from './pages/RoutineManagementPage';
import { ExerciseCatalogPage } from './pages/ExerciseCatalogPage';
import { ProfilePage } from './pages/ProfilePage';
import { getActiveSessionCache, LiveSessionState } from './utils/storage';
import { Play, Timer, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('scheda');
  const [activeSession, setActiveSession] = useState<LiveSessionState | null>(() => getActiveSessionCache());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Sync active session from storage & custom events
  useEffect(() => {
    const syncSession = () => {
      const cached = getActiveSessionCache();
      setActiveSession(cached);
      if (cached?.startTime) {
        setElapsedSeconds(
          Math.max(0, Math.floor((Date.now() - new Date(cached.startTime).getTime()) / 1000))
        );
      }
    };

    syncSession();

    const handleCustomUpdate = (e: Event) => {
      const detail = (e as CustomEvent<LiveSessionState | null>).detail;
      setActiveSession(detail);
      if (detail?.startTime) {
        setElapsedSeconds(
          Math.max(0, Math.floor((Date.now() - new Date(detail.startTime).getTime()) / 1000))
        );
      }
    };

    window.addEventListener('fittrack_session_updated', handleCustomUpdate);
    window.addEventListener('storage', syncSession);

    return () => {
      window.removeEventListener('fittrack_session_updated', handleCustomUpdate);
      window.removeEventListener('storage', syncSession);
    };
  }, []);

  // Timer interval for elapsed time
  useEffect(() => {
    if (!activeSession?.startTime) return;

    const interval = setInterval(() => {
      setElapsedSeconds(
        Math.max(0, Math.floor((Date.now() - new Date(activeSession.startTime).getTime()) / 1000))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession?.startTime]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

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

        {/* Floating Mini Banner when navigating on other tabs during an active workout */}
        {activeTab !== 'scheda' && activeSession && (
          <div className="sticky bottom-16 z-30 px-3 pb-2 pt-1 bg-gradient-to-t from-white via-white/95 to-transparent">
            <div className="bg-[#132a13] text-white p-3 rounded-2xl shadow-lg flex items-center justify-between gap-3 border border-[#31572c]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#ecf39e] text-[#132a13] flex items-center justify-center shrink-0">
                  <Timer className="w-4 h-4 animate-pulse text-[#31572c]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ecf39e]">
                      Scheda in esecuzione
                    </span>
                    <span className="text-[11px] font-mono font-bold text-white/90">
                      {formatTime(elapsedSeconds)}
                    </span>
                  </div>
                  <p className="text-xs font-semibold truncate text-white">
                    {activeSession.routineName} • {activeSession.dayName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('scheda')}
                className="px-3 py-1.5 rounded-xl bg-[#ecf39e] hover:bg-[#dbe68b] text-[#132a13] font-bold text-xs shrink-0 flex items-center gap-1 transition shadow-xs"
              >
                <span>Riprendi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <Navigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          hasActiveWorkout={!!activeSession}
        />
      </div>
    </div>
  );
}

