import request from 'supertest';

import { app } from '../../app';
import { Player } from '../../models/player';

it('has a route handler listening to /api/leaderboard for post requests', async () => {
  const response = await request(app).post('/api/leaderboard').send({});

  expect(response.status).not.toEqual(404);
});

it('creates a player with valid inputs', async () => {
  const name = 'Player Name';
  const score = 500;

  await request(app).post('/api/leaderboard').send({ name, score }).expect(201);

  const players = await Player.find({});
  expect(players.length).toEqual(1);
  expect(players[0].name).toEqual(name);
  expect(players[0].score).toEqual(score);
});

it('returns an error if invalid name or score is provided', async () => {
  await request(app)
    .post('/api/leaderboard')
    .send({
      name: '',
      score: 200,
    })
    .expect(400);

  await request(app)
    .post('/api/leaderboard')
    .send({
      name: 'Player Name',
    })
    .expect(400);
});
