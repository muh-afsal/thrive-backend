import { EventEntity } from "../../../../../domain/entities/eventEntity"; 
import { Event } from "../../models/eventSchema";

export const addEventRepo = async (eventData: EventEntity) => {
  try {
    
    const newEvent = new Event(eventData);
    
    const response= await newEvent.save();
    return response
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const editEventRepo = async (eventId: string, eventData: Partial<EventEntity>) => {
  try {
    const response=await Event.findByIdAndUpdate(eventId, eventData, { new: true });
    return response
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteEventRepo = async (eventId: string) => {
  try {
    await Event.findByIdAndDelete(eventId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
