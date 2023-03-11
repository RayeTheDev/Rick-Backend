const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const userCheck = (req, res, next) => {
  if (
    req.body.gender &&
    req.body.username &&
    req.body.password &&
    req.body.email
  )
    return next();
  else res.status(404).json("Error: Incompleted");
};

const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });

  if (user) {
    if (user.email !== null && user.password !== null) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        next();
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(401).json({ message: "Empty password or email" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
};
module.exports = { userCheck, loginMiddleware };
