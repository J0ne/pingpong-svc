const express = require("express");
const path = require("path");
const fsPromises = require("fs").promises;
const cors = require("cors");
const { pool } = require("./config");

const directory = path.join("/", "usr", "src", "files");
const filePath = path.join(directory, "pong.txt");
const app = express();
// app.use(express.static("public"));

app.use(cors());

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

  setCounterValue(requestCounter);
  res.send(state);
  //res.status(201).json({ status: "success", message: "Book added." });
  requestCounter++;
});

const getPingPongs = (request, response) => {
  pool.query("SELECT * FROM ping_count", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const setCounterValue = (count) => {

  pool.query("UPDATE ping_count set COUNT=($1)", [count], (error) => {
    if (error) {
      throw error;
    }
  });
};

app.listen(port, () => {

  console.log(`Server started in port ${port}`);
});
