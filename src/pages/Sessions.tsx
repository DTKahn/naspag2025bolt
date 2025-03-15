import React, { useEffect } from 'react';
import { useSessions } from '../hooks/useSessions';
import { SessionType } from '../types/session';

const sessionTypeColors: Record<SessionType, string> = {
  plenary: 'bg-blue-100 text-blue-800',
  workshop: 'bg-green-100 text-green-800',
  luncheon: 'bg-yellow-100 text-yellow-800',
  mentorship: 'bg-purple-100 text-purple-800',
};

export default function Sessions() {
  console.log('Sessions component rendering');
  const { sessions, isLoading, error } = useSessions();

  useEffect(() => {
    console.log('Sessions component mounted');
    return () => {
      console.log('Sessions component unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('Sessions state changed:', { sessions, isLoading, error });
  }, [sessions, isLoading, error]);

  if (isLoading) {
    console.log('Sessions component: Loading state');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    console.log('Sessions component: Error state', error);
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-md">
        <p>Error loading sessions. Please try again later.</p>
      </div>
    );
  }

  console.log('Sessions component: Rendering sessions list', sessions);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Conference Sessions</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
          Create Session
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    sessionTypeColors[session.type]
                  }`}
                >
                  {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(session.startTime).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{session.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{session.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{session.room}</span>
                <span>{session.speakers.length} Speaker(s)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 