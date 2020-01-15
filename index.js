/* eslint-env node */

"use strict";

const express = require("express"),
  DataStorage = require("./lib/DataStorage.js"),
  PORT = 8080;

var app = express();

function init() {
  initRoutes();
  app.use(express.static("app"));
  app.listen(PORT, function() {
    console.log("Writer app listening on port " + PORT + "!");
  });
}

function initRoutes() {
  app.put("/file/new", onNewFileRequested);
  app.get("/file/:id", onFileRequested);
  app.post("/file/:id/:content", onFileUpdateRequested);
}

function onNewFileRequested(request, response) {
  let file = DataStorage.create();
  response.status(200).send(file);
}

function onFileRequested(request, response) {
  let file = DataStorage.load(request.params.id);
  if (file) {
    response.status(200).send(file);
  } else {
    response.status(404).send("File not found on server.");
  }
}

function onFileUpdateRequested(request, response) {
  let file = DataStorage.save(request.params.id, request.params.content);
  response.status(200).send(file);
}

init();