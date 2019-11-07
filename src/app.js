require("dotenv").config();
const express = require("express");

const indexRouter = require("./lib/router/indexRouter");

const app = express();

app.use("/manifest/dest", express.static("public/videos"));
app.use("/js", express.static("public/js"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

module.exports = app;
