require("dotenv").config();

const express = require("express"),
  cors = require("cors"),
  { connect } = require("./config/db");
const { articleRouter } = require("./routes/articleRoutes");
require("dotenv").config();
const { userRouter } = require("./routes/userRoutes");
const app = express().use(cors(), express.json(), userRouter, articleRouter),
  port = process.env.PORT || 8080;

app.listen(port, () => {
  console.clear();
  console.log(`\x1b[32mServer on : http://localhost:${port}\n`);
  connect();
});
