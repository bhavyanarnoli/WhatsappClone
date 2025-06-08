import Message from '../model/Message.js';
import Conversation from '../model/Conversation.js';

export const newMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    await Conversation.findByIdAndUpdate(
      req.body.conversationId,
      { message: req.body.text }
    );

    return res.status(200).json('Message has been sent successfully');
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getMessages = async (req, res) => {  
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Conversation ID is required' });
    }
    const conversationExists = await Conversation.exists({ _id: id });
    if (!conversationExists) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    const messages = await Message.find({ conversationId: id }).sort({ createdAt: 1 });                         
    return res.status(200).json(messages || []);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}