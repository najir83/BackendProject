const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const port = 8001;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const path = require("path");
app.use(express.static(path.join(__dirname, "public"))); // More reliable
//io handle

io.on("connection", (client) => {
  client.on("user-message", (message) => {
    console.log("A new user message ", message);

    // send the message to all
    io.emit("message", message);
  });
});
//http handle
app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});
server.listen(port, () => {
  console.log(`Listening on PORT http://localhost:${port}`);
});
