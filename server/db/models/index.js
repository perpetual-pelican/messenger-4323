const Conversation = require("./conversation");
const User = require("./user");
const Membership = require("./membership");
const Message = require("./message");

// associations

Conversation.belongsToMany(User, { through: Membership });
User.belongsToMany(Conversation, { through: Membership });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Membership,
  Message
};
