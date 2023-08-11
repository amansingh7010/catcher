import request from 'supertest';

import { app } from '../../app';

it('has a route handler listening to /api/leaderboard for get requests', async () => {
  const response = await request(app).get('/api/leaderboard').send({});

  expect(response.status).not.toEqual(404);
});

it('returns all players in descending order', async () => {
  const playerOneName = 'Player One Name';
  const playerOneScore = 500;
  const playerTwoName = 'Player Two Name';
  const playerTwoScore = 200;
  const playerThreeName = 'Player Three Name';
  const playerThreeScore = 900;

  await request(app)
    .post('/api/leaderboard')
    .send({ name: playerOneName, score: playerOneScore })
    .expect(201);

  await request(app)
    .post('/api/leaderboard')
    .send({ name: playerTwoName, score: playerTwoScore })
    .expect(201);

  await request(app)
    .post('/api/leaderboard')
    .send({ name: playerThreeName, score: playerThreeScore })
    .expect(201);

  const response = await request(app)
    .get('/api/leaderboard')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
  expect(response.body[0].score).toEqual(playerThreeScore);
  expect(response.body[1].score).toEqual(playerOneScore);
  expect(response.body[2].score).toEqual(playerTwoScore);
});
