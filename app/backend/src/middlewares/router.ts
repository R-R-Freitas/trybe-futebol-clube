import * as express from 'express';
import { loginFactory, teamsFactory, matchesFactory } from '../factories';
import loginValidations from './loginValidations';
import { authToken, getRole } from './authToken';

const router = express.Router();

router.post(
  '/login',
  loginValidations,
  (req, res, next) => (loginFactory().create(req, res, next)),
);

router.get(
  '/login/validate',
  authToken,
  getRole,
);

router.get(
  '/teams',
  (req, res, next) => (teamsFactory().getAllTeams(req, res, next)),
);

router.get(
  '/teams/:id',
  (req, res, next) => (teamsFactory().getTeamById(req, res, next)),
);

router.get(
  '/matches',
  (req, res, next) => (matchesFactory().getAllMatches(req, res, next)),
);

router.post(
  '/matches',
  authToken,
  (req, res, next) => (matchesFactory().createMatch(req, res, next)),
);

router.patch(
  '/matches/:id/finish',
  (req, res, next) => (matchesFactory().finishMatch(req, res, next)),
);

router.patch(
  '/matches/:id',
  (req, res, next) => (matchesFactory().updateMatchScore(req, res, next)),
);

export default router;
