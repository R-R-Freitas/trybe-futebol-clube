import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';
import { MatchAndTeams, IMatchesModel } from '../protocols';

export default class MatchesRepository implements IMatchesModel {
  constructor(private model = Matches) {
    this.model = model;
  }

  async getAllMatches(): Promise<MatchAndTeams[]> {
    const matches = await this.model.findAll(
      { include: [
        { model: Teams, foreignKey: 'homeTeam', as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, foreignKey: 'awayTeam', as: 'teamAway', attributes: ['teamName'] },
      ] },
    );
    return matches as unknown as MatchAndTeams[];
  }

  async getMatchesByProgressStatus(inProgress: boolean): Promise<MatchAndTeams[]> {
    const matches = await this.model.findAll(
      { where: {
        inProgress,
      },
      include: [
        { model: Teams, foreignKey: 'homeTeam', as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, foreignKey: 'awayTeam', as: 'teamAway', attributes: ['teamName'] },
      ] },
    );
    return matches as unknown as MatchAndTeams[];
  }
}
