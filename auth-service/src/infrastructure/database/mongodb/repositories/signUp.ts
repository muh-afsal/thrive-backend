import {User} from "../models/authCredentials"
import { authSignUpEntity } from "../../../../domain/entities"

export const signup = async (
    data: authSignUpEntity
) : Promise<authSignUpEntity | null > => {
    try {
        console.log(data,"reached sighn up repository ----");
        
        const newUser = await User.create(data)
        console.log(newUser,"user created succcesfully")
        
        if (!newUser) {
            throw new Error("User creation failed!");
        }

        return newUser as authSignUpEntity;
    } catch (error: any) {
        throw new Error(error?.message);
    }
}