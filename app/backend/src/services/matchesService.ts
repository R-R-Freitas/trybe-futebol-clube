import { IMatchesService, IMatchesModel, MatchAndTeams, Match, NewMatch } from '../protocols';

export default class MatchesService implements IMatchesService {
  constructor(private model: IMatchesModel) {
    this.model = model;
  }

  async getAllMatches(): Promise<MatchAndTeams[]> {
    const matches = await this.model.getAllMatches();
    return matches;
  }

  async getMatchesByProgressStatus(inProgress: boolean): Promise<MatchAndTeams[]> {
    const matches = await this.model.getMatchesByProgressStatus(inProgress);
    return matches;
  }

  async createMatch(newMatch: NewMatch): Promise<Match> {
    const match = await this.model.createMatch(newMatch);
    return match;
  }
}
