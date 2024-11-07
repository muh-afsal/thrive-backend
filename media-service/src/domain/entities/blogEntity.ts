import mongoose, { Document, Types } from 'mongoose';

export interface BlogEntity extends Document {
  heading?: string;
  content?: string;
  attachment?: string | null;
  attachmentType?: string | null;
  thumbnail?: string | null;
  author?: Types.ObjectId;
  isBlocked?: boolean;
  createdAt?: Date;
  likes?: Types.ObjectId[]; 
  comments?: {
    commentor?: Types.ObjectId;
    comment?: string;
    commentedOn?: Date;
  }[];
}
