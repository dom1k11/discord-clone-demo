import { ChatMessage } from "./messages";
export type Channel = {
  name: string;
  messages: ChatMessage[];
};

export function initializeChannel(name: string): Channel {
  return {
    name,
    messages: [],
  };
}
