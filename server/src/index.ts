import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

import { initializeChannel, Channel } from "./services/chat/channels";
import { buildMessage, ChatMessage } from "./services/chat/messages";
import { generateRandomId } from "./utils/generateRandomNumber";
import { initializeStore } from "./services/chat/sessions";
import { CORS_ORIGIN, CORS_HEADERS, CORS_METHODS } from "./cors_config";

const app = express();
const server = http.createServer(app);

const port = Number(process.env.PORT) || 8181;

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: CORS_METHODS,
    allowedHeaders: CORS_HEADERS,
  },
});

const CHANNEL_NAMES = [
  "welcome",
  "general",
  "react",
  "learners",
  "casual",
  "trololo",
];
const WELCOME_CHANNEL = "welcome";

const sessions = initializeStore();
const channels: Channel[] = CHANNEL_NAMES.map(initializeChannel);

type SocketWithSession = Socket & {
  sessionId: string;
  userId: string;
  username: string;
};

io.use((socket, next) => {
  const s = socket as SocketWithSession;

  const { sessionId, username } = socket.handshake.auth as {
    sessionId?: string;
    username?: string;
  };

  if (sessionId) {
    const session = sessions.getSessionById(sessionId);
    if (session) {
      s.sessionId = sessionId;
      s.userId = session.userId;
      s.username = session.username;
      return next();
    }
  }

  s.sessionId = generateRandomId();
  s.userId = generateRandomId();
  s.username = username ?? `anonymous_${generateRandomId(2)}`;

  next();
});
io.on("connection", (socket) => {
  const s = socket as SocketWithSession;

  const existingSession = sessions.getSessionByUserId(s.userId);

  const storedSession = {
    userId: s.userId,
    username: s.username,
    connected: true,
  };

  sessions.setSession(s.sessionId, storedSession);
  socket.emit("users", sessions.getAllUsers());

  socket.emit("session", {
    sessionId: s.sessionId,
    userId: s.userId,
    username: s.username,
  });

  channels.forEach((channel) => socket.join(channel.name));
  socket.join(s.userId);

  if (!existingSession) {
    socket.in(WELCOME_CHANNEL).emit("user:join", {
      userId: s.userId,
      username: s.username,
      connected: true,
    });
    console.log(existingSession);
  }

  socket.emit("channels", channels);
  socket.on("user:leave", () => {
    socket.in(WELCOME_CHANNEL).emit("user:leave", {
      userId: s.userId,
      username: s.username,
      connected: false,
    });

    sessions.deleteSession(s.sessionId);
    socket.disconnect();
  });

  socket.on("message:channel:send", (channelName: string, message: string) => {
    const channel = channels.find((c) => c.name === channelName);
    if (!channel) return;
    const chatMessage = buildMessage(
      {
        userId: s.userId,
        username: s.username,
      },
      message,
    );
    channel.messages.push(chatMessage);
    io.to(channelName).emit("message:channel", channelName, chatMessage);
  });

  socket.on("disconnect", () => {
    const session = sessions.getSessionById(s.sessionId);
    if (!session) return;

    sessions.setSession(s.sessionId, {
      ...session,
      connected: false,
    });

    socket.broadcast.emit("user:disconnect", {
      userId: session.userId,
      username: session.username,
      connected: false,
    });
  });
});

server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
