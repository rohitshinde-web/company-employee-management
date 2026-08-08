import app from './app';
import {config} from './config/environment';




const startServer = (): void => {
try {
    const server = app.listen(config.port, () =>{
        console.log(`Server running in ${config.nodeEnv} mode on port http://localhost:${config.port}`);
    })

    process.on('unhandledRejection', (err:Error) => {
        console.log('Unhandled REJECTION! Shutting down server...');
        console.error(err.name, err.message);
        server.close(() =>{
            process.exit(1);
        });
    });
}catch(error){
    console.error('Error starting the server:', error);
    process.exit(1);
}
};

startServer();