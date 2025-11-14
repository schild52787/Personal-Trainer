import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { firestoreUtils } from '@/lib/firebase/firestore';
import { Workout } from '@/types/workout';

/**
 * Example TanStack Query hooks for workout data
 * This demonstrates the pattern for server state management
 */

// Query keys
export const workoutKeys = {
  all: ['workouts'] as const,
  lists: () => [...workoutKeys.all, 'list'] as const,
  list: (userId: string) => [...workoutKeys.lists(), userId] as const,
  details: () => [...workoutKeys.all, 'detail'] as const,
  detail: (id: string) => [...workoutKeys.details(), id] as const,
};

// Get all workouts for a user
export const useWorkouts = (userId: string) => {
  return useQuery({
    queryKey: workoutKeys.list(userId),
    queryFn: () => firestoreUtils.getDocuments<Workout>('workouts'),
    enabled: !!userId,
  });
};

// Get a single workout
export const useWorkout = (id: string) => {
  return useQuery({
    queryKey: workoutKeys.detail(id),
    queryFn: () => firestoreUtils.getDocument<Workout>('workouts', id),
    enabled: !!id,
  });
};

// Create a workout
export const useCreateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workout: Partial<Workout>) =>
      firestoreUtils.setDocument('workouts', crypto.randomUUID(), workout),
    onSuccess: () => {
      // Invalidate and refetch workouts
      queryClient.invalidateQueries({ queryKey: workoutKeys.lists() });
    },
  });
};

// Update a workout
export const useUpdateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Workout> }) =>
      firestoreUtils.updateDocument('workouts', id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: workoutKeys.lists() });
    },
  });
};
