import Match, { MatchAndTeams, MatchScore, NewMatch } from './Match';

export default interface ITeamsModel {
  getAllMatches(): Promise<MatchAndTeams[]>;
  getMatchesByProgressStatus(inProgress: boolean): Promise<MatchAndTeams[]>;
  createMatch(newMatch: NewMatch): Promise<Match>;
  finishMatch(id: number): void;
  updateMatchScore(id: number, newScore: MatchScore): void;
}
