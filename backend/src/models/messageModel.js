import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
