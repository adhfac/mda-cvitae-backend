import { Types } from 'mongoose';
import { Request } from 'express';

export interface IUserToken {
  id?: Types.ObjectId;
}

export interface IReqUser extends Request {
  user?: IUserToken;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}
