import express, {Application, Request, Response} from 'express';


const app: Application = express();

app.get('/health', (_req: Request, res:Response) =>{
    res.status(200).json({
        status:'success',
        message: 'Company Employee Management API is healthy and operational',
        timeStamp: new Date().toISOString()
    })
});

export default app;