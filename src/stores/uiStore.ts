import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Example Zustand store for UI state
 * Use this pattern for client-side state management
 */

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  activeWorkoutId: string | null;

  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setActiveWorkout: (id: string | null) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      activeWorkoutId: null,

      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setActiveWorkout: (id) => set({ activeWorkoutId: id }),
    }),
    {
      name: 'ui-storage', // localStorage key
    }
  )
);
