import dotenv from 'dotenv';
import path from 'path';

export default dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? '.env' : '.env.dev'
  )
});