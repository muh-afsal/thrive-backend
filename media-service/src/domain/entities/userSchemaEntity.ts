import { ObjectId } from "mongoose";

export interface Subscription {
  paymentStatus: string;
  planType: string;
  isProUser: boolean;
  planStarted:Date,
  planExpiration:Date,
  isActive: boolean;
}

export interface Transaction {
  transactionType: string;
  message: string;
  date: Date;
  amount: number;
  transactionID: string;
}

export enum Role {
  user = 'user',
  admin = 'admin'
}

export interface userSchemaEntity {
  _id?: ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
  isAdmin?: boolean;
  isBlocked?: boolean;
  bio?: string;
  address?: string;
  profession?: string;
  profileImage?: string;
  subscription?: Subscription[];
  transactions?: Transaction[];
}
