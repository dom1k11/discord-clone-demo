export type ChatMessage = {
  id: string;
  userId: string;
  username: string;
  message: string;
  createdAt: Date;
};

export type LoginPageProps = {
  username: string;
  logIn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  join: () => void;
};

export type LoginFormProps = {
  username: string;
  logIn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  join: () => void;
};

export type ChatWindowProps = {
  messages: ChatMessage[];
  message: string;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};
