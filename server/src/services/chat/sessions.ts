export type Session = {
  userId: string;
  username: string;
  connected: boolean;
};

type SessionId = string;

export function initializeStore() {
  const sessionStorage = new Map<SessionId, Session>();

  function getSessionById(sessionId: SessionId): Session | undefined {
    return sessionStorage.get(sessionId);
  }

  function getSessionByUserId(userId: string): Session | null {
    for (const session of sessionStorage.values()) {
      if (session.userId === userId) {
        console.log(session);
        return session;
      }
    }
    return null;
  }

  function getAllSessions(): Session[] {
    return Array.from(sessionStorage.values());
  }

  function getAllUsers() {
    return getAllSessions().map((session) => ({
      userId: session.userId,
      username: session.username,
      connected: session.connected,
    }));
  }

  function setSession(sessionId: SessionId, session: Session): void {
    sessionStorage.set(sessionId, session);
  }

  function deleteSession(sessionId: SessionId): void {
    sessionStorage.delete(sessionId);
  }
  console.log(sessionStorage);

  return {
    getSessionById,
    getSessionByUserId,
    getAllSessions,
    getAllUsers,
    setSession,
    deleteSession,
  };
}
