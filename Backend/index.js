const express = require("express");
const server_config = require("./server_config");

const app = express();

app.listen(server_config.PORT, (err) => {
  if (err)
    return console.log("An error has occured while starting the server");
  console.log("Server is up and running at http://localhost:" + server_config.PORT);
});