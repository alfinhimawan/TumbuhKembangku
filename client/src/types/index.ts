export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: Date;
}

export interface Child {
  id: string;
  parentId: string;
  name: string;
  birthDate: Date;
  gender: 'male' | 'female';
  photo?: string;
  createdAt: Date;
}

export interface KPSPQuestion {
  id: string;
  ageRangeMonths: [number, number]; // [min, max] in months
  aspect: 'motorik_kasar' | 'motorik_halus' | 'bicara_bahasa' | 'sosialisasi_kemandirian';
  question: string;
  description?: string;
  illustration?: string;
}

export interface ScreeningResult {
  id: string;
  childId: string;
  ageAtScreeningMonths: number;
  questions: KPSPQuestion[];
  answers: { [questionId: string]: boolean };
  result: 'sesuai' | 'meragukan' | 'penyimpangan';
  score: number;
  maxScore: number;
  recommendations?: string[];
  createdAt: Date;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  ageRangeMonths: [number, number];
  aspect: 'motorik_kasar' | 'motorik_halus' | 'bicara_bahasa' | 'sosialisasi_kemandirian';
  materials: string[];
  instructions: string[];
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Milestone {
  id: string;
  childId: string;
  title: string;
  description?: string;
  date: Date;
  photo?: string;
  category: 'first_smile' | 'first_word' | 'first_step' | 'other';
}

export interface GrowthData {
  id: string;
  childId: string;
  date: Date;
  weight: number; // kg
  height: number; // cm
  headCircumference: number; // cm
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'screening_reminder' | 'vaccination_reminder' | 'vitamin_reminder' | 'milestone';
  title: string;
  message: string;
  isRead: boolean;
  scheduledDate: Date;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface ChildContextType {
  children: Child[];
  selectedChild: Child | null;
  addChild: (child: Omit<Child, 'id' | 'parentId' | 'createdAt'>) => void;
  updateChild: (id: string, updates: Partial<Child>) => void;
  selectChild: (child: Child) => void;
  deleteChild: (id: string) => void;
}