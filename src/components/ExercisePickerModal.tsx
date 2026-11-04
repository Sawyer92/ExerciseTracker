import React, { useState, useMemo } from 'react';
import { Exercise, MuscleGroup, EquipmentType } from '../types';
import { EXERCISES_DATASET } from '../data/exercisesDataset';
import { getCustomExercises, saveCustomExercise } from '../utils/storage';
import { Search, X, Dumbbell, Plus, Info, Check } from 'lucide-react';
import { ExerciseDetailModal } from './ExerciseDetailModal';

interface ExercisePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise) => void;
}

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
];

export const ExercisePickerModal: React.FC<ExercisePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectExercise,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'Tutti'>('Tutti');
  const [inspectExercise, setInspectExercise] = useState<Exercise | null>(null);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);

  // Custom exercise form state
  const [customName, setCustomName] = useState('');
  const [customMuscle, setCustomMuscle] = useState<MuscleGroup>('Petto');
  const [customEquipment, setCustomEquipment] = useState<EquipmentType>('Manubri');
  const [customInstructions, setCustomInstructions] = useState('');
  const [customMediaUrl, setCustomMediaUrl] = useState('');

  // Combined dataset: builtin + custom
  const allExercises = useMemo(() => {
    const custom = getCustomExercises();
    return [...custom, ...EXERCISES_DATASET];
  }, [isCreatingCustom]);

  const filteredExercises = useMemo(() => {
    return allExercises.filter((ex) => {
      const matchesMuscle =
        selectedMuscle === 'Tutti' || ex.muscleGroup === selectedMuscle;
      const matchesSearch =
        !searchQuery.trim() ||
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ex.nameIt && ex.nameIt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ex.target && ex.target.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesMuscle && matchesSearch;
    });
  }, [allExercises, selectedMuscle, searchQuery]);

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newExercise: Exercise = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      nameIt: customName.trim(),
      category: customMuscle.toLowerCase(),
      bodyPart: customMuscle.toLowerCase(),
      muscleGroup: customMuscle,
      equipment: customEquipment,
      target: customMuscle,
      instructionsIt: customInstructions.trim() || 'Esegui il movimento con controllo.',
      image: customMediaUrl.trim() || 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg',
      gifUrl: customMediaUrl.trim() || '',
      isCustom: true,
    };

    saveCustomExercise(newExercise);
    onSelectExercise(newExercise);
    setIsCreatingCustom(false);
    setCustomName('');
    setCustomInstructions('');
    setCustomMediaUrl('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-[#31572c]/20 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[#e6eee1] bg-[#fafcf9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#ecf39e] flex items-center justify-center text-[#132a13]">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#132a13]">
                {isCreatingCustom ? 'Crea Esercizio Personalizzato' : 'Seleziona Esercizio'}
              </h2>
              <p className="text-[11px] text-[#4f772d] font-medium">
                {isCreatingCustom ? 'Aggiungi un esercizio con i tuoi dati' : `${filteredExercises.length} esercizi disponibili`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreatingCustom(!isCreatingCustom)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#31572c] text-white font-semibold hover:bg-[#132a13] transition flex items-center gap-1"
            >
              {isCreatingCustom ? 'Catalogo' : <><Plus className="w-3.5 h-3.5" /> Crea Nuovo</>}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isCreatingCustom ? (
          /* Custom Exercise Form */
          <form onSubmit={handleCreateCustom} className="p-4 space-y-4 overflow-y-auto flex-1">
            <div>
              <label className="block text-xs font-bold text-[#132a13] mb-1">
                Nome Esercizio *
              </label>
              <input
                type="text"
                required
                placeholder="es. Affondi Bulgari con Manubri"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8e3d3] focus:border-[#31572c] focus:ring-1 focus:ring-[#31572c] text-sm text-[#132a13] bg-white outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Gruppo Muscolare *
                </label>
                <select
                  value={customMuscle}
                  onChange={(e) => setCustomMuscle(e.target.value as MuscleGroup)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#d8e3d3] focus:border-[#31572c] text-sm text-[#132a13] bg-white outline-hidden"
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
                  className="w-full px-3 py-2.5 rounded-xl border border-[#d8e3d3] focus:border-[#31572c] text-sm text-[#132a13] bg-white outline-hidden"
                >
                  <option value="Bilanciere">Bilanciere</option>
                  <option value="Manubri">Manubri</option>
                  <option value="Cavi">Cavi</option>
                  <option value="Macchina">Macchina</option>
                  <option value="Corpo Libero">Corpo Libero</option>
                  <option value="Kettlebell">Kettlebell</option>
                  <option value="Elastici">Elastici</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#132a13] mb-1">
                Istruzioni o Note di Esecuzione
              </label>
              <textarea
                rows={3}
                placeholder="es. Mantieni il busto eretto e il ginocchio in linea con la caviglia..."
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#d8e3d3] focus:border-[#31572c] text-xs text-[#132a13] bg-white outline-hidden resize-none"
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
                className="w-full px-3 py-2 rounded-xl border border-[#d8e3d3] focus:border-[#31572c] text-xs text-[#132a13] bg-white outline-hidden"
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
                Salva & Aggiungi
              </button>
            </div>
          </form>
        ) : (
          /* Catalog List View */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-[#edf2ea] bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cerca esercizio (es. Panca, Squat, Trazioni)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-[#f5f8f3] border border-[#dbe5d7] focus:bg-white focus:border-[#31572c] outline-hidden text-[#132a13]"
                />
              </div>

              {/* Muscle Pills Carousel */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-none">
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
            </div>

            {/* List */}
            <div className="p-3 overflow-y-auto flex-1 divide-y divide-[#edf3eb]">
              {filteredExercises.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <Dumbbell className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#4f772d]" />
                  <p className="text-sm font-semibold text-neutral-600">Nessun esercizio trovato</p>
                  <p className="text-xs mt-1">Prova a cambiare filtro o creane uno personalizzato!</p>
                </div>
              ) : (
                filteredExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="py-2.5 px-2 flex items-center justify-between gap-3 hover:bg-[#f8faf6] rounded-xl transition group"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => setInspectExercise(exercise)}
                      className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200 cursor-pointer relative"
                    >
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div
                      onClick={() => {
                        onSelectExercise(exercise);
                        onClose();
                      }}
                      className="flex-1 min-w-0 cursor-pointer"
                    >
                      <h3 className="text-xs sm:text-sm font-bold text-[#132a13] truncate group-hover:text-[#31572c]">
                        {exercise.nameIt || exercise.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-semibold text-[#4f772d] bg-[#f0f5ec] px-1.5 py-0.5 rounded">
                          {exercise.muscleGroup}
                        </span>
                        <span className="text-[10px] text-neutral-500 truncate">
                          {exercise.equipment}
                        </span>
                        {exercise.isCustom && (
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">
                            Personalizzato
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setInspectExercise(exercise)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-[#31572c] hover:bg-[#edf3ea] transition"
                        title="Dettagli e GIF"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectExercise(exercise);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-xs shadow-xs transition"
                      >
                        Scegli
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Inspect Modal */}
      {inspectExercise && (
        <ExerciseDetailModal
          exercise={inspectExercise}
          isOpen={!!inspectExercise}
          onClose={() => setInspectExercise(null)}
          onAddToWorkout={(ex) => {
            onSelectExercise(ex);
            setInspectExercise(null);
            onClose();
          }}
        />
      )}
    </div>
  );
};
