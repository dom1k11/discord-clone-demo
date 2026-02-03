import { useState } from "react";
import { useChat } from "./hooks/useChat";
import "./App.css";
import ChannelList from "./components/ChannelList/ChannelList";
import UserList from "./components/UserList/UserList";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginPage from "./components/LoginPage/LoginPage";
import Header from "./components/Header/Header";

export type ChatMessage = {
  id: string;
  userId: string;
  username: string;
  message: string;
  createdAt: Date;
};

export type Channel = {
  name: string;
  messages: ChatMessage[];
};

export type User = {
  userId: string;
  username: string;
  connected: boolean;
};

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const {
    users,
    channels,
    activeChannel,
    messages,
    join,
    sendMessage,
    selectChannel,
    isConnected,
  } = useChat();

  function handleJoin() {
    join(username);
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  }

  return (
    <>
      {!isConnected && (
        <LoginPage
          username={username}
          logIn={(e) => setUsername(e.target.value)}
          join={handleJoin}
        />
      )}

      {isConnected && (
        <>
          <div className="app">
            <Header
              activeChannel={activeChannel}
              onToggleLeft={() => setLeftOpen((v) => !v)}
              onToggleRight={() => setRightOpen((v) => !v)}
            />

            <div className="layout">
              <aside className={`sidebar-left ${leftOpen ? "open" : ""}`}>
                <ChannelList
                  channels={channels}
                  activeChannel={activeChannel}
                  selectChannel={selectChannel}
                  username={username}
                />
              </aside>

              <main className="chat-main">
                <ChatWindow
                  messages={messages}
                  message={message}
                  setMessage={setMessage}
                  sendMessage={handleSend}
                />
              </main>
              <aside className={`sidebar-right ${rightOpen ? "open" : ""}`}>
                <UserList users={users} />
              </aside>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
