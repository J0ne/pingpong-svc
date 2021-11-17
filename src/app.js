const express = require("express");
const path = require("path");
const fsPromises = require("fs").promises;

const directory = path.join("/", "usr", "src", "files");
const filePath = path.join(directory, "pong.txt");
const app = express();
// app.use(express.static("public"));

let requestCounter = 0;
let state = '';
const port = 3003;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const writeToFile = async (msg) => {
  try {
    await fsPromises.writeFile(filePath, msg);
    console.log(`${msg} > pong.txt`);
  } catch (error) {
    console.log(error);
  }
};

app.get("/pingpong", (req, res) => {
  state = `Ping / pongs: ${requestCounter}`
  writeToFile(state);
  res.send(state);

  requestCounter++;
});

app.listen(port, () => {

  console.log(`Server started in port ${port}`);
});
