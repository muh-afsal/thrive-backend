import { Request, Response } from 'express';

export const logoutController = async (req: Request, res: Response) => {
  try {
    console.log('reached the logout thign))))))))))))))))))');
    
    res.clearCookie('accessToken');

    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Logout failed', error: error });
  }
};
