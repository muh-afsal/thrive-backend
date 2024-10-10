import { User } from '../models/UserSchema';
import { userSchemaEntity } from '../../../../domain/entities/userSchemaEntity'; 

export const saveUserToDatabase = async (userData: userSchemaEntity) => {
  try {
    const { email, _id, ...rest } = userData;  

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      await User.updateOne({ email }, { $set: rest });
      console.log(`User with email ${email} updated successfully.`);
    } else {
      const newUser = new User(userData);
      await newUser.save();
      console.log(`User with email ${email} saved successfully.`);
    }
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
};
