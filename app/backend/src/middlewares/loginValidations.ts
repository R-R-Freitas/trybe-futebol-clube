import { Request, Response, NextFunction } from 'express';
import * as joi from 'joi';
import CustomError from '../utils/CustomError';

const missingKeyError = 'All fields must be filled';

const validateKeys = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

function loginValidations(req: Request, _res: Response, next: NextFunction): void {
  const invalidKeys = validateKeys.validate(req.body);
  if (invalidKeys.error) throw new CustomError(missingKeyError, 400);
  next();
}

export default loginValidations;
