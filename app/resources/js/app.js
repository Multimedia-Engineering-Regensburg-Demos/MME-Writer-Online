/* eslint-env browser */

import Storage from "./data/Storage.js";
import Editor from "./ui/Editor.js";
import StatsView from "./ui/StatsView.js";

var textStorage,
  stats,
  editor,
  fileID;

function init() {
  initView();
  initEditor();
  initStorage();
}

function initStorage() {
  fileID = getIDFromURL();
  textStorage = new Storage();
  if(fileID) {
    textStorage.load(fileID).then(function(file) {
      editor.text = file.content;
    });
  } else {
    textStorage.create().then(function(file){
      fileID = file.id;
      window.location.hash = fileID;
      editor.text = file.content;
    });
  }
}

function getIDFromURL() {
  let url = window.location.href;
  return url.split("#")[1];
}

function initView() {
  let statsEl = document.querySelector("#stats");
  stats = new StatsView(statsEl);
}

function initEditor() {
  let editorEl = document.querySelector("#editor");
  editor = new Editor(editorEl);
  editor.addEventListener("update", onTextChanged);
}

function onTextChanged(event) {
  stats.update(event.data);
  textStorage.save(editor.text).then(function() {
    console.log("Text saved on server");
  });
}

init();