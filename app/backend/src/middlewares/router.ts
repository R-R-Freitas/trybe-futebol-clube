import * as express from 'express';
import { loginFactory, teamsFactory } from '../factories';
import loginValidations from './loginValidations';
import authToken from './authToken';

const router = express.Router();

router.post(
  '/login',
  loginValidations,
  (req, res, next) => (loginFactory().create(req, res, next)),
);

router.get(
  '/login/validate',
  authToken,
);

router.get(
  '/teams',
  (req, res, next) => (teamsFactory().getAllTeams(req, res, next)),
);

router.get(
  '/teams/:id',
  (req, res, next) => (teamsFactory().getTeamById(req, res, next)),
);

export default router;
