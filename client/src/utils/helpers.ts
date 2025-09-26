import { differenceInMonths, differenceInDays, format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

// Calculate age in months and days
export const calculateAge = (birthDate: Date | string): { months: number; days: number; totalDays: number } => {
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  const today = new Date();
  
  const months = differenceInMonths(today, birth);
  const totalDays = differenceInDays(today, birth);
  
  // Calculate remaining days after full months
  const monthsInDays = Math.floor(totalDays / 30.44); // Average days per month
  const days = totalDays - (monthsInDays * 30.44);
  
  return {
    months,
    days: Math.floor(days),
    totalDays
  };
};

// Format age for display
export const formatAge = (birthDate: Date | string): string => {
  const age = calculateAge(birthDate);
  
  if (age.months < 1) {
    return `${age.totalDays} hari`;
  } else if (age.months < 12) {
    return `${age.months} bulan ${age.days} hari`;
  } else {
    const years = Math.floor(age.months / 12);
    const remainingMonths = age.months % 12;
    return `${years} tahun ${remainingMonths} bulan`;
  }
};

// Format date for display
export const formatDate = (date: Date | string, formatStr: string = 'dd MMMM yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: id });
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Calculate KPSP score and result
export const calculateKPSPResult = (answers: { [questionId: string]: boolean }, totalQuestions: number) => {
  const yesAnswers = Object.values(answers).filter(answer => answer).length;
  const score = yesAnswers;
  const percentage = (score / totalQuestions) * 100;
  
  let result: 'sesuai' | 'meragukan' | 'penyimpangan';
  let resultColor: string;
  let resultMessage: string;
  
  if (percentage >= 80) {
    result = 'sesuai';
    resultColor = 'text-green-600';
    resultMessage = 'Perkembangan anak sesuai dengan tahapan usianya. Teruskan stimulasi yang sudah dilakukan.';
  } else if (percentage >= 60) {
    result = 'meragukan';
    resultColor = 'text-yellow-600';
    resultMessage = 'Ada beberapa aspek perkembangan yang perlu mendapat perhatian lebih. Lakukan stimulasi lebih intensif.';
  } else {
    result = 'penyimpangan';
    resultColor = 'text-red-600';
    resultMessage = 'Beberapa aspek perkembangan memerlukan perhatian khusus. Disarankan konsultasi dengan tenaga kesehatan.';
  }
  
  return {
    score,
    maxScore: totalQuestions,
    percentage: Math.round(percentage),
    result,
    resultColor,
    resultMessage
  };
};

// Get recommendations based on failed aspects
export const getRecommendations = (answers: { [questionId: string]: boolean }, questions: any[]): string[] => {
  const recommendations: string[] = [];
  const failedAspects = new Set<string>();
  
  // Identify failed aspects
  questions.forEach(q => {
    if (!answers[q.id]) {
      failedAspects.add(q.aspect);
    }
  });
  
  // Generate recommendations based on failed aspects
  if (failedAspects.has('motorik_kasar')) {
    recommendations.push('Lakukan lebih banyak aktivitas fisik seperti tummy time, latihan duduk, atau bermain bola');
  }
  
  if (failedAspects.has('motorik_halus')) {
    recommendations.push('Berikan mainan yang merangsang kemampuan tangan seperti rattle, finger food, atau aktivitas menggambar');
  }
  
  if (failedAspects.has('bicara_bahasa')) {
    recommendations.push('Perbanyak interaksi verbal, bacakan buku, nyanyikan lagu, dan ajak anak berbicara');
  }
  
  if (failedAspects.has('sosialisasi_kemandirian')) {
    recommendations.push('Ajarkan kemandirian sederhana seperti makan sendiri, bermain dengan anak lain, dan rutinitas harian');
  }
  
  return recommendations;
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password minimal 6 karakter' };
  }
  
  if (password.length > 50) {
    return { isValid: false, message: 'Password maksimal 50 karakter' };
  }
  
  return { isValid: true, message: 'Password valid' };
};

// Storage helpers
export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage error:', error);
    }
  }
};

// Debounce function for search
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};