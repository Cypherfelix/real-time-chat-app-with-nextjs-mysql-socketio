const Sequelize = require("sequelize").Sequelize;
const sequelize = require("./sequlizeConnection");
const db = {};
const { message, user } = require("../models/index");
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = user;
db.message = message;

module.exports = db;
