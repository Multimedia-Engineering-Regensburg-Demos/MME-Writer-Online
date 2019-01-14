/* eslint-env browser */

var Writer = Writer || {};

Writer.App = (function() {
  "use strict";

  var that = {},
    editor,
    notifications;

  function init() {
    initNotifications();
    initController();
  }

  function initNotifications() {
    let notificationEl = document.querySelector("#notification");
    notifications = Writer.NotificationView(notificationEl);
  }

  function initController() {
    let editorEl = document.querySelector("#editor");
    editor = Writer.EditorController(editorEl);
  }

  that.init = init;
  return that;
}());

Writer.App.init().start();