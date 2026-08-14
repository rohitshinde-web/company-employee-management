import {Request,Response, NextFunction } from "express";
import { FieldValidationError, validationResult } from "express-validator";
import { fileURLToPath } from "node:url";
import { HTTP_STATUS } from "../constants/statusCodes";
import { timeStamp } from "node:console";

interface FormattedValidatationError {
    field: string;
    message: string;
    value: unknown;
};

export const validate = (req:Request, res:Response, next: NextFunction): Response | void =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const formattedErrors: FormattedValidatationError[] = errors.array().map((error)=>{
            const fieldError = error as FieldValidationError;
            return {
                field: fieldError.path,
                message: fieldError.msg,
                value: fieldError.value
            };
        });
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENITY).json({
        success: false,
        message: "Input validation failed. Please check your request parameters.",
        errors: formattedErrors,
        timeStamp: new Date().toISOString()
    });
    }

    next();
}