import Match, { MatchAndTeams, NewMatch } from './Match';

export default interface ITeamsService {
  getAllMatches(): Promise<MatchAndTeams[]>;
  getMatchesByProgressStatus(inProgress: boolean): Promise<MatchAndTeams[]>;
  createMatch(newMatch: NewMatch): Promise<Match>;
  finishMatch(id: number): void;
}
