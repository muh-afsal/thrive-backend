import { Request, Response, NextFunction } from "express";
import { CallLogs } from "../../../infrastructure/database/mongodb/models/callLogsSchema";
import { IDependencies } from "../../../application/interface/IDependencies";

export const fetchCallLogsController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const callLogs = await CallLogs.find();

      res.status(200).json({
        success: true,
        message: "Call logs fetched successfully",
        callLogs,
      });
    } catch (error: any) {
      console.error("Error fetching call logs:", error);
      res.status(400).json({ message: "Server error", error: error.message });
    }
  };
};
