import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { firestore } from '@/lib/firestore';
import { WorkoutInstance } from '@/types/models';

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
    queryFn: () => firestore.workoutInstances.listByUser(userId),
    enabled: !!userId,
  });
};

// Get a single workout
export const useWorkout = (id: string) => {
  return useQuery({
    queryKey: workoutKeys.detail(id),
    queryFn: () => firestore.workoutInstances.get(id),
    enabled: !!id,
  });
};

// Get today's workout
export const useTodayWorkout = (userId: string) => {
  return useQuery({
    queryKey: ['workouts', 'today', userId],
    queryFn: () => firestore.workoutInstances.getToday(userId),
    enabled: !!userId,
  });
};

// Create a workout
export const useCreateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workout: Omit<WorkoutInstance, 'id'>) =>
      firestore.workoutInstances.create(crypto.randomUUID(), workout),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.lists() });
    },
  });
};

// Update a workout
export const useUpdateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkoutInstance> }) =>
      firestore.workoutInstances.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: workoutKeys.lists() });
    },
  });
};
