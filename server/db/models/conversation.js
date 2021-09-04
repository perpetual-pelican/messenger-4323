const { DataTypes, Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  userIds: {
    type: DataTypes.JSONB,
    allowNull: false
  }
});

// find conversation given two or more user Ids
// accepts senderId as an integer and recipientIds as an array of integers
// adds all user Ids to JSON object as keys for comparing in the query

Conversation.findConversation = async function (senderId, recipientIds) {
  const userIdsJSON = {};
  userIdsJSON[senderId] = null;
  for (const id of recipientIds) {
    userIdsJSON[id] = null;
  }
  const conversation = await Conversation.findOne({
    where: {
      userIds: { 
        [Op.and]: {
          [Op.contains]: userIdsJSON,
          [Op.contained]: userIdsJSON
        }
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
