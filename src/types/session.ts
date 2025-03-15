export type SessionType = 'plenary' | 'workshop' | 'luncheon' | 'mentorship';

export interface Speaker {
  id: string;
  name: string;
  bio?: string;
  organization?: string;
  photoUrl?: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  type: SessionType;
  startTime: string;
  endTime: string;
  room: string;
  capacity: number;
  speakers: Speaker[];
  materials?: {
    slides?: string;
    handouts?: string;
    resources?: string[];
  };
  isInteractive: boolean;
  hasQandA: boolean;
  hasPolls: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionInput extends Omit<Session, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateSessionInput extends Partial<CreateSessionInput> {} 