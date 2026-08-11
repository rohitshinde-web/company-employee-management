import { HTTP_STATUS } from "../constants/statusCodes";
import { attendanceService } from "../service/attendance.service";
import { ApiResponse } from "../utils/api.response";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export class AttendanceController {
    public checkIn = asyncHandler(async (req:Request, res:Response)=>{
    const {employeeId} = req.body;
    const record = await attendanceService.checkIn(employeeId);
    console.log(record);
    return ApiResponse.success({
        res,
        statusCode: HTTP_STATUS.CREATED,
        message: 'Check-in recorded successfully',
        data: record
    })
    });

    public checkOut = asyncHandler(async (req:Request, res:Response) =>{
        const {employeeId} = req.body;
        const record = await attendanceService.checkOut(employeeId);
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: 'Check-out recorded successfully',
            data: record
        });
    });

    public getHistory = asyncHandler(async (req:Request, res: Response) =>{
        const {employeeId} = req.params;
        const history = await attendanceService.getEmployeeAttendance(employeeId);
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: 'Attendance record retrived',
            data: history
        })
    })
}

export const attendanceController = new AttendanceController();