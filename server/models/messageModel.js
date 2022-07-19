const { JSON } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../database/sequlizeConnection');
const userModel = require('./userModel');

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  sender: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: userModel,
      key: "id",
    },
  },
  receiver: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: userModel,
      key: "id",
    },
  },
  seen: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  users: {
    type: JSON,
    allowNull: true,
  },
});


module.exports = Message;



