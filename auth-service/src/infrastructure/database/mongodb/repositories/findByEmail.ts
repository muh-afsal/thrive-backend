import { userSchemaEntity } from "../../../../domain/entities";
import { User } from "../models/UserSchema";

async function findByEmail(email: string): Promise<userSchemaEntity | null> {
    try {
        const user = await User.findOne({ email });
        return user || null; 
    } catch (error) {
        throw error;  
    }
}

export { findByEmail };
