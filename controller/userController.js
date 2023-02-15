const bcrypt = require("bcrypt");
const { userModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");


const getUsers = async (req, res) => {
  const result = await userModel.find({})
  res.send(result)
}
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


  try {
    const accessToken = jwt.sign(
      { email: user.email, password: user.password, username: { first: user.username.first, last: user.username.last } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2m" }
    );

    res.json({ accessToken: accessToken });
  } catch (err) {
    res.send(err);
  }
};

const authenticateToken = (req, res) => {

  const token = req.headers.authorization
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
module.exports = { createUser, getUsers, deleteAllUser, loginUser, authenticateToken };
