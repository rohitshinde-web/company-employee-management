import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { HTTP_STATUS } from '../constants/statusCodes';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(
    `Cannot find resource at route path: ${req.originalUrl}`,
    HTTP_STATUS.NOT_FOUND,
  );
  next(error);
};
