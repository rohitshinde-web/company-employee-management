import {Request, Response, NextFunction} from 'express';
import { AppError } from '../utils/AppError';
import {config} from '../config/environment';
import { HTTP_STATUS } from '../constants/statusCodes';


export const globalErrorHandler = (err:AppError, req:Request, res:Response, next:NextFunction): Response =>{
    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let status = 'error';
    let message = 'An internal server error occurred';

    if(err instanceof AppError){
        statusCode = err.statusCode;
        status = err.status;
        message = err.message;
    } else if(err instanceof Error){
            message = err.message;
    }

    if(config.nodeEnv === 'development'){
        return res.status(statusCode).json({
            success: false,
            status,
            message,
            error:err,
            stack: err.stack
        });
    }

    return res.status(statusCode).json({
        success: false,
        status,
        message: err instanceof AppError ? message: 'Something went wrong on the server'
    });
}