import { ChatMessage } from '../models/chatMessageSchema';
import { ChatMessageEntity } from '../../../../domain/entities';
import { Types } from "mongoose";

export const fetchAllChatMessages = async (chatId: string): Promise<ChatMessageEntity[]> => {
  try {

    const chatObjectId = new Types.ObjectId(chatId); 
     
    const allChatMessages = await ChatMessage.find({ chat: chatObjectId })
      .populate({
        path: 'sender',
        select: 'firstname lastname profileImage',
      })
      .exec(); 
      
    return allChatMessages as ChatMessageEntity[];
  } catch (error: any) {
    console.error('Error fetching chat messages:', error.message);
    throw new Error(error?.message);
  }
};
