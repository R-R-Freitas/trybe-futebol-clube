import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import { User } from '../protocols';

export default function generateJWT(userdata: User): string {
  return jwt.sign(userdata, process.env.JWT_SECRET as jwt.Secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
}
