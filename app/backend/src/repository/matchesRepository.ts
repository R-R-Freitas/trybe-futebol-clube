import CustomError from '../utils/CustomError';
import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';
import { MatchAndTeams, IMatchesModel, Match, NewMatch } from '../protocols';

const invalidTeam = 'There is no team with such id!';

export default class MatchesRepository implements IMatchesModel {
  constructor(private model = Matches) {
    this.model = model;
  }

  async getAllMatches(): Promise<MatchAndTeams[]> {
    const matches = await this.model.findAll(
      {
        include: [
          { model: Teams, as: 'teamHome', attributes: ['teamName'] },
          { model: Teams, as: 'teamAway', attributes: ['teamName'] },
        ],
      },
    );
    return matches as unknown as MatchAndTeams[];
  }

  async getMatchesByProgressStatus(inProgress: boolean): Promise<MatchAndTeams[]> {
    const matches = await this.model.findAll(
      {
        where: {
          inProgress,
        },
        include: [
          { model: Teams, as: 'teamHome', attributes: ['teamName'] },
          { model: Teams, as: 'teamAway', attributes: ['teamName'] },
        ],
      },
    );
    return matches as unknown as MatchAndTeams[];
  }

  async createMatch(newMatch: NewMatch): Promise<Match> {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;
      const inProgress = true;
      const match = await this.model.create(
        { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress },
      );
      return match as Match;
    } catch (error) {
      throw new CustomError(invalidTeam, 404);
    }
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
