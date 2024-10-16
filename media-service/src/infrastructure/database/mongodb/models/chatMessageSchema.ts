// models/chatMessageSchema.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { ChatMessageEntity } from "../../../../domain/entities"; 

const chatMessageSchema: Schema<ChatMessageEntity> = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String, 
    },
    attachments: {
      type: [
        {
          url: { type: String },
          type: { type: String }, 
        },
      ],
      default: [],
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

// Create the model from the schema
export const ChatMessage: Model<ChatMessageEntity> = mongoose.model<ChatMessageEntity>(
  "ChatMessage",
  chatMessageSchema
);
