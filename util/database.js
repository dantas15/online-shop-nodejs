const dotenv = require("dotenv");
dotenv.configure();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "node-complete",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialectOptions: {
    dialect: "mysql",
    host: process.env.DB_HOST,
  },
});

export { sequelize };
