import React, { useState, useMemo } from 'react';
import { Exercise, MuscleGroup, EquipmentType } from '../types';
import { EXERCISES_DATASET } from '../data/exercisesDataset';
import {
  getCustomExercises,
  saveCustomExercise,
  getActiveRoutine,
  saveRoutine
} from '../utils/storage';
import { ExerciseDetailModal } from '../components/ExerciseDetailModal';
import {
  Library,
  Search,
  Plus,
  Dumbbell,
  Info,
  CheckCircle,
  Sparkles,
  Filter
} from 'lucide-react';

const MUSCLE_GROUPS: (MuscleGroup | 'Tutti')[] = [
  'Tutti',
  'Petto',
  'Dorso',
  'Gambe',
  'Spalle',
  'Bicipiti',
  'Tricipiti',
  'Addominali',
  'Glutei',
  'Polpacci',
  'Cardio',
   "Flessori dell'anca",
   'Obliqui',
   'Femorali',
   'Quadricipiti',
   'Avambracci',
   'Lombare',
   'Trapezio',
   'Caviglie',
   'Zona lombare',
   'Deltoidi',
   'Core',
   'Polsi', 
   'Mani',
   'Romboidi',
   'Schiena',
];

export const ExerciseCatalogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'Tutti'>('Tutti');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('Tutti');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Custom exercise modal state
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customMuscle, setCustomMuscle] = useState<MuscleGroup>('Petto');
  const [customEquipment, setCustomEquipment] = useState<EquipmentType>('Manubri');
  const [customInstructions, setCustomInstructions] = useState('');
  const [customMediaUrl, setCustomMediaUrl] = useState('');

  const [addedToast, setAddedToast] = useState<string | null>(null);

  const customExercises = useMemo(() => getCustomExercises(), [isCreatingCustom]);

  const allExercises = useMemo(() => {
    return [...customExercises, ...EXERCISES_DATASET];
  }, [customExercises]);

  const filteredExercises = useMemo(() => {
    return allExercises.filter((ex) => {
      const matchMuscle =
        selectedMuscle === 'Tutti' || ex.muscleGroup === selectedMuscle;
      const matchEquip =
        selectedEquipment === 'Tutti' || ex.equipment === selectedEquipment;
      const matchSearch =
        !searchQuery.trim() ||
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ex.nameIt && ex.nameIt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ex.target && ex.target.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchMuscle && matchEquip && matchSearch;
    });
  }, [allExercises, selectedMuscle, selectedEquipment, searchQuery]);

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newEx: Exercise = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      nameIt: customName.trim(),
      category: customMuscle.toLowerCase(),
      bodyPart: customMuscle.toLowerCase(),
      muscleGroup: customMuscle,
      equipment: customEquipment,
      target: customMuscle,
      instructionsIt: customInstructions.trim() || 'Esegui il movimento con controllo e postura corretta.',
      image: customMediaUrl.trim() || 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg',
      gifUrl: customMediaUrl.trim() || ''
    };

    saveCustomExercise(newEx);
    setIsCreatingCustom(false);
    setCustomName('');
    setCustomInstructions('');
    setCustomMediaUrl('');
    setSelectedExercise(newEx);
  };

  const handleAddDirectlyToActiveRoutine = (ex: Exercise) => {
    const activeRoutine = getActiveRoutine();
    if (!activeRoutine || activeRoutine.days.length === 0) {
      alert('Crea o attiva prima una scheda dalla sezione "Crea Scheda".');
      return;
    }

    const firstDay = activeRoutine.days[0];
    const newWorkoutEx = {
      exerciseId: ex.id,
      exerciseName: ex.nameIt || ex.name,
      exerciseNameIt: ex.nameIt || ex.name,
      muscleGroup: ex.muscleGroup,
      category: ex.category,
      image: ex.image,
      gifUrl: ex.gifUrl,
      restSeconds: 90,
      sets: [
        { setNumber: 1, targetReps: 10, targetWeightKg: 20, actualReps: 10, actualWeightKg: 20, completed: false },
        { setNumber: 2, targetReps: 10, targetWeightKg: 20, actualReps: 10, actualWeightKg: 20, completed: false },
        { setNumber: 3, targetReps: 10, targetWeightKg: 20, actualReps: 10, actualWeightKg: 20, completed: false },
      ],
    };

    const newDays = [...activeRoutine.days];
    newDays[0] = {
      ...firstDay,
      exercises: [...firstDay.exercises, newWorkoutEx],
    };

    saveRoutine({ ...activeRoutine, days: newDays });
    setAddedToast(`Aggiunto a ${firstDay.name}!`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Top Header */}
      <div className="p-4 bg-white border-b border-[#e6eee1] sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4f772d]">
              <Library className="w-3.5 h-3.5" />
              <span>Dataset Esercizi</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-[#132a13] font-display">
              Catalogo con GIF & Immagini
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsCreatingCustom(true)}
            className="px-3.5 py-2 rounded-xl bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs shadow transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Crea Personalizzato
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca per nome, muscolo (es. Panca, Trazioni, Squat)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-[#f5f8f3] border border-[#dbe5d7] focus:bg-white focus:border-[#31572c] outline-hidden text-[#132a13]"
          />
        </div>

        {/* Muscle Groups Horizontal Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-1">
          {MUSCLE_GROUPS.map((muscle) => (
            <button
              key={muscle}
              type="button"
              onClick={() => setSelectedMuscle(muscle)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedMuscle === muscle
                  ? 'bg-[#31572c] text-white shadow-xs'
                  : 'bg-[#f0f4ec] text-[#31572c] hover:bg-[#e4ece0]'
              }`}
            >
              {muscle}
            </button>
          ))}
        </div>

        {/* Added Toast Notification */}
        {addedToast && (
          <div className="mt-2 p-2 bg-[#ecf39e] text-[#132a13] rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-[#31572c]" /> {addedToast}
          </div>
        )}
      </div>

      {/* Grid of Exercises */}
      <div className="p-4 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredExercises.length === 0 ? (
            <div className="col-span-full py-16 text-center text-neutral-400">
              <Dumbbell className="w-12 h-12 mx-auto mb-2 opacity-30 text-[#4f772d]" />
              <p className="text-sm font-semibold text-neutral-600">Nessun esercizio corrisponde ai filtri</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMuscle('Tutti');
                }}
                className="mt-3 text-xs font-bold text-[#31572c] hover:underline"
              >
                Reimposta filtri
              </button>
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white rounded-2xl border border-[#e2ece0] p-3 shadow-xs hover:border-[#31572c]/40 hover:shadow-sm transition flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail / GIF preview */}
                  <div
                    onClick={() => setSelectedExercise(exercise)}
                    className="relative w-full aspect-16/10 bg-neutral-100 rounded-xl overflow-hidden mb-2.5 cursor-pointer border border-neutral-200"
                  >
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <span className="text-[10px] font-bold text-[#31572c] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
                        {exercise.muscleGroup}
                      </span>
                    </div>

                    <div className="absolute top-2 right-2">
                      <span className="text-[9px] font-semibold text-neutral-700 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-md shadow-xs">
                        {exercise.equipment}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs gap-1">
                      <Info className="w-4 h-4" /> Dettagli & GIF
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedExercise(exercise)}
                    className="text-xs sm:text-sm font-bold text-[#132a13] line-clamp-1 cursor-pointer group-hover:text-[#31572c]"
                  >
                    {exercise.nameIt || exercise.name}
                  </h3>

                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                    {exercise.instructionsIt}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2.5 mt-2 border-t border-[#f0f4ed] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedExercise(exercise)}
                    className="text-xs font-semibold text-neutral-500 hover:text-[#31572c] flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" /> Istruzioni
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddDirectlyToActiveRoutine(exercise)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#f0f5ec] hover:bg-[#e2eadc] text-[#31572c] font-bold text-[11px] transition flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Aggiungi
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Exercise Details Modal */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          isOpen={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onAddToWorkout={(ex) => handleAddDirectlyToActiveRoutine(ex)}
        />
      )}

      {/* Custom Exercise Modal */}
      {isCreatingCustom && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md shadow-2xl border border-[#31572c]/20 animate-in fade-in zoom-in">
            <h3 className="text-base font-bold text-[#132a13] mb-1">
              Nuovo Esercizio Personalizzato
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Verrà storicizzato e salvato nella tua libreria di esercizi.
            </p>

            <form onSubmit={handleCreateCustom} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Nome Esercizio *
                </label>
                <input
                  type="text"
                  required
                  placeholder="es. Hip Thrust con Bilanciere"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8e3d3] text-xs font-bold text-[#132a13] outline-hidden focus:border-[#31572c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#132a13] mb-1">
                    Gruppo Muscolare *
                  </label>
                  <select
                    value={customMuscle}
                    onChange={(e) => setCustomMuscle(e.target.value as MuscleGroup)}
                    className="w-full px-2.5 py-2 rounded-xl border border-[#d8e3d3] text-xs text-[#132a13] outline-hidden bg-white"
                  >
                    {MUSCLE_GROUPS.filter((m) => m !== 'Tutti').map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#132a13] mb-1">
                    Attrezzatura *
                  </label>
                  <select
                    value={customEquipment}
                    onChange={(e) => setCustomEquipment(e.target.value as EquipmentType)}
                    className="w-full px-2.5 py-2 rounded-xl border border-[#d8e3d3] text-xs text-[#132a13] outline-hidden bg-white"
                  >
                    <option value="Bilanciere">Bilanciere</option>
                    <option value="Manubri">Manubri</option>
                    <option value="Cavi">Cavi</option>
                    <option value="Macchina">Macchina</option>
                    <option value="Corpo Libero">Corpo Libero</option>
                    <option value="Kettlebell">Kettlebell</option>
                    <option value="Altro">Altro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Istruzioni di esecuzione
                </label>
                <textarea
                  rows={2}
                  placeholder="Note sulla tecnica, impugnatura, postura..."
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8e3d3] text-xs text-[#132a13] outline-hidden focus:border-[#31572c] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  URL Immagine o GIF (Opzionale)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={customMediaUrl}
                  onChange={(e) => setCustomMediaUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#d8e3d3] text-xs text-[#132a13] outline-hidden focus:border-[#31572c]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingCustom(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#31572c] text-white hover:bg-[#132a13] rounded-xl shadow"
                >
                  Salva nel Catalogo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
