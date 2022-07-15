import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError';

const invalidToken = 'Token must be a valid token';
const secret = process.env.JWT_SECRET;

const authToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;
    const user = jwt.verify(token, secret as jwt.Secret) as jwt.JwtPayload;
    req.body.user = user;
    next();
  } catch (error) {
    next(new CustomError(invalidToken, 401));
  }
};

const getRole = (req: Request, res: Response, _next: NextFunction) => {
  const { role } = req.body.user;
  return res.status(200).json({ role });
};

export {
  authToken,
  getRole,
};
