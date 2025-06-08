import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String
  },
  receiverId: {
    type: String  
  },
  senderId: {
    type: String,
  },
  message: {
    type: String,
  },
  text: {
    type: String,
  },
  type: {
    type: String,
  },
},
  { timestamps: true  }

);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
