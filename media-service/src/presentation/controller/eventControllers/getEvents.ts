import { Request, Response, NextFunction } from "express";
import { Event } from "../../../infrastructure/database/mongodb/models/eventSchema";
import { IDependencies } from "../../../application/interface/IDependencies";

export const fetchAllEventsController =(dependencies: IDependencies) => {

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { userId } = req.params;
      
  try {
    
    const events = await Event.find({ adminId: userId });

    res.status(200).json({
      message: "Events fetched successfully",
      events,
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
}
