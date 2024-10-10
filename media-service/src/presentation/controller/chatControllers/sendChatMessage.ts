import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { ChatMessageEntity } from "../../../domain/entities";

export const sendChatMessageController = (dependencies: IDependencies) => {
  const {
    useCases: { sendChatMessageUseCase }, 
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { sender, content, attachments, chat } = req.body;
// console.log(req.body);

   
      const chatMessageData: Partial<ChatMessageEntity> =({
        sender: sender || undefined,
        content,
        attachments: attachments || [], 
        chat, 
      });

      // console.log(chatMessageData,'sender=======================');
      // console.log(chatMessageData.chat,'chat --------------------------------------------------');
      

      if (!chatMessageData.sender || !chatMessageData.chat) { 
        throw new Error('Missing required fields: sender or chat');
      }
      
      const completeChatMessage: ChatMessageEntity = { 
        ...chatMessageData,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as ChatMessageEntity;

      const savedMessage = await sendChatMessageUseCase(dependencies).execute(completeChatMessage);
      
      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        chatMessage: savedMessage,
      });
    } catch (error: any) {
      console.error("Error sending chat message:", error);
      res.status(400).json({ message: "Server error", error: error.message });
    }
  };
};
