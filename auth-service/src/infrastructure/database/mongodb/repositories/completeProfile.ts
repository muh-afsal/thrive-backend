import {User} from '../../mongodb/models/UserSchema';
import { userSchemaEntity } from '../../../../domain/entities';

export const completeProfile = async (
    userData: userSchemaEntity
): Promise<userSchemaEntity | null> => {
    try {
        
        const updatedUser = await User.findByIdAndUpdate(
            userData._id,
            {
                $set: {
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    email: userData.email,
                    password: userData.password,
                    // subscription: userData.subscription,
                    // transactions: userData.transactions,
                    address: userData.address,
                    bio: userData.bio,
                    phone: userData.phone,
                    profession: userData.profession,
                    profileImage: userData.profileImage,
                },
            },
            { new: true }
        )
        console.log(updatedUser,'updated dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        
        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser as userSchemaEntity;
    } catch (error: any) {
        console.error('Error updating user profile:', error.message);
        throw new Error(error?.message);
    }
};
