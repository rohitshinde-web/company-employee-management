import express, { Application, Request, Response } from 'express';
import { requestLogger } from './middlewares/logger.middleware';
import apiRouter from './routes/api.router';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { globalErrorHandler } from './middlewares/error.middleware';
import helmet from 'helmet';
import { config } from './config/environment.js';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { globalRateLimiter } from './middlewares/rateLimiter.middleware';
const app: Application = express();

app.use(
    helmet({
        contentSecurityPolicy: config.nodeEnv === 'production',
        crossOriginEmbedderPolicy: config.nodeEnv === 'production'
    })
);

app.use(
    cors({
        origin: (origin,callback) =>{
        if(!origin) return callback(null, true); 
        if(config.cors.allowedOrigins.indexOf(origin) !== -1){
            callback(null,true);
        }else{
            callback(new Error(`Origin '${origin}' blocked by CORS policy authorization rules.`));
        }
    },
methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
credentials: true, // Allow cookies to be passed across origins
})
);

// 3. Response Payload Compression
app.use(compression());
// 4. Cookie Parsing Middleware
app.use(cookieParser());
// 5. HTTP Stream Request Logging via Morgan
const morganFormat = config.nodeEnv === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat));
// 6. Global Request Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// 7. Global IP Rate Limiter Application
app.use(globalRateLimiter);
// 8. Primary API Gateway Router
app.use('/api/v1', apiRouter);
// 9. Catch Unhandled Routes (404 Not Found Middleware)
app.use(notFoundHandler);
// 10. Centralized Global Erro
app.use(globalErrorHandler);
export default app;
