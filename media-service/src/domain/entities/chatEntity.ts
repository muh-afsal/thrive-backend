import mongoose, { Schema, Document, Model, Types } from "mongoose";


export interface ChatEntity extends Document {
  name: string;
  isGroupChat: boolean;
  lastMessage?: Types.ObjectId | null;
  participants: Types.ObjectId[]; 
  admin: Types.ObjectId; 
  groupIcon:string | null
}
  