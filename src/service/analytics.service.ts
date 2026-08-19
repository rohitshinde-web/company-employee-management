import { IDepartmentAttendanceMetrics, IDepartmentSalarySummary, IEmployeeSalaryRank } from "../interfaces/analytics.interface";
import { analyticsRepository } from "../repositories/analytics.repository";


export class AnalyticsService {
    public  async getDepartmentSalaryMetrics(): Promise<IDepartmentSalarySummary[]>{
        return analyticsRepository.getDepartmentSalarySummary();
    }
        public  async getEmployeeSalaryRanks(): Promise<IEmployeeSalaryRank[]>{
        return analyticsRepository.getEmployeeSalaryRanks();
    }
        public  async getDailyAttendanceReport(dateStr: string): Promise<IDepartmentAttendanceMetrics[]>{
       const targetDate = dateStr || new Date().toISOString().split('T')[0];
       return analyticsRepository.getDepartmentAttendanceAnalytics(targetDate);
    }
}

export const analyticsService = new AnalyticsService();