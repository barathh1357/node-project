const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node app running in Docker!");
});

app.listen(7000, () => {
  console.log("Server running on port 3000");
});
