import mongoose, { Schema } from 'mongoose';
import { NotificationEntity } from '../../../../domain/entities/notificationEntity';

const notificationSchema: Schema<NotificationEntity> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<NotificationEntity>('Notification', notificationSchema);
