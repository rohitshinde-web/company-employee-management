export interface HealthStatusData {
    uptime: number;
    memoryUsage: NodeJS.MemoryUsage,
    environment: string;
}

export class HealthService {

    public getHealthDetails(): HealthStatusData {
        return {
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            environment: process.env.NODE_ENV || 'development'
        }
    }
};

export const healthService = new HealthService();