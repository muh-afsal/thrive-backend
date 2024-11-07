import { Types } from 'mongoose';

export interface EventEntity {
  _id: Types.ObjectId 
  title: string
  date: Date
  startTime: string
  endTime: string
  description?: string
  adminId: Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}


