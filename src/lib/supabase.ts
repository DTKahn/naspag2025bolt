import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('Initializing Supabase client with URL:', supabaseUrl);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: {
      getItem: (key) => {
        console.log('Supabase storage getItem:', key);
        const value = localStorage.getItem(key);
        console.log('Supabase storage value:', value ? 'present' : 'missing');
        return value;
      },
      setItem: (key, value) => {
        console.log('Supabase storage setItem:', key);
        localStorage.setItem(key, value);
      },
      removeItem: (key) => {
        console.log('Supabase storage removeItem:', key);
        localStorage.removeItem(key);
      },
    },
  },
  global: {
    headers: {
      'x-application-name': 'conference-web-app',
    },
  },
});

// Test the connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth state change:', event, session?.user?.email);
});

// Add error handling for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.email);
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed');
  } else if (event === 'USER_UPDATED') {
    console.log('User updated:', session?.user?.email);
  }
});

// Add real-time subscription helper
export async function subscribeToNotifications(
  userId: string,
  callback: (notification: any) => void
) {
  return supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
}