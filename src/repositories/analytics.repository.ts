import { IDepartmentAttendanceMetrics, IDepartmentSalarySummary, IEmployeeSalaryRank } from "../interfaces/analytics.interface";
import { BaseRepository } from "./base.repositories";

export class AnalyticsRepository extends BaseRepository<never>{
    public async getDepartmentSalarySummary(): Promise<IDepartmentSalarySummary[]>{
        const query = `
        SELECT 
        d.id AS " departmentId ",
        d.name AS "departmentName",
        COUNT (e.id)::INT AS "totalEmployees",
        d.budget::FLOAT AS "totalBudget",
        COALESCE(SUM(s.base_salary),0):: FLOAT AS "totalSalaryExpenditure",
        COALESCE(ROUND(AVG(s.base_salary),2), 0):: FLOAT AS "avgSalary",
        COALESCE(MAX(s.base_salary),0):: FLOAT AS "maxSalary",
        COALESCE(MIN(s.base_salary),0):: FLOAT AS "minSalary"
        FROM departments d
        LEFT JOIN employees e ON d.id = e.department_id AND e.is_active = TRUE
        LEFT JOIN LATERAL (
            SELECT s.base_salary FROM salaries
            WHERE employee_id = e.id
            ORDER BY effective_date DESC LIMIT 1
            ) s ON TRUE
        WHERE d.is_active = TRUE
        GROUP BY d.id, d.name, d.budget
        HAVING COUNT(e.id) > 0
        ORDER BY "totalSalaryExpenditure" DESC;
        `;
        const result = await this.query<IDepartmentSalarySummary>(query);
        return result.rows;

    }

    public async getEmployeeSalaryRanks(): Promise<IEmployeeSalaryRank[]>{
        const query = `
        WITH LatestSalaries AS (
        SELECT DISTINCT ON (employee_id) 
        employee_id, base_salary
        FROM salaries
        ORDER BY employee_id, effective_date DESC
        )
        SELECT
        e.id AS "employeeId",
        e.employee_code AS "employeeCode",
        e.first_name || ' ' || e.last_name AS "fullName",
        d.name AS "departmentName"
        ls.base_salary::FLOAT AS "baseSalary",
        DENSE_RANK() OVER (
         PARTITION BY e.department_id
         ORDER BY ls.base_salary DESC
        ):: INT AS "departmentSalaryRank"
        FROM employees e
        JOIN departments d ON e.department_id = d.id
        JOIN LatestSalaries ls ON e.id = ls.employee_id
        WHERE e.is_active = TRUE
        ORDER BY d.name ASC, "departmentSalaryRank" ASC;
        `;

        const result = await this.query<IEmployeeSalaryRank>(query);
        return result.rows;
    }

    public async getDepartmentAttendanceAnalytics(dateStr: string): Promise<IDepartmentAttendanceMetrics[]>{
        const query = `
        SELECT 
        d.name AS "departmentName",
        $1:: TEXT AS "date",
        COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END):: INT AS "presentCount",
        COUNT(CASE WHEN a.status = 'ABSENT' THEN 1 END) :: INT AS "absentCount",
        COUNT(CASE WHEN a.status = 'LEAVE' THEN 1 END) :: INT AS "onLeaveCount"
        FROM departments d
        LEFT JOIN employees e ON d.id = e.department_id AND e.is_active = TRUE
        LEFT JOIN attendance a ON e.id = a.employee_id AND a.date = $1 :: DATE
        WHERE d.is_active = TRUE
        GROUP BY d.name
        ORDER BY d.name ASC`;

        const result = await this.query<IDepartmentAttendanceMetrics>(query, [dateStr]);
        return result.rows;
    }
  
}

export const analyticsRepository = new AnalyticsRepository();