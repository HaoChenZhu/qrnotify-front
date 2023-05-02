const express = require("express");
const path = require("path");

const app = express();

// Sirve solo los archivos estáticos de la carpeta dist
app.use(express.static("./dist/qrnotify-front"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/qrnotify-front/" })
);
// Inicia la aplicación escuchando en el puerto de Heroku o en el puerto 8080
app.listen(process.env.PORT || 8080);
