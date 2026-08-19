import { HTTP_STATUS } from "../constants/statusCodes";
import { analyticsService } from "../service/analytics.service";
import { ApiResponse } from "../utils/api.response";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
export class AnalyticsController {
 public getSalarySummary = asyncHandler(async (_req:Request, res:Response)=>{
 const data = await analyticsService.getDepartmentSalaryMetrics();
   return ApiResponse.success(
    {
        res,
        statusCode: HTTP_STATUS.OK,
        message: "Department Salary Analytics retrived successfully",
        data
    }
   )
 });

 public getSalaryRanks = asyncHandler(async (req: Request, res: Response) =>{
    const data = await analyticsService.getEmployeeSalaryRanks();
    return ApiResponse.success({
        res,
        statusCode: HTTP_STATUS.OK,
        message: "Employee department Salary ranking computed",
        data
    })
 });

 public getAttendanceReport = asyncHandler(async (req: Request, res:Response)=>{
    const dateQuery = req.query.date as string | undefined;
    const data = await analyticsService.getDailyAttendanceReport(dateQuery);
    return ApiResponse.success({
        res,
        statusCode: HTTP_STATUS.OK,
        message : "Daily department attendance report compiled",
        data
    })

 });
}

export const analyticsController = new AnalyticsController();