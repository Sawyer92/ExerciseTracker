import React, { useState } from 'react';
import { WorkoutRoutine, RoutineDay, WorkoutExercise, Exercise } from '../types';
import {
  getRoutines,
  saveRoutines,
  saveRoutine,
  deleteRoutine,
  setActiveRoutineId,
  getActiveRoutine,
  getActiveSessionCache,
} from '../utils/storage';
import { ExercisePickerModal } from '../components/ExercisePickerModal';
import { ExerciseDetailModal } from '../components/ExerciseDetailModal';
import {
  FolderPlus,
  Plus,
  Trash2,
  Edit2,
  Check,
  Dumbbell,
  Copy,
  Play
} from 'lucide-react';

interface RoutineManagementPageProps {
  onNavigateToTab: (tab: 'scheda' | 'calendario' | 'gestione' | 'esercizi' | 'profilo') => void;
}

export const RoutineManagementPage: React.FC<RoutineManagementPageProps> = ({
  onNavigateToTab,
}) => {
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(() => getRoutines());
  const [activeRoutineId, setActiveRoutineIdState] = useState<string>(() => {
    const active = getActiveRoutine();
    return active ? active.id : '';
  });

  // Editor mode state
  const [editingRoutine, setEditingRoutine] = useState<WorkoutRoutine | null>(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  // Modals state
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [inspectExercise, setInspectExercise] = useState<Exercise | null>(null);
  const [isCreatingNewModal, setIsCreatingNewModal] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');
  const [newRoutineDesc, setNewRoutineDesc] = useState('');

  const refreshRoutines = () => {
    const list = getRoutines();
    setRoutines(list);
    const active = getActiveRoutine();
    if (active) setActiveRoutineIdState(active.id);
  };

  const handleSelectActive = (id: string) => {
    setActiveRoutineId(id);
    setActiveRoutineIdState(id);
    refreshRoutines();
  };

  // Create empty routine or with 1 day
  const handleCreateEmptyRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoutineName.trim()) return;

    const newRoutine: WorkoutRoutine = {
      id: `routine-${Date.now()}`,
      name: newRoutineName.trim(),
      description: newRoutineDesc.trim() || 'Scheda personalizzata',
      isActive: routines.length === 0, // activate if first
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      days: [
        {
          id: `day-${Date.now()}-1`,
          name: 'Giorno A',
          exercises: [],
          notes: '',
        },
      ],
    };

    saveRoutine(newRoutine);
    refreshRoutines();
    setEditingRoutine(newRoutine);
    setSelectedDayIdx(0);
    setIsCreatingNewModal(false);
    setNewRoutineName('');
    setNewRoutineDesc('');
  };

  const handleDuplicateRoutine = (routine: WorkoutRoutine) => {
    const duplicated: WorkoutRoutine = {
      ...JSON.parse(JSON.stringify(routine)),
      id: `routine-${Date.now()}`,
      name: `${routine.name} (Copia)`,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveRoutine(duplicated);
    refreshRoutines();
  };

  const handleDeleteRoutine = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questa scheda?')) {
      deleteRoutine(id);
      refreshRoutines();
      if (editingRoutine?.id === id) {
        setEditingRoutine(null);
      }
    }
  };

  // Auto-save edited routine helper
  const handleAutoSaveEditedRoutine = (updated: WorkoutRoutine) => {
    setEditingRoutine(updated);
    saveRoutine(updated);
    refreshRoutines();
  };

  // Add a day to currently edited routine
  const handleAddDay = () => {
    if (!editingRoutine) return;
    const dayLetter = String.fromCharCode(65 + editingRoutine.days.length); // A, B, C, D...
    const newDay: RoutineDay = {
      id: `day-${Date.now()}`,
      name: `Giorno ${dayLetter}`,
      exercises: [],
      notes: '',
    };
    const updated = {
      ...editingRoutine,
      days: [...editingRoutine.days, newDay],
    };
    handleAutoSaveEditedRoutine(updated);
    setSelectedDayIdx(updated.days.length - 1);
  };

  // Remove a day from currently edited routine
  const handleDeleteDay = (dayIdx: number) => {
    if (!editingRoutine || editingRoutine.days.length <= 1) {
      alert('La scheda deve contenere almeno un giorno.');
      return;
    }
    const updatedDays = editingRoutine.days.filter((_, idx) => idx !== dayIdx);
    const updated = { ...editingRoutine, days: updatedDays };
    handleAutoSaveEditedRoutine(updated);
    setSelectedDayIdx(Math.max(0, dayIdx - 1));
  };

  // Add exercise to current day in editor
  const handleAddExerciseToCurrentDay = (exercise: Exercise) => {
    if (!editingRoutine) return;
    const currentDay = editingRoutine.days[selectedDayIdx];
    if (!currentDay) return;

    const newExercise: WorkoutExercise = {
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

    const newDays = [...editingRoutine.days];
    newDays[selectedDayIdx] = {
      ...currentDay,
      exercises: [...currentDay.exercises, newExercise],
    };

    handleAutoSaveEditedRoutine({ ...editingRoutine, days: newDays });
  };

  // Update exercise target sets, reps, weight
  const handleUpdateExerciseData = (
    exIdx: number,
    updates: Partial<WorkoutExercise>
  ) => {
    if (!editingRoutine) return;
    const currentDay = editingRoutine.days[selectedDayIdx];
    if (!currentDay) return;

    const newExercises = [...currentDay.exercises];
    newExercises[exIdx] = { ...newExercises[exIdx], ...updates };

    const newDays = [...editingRoutine.days];
    newDays[selectedDayIdx] = { ...currentDay, exercises: newExercises };

    handleAutoSaveEditedRoutine({ ...editingRoutine, days: newDays });
  };

  // Update target set count for an exercise
  const handleSetSetsCount = (exIdx: number, newCount: number) => {
    if (!editingRoutine) return;
    const currentDay = editingRoutine.days[selectedDayIdx];
    if (!currentDay) return;

    const count = Math.max(1, Math.min(10, newCount));
    const targetEx = currentDay.exercises[exIdx];
    const currentSets = targetEx.sets;

    let newSets = [...currentSets];
    if (count > currentSets.length) {
      const last = currentSets[currentSets.length - 1];
      for (let i = currentSets.length; i < count; i++) {
        newSets.push({
          setNumber: i + 1,
          targetReps: last ? last.targetReps : 10,
          targetWeightKg: last ? last.targetWeightKg : 20,
          actualReps: last ? last.targetReps : 10,
          actualWeightKg: last ? last.targetWeightKg : 20,
          completed: false,
        });
      }
    } else {
      newSets = newSets.slice(0, count);
    }

    handleUpdateExerciseData(exIdx, { sets: newSets });
  };

  // Delete exercise from day
  const handleDeleteExercise = (exIdx: number) => {
    if (!editingRoutine) return;
    const currentDay = editingRoutine.days[selectedDayIdx];
    if (!currentDay) return;

    const newExercises = currentDay.exercises.filter((_, idx) => idx !== exIdx);
    const newDays = [...editingRoutine.days];
    newDays[selectedDayIdx] = { ...currentDay, exercises: newExercises };

    handleAutoSaveEditedRoutine({ ...editingRoutine, days: newDays });
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Top Header */}
      <div className="p-4 bg-white border-b border-[#e6eee1] sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4f772d]">
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Programmazione Schede</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-[#132a13] font-display">
              {editingRoutine ? `Modifica: ${editingRoutine.name}` : 'Gestione Schede'}
            </h1>
          </div>

          {!editingRoutine ? (
            <button
              type="button"
              onClick={() => setIsCreatingNewModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Nuova Scheda
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setEditingRoutine(null)}
              className="px-3 py-1.5 rounded-xl bg-[#f0f5ec] hover:bg-[#e4ede0] text-xs font-bold text-[#31572c] transition"
            >
              Fatto / Tutte le Schede
            </button>
          )}
        </div>
      </div>

      {/* Editor View */}
      {editingRoutine ? (
        <div className="p-4 space-y-4 flex-1">
          {/* Routine Meta Information */}
          <div className="bg-[#fafcf9] border border-[#e2ece0] rounded-2xl p-3.5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#4f772d] uppercase tracking-wider">
                Informazioni Scheda
              </span>
              <div className="flex items-center gap-2">
                {editingRoutine.id === activeRoutineId ? (
                  <span className="text-[11px] font-bold text-[#31572c] bg-[#ecf39e]/50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#31572c]" /> Scheda Attiva
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSelectActive(editingRoutine.id)}
                    className="text-xs font-bold text-[#31572c] hover:text-[#132a13] bg-[#ecf39e] px-2.5 py-1 rounded-lg transition"
                  >
                    Imposta come Attiva
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#132a13] mb-1">
                Nome Scheda
              </label>
              <input
                type="text"
                value={editingRoutine.name}
                onChange={(e) =>
                  handleAutoSaveEditedRoutine({
                    ...editingRoutine,
                    name: e.target.value,
                  })
                }
                className="w-full px-3 py-1.5 rounded-xl border border-[#d8e3d3] font-bold text-sm text-[#132a13] bg-white outline-hidden focus:border-[#31572c]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#132a13] mb-1">
                Descrizione / Obiettivo
              </label>
              <input
                type="text"
                value={editingRoutine.description}
                onChange={(e) =>
                  handleAutoSaveEditedRoutine({
                    ...editingRoutine,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-1.5 rounded-xl border border-[#d8e3d3] text-xs text-neutral-700 bg-white outline-hidden focus:border-[#31572c]"
              />
            </div>
          </div>

          {/* Days Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#132a13] uppercase tracking-wider">
                Giorni di Allenamento ({editingRoutine.days.length})
              </span>
              <button
                type="button"
                onClick={handleAddDay}
                className="text-xs font-bold text-[#31572c] hover:text-[#132a13] flex items-center gap-1 bg-[#f0f5ec] px-2.5 py-1 rounded-lg transition"
              >
                <Plus className="w-3 h-3" /> Aggiungi Giorno
              </button>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {editingRoutine.days.map((day, idx) => (
                <button
                  key={day.id || idx}
                  type="button"
                  onClick={() => setSelectedDayIdx(idx)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                    selectedDayIdx === idx
                      ? 'bg-[#132a13] text-white shadow-xs'
                      : 'bg-[#f4f7f2] text-[#31572c] hover:bg-[#e8efe5]'
                  }`}
                >
                  <span>{day.name}</span>
                  <span className="text-[10px] opacity-75">
                    ({day.exercises.length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Day Name Edit & Delete */}
          {editingRoutine.days[selectedDayIdx] && (
            <div className="bg-white border border-[#e2ece0] rounded-2xl p-3 flex items-center justify-between gap-3">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                  Nome di questo giorno
                </label>
                <input
                  type="text"
                  value={editingRoutine.days[selectedDayIdx].name}
                  onChange={(e) => {
                    const newDays = [...editingRoutine.days];
                    newDays[selectedDayIdx] = {
                      ...newDays[selectedDayIdx],
                      name: e.target.value,
                    };
                    handleAutoSaveEditedRoutine({
                      ...editingRoutine,
                      days: newDays,
                    });
                  }}
                  className="w-full px-2.5 py-1 text-xs font-bold text-[#132a13] border border-[#e2ece0] rounded-lg outline-hidden focus:border-[#31572c]"
                />
              </div>

              {editingRoutine.days.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteDay(selectedDayIdx)}
                  className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                  title="Elimina questo giorno"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Exercises in current day */}
          <div className="space-y-3">
            {editingRoutine.days[selectedDayIdx]?.exercises.length === 0 ? (
              <div className="bg-[#fafcf9] border-2 border-dashed border-[#d8e4d3] rounded-2xl p-6 text-center">
                <Dumbbell className="w-10 h-10 mx-auto text-[#4f772d]/50 mb-2" />
                <h4 className="text-sm font-bold text-[#132a13] mb-1">
                  Nessun esercizio aggiunto
                </h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto mb-4">
                  Aggiungi gli esercizi con serie, ripetizioni e carico target per questo giorno.
                </p>
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(true)}
                  className="px-4 py-2.5 bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs rounded-xl shadow transition inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Scegli Esercizi dal Catalogo
                </button>
              </div>
            ) : (
              editingRoutine.days[selectedDayIdx]?.exercises.map((ex, exIdx) => (
                <div
                  key={`${ex.exerciseId}-${exIdx}`}
                  className="bg-white rounded-2xl border border-[#e2ece0] p-3.5 shadow-xs space-y-3"
                >
                  {/* Top Bar of exercise */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        onClick={() =>
                          setInspectExercise({
                            id: ex.exerciseId,
                            name: ex.exerciseName,
                            nameIt: ex.exerciseNameIt || ex.exerciseName,
                            category: ex.category,
                            bodyPart: ex.muscleGroup.toLowerCase(),
                            muscleGroup: ex.muscleGroup,
                            equipment: 'Attrezzatura',
                            target: ex.muscleGroup,
                            instructionsIt: 'Controlla il movimento e respira regolarmente.',
                            image: ex.image || 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg',
                            gifUrl: ex.gifUrl || '',
                          })
                        }
                        className="w-10 h-10 rounded-xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200 cursor-pointer"
                      >
                        <img
                          src={ex.image || 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg'}
                          alt={ex.exerciseName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-[#132a13] truncate">
                          {ex.exerciseNameIt || ex.exerciseName}
                        </h4>
                        <span className="text-[10px] font-bold text-[#4f772d] bg-[#f0f5ec] px-1.5 py-0.5 rounded">
                          {ex.muscleGroup}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteExercise(exIdx)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Rimuovi esercizio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Settings: Sets count, Target Reps, Target Load, Rest */}
                  <div className="grid grid-cols-3 gap-2 bg-[#f9faf7] p-2.5 rounded-xl border border-[#e8efe5]">
                    {/* Sets Count */}
                    <div>
                      <span className="text-[9px] text-neutral-500 font-bold uppercase block mb-1">
                        Numero Serie
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleSetSetsCount(exIdx, ex.sets.length - 1)}
                          className="w-6 h-6 rounded-md bg-white border border-[#d8e3d3] text-xs font-bold text-[#132a13] flex items-center justify-center hover:bg-[#eef4ea]"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#132a13]">
                          {ex.sets.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSetSetsCount(exIdx, ex.sets.length + 1)}
                          className="w-6 h-6 rounded-md bg-white border border-[#d8e3d3] text-xs font-bold text-[#132a13] flex items-center justify-center hover:bg-[#eef4ea]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Target Reps */}
                    <div>
                      <span className="text-[9px] text-neutral-500 font-bold uppercase block mb-1">
                        Reps Target
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={ex.sets[0]?.targetReps || 10}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 10;
                          const updatedSets = ex.sets.map((s) => ({
                            ...s,
                            targetReps: val,
                            actualReps: val,
                          }));
                          handleUpdateExerciseData(exIdx, { sets: updatedSets });
                        }}
                        className="w-full px-2 py-1 text-xs font-bold text-center text-[#132a13] bg-white border border-[#d8e3d3] rounded-md outline-hidden"
                      />
                    </div>

                    {/* Target Weight (Carico) */}
                    <div>
                      <span className="text-[9px] text-neutral-500 font-bold uppercase block mb-1">
                        Carico (KG)
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={ex.sets[0]?.targetWeightKg || 0}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const updatedSets = ex.sets.map((s) => ({
                            ...s,
                            targetWeightKg: val,
                            actualWeightKg: val,
                          }));
                          handleUpdateExerciseData(exIdx, { sets: updatedSets });
                        }}
                        className="w-full px-2 py-1 text-xs font-bold text-center text-[#132a13] bg-white border border-[#d8e3d3] rounded-md outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Add another exercise */}
            <button
              type="button"
              onClick={() => setIsPickerOpen(true)}
              className="w-full py-3 border-2 border-dashed border-[#ccd9c7] hover:border-[#31572c] bg-[#fafcf9] hover:bg-[#f2f7ef] rounded-2xl text-xs font-bold text-[#31572c] flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> Aggiungi Esercizio al Giorno
            </button>
          </div>
        </div>
      ) : (
        /* Routines List Overview */
        <div className="p-4 space-y-4 flex-1">
          <div className="space-y-3">
            {routines.length === 0 ? (
              <div className="bg-[#fafcf9] border-2 border-dashed border-[#ccd9c7] rounded-3xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-[#ecf39e] text-[#132a13] flex items-center justify-center mx-auto shadow-xs">
                  <FolderPlus className="w-8 h-8 text-[#31572c]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#132a13]">
                    Nessuna scheda creata
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    Non hai ancora creato schede di allenamento. Crea una scheda vuota per personalizzare i giorni di allenamento, gli esercizi, le serie, i carichi e le ripetizioni.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingNewModal(true)}
                  className="px-5 py-3 rounded-2xl bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs shadow transition inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Crea la tua prima Scheda
                </button>
              </div>
            ) : (
              routines.map((routine) => {
              const isActive = routine.id === activeRoutineId;
              const totalExercises = routine.days.reduce(
                (acc, d) => acc + d.exercises.length,
                0
              );

              const runningSession = getActiveSessionCache();
              const isSessionRunningThisRoutine = runningSession?.routineId === routine.id;

              return (
                <div
                  key={routine.id}
                  className={`bg-white rounded-2xl border p-4 shadow-xs transition ${
                    isSessionRunningThisRoutine
                      ? 'border-[#31572c] ring-2 ring-[#31572c]/30 bg-[#f7faf5]'
                      : isActive
                      ? 'border-[#31572c] ring-2 ring-[#ecf39e]/50'
                      : 'border-[#e2ece0] hover:border-[#ccd9c7]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[#132a13]">
                          {routine.name}
                        </h3>
                        {isSessionRunningThisRoutine ? (
                          <span className="text-[10px] font-bold text-white bg-[#31572c] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ecf39e] animate-ping" />
                            In Esecuzione
                          </span>
                        ) : isActive ? (
                          <span className="text-[10px] font-bold text-[#31572c] bg-[#ecf39e] px-2 py-0.5 rounded-full">
                            Predefinita
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                        {routine.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDuplicateRoutine(routine)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-[#31572c] hover:bg-[#f0f4ec] transition"
                        title="Duplica scheda"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRoutine(routine.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Elimina scheda"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Days pill preview */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
                    {routine.days.map((d, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#f4f7f2] text-[#31572c] font-semibold text-[11px] whitespace-nowrap"
                      >
                        {d.name} ({d.exercises.length} es.)
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-[#edf3eb] mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500">
                      {routine.days.length} giorni • {totalExercises} esercizi
                    </span>

                    <div className="flex items-center gap-2">
                      {isSessionRunningThisRoutine && (
                        <button
                          type="button"
                          onClick={() => onNavigateToTab('scheda')}
                          className="px-3 py-1.5 rounded-xl bg-[#ecf39e] hover:bg-[#dfea8b] text-[#132a13] font-bold text-xs shadow-xs transition flex items-center gap-1"
                        >
                          <Play className="w-3.5 h-3.5 fill-[#132a13]" /> Riprendi Scheda
                        </button>
                      )}

                      {!isActive && !isSessionRunningThisRoutine && (
                        <button
                          type="button"
                          onClick={() => handleSelectActive(routine.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#31572c] hover:bg-[#f0f5ec] transition"
                        >
                          Rendi Predefinita
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setEditingRoutine(routine);
                          setSelectedDayIdx(0);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs shadow-xs transition flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Modifica
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          </div>
        </div>
      )}

      {/* Modal to Create New Routine */}
      {isCreatingNewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md shadow-2xl border border-[#31572c]/20 animate-in fade-in zoom-in">
            <h3 className="text-base font-bold text-[#132a13] mb-1">
              Crea Nuova Scheda
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Puoi creare una scheda vuota e aggiungere i tuoi esercizi liberamente.
            </p>

            <form onSubmit={handleCreateEmptyRoutine} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Nome Scheda *
                </label>
                <input
                  type="text"
                  required
                  placeholder="es. Scheda Massa Invernale, Full Body..."
                  value={newRoutineName}
                  onChange={(e) => setNewRoutineName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8e3d3] text-xs font-semibold text-[#132a13] outline-hidden focus:border-[#31572c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Descrizione (Opzionale)
                </label>
                <textarea
                  rows={2}
                  placeholder="es. 3 volte a settimana con progressione di carico sui fondamentali."
                  value={newRoutineDesc}
                  onChange={(e) => setNewRoutineDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8e3d3] text-xs text-[#132a13] outline-hidden focus:border-[#31572c] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingNewModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#31572c] text-white hover:bg-[#132a13] rounded-xl shadow"
                >
                  Crea Scheda Vuota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exercise Picker Modal */}
      <ExercisePickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelectExercise={handleAddExerciseToCurrentDay}
      />

      {/* Inspect Exercise Details */}
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
