export type MuscleGroup =
  | 'Petto'
  | 'Dorso'
  | 'Gambe'
  | 'Spalle'
  | 'Bicipiti'
  | 'Tricipiti'
  | 'Addominali'
  | 'Glutei'
  | 'Polpacci'
  | 'Cardio';

export type EquipmentType =
  | 'Bilanciere'
  | 'Manubri'
  | 'Cavi'
  | 'Macchina'
  | 'Corpo Libero'
  | 'Kettlebell'
  | 'Elastici'
  | 'Altro';

export interface Exercise {
  id: string;
  name: string;
  nameIt: string;
  category: string;
  bodyPart: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles?: string[];
  equipment: EquipmentType | string;
  target: string;
  instructionsEn?: string;
  instructionsIt: string;
  instructionStepsIt?: string[];
  image: string;
  gifUrl: string;
  isCustom?: boolean;
}

export interface WorkoutSet {
  setNumber: number;
  targetReps: number;
  targetWeightKg: number;
  actualReps?: number;
  actualWeightKg?: number;
  completed: boolean;
  completedAt?: string;
  rpe?: number; // Rate of Perceived Exertion (1-10)
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  exerciseNameIt?: string;
  muscleGroup: MuscleGroup;
  category: string;
  image?: string;
  gifUrl?: string;
  sets: WorkoutSet[];
  restSeconds: number;
  notes?: string;
}

export interface RoutineDay {
  id: string;
  name: string; // e.g. "Giorno A - Petto & Tricipiti"
  dayOfWeek?: number; // 0 = Domenica, 1 = Lunedi, etc.
  exercises: WorkoutExercise[];
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  days: RoutineDay[];
  isCustomRoutine?: boolean;
}

export interface CompletedWorkoutLog {
  id: string;
  routineId: string;
  routineName: string;
  dayId: string;
  dayName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // ISO string
  endTime: string; // ISO string
  durationMinutes: number;
  exercises: WorkoutExercise[];
  totalVolumeKg: number;
  totalSetsCompleted: number;
  notes?: string;
  rating?: number; // 1-5
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  date: string; // YYYY-MM-DD
  estimatedOneRepMax: number;
}

export interface WeightEntry {
  id: string;
  date: string;
  weightKg: number;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  fitnessGoal: 'hypertrophy' | 'strength' | 'cut' | 'maintenance';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  trainingDaysPerWeek: number;
  personalRecords: PersonalRecord[];
  weightHistory: WeightEntry[];
  bio?: string;
  avatarUrl?: string;
  isCustomProfile?: boolean;
}

export type DeviceViewMode = 'responsive' | 'iphone' | 'android' | 'desktop';
