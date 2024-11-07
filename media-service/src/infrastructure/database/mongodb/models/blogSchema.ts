import mongoose, { Schema } from 'mongoose';
import { BlogEntity } from '../../../../domain/entities/blogEntity'; 

const blogSchema: Schema<BlogEntity> = new Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachment: {
      type: String,
    },
    attachmentType: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        commentor: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: {
          type: String,
        },
        commentedOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Blog = mongoose.model<BlogEntity>('Blog', blogSchema);
