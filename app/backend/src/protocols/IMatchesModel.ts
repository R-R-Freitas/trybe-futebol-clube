import { MatchAndTeams } from './Match';

export default interface ITeamsModel {
  getAllMatches(): Promise<MatchAndTeams[]>;
  getMatchesByProgressStatus(inProgress: boolean): Promise<MatchAndTeams[]>;
}
