import { ObjectId } from "mongoose";


export interface NotificationEntity {
    _id?: string;
    userId: ObjectId;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  