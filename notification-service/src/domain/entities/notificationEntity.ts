import { ObjectId } from "mongoose";


export interface NotificationEntity {
    _id?: string;
    userId: ObjectId;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    isRead: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  