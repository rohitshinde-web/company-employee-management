import { HTTP_STATUS } from "../constants/statusCodes";
import { authService } from "../service/auth.service";
import { ApiResponse } from "../utils/api.response";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export class AuthController {
    public login = asyncHandler(async (req: Request, res: Response) =>{
        const result = await authService.login(req.body);
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: "User authenticated successfully",
            data: result,
        })
    });

    public refreshTokens = asyncHandler(async (req:Request, res: Response) =>{
        const tokens = await authService.refreshTokens(req.body);
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: "Tokens refreshed successfully",
            data: tokens,
        });
    });

    public logout = asyncHandler(async (req: Request, res: Response) =>{
        await authService.logout(req.body);
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: "User logged out and session revoked successfully"
        });
    });
}

export const authController = new AuthController();