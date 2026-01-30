import { useEffect, useState } from "react";
import { socket } from "../libs/socket";
import type { Channel, ChatMessage, User } from "../App";

export function useChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messagesByChannel, setMessagesByChannel] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [activeChannel, setActiveChannel] = useState("");

  const messages = messagesByChannel[activeChannel] ?? [];

  /* ---------------- connection ---------------- */

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  /* ---------------- users ---------------- */

  useEffect(() => {
    socket.on("users", setUsers);
    return () => {
      socket.off("users");
    };
  }, []);

  useEffect(() => {
    socket.on("user:join", (user: User) => {
      setUsers((prev) =>
        prev.some((u) => u.userId === user.userId) ? prev : [...prev, user],
      );
    });

    return () => {
      socket.off("user:join");
    };
  }, []);

  useEffect(() => {
    socket.on("user:disconnect", (user: User) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.userId === user.userId ? { ...u, connected: false } : u,
        ),
      );
    });

    return () => {
      socket.off("user:disconnect");
    };
  }, []);

  /* ---------------- channels ---------------- */

  useEffect(() => {
    socket.on("channels", (channels: Channel[]) => {
      setChannels(channels);

      const map: Record<string, ChatMessage[]> = {};
      for (const ch of channels) {
        map[ch.name] = ch.messages;
      }

      setMessagesByChannel(map);
      setActiveChannel(channels[0]?.name ?? "");
    });

    return () => {
      socket.off("channels");
    };
  }, []);

  /* ---------------- messages ---------------- */

  useEffect(() => {
    socket.on(
      "message:channel",
      (channelName: string, message: ChatMessage) => {
        setMessagesByChannel((prev) => ({
          ...prev,
          [channelName]: [...(prev[channelName] ?? []), message],
        }));
      },
    );

    return () => {
      socket.off("message:channel");
    };
  }, []);

  /* ---------------- actions ---------------- */

  function join(username: string) {
    if (!username.trim()) return;
    socket.auth = { username };
    socket.connect();
  }

  function sendMessage(text: string) {
    if (!text.trim() || !activeChannel) return;
    socket.emit("message:channel:send", activeChannel, text);
  }

  function selectChannel(channel: Channel) {
    setActiveChannel(channel.name);
  }

  return {
    isConnected,
    users,
    channels,
    activeChannel,
    messages,
    join,
    sendMessage,
    selectChannel,
  };
}
