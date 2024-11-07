import { Chat } from '../models/chatSchema';
import { ChatEntity } from '../../../../domain/entities';
import { Types } from 'mongoose';

export const fetchAllChats = async (userId: any): Promise<ChatEntity[]> => {
  try {
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return [];
    }

    const allChats = await Chat.find({
      participants: userId,
    })
      .populate({
        path: 'participants',
        match: { role: 'user' },
        select: 'firstname lastname email phone profileImage',
      })
      .populate({
        path: 'lastMessage',
        select: 'content',
      })
      .exec();
    
    return allChats as ChatEntity[];
  } catch (error: any) {
    console.error('Error fetching chats:', error.message);
    throw new Error(error?.message);
  }
};
