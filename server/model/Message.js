import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String ,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  text: {
    type: String,
  },
  type: {
    type: String,
  }, },
  { timestamps: true  })

const Message = mongoose.model("Message", MessageSchema);
export default Message;
