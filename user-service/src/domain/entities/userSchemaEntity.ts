import { ObjectId } from "mongodb";

export interface Subscription {
  paymentStatus: string;
  expiration: Date;
  planType: string;
  isProUser: boolean;
  isActive: boolean;
}

export interface Transaction {
  transactionType: string;
  message: string;
  date: Date;
  amount: number;
  transactionID: string;
}

export interface userSchemaEntity {
  _id?: ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  isBlocked?: boolean;
  bio?: string;
  address?: string;
  profession?: string;
  profileImage?: string;
  subscription?: Subscription[];
  transactions?: Transaction[];
}
