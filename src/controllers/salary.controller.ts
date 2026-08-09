import { HTTP_STATUS } from '../constants/statusCodes';
import { salaryRepository } from '../repositories/salary.repositories';
import { salaryService } from '../service/salary.service';
import { ApiResponse } from '../utils/api.response';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
export class SalaryController {
  public create = asyncHandler(async (req: Request, res: Response) => {
    const salary = await salaryService.addSalaryRecord(req.body);
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: 'Salary record created successfully',
      data: salary,
    });
  });

  public getHistry = asyncHandler(async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    const history = await salaryService.getEmployeeSalaryHistory(employeeId);
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Employee salary history retrieved',
      data: history,
    });
  });
}

export const salaryController = new SalaryController();
