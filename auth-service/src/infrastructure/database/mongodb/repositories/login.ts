import {User}  from "../models/UserSchema";
import { authSignUpEntity } from "../../../../domain/entities";
import { authLoginEntity } from "../../../../domain/entities";
import bcrypt from "bcrypt"

export const login=async(data:authLoginEntity): Promise<authSignUpEntity | null > =>{
    try{
        console.log(data,"login credential got -------------")
        const user : authSignUpEntity | null =  await User.findOne({email:data.email})
        console.log(user,'new user,repo,signup=====================')
        if(user){
            const isMatch : boolean = await bcrypt.compare(data.password,user.password)
            if(!isMatch){
                throw new Error("Username or password incorrect");
            }else{
                return user as authSignUpEntity;
            }
        }else{
            throw new Error("User not found!");
        }
    }catch(error:any){
        throw new Error(error?.message);
    }
}