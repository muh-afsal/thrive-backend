import mongoose, { Schema } from 'mongoose';
import { EventEntity } from '../../../../domain/entities/eventEntity'; 

const eventSchema: Schema<EventEntity> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true, 
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '', 
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export const Event = mongoose.model<EventEntity>('Event', eventSchema);
