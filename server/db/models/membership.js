const Sequelize = require("sequelize");
const db = require("../db");

const Membership = db.define("membership", {
  unreadMessageCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Membership;
