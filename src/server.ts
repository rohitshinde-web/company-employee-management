import { ProxyEnv } from 'node:http';
import app from './app';
import {config} from './config/environment';
import { checkDatabaseConnection, pool } from './db';



const startServer = async ():Promise<void>=> {
try {
    await checkDatabaseConnection();
    const server = app.listen(config.port, () =>{
        console.log(`Server running in ${config.nodeEnv} mode on port http://localhost:${config.port}`);
    })

    const grancefulShutdown = async (signal: string) =>{
        console.log(`\n ${signal} received, Initiating graceful shutdown...`);
        server.close(async () =>{
            console.log('HTTP Server closed.');
            await pool.end();
            console.log('PostgreSQL Connection Pool drained and closed');
            process.exit(0);
        })
    }

    process.on('SIGTERM', () => grancefulShutdown('SIGTERM'));
    process.on('SIGINT', () => grancefulShutdown('SIGINT'));

    process.on('unhandledRejection', (err:Error) => {
        console.log('Unhandled REJECTION! Shutting down server...');
        console.error(err.name, err.message);
        server.close(() =>{
            process.exit(1);
        });
    });
}catch(error){
    console.error('Failed to start server due to DB connections failure', error);
    process.exit(1);
}
};

startServer();