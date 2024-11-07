  import mongoose, { Schema,  } from "mongoose";
  import { ChatEntity } from "../../../../domain/entities";


  const chatSchema: Schema<ChatEntity> = new Schema(

    {
      name: {
        type: String,
      },
      isGroupChat: {
        type: Boolean,
        default: false,
      },
      lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "ChatMessage",
      },
      participants: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      admin: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      groupIcon: { type: String }
    },
    { timestamps: true }
  );

  export const Chat= mongoose.model<ChatEntity>("Chat", chatSchema);


