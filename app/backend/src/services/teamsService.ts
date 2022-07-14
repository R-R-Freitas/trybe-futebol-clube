import { ITeamsService, ITeamsModel, Team } from '../protocols';

export default class TeamsService implements ITeamsService {
  constructor(private model: ITeamsModel) {
    this.model = model;
  }

  async getTeamById(id: number): Promise<Team> {
    const team = await this.model.getTeamById(id);
    return team;
  }

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.model.getAllTeams();
    return teams;
  }
}
