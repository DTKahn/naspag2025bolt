import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../lib/auth';

interface AuthGuardProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
}

export function AuthGuard({ children, requiredRoles }: AuthGuardProps) {
  const { user, isLoading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthGuard: Auth state changed', { user, isLoading, error });
    if (!isLoading) {
      if (error) {
        console.log('AuthGuard: Error loading user, redirecting to auth');
        navigate('/auth');
      } else if (!user) {
        console.log('AuthGuard: No user found, redirecting to auth');
        navigate('/auth');
      } else if (requiredRoles && !requiredRoles.some(role => user.roles.includes(role))) {
        console.log('AuthGuard: User lacks required roles, redirecting to home');
        navigate('/');
      }
    }
  }, [user, isLoading, error, navigate, requiredRoles]);

  if (isLoading) {
    console.log('AuthGuard: Loading state');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !user) {
    console.log('AuthGuard: Error or no user, returning null');
    return null;
  }

  console.log('AuthGuard: Rendering children');
  return <>{children}</>;
}