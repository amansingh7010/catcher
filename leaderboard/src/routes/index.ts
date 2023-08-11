import express, { Request, Response } from 'express';

import { Player } from '../models/player';

const router = express.Router();

router.get('/api/leaderboard', async (req: Request, res: Response) => {
  const players = await Player.find({}).sort('-score');
  res.send(players);
});

export { router as getPlayersRouter };
