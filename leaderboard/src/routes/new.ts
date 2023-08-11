import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';
import { Player } from '../models/player';

const router = express.Router();

router.post(
  '/api/leaderboard',
  [
    body('name').not().isEmpty().withMessage('Player name is required'),
    body('score').not().isEmpty().withMessage('Invalid score'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, score } = req.body;

    const player = Player.build({ name, score });
    await player.save();

    res.status(201).send(player);
  }
);

export { router as createPlayerRouter };
