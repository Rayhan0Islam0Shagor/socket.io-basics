import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// browser request
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// io server config
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.emit("chatHistory", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// browser listening on port 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
