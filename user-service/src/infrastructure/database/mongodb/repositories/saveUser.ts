import { User } from '../../mongodb/models/userSchema';  
import { userSchemaEntity } from '../../../../domain/entities';

export const saveUserToDatabase = async (
    userData: userSchemaEntity
): Promise<userSchemaEntity | null> => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        console.log('User saved to database successfully');
        
        return newUser as userSchemaEntity;
    } catch (error: any) {
        console.error('Error saving user to database:', error.message);
        throw new Error(error?.message);
    }
};
