const express = require("express")
const { createUser, deleteAllUser } = require("../controller/userController");
const { userCheck } = require("../middleware/userMid");
const router = express.Router()

router
    .post("/user", userCheck, createUser)
    .delete("/user",deleteAllUser)

exports.userRouter = router;
