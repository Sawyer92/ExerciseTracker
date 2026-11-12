import React from 'react';
import { Dumbbell, Calendar, FolderPlus, Library, User } from 'lucide-react';

export type TabType = 'scheda' | 'calendario' | 'gestione' | 'esercizi' | 'profilo';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
  hasActiveWorkout?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  hasActiveWorkout = false,
}) => {
  const tabs = [
    { id: 'scheda', label: 'Scheda', icon: Dumbbell },
    { id: 'calendario', label: 'Calendario', icon: Calendar },
    { id: 'gestione', label: 'Crea Scheda', icon: FolderPlus },
    { id: 'esercizi', label: 'Esercizi', icon: Library },
    { id: 'profilo', label: 'Profilo', icon: User },
  ] as const;

  return (
    <nav aria-label="Navigazione principale" className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2e8dd] px-2 py-2 safe-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isSchedaActiveWorkout = tab.id === 'scheda' && hasActiveWorkout;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id as TabType)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative group ${
                isActive
                  ? 'text-[#132a13] font-bold'
                  : 'text-[#4f772d]/70 hover:text-[#132a13]'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all relative ${
                  isActive
                    ? 'bg-[#ecf39e] text-[#132a13] scale-105 shadow-xs'
                    : 'group-hover:bg-[#f1f5ec]'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
                {isSchedaActiveWorkout && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#31572c]"></span>
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight flex items-center gap-1 ${isActive ? 'font-bold text-[#132a13]' : 'font-medium'}`}>
                {tab.label}
                {isSchedaActiveWorkout && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#31572c] animate-pulse"></span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
