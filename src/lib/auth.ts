import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export type UserRole = 'admin' | 'attendee' | 'speaker' | 'staff';

export interface UserWithRoles extends User {
  roles: UserRole[];
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (authData.user) {
    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        full_name: fullName,
      });

    if (profileError) {
      throw new Error(profileError.message);
    }

    // Assign default attendee role
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'attendee')
      .single();

    if (roleError || !roleData) {
      throw new Error('Failed to fetch attendee role');
    }

    const { error: userRoleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role_id: roleData.id,
      });

    if (userRoleError) {
      throw new Error(userRoleError.message);
    }
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      throw error;
    }
    // Force clear any stored session data
    localStorage.removeItem('supabase.auth.token');
    return { error: null };
  } catch (error) {
    console.error('Error in signOut:', error);
    // Force clear any stored session data even if there was an error
    localStorage.removeItem('supabase.auth.token');
    return { error };
  }
}

export async function getCurrentUser(): Promise<UserWithRoles | null> {
  try {
    console.log('getCurrentUser: Starting...');
    
    // First, get the session to ensure we have a valid auth state
    console.log('getCurrentUser: Calling getSession()...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('getCurrentUser: Error getting session:', sessionError);
      throw sessionError;
    }

    if (!session) {
      console.log('getCurrentUser: No session found');
      return null;
    }

    console.log('getCurrentUser: Found session for user:', session.user.email);
    console.log('getCurrentUser: Session details:', {
      user_id: session.user.id,
      expires_at: session.expires_at,
      access_token: session.access_token ? 'present' : 'missing'
    });

    // Verify the session is still valid
    if (!session.access_token) {
      console.log('getCurrentUser: No access token found in session');
      return null;
    }

    // Get the user with roles
    console.log('getCurrentUser: Fetching roles for user:', session.user.id);
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select(`
        roles!inner (
          name
        )
      `)
      .eq('user_id', session.user.id);

    if (roleError) {
      console.error('getCurrentUser: Error fetching roles:', roleError);
      // If we can't get roles, return the user without roles
      return {
        ...session.user,
        roles: [],
      };
    }

    console.log('getCurrentUser: Found roles:', roleData);

    // Map the roles directly
    const roles = roleData?.map(entry => entry.roles.name as UserRole) || [];

    const userWithRoles = {
      ...session.user,
      roles,
    };

    console.log('getCurrentUser: Returning user with roles:', userWithRoles);
    return userWithRoles;
  } catch (error) {
    console.error('getCurrentUser: Caught error:', error);
    // Log the full error object for debugging
    if (error instanceof Error) {
      console.error('getCurrentUser: Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}

export async function getUserRoles(userId: string): Promise<UserRole[]> {
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      roles (
        name
      )
    `)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map(r => r.roles.name as UserRole);
}