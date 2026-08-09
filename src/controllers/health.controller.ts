import { HTTP_STATUS } from '../constants/statusCodes';
import { healthService } from '../service/health.service';
import { ApiResponse } from '../utils/api.response';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
export class HealthController {
  public checkHealth = asyncHandler(async (_req: Request, res: Response) => {
    const healthData = healthService.getHealthDetails();
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'System service is healthy and running',
      data: healthData,
    });
  });

  public simulateError = asyncHandler(async (_req: Request, res: Response) => {
    throw new Error('Simulated error for testing global error handling');
  });
}

export const healthController = new HealthController();
