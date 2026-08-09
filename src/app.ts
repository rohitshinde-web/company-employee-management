import express, { Application, Request, Response } from 'express';
import { requestLogger } from './middlewares/logger.middleware';
import apiRouter from './routes/api.router';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { globalErrorHandler } from './middlewares/error.middleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use('/api/v1', apiRouter);
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
