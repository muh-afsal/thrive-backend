
import { Request, Response } from 'express';
import { getUserById } from '../../infrastructure/database/mongodb/repositories';

export const fetchUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    

    if (user) {
      // console.log(user,'user data------------------------------');
      
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
