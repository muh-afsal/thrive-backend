import mongoose, { Schema } from "mongoose";
import { CallLogsEntity } from "../../../../domain/entities";

const callLogsSchema: Schema<CallLogsEntity> = new Schema(
  {
    roomId: { type: String },
    participants: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    startTime: { type: Date },
    endTime: { type: Date },
    duration: { type: String },
    callType: { type: String, enum: ["audio", "video"] },
  },
  { timestamps: true }
);

export const CallLogs = mongoose.model<CallLogsEntity>("CallLogs", callLogsSchema);
