import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError';

const notFound = 'Token not found';
const secret = process.env.JWT_SECRET;

const authToken = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;
  if (!token) throw new CustomError(notFound, 401);
  const user = jwt.verify(token, secret as jwt.Secret) as jwt.JwtPayload;
  req.body.user = user;
  next();
};

const getRole = (req: Request, res: Response, _next: NextFunction) => {
  const { role } = req.body.user;
  return res.status(200).json({ role });
};

export {
  authToken,
  getRole,
};
