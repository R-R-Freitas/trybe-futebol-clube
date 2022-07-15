import CustomError from '../utils/CustomError';
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
    const { homeTeam, awayTeam } = newMatch;
    const equalTeamsError = 'It is not possible to create a match with two equal teams';
    if (homeTeam === awayTeam) throw new CustomError(equalTeamsError, 401);
    const match = await this.model.createMatch(newMatch);
    return match;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.finishMatch(id);
  }
}
