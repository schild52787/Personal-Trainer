/**
 * Core domain models for Personal Trainer app
 * Simplified for MVP - can extend later
 */

export type InjuryRegion = 'shoulder' | 'cervical' | 'knee' | 'ankle';
export type InjurySafety = 'safe' | 'moderate_risk' | 'high_risk';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

// ==================== USER ====================

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;

  // Injury profile: severity 0 (none) to 10 (severe)
  injuryProfile: Partial<Record<InjuryRegion, {
    severity: number;
    inPT: boolean;
  }>>;

  experienceLevel: ExperienceLevel;
  activeEquipmentProfileId?: string;
  onboardingCompleted: boolean;
}

// ==================== EQUIPMENT ====================

export interface EquipmentProfile {
  id: string;
  userId: string;
  name: string;
  equipmentAvailable: string[]; // e.g., ['dumbbells', 'barbell', 'bench']
  presetType?: 'home' | 'gym' | 'hotel';
}

// ==================== EXERCISE ====================

export interface Exercise {
  id: string;
  name: string;
  movementPattern: 'press' | 'pull' | 'squat' | 'hinge' | 'carry' | 'core';
  muscleGroups: string[];
  equipmentRequired: string[];

  // Injury safety map for each region
  injurySafety: Partial<Record<InjuryRegion, InjurySafety>>;

  youtubeUrl?: string;
  alternateIds: string[]; // IDs of substitute exercises
  isPTExercise: boolean;
}

// ==================== PROGRAM ====================

export interface SessionTemplate {
  name: string; // e.g., "Upper A"
  exercises: Array<{
    exerciseId: string;
    targetSets: number;
    targetReps: string; // e.g., "8-10"
    restSeconds: number;
  }>;
}

export interface ProgramTemplate {
  id: string;
  name: string;
  description: string;
  sessions: SessionTemplate[];
  deloadFrequency: number; // weeks between deloads
}

export interface ProgramInstance {
  id: string;
  userId: string;
  templateId: string;
  currentWeek: number;
  sessionPointer: number; // 0-3 for 4-session split
  startedAt: Date;
  status: 'active' | 'completed' | 'paused';
}

// ==================== WORKOUT ====================

export interface WorkoutInstance {
  id: string;
  userId: string;
  programInstanceId: string;
  sessionName: string;
  date: Date;
  status: 'planned' | 'in_progress' | 'completed';

  sessionRPE?: number; // 1-10
  readyMood?: 'great' | 'okay' | 'rough';

  // Map of original exercise ID to substitute ID
  substitutions: Record<string, string>;
}

export interface SetLog {
  id: string;
  workoutInstanceId: string;
  exerciseId: string;
  setNumber: number;

  prescribedWeight?: number;
  actualWeight: number;
  prescribedReps?: number;
  actualReps: number;

  painFlag: boolean;
  painSeverity?: number; // 0-10
  painRegion?: InjuryRegion;
  notes?: string;

  createdAt: Date;
}

// ==================== READINESS ====================

export interface ReadinessEntry {
  id: string;
  userId: string;
  date: Date;

  hrv?: number;
  soreness: Partial<Record<string, number>>; // body part -> 0-10
  mood: 'great' | 'okay' | 'rough';
  readinessScore?: number; // 0-100 (computed)
}
