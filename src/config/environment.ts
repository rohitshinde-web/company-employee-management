import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });


interface EnvironmentConfig {
    nodeEnv: string;
    port: number;
}

export const config: EnvironmentConfig = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3001',10)
}