import {Response} from 'express';
import { HTTP_STATUS } from '../constants/statusCodes';

interface SuccessResponseOptions<T> {
    res: Response;
    statusCode?:number;
    message: string;
    data?: T;
}

export class ApiResponse {
    public static success<T>({
        res,
        statusCode = HTTP_STATUS.OK,
        message,
        data = undefined
    }: SuccessResponseOptions<T>): Response{
        return res.status(statusCode).json({
            success : true,
            message,
            data,
            timeStamp : new Date().toISOString()
        })
    }

    
}