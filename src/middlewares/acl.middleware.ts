import { Response, NextFunction } from 'express';
import { IReqUser } from '../utils/interface';
import response from '../utils/response';

export default function authGuard(
  req: IReqUser,
  res: Response,
  next: NextFunction
) {
  const user = req.user;

  if (!user) {
    return response.unauthorized(res, 'Unauthorized: please login first');
  }

  next();
}
