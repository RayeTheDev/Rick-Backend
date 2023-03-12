const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  console.log(errors)
  return errors;
};

const userCheck = async (req, res, next) => {
  const isAlready = await userModel.findOne({ email: req.body.email });
  console.log(isAlready);
  if (req.body.username) {
    if (!req.body.username.first) {
      res.status(401).json("First name is required");
      return;
    } else if (!req.body.username.last) {
      res.status(401).json("Last name is required");
      return;
    }
  }else{
    res.status(401).json("Name is required");
    return;
  }
  if (!req.body.email) {
    res.status(401).json("Email is required");
    return;
  } else if (!req.body.password) {
    res.status(401).json("Password is required");
    return;
  } else if (!req.body.gender) {
    res.status(401).json("Gender is required");
    return;
  } else if (req.body.password.length <= 5) {
    res.status(401).json("Minimum password length is 6");
    return
  }

  try {
    if (isAlready) {
      res.status(400).send("That email is already registered");
      return;
    }

    next();
  } catch (err) {

    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
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
        res.status(401).send({ message: "Invalid password" });
      }
    } else {
      res.status(401).send({ message: "Empty password or email" });
    }
  } else {
    res.status(401).send({ message: "Email not found" });
  }
};
module.exports = { userCheck, loginMiddleware };
