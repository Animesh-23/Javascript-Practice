const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();

wss.on("connection", (ws) => {
  // Add the new client to the set
  clients.add(ws);

  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    // Remove the client from the set when they disconnect
    clients.delete(ws);
  });
});

console.log("WebSocket server running on port 8080");
