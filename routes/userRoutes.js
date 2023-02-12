const express = require("express")
const { createUser } = require("../controller/userController");
const { userCheck } = require("../middleware/userMid");
const router = express.Router()

router
    .post("/user", userCheck, createUser)

exports.userRouter = router;
