const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize").Sequelize;
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //   operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  // logging: false,
});
const { user } = require("../models")(sequelize);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = user;
module.exports = { db, sequelize };
