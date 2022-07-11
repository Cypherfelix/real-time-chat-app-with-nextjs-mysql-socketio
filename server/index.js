const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    "Express server listening on port " +
      `https://localhost:${process.env.PORT}`
  );
});

// const db = require("./init_models_db");
// async () => {
//   await db();
// };

const { db } = require("./database");
db.sequelize
  .sync() // { force: true }
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((err) => {
    console.log(err.message);
  });
