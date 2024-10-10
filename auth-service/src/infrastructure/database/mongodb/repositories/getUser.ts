

import { User } from '../models/UserSchema';
import { userSchemaEntity } from '../../../../domain/entities';

export const getUserById = async (id: string): Promise< userSchemaEntity | null> => {
    try {
        const user= await User.findById(id).exec();
        if (user) {
            return user as userSchemaEntity;
        }
        return null;
    } catch (error: any) {
        console.error('Error updating user profile:', error.message);
        throw new Error(error?.message);
    }
};
