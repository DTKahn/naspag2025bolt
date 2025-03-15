import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { getCurrentUser, UserWithRoles } from '../lib/auth';

export function useAuth() {
  const [user, setUser] = useState<UserWithRoles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadUser = async () => {
    try {
      console.log('Loading user...');
      const currentUser = await getCurrentUser();
      console.log('Loaded user:', currentUser);
      setUser(currentUser);
      setError(null);
    } catch (error) {
      console.error('Error loading user:', error);
      setError(error as Error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('useAuth effect running');
    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setError(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading, error };
}