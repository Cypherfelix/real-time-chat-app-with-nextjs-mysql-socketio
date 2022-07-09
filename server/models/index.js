const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  const user = require("./userModel")(sequelize, Sequelize);
  return {
    user: user,
  };
};
