import { NextFunction, Request, Response } from 'express';

import CustomError from '../utils/CustomError';

function errorMiddleware(err: CustomError, _req: Request, res: Response, _next: NextFunction) {
  return res.status(err.status).json({ message: err.message });
}

export default errorMiddleware;
