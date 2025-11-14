/**
 * Core TypeScript types for the application
 */

export interface Workout {
  id: string;
  userId: string;
  name: string;
  exercises: Exercise[];
  completedAt?: Date;
  duration?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  muscleGroups: string[];
  equipment?: string;
  videoUrl?: string;
  notes?: string;
}

export interface Set {
  reps: number;
  weight?: number;
  duration?: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  completed: boolean;
}

export interface Injury {
  id: string;
  userId: string;
  bodyPart: string;
  severity: 'mild' | 'moderate' | 'severe';
  startDate: Date;
  endDate?: Date;
  restrictions: string[];
  ptProtocols?: PTProtocol[];
  notes?: string;
}

export interface PTProtocol {
  id: string;
  name: string;
  phase: 'acute' | 'recovery' | 'strengthening' | 'maintenance';
  exercises: Exercise[];
  frequency: string;
  duration: string;
  progressionCriteria: string[];
}

export interface ReadinessScore {
  date: Date;
  score: number; // 0-100
  factors: {
    sleep?: number;
    hrv?: number;
    soreness?: number;
    stress?: number;
  };
}
