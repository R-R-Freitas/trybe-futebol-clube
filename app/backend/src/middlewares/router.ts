import * as express from 'express';
import loginFactory from '../factories/loginFactories';

const router = express.Router();

router.post(
  '/login',
  (req, res, next) => (loginFactory().create(req, res, next)),
);

export default router;
