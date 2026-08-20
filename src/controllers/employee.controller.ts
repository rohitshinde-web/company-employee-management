import { HTTP_STATUS } from '../constants/statusCodes';
import { Request, Response } from 'express';
import { employeeService } from '../service/employee.service';
import { CreateEmployeeDTO, EmployeeQueryDTO, UpdateEmployeeDTO } from '../types/dto/employee.dto';
import { ApiResponse } from '../utils/api.response';
import { asyncHandler } from '../utils/asyncHandler';
import { IEmployeeResponse } from '../interfaces/employee.interface';
import { AppError } from '../utils/AppError';
import { FileSystemUtil } from '../utils/fileSystem.util';
import { employeeRepository } from '../repositories/employee.respository';

export class EmployeeController {
  public create = asyncHandler(async (req: Request, res: Response) => {
    const dto: CreateEmployeeDTO = req.body;
    const createdEmployee = await employeeService.createEmployee(dto);

    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: 'Employee created successfully',
      data: createdEmployee,
    });
  });

  public getAll = asyncHandler(async (req: Request, res: Response) => {
    const query: EmployeeQueryDTO = req.query;
    const result = await employeeService.getEmployees(query);

    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Employees retrieved successfully',
      data: result.items,
      pagination: result.pagination,
    });
  });

  public getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);

    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Employee retrieved successfully',
      data: employee,
    });
  });

  public update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const dto: UpdateEmployeeDTO = req.body;
    const updateEmployee = await employeeService.updateEmployee(id, dto);

    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Employee record updated successfully',
      data: updateEmployee,
    });
  });

  public delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await employeeService.deleteEmployee(id);

    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Employee record deactivated successfully',
    });
  });

  public uploadProfileImage = asyncHandler(async (req: Request, res: Response)=>{
    const {id} = req.params;
    const file = req.file;

    const updatedEmployee = await employeeService.uploadProfileAvtar(id, file);
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: "Employee profile picture uploaded successfully",
      data: updatedEmployee
    })
  })
}

export const employeeController = new EmployeeController();
