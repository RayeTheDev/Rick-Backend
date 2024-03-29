require("dotenv").config();

const express = require("express"),
  cors = require("cors"),
  { connect } = require("./config/db");

const { articleRouter } = require("./routes/articleRoutes"), { commentRouter } = require("./routes/commentRoutes"), { userRouter } = require("./routes/userRoutes");
const { categoryRouter } = require("./routes/categoryRoutes");

const app = express().use(cors(), express.json(), userRouter, articleRouter, commentRouter, categoryRouter),
  port = process.env.PORT || 3100;

app.get("/", (req, res) => {
  res.send(
    `Welcome to the Unread backend - You on the http://localhost:${port}/`
  );
});

app.listen(port, async () => {
  try {
    console.clear();
    console.log(`\x1b[32mServer on : http://localhost:${port}\n`);
    connect();
  } catch (error) {
    console.error(error);
  }
});
