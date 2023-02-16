const { sendValidation } = require("../confirmationEmail");

exports.tokenSend = (props) => {
  const jwt = require("jsonwebtoken");
  const accessToken = jwt.sign(
    {
      email: props.email,
      password: props.password,
      username: { first: props.username.first, last: props.username.last },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2m" }
  );
  return accessToken;
};
exports.validToken = (props) => {
  console.log(props);
  var rn = require("random-number");
  var options = {
    min: 000001,
    max: 999999,
    integer: true,
  };
  const customId = rn(options);
  console.log(customId);
  const jwt = require("jsonwebtoken");
  const validTokenId = jwt.sign(
    {
      _id: props._id,
      token: customId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3m" }
  );
  sendValidation({ email: props.email, token: customId });
  return validTokenId;
};
