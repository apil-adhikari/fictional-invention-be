const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

//Event Listner
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

//multiple listners on same event
myEmitter.on("newSale", () => {
  console.log("Costumer name: Apil");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});
// Event Emitter
myEmitter.emit("newSale", 9);

//
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request reveived!");
  console.log(req.url);
  res.end("Request received");
});

// we can send only one response
server.on("request", (req, res) => {
  console.log("Another request received...😗");
});

server.on("close", () => {
  console.log("Server Closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
