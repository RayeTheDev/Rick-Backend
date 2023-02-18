const express = require("express");
const { createComment, deleteAllComments, getComments } = require("../controller/commentController");

const router = express.Router();

router
  .get("/comments", getComments)
  .post("/comments", createComment)
  .delete("/comments", deleteAllComments);

exports.commentRouter = router;
