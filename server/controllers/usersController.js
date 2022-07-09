const { db } = require("../database/index");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({
      where: {
        username: username,
      },
    });

    if (usernameCheck) {
      return res.json({ status: false, msg: "Username already exists" });
    }

    const emailCheck = await User.findOne({
      where: {
        email: email,
      },
    });

    if (emailCheck) {
      return res.json({ status: false, msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;
    return res.json({
      status: true,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};
