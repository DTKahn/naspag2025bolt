import { Session, CreateSessionInput, UpdateSessionInput } from '../types/session';
import { mockSessions } from '../mocks/sessions';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sessionService = {
  async getSessions(): Promise<Session[]> {
    console.log('sessionService.getSessions called');
    await delay(500); // Simulate network delay
    console.log('Returning mock sessions:', mockSessions);
    return [...mockSessions]; // Return a copy to prevent mutation
  },

  async getSession(id: string): Promise<Session> {
    await delay(500);
    const session = mockSessions.find(s => s.id === id);
    if (!session) throw new Error('Session not found');
    return { ...session }; // Return a copy to prevent mutation
  },

  async createSession(session: CreateSessionInput): Promise<Session> {
    await delay(500);
    const newSession: Session = {
      ...session,
      id: String(mockSessions.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockSessions.push(newSession);
    return { ...newSession }; // Return a copy to prevent mutation
  },

  async updateSession(id: string, session: UpdateSessionInput): Promise<Session> {
    await delay(500);
    const index = mockSessions.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Session not found');
    
    const updatedSession: Session = {
      ...mockSessions[index],
      ...session,
      updatedAt: new Date().toISOString(),
    };
    mockSessions[index] = updatedSession;
    return { ...updatedSession }; // Return a copy to prevent mutation
  },

  async deleteSession(id: string): Promise<void> {
    await delay(500);
    const index = mockSessions.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Session not found');
    mockSessions.splice(index, 1);
  },
}; 