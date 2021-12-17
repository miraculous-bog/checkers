const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

const sockets = {
  white: null,
  black: null,
  others: [],
};

app.use(express.static("./public"));

io.on('connection', (socket) => {
  socket.join("game");
  const { id } = socket;
  if (!sockets.black || !sockets.white) {
    socket.on("move", ({Сheckers}) => {
      socket.to("game").emit("move", {Сheckers});
    })
  }
  socket.on("disconnect", () => {
    if (sockets.white === id) sockets.white = null;
    else if (sockets.black === id) sockets.black = null;
    else sockets.others = sockets.others.filter(s => s !== id);
  });
  if (!sockets.white) sockets.white = id;
  else if (!sockets.black) sockets.black = id;
  else sockets.others.push(id);
});

server.listen(3002, () => {
  console.log("Server has started");
});
