import { TeamWithoutId } from './Team';

export default interface Match {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface MatchAndTeams extends Match {
  teamHome: TeamWithoutId,
  teamAway: TeamWithoutId,
}

export interface NewMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}
