import React, { useState } from 'react';
import { Exercise } from '../types';
import { X, Dumbbell, ShieldCheck, Flame, Info, ExternalLink } from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToWorkout?: (exercise: Exercise) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  isOpen,
  onClose,
  onAddToWorkout,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'gif' | 'image'>('gif');
  const [imgError, setImgError] = useState(false);

  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-[#31572c]/20 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e9efe5] bg-[#fafcf9]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ecf39e] flex items-center justify-center text-[#132a13]">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#132a13] leading-tight">
                {exercise.nameIt || exercise.name}
              </h2>
              <span className="text-[11px] text-[#4f772d] font-semibold tracking-wide uppercase">
                {exercise.muscleGroup} • {exercise.equipment}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Media Player: GIF or Image */}
          <div className="relative w-full aspect-4/3 bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 flex items-center justify-center">
            {/* Toggle GIF / Photo */}
            {exercise.gifUrl && exercise.image && (
              <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-xs p-0.5 rounded-lg flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMediaTab('gif');
                    setImgError(false);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition ${
                    activeMediaTab === 'gif'
                      ? 'bg-[#ecf39e] text-[#132a13]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  GIF Animata
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveMediaTab('image');
                    setImgError(false);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition ${
                    activeMediaTab === 'image'
                      ? 'bg-[#ecf39e] text-[#132a13]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Foto
                </button>
              </div>
            )}

            {!imgError ? (
              <img
                src={activeMediaTab === 'gif' && exercise.gifUrl ? exercise.gifUrl : exercise.image}
                alt={exercise.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-contain bg-white"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-neutral-400">
                <Dumbbell className="w-12 h-12 mb-2 text-neutral-300" />
                <span className="text-xs font-medium">Anteprima multimediale non disponibile offline</span>
              </div>
            )}
          </div>

          {/* Quick Info Tags */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#f5f8f3] p-2.5 rounded-xl border border-[#e2ebe0]">
              <span className="text-[10px] text-neutral-500 block uppercase font-bold">Gruppo</span>
              <span className="text-xs font-bold text-[#132a13] truncate block">{exercise.muscleGroup}</span>
            </div>
            <div className="bg-[#f5f8f3] p-2.5 rounded-xl border border-[#e2ebe0]">
              <span className="text-[10px] text-neutral-500 block uppercase font-bold">Target</span>
              <span className="text-xs font-bold text-[#132a13] truncate block">{exercise.target || exercise.bodyPart}</span>
            </div>
            <div className="bg-[#f5f8f3] p-2.5 rounded-xl border border-[#e2ebe0]">
              <span className="text-[10px] text-neutral-500 block uppercase font-bold">Attrezzo</span>
              <span className="text-xs font-bold text-[#132a13] truncate block">{exercise.equipment}</span>
            </div>
          </div>

          {/* Instructions Step-by-Step in Italian */}
          <div>
            <h3 className="text-xs font-bold text-[#132a13] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#31572c]" />
              <span>Istruzioni di Esecuzione Corretta</span>
            </h3>

            {exercise.instructionStepsIt && exercise.instructionStepsIt.length > 0 ? (
              <ol className="space-y-2 text-xs text-neutral-700">
                {exercise.instructionStepsIt.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-[#fafcf9] p-2 rounded-xl border border-[#edf3eb]">
                    <span className="w-5 h-5 rounded-full bg-[#31572c] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-neutral-700 bg-[#fafcf9] p-3 rounded-xl border border-[#edf3eb] leading-relaxed">
                {exercise.instructionsIt || "Esegui il movimento controllando la fase eccentrica e concentrica per massimizzare la tensione muscolare."}
              </p>
            )}
          </div>

          {exercise.instructionsEn && (
            <details className="text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              <summary className="cursor-pointer font-medium text-neutral-700">Testo istruzioni originali (English)</summary>
              <p className="mt-1.5 leading-relaxed">{exercise.instructionsEn}</p>
            </details>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#e9efe5] bg-[#fafcf9] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition"
          >
            Chiudi
          </button>
          {onAddToWorkout && (
            <button
              type="button"
              onClick={() => {
                onAddToWorkout(exercise);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#31572c] text-white hover:bg-[#132a13] shadow transition"
            >
              Aggiungi alla Scheda
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
