const { DataTypes, Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  userIds: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  }
});

// find conversation given two user Ids

Conversation.findConversation = async function (senderId, recipientIds) {
  const conversation = await Conversation.findOne({
    where: {
      userIds: { 
        [Op.and]: {
          [Op.contains]: [senderId, ...recipientIds],
          [Op.contained]: [senderId, ...recipientIds]
        }
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
