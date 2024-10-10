import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import mongoose, { Types } from "mongoose";
import { ChatEntity } from "../../../domain/entities/chatEntity"; 
import { Chat } from "../../../infrastructure/database/mongodb/models/chatSchema";

export const createAChatController = (dependencies: IDependencies) => {
  
  const {
    useCases: { createAChatUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { selectedUserId, currentUserId } = req.body;

      

      if (!selectedUserId || !currentUserId) {
         res.status(400).json({
          message: "Both selectedUserId and currentUserId must be provided.",
        });
      }

      // Define chatData as a plain object
      const chatData: Partial<ChatEntity> = {
        name: "one-to-one",
        isGroupChat: false,
        lastMessage: null,
        participants: [
          new Types.ObjectId(selectedUserId),
          new Types.ObjectId(currentUserId),
        ],
        admin: new Types.ObjectId(currentUserId),
      };

      const newChatDocument = new Chat(chatData);
      const newChat = await createAChatUseCase(dependencies).execute(newChatDocument);

      res.status(201).json({
        message: "One-to-one chat created successfully",
        chat: newChat,
        success:true
      });
    } catch (error: any) {
      console.error("Error creating chat:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};
