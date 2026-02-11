// Import library dan model
import { Request, Response } from 'express';
import * as Yup from 'yup';
import UserModel from '../models/user.model';
import { encrypt } from '../utils/encryption';
import { generateToken } from '../utils/jwt';
import { IReqUser } from '../utils/interface';
import response from '../utils/response';

type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type TLogin = { identifier: string; password: string };

const regexUppercase = /[A-Z]/;
const regexNumber = /[0-9]/;

const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(6, 'Password must be at least 6 characters')
    .test(
      'at-least-one-uppercase-letter',
      'Contains at least one uppercase letter',
      (value) => !!value && regexUppercase.test(value)
    )
    .test(
      'at-least-one-number',
      'Contains at least one number',
      (value) => !!value && regexNumber.test(value)
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), ''], 'Password must be matching'),
});

export default {
  async register(req: Request, res: Response) {
    /**
     #swagger.tags = ['Auth']
     #swagger.requestBody = {
      required: true,
      schema: {$ref: '#/components/schemas/RegisterRequest'}
     }
     */
    const { fullName, username, email, password, confirmPassword } =
      req.body as TRegister;

    try {
      await registerValidateSchema.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });

      const existUser = await UserModel.findOne({
        $or: [{ email }, { username }],
      });
      if (existUser)
        return response.error(res, null, 'Email or username already exists');

      const result = await UserModel.create({
        fullName,
        username,
        email,
        password,
      });

      response.success(res, result, 'Success Registration');
    } catch (e) {
      response.error(res, e, 'Failed Registration');
    }
  },

  async login(req: Request, res: Response) {
    /**
     #swagger.tags = ['Auth']
     #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/LoginRequest"}
     }
     */
    const { identifier, password } = req.body as TLogin;

    try {
      const user = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
      if (!user) return response.unauthorized(res, 'User not found');

      // Validasi password
      const isPasswordValid = encrypt(password) === user.password;
      if (!isPasswordValid) return response.unauthorized(res, 'Wrong password');

      const token = generateToken({ id: user._id });

      response.success(res, { token }, 'Login Success');
    } catch (e) {
      response.error(res, e, (e as Error).message);
    }
  },

  async me(req: IReqUser, res: Response) {
    /**
     #swagger.tags = ['Auth']
     #swagger.security = [{
       "bearerAuth": []
     }]
     */
    try {
      const user = req.user;
      const result = await UserModel.findById(user?.id).select('-password');
      response.success(res, result, 'Success Get Profile');
    } catch (error) {
      response.error(res, error, (error as Error).message);
    }
  },
};
