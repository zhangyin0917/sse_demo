const WebSocket = require("ws");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("已连接");
  ws.on("message", (message) => {
    // 广播给所有链接的客户端
    const text = message.toString("utf8");
    console.log(text);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });

  ws.on("close", () => {
    console.log("已断开");
  });
});

server.listen(8080, () => {
  console.log("WebSocket server is listening on port 8080");
});
