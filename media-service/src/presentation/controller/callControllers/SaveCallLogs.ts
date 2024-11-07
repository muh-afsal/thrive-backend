import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { CallLogs } from "../../../infrastructure/database/mongodb/models/callLogsSchema"; 
import { CallLogsEntity } from "../../../domain/entities/callLogsEntity";

const formatDuration = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const saveCallLogsController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { roomId, participants, startTime, endTime, duration, callType } = req.body;
      console.log(req.body,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
      

      const convertedDuration = formatDuration(Math.floor(duration)); // Convert duration to HH:MM:SS format

      const callLog: CallLogsEntity = new CallLogs({
        roomId,
        participants,
        startTime: startTime ? new Date(startTime) : null,
        endTime: endTime ? new Date(endTime) : null,
        duration: convertedDuration, // Save the formatted duration
        callType,
      });

      const savedCallLog = await callLog.save();

      res.status(201).json({ message: "Call log saved successfully", data: savedCallLog });
    } catch (error: any) {
      console.error("Error saving call log:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};
