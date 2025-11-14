/**
 * Sample exercise data for development and testing
 * This will be replaced with Firestore data in production
 */

import type { Exercise } from '@/types/models';

export const SAMPLE_EXERCISES: Exercise[] = [
  // PRESSING MOVEMENTS
  {
    id: 'landmine-press',
    name: 'Landmine Press',
    movementPattern: 'press',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    equipmentRequired: ['barbell', 'landmine'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['floor-press', 'incline-db-press'],
    isPTExercise: false,
  },
  {
    id: 'floor-press',
    name: 'Floor Press',
    movementPattern: 'press',
    muscleGroups: ['chest', 'triceps'],
    equipmentRequired: ['barbell', 'bench'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['landmine-press', 'pushup'],
    isPTExercise: false,
  },
  {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Press (30°)',
    movementPattern: 'press',
    muscleGroups: ['chest', 'shoulders'],
    equipmentRequired: ['dumbbells', 'bench'],
    injurySafety: {
      shoulder: 'moderate_risk',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['landmine-press', 'floor-press'],
    isPTExercise: false,
  },

  // PULLING MOVEMENTS
  {
    id: 'face-pulls',
    name: 'Face Pulls',
    movementPattern: 'pull',
    muscleGroups: ['rear-delts', 'upper-back'],
    equipmentRequired: ['cables'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['band-pull-aparts', 'db-rear-delt-fly'],
    isPTExercise: true,
  },
  {
    id: 'cable-row',
    name: 'Seated Cable Row (Wide Grip)',
    movementPattern: 'pull',
    muscleGroups: ['lats', 'rhomboids', 'traps'],
    equipmentRequired: ['cables'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['db-row', 'chest-supported-row'],
    isPTExercise: false,
  },
  {
    id: 'chest-supported-row',
    name: 'Chest-Supported Row',
    movementPattern: 'pull',
    muscleGroups: ['lats', 'rhomboids'],
    equipmentRequired: ['dumbbells', 'bench'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['cable-row', 'db-row'],
    isPTExercise: false,
  },

  // LOWER BODY
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    movementPattern: 'squat',
    muscleGroups: ['quads', 'glutes'],
    equipmentRequired: ['dumbbells', 'bench'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'moderate_risk',
      ankle: 'moderate_risk',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['goblet-squat', 'step-ups'],
    isPTExercise: false,
  },
  {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    movementPattern: 'squat',
    muscleGroups: ['quads', 'glutes'],
    equipmentRequired: ['dumbbells'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['bulgarian-split-squat', 'step-ups'],
    isPTExercise: false,
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    movementPattern: 'hinge',
    muscleGroups: ['hamstrings', 'glutes', 'lower-back'],
    equipmentRequired: ['barbell'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'moderate_risk',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['db-rdl', 'hip-thrust'],
    isPTExercise: false,
  },
  {
    id: 'hip-thrust',
    name: 'Hip Thrust',
    movementPattern: 'hinge',
    muscleGroups: ['glutes', 'hamstrings'],
    equipmentRequired: ['barbell', 'bench'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['romanian-deadlift', 'glute-bridge'],
    isPTExercise: false,
  },

  // PT EXERCISES
  {
    id: 'band-pull-aparts',
    name: 'Band Pull-Aparts',
    movementPattern: 'pull',
    muscleGroups: ['rear-delts', 'rotator-cuff'],
    equipmentRequired: ['resistance-band'],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['face-pulls'],
    isPTExercise: true,
  },
  {
    id: 'wall-slides',
    name: 'Wall Slides',
    movementPattern: 'core',
    muscleGroups: ['shoulders', 'scapular-stabilizers'],
    equipmentRequired: [],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: [],
    isPTExercise: true,
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    movementPattern: 'core',
    muscleGroups: ['core', 'abs'],
    equipmentRequired: [],
    injurySafety: {
      shoulder: 'safe',
      cervical: 'safe',
      knee: 'safe',
      ankle: 'safe',
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    alternateIds: ['bird-dog', 'plank'],
    isPTExercise: true,
  },
];

// Helper to get exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
  return SAMPLE_EXERCISES.find((ex) => ex.id === id);
}

// Helper to get exercises by movement pattern
export function getExercisesByPattern(
  pattern: Exercise['movementPattern']
): Exercise[] {
  return SAMPLE_EXERCISES.filter((ex) => ex.movementPattern === pattern);
}
