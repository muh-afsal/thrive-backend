import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/IDependencies";
import { Event } from "../../../infrastructure/database/mongodb/models/eventSchema";
import { publishToQueue } from "../../../infrastructure/rabbitMQ/publisher";

export const manageEventController = (dependencies: IDependencies) => {
  const {
    useCases: { addEventUseCase, editEventUseCase, deleteEventUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { action, eventId, ...eventData } = req.body;

    try {
      if (Array.isArray(eventData.members)) {
        eventData.members = eventData.members.map((userId: any) => ({ userId }));
      }

      let event;
      switch (action) {
        case "add":
          event = new Event(eventData);
          
          const addedEvent = await addEventUseCase(dependencies).execute(event);
          
          const populatedEvent = await Event.findById(addedEvent?._id)
          .populate("adminId", "firstName lastName email")
          
          console.log(populatedEvent, 'this is new event ------------------------');


          // const notificationData = {
          //   admin: {
          //     _id: populatedEvent?.adminId._id,
          //     firstName: populatedEvent?.adminId.firstName,
          //     lastName: populatedEvent?.adminId.lastName,
          //     email: populatedEvent?.adminId.email,
          //   },
          //   members: populatedEvent?.members.map((member: any) => ({
          //     userId: member.userId._id,
          //     email: member.userId.email,
          //   })) || [], // Provide a default empty array if members are undefined
          //   eventDetails: {
          //     title: addedEvent?.title,
          //     date: addedEvent?.date,
          //     startTime: addedEvent?.startTime,
          //     endTime: addedEvent?.endTime,
          //     description: addedEvent?.description,
          //   },
          // };

          // await publishToQueue("sendEventEmailQueue", notificationData);

          res.status(201).json({
            message: "Event added successfully",
            event: addedEvent,
            success: true,
          });
          break;

        case "edit":
          if (!eventId) {
            return res.status(400).json({ message: "Event ID is required for editing." });
          }
          event = await editEventUseCase(dependencies).execute(eventId, eventData);

          const editedEvent = await Event.findById(eventId)
            .populate("adminId", "firstName lastName email")

            
            

          // const editNotificationData = {
          //   admin: {
          //     _id: editedEvent?.adminId._id,
          //     firstName: editedEvent?.adminId.firstName,
          //     lastName: editedEvent?.adminId.lastName,
          //     email: editedEvent?.adminId.email,
          //   },
          //   members: editedEvent?.members.map((member: any) => ({
          //     userId: member.userId._id,
          //     email: member.userId.email,
          //   })) || [],
          //   eventDetails: {
          //     title: editedEvent?.title,
          //     date: editedEvent?.date,
          //     startTime: editedEvent?.startTime,
          //     endTime: editedEvent?.endTime,
          //     description: editedEvent?.description,
          //   },
          // };

          // await publishToQueue("sendEventEmailQueue", editNotificationData);

          res.status(200).json({
            message: "Event edited successfully",
            event,
            success: true,
          });
          break;

        case "delete":
          if (!eventId) {
            return res.status(400).json({ message: "Event ID is required for deletion." });
          }
          await deleteEventUseCase(dependencies).execute(eventId);
          res.status(200).json({
            message: "Event deleted successfully",
            success: true,
          });
          break;

        default:
          res.status(400).json({ message: "Invalid action type." });
          break;
      }
    } catch (error: any) {
      console.error("Error managing event:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};
