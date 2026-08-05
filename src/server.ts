import app from './app';
import {config} from './config/environment';

const startServer = (): void => {
try {
    const server = app.listen(config.port, () =>{
        console.log(`Server running in ${config.nodeEnv} mode on port http://localhost:${config.port}`);
    })
}catch(error){
    console.error('Error starting the server:', error);
    process.exit(1);
}
};

startServer();