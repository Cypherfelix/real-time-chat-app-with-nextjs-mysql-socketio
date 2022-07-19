const Sequelize = require("sequelize");
const sequelize= require("../database/sequlizeConnection");
const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      min: 3,
    },
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  states: {
    type: Sequelize.ENUM,
    values: ["client", "writer", "support"],
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isActivated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  provider: {
    type: Sequelize.ENUM,
    values: ["google", "credentials"],
    defaultValue: "credentials",
  },
  profile: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
});
module.exports = User;
