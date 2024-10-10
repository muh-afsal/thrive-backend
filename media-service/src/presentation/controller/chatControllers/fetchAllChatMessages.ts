import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";

export const fetchAllChatMessagesController = (dependencies: IDependencies) => {
  const {
    useCases: { fetchAllChatMessagesUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { chatId } = req.query;

      if (!chatId || typeof chatId !== 'string') {
        res.status(400).json({ message: "Invalid chat ID provided." });
        return;
      }

      const chatMessages = await fetchAllChatMessagesUseCase(dependencies).execute(
        chatId
      );

      res.status(200).json({
        success: true,
        message: "Chats fetched successfully",
        chatMessages,
      });
    } catch (error: any) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};
