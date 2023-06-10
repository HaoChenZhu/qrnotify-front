/* (function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiRestDomain = "http://localhost:";
  window.__env.adminContext = "8081/nebrija/qrnotify-admin";
  window.__env.notificationsContext = "8083/nebrija/qrnotify-notifications";
  window.__env.mqttBroker = "b100db1d.ala.us-east-1.emqxsl.com";
  window.__env.mqttPort = 8084;
  window.__env.mqttUser = "hao";
  window.__env.mqttPassword = "123";
  window.__env.oktaDomain = "https://dev-86838266.okta.com/oauth2/default";
  window.__env.oktaClientId = "0oa9gmfbgfJUiFXEG5d7";
  // Whether or not to enable debug mode
  window.__env.enableDebug = true;
})(this); */

(function (window) {
  window.__env = window.__env || {};
  // API url
  window.__env.apiRestDomain = "https://qrnotify-";
  window.__env.adminContext = "admin.herokuapp.com/nebrija/qrnotify-admin";
  window.__env.notificationsContext =
    "notifications.herokuapp.com/nebrija/qrnotify-notifications";
  window.__env.mqttBroker = "b100db1d.ala.us-east-1.emqxsl.com";
  window.__env.mqttPort = 8084;
  window.__env.mqttUser = "hao";
  window.__env.mqttPassword = "123";
  window.__env.oktaDomain = "https://dev-86838266.okta.com/oauth2/default";
  window.__env.oktaClientId = "0oa9gmfbgfJUiFXEG5d7";
  window.__env.enableDebug = true;
})(this);
