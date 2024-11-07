import { ChatMessage } from '../models/chatMessageSchema';
import { ChatMessageEntity } from '../../../../domain/entities/chatMessageEntity';
import { Chat } from '../models/chatSchema';

export const sendChatMessage = async (chatData: ChatMessageEntity) => {
  try {
    const message = new ChatMessage({
      sender: chatData.sender,
      content: chatData.content,
      attachments: chatData.attachments || [],
      chat: chatData.chat,
    });

    const savedMessage = await message.save();

    await Chat.findByIdAndUpdate(
      chatData.chat,
      { lastMessage: savedMessage._id },
      { new: true }
    );

    return savedMessage;
  } catch (error) {
    console.error('Error saving message to database:', error);
    throw error;
  }
};
