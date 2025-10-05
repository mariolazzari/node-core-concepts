const http = require("node:http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (_req, res) => {
  const result = fs.readFileSync("text.txt");
  res.setHeader("Content-Type", "text/plain");

  res.end(result);
});

server.listen(3033, "127.0.0.1", () => {
  console.log("Server started on", server.address());
});

console.log("A");
setTimeout(() => {
  console.log("B");
}, 0);
console.log("C");
