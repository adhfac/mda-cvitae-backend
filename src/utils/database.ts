import mongoose from 'mongoose';
import { DATABASE_URL } from './env';

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: 'portofolio',
    });

    return Promise.resolve('Database Connected');
  } catch (e) {
    return Promise.reject(e);
  }
};

export default connect;
