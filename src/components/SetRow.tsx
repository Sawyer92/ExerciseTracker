import React, { useState } from 'react';
import { WorkoutSet } from '../types';
import { Check, Trash2, Clock, Flame } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface SetRowProps {
  set: WorkoutSet;
  index: number;
  previousRecord?: { weightKg: number; reps: number } | null;
  onUpdateSet: (index: number, updatedSet: WorkoutSet) => void;
  onDeleteSet?: (index: number) => void;
  onStartRestTimer?: () => void;
  isReadOnly?: boolean;
}

export const SetRow: React.FC<SetRowProps> = ({
  set,
  index,
  previousRecord,
  onUpdateSet,
  onDeleteSet,
  onStartRestTimer,
  isReadOnly = false,
}) => {
  // Local state initialized with current actual or target values
  const currentWeight = set.actualWeightKg !== undefined ? set.actualWeightKg : set.targetWeightKg;
  const currentReps = set.actualReps !== undefined ? set.actualReps : set.targetReps;

  const handleWeightChange = (newVal: number) => {
    const val = Math.max(0, newVal);
    onUpdateSet(index, {
      ...set,
      actualWeightKg: val,
      targetWeightKg: set.completed ? set.targetWeightKg : val,
    });
  };

  const handleRepsChange = (newVal: number) => {
    const val = Math.max(0, newVal);
    onUpdateSet(index, {
      ...set,
      actualReps: val,
      targetReps: set.completed ? set.targetReps : val,
    });
  };

  const handleToggleComplete = () => {
    if (isReadOnly) return;
    const nextCompleted = !set.completed;

    if (nextCompleted) {
      soundFX.playSuccessChime();
      if (onStartRestTimer) {
        onStartRestTimer();
      }
    }

    onUpdateSet(index, {
      ...set,
      completed: nextCompleted,
      actualWeightKg: currentWeight,
      actualReps: currentReps,
      completedAt: nextCompleted ? new Date().toISOString() : undefined,
    });
  };

  return (
    <div
      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
        set.completed
          ? 'bg-[#ecf39e]/25 border-[#90a955]/40 text-[#132a13]'
          : 'bg-white border-[#e6eee1] hover:border-[#ccd9c5]'
      }`}
    >
      {/* Set Badge & Previous comparison */}
      <div className="flex items-center gap-2 min-w-[70px]">
        <span
          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
            set.completed
              ? 'bg-[#31572c] text-white shadow-xs'
              : 'bg-[#f0f4ec] text-[#31572c]'
          }`}
        >
          #{set.setNumber || index + 1}
        </span>

        {previousRecord && (
          <span className="hidden sm:inline-block text-[10px] text-neutral-500 font-medium whitespace-nowrap">
            Prec: {previousRecord.weightKg}kg×{previousRecord.reps}
          </span>
        )}
      </div>

      {/* Weight Input (Carico KG) */}
      <div className="flex items-center gap-1">
        <div className="flex items-center bg-[#f8faf6] border border-[#d8e3d3] rounded-lg px-1.5 py-1 focus-within:border-[#31572c] focus-within:ring-1 focus-within:ring-[#31572c]">
          <input
            type="number"
            min="0"
            step="0.5"
            value={currentWeight === 0 ? '' : currentWeight}
            placeholder="0"
            disabled={isReadOnly}
            onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 0)}
            className="w-12 text-center text-xs sm:text-sm font-bold text-[#132a13] bg-transparent outline-hidden"
          />
          <span className="text-[10px] font-semibold text-neutral-500 pr-0.5">kg</span>
        </div>
      </div>

      <span className="text-neutral-300 font-bold text-xs mx-0.5">×</span>

      {/* Reps Input (Ripetizioni) */}
      <div className="flex items-center gap-1">
        <div className="flex items-center bg-[#f8faf6] border border-[#d8e3d3] rounded-lg px-1.5 py-1 focus-within:border-[#31572c] focus-within:ring-1 focus-within:ring-[#31572c]">
          <input
            type="number"
            min="0"
            step="1"
            value={currentReps === 0 ? '' : currentReps}
            placeholder="0"
            disabled={isReadOnly}
            onChange={(e) => handleRepsChange(parseInt(e.target.value, 10) || 0)}
            className="w-10 text-center text-xs sm:text-sm font-bold text-[#132a13] bg-transparent outline-hidden"
          />
          <span className="text-[10px] font-semibold text-neutral-500 pr-0.5">rep</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5 ml-1">
        {/* Complete Checkbox Button (Auto-save trigger) */}
        {!isReadOnly && (
          <button
            type="button"
            onClick={handleToggleComplete}
            title={set.completed ? 'Completata (Clicca per annullare)' : 'Segna come completata'}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              set.completed
                ? 'bg-[#31572c] text-white shadow-xs scale-102 hover:bg-[#132a13]'
                : 'border-2 border-neutral-300 hover:border-[#31572c] bg-white text-transparent hover:text-neutral-400'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </button>
        )}

        {/* Delete Set */}
        {onDeleteSet && !isReadOnly && (
          <button
            type="button"
            onClick={() => onDeleteSet(index)}
            className="w-7 h-7 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition"
            title="Elimina serie"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
