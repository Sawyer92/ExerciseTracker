import React, { useState, useEffect } from 'react';
import {
  WorkoutRoutine,
  RoutineDay,
  WorkoutExercise,
  WorkoutSet,
  CompletedWorkoutLog,
  Exercise,
  UserProfile,
  LiveSessionState,
} from '../types';
import {
  getRoutines,
  getActiveRoutine,
  setActiveRoutineId,
  saveRoutine,
  saveWorkoutLog,
  getLastPerformanceForExercise,
  getUserProfile,
  getActiveSessionCache,
  saveActiveSessionCache,
  clearActiveSessionCache,
} from '../utils/storage';
import { SetRow } from '../components/SetRow';
import { RestTimerModal } from '../components/RestTimerModal';
import { ExercisePickerModal } from '../components/ExercisePickerModal';
import { ExerciseDetailModal } from '../components/ExerciseDetailModal';
import {
  Dumbbell,
  Play,
  CheckCircle2,
  Plus,
  Timer,
  Flame,
  Calendar,
  AlertCircle,
  Clock,
  Info,
  ChevronRight,
  ArrowLeft,
  Layers,
  Sparkles,
  Check,
  RotateCcw,
  UserPlus,
  X,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CurrentRoutinePageProps {
  onNavigateToTab: (tab: 'scheda' | 'calendario' | 'gestione' | 'esercizi' | 'profilo') => void;
}

export const CurrentRoutinePage: React.FC<CurrentRoutinePageProps> = ({
  onNavigateToTab,
}) => {
  const [routines, setRoutines] = useState<WorkoutRoutine[]>([]);
  const [activeRoutine, setActiveRoutine] = useState<WorkoutRoutine | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'selection' | 'workout'>('selection');
  const [routineFilter, setRoutineFilter] = useState<string>('all');

  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [workoutElapsedSeconds, setWorkoutElapsedSeconds] = useState(0);
  const [pendingSwitchRoutine, setPendingSwitchRoutine] = useState<{
    routine: WorkoutRoutine;
    dayIdx: number;
  } | null>(null);

  // Modals state
  const [restTimerOpen, setRestTimerOpen] = useState(false);
  const [restTimerSeconds, setRestTimerSeconds] = useState(90);
  const [timerExerciseName, setTimerExerciseName] = useState('');
  const [pickerModalOpen, setPickerModalOpen] = useState(false);
  const [inspectExercise, setInspectExercise] = useState<Exercise | null>(null);

  // Auto-save toast notification indicator
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState<string | null>(null);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => getUserProfile());

  // Load routines on mount and sync active workout session
  const refreshRoutines = () => {
    const list = getRoutines();
    setRoutines(list);

    // Check if an active session exists in localStorage
    const cachedSession = getActiveSessionCache();
    if (cachedSession) {
      const match = list.find((r) => r.id === cachedSession.routineId);
      if (match) {
        setActiveRoutine(match);
        const dayIdx = Math.max(0, Math.min(match.days.length - 1, cachedSession.dayIndex ?? 0));
        setSelectedDayIndex(dayIdx);
        setIsWorkoutActive(true);
        const start = new Date(cachedSession.startTime);
        setWorkoutStartTime(start);
        setWorkoutElapsedSeconds(
          Math.max(0, Math.floor((Date.now() - start.getTime()) / 1000))
        );
        setUserProfile(getUserProfile());
        return;
      }
    }

    const active = getActiveRoutine();
    if (active) {
      setActiveRoutine(active);
    } else if (list.length > 0) {
      setActiveRoutine(list[0]);
    } else {
      setActiveRoutine(null);
    }
    setUserProfile(getUserProfile());
  };

  useEffect(() => {
    refreshRoutines();

    const handleSessionUpdate = () => {
      const cached = getActiveSessionCache();
      if (!cached) {
        setIsWorkoutActive(false);
        setWorkoutStartTime(null);
        setWorkoutElapsedSeconds(0);
      }
    };

    window.addEventListener('fittrack_session_updated', handleSessionUpdate);
    return () => {
      window.removeEventListener('fittrack_session_updated', handleSessionUpdate);
    };
  }, []);

  // Workout duration counter
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isWorkoutActive && workoutStartTime) {
      interval = setInterval(() => {
        setWorkoutElapsedSeconds(
          Math.floor((Date.now() - workoutStartTime.getTime()) / 1000)
        );
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWorkoutActive, workoutStartTime]);

  const currentDay: RoutineDay | undefined = activeRoutine?.days[selectedDayIndex];

  // Update routine with automatic persistence
  const handleUpdateRoutine = (updatedRoutine: WorkoutRoutine) => {
    setActiveRoutine(updatedRoutine);
    saveRoutine(updatedRoutine);
    setRoutines((prev) =>
      prev.map((r) => (r.id === updatedRoutine.id ? updatedRoutine : r))
    );
    setLastAutoSaveTime(
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    );
  };

  // Launch a specific routine and day
  const handleStartScheda = (routine: WorkoutRoutine, dayIdx: number) => {
    // If the selected routine and day is ALREADY in execution, simply resume it
    if (isWorkoutActive && activeRoutine?.id === routine.id && selectedDayIndex === dayIdx) {
      setViewMode('workout');
      return;
    }

    // If another workout is already in progress, ask for confirmation
    if (isWorkoutActive && (activeRoutine?.id !== routine.id || selectedDayIndex !== dayIdx)) {
      setPendingSwitchRoutine({ routine, dayIdx });
      return;
    }

    startNewWorkoutSession(routine, dayIdx);
  };

  const startNewWorkoutSession = (routine: WorkoutRoutine, dayIdx: number) => {
    setActiveRoutine(routine);
    setActiveRoutineId(routine.id);
    setSelectedDayIndex(dayIdx);
    setViewMode('workout');

    const now = new Date();
    setIsWorkoutActive(true);
    setWorkoutStartTime(now);
    setWorkoutElapsedSeconds(0);

    const targetDay = routine.days[dayIdx];
    const newSession: LiveSessionState = {
      routineId: routine.id,
      routineName: routine.name,
      dayId: targetDay?.id || `day-${dayIdx}`,
      dayIndex: dayIdx,
      dayName: targetDay?.name || `Giorno ${dayIdx + 1}`,
      date: now.toISOString().split('T')[0],
      startTime: now.toISOString(),
      exercises: JSON.parse(JSON.stringify(targetDay?.exercises || [])),
      notes: targetDay?.notes || '',
    };
    saveActiveSessionCache(newSession);
  };

  // Update a single set in an exercise (Auto-save trigger)
  const handleUpdateSet = (exerciseIndex: number, setIndex: number, updatedSet: WorkoutSet) => {
    if (!activeRoutine || !currentDay) return;

    const newDays = [...activeRoutine.days];
    const newExercises = [...currentDay.exercises];
    const targetExercise = { ...newExercises[exerciseIndex] };
    const newSets = [...targetExercise.sets];

    newSets[setIndex] = updatedSet;
    targetExercise.sets = newSets;
    newExercises[exerciseIndex] = targetExercise;
    newDays[selectedDayIndex] = { ...currentDay, exercises: newExercises };

    const updatedRoutine: WorkoutRoutine = {
      ...activeRoutine,
      days: newDays,
    };

    handleUpdateRoutine(updatedRoutine);

    // Synchronize changes to active session cache
    if (isWorkoutActive && workoutStartTime) {
      const session: LiveSessionState = {
        routineId: activeRoutine.id,
        routineName: activeRoutine.name,
        dayId: currentDay.id,
        dayIndex: selectedDayIndex,
        dayName: currentDay.name,
        date: new Date().toISOString().split('T')[0],
        startTime: workoutStartTime.toISOString(),
        exercises: newExercises,
        notes: currentDay.notes,
      };
      saveActiveSessionCache(session);
    }
  };

  // Add a new set to an exercise
  const handleAddSet = (exerciseIndex: number) => {
    if (!activeRoutine || !currentDay) return;
    const targetExercise = currentDay.exercises[exerciseIndex];
    const lastSet = targetExercise.sets[targetExercise.sets.length - 1];

    const nextNumber = targetExercise.sets.length + 1;
    const newSet: WorkoutSet = {
      setNumber: nextNumber,
      targetReps: lastSet ? lastSet.targetReps : 10,
      targetWeightKg: lastSet ? lastSet.targetWeightKg : 20,
      actualReps: lastSet ? lastSet.targetReps : 10,
      actualWeightKg: lastSet ? lastSet.targetWeightKg : 20,
      completed: false,
    };

    const newDays = [...activeRoutine.days];
    const newExercises = [...currentDay.exercises];
    newExercises[exerciseIndex] = {
      ...targetExercise,
      sets: [...targetExercise.sets, newSet],
    };
    newDays[selectedDayIndex] = { ...currentDay, exercises: newExercises };

    const updatedRoutine = { ...activeRoutine, days: newDays };
    handleUpdateRoutine(updatedRoutine);

    if (isWorkoutActive && workoutStartTime) {
      saveActiveSessionCache({
        routineId: activeRoutine.id,
        routineName: activeRoutine.name,
        dayId: currentDay.id,
        dayIndex: selectedDayIndex,
        dayName: currentDay.name,
        date: new Date().toISOString().split('T')[0],
        startTime: workoutStartTime.toISOString(),
        exercises: newExercises,
        notes: currentDay.notes,
      });
    }
  };

  // Remove a set from an exercise
  const handleDeleteSet = (exerciseIndex: number, setIndex: number) => {
    if (!activeRoutine || !currentDay) return;
    const targetExercise = currentDay.exercises[exerciseIndex];
    const newSets = targetExercise.sets
      .filter((_, idx) => idx !== setIndex)
      .map((s, idx) => ({ ...s, setNumber: idx + 1 }));

    const newDays = [...activeRoutine.days];
    const newExercises = [...currentDay.exercises];
    newExercises[exerciseIndex] = { ...targetExercise, sets: newSets };
    newDays[selectedDayIndex] = { ...currentDay, exercises: newExercises };

    const updatedRoutine = { ...activeRoutine, days: newDays };
    handleUpdateRoutine(updatedRoutine);

    if (isWorkoutActive && workoutStartTime) {
      saveActiveSessionCache({
        routineId: activeRoutine.id,
        routineName: activeRoutine.name,
        dayId: currentDay.id,
        dayIndex: selectedDayIndex,
        dayName: currentDay.name,
        date: new Date().toISOString().split('T')[0],
        startTime: workoutStartTime.toISOString(),
        exercises: newExercises,
        notes: currentDay.notes,
      });
    }
  };

  // Add selected exercise from picker to the current day
  const handleAddExerciseToDay = (exercise: Exercise) => {
    if (!activeRoutine || !currentDay) return;

    const newWorkoutExercise: WorkoutExercise = {
      exerciseId: exercise.id,
      exerciseName: exercise.nameIt || exercise.name,
      exerciseNameIt: exercise.nameIt || exercise.name,
      muscleGroup: exercise.muscleGroup,
      category: exercise.category,
      image: exercise.image,
      gifUrl: exercise.gifUrl,
      restSeconds: 90,
      sets: [
        { setNumber: 1, targetReps: 10, targetWeightKg: 20, actualReps: 10, actualWeightKg: 20, completed: false },
        { setNumber: 2, targetReps: 10, targetWeightKg: 20, actualReps: 10, actualWeightKg: 20, completed: false },
        { setNumber: 3, targetReps: 10, targetWeightKg: 20, actualReps: 10, actualWeightKg: 20, completed: false },
      ],
    };

    const newDays = [...activeRoutine.days];
    const newExercises = [...currentDay.exercises, newWorkoutExercise];
    newDays[selectedDayIndex] = { ...currentDay, exercises: newExercises };

    const updatedRoutine = { ...activeRoutine, days: newDays };
    handleUpdateRoutine(updatedRoutine);

    if (isWorkoutActive && workoutStartTime) {
      saveActiveSessionCache({
        routineId: activeRoutine.id,
        routineName: activeRoutine.name,
        dayId: currentDay.id,
        dayIndex: selectedDayIndex,
        dayName: currentDay.name,
        date: new Date().toISOString().split('T')[0],
        startTime: workoutStartTime.toISOString(),
        exercises: newExercises,
        notes: currentDay.notes,
      });
    }
  };

  // Remove exercise from day
  const handleDeleteExercise = (exerciseIndex: number) => {
    if (!activeRoutine || !currentDay) return;
    const newDays = [...activeRoutine.days];
    const newExercises = currentDay.exercises.filter((_, idx) => idx !== exerciseIndex);
    newDays[selectedDayIndex] = { ...currentDay, exercises: newExercises };

    const updatedRoutine = { ...activeRoutine, days: newDays };
    handleUpdateRoutine(updatedRoutine);

    if (isWorkoutActive && workoutStartTime) {
      saveActiveSessionCache({
        routineId: activeRoutine.id,
        routineName: activeRoutine.name,
        dayId: currentDay.id,
        dayIndex: selectedDayIndex,
        dayName: currentDay.name,
        date: new Date().toISOString().split('T')[0],
        startTime: workoutStartTime.toISOString(),
        exercises: newExercises,
        notes: currentDay.notes,
      });
    }
  };

  // Start active workout manually
  const handleStartWorkout = () => {
    if (!activeRoutine || !currentDay) return;
    const now = new Date();
    setIsWorkoutActive(true);
    setWorkoutStartTime(now);
    setWorkoutElapsedSeconds(0);

    const newSession: LiveSessionState = {
      routineId: activeRoutine.id,
      routineName: activeRoutine.name,
      dayId: currentDay.id,
      dayIndex: selectedDayIndex,
      dayName: currentDay.name,
      date: now.toISOString().split('T')[0],
      startTime: now.toISOString(),
      exercises: JSON.parse(JSON.stringify(currentDay.exercises || [])),
      notes: currentDay.notes,
    };
    saveActiveSessionCache(newSession);
  };

  // Cancel workout with confirmation
  const handleCancelWorkout = () => {
    if (window.confirm("Sei sicuro di voler annullare l'allenamento in corso? I progressi della sessione attuale verranno cancellati.")) {
      clearActiveSessionCache();
      // Reset completed flags for this session
      if (activeRoutine && currentDay) {
        const resetExercises = currentDay.exercises.map((ex) => ({
          ...ex,
          sets: ex.sets.map((s) => ({ ...s, completed: false })),
        }));
        const newDays = [...activeRoutine.days];
        newDays[selectedDayIndex] = { ...currentDay, exercises: resetExercises };
        handleUpdateRoutine({ ...activeRoutine, days: newDays });
      }
      setIsWorkoutActive(false);
      setWorkoutStartTime(null);
      setWorkoutElapsedSeconds(0);
      setViewMode('selection');
    }
  };

  // Finish active workout & historicize into logs
  const handleFinishWorkout = () => {
    if (!activeRoutine || !currentDay) return;

    // Calculate metrics
    let totalVolumeKg = 0;
    let totalSetsCompleted = 0;

    currentDay.exercises.forEach((ex) => {
      ex.sets.forEach((set) => {
        if (set.completed) {
          totalSetsCompleted++;
          const weight = set.actualWeightKg ?? set.targetWeightKg ?? 0;
          const reps = set.actualReps ?? set.targetReps ?? 0;
          totalVolumeKg += weight * reps;
        }
      });
    });

    const todayStr = new Date().toISOString().split('T')[0];
    const durationMinutes = Math.max(1, Math.round(workoutElapsedSeconds / 60));

    const newLog: CompletedWorkoutLog = {
      id: `log-${Date.now()}`,
      routineId: activeRoutine.id,
      routineName: activeRoutine.name,
      dayId: currentDay.id,
      dayName: currentDay.name,
      date: todayStr,
      startTime: workoutStartTime ? workoutStartTime.toISOString() : new Date().toISOString(),
      endTime: new Date().toISOString(),
      durationMinutes,
      exercises: JSON.parse(JSON.stringify(currentDay.exercises)),
      totalVolumeKg,
      totalSetsCompleted,
      rating: 5,
      notes: `Allenamento completato: ${totalSetsCompleted} serie concluse, ${totalVolumeKg.toLocaleString()} kg sollevati!`,
    };

    saveWorkoutLog(newLog);

    // Confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#31572c', '#4f772d', '#90a955', '#ecf39e', '#132a13'],
      });
    } catch {
      // ignore
    }

    // Reset completed flags for future sessions
    const resetExercises = currentDay.exercises.map((ex) => ({
      ...ex,
      sets: ex.sets.map((s) => ({ ...s, completed: false })),
    }));
    const newDays = [...activeRoutine.days];
    newDays[selectedDayIndex] = { ...currentDay, exercises: resetExercises };
    handleUpdateRoutine({ ...activeRoutine, days: newDays });

    clearActiveSessionCache();
    setIsWorkoutActive(false);
    setWorkoutStartTime(null);
    setWorkoutElapsedSeconds(0);

    // After finishing, return to selection view or navigate to calendar
    setTimeout(() => {
      onNavigateToTab('calendario');
    }, 1200);
  };

  const formatElapsedTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const getFormattedItalianDate = () => {
    const now = new Date();
    const str = now.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const totalSetsCount = currentDay?.exercises.reduce((acc, ex) => acc + ex.sets.length, 0) || 0;
  const completedSetsCount =
    currentDay?.exercises.reduce(
      (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
      0
    ) || 0;
  const progressPercent = totalSetsCount > 0 ? (completedSetsCount / totalSetsCount) * 100 : 0;

  // Flatten all available workout days for display in cards
  const allAvailableCards = routines.flatMap((r) =>
    r.days.map((day, dIdx) => ({
      routine: r,
      day,
      dayIndex: dIdx,
    }))
  );

  const filteredCards =
    routineFilter === 'all'
      ? allAvailableCards
      : allAvailableCards.filter((c) => c.routine.id === routineFilter);

  // -------------------------------------------------------------
  // VIEW 1: SELEZIONE SCHEDE DISPONIBILI (RIQUADRI TONDEGGIANTI)
  // -------------------------------------------------------------
  if (viewMode === 'selection') {
    return (
      <div className="flex-1 flex flex-col bg-[#f8faf7] overflow-y-auto">
        {/* Header Principale */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#e6eee1] sticky top-0 z-20">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="text-xs font-semibold text-[#4f772d] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {userProfile ? `Ciao, ${userProfile.name} • ${getFormattedItalianDate()}` : getFormattedItalianDate()}
            </span>
            <button
              type="button"
              onClick={() => onNavigateToTab('gestione')}
              className="text-xs font-bold text-[#31572c] hover:text-[#132a13] flex items-center gap-1 bg-[#ecf39e]/40 hover:bg-[#ecf39e]/70 px-2.5 py-1 rounded-xl transition"
            >
              <Plus className="w-3.5 h-3.5" /> Nuova Scheda
            </button>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#132a13] tracking-tight font-display">
            Schede Disponibili
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Scegli quale allenamento desideri eseguire oggi per avviare la sessione.
          </p>

          {/* Filtro schede */}
          {routines.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setRoutineFilter('all')}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                  routineFilter === 'all'
                    ? 'bg-[#132a13] text-white shadow-xs'
                    : 'bg-[#f0f4ee] text-[#31572c] hover:bg-[#e4ece0]'
                }`}
              >
                Tutti i Giorni ({allAvailableCards.length})
              </button>
              {routines.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRoutineFilter(r.id)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                    routineFilter === r.id
                      ? 'bg-[#132a13] text-white shadow-xs'
                      : 'bg-[#f0f4ee] text-[#31572c] hover:bg-[#e4ece0]'
                  }`}
                >
                  {r.name} ({r.days.length})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-5 space-y-4 flex-1">
          {/* Missing Profile Reminder Banner */}
          {!userProfile && (
            <div className="bg-[#f0f6ee] border border-[#d2e2cd] rounded-3xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ecf39e] text-[#132a13] flex items-center justify-center shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#132a13]">Nessun profilo configurato</h4>
                  <p className="text-[11px] text-neutral-600">Inserisci i tuoi dati fisici per calcolare il BMI e tenere traccia dei tuoi massimali.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToTab('profilo')}
                className="px-3.5 py-2 rounded-xl bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs whitespace-nowrap shadow-xs transition flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Configura Profilo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Active Workout In Progress Hero Card (Schermata Iniziale) */}
          {isWorkoutActive && activeRoutine && currentDay && (
            <div className="bg-gradient-to-br from-[#132a13] via-[#1c381c] to-[#254d24] text-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-[#b8cb67] relative overflow-hidden animate-in fade-in">
              {/* Subtle ambient light */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#ecf39e]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {/* Top Header: Badge + Live Timer */}
                <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ecf39e] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ecf39e]"></span>
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#ecf39e] font-mono">
                      Scheda in Esecuzione Attiva
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10">
                    <Timer className="w-3.5 h-3.5 text-[#ecf39e] animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white tabular-nums tracking-wide">
                      {formatElapsedTime(workoutElapsedSeconds)}
                    </span>
                  </div>
                </div>

                {/* Routine Title & Day */}
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  {activeRoutine.name}
                </h2>
                <p className="text-xs text-[#d8e6d2] mt-0.5 font-medium">
                  {currentDay.name}
                </p>

                {/* Progress Box */}
                <div className="mt-3.5 bg-white/10 rounded-2xl p-3 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-white">
                    <span className="font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ecf39e]" />
                      <span>{completedSetsCount} di {totalSetsCount} serie completate</span>
                    </span>
                    <span className="font-mono font-bold text-[#ecf39e]">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>

                  <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#ecf39e] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-white/75 pt-1 border-t border-white/10 flex items-center justify-between">
                    <span>{currentDay.exercises.length} esercizi in programma</span>
                    {completedSetsCount === totalSetsCount && totalSetsCount > 0 ? (
                      <span className="text-[#ecf39e] font-bold">Sessione pronta da completare!</span>
                    ) : (
                      <span>Carichi e ripetizioni sincronizzati</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('workout')}
                    className="py-3 px-5 rounded-2xl bg-[#ecf39e] hover:bg-[#dfea8b] text-[#132a13] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
                  >
                    <Play className="w-4 h-4 fill-[#132a13]" />
                    <span>Riprendi Scheda in Corso</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleFinishWorkout}
                      className="flex-1 sm:flex-none py-2.5 px-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition border border-white/15"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ecf39e]" />
                      <span>Termina e Salva</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelWorkout}
                      className="py-2.5 px-3 rounded-xl text-white/60 hover:text-red-300 hover:bg-white/10 text-xs font-semibold transition"
                    >
                      Annulla
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid di Riquadri con Bordi Tondeggianti o Stato Iniziale Vuoto */}
          {routines.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-[#ccd9c7] rounded-3xl p-6 sm:p-8 text-center shadow-xs">
              <div className="w-16 h-16 rounded-3xl bg-[#ecf39e] text-[#132a13] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Dumbbell className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#132a13] mb-1.5 font-display">
                Nessuna Scheda di Allenamento
              </h3>
              <p className="text-xs text-neutral-600 max-w-md mx-auto mb-5 leading-relaxed">
                Inizialmente non è presente alcuna scheda sul dispositivo. Crea la tua prima scheda personalizzata con giorni, esercizi, carichi e ripetizioni. I tuoi dati verranno salvati automaticamente e rimarranno sempre memorizzati sul dispositivo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto mb-6 text-left">
                <div className="bg-[#f8faf6] border border-[#e6eee3] rounded-2xl p-3">
                  <div className="text-[#31572c] font-bold text-xs flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Salvataggio
                  </div>
                  <p className="text-[11px] text-neutral-500">I dati della scheda e le serie si salvano automaticamente ad ogni inserimento.</p>
                </div>
                <div className="bg-[#f8faf6] border border-[#e6eee3] rounded-2xl p-3">
                  <div className="text-[#31572c] font-bold text-xs flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Personalizzabile
                  </div>
                  <p className="text-[11px] text-neutral-500">Aggiungi esercizi dal catalogo con GIF, immagini e carichi di lavoro.</p>
                </div>
                <div className="bg-[#f8faf6] border border-[#e6eee3] rounded-2xl p-3">
                  <div className="text-[#31572c] font-bold text-xs flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5" /> Progressi
                  </div>
                  <p className="text-[11px] text-neutral-500">Ogni allenamento completato viene registrato nello storico del calendario.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onNavigateToTab('gestione')}
                  className="w-full sm:w-auto px-6 py-3 bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs rounded-2xl shadow transition inline-flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Crea la tua prima Scheda
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateToTab('esercizi')}
                  className="w-full sm:w-auto px-5 py-3 bg-[#f0f5ec] hover:bg-[#e4eee0] text-[#31572c] font-bold text-xs rounded-2xl transition inline-flex items-center justify-center gap-1.5"
                >
                  <Dumbbell className="w-3.5 h-3.5" /> Esplora Catalogo Esercizi
                </button>
              </div>
            </div>
          ) : filteredCards.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-[#d8e4d3] rounded-3xl p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#ecf39e] text-[#132a13] flex items-center justify-center mx-auto mb-3">
                <Dumbbell className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#132a13] mb-1">
                Nessuna scheda trovata
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto mb-4">
                Non ci sono schede o giorni per il filtro selezionato.
              </p>
              <button
                type="button"
                onClick={() => setRoutineFilter('all')}
                className="px-5 py-2.5 bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs rounded-2xl shadow transition inline-flex items-center gap-1.5"
              >
                Mostra Tutte le Schede
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredCards.map(({ routine, day, dayIndex }) => {
                const totalDaySets = day.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
                const estimatedMinutes = Math.max(25, Math.round(totalDaySets * 3.5));
                const uniqueMuscles = Array.from(new Set(day.exercises.map((e) => e.muscleGroup)));
                const isCurrentActiveDay =
                  isWorkoutActive && activeRoutine?.id === routine.id && selectedDayIndex === dayIndex;

                return (
                  <div
                    key={`${routine.id}-${day.id || dayIndex}`}
                    className={`rounded-3xl border transition-all duration-200 bg-white p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md ${
                      isCurrentActiveDay
                        ? 'border-2 border-[#31572c] ring-2 ring-[#31572c]/20 bg-[#f7faf5] shadow-sm'
                        : 'border-[#dde7db] hover:border-[#31572c]/60'
                    }`}
                  >
                    {/* Active In Progress Indicator inside Card */}
                    {isCurrentActiveDay && (
                      <div className="mb-2.5 bg-[#ecf39e]/70 border border-[#cbe07d] rounded-2xl px-3 py-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#31572c] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#31572c]"></span>
                          </span>
                          <span className="text-[11px] font-bold text-[#132a13]">
                            Scheda in esecuzione attiva adesso
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#31572c]">
                          {formatElapsedTime(workoutElapsedSeconds)} • {completedSetsCount}/{totalSetsCount} serie
                        </span>
                      </div>
                    )}

                    {/* Intestazione Riquadro */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            isCurrentActiveDay
                              ? 'text-white bg-[#31572c]'
                              : 'text-[#31572c] bg-[#eaf2e7]'
                          }`}>
                            {routine.name}
                          </span>
                          <span className="text-[10px] font-bold text-neutral-500 bg-[#f4f6f3] px-2 py-0.5 rounded-lg">
                            {day.name.split('-')[0].trim()}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#4f772d] flex items-center gap-1 bg-[#ecf39e]/40 px-2 py-0.5 rounded-full">
                          <Dumbbell className="w-3 h-3" /> {day.exercises.length} Esercizi
                        </span>
                      </div>

                      {/* Titolo Giorno Scheda */}
                      <h2 className="text-base sm:text-lg font-bold text-[#132a13] leading-snug">
                        {day.name}
                      </h2>

                      {day.notes && (
                        <p className="text-xs text-neutral-500 mt-1 line-clamp-1 italic">
                          {day.notes}
                        </p>
                      )}

                      {/* Gruppi Muscolari Coinvolti */}
                      {uniqueMuscles.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                          {uniqueMuscles.map((muscle) => (
                            <span
                              key={muscle}
                              className="text-[10px] font-bold text-[#31572c] bg-[#ecf39e]/50 px-2 py-0.5 rounded-md"
                            >
                              {muscle}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Mini Anteprima degli Esercizi */}
                      <div className="mt-3.5 bg-[#fbfdfa] rounded-2xl p-3 border border-[#edf3ea] space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#31572c]" /> ~{estimatedMinutes} min
                          </span>
                          <span>•</span>
                          <span>{totalDaySets} serie totali</span>
                        </div>

                        {/* Lista Esercizi compresi */}
                        <div className="space-y-1.5 pt-1 border-t border-[#f0f4ee]">
                          {day.exercises.slice(0, 3).map((ex, exI) => (
                            <div
                              key={exI}
                              className="flex items-center justify-between text-xs text-[#132a13]"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-5 h-5 rounded-md bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200">
                                  <img
                                    src={
                                      ex.image ||
                                      'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg'
                                    }
                                    alt={ex.exerciseName}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                                <span className="font-medium truncate">
                                  {ex.exerciseNameIt || ex.exerciseName}
                                </span>
                              </div>
                              <span className="text-[11px] font-mono text-neutral-500 shrink-0 ml-2">
                                {ex.sets.length} serie
                              </span>
                            </div>
                          ))}
                          {day.exercises.length > 3 && (
                            <p className="text-[11px] font-bold text-[#4f772d] pt-0.5">
                              + altri {day.exercises.length - 3} esercizi nella scheda
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottone di Avvio / Ripresa Scheda */}
                    <div className="mt-4 pt-3 border-t border-[#f1f6ef] flex items-center gap-2">
                      {isCurrentActiveDay ? (
                        <button
                          type="button"
                          onClick={() => setViewMode('workout')}
                          className="flex-1 py-3 px-4 rounded-2xl bg-[#132a13] hover:bg-[#31572c] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>Riprendi Scheda in Corso</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartScheda(routine, dayIndex)}
                          className="flex-1 py-3 px-4 rounded-2xl bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>Avvia Questa Scheda</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Riquadro per Aggiungere o Creare Nuova Scheda */}
              <div
                onClick={() => onNavigateToTab('gestione')}
                className="rounded-3xl border-2 border-dashed border-[#ccd9c7] hover:border-[#31572c] bg-[#fafcf9] hover:bg-[#f3f7f0] p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#ecf39e] text-[#132a13] flex items-center justify-center group-hover:scale-105 transition">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#132a13]">
                  Crea o personalizza un'altra scheda
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Aggiungi nuovi giorni di allenamento, imposta serie e ripetizioni a tuo piacimento.
                </p>
              </div>
            </div>
          )}

          {/* Modal Conferma Cambio Scheda in Corso */}
          {pendingSwitchRoutine && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-xl border border-[#dde7db] animate-in fade-in zoom-in-95">
                <div className="w-12 h-12 rounded-2xl bg-[#ecf39e] text-[#132a13] flex items-center justify-center mb-3">
                  <AlertCircle className="w-6 h-6 text-[#31572c]" />
                </div>
                <h3 className="text-base font-bold text-[#132a13] mb-1">
                  Scheda già in esecuzione
                </h3>
                <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                  Hai già una scheda attiva in questo momento:
                  <br />
                  <strong className="text-[#31572c]">
                    {activeRoutine?.name} • {currentDay?.name}
                  </strong>{' '}
                  (avviata da {formatElapsedTime(workoutElapsedSeconds)}).
                  <br />
                  Cosa desideri fare?
                </p>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPendingSwitchRoutine(null);
                      setViewMode('workout');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Continua Scheda già Attiva</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const next = pendingSwitchRoutine;
                      setPendingSwitchRoutine(null);
                      startNewWorkoutSession(next.routine, next.dayIdx);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#f0f5ec] hover:bg-[#e2edd9] text-[#31572c] font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Sostituisci ed Avvia Nuova Scheda</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPendingSwitchRoutine(null)}
                    className="w-full py-2 text-xs text-neutral-500 font-semibold hover:text-neutral-800 transition"
                  >
                    Annulla
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: SCHERMATA ESERCIZI (SCHEDA AVVIATA)
  // -------------------------------------------------------------
  if (!activeRoutine) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#ecf39e] flex items-center justify-center text-[#132a13] mb-4 shadow">
          <Dumbbell className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#132a13] mb-2 font-display">
          Nessuna scheda selezionata
        </h2>
        <button
          type="button"
          onClick={() => setViewMode('selection')}
          className="px-6 py-3 rounded-2xl bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-sm shadow transition"
        >
          Torna alle Schede Disponibili
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Top Header Barra Superiore con Pulsante Torna Indietro */}
      <div className="p-4 bg-white border-b border-[#e6eee1] sticky top-0 z-20">
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Torna alle schede */}
          <button
            type="button"
            onClick={() => setViewMode('selection')}
            className="text-xs font-bold text-[#31572c] hover:text-[#132a13] flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#f0f5ee] hover:bg-[#e4ede1] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tutte le Schede</span>
          </button>

          {/* Start/Finish Workout Action */}
          <div>
            {!isWorkoutActive ? (
              <button
                type="button"
                onClick={handleStartWorkout}
                className="px-3.5 py-1.5 rounded-xl bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Inizia Allenamento
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishWorkout}
                className="px-3.5 py-1.5 rounded-xl bg-[#ecf39e] hover:bg-[#dfe98b] text-[#132a13] font-bold text-xs shadow-xs transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#31572c]" /> Termina ({completedSetsCount}/{totalSetsCount})
              </button>
            )}
          </div>
        </div>

        {/* Titolo Scheda e Giorno */}
        <div className="mt-1">
          <span className="text-[11px] font-bold text-[#4f772d] uppercase tracking-wider">
            {activeRoutine.name}
          </span>
          <h1 className="text-lg sm:text-xl font-bold text-[#132a13] tracking-tight font-display">
            {currentDay?.name || 'Allenamento di Oggi'}
          </h1>
        </div>

        {/* Days Horizontal Carousel se la scheda ha più giorni */}
        {activeRoutine.days.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 scrollbar-none">
            {activeRoutine.days.map((day, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={day.id || idx}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#132a13] text-white shadow-xs'
                      : 'bg-[#f4f7f2] text-[#31572c] hover:bg-[#e8efe5]'
                  }`}
                >
                  <span>{day.name}</span>
                  <span className="text-[10px] opacity-75">
                    ({day.exercises.length})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Live workout bar & auto-save alert */}
        {isWorkoutActive && (
          <div className="mt-3 bg-[#f8faf6] border border-[#dce8d8] rounded-xl p-2.5 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#31572c] animate-pulse" />
              <div className="flex items-center gap-1 text-xs font-bold text-[#132a13]">
                <Clock className="w-3.5 h-3.5 text-[#31572c]" />
                <span>{formatElapsedTime(workoutElapsedSeconds)}</span>
              </div>
              <span className="text-[11px] text-neutral-500">
                • {completedSetsCount}/{totalSetsCount} serie completate
              </span>
            </div>

            {lastAutoSaveTime && (
              <span className="text-[10px] text-[#4f772d] font-semibold flex items-center gap-1 bg-[#ecf39e]/40 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3 text-[#31572c]" /> Salvato automatico {lastAutoSaveTime}
              </span>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-[#e8efe5] h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div
            className="bg-[#31572c] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Exercises List for current day */}
      <div className="p-4 space-y-4 flex-1">
        {currentDay && currentDay.exercises.length === 0 ? (
          <div className="bg-[#fafcf9] border-2 border-dashed border-[#d8e4d3] rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#ecf39e] text-[#132a13] flex items-center justify-center mx-auto mb-3">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#132a13] mb-1">
              Nessun esercizio per {currentDay.name}
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto mb-4">
              Aggiungi esercizi dal catalogo con immagini e gif, oppure creane di tuoi personalizzati.
            </p>
            <button
              type="button"
              onClick={() => setPickerModalOpen(true)}
              className="px-4 py-2.5 bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs rounded-xl shadow transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Aggiungi Esercizio
            </button>
          </div>
        ) : (
          currentDay?.exercises.map((exercise, exIdx) => {
            const previousRecord = getLastPerformanceForExercise(exercise.exerciseId);

            return (
              <div
                key={`${exercise.exerciseId}-${exIdx}`}
                className="bg-white rounded-3xl border border-[#e2ece0] shadow-xs overflow-hidden"
              >
                {/* Exercise Header */}
                <div className="p-3.5 bg-[#fafcf9] border-b border-[#eaf0e7] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Image / GIF Thumbnail with click to expand */}
                    <div
                      onClick={() => {
                        setInspectExercise({
                          id: exercise.exerciseId,
                          name: exercise.exerciseName,
                          nameIt: exercise.exerciseNameIt || exercise.exerciseName,
                          category: exercise.category,
                          bodyPart: exercise.muscleGroup.toLowerCase(),
                          muscleGroup: exercise.muscleGroup,
                          equipment: 'Attrezzatura',
                          target: exercise.muscleGroup,
                          instructionsIt: exercise.notes || 'Esegui il movimento con controllo e forma corretta.',
                          image: exercise.image || 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg',
                          gifUrl: exercise.gifUrl || '',
                        });
                      }}
                      className="w-12 h-12 rounded-2xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200 cursor-pointer relative group"
                    >
                      <img
                        src={exercise.image || 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg'}
                        alt={exercise.exerciseName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                        <Info className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title & Muscle Badge */}
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#132a13] truncate">
                        {exercise.exerciseNameIt || exercise.exerciseName}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-bold text-[#31572c] bg-[#ecf39e]/50 px-1.5 py-0.5 rounded">
                          {exercise.muscleGroup}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setRestTimerSeconds(exercise.restSeconds || 90);
                            setTimerExerciseName(exercise.exerciseNameIt || exercise.exerciseName);
                            setRestTimerOpen(true);
                          }}
                          className="text-[10px] text-neutral-500 font-medium hover:text-[#31572c] flex items-center gap-0.5 bg-[#f0f4ed] px-1.5 py-0.5 rounded"
                        >
                          <Timer className="w-3 h-3" />
                          <span>{exercise.restSeconds || 90}s</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Top Right Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setRestTimerSeconds(exercise.restSeconds || 90);
                        setTimerExerciseName(exercise.exerciseNameIt || exercise.exerciseName);
                        setRestTimerOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-[#31572c] hover:bg-[#edf3ea] transition"
                      title="Avvia Timer Recupero"
                    >
                      <Timer className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteExercise(exIdx)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition text-xs"
                      title="Rimuovi esercizio"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Sets Table Header */}
                <div className="px-3.5 py-2 text-[10px] font-bold text-neutral-600 uppercase tracking-wider flex items-center justify-between border-b border-[#f1f6ef] bg-[#fbfdfa]">
                  <span className="min-w-[70px]">Serie</span>
                  <span>Carico (KG)</span>
                  <span className="mx-0.5 text-transparent">×</span>
                  <span>Ripetizioni</span>
                  <span className="w-12 text-right">Stato</span>
                </div>

                {/* Sets List */}
                <div className="p-2 space-y-1.5">
                  {exercise.sets.map((set, setIdx) => (
                    <SetRow
                      key={set.setNumber || setIdx}
                      set={set}
                      index={setIdx}
                      previousRecord={previousRecord}
                      onUpdateSet={(idx, updated) => handleUpdateSet(exIdx, idx, updated)}
                      onDeleteSet={(idx) => handleDeleteSet(exIdx, idx)}
                      onStartRestTimer={() => {
                        setRestTimerSeconds(exercise.restSeconds || 90);
                        setTimerExerciseName(exercise.exerciseNameIt || exercise.exerciseName);
                        setRestTimerOpen(true);
                      }}
                    />
                  ))}
                </div>

                {/* Add Set Button */}
                <div className="p-2 border-t border-[#f1f6ef] bg-[#fafcf9] flex justify-between items-center">
                  {exercise.notes && (
                    <span className="text-[10px] text-neutral-500 italic max-w-[200px] truncate">
                      Note: {exercise.notes}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleAddSet(exIdx)}
                    className="ml-auto text-xs text-[#31572c] font-bold hover:text-[#132a13] flex items-center gap-1 py-1 px-2.5 rounded-xl hover:bg-[#edf3ea] transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Aggiungi Serie
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* Add Exercise to Current Day */}
        {currentDay && currentDay.exercises.length > 0 && (
          <button
            type="button"
            onClick={() => setPickerModalOpen(true)}
            className="w-full py-3.5 border-2 border-dashed border-[#ccd9c7] hover:border-[#31572c] bg-[#fafcf9] hover:bg-[#f2f7ef] rounded-3xl text-xs font-bold text-[#31572c] flex items-center justify-center gap-2 transition"
          >
            <Plus className="w-4 h-4" /> Aggiungi un altro esercizio a {currentDay.name}
          </button>
        )}
      </div>

      {/* Rest Timer Modal */}
      <RestTimerModal
        initialSeconds={restTimerSeconds}
        isOpen={restTimerOpen}
        onClose={() => setRestTimerOpen(false)}
        exerciseName={timerExerciseName}
      />

      {/* Exercise Picker Modal */}
      <ExercisePickerModal
        isOpen={pickerModalOpen}
        onClose={() => setPickerModalOpen(false)}
        onSelectExercise={handleAddExerciseToDay}
      />

      {/* Exercise Details Modal */}
      {inspectExercise && (
        <ExerciseDetailModal
          exercise={inspectExercise}
          isOpen={!!inspectExercise}
          onClose={() => setInspectExercise(null)}
        />
      )}
    </div>
  );
};
