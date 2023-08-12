import express, { Request, Response } from 'express';

import { Player } from '../models/player';

const router = express.Router();

// Fetch 100 records sorted by score in descending order
router.get('/api/leaderboard', async (req: Request, res: Response) => {
  const players = await Player.find({}).sort('-score').limit(100);
  res.send(players);
});

export { router as getPlayersRouter };
