import { authSignUpEntity } from "../../../../domain/entities";
import  {User}  from "../models/authCredentials";

async function findByEmail(email: string): Promise<authSignUpEntity | null> {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
}

export { findByEmail };
