const express = require("express");

const app = express();
// app.use(express.static("public"));

let requestCounter = 0;
const port = 3003;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/pingpong", (req, res) => {
  res.send(`pong ${requestCounter}`);
  requestCounter++;
});

app.listen(port, () => {

  console.log(`Server started in port ${port}`);
});
