import mongoose from 'mongoose';
import { encrypt } from '../utils/encryption';

export interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Schema = mongoose.Schema;

const userSchema = new Schema<User>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: 'user.jpg' },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = encrypt(user.password);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;
