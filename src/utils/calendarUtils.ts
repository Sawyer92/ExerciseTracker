import { CompletedWorkoutLog } from '../types';

export const ITALIAN_DAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
export const ITALIAN_DAYS_FULL = [
  'Domenica',
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
];

export const ITALIAN_MONTHS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

export interface CalendarDayCell {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  logs: CompletedWorkoutLog[];
}

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatItalianDateString(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayName = ITALIAN_DAYS_FULL[date.getDay()];
  const monthName = ITALIAN_MONTHS[month - 1];
  return `${dayName} ${day} ${monthName} ${year}`;
}

export function getMonthMatrix(year: number, month: number, logs: CompletedWorkoutLog[]): CalendarDayCell[][] {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // JavaScript getDay(): 0 = Sun, 1 = Mon ... 6 = Sat
  // We want Monday as index 0, Sunday as index 6
  let startDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startDayOfWeek === -1) startDayOfWeek = 6;

  const todayStr = formatDateToYYYYMMDD(new Date());
  const matrix: CalendarDayCell[][] = [];
  let currentWeek: CalendarDayCell[] = [];

  // Days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    const prevMonthDate = new Date(year, month - 1, d);
    const dateStr = formatDateToYYYYMMDD(prevMonthDate);
    const dayLogs = logs.filter((log) => log.date === dateStr);

    currentWeek.push({
      date: dateStr,
      dayNumber: d,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      logs: dayLogs,
    });
  }

  // Days of current month
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = formatDateToYYYYMMDD(dateObj);
    const dayLogs = logs.filter((log) => log.date === dateStr);

    currentWeek.push({
      date: dateStr,
      dayNumber: d,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      logs: dayLogs,
    });

    if (currentWeek.length === 7) {
      matrix.push(currentWeek);
      currentWeek = [];
    }
  }

  // Days for next month to complete last week row
  if (currentWeek.length > 0) {
    let nextDay = 1;
    while (currentWeek.length < 7) {
      const nextMonthDate = new Date(year, month + 1, nextDay);
      const dateStr = formatDateToYYYYMMDD(nextMonthDate);
      const dayLogs = logs.filter((log) => log.date === dateStr);

      currentWeek.push({
        date: dateStr,
        dayNumber: nextDay,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        logs: dayLogs,
      });
      nextDay++;
    }
    matrix.push(currentWeek);
  }

  return matrix;
}

export function calculateWorkoutStreak(logs: CompletedWorkoutLog[]): { currentStreak: number; bestStreak: number } {
  if (!logs || logs.length === 0) return { currentStreak: 0, bestStreak: 0 };

  // Unique sorted dates
  const uniqueDates = Array.from(new Set(logs.map((l) => l.date))).sort().reverse();
  const today = formatDateToYYYYMMDD(new Date());
  const yesterday = formatDateToYYYYMMDD(new Date(Date.now() - 86400000));

  let currentStreak = 0;
  let checkDate = new Date();

  // If trained today or yesterday, streak is active
  if (uniqueDates.includes(today)) {
    checkDate = new Date();
  } else if (uniqueDates.includes(yesterday)) {
    checkDate = new Date(Date.now() - 86400000);
  } else {
    return { currentStreak: 0, bestStreak: calculateBestStreak(uniqueDates) };
  }

  while (true) {
    const formatted = formatDateToYYYYMMDD(checkDate);
    if (uniqueDates.includes(formatted)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    currentStreak,
    bestStreak: Math.max(currentStreak, calculateBestStreak(uniqueDates)),
  };
}

function calculateBestStreak(sortedDescendingDates: string[]): number {
  if (sortedDescendingDates.length === 0) return 0;
  let best = 1;
  let temp = 1;

  for (let i = 0; i < sortedDescendingDates.length - 1; i++) {
    const d1 = new Date(sortedDescendingDates[i]);
    const d2 = new Date(sortedDescendingDates[i + 1]);
    const diffTime = Math.abs(d1.getTime() - d2.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      temp++;
      if (temp > best) best = temp;
    } else if (diffDays > 1) {
      temp = 1;
    }
  }

  return best;
}
