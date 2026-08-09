import { HTTP_STATUS } from '../constants/statusCodes';
import { departmentService } from '../service/department.service';
import { ApiResponse } from '../utils/api.response.js';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';

export class DepartmentController {
  public create = asyncHandler(async (req: Request, res: Response) => {
    const department = await departmentService.createDepartment(req.body);
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: 'Department created successfully',
      data: department,
    });
  });

  public getAll = asyncHandler(async (_req: Request, res: Response) => {
    const departments = await departmentService.getDepartments();
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Departments fetched successfully',
      data: departments,
    });
  });

  public getById = asyncHandler(async (req: Request, res: Response) => {
    const department = await departmentService.getDepartmentById(req.params.id);
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Department details retrieved',
      data: department,
    });
  });

  public update = asyncHandler(async (req: Request, res: Response) => {
    const department = await departmentService.updateDepartment(req.params.id, req.body);
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Department updated successfully',
      data: department,
    });
  });

  public delete = asyncHandler(async (req: Request, res: Response) => {
    await departmentService.deleteDepartment(req.params.id);
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Department deleted successfully',
    });
  });
}

export const departmentController = new DepartmentController();
