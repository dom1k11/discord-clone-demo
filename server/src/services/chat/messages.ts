import { generateRandomId } from "../../utils/generateRandomNumber";
export type Session = {
  userId: string;
  username: string;
};

export type ChatMessage = {
  id: string;
  userId: string;
  username: string;
  message: string;
  createdAt: Date;
};

export function buildMessage(session: Session, message: string): ChatMessage {
  return {
    id: generateRandomId(),
    userId: session.userId,
    username: session.username,
    message,
    createdAt: new Date(),
  };
}
