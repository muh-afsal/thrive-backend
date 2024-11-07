import { Document, Types } from "mongoose";

export interface CallLogsEntity extends Document {
  roomId: string;
  participants: Types.ObjectId[]; 
  startTime: Date;
  endTime: Date;
  duration: string;
  callType: "audio" | "video";
}
