import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionService } from '../services/sessionService';
import { CreateSessionInput, UpdateSessionInput } from '../types/session';

export function useSessions() {
  const queryClient = useQueryClient();

  const sessionsQuery = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      console.log('Fetching sessions...');
      const sessions = await sessionService.getSessions();
      console.log('Fetched sessions:', sessions);
      return sessions;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createSessionMutation = useMutation({
    mutationFn: sessionService.createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  const updateSessionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSessionInput }) =>
      sessionService.updateSession(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  const deleteSessionMutation = useMutation({
    mutationFn: sessionService.deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  return {
    sessions: sessionsQuery.data ?? [],
    isLoading: sessionsQuery.isLoading,
    error: sessionsQuery.error,
    createSession: createSessionMutation.mutate,
    updateSession: updateSessionMutation.mutate,
    deleteSession: deleteSessionMutation.mutate,
  };
} 