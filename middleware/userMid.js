const userCheck = (req, res, next) => {
    if (req.body.isMan && req.body.username && req.body.password && req.body.photoUrl && req.body.locations && req.body.email) return next()
    else res.send("Error: Incompleted")
}
module.exports = { userCheck }