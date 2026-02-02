import "./ChatWindow.css";
import "../../animations.css";
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
      <div className="chat-messages slide-in-left">
        {messages.length === 0 ? (
          <div className="chat-empty slide-in-bottom">
            <h3>Be the first one</h3>
            <p>Start the conversation by sending a message.</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isLast = index === messages.length - 1;

            return (
              <div
                className={`chat-message ${isLast ? "message-new" : ""}`}
                key={msg.id}
              >
                <img
                  className="avatar"
                  src={`https://api.dicebear.com/7.x/identicon/svg?seed=${msg.userId}`}
                  alt="avatar"
                />

                <div className="message-content">
                  <div className="message-header">
                    <span className="author">{msg.username}</span>
                    <span className="time">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="text">{msg.message}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <form className="chat-input" onSubmit={sendMessage}>
        <div className="input-wrapper slide-in-top">
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
