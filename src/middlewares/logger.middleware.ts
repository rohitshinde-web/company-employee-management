import { Request, Response, NextFunction} from 'express';

export const requestLogger = (req:Request, res:Response, next:NextFunction): void =>{
    const startMs = Date.now();
    const {method, originalUrl, ip} = req;
    res.on('finish',() =>{
        const elapseMs = Date.now() - startMs;
        const statusCode = res.statusCode;

        console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} | Status: ${statusCode} | ${elapseMs}ms | IP: ${ip}`);
    });
    next();
}