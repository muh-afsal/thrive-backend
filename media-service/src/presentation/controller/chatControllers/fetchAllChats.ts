import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";

export const fetchAllChatsController = (dependencies: IDependencies) => {
  const {
    useCases: { fetchAllChatsUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.params; 
      const chats = await fetchAllChatsUseCase(dependencies).execute(userId);

      res.status(200).json({
        success: true,
        message: "Chats fetched successfully",
        chats,
      });
    } catch (error: any) {
      console.error("Error fetching chats:", error);
      res.status(400).json({ message: "Server error", error: error.message });
    }
  };
};
