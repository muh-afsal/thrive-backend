import { Chat } from '../models/chatSchema';
import { ChatEntity } from '../../../../domain/entities';

export const fetchAllChats = async (): Promise<ChatEntity[]> => {
  try {
    const allChats = await Chat.find()
      .populate({
        path: 'participants',
        match: { role: 'user' }, 
        select: 'firstname lastname email phone profileImage', 
      })
      .exec();
      
    return allChats as ChatEntity[];
  } catch (error: any) {
    console.error('Error fetching chats:', error.message);
    throw new Error(error?.message);
  }
};
