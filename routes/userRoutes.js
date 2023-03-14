const express = require("express")
const { createUser, deleteAllUser, loginUser, authenticateToken, getUsers,getUser, isValidUser, updateUser } = require("../controller/userController");
const { roleMiddleware } = require("../middleware/roleMid");
const { userCheck, loginMiddleware } = require("../middleware/userMid");
const router = express.Router()

router
    .get("/users", roleMiddleware(404), getUsers)
    .get("/user/:id", getUser)
    .put("/user/:id",updateUser)
    .post("/check", isValidUser)
    .post("/user", userCheck, createUser)
    .post("/login", loginMiddleware, loginUser)
    .get("/token", authenticateToken)
    .delete("/user", deleteAllUser)

exports.userRouter = router;
