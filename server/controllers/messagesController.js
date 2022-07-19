const Sequelize = require("sequelize");
const { db, sequelize } = require("../database/index");
const Message = db.message;
const { Op } = require("sequelize");
const { message } = require("../database/database");

module.exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      text: message,
      sender: from,
      receiver: to,
      users: [from, to],
    });

    if (data) {
      return res.json({
        status: true,
        msg: "Message added successfully",
      });
    } else {
      return res.json({
        status: false,
        msg: "Message not added to database",
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      msg: "Request failed",
    });
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
      const { to, from } = req.body;
      const timestamp = await sequelize.query(
        `SELECT CURRENT_TIMESTAMP() as now`
      );

      const cur = timestamp[0][0].now;
      var d = Date(cur);

    const data2 = await sequelize.query(
      `UPDATE messages SET seen=${true} WHERE sender = "${to}" AND receiver = "${from}"`,
      {}
    );
    const messageModel = await sequelize.query(
      `SELECT * FROM messages WHERE JSON_CONTAINS(users,'["${to}", "${from}"]') ORDER BY createdAt ASC`,
      {
        model: Message,
        mapToModel: true, // pass true here if you have any mapped fields
      }
    );
      
      const projectedMessages = messageModel.map((msg) => {
        return {
            fromSelf: msg.sender.toString() === from,
            message: msg.text,
            timestamp: msg.createdAt,
            seen: msg.seen
        }
    })

    return res.json({
      status: true,
      mesages: projectedMessages,
    });
  } catch (error) {
    next(error.message);
  }
};
