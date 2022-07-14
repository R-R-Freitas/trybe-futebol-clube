import { IMatchesService, IMatchesModel, MatchAndTeams } from '../protocols';

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
}
