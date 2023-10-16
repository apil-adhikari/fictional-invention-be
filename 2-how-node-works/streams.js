//Reading a large file from the file system and send to the client.

const fs = require("fs");
const server = require("http").createServer();
server.on("request", (req, res) => {
  // Solution 1: Read the complete file and then display
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //   Solution 2: Streams
  //   const readable = fs.createReadStream("test-ffile.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found!!!");
  //   });
  //   Solution 3: Solving the problem of "Back Pressure" using pipe() method

  // readableSource.pipe(writableDestination)
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
