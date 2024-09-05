import { ObjectId } from "mongoose";

export enum Role {
    user = 'user',
    admin = 'admin'
  }

export interface authSignUpEntity {
  _id ?: ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  role?: Role;
  isAdmin?: boolean;
  isBlocked?: boolean;
}
