import { ObjectId } from "mongoose";

export interface Transaction {
    transactionType: "credit" | "debit";
    message: string;
    date: Date;
    amount: number;
    transactionID: string;
}

export interface Subscription {
    paymentStatus: "pending" | "paid";
    expiration: Date;
    planType: string;
    isActive: boolean;
}

export interface userSchemaEntity {
    _id ?: ObjectId;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    role?: string;
    isBlocked?: boolean;

    bio?: String; 
    address?: string;
    profession?: string;
    profileImage?: string;

    subscription?: Subscription[];
    transactions?: Transaction[];
}
