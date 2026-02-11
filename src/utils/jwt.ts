import jwt from 'jsonwebtoken';
import { SECRET } from './env';
import { IUserToken } from './interface';

// Generate JWT token valid 1 jam
export const generateToken = (user: IUserToken): string => {
  return jwt.sign(user, SECRET, { expiresIn: '1h' });
};

export const getUserData = (token: string) => {
  return jwt.verify(token, SECRET) as IUserToken;
};
