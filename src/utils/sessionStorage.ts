import { StudentSession } from '../types';

const SESSIONS_KEY = 'kiss_presentations_student_sessions_v1';
const ACTIVE_SESSION_ID_KEY = 'kiss_presentations_active_session_id';

export function getAllSessions(): StudentSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading sessions', e);
    return [];
  }
}

export function getActiveSessionId(): string | null {
  return localStorage.getItem(ACTIVE_SESSION_ID_KEY);
}

export function setActiveSessionId(id: string) {
  localStorage.setItem(ACTIVE_SESSION_ID_KEY, id);
}

export function getActiveSession(): StudentSession | null {
  const activeId = getActiveSessionId();
  const sessions = getAllSessions();
  if (activeId) {
    const found = sessions.find((s) => s.id === activeId);
    if (found) return found;
  }
  return sessions[0] || null;
}

export function saveSession(session: StudentSession) {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  session.lastActive = new Date().toISOString();
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  setActiveSessionId(session.id);
}

export function createNewSession(studentName?: string, studentClass?: string): StudentSession {
  const sessions = getAllSessions();
  const sessionNumber = sessions.length + 1;
  const defaultName = `Sessie #${sessionNumber}`;
  
  const newSession: StudentSession = {
    id: 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    studentName: studentName?.trim() || defaultName,
    studentClass: studentClass?.trim() || '1ste Graad',
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    completedModules: ['intro'],
    quizAnswers: {},
    quizScore: 0,
    quizCompleted: false,
    spotErrorsFound: {},
    makeoverProject: {
      theme: 'space',
      title: 'Pluto: De Dwergplaneet',
      bulletPoints: [
        'Ontdekt in 1930 door Clyde Tombaugh',
        'Sinds 2006 dwergplaneet (geen zuivere baan)',
        'IJskoud: gemiddeld -230 °C',
        '5 manen (grootste is Charon)'
      ],
      bgColor: 'bg-slate-900',
      textColor: 'text-white',
      fontFamily: 'font-sans',
      imageScale: 'contain',
      selectedImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
      hasAttribution: true,
      attributionText: 'Bron: NASA / Unsplash (Rechtenvrij)',
      submitted: false,
      score: 0
    },
    diplomaIssued: false
  };

  saveSession(newSession);
  return newSession;
}

export function getOrCreateDefaultSession(): StudentSession {
  const existing = getActiveSession();
  if (existing) return existing;
  return createNewSession();
}

export function deleteSession(sessionId: string) {
  const sessions = getAllSessions().filter((s) => s.id !== sessionId);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  if (getActiveSessionId() === sessionId) {
    if (sessions.length > 0) {
      setActiveSessionId(sessions[0].id);
    } else {
      localStorage.removeItem(ACTIVE_SESSION_ID_KEY);
    }
  }
}
