import {
  WorkoutRoutine,
  CompletedWorkoutLog,
  UserProfile,
  Exercise,
  WorkoutSet
} from '../types';
import {
  STARTER_ROUTINES,
  INITIAL_USER_PROFILE,
  INITIAL_WORKOUT_LOGS
} from '../data/exercisesDataset';

const STORAGE_KEYS = {
  ROUTINES: 'fittrack_routines',
  ACTIVE_ROUTINE_ID: 'fittrack_active_routine_id',
  WORKOUT_LOGS: 'fittrack_workout_logs',
  USER_PROFILE: 'fittrack_user_profile',
  CUSTOM_EXERCISES: 'fittrack_custom_exercises',
  ACTIVE_SESSION_CACHE: 'fittrack_active_session_cache',
};

// Safe JSON parse helper
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// ----------------- ROUTINES (SCHEDE) -----------------
export function getRoutines(): WorkoutRoutine[] {
  const stored = safeGet<WorkoutRoutine[] | null>(STORAGE_KEYS.ROUTINES, null);
  if (!stored || stored.length === 0) {
    return [];
  }

  // Clean up legacy starter routines from before if they lack isCustomRoutine
  const isAllLegacyStarters = stored.every(
    (r) =>
      !r.isCustomRoutine &&
      (r.id === 'routine-hypertrophy-abc' ||
        r.id === 'routine-upper-lower' ||
        r.id === 'routine-fullbody')
  );

  if (isAllLegacyStarters) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ROUTINES);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUTINE_ID);
    }
    return [];
  }

  return stored;
}

export function saveRoutines(routines: WorkoutRoutine[]): void {
  const routinesWithFlag = routines.map((r) => ({
    ...r,
    isCustomRoutine: true,
  }));
  safeSet(STORAGE_KEYS.ROUTINES, routinesWithFlag);
}

export function getActiveRoutine(): WorkoutRoutine | null {
  const routines = getRoutines();
  if (routines.length === 0) return null;
  const activeId = safeGet<string | null>(STORAGE_KEYS.ACTIVE_ROUTINE_ID, null);
  if (activeId) {
    const match = routines.find((r) => r.id === activeId);
    if (match) return match;
  }
  const defaultActive = routines.find((r) => r.isActive) || routines[0] || null;
  return defaultActive;
}

export function setActiveRoutineId(id: string): void {
  safeSet(STORAGE_KEYS.ACTIVE_ROUTINE_ID, id);
  const routines = getRoutines();
  const updated = routines.map((r) => ({
    ...r,
    isActive: r.id === id,
  }));
  saveRoutines(updated);
}

export function saveRoutine(routine: WorkoutRoutine): void {
  const routines = getRoutines();
  const index = routines.findIndex((r) => r.id === routine.id);
  const routineWithFlag: WorkoutRoutine = {
    ...routine,
    isCustomRoutine: true,
    updatedAt: new Date().toISOString(),
  };
  let updated: WorkoutRoutine[];
  if (index >= 0) {
    updated = [...routines];
    updated[index] = routineWithFlag;
  } else {
    updated = [...routines, routineWithFlag];
  }
  saveRoutines(updated);
}

export function deleteRoutine(id: string): void {
  const routines = getRoutines().filter((r) => r.id !== id);
  saveRoutines(routines);
  const currentActive = safeGet<string | null>(STORAGE_KEYS.ACTIVE_ROUTINE_ID, null);
  if (currentActive === id) {
    if (routines.length > 0) {
      safeSet(STORAGE_KEYS.ACTIVE_ROUTINE_ID, routines[0].id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUTINE_ID);
    }
  }
}

export function clearAllRoutines(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.ROUTINES);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUTINE_ID);
  }
}

// ----------------- WORKOUT LOGS (STORICIZZAZIONE) -----------------
export function getWorkoutLogs(): CompletedWorkoutLog[] {
  const stored = safeGet<CompletedWorkoutLog[] | null>(STORAGE_KEYS.WORKOUT_LOGS, null);
  if (!stored) {
    return [];
  }
  // Check if all stored are legacy demo logs
  const isDemoLogs = stored.every((l) => l.id?.startsWith('log-demo-'));
  if (isDemoLogs) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.WORKOUT_LOGS);
    }
    return [];
  }
  return stored;
}

export function saveWorkoutLog(log: CompletedWorkoutLog): void {
  const logs = getWorkoutLogs();
  const existingIdx = logs.findIndex((l) => l.id === log.id);
  let updated: CompletedWorkoutLog[];
  if (existingIdx >= 0) {
    updated = [...logs];
    updated[existingIdx] = log;
  } else {
    updated = [log, ...logs];
  }
  safeSet(STORAGE_KEYS.WORKOUT_LOGS, updated);

  // Check personal records update
  updatePersonalRecordsFromLog(log);
}

export function deleteWorkoutLog(id: string): void {
  const logs = getWorkoutLogs().filter((l) => l.id !== id);
  safeSet(STORAGE_KEYS.WORKOUT_LOGS, logs);
}

// ----------------- AUTO-SAVE SET FOR WORKOUT SESSION -----------------
export interface LiveSessionState {
  routineId: string;
  dayId: string;
  date: string;
  startTime: string;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    exerciseCategory: string;
    sets: WorkoutSet[];
    notes?: string;
  }[];
}

export function getActiveSessionCache(): LiveSessionState | null {
  return safeGet<LiveSessionState | null>(STORAGE_KEYS.ACTIVE_SESSION_CACHE, null);
}

