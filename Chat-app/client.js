const WebSocket = require("ws");
const prompt = require("prompt-sync")();
const serverUrl = "ws://localhost:8080";

const ws = new WebSocket(serverUrl);

ws.on("open", () => {
  console.log("Connected to the WebSocket server.");

  while (true) {
    let msg = prompt("");
    if (msg === "exit") {
      ws.close();
      break;
    }
    ws.on("message", (message) => {
      console.log(`Received message from server: ${message}`);
    });

    ws.send(msg, (error) => {
      if (error) {
        console.error("Message not sent:", error);
      }
    });
  }

  ws.on("close", () => {
    console.log("Connection to the server closed.");
  });
});
