import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import mongoose, { Types } from "mongoose";
import { ChatEntity } from "../../../domain/entities/chatEntity"; 
import { Chat } from "../../../infrastructure/database/mongodb/models/chatSchema";

export const createAGroupChatController = (dependencies: IDependencies) => {
  
  const {
    useCases: { createAChatUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {name,participants,groupIcon,currentUserId } = req.body;

      // console.log(name,participants,'group details ((((((((((((((((((((((((((((');
      

      if (!name || !participants ||!currentUserId) {
         res.status(400).json({
          message: "Group name and current user and participants required to proceed further!.",
        });
      }

      // Define chatData as a plain object
      const GroupchatData: Partial<ChatEntity> = {
        name: name,
        isGroupChat: true,
        lastMessage: null,
        participants: participants,
        admin: new Types.ObjectId(currentUserId),
        groupIcon:groupIcon
      };

      const newChatDocument = new Chat(GroupchatData);
      const newChat = await createAChatUseCase(dependencies).execute(newChatDocument);

      res.status(201).json({
        message: "group chat created successfully",
        chat: newChat,
        success:true
      });
    } catch (error: any) {
      console.error("Error creating chat:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};