export function saveActiveSessionCache(session: LiveSessionState | null): void {
  if (!session) {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION_CACHE);
  } else {
    safeSet(STORAGE_KEYS.ACTIVE_SESSION_CACHE, session);
  }
}

// Find previous performance for exercise (weight and reps)
export function getLastPerformanceForExercise(
  exerciseId: string
): { weightKg: number; reps: number; date: string } | null {
  const logs = getWorkoutLogs();
  for (const log of logs) {
    const exercise = log.exercises?.find((e) => e.exerciseId === exerciseId);
    if (exercise && exercise.sets && exercise.sets.length > 0) {
      const completedSets = exercise.sets.filter((s) => s.completed);
      if (completedSets.length > 0) {
        // take best or last completed set
        const bestSet = completedSets.reduce((prev, curr) =>
          (curr.actualWeightKg || 0) >= (prev.actualWeightKg || 0) ? curr : prev
        );
        return {
          weightKg: bestSet.actualWeightKg ?? bestSet.targetWeightKg,
          reps: bestSet.actualReps ?? bestSet.targetReps,
          date: log.date,
        };
      }
    }
  }
  return null;
}

// ----------------- USER PROFILE -----------------
export function getUserProfile(): UserProfile | null {
  const stored = safeGet<UserProfile | null>(STORAGE_KEYS.USER_PROFILE, null);
  if (!stored) {
    return null;
  }
  // If stored profile was the default demo "Marco Rossi" without custom flag, clean it so user starts fresh
  if (!stored.isCustomProfile && stored.name === 'Marco Rossi') {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    }
    return null;
  }
  return stored;
}

export function saveUserProfile(profile: UserProfile): void {
  safeSet(STORAGE_KEYS.USER_PROFILE, { ...profile, isCustomProfile: true });
}

export function clearUserProfile(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  }
}

function updatePersonalRecordsFromLog(log: CompletedWorkoutLog): void {
  const profile = getUserProfile();
  if (!profile) return;
  let prUpdated = false;
  const currentPRs = [...profile.personalRecords];

  log.exercises.forEach((ex) => {
    ex.sets.forEach((set) => {
      if (set.completed && (set.actualWeightKg || 0) > 0) {
        const weight = set.actualWeightKg || 0;
        const reps = set.actualReps || 1;
        // Brzycki formula: 1RM = Weight * (36 / (37 - reps))
        const est1RM = Math.round(weight * (36 / (37 - Math.min(reps, 36))));

        const existingPrIdx = currentPRs.findIndex((p) => p.exerciseId === ex.exerciseId);
        if (existingPrIdx >= 0) {
          if (est1RM > currentPRs[existingPrIdx].estimatedOneRepMax) {
            currentPRs[existingPrIdx] = {
              exerciseId: ex.exerciseId,
              exerciseName: ex.exerciseName,
              weightKg: weight,
              reps,
              date: log.date,
              estimatedOneRepMax: est1RM,
            };
            prUpdated = true;
          }
        } else {
          currentPRs.push({
            exerciseId: ex.exerciseId,
            exerciseName: ex.exerciseName,
            weightKg: weight,
            reps,
            date: log.date,
            estimatedOneRepMax: est1RM,
          });
          prUpdated = true;
        }
      }
    });
  });

  if (prUpdated) {
    saveUserProfile({ ...profile, personalRecords: currentPRs });
  }
}

// ----------------- CUSTOM EXERCISES -----------------
export function getCustomExercises(): Exercise[] {
  return safeGet<Exercise[]>(STORAGE_KEYS.CUSTOM_EXERCISES, []);
}

export function saveCustomExercise(exercise: Exercise): void {
  const custom = getCustomExercises();
  const existingIdx = custom.findIndex((e) => e.id === exercise.id);
  let updated: Exercise[];
  if (existingIdx >= 0) {
    updated = [...custom];
    updated[existingIdx] = exercise;
  } else {
    updated = [exercise, ...custom];
  }
  safeSet(STORAGE_KEYS.CUSTOM_EXERCISES, updated);
}

export function deleteCustomExercise(id: string): void {
  const custom = getCustomExercises().filter((e) => e.id !== id);
  safeSet(STORAGE_KEYS.CUSTOM_EXERCISES, custom);
}

// ----------------- EXPORT / IMPORT BACKUP -----------------
export function exportAllDataAsJSON(): string {
  const data = {
    exportDate: new Date().toISOString(),
    version: '1.0',
    routines: getRoutines(),
    activeRoutineId: safeGet<string | null>(STORAGE_KEYS.ACTIVE_ROUTINE_ID, null),
    logs: getWorkoutLogs(),
    profile: getUserProfile(),
    customExercises: getCustomExercises(),
  };
  return JSON.stringify(data, null, 2);
}

export function importAllDataFromJSON(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.routines) saveRoutines(data.routines);
    if (data.activeRoutineId) safeSet(STORAGE_KEYS.ACTIVE_ROUTINE_ID, data.activeRoutineId);
    if (data.logs) safeSet(STORAGE_KEYS.WORKOUT_LOGS, data.logs);
    if (data.profile) saveUserProfile(data.profile);
    if (data.customExercises) safeSet(STORAGE_KEYS.CUSTOM_EXERCISES, data.customExercises);
    return true;
  } catch (err) {
    console.error('Import failed:', err);
    return false;
  }
}
