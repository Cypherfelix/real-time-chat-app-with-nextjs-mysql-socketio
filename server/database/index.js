const Sequelize = require("sequelize").Sequelize;
const sequelize = require("./sequlizeConnection");
const db = require("./database");
module.exports = { db, sequelize };
