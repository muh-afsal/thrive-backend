import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttachment {
  url: string;
  type: string;
}

export interface ChatMessageEntity extends Document {
  sender: mongoose.Types.ObjectId | undefined; 
  content: string;
  attachments: IAttachment[] | null; 
  chat: mongoose.Types.ObjectId; 
  createdAt: Date; 
  updatedAt: Date;
}