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
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No user found in getCurrentUser');
      return null;
    }

    // Get roles with a direct join query
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select(`
        roles!inner (
          name
        )
      `)
      .eq('user_id', user.id);

    if (roleError) {
      console.error('Error fetching roles:', roleError);
      return {
        ...user,
        roles: [],
      };
    }

    // Map the roles directly
    const roles = roleData?.map(entry => entry.roles.name as UserRole) || [];

    return {
      ...user,
      roles,
    };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
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