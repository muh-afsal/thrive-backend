import { User } from '../models/UserSchema';
import { userSchemaEntity } from '../../../../domain/entities';

export const searchUsers = async (query: string): Promise<userSchemaEntity[]> => {
    try {
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } }, 
                { email: { $regex: query, $options: 'i' } } 
            ]
        }).exec();

        return users as userSchemaEntity[]; 
    } catch (error: any) {
        console.error('Error fetching users:', error.message);
        throw new Error(error?.message);
    }
};
