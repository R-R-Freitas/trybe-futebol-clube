import Team from './Team';

export default interface ITeamsService {
  getTeamById(id: number): Promise<Team>;
  getAllTeams(): Promise<Team[]>;
}
