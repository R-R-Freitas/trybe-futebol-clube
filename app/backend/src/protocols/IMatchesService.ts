import { MatchAndTeams } from './Match';

export default interface ITeamsService {
  getAllMatches(): Promise<MatchAndTeams[]>;
  getMatchesByProgressStatus(inProgress: boolean): Promise<MatchAndTeams[]>;
}
