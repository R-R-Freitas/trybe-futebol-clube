import { NextFunction, Request, Response } from 'express';
import { IMatchesService } from '../protocols';

export default class MatchesController {
  constructor(private service: IMatchesService) {
    this.service = service;
  }

  async getAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query.inProgress) {
        const inProgress = (req.query.inProgress as string).toLowerCase() === 'true';
        const matches = await this.service.getMatchesByProgressStatus(inProgress);
        return res.status(200).json(matches);
      }
      const matches = await this.service.getAllMatches();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
