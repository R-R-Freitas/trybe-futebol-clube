import { Request, Response, NextFunction } from 'express';
import { LeaderboardTeam, Team, MatchAndTeams } from '../protocols';

const currentTeamStarter: LeaderboardTeam = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const draw = (team: LeaderboardTeam, match: MatchAndTeams) => ({
  name: team.name,
  totalPoints: team.totalPoints + 1,
  totalGames: team.totalGames + 1,
  totalVictories: team.totalVictories,
  totalDraws: team.totalDraws + 1,
  totalLosses: team.totalLosses,
  goalsFavor: team.goalsFavor + match.awayTeamGoals,
  goalsOwn: team.goalsOwn + match.homeTeamGoals,
  goalsBalance: team.goalsBalance,
  efficiency: 0,
});

const homeWin = (team: LeaderboardTeam, match: MatchAndTeams) => ({
  name: team.name,
  totalPoints: team.totalPoints + 3,
  totalGames: team.totalGames + 1,
  totalVictories: team.totalVictories + 1,
  totalDraws: team.totalDraws,
  totalLosses: team.totalLosses,
  goalsFavor: team.goalsFavor + match.homeTeamGoals,
  goalsOwn: team.goalsOwn + match.awayTeamGoals,
  goalsBalance: team.goalsBalance + match.homeTeamGoals - match.awayTeamGoals,
  efficiency: 0,
});

const homeLoss = (team: LeaderboardTeam, match: MatchAndTeams) => ({
  name: team.name,
  totalPoints: team.totalPoints,
  totalGames: team.totalGames + 1,
  totalVictories: team.totalVictories,
  totalDraws: team.totalDraws,
  totalLosses: team.totalLosses + 1,
  goalsFavor: team.goalsFavor + match.homeTeamGoals,
  goalsOwn: team.goalsOwn + match.awayTeamGoals,
  goalsBalance: team.goalsBalance + match.homeTeamGoals - match.awayTeamGoals,
  efficiency: 0,
});

const awayWin = (team: LeaderboardTeam, match: MatchAndTeams) => ({
  name: team.name,
  totalPoints: team.totalPoints + 3,
  totalGames: team.totalGames + 1,
  totalVictories: team.totalVictories + 1,
  totalDraws: team.totalDraws,
  totalLosses: team.totalLosses,
  goalsFavor: team.goalsFavor + match.awayTeamGoals,
  goalsOwn: team.goalsOwn + match.homeTeamGoals,
  goalsBalance: team.goalsBalance + match.awayTeamGoals - match.homeTeamGoals,
  efficiency: 0,
});

const awayLoss = (team: LeaderboardTeam, match: MatchAndTeams) => ({
  name: team.name,
  totalPoints: team.totalPoints,
  totalGames: team.totalGames + 1,
  totalVictories: team.totalVictories,
  totalDraws: team.totalDraws,
  totalLosses: team.totalLosses + 1,
  goalsFavor: team.goalsFavor + match.awayTeamGoals,
  goalsOwn: team.goalsOwn + match.homeTeamGoals,
  goalsBalance: team.goalsBalance + match.awayTeamGoals - match.homeTeamGoals,
  efficiency: 0,
});

const leaderboardHomeCreation = (req: Request, _res: Response, next: NextFunction) => {
  const { teams, matches } = req.body;
  const leaderboardHome: LeaderboardTeam[] = teams.map((team: Team) => {
    let currentTeam: LeaderboardTeam = currentTeamStarter;
    currentTeam.name = team.teamName;
    matches.forEach((match: MatchAndTeams) => {
      if (team.id === match.homeTeam) {
        if (match.homeTeamGoals > match.awayTeamGoals)currentTeam = homeWin(currentTeam, match);
        if (match.homeTeamGoals < match.awayTeamGoals)currentTeam = homeLoss(currentTeam, match);
        if (match.homeTeamGoals === match.awayTeamGoals)currentTeam = draw(currentTeam, match);
      }
    });
    currentTeam.efficiency = Math.round(
      (currentTeam.totalPoints / (currentTeam.totalGames * 3)) * 100 * 100,
    ) / 100;
    return currentTeam;
  });
  req.body.leaderboardHome = leaderboardHome;
  next();
};

const leaderboardAwayCreation = (req: Request, res: Response, next: NextFunction) => {
  const { teams, matches } = req.body;
  const leaderboardAway: LeaderboardTeam[] = teams.map((team: Team) => {
    let currentTeam: LeaderboardTeam = currentTeamStarter;
    currentTeam.name = team.teamName;
    matches.forEach((match: MatchAndTeams) => {
      if (team.id === match.awayTeam) {
        if (match.awayTeamGoals > match.homeTeamGoals)currentTeam = awayWin(currentTeam, match);
        if (match.awayTeamGoals < match.homeTeamGoals)currentTeam = awayLoss(currentTeam, match);
        if (match.awayTeamGoals === match.homeTeamGoals)currentTeam = draw(currentTeam, match);
      }
    });
    currentTeam.efficiency = Math.round(
      (currentTeam.totalPoints / (currentTeam.totalGames * 3)) * 100 * 100,
    ) / 100;
    return currentTeam;
  });
  req.body.leaderboardAway = leaderboardAway;
  next();
};

const orderStep4 = (team1: LeaderboardTeam, team2: LeaderboardTeam) => {
  if (team1.goalsFavor > team2.goalsFavor) return -1;
  if (team1.goalsFavor < team2.goalsFavor) return 1;
  return 0;
};

const orderStep3 = (team1: LeaderboardTeam, team2: LeaderboardTeam) => {
  if (team1.goalsBalance > team2.goalsBalance) return -1;
  if (team1.goalsBalance < team2.goalsBalance) return 1;
  if (team1.goalsBalance === team2.goalsBalance) return orderStep4(team1, team2);
};

const orderStep2 = (team1: LeaderboardTeam, team2: LeaderboardTeam) => {
  if (team1.totalVictories > team2.totalVictories) return -1;
  if (team1.totalVictories < team2.totalVictories) return 1;
  if (team1.totalVictories === team2.totalVictories) return orderStep3(team1, team2);
};

const orderStep1 = (team1: LeaderboardTeam, team2: LeaderboardTeam) => {
  if (team1.totalPoints > team2.totalPoints) return -1;
  if (team1.totalPoints < team2.totalPoints) return 1;
  if (team1.totalPoints === team2.totalPoints) return orderStep2(team1, team2);
};

const leaderboardOrder = (req: Request, res: Response, _next: NextFunction) => {
  const { leaderboardAway, leaderboardHome } = req.body;
  if (!leaderboardAway) {
    return res.status(200).json(
      leaderboardHome.sort(
        (team1: LeaderboardTeam, team2: LeaderboardTeam) => orderStep1(team1, team2),
      ),
    );
  }
  if (!leaderboardHome) {
    return res.status(200).json(
      leaderboardAway.sort(
        (team1: LeaderboardTeam, team2: LeaderboardTeam) => orderStep1(team1, team2),
      ),
    );
  }
};

export { leaderboardAwayCreation, leaderboardHomeCreation, leaderboardOrder };
