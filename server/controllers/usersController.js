const { db, sequelize } = require("../database/index");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize").Sequelize;

module.exports.register = async (req, res, _next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({
      where: {
        username,
      },
    });

    if (usernameCheck) {
      return res.json({ status: false, msg: "Username already exists" });
    }

    const emailCheck = await User.findOne({
      where: {
        email,
      },
    });

    if (emailCheck) {
      return res.json({ status: false, msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    user.password = "";
    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Request failed: " + error.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userModel = await sequelize.query(
      `SELECT  * FROM users WHERE users.username LIKE '%${email}' OR users.email LIKE '%${email}'`,
      {
        model: User,
        mapToModel: true, // pass true here if you have any mapped fields
      }
    );
    const user = userModel.at(0);

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        password,
        user.get("password")
      );
      if (isPasswordValid) {
        user.setDataValue("password", null);
        return res.json({
          status: true,
          user,
        });
      }
    }
    return res.json({
      status: false,
      msg: "Invalid username/email or password",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Request failed: ",
    });
  }
};

module.exports.checkuser = async (req, res) => {
  try {
    const { name, email, provider } = req.body;
    const userModel = await sequelize.query(
      `SELECT  * FROM users WHERE users.email = '${email}' `,
      {
        model: User,
        mapToModel: true, // pass true here if you have any mapped fields
      }
    );

    const user = userModel.at(0);

    if (user) {
      if (user.get("password") != null) {
        return res.json({
          status: false,
          msg: "Incorrect login details",
        });
      }
      user.password = null;
      return res.json({
        status: true,
        user,
      });
    }

    const newUser = await User.create({
      email,
      username: email,
      name,
      provider,
    });

    newUser.password = null;
    return res.json({
      status: true,
      newUser,
    });
  } catch (errors) {
    return res.json({
      status: false,
      msg: "Request failed: ",
    });
  }
};

module.exports.updateuser = async (req, res) => {
  try {
    const gotUser = req.body.user;
    const payload = req.body.payload;

    const { email } = gotUser;

    const model = await sequelize.query(
      `SELECT  * FROM users WHERE  users.email LIKE '%${email}'`,
      {
        mapToModel: true,
        model: User,
      }
    );

    const user = model.at(0);

    if (user) {
      await user.update({
        ...payload,
      });
      await user.save();
      user.password = null;
      return res.json({
        status: true,
        user: user,
      });
    } else {
      return res.json({
        status: false,
        msg: "Not Found",
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      msg: "Request failed",
    });
  }
};

module.exports.resetpassword = async (_req, _res) => {};

module.exports.sendverify = async (_req, _res) => {};

module.exports.checkverify = async (_req, _res) => {};

module.exports.test = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await sequelize.query(
      `SELECT  * FROM users WHERE users.username LIKE '%${email}' OR users.email LIKE '%${email}'`,
      {
        model: User,
        mapToModel: true, // pass true here if you have any mapped fields
      }
    );
    if (user) {
      return res.json({
        status: true,
        user,
      });
    }
    return res.json({
      status: false,
      user: "Not Found",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Request failed: " + error.message,
    });
  }
};

module.exports.check = async (req, res) => {
  try {
    const { email, name, provider } = req.body;

    const userModel = await sequelize.query(
      `SELECT  * FROM users WHERE  users.email LIKE '%${email}'`,
      {
        model: User,
        mapToModel: true, // pass true here if you have any mapped fields
      }
    );
    const user = userModel.at(0);
    if (user) {
      if (user.get("password") !== null) {
        return res.json({
          status: false,
          msg: "Invalid login details",
        });
      }
      return res.json({
        status: true,
        user,
        msg: "Already exists",
      });
    } else {
      const newUser = await User.create({
        email,
        username: name.split(" ").at(0).trim(),
        name,
        provider,
      });
      return res.json({
        status: true,
        msg: "added to db",
        newUser,
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      msg: "Request failed",
    });
  }
};

module.exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    //
    const userModel = await sequelize.query(
      `SELECT  * FROM users WHERE  users.email LIKE '%${email}'`,
      {
        model: User,
        mapToModel: true, // pass true here if you have any mapped fields
      }
    );
    const user = userModel.at(0);
    user.password = null;
    if (user) {
      return res.json({
        status: true,
        user,
      });
    } else {
      return res.json({
        status: false,
        msg: "Not Found",
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      msg: "Request failed",
    });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userModel = await sequelize.query(
      `SELECT  email, id, username, profile, name FROM users WHERE  users.email NOT LIKE '%${email}'`,
      {
        model: User,
        mapToModel: true, // pass true here if you have any mapped fields
      }
    );

    return res.json({
      status: true,
      users: userModel,
    });

  } catch (error) {
    next(error.message);
  }
};
