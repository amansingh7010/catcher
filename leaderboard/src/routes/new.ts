import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Player } from '../models/player';

const router = express.Router();

router.post('/api/leaderboard', async (req: Request, res: Response) => {
  const { name, score } = req.body;

  const player = Player.build({ name, score });
  await player.save();

  res.status(201).send(player);
});

export { router as createPlayerRouter };
