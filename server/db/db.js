const Sequelize = require("sequelize");

const db_username = process.env.DATABASE_USERNAME;
const db_password = process.env.DATABASE_PASSWORD;

const db = new Sequelize("messenger", db_username, db_password, {
  host: "localhost",
  dialect: "postgres",
  logging: false
});

module.exports = db;
