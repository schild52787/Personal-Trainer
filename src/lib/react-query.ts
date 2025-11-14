import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/**
 * TanStack Query configuration for offline-first architecture
 * This handles caching, background updates, and offline mutation queuing
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data remains fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache for 30 minutes
      gcTime: 30 * 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      // Don't refetch on window focus in PWA (battery optimization)
      refetchOnWindowFocus: false,
      // Enable offline support
      networkMode: 'offlineFirst',
    },
    mutations: {
      // Retry mutations when back online
      retry: 3,
      networkMode: 'offlineFirst',
    },
  },
});

export { QueryClientProvider, ReactQueryDevtools };
