import { HTTP_STATUS } from "../constants/statusCodes";
import { leaveService } from "../service/leave.service";
import { ApiResponse } from "../utils/api.response";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export class LeaveController {
    public apply = asyncHandler(async (req: Request, res: Response) => {
        const leave = await leaveService.applyLeave(req.body);
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.CREATED,
            message: 'Leave application submitted',
            data: leave
        })
    });

    public updateStatus = asyncHandler(async (req:Request, res:Response) =>{
        const leave = await leaveService.updateLeaveStatus(req.params.id, req.body);
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: `Leave request ${leave.status.toLowerCase()}`,
            data: leave
        });
    });

    public getEmployeeLeaves = asyncHandler(async (req:Request, res:Response) =>{
        const leaves = await leaveService.getEmployeeLeaves(req.params.employeeId);
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: 'Leave records retrieved',
            data: leaves
        });
    });
}

export const leaveController = new LeaveController();