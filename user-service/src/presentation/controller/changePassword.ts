import { Request, Response } from 'express';
import {User} from '../../infrastructure/database/mongodb/models/userSchema';
import bcrypt from 'bcrypt';

export const changePasswordController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
    
  try {
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    
    const user = await User.findOne({ email }).exec();
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
