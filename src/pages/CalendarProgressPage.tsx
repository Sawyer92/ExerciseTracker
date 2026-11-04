import React, { useState, useMemo } from 'react';
import { CompletedWorkoutLog } from '../types';
import { getWorkoutLogs, deleteWorkoutLog } from '../utils/storage';
import {
  ITALIAN_MONTHS,
  ITALIAN_DAYS_SHORT,
  getMonthMatrix,
  formatDateToYYYYMMDD,
  formatItalianDateString,
  calculateWorkoutStreak
} from '../utils/calendarUtils';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Flame,
  Dumbbell,
  Trophy,
  Clock,
  Trash2,
  CheckCircle2,
  Info
} from 'lucide-react';

export const CalendarProgressPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    formatDateToYYYYMMDD(new Date())
  );
  const [logs, setLogs] = useState<CompletedWorkoutLog[]>(() => getWorkoutLogs());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDateStr(formatDateToYYYYMMDD(now));
  };

  // Matrix of days for current month view
  const monthMatrix = useMemo(() => {
    return getMonthMatrix(currentYear, currentMonth, logs);
  }, [currentYear, currentMonth, logs]);

  // Streak metrics
  const streakInfo = useMemo(() => {
    return calculateWorkoutStreak(logs);
  }, [logs]);

  // Month stats
  const monthStats = useMemo(() => {
    const monthLogs = logs.filter((log) => {
      const [y, m] = log.date.split('-').map(Number);
      return y === currentYear && m === currentMonth + 1;
    });

    const workoutsCount = monthLogs.length;
    const totalVolume = monthLogs.reduce((acc, l) => acc + (l.totalVolumeKg || 0), 0);
    const totalSets = monthLogs.reduce((acc, l) => acc + (l.totalSetsCompleted || 0), 0);

    return { workoutsCount, totalVolume, totalSets };
  }, [currentYear, currentMonth, logs]);

  // Logs for selected date
  const selectedDayLogs = useMemo(() => {
    return logs.filter((l) => l.date === selectedDateStr);
  }, [logs, selectedDateStr]);

  const handleDeleteLog = (id: string) => {
    if (window.confirm('Vuoi eliminare la registrazione di questo allenamento?')) {
      deleteWorkoutLog(id);
      setLogs(getWorkoutLogs());
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <div className="p-4 bg-white border-b border-[#e6eee1] sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4f772d]">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Diario & Progressi</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-[#132a13] font-display">
              Calendario Allenamenti
            </h1>
          </div>

          <button
            type="button"
            onClick={handleToday}
            className="px-3 py-1.5 rounded-xl bg-[#f0f5ec] hover:bg-[#e4ede0] text-xs font-bold text-[#31572c] transition"
          >
            Oggi
          </button>
        </div>

        {/* Quick Month Metrics Bar */}
        <div className="grid grid-cols-3 gap-2 bg-[#f9faf7] p-2.5 rounded-2xl border border-[#e8efe5]">
          <div className="text-center">
            <span className="text-[10px] text-neutral-600 font-bold uppercase block">Streak Attivo</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Flame className="w-4 h-4 text-orange-700 fill-orange-700" />
              <span className="text-sm font-extrabold text-[#132a13]">
                {streakInfo.currentStreak} {streakInfo.currentStreak === 1 ? 'giorno' : 'giorni'}
              </span>
            </div>
          </div>

          <div className="text-center border-x border-[#e2ece0]">
            <span className="text-[10px] text-neutral-600 font-bold uppercase block">Sessioni Mese</span>
            <span className="text-sm font-extrabold text-[#31572c] mt-0.5 block">
              {monthStats.workoutsCount}
            </span>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-neutral-600 font-bold uppercase block">Volume Sollevato</span>
            <span className="text-sm font-extrabold text-[#132a13] mt-0.5 block">
              {monthStats.totalVolume > 1000
                ? `${(monthStats.totalVolume / 1000).toFixed(1)}k kg`
                : `${monthStats.totalVolume} kg`}
            </span>
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="p-4 space-y-4 flex-1">
        <div className="bg-white rounded-3xl border border-[#e2ebe0] p-4 shadow-xs">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#132a13]">
              {ITALIAN_MONTHS[currentMonth]} {currentYear}
            </h2>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-xl bg-[#f4f7f2] hover:bg-[#e6eee3] text-[#31572c] flex items-center justify-center transition"
                aria-label="Mese precedente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-xl bg-[#f4f7f2] hover:bg-[#e6eee3] text-[#31572c] flex items-center justify-center transition"
                aria-label="Mese successivo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels (Lun, Mar, Mer...) */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {ITALIAN_DAYS_SHORT.map((day) => (
              <span
                key={day}
                className="text-[11px] font-bold text-neutral-600 uppercase py-1"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Cells */}
          <div className="space-y-1">
            {monthMatrix.map((week, weekIdx) => (
              <div key={weekIdx} className="grid grid-cols-7 gap-1">
                {week.map((cell) => {
                  const isSelected = cell.date === selectedDateStr;
                  const hasWorkout = cell.logs.length > 0;

                  return (
                    <button
                      key={cell.date}
                      type="button"
                      onClick={() => setSelectedDateStr(cell.date)}
                      className={`h-11 rounded-xl flex flex-col items-center justify-center relative transition-all ${
                        isSelected
                          ? 'bg-[#132a13] text-white font-bold shadow-md scale-102 ring-2 ring-[#ecf39e]'
                          : hasWorkout
                          ? 'bg-[#ecf39e]/30 text-[#132a13] font-bold hover:bg-[#ecf39e]/50 border border-[#90a955]/40'
                          : cell.isCurrentMonth
                          ? 'text-neutral-800 hover:bg-[#f2f6f0]'
                          : 'text-neutral-300 hover:bg-neutral-50'
                      } ${cell.isToday && !isSelected ? 'ring-2 ring-[#31572c]/40' : ''}`}
                    >
                      <span className="text-xs">{cell.dayNumber}</span>

                      {/* Workout Indicator Dot or Icon */}
                      {hasWorkout && (
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-[#ecf39e]' : 'bg-[#31572c]'
                            }`}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Details for Selected Day */}
        <div className="bg-[#fafcf9] rounded-3xl border border-[#e2ebe0] p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#e9efe6] mb-3">
            <div>
              <span className="text-[10px] text-neutral-600 font-bold uppercase">
                Dettaglio Giorno
              </span>
              <h3 className="text-sm font-bold text-[#132a13]">
                {formatItalianDateString(selectedDateStr)}
              </h3>
            </div>

            {selectedDayLogs.length > 0 && (
              <span className="text-xs font-bold text-[#31572c] bg-[#ecf39e]/40 px-2.5 py-1 rounded-lg border border-[#90a955]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#31572c]" /> Allenamento Registrato
              </span>
            )}
          </div>

          {selectedDayLogs.length === 0 ? (
            <div className="py-8 text-center text-neutral-600">
              <Dumbbell className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#4f772d]" />
              <p className="text-xs font-semibold text-neutral-600">
                Nessun allenamento registrato in questa data.
              </p>
              <p className="text-[11px] text-neutral-600 mt-1">
                Completa una sessione dalla scheda principale per vederla comparire qui!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDayLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white rounded-2xl border border-[#e2ece0] p-3.5 shadow-xs"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#132a13]">
                        {log.dayName || log.routineName}
                      </h4>
                      <p className="text-[11px] text-neutral-600">
                        {log.routineName}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteLog(log.id)}
                      className="p-1.5 rounded-lg text-neutral-300 hover:text-red-600 hover:bg-red-50 transition"
                      title="Elimina registrazione"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Summary Badges */}
                  <div className="grid grid-cols-3 gap-2 mb-3 bg-[#f8faf6] p-2 rounded-xl border border-[#e8efe5] text-center">
                    <div>
                      <span className="text-[9px] text-neutral-600 uppercase font-bold block">Durata</span>
                      <span className="text-xs font-bold text-[#132a13]">
                        {log.durationMinutes} min
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-600 uppercase font-bold block">Volume</span>
                      <span className="text-xs font-bold text-[#31572c]">
                        {log.totalVolumeKg.toLocaleString()} kg
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-600 uppercase font-bold block">Serie Concluse</span>
                      <span className="text-xs font-bold text-[#132a13]">
                        {log.totalSetsCompleted}
                      </span>
                    </div>
                  </div>

                  {/* Exercises and sets overview */}
                  {log.exercises && log.exercises.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider block">
                        Esercizi Eseguiti ({log.exercises.length})
                      </span>
                      <div className="divide-y divide-[#edf3eb]">
                        {log.exercises.map((ex, exIdx) => {
                          const completed = ex.sets.filter((s) => s.completed);
                          return (
                            <div key={exIdx} className="py-2 flex items-center justify-between text-xs">
                              <div className="min-w-0 flex-1 pr-2">
                                <span className="font-bold text-[#132a13] truncate block">
                                  {ex.exerciseNameIt || ex.exerciseName}
                                </span>
                                <span className="text-[10px] text-[#4f772d] font-semibold">
                                  {ex.muscleGroup} • {completed.length} serie
                                </span>
                              </div>

                              {/* Sets summary preview */}
                              <div className="text-right text-[11px] text-neutral-600 font-medium whitespace-nowrap">
                                {completed.slice(0, 3).map((s, sIdx) => (
                                  <span key={sIdx} className="ml-1 bg-[#f4f7f2] px-1.5 py-0.5 rounded text-[#132a13] font-bold">
                                    {s.actualWeightKg ?? s.targetWeightKg}k×{s.actualReps ?? s.targetReps}
                                  </span>
                                ))}
                                {completed.length > 3 && (
                                  <span className="text-[10px] text-neutral-600 ml-1">+{completed.length - 3}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {log.notes && (
                    <div className="mt-2.5 p-2 bg-[#f4f7f2] rounded-xl text-[11px] text-neutral-600 italic">
                      "{log.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
