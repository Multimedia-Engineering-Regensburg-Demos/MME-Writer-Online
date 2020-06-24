/* eslint-env node */

const express = require("express"),
  DataStorage = require("./lib/DataStorage.js"),
  PORT = 8080,
  HTTP = {
    OK: 200,
    FILE_NOT_FOUND: 404,
  };

var app = express();

function init() {
  initRoutes();
  app.use(express.static("app"));
  app.listen(PORT, function() {
    /* eslint-disable no-console */
    console.log("Writer app listening on port " + PORT + "!");
    /* eslint-enable no-console */
  });
}

function initRoutes() {
  app.put("/file/new", onNewFileRequested);
  app.get("/file/:id", onFileRequested);
  app.post("/file/:id/:content", onFileUpdateRequested);
}

function onNewFileRequested(request, response) {
  let file = DataStorage.create();
  response.status(HTTP.OK).send(file);
}

function onFileRequested(request, response) {
  let file = DataStorage.load(request.params.id);
  if (file) {
    response.status(HTTP.OK).send(file);
  } else {
    response.status(HTTP.FILE_NOT_FOUND).send("File not found on server.");
  }
}

function onFileUpdateRequested(request, response) {
  let file = DataStorage.save(request.params.id, request.params.content);
  response.status(HTTP.OK).send(file);
}

init();