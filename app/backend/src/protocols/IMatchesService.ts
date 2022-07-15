import Match, { MatchAndTeams, NewMatch } from './Match';

export default interface ITeamsService {
  getAllMatches(): Promise<MatchAndTeams[]>;
  getMatchesByProgressStatus(inProgress: boolean): Promise<MatchAndTeams[]>;
  createMatch(match:NewMatch): Promise<Match>;
}
