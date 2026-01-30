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
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");

  const {
    users,
    channels,
    activeChannel,
    messages,
    join,
    sendMessage,
    selectChannel,
  } = useChat();

  function handleJoin() {
    join(username);
    setIsJoined(true);
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  }

  return (
    <>
      {!isJoined && (
        <LoginPage
          username={username}
          logIn={(e) => setUsername(e.target.value)}
          join={handleJoin}
        />
      )}

      {isJoined && (
        <>
          <div className="app">
            <Header activeChannel={activeChannel} />

            <div className="layout">
              <aside className="sidebar-left">
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

              <aside className="sidebar-right">
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
