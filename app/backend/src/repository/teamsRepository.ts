import Teams from '../database/models/TeamModel';
import { Team, ITeamsModel } from '../protocols';

export default class TeamsRepository implements ITeamsModel {
  constructor(private model = Teams) {
    this.model = model;
  }

  async getTeamById(id: number): Promise<Team> {
    const team = await this.model.findByPk(id);
    return team as Team;
  }

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams as Team[];
  }
}
