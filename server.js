const express = require("express");
const path = require("path");

const app = express();

// Sirve solo los archivos estáticos de la carpeta dist
app.use(express.static(__dirname + "/dist/qrnotify"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/qrnotify/index.html"));
});

// Inicia la aplicación escuchando en el puerto de Heroku o en el puerto 8080
app.listen(process.env.PORT || 8080);
