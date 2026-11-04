import React, { useState, useMemo } from 'react';
import { UserProfile, PersonalRecord, WeightEntry } from '../types';
import {
  getUserProfile,
  saveUserProfile,
  clearUserProfile,
  getWorkoutLogs,
  exportAllDataAsJSON,
  importAllDataFromJSON
} from '../utils/storage';
import {
  User,
  UserPlus,
  Scale,
  Ruler,
  Trophy,
  Activity,
  Award,
  Download,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingUp,
  Target,
  Edit3,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Check,
  ChevronRight
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => getUserProfile());
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isAddingPR, setIsAddingPR] = useState(false);
  const [isAddingWeight, setIsAddingWeight] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Initial Onboarding Form state (when profile is null)
  const [initName, setInitName] = useState('');
  const [initAge, setInitAge] = useState<number | ''>('');
  const [initGender, setInitGender] = useState<'male' | 'female' | 'other'>('male');
  const [initHeight, setInitHeight] = useState<number | ''>('');
  const [initWeight, setInitWeight] = useState<number | ''>('');
  const [initTargetWeight, setInitTargetWeight] = useState<number | ''>('');
  const [initGoal, setInitGoal] = useState<'hypertrophy' | 'strength' | 'cut' | 'maintenance'>('hypertrophy');
  const [initLevel, setInitLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [initDaysPerWeek, setInitDaysPerWeek] = useState<number>(3);
  const [initBio, setInitBio] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // New PR inputs
  const [newPrExercise, setNewPrExercise] = useState('');
  const [newPrWeight, setNewPrWeight] = useState<number>(80);
  const [newPrReps, setNewPrReps] = useState<number>(5);

  // New Weight log
  const [newWeightVal, setNewWeightVal] = useState<number>(profile?.currentWeightKg || 75);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const logs = useMemo(() => getWorkoutLogs(), []);

  const totalStats = useMemo(() => {
    const workouts = logs.length;
    const totalVolume = logs.reduce((acc, l) => acc + (l.totalVolumeKg || 0), 0);
    const totalSets = logs.reduce((acc, l) => acc + (l.totalSetsCompleted || 0), 0);
    return { workouts, totalVolume, totalSets };
  }, [logs]);

  // BMI calculation
  const bmi = useMemo(() => {
    if (!profile || !profile.heightCm || !profile.currentWeightKg) return 0;
    const heightInMeters = profile.heightCm / 100;
    const val = profile.currentWeightKg / (heightInMeters * heightInMeters);
    return parseFloat(val.toFixed(1));
  }, [profile]);

  const bmiCategory = useMemo(() => {
    if (bmi < 18.5) return { label: 'Sottopeso', color: 'text-amber-600 bg-amber-50' };
    if (bmi < 25) return { label: 'Normopeso', color: 'text-emerald-700 bg-emerald-50' };
    if (bmi < 30) return { label: 'Sovrappeso', color: 'text-orange-700 bg-orange-50' };
    return { label: 'Obesità', color: 'text-red-700 bg-red-50' };
  }, [bmi]);

  // Initial Creation Handler
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initName.trim()) {
      setFormError('Inserisci il tuo nome per continuare.');
      return;
    }

    const currentWeight = Number(initWeight) || 70;
    const targetWeight = Number(initTargetWeight) || currentWeight;

    const newProfile: UserProfile = {
      name: initName.trim(),
      age: Number(initAge) || 25,
      gender: initGender,
      heightCm: Number(initHeight) || 175,
      currentWeightKg: currentWeight,
      targetWeightKg: targetWeight,
      fitnessGoal: initGoal,
      fitnessLevel: initLevel,
      trainingDaysPerWeek: initDaysPerWeek,
      bio: initBio.trim(),
      personalRecords: [],
      weightHistory: initWeight
        ? [
            {
              id: `w-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              weightKg: currentWeight,
            },
          ]
        : [],
      isCustomProfile: true,
    };

    saveUserProfile(newProfile);
    setProfile(newProfile);
    setNewWeightVal(newProfile.currentWeightKg);
    setFormError(null);
    setToastMessage('Profilo creato e salvato con successo sul tuo dispositivo!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    saveUserProfile(updated);
    setToastMessage('Profilo aggiornato con successo!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetProfile = () => {
    clearUserProfile();
    setProfile(null);
    setShowResetConfirm(false);
    setInitName('');
    setInitAge('');
    setInitHeight('');
    setInitWeight('');
    setInitTargetWeight('');
    setInitBio('');
    setToastMessage('Profilo azzerato. Puoi configurarne uno nuovo.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddPR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !newPrExercise.trim()) return;

    const est1RM = Math.round(newPrWeight * (36 / (37 - Math.min(newPrReps, 36))));
    const newPr: PersonalRecord = {
      exerciseId: `pr-${Date.now()}`,
      exerciseName: newPrExercise.trim(),
      weightKg: newPrWeight,
      reps: newPrReps,
      date: new Date().toISOString().split('T')[0],
      estimatedOneRepMax: est1RM,
    };

    const updatedPrs = [newPr, ...profile.personalRecords];
    handleSaveProfile({ ...profile, personalRecords: updatedPrs });
    setIsAddingPR(false);
    setNewPrExercise('');
  };

  const handleDeletePR = (index: number) => {
    if (!profile) return;
    const updatedPrs = profile.personalRecords.filter((_, idx) => idx !== index);
    handleSaveProfile({ ...profile, personalRecords: updatedPrs });
  };

  const handleAddWeightEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    const today = new Date().toISOString().split('T')[0];
    const newEntry: WeightEntry = {
      id: `w-${Date.now()}`,
      date: today,
      weightKg: newWeightVal,
    };

    const updatedHistory = [...profile.weightHistory, newEntry];
    handleSaveProfile({
      ...profile,
      currentWeightKg: newWeightVal,
      weightHistory: updatedHistory,
    });
    setIsAddingWeight(false);
  };

  const handleExportData = () => {
    const jsonStr = exportAllDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fittrack_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMessage('Backup scaricato con successo!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const success = importAllDataFromJSON(text);
      if (success) {
        setProfile(getUserProfile());
        setToastMessage('Dati ripristinati con successo!');
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        alert('File JSON non valido per il ripristino.');
      }
    };
    reader.readAsText(file);
  };

  // =========================================================================
  // VIEW 1: NESSUN PROFILO PRESENTE -> FORM DI INSERIMENTO / ONBOARDING
  // =========================================================================
  if (!profile) {
    return (
      <div className="flex-1 flex flex-col bg-[#f8faf7] overflow-y-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#e6eee1] sticky top-0 z-20">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4f772d] mb-0.5">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Configurazione Iniziale</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#132a13] font-display">
            Crea il tuo Profilo Utente
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Nessun profilo presente sul dispositivo. Inserisci i tuoi dati per personalizzare la tua scheda, calcolare il BMI e tenere traccia dei progressi.
          </p>

          {toastMessage && (
            <div className="mt-2.5 p-2 bg-[#ecf39e] text-[#132a13] rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#31572c]" /> {toastMessage}
            </div>
          )}
        </div>

        {/* Form Container */}
        <div className="p-4 sm:p-5 flex-1 max-w-xl mx-auto w-full">
          <form
            onSubmit={handleCreateProfile}
            className="bg-white rounded-3xl border border-[#dce7da] p-5 sm:p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-[#edf3eb]">
              <div className="w-12 h-12 rounded-2xl bg-[#ecf39e] text-[#132a13] flex items-center justify-center shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#132a13]">Informazioni Personali</h2>
                <p className="text-xs text-neutral-500">I dati rimangono memorizzati solo su questo dispositivo.</p>
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Nome */}
            <div>
              <label className="block text-xs font-bold text-[#132a13] mb-1">
                Nome o Nickname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="es. Marco, Sara, Alex..."
                value={initName}
                onChange={(e) => setInitName(e.target.value)}
                className="w-full px-3 py-2 text-sm font-medium text-[#132a13] bg-[#fafcf9] border border-[#d8e3d3] focus:border-[#31572c] rounded-xl outline-hidden transition"
              />
            </div>

            {/* Genere ed Età */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Genere
                </label>
                <select
                  value={initGender}
                  onChange={(e) => setInitGender(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm text-[#132a13] bg-[#fafcf9] border border-[#d8e3d3] focus:border-[#31572c] rounded-xl outline-hidden transition"
                >
                  <option value="male">Uomo</option>
                  <option value="female">Donna</option>
                  <option value="other">Altro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Età (anni)
                </label>
                <input
                  type="number"
                  min="12"
                  max="100"
                  placeholder="es. 26"
                  value={initAge}
                  onChange={(e) => setInitAge(e.target.value ? parseInt(e.target.value, 10) : '')}
                  className="w-full px-3 py-2 text-sm font-medium text-[#132a13] bg-[#fafcf9] border border-[#d8e3d3] focus:border-[#31572c] rounded-xl outline-hidden transition"
                />
              </div>
            </div>

            {/* Altezza e Pesi */}
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Altezza (cm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  placeholder="es. 178"
                  value={initHeight}
                  onChange={(e) => setInitHeight(e.target.value ? parseInt(e.target.value, 10) : '')}
                  className="w-full px-3 py-2 text-sm font-medium text-[#132a13] bg-[#fafcf9] border border-[#d8e3d3] focus:border-[#31572c] rounded-xl outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="300"
                  placeholder="es. 74.5"
                  value={initWeight}
                  onChange={(e) => setInitWeight(e.target.value ? parseFloat(e.target.value) : '')}
                  className="w-full px-3 py-2 text-sm font-medium text-[#132a13] bg-[#fafcf9] border border-[#d8e3d3] focus:border-[#31572c] rounded-xl outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Obiettivo (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="300"
                  placeholder="es. 78.0"
                  value={initTargetWeight}
                  onChange={(e) => setInitTargetWeight(e.target.value ? parseFloat(e.target.value) : '')}
                  className="w-full px-3 py-2 text-sm font-medium text-[#132a13] bg-[#fafcf9] border border-[#d8e3d3] focus:border-[#31572c] rounded-xl outline-hidden transition"
                />
              </div>
            </div>

            {/* Obiettivo e Livello */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Obiettivo di Allenamento
                </label>
                <select
                  value={initGoal}
                  onChange={(e) => setInitGoal(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm text-[#132a13] bg-[#fafcf9] border border-[#d8e3d3] focus:border-[#31572c] rounded-xl outline-hidden transition"
                >
                  <option value="hypertrophy">Ipertrofia (Massa Muscolare)</option>
                  <option value="strength">Aumento Forza</option>
                  <option value="cut">Definizione (Cut / Dimagrimento)</option>
                  <option value="maintenance">Mantenimento e Benessere</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#132a13] mb-1">
                  Livello di Esperienza
                </label>
                <select
                  value={initLevel}
                  onChange={(e) => setInitLevel(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm text-[#132a13] bg-[#fafcf9] border border-[#d8e3d3] focus:border-[#31572c] rounded-xl outline-hidden transition"
                >
                  <option value="beginner">Principiante (0 - 1 anno)</option>
                  <option value="intermediate">Intermedio (1 - 3 anni)</option>
                  <option value="advanced">Avanzato (&gt; 3 anni)</option>
                </select>
              </div>
            </div>

            {/* Frequenza settimanale */}
            <div>
              <label className="block text-xs font-bold text-[#132a13] mb-1.5">
                Quanti giorni a settimana ti alleni di solito?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[2, 3, 4, 5, 6].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setInitDaysPerWeek(days)}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      initDaysPerWeek === days
                        ? 'bg-[#132a13] text-white shadow-xs'
                        : 'bg-[#f0f4ed] text-[#31572c] hover:bg-[#e4ece0]'
                    }`}
                  >
                    {days} gg
                  </button>
                ))}
              </div>
            </div>

            {/* Note / Bio personale */}
            <div>
              <label className="block text-xs font-bold text-[#132a13] mb-1">
                Note Personali o Obiettivi (Opzionale)
              </label>
              <textarea
                rows={2}
                placeholder="es. Vorrei migliorare la panca piana e allenarmi costantemente 3 volte a settimana."
                value={initBio}
                onChange={(e) => setInitBio(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#132a13] bg-[#fafcf9] border border-[#d8e3d3] focus:border-[#31572c] rounded-xl outline-hidden resize-none"
              />
            </div>

            {/* Bottone di Salvataggio */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#31572c] hover:bg-[#132a13] text-white font-bold text-sm rounded-2xl shadow-xs hover:shadow transition flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Salva Profilo sul Dispositivo</span>
              </button>
            </div>
          </form>

          {/* Backup Import Option */}
          <div className="mt-4 text-center">
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#31572c] hover:text-[#132a13] cursor-pointer bg-white px-3 py-2 rounded-xl border border-[#dce6da]">
              <Upload className="w-3.5 h-3.5" />
              <span>Hai già un backup JSON? Ripristinalo qui</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: PROFILO PRESENTE E CARICATO SUL DISPOSITIVO
  // =========================================================================
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <div className="p-4 bg-white border-b border-[#e6eee1] sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4f772d]">
              <User className="w-3.5 h-3.5" />
              <span>Dati & Metriche</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-[#132a13] font-display">
              Profilo Utente
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsEditingInfo(!isEditingInfo)}
            className="px-3.5 py-2 rounded-xl bg-[#f0f5ec] hover:bg-[#e4ede0] text-xs font-bold text-[#31572c] transition flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingInfo ? 'Chiudi Modifica' : 'Modifica Dati'}</span>
          </button>
        </div>

        {toastMessage && (
          <div className="mt-2.5 p-2 bg-[#ecf39e] text-[#132a13] rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#31572c]" /> {toastMessage}
          </div>
        )}
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* User Card */}
        <div className="bg-[#fafcf9] rounded-3xl border border-[#e2ece0] p-4 shadow-xs">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#31572c] text-white flex items-center justify-center font-bold text-xl font-display shadow-md">
              {profile.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-[#132a13] truncate">
                {profile.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                <span>{profile.age} anni</span>
                <span>•</span>
                <span className="capitalize">{profile.fitnessLevel}</span>
                <span>•</span>
                <span className="capitalize">{profile.fitnessGoal}</span>
              </div>
            </div>
          </div>

          {profile.bio && (
            <p className="text-xs text-neutral-600 bg-white p-2.5 rounded-xl border border-[#eaf0e7] mb-3 leading-relaxed">
              "{profile.bio}"
            </p>
          )}

          {/* Edit form toggle */}
          {isEditingInfo ? (
            <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-[#dce8d8] animate-in fade-in">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-[#132a13] border border-[#d8e3d3] rounded-lg outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                    Età
                  </label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-[#132a13] border border-[#d8e3d3] rounded-lg outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                    Altezza (cm)
                  </label>
                  <input
                    type="number"
                    value={profile.heightCm}
                    onChange={(e) => setProfile({ ...profile, heightCm: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-2 py-1.5 text-xs font-bold text-[#132a13] border border-[#d8e3d3] rounded-lg outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={profile.currentWeightKg}
                    onChange={(e) => setProfile({ ...profile, currentWeightKg: parseFloat(e.target.value) || 0 })}
                    className="w-full px-2 py-1.5 text-xs font-bold text-[#132a13] border border-[#d8e3d3] rounded-lg outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                    Target (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={profile.targetWeightKg}
                    onChange={(e) => setProfile({ ...profile, targetWeightKg: parseFloat(e.target.value) || 0 })}
                    className="w-full px-2 py-1.5 text-xs font-bold text-[#132a13] border border-[#d8e3d3] rounded-lg outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                    Obiettivo
                  </label>
                  <select
                    value={profile.fitnessGoal}
                    onChange={(e) => setProfile({ ...profile, fitnessGoal: e.target.value as any })}
                    className="w-full px-2 py-1.5 text-xs text-[#132a13] border border-[#d8e3d3] rounded-lg outline-hidden bg-white"
                  >
                    <option value="hypertrophy">Ipertrofia (Massa)</option>
                    <option value="strength">Aumento Forza</option>
                    <option value="cut">Definizione (Cut)</option>
                    <option value="maintenance">Mantenimento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                    Livello
                  </label>
                  <select
                    value={profile.fitnessLevel}
                    onChange={(e) => setProfile({ ...profile, fitnessLevel: e.target.value as any })}
                    className="w-full px-2 py-1.5 text-xs text-[#132a13] border border-[#d8e3d3] rounded-lg outline-hidden bg-white"
                  >
                    <option value="beginner">Principiante</option>
                    <option value="intermediate">Intermedio</option>
                    <option value="advanced">Avanzato</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                  Bio / Note Personali
                </label>
                <textarea
                  rows={2}
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs text-[#132a13] border border-[#d8e3d3] rounded-lg outline-hidden resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditingInfo(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  Annulla
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSaveProfile(profile);
                    setIsEditingInfo(false);
                  }}
                  className="px-4 py-1.5 text-xs font-bold bg-[#31572c] text-white hover:bg-[#132a13] rounded-lg shadow-xs"
                >
                  Salva Modifiche
                </button>
              </div>
            </div>
          ) : (
            /* Metrics preview */
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-2.5 rounded-xl border border-[#e8efe5] text-center">
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Altezza</span>
                <span className="text-sm font-extrabold text-[#132a13] mt-0.5 block">{profile.heightCm} cm</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#e8efe5] text-center">
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Peso Attuale</span>
                <span className="text-sm font-extrabold text-[#31572c] mt-0.5 block">{profile.currentWeightKg} kg</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#e8efe5] text-center">
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">Indice BMI</span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <span className="text-sm font-extrabold text-[#132a13]">{bmi}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${bmiCategory.color}`}>
                    {bmiCategory.label}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Workout Lifetime Stats */}
        <div className="bg-white rounded-3xl border border-[#e2ece0] p-4 shadow-xs">
          <h3 className="text-xs font-bold text-[#132a13] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#31572c]" />
            <span>Statistiche Storiche Globali</span>
          </h3>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#fafcf9] p-3 rounded-2xl border border-[#eaf0e7]">
              <span className="text-[10px] text-neutral-500 font-bold uppercase block">Sessioni</span>
              <span className="text-base font-extrabold text-[#132a13] mt-0.5 block">
                {totalStats.workouts}
              </span>
            </div>

            <div className="bg-[#fafcf9] p-3 rounded-2xl border border-[#eaf0e7]">
              <span className="text-[10px] text-neutral-500 font-bold uppercase block">Serie Chiuse</span>
              <span className="text-base font-extrabold text-[#132a13] mt-0.5 block">
                {totalStats.totalSets}
              </span>
            </div>

            <div className="bg-[#fafcf9] p-3 rounded-2xl border border-[#eaf0e7]">
              <span className="text-[10px] text-neutral-500 font-bold uppercase block">Volume Totale</span>
              <span className="text-base font-extrabold text-[#31572c] mt-0.5 block">
                {totalStats.totalVolume > 1000
                  ? `${(totalStats.totalVolume / 1000).toFixed(1)}k kg`
                  : `${totalStats.totalVolume} kg`}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Records (PRs) */}
        <div className="bg-white rounded-3xl border border-[#e2ece0] p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#132a13] uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Massimali & Record Personali (PR)</span>
            </h3>

            <button
              type="button"
              onClick={() => setIsAddingPR(true)}
              className="text-xs font-bold text-[#31572c] hover:text-[#132a13] bg-[#f0f5ec] px-2.5 py-1 rounded-lg transition flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Nuovo PR
            </button>
          </div>

          {/* New PR form */}
          {isAddingPR && (
            <form onSubmit={handleAddPR} className="p-3 bg-[#f8faf6] rounded-2xl border border-[#dce8d8] space-y-2.5 animate-in fade-in">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                  Esercizio
                </label>
                <input
                  type="text"
                  required
                  placeholder="es. Panca Piana, Stacco, Trazioni..."
                  value={newPrExercise}
                  onChange={(e) => setNewPrExercise(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-bold text-[#132a13] bg-white border border-[#d8e3d3] rounded-lg outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                    Carico Sollevato (kg)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    value={newPrWeight}
                    onChange={(e) => setNewPrWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-[#132a13] bg-white border border-[#d8e3d3] rounded-lg outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                    Ripetizioni
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newPrReps}
                    onChange={(e) => setNewPrReps(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-[#132a13] bg-white border border-[#d8e3d3] rounded-lg outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingPR(false)}
                  className="px-3 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 text-xs font-bold bg-[#31572c] text-white hover:bg-[#132a13] rounded-lg shadow-xs"
                >
                  Aggiungi PR
                </button>
              </div>
            </form>
          )}

          {/* List of PRs */}
          <div className="divide-y divide-[#edf3eb]">
            {profile.personalRecords.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4 text-center">
                Nessun record personale inserito. Aggiungi il tuo primo massimale!
              </p>
            ) : (
              profile.personalRecords.map((pr, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#132a13]">
                      {pr.exerciseName}
                    </h4>
                    <span className="text-[10px] text-neutral-400">
                      Registrato il {pr.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-black text-[#31572c]">
                        {pr.weightKg} kg × {pr.reps}
                      </span>
                      <span className="text-[10px] text-neutral-500 block">
                        1RM stimato: ~{pr.estimatedOneRepMax} kg
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeletePR(idx)}
                      className="p-1 text-neutral-300 hover:text-red-600 rounded-md transition"
                      title="Rimuovi record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Weight History Tracker */}
        <div className="bg-white rounded-3xl border border-[#e2ece0] p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#132a13] uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#31572c]" />
              <span>Andamento Peso Corporeo</span>
            </h3>

            <button
              type="button"
              onClick={() => setIsAddingWeight(true)}
              className="text-xs font-bold text-[#31572c] hover:text-[#132a13] bg-[#f0f5ec] px-2.5 py-1 rounded-lg transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Registra Peso
            </button>
          </div>

          {isAddingWeight && (
            <form onSubmit={handleAddWeightEntry} className="p-3 bg-[#f8faf6] rounded-2xl border border-[#dce8d8] flex items-center gap-2 animate-in fade-in">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-0.5">
                  Peso di oggi (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeightVal}
                  onChange={(e) => setNewWeightVal(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1 text-xs font-bold text-[#132a13] bg-white border border-[#d8e3d3] rounded-lg outline-hidden"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsAddingWeight(false)}
                className="px-3 py-1.5 text-xs text-neutral-600 rounded-lg mt-3"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold bg-[#31572c] text-white rounded-lg shadow-xs mt-3"
              >
                Salva
              </button>
            </form>
          )}

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {profile.weightHistory.map((w) => (
              <div
                key={w.id}
                className="bg-[#fafcf9] border border-[#e2ece0] px-3 py-2 rounded-xl text-center shrink-0 min-w-[85px]"
              >
                <span className="text-[10px] text-neutral-500 font-medium block">
                  {w.date.slice(5)}
                </span>
                <span className="text-xs font-bold text-[#132a13] block mt-0.5">
                  {w.weightKg} kg
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Persistence, Backup & Restore */}
        <div className="bg-[#fafcf9] rounded-3xl border border-[#e2ece0] p-4 shadow-xs space-y-2.5">
          <h3 className="text-xs font-bold text-[#132a13] uppercase tracking-wider flex items-center gap-1.5">
            <Download className="w-4 h-4 text-[#31572c]" />
            <span>Storicizzazione & Backup Dati</span>
          </h3>
          <p className="text-xs text-neutral-500">
            Tutti i tuoi dati (schede, serie completate, storico calendario, peso e PR) sono salvati in memoria locale. Puoi scaricare un backup o ripristinarlo su un altro dispositivo.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleExportData}
              className="flex-1 py-2 px-3 rounded-xl bg-white border border-[#d8e3d3] hover:bg-[#f0f4ec] text-xs font-bold text-[#31572c] flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" /> Esporta Backup JSON
            </button>

            <label className="flex-1 py-2 px-3 rounded-xl bg-white border border-[#d8e3d3] hover:bg-[#f0f4ec] text-xs font-bold text-[#31572c] flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
              <Upload className="w-3.5 h-3.5" /> Importa Backup
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Reimposta Profilo Option */}
        <div className="pt-2 text-center pb-4">
          {!showResetConfirm ? (
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="text-xs text-neutral-400 hover:text-red-600 transition flex items-center gap-1.5 mx-auto font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Vuoi azzerare o cambiare profilo utente?</span>
            </button>
          ) : (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl max-w-sm mx-auto space-y-2 text-left animate-in fade-in">
              <p className="text-xs font-bold text-red-800">
                Sei sicuro di voler azzerare il profilo su questo dispositivo?
              </p>
              <p className="text-[11px] text-red-600">
                I dati del profilo verranno rimossi e potrai compilare nuovamente le informazioni.
              </p>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-200 rounded-lg"
                >
                  Annulla
                </button>
                <button
                  type="button"
                  onClick={handleResetProfile}
                  className="px-3 py-1 text-xs font-bold bg-red-600 text-white rounded-lg shadow-xs hover:bg-red-700"
                >
                  Sì, Azzera Profilo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
