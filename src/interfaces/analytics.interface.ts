export interface IDepartmentSalarySummary {
    departmentId: string;
    departmentName: string;
    totalEmployees: number;
    totalBudget: number;
    totalSalaryExpenditure : number;
    avgSalary: number;
    maxSalary: number;
    minSalary: number;
}

export interface IEmployeeSalaryRank {
    employeeId: string;
    employeeName: string;
    fullName: string;
    departmentName: string;
    baseSalary: number;
    departmentSalaryRank: number;
}

export interface IDepartmentAttendanceMetrics {
    departmentName: string;
    date: string;
    presentCount: number;
    absentCount: number;
    onLeaveCount: number;
}