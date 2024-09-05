import {ObjectId} from "mongoose"

export interface authLoginEntity{
    _id?: ObjectId,
    email:string,
    password:string
}