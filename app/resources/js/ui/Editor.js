/* eslint-env browser */

import {Observable, Event} from "../utils/Observable.js";

const KEY_TYPES = {
    Standard: Symbol(),
    Breaking: Symbol(),
  },
  // Code for keys: Backspace, Enter, Space, "1" (!), "?", ",", "."
  BREAKING_CHARS = [8, 13, 32, 49, 63, 188, 190],
  READABLE_WORDS_PER_MINUTE = 200;

function aggregateCurrentStats(textarea) {
  let words = textarea.value === "" ? 0 : textarea.value.replace(
    /[^_0-9a-zA-Z]/g, " ").trim().split(
    /\s+/).length;
  return {
    words: words,
    readingTimeInMinutes: Math.round(words / READABLE_WORDS_PER_MINUTE),
  };
}

function onChange(event) {
  let keyType = checkKeyType(event.which);
  if (keyType === KEY_TYPES.Breaking) {
    let event = new Event("update", this.stats);
    this.notifyAll(event);
  }
}

function checkKeyType(keycode) {
  var type = KEY_TYPES.Standard;
  if (BREAKING_CHARS.includes(keycode)) {
    type = KEY_TYPES.Breaking;
  }
  return type;
}

class Editor extends Observable {

  constructor(el) {
    super();
    this.textarea = el.querySelector("textarea");
    this.textarea.addEventListener("keyup", onChange.bind(this));
  }

  get text() {
    return this.textarea.value;
  }

  set text(text) {
    this.textarea.value = text;

  }

  get stats() {
    let stats = aggregateCurrentStats(this.textarea);
    return stats;
  }

}

export default Editor;