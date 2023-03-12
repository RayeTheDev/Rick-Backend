const bcrypt = require("bcrypt");
const { userModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { tokenSend, validToken } = require("./token");
const { request } = require("express");

const getUsers = async (req, res) => {
  const result = await userModel.find({});
  res.send(result);
};

const createUser = async (req, res) => {
  const confirm = await userModel.find({ email: req.body.email });
  if (confirm.length != 0) {
    return res.send("This account already used");
  }
  try {
    const salt = bcrypt.genSaltSync(1);
    const hash = bcrypt.hashSync(String(req.body.password), salt);
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin,
      isMan: req.body.isMan,
      photoUrl: req.body.photoUrl,
      locations: req.body.locations,
      articles: req.body.articles,
      roles: req.body.roles,
    };
    console.log(hash);
    await new userModel(newUser).save();
    res.send(
      `Welcome, ${newUser.isMan ? "sir" : "msr"} ${newUser.username.first}`
    );
  } catch (error) {
    res.send(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  console.log(user)
  try {
    if (user) {
      const token = validToken({ _id: user._id, email: user.email });
      console.log(token);

      const accessToken = tokenSend({
        email: user.email,
        password: user.password,
        roles: user.roles,
        username: { first: user.username.first, last: user.username.last },
      });

      res.json({ accessToken: token });
    }
  } catch (err) {
    res.send(err);
  }
};

const isValidUser = async (req, res) => {
  const accessToken = req.headers.authorization;

  try {
    if (accessToken) {
      jwt.verify(accessToken, "defaultSecure", async function (err, response) {
        console.log("jaj", response, req.body.token);
        if (err) return res.send(err);
        const isMatched = bcrypt.compareSync(req.body.token, response.token)
        if (isMatched) {
          let user = await userModel.findById(response._id);
          user.isVerified = true;
          await userModel.findByIdAndUpdate(response._id, user);
          return res.send("Verified access token");
        } else {
          res.send('Wrong verification code')
        }
      });
    } else {
      res.send('No access token found')
    }
  } catch (err) {
    res.send(err);
  }
};

const authenticateToken = (req, res) => {
  const token = req.headers.authorization;
  console.log(token, "authenticateToken");

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const email = result.email;
      const user = await userModel.findOne({ email: email });
      res.send(user);
    }
  });
};

const deleteAllUser = async (req, res) => {
  res.send(await userModel.deleteMany());
};
module.exports = {
  createUser,
  getUsers,
  deleteAllUser,
  loginUser,
  authenticateToken,
  isValidUser,
};
