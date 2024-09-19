import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { check, validationResult } from "express-validator";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/fetch-messages/:chatUserId", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        {
          from: req.userId,
          to: req.params.chatUserId,
        },
        {
          from: req.params.chatUserId,
          to: req.userId,
        },
      ],
    });
    if (!messages) {
      return res.status(400).json({ message: "No messages found" });
    }

    return res.status(200).json({ messages: messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post(
  "/send-message",
  verifyToken,
  [
    check("from", "Sender is required").isString(),
    check("to", "Reciever is required").isString(),
    check("text", "Text for your message is required").isString(),
    check("createdAt", "Date is required").isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      if (!req.userId === req.body.from) {
        return res
          .status(400)
          .json({ message: "User and sender not matching" });
      }

      const users = await User.find({
        _id: { $in: [req.userId, req.body.to] },
      });
      if (!users || users.length < 2) {
        return res.status(400).json({ message: "Users not found" });
      }

      if (
        !users[0].matches.includes(
          users[1]._id.toString() ||
            !users[1].matches.includes(users[0]._id.toString()),
        )
      ) {
        return res.status(400).json({ message: "Users are not matching" });
      }

      const message = new Message({
        from: req.userId,
        to: req.body.to.toString(),
        text: req.body.text,
        createdAt: new Date(),
      });

      await message.save();

      return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
);

export default router;
