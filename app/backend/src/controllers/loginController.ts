import { NextFunction, Request, Response } from 'express';
import generateJWT from '../utils/generateJWT';
import { ILoginService } from '../protocols';

export default class LoginController {
  constructor(private service: ILoginService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.service.create({ email, password });
      const { password: noPassword, ...userWithoutPassword } = user;
      const token = generateJWT(userWithoutPassword);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
