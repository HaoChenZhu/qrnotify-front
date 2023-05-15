/* (function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiRestDomain = "http://localhost:";
  window.__env.adminContext = "8081/nebrija/qrnotify-admin";

  // Whether or not to enable debug mode
  window.__env.enableDebug = true;
})(this); */

(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiRestDomain = "https://qrnotify-";
  window.__env.adminContext = "admin.herokuapp.com/nebrija/qrnotify-admin";

  // Whether or not to enable debug mode
  window.__env.enableDebug = true;
})(this);
