/* eslint-env browser */

var Writer = Writer || {};

Writer.DocumentStorage = function() {
  "use strict";

  var that = new EventTarget();

  function create() {
  }

  function load(id) {
  }

  function save(content) {
  }

  that.create = create;
  that.load = load;
  that.save = save;
  return that;
};