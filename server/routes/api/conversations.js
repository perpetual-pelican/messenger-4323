const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op, Sequelize } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: [
        "id",
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM messages AS message
            WHERE "conversationId" = conversation.id
              AND "senderId" != ${userId}
              AND "wasRead" = false
          )`),
          "unreadMessageCount"
        ]
      ],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message, order: ["createdAt", "ASC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText =
        convoJSON.messages[convoJSON.messages.length - 1].text;
      
      convoJSON.unreadMessageCount = parseInt(convoJSON.unreadMessageCount);

      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// update wasRead to true for all messages belonging to conversation with id
// only update messages where the sender is not the current user
router.put("/read/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversationId = req.params.id;
    const conversation = await Conversation.findOne({
      where: {
        [Op.and]: {
          id: conversationId,
          [Op.or]: {
            user1Id: userId,
            user2Id: userId,
          },
        },
      },
      include: [
        {
          model: Message,
          where: {
            [Op.and]: {
              senderId: {
                [Op.not]: userId,
              },
              wasRead: false,
            },
          },
        },
      ]
    });
    if (!conversation) return res.sendStatus(404);
  
    const promisedMessages = conversation.messages.map((message) => {
      return message.update({ wasRead: true });
    });
    await Promise.all(promisedMessages);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
