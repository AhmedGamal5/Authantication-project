const userModel = require("../Models/user.cjs"); // use userModel from Models //
const bcrypt = require("bcryptjs"); // library for protect passwords //
const jwt = require("jsonwebtoken"); // library for permession to access API //

// Register function //
exports.register = async function (req, res) {
  try {
    let newUser = new userModel(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    newUser.password = hashedPassword;

    newUser.save();
    let user = newUser;

    return res.json({
      Message: "user Register",
      user: { name: user.name, email: user.email, id: user._id },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ Message: "err" });
  }
};

// LogIn function //
exports.login = async function (req, res) {
  try {
    let user = await userModel.findOne({
      email: req.body.email,
    });

    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({
        Message: "Authantication failed , Invalid username or password",
      });
    }
    const token = jwt.sign(
      { email: user.email, name: user.name, id: user._id },
      "securitykey"
    );

    return res.json({
      message: "user logedd in successfully",
      user: { name: user.name, email: user.email, id: user._id, token: token },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ Message: "err" });
  }
};
