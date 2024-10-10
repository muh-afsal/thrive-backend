import {User} from "../models/UserSchema"
import { userSchemaEntity } from "../../../../domain/entities"

export const signup = async (
    data: userSchemaEntity
) : Promise<userSchemaEntity | null > => {
    try {
        console.log(data,"reached sighn up repository ----");
        
        const newUser = await User.create(data)
        console.log(newUser,"user created succcesfully")
        
        if (!newUser) {
            throw new Error("User creation failed!");
        }

        return newUser as userSchemaEntity;
    } catch (error: any) {
        throw new Error(error?.message);
    }
}