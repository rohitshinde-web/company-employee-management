import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface DatabaseConfig {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
}

interface EnvironmentConfig {
    nodeEnv: string;
    port: number;
    db: DatabaseConfig;
}

export const config: EnvironmentConfig = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3001',10),
    db:{
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432',10),
        name: process.env.DB_NAME || 'company_emp_db',
        user: process.env.DB_USER || 'deb_user',
        password: process.env.DB_PASSWORD || 'rohit_123'
    }
}