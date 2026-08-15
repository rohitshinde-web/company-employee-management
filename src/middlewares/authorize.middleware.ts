import { Request, Response, NextFunction } from "express";
import { UserRole } from "../constants/userRoles";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants/statusCodes";


export const authorize = (...allowedRoles: UserRole[]) => {
    return (req: Request, _res:Response, next: NextFunction): void =>{
        if(!req.currentUser){
            return next(
                new AppError('Authentication context missing. Ensure authenticate middleware precedes authorize.', HTTP_STATUS.UNAUTHORIZED)
            );
        }

        const {role} = req.currentUser;
        if(!allowedRoles.includes(role)){
            return next(
                new AppError(
                    `Access forbidden. User role '${role}' does not possess permissions to access this resource. Requreid roles: [${allowedRoles.join(', ')}]`,
                    HTTP_STATUS.FORBIDDEN
                )
            )
        }
        next();
    }
}