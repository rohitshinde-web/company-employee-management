import { HTTP_STATUS } from "../constants/statusCodes";
import { Request, Response } from "express";
import { employeeService } from "../service/employee.service";
import { CreateEmployeeDTO, EmployeeQueryDTO, UpdateEmployeeDTO} from "../types/dto/employee.dto";
import { ApiResponse } from "../utils/api.response";
import { asyncHandler } from "../utils/asyncHandler";

export class EmployeeController {
    public create = asyncHandler(async(req: Request, res:Response) =>{
    const dto: CreateEmployeeDTO = req.body;
    const createdEmployee = await employeeService.createEmployee(dto);

    return ApiResponse.success({
        res,
        statusCode: HTTP_STATUS.CREATED,
        message: "Employee created successfully",
        data: createdEmployee
    });
    });

    public getAll = asyncHandler(async(req:Request, res:Response) => {
        const query:EmployeeQueryDTO = req.query;
        const result = await employeeService.getEmployees(query);

        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: "Employees retrieved successfully",
            data: result.items,
            pagination: result.pagination
        })
    })

    public getById = asyncHandler(async (req:Request, res:Response) =>{
    const {id} = req.params;
    const employee = await employeeService.getEmployeeById(id);
    
    return ApiResponse.success({
        res,
        statusCode: HTTP_STATUS.OK,
        message:"Employee retrieved successfully",
        data: employee
    });
    })

    public update = asyncHandler(async (req: Request, res:Response) =>{
        const {id} = req.params;
        const dto: UpdateEmployeeDTO = req.body;
        const updateEmployee = await employeeService.updateEmployee(id, dto);

        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: "Employee record updated successfully",
            data: updateEmployee
        })
    })
}

export const employeeController = new EmployeeController();