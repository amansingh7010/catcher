import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { getPlayersRouter } from './routes';
import { createPlayerRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(getPlayersRouter);
app.use(createPlayerRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
