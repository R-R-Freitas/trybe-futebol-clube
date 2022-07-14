import Team from './Team';

export default interface ITeamsModel {
  getTeamById(id: number): Promise<Team>;
  getAllTeams(): Promise<Team[]>;
}
