import { NextFunction, Request, Response } from 'express';
import { ITeamsService } from '../protocols';

export default class TeamsController {
  constructor(private service: ITeamsService) {
    this.service = service;
  }

  async getTeamById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.service.getTeamById(parseInt(id, 10));
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  async getAllTeams(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getAllTeams();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async getTeamsForLeaderBoard(req: Request, _res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getAllTeams();
      req.body.teams = teams;
      next();
    } catch (error) {
      next(error);
    }
  }
}
