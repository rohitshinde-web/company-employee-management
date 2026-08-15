import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface JwtConfig {
  accessSecret: string;
  refreshSecret: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
}

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
  jwt: JwtConfig;
}

export const config: EnvironmentConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'company_emp_db',
    user: process.env.DB_USER || 'dev_user',
    password: process.env.DB_PASSWORD || 'rohit_123',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'fallback_access_secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN  || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  }
};
