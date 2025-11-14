/**
 * Sample 4-day Upper/Lower program template
 * This represents a basic injury-aware training program
 */

import type { ProgramTemplate, SessionTemplate } from '@/types/models';

const UPPER_A: SessionTemplate = {
  name: 'Upper A - Pressing Focus',
  exercises: [
    {
      exerciseId: 'landmine-press',
      targetSets: 4,
      targetReps: '8-10',
      restSeconds: 120,
    },
    {
      exerciseId: 'cable-row',
      targetSets: 4,
      targetReps: '10-12',
      restSeconds: 90,
    },
    {
      exerciseId: 'face-pulls',
      targetSets: 3,
      targetReps: '15-20',
      restSeconds: 60,
    },
    {
      exerciseId: 'band-pull-aparts',
      targetSets: 3,
      targetReps: '20',
      restSeconds: 45,
    },
  ],
};

const LOWER_A: SessionTemplate = {
  name: 'Lower A - Squat Focus',
  exercises: [
    {
      exerciseId: 'goblet-squat',
      targetSets: 4,
      targetReps: '8-12',
      restSeconds: 120,
    },
    {
      exerciseId: 'romanian-deadlift',
      targetSets: 3,
      targetReps: '10-12',
      restSeconds: 90,
    },
    {
      exerciseId: 'bulgarian-split-squat',
      targetSets: 3,
      targetReps: '10-12',
      restSeconds: 90,
    },
  ],
};

const UPPER_B: SessionTemplate = {
  name: 'Upper B - Pulling Focus',
  exercises: [
    {
      exerciseId: 'chest-supported-row',
      targetSets: 4,
      targetReps: '8-10',
      restSeconds: 90,
    },
    {
      exerciseId: 'floor-press',
      targetSets: 4,
      targetReps: '8-10',
      restSeconds: 120,
    },
    {
      exerciseId: 'face-pulls',
      targetSets: 3,
      targetReps: '15-20',
      restSeconds: 60,
    },
    {
      exerciseId: 'wall-slides',
      targetSets: 3,
      targetReps: '12',
      restSeconds: 45,
    },
  ],
};

const LOWER_B: SessionTemplate = {
  name: 'Lower B - Hinge Focus',
  exercises: [
    {
      exerciseId: 'romanian-deadlift',
      targetSets: 4,
      targetReps: '8-10',
      restSeconds: 120,
    },
    {
      exerciseId: 'hip-thrust',
      targetSets: 4,
      targetReps: '10-12',
      restSeconds: 90,
    },
    {
      exerciseId: 'goblet-squat',
      targetSets: 3,
      targetReps: '12-15',
      restSeconds: 90,
    },
  ],
};

export const SAMPLE_PROGRAM: ProgramTemplate = {
  id: 'upper-lower-4day',
  name: 'Upper/Lower 4-Day Split',
  description:
    'Shoulder-safe 4-day program with emphasis on scapular health and balanced development',
  sessions: [UPPER_A, LOWER_A, UPPER_B, LOWER_B],
  deloadFrequency: 4, // Every 4 weeks
};

// Helper to get next session based on pointer
export function getSessionByPointer(pointer: number): SessionTemplate {
  const index = pointer % SAMPLE_PROGRAM.sessions.length;
  return SAMPLE_PROGRAM.sessions[index];
}
