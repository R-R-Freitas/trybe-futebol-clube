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

  async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const match = await this.service.createMatch(req.body);
      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }

  async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.finishMatch(parseInt(id, 10));
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }
}
