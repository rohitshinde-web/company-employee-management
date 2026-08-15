
import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants/statusCodes";
import { JwtUtil } from "../utils/jwt.util";
export const authenticate = (req: Request, res: Response, next: NextFunction): void =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(
            new AppError('Authentication requried. Missing or malformed Bearer token', HTTP_STATUS.UNAUTHORIZED)
        )
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = JwtUtil.verifyAccessToken(token);
        req.currentUser = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next();
    }catch{
        return next(
            new AppError('Access token expired or invalid signature', HTTP_STATUS.UNAUTHORIZED)
        )
    }
}