import { ChatMessage } from '../models/chatMessageSchema';
import { ChatMessageEntity } from '../../../../domain/entities/chatMessageEntity'; 

export const sendChatMessage = async (chatData: ChatMessageEntity) => {
  try {
    const message = new ChatMessage({
      sender: chatData.sender,
      content: chatData.content,
      attachments: chatData.attachments || [],
      chat: chatData.chat,
    });

    const savedMessage = await message.save();
    
    return savedMessage; 
  } catch (error) {
    console.error('Error saving message to database:', error);
    throw error; 
  }
};
