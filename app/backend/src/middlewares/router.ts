import * as express from 'express';
import loginFactory from '../factories/loginFactories';
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

export default router;
