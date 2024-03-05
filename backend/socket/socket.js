import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://simple-chat-mern.netlify.app/", "http://localhost:5173"],
    methods: ["GET", "POST"],
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: true,
    transports: [
      "websocket",
      "polling",
      "flashsocket",
      "xhr-polling",
      "jsonp-polling",
    ],
  },
});

export const getReceiverSocketId = (receiverId) => {
  console.log("receiverId", receiverId);
  console.log("userSocketMap", userSocketMap);
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
