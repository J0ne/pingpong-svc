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
let state = "";
const port = 3003;
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});


const writeToFile = async (msg) => {
  try {
    await fsPromises.writeFile(filePath, msg);
    console.log(`${msg} > pong.txt`);
  } catch (error) {
    console.log(error);
  }
};

app.get("/healthz", (req, res) => {
  pool.query("SELECT 1;", (error, results) => {
    if (error) {
      res.status(500);
    } else{
      res.status(200).send('db ok');
    };
  });
});

app.get("/pingpong", (req, res) => {
  pool.query("SELECT * FROM ping_count;", (error, results) => {
    if (error) {
      throw error;
    }
    const fetchedValue = results.rows[0]?.count;
    state = `Ping / pongs: ${fetchedValue}`;

    res.status(200).send(state);
    requestCounter = fetchedValue + 1;
    setCounterValue(requestCounter);
  });
});

const setCounterValue = (count) => {
  console.log("Updates value", count);
  pool.query("update ping_count set count=$1;", [count], (error) => {
    if (error) {
      throw error;
    }
  });
};

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
