const sendValidation = async (props) => {
  console.log(props.email);
  const nodemailer = require("nodemailer");
  const path = require("path");
  const hbs = require("nodemailer-express-handlebars");
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extname: ".html",
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    var mailOptions = {
      from: process.env.GMAIL,
      to: props.email,
      template: "index",
      context: {
        num: props.token,
      },
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) { }
};
exports.sendValidation = sendValidation;
