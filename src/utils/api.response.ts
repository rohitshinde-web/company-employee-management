import {Response} from 'express';
import { HTTP_STATUS } from '../constants/statusCodes';
import { IPaginationMeta } from '../interfaces/pagination.interface';
import { IAPIResponse } from '../interfaces/apiResponse';

interface SuccessResponseOptions<T> {
    res: Response;
    statusCode?:number;
    message: string;
    data?: T;
    pagination?: IPaginationMeta;
}

export class ApiResponse {
    public static success<T>({
        res,
        statusCode = HTTP_STATUS.OK,
        message,
        data = undefined,
        pagination = undefined,
    }: SuccessResponseOptions<T>): Response<IAPIResponse<T>>{
 
    const responsePayload: IAPIResponse<T> = {
        success: true,
        message,
        data,
        pagination,
        timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(responsePayload);
    }

    
}