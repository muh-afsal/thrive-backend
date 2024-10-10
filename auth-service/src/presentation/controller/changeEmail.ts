import { Request, Response } from 'express';
import { User } from '../../infrastructure/database/mongodb/models/UserSchema';
import { publishCreatedUser } from '../../infrastructure/rabbitMQ/publisher';

export const changeEmailController = async (req: Request, res: Response) => {
  const { currentEmail, newEmail } = req.body;

  console.log(currentEmail, newEmail, 'pppppppppppppppppppppppppppppppppppppppp');

  try {
    if (!currentEmail || !newEmail) {
      return res.status(400).json({ message: 'Current email and new email are required',success:false });
    }

    const user = await User.findOne({ email: currentEmail }).exec();

    if (!user) {
      console.log("User not found !!!!!!!!!!!!!!");
      return res.status(404).json({ message: 'User not found',success:false });
    }

    user.email = newEmail;
    await user.save();

    await publishCreatedUser("userDataQueue", user);

    res.status(200).json({ message: 'Email updated successfully', success:true });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Server error', error ,success:false});
  }
};
