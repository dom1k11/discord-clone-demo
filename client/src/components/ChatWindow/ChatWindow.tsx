import "./ChatWindow.css";
import type { ChatMessage } from "../../App";
type ChatWindowProps = {
  messages: ChatMessage[];
  message: string;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ChatWindow = ({
  messages,
  sendMessage,
  message,
  setMessage,
}: ChatWindowProps) => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div className="chat-message" key={msg.id}>
            <img
              className="avatar"
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${msg.userId}`}
              alt="avatar"
            />

            <div className="message-content">
              <div className="message-header">
                <span className="author" title={msg.username}>
                  {msg.username}
                </span>

                <span className="time">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>

              <div className="text">{msg.message}</div>
            </div>
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={sendMessage}>
        <div className="input-wrapper">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
          />

          <button
            type="submit"
            className="send-button"
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
