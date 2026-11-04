import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Plus, Minus, BellRing } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface RestTimerModalProps {
  initialSeconds: number;
  isOpen: boolean;
  onClose: () => void;
  exerciseName?: string;
}

export const RestTimerModal: React.FC<RestTimerModalProps> = ({
  initialSeconds,
  isOpen,
  onClose,
  exerciseName,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [totalTime, setTotalTime] = useState(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(initialSeconds);
    setTotalTime(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            soundFX.playCountdownTick();
          }
          if (prev <= 1) {
            soundFX.playSuccessChime();
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 100;

  const handleAdjustTime = (delta: number) => {
    setTimeLeft((prev) => Math.max(0, prev + delta));
    setTotalTime((prev) => Math.max(prev, prev + delta));
  };

  const handleReset = () => {
    setTimeLeft(totalTime);
    setIsRunning(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-[#31572c]/20 flex flex-col items-center relative animate-in fade-in zoom-in duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f0f4ee] hover:bg-[#e2eadc] text-[#132a13] flex items-center justify-center transition"
          aria-label="Chiudi timer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#31572c] mb-1 font-semibold text-xs tracking-wider uppercase">
          <BellRing className="w-4 h-4 text-[#4f772d]" />
          <span>Timer di Recupero</span>
        </div>

        {exerciseName && (
          <p className="text-xs text-neutral-500 font-medium truncate max-w-[240px] mb-4 text-center">
            {exerciseName}
          </p>
        )}

        {/* Circular Clock Graphic */}
        <div className="relative w-48 h-48 flex items-center justify-center my-2">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Ring */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#e8efe4"
              strokeWidth="7"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#31572c"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={(2 * Math.PI * 42) * (1 - progressPercent / 100)}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-[#132a13] tracking-tight font-display">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] text-neutral-500 font-medium mt-0.5">
              {timeLeft === 0 ? 'Recupero Terminato!' : isRunning ? 'In riposo...' : 'In pausa'}
            </span>
          </div>
        </div>

        {/* Adjust Quick Buttons */}
        <div className="flex items-center gap-2 mt-3 mb-4">
          <button
            type="button"
            onClick={() => handleAdjustTime(-15)}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[#f0f4ed] text-[#31572c] font-semibold hover:bg-[#e4ede0] transition"
          >
            <Minus className="w-3 h-3" /> 15s
          </button>
          <button
            type="button"
            onClick={() => handleAdjustTime(15)}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[#f0f4ed] text-[#31572c] font-semibold hover:bg-[#e4ede0] transition"
          >
            <Plus className="w-3 h-3" /> 15s
          </button>
          <button
            type="button"
            onClick={() => handleAdjustTime(30)}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[#f0f4ed] text-[#31572c] font-semibold hover:bg-[#e4ede0] transition"
          >
            <Plus className="w-3 h-3" /> 30s
          </button>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={handleReset}
            className="p-3 rounded-2xl bg-[#f4f7f2] hover:bg-[#e8efe5] text-[#31572c] flex items-center justify-center transition"
            title="Azzera"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-3 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm shadow transition ${
              isRunning
                ? 'bg-[#e2eadc] text-[#132a13] hover:bg-[#d5e2cd]'
                : 'bg-[#31572c] text-white hover:bg-[#132a13]'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausa</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Riprendi</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 rounded-2xl bg-[#ecf39e] hover:bg-[#e0e98a] text-[#132a13] font-bold text-sm transition"
          >
            Fatto
          </button>
        </div>
      </div>
    </div>
  );
};
