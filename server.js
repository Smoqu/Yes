const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const v4 = require("uuid").v4;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Serv running on port ${PORT}`));

app.use(express.static(path.join(__dirname, "public")));

let users = [];

app.get("/", (req, res) => {
  res.send("Hi");
});

io.on("connection", (socket) => {
  socket.broadcast.emit("connectionState", `joined the chat`);

  socket.on("disconnect", () => {
    io.emit("connectionState", "left the chat");
  });

  socket.on("user", (user) => {
    let newUser = {
      id: v4(),
      user,
    };
    users.push(newUser);
    console.log(users);
  });

  socket.on("message", (value) => {
    console.log(value);
    io.emit("receive", value);
  });
});
