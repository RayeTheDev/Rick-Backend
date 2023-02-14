const express = require("express")
const { createUser, deleteAllUser, loginUser } = require("../controller/userController");
const { userCheck, loginMiddleware } = require("../middleware/userMid");
const router = express.Router()

router
    .post("/user", userCheck, createUser)
    .post("/login", loginMiddleware, loginUser)
    .delete("/user",deleteAllUser)

exports.userRouter = router;
