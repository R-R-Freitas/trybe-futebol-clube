import * as express from 'express';
import loginFactory from '../factories/loginFactories';
import loginValidations from './loginValidations';

const router = express.Router();

router.post(
  '/login',
  loginValidations,
  (req, res, next) => (loginFactory().create(req, res, next)),
);

export default router;
