const dotenv = require("dotenv");
const Sequelize = require("sequelize");
dotenv.config();

const sequelize = new Sequelize(
  "node-complete",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

module.exports = sequelize;
