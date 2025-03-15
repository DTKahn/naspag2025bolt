import { Session } from '../types/session';

export const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Opening Plenary: Future of Pediatric and Adolescent Gynecology',
    description: 'Join us for an inspiring opening session featuring keynote speakers discussing the latest developments and future directions in PAG.',
    type: 'plenary',
    startTime: '2025-03-15T09:00:00Z',
    endTime: '2025-03-15T10:30:00Z',
    room: 'Grand Ballroom A',
    capacity: 500,
    speakers: [
      {
        id: 's1',
        name: 'Dr. Sarah Johnson',
        bio: 'Leading expert in PAG with over 20 years of experience',
        organization: 'Children\'s Hospital',
      },
      {
        id: 's2',
        name: 'Dr. Michael Chen',
        bio: 'Pioneer in minimally invasive procedures',
        organization: 'University Medical Center',
      },
    ],
    materials: {
      slides: 'https://example.com/slides/opening-plenary.pdf',
      resources: ['https://example.com/resources/pag-guidelines.pdf'],
    },
    isInteractive: true,
    hasQandA: true,
    hasPolls: true,
    createdAt: '2024-03-14T00:00:00Z',
    updatedAt: '2024-03-14T00:00:00Z',
  },
  {
    id: '2',
    title: 'Hands-on Workshop: Advanced Laparoscopic Techniques',
    description: 'Practical workshop focusing on advanced laparoscopic procedures in PAG. Limited to 20 participants.',
    type: 'workshop',
    startTime: '2025-03-15T11:00:00Z',
    endTime: '2025-03-15T13:00:00Z',
    room: 'Workshop Room 1',
    capacity: 20,
    speakers: [
      {
        id: 's3',
        name: 'Dr. Emily Rodriguez',
        bio: 'Expert in minimally invasive surgery',
        organization: 'Advanced Surgical Center',
      },
    ],
    materials: {
      handouts: 'https://example.com/handouts/laparoscopic-techniques.pdf',
    },
    isInteractive: true,
    hasQandA: true,
    hasPolls: false,
    createdAt: '2024-03-14T00:00:00Z',
    updatedAt: '2024-03-14T00:00:00Z',
  },
  {
    id: '3',
    title: 'Luncheon Session: Building Your PAG Practice',
    description: 'Network with experienced practitioners while learning about establishing and growing a successful PAG practice.',
    type: 'luncheon',
    startTime: '2025-03-15T12:00:00Z',
    endTime: '2025-03-15T13:30:00Z',
    room: 'Dining Hall B',
    capacity: 100,
    speakers: [
      {
        id: 's4',
        name: 'Dr. Lisa Thompson',
        bio: 'Practice management consultant specializing in PAG',
        organization: 'Healthcare Consulting Group',
      },
    ],
    isInteractive: true,
    hasQandA: true,
    hasPolls: true,
    createdAt: '2024-03-14T00:00:00Z',
    updatedAt: '2024-03-14T00:00:00Z',
  },
  {
    id: '4',
    title: 'Mentorship Roundtable: Early Career Development',
    description: 'Interactive session for early-career professionals to discuss career development strategies with experienced mentors.',
    type: 'mentorship',
    startTime: '2025-03-15T14:00:00Z',
    endTime: '2025-03-15T15:30:00Z',
    room: 'Conference Room 3',
    capacity: 30,
    speakers: [
      {
        id: 's5',
        name: 'Dr. Robert Wilson',
        bio: '30-year veteran in PAG education and mentorship',
        organization: 'Academic Medical Center',
      },
    ],
    isInteractive: true,
    hasQandA: true,
    hasPolls: true,
    createdAt: '2024-03-14T00:00:00Z',
    updatedAt: '2024-03-14T00:00:00Z',
  },
]; 