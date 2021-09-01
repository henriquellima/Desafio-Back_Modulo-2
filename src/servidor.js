const express = require("express");
const app = express();
const rotas = require("./rotas");

app.use(rotas);

module.exports = app;
