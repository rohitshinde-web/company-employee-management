import { Client } from "pg";
import { ISalary } from "../interfaces/salary.interface.js";
import { CreateSalaryDTO } from "../types/dto/salary.dto.js";
import { BaseRepository } from "./base.repositories.js";

export class SalaryRepository extends BaseRepository<ISalary> {
  private mapToEntity(row: Record<string, unknown>): ISalary{
    const base = parseFloat(row.base_salary as string || '0');
    const allowances = parseFloat(row.allowances as string || '0');
    const deductions = parseFloat(row.deductions as string || '0');

    return {
        id: row.id as string,
        employeeId: row.employee_id as string,
        baseSalary: base,
        allowances,
        deductions,
        netSalary: base + allowances - deductions,
        effectiveDate: new Date(row.effective_date as string),
        createdAt: new Date(row.created_at as string)
    };
  }

  public async findByEmployeeId(employeeId: string): Promise<ISalary[]>{
    const query = `
    SELECT * FROM salaries WHERE employee_id = $1 ORDER BY effective_date DESC`;

    const result = await this.query(query, [employeeId]);
    return result.rows.map((row) =>this.mapToEntity(row))
  }

  public async createSalaryRecord(dto: CreateSalaryDTO): Promise<ISalary>{
    return this.executeTransaction(async (client) =>{
        const insertQuery = `
        INSERT INTO salaries (employee_id, base_salary, allowances, deductions, effective_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;

        const res = await client.query(insertQuery, [
            dto.employeeId,
            dto.baseSalary,
            dto.allowances,
            dto.deductions,
            dto.effectiveDate,
        ]);

        return this.mapToEntity(res.rows[0])
    });
  }
}

export const salaryRepository = new SalaryRepository();