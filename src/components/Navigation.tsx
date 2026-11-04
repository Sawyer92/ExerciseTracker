import React from 'react';
import { Dumbbell, Calendar, FolderPlus, Library, User } from 'lucide-react';

export type TabType = 'scheda' | 'calendario' | 'gestione' | 'esercizi' | 'profilo';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
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
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#ecf39e] text-[#132a13] scale-105 shadow-xs'
                    : 'group-hover:bg-[#f1f5ec]'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-[#132a13]' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
