const models = require("./models"); //By default load index.js inside /app/models
const { sequelize } = require("./database");

const init_BDD = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    const created = sequelize.sync({ force: true });

    if (created) {
      console.log("==> TABLE DONE !");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = init_BDD;
