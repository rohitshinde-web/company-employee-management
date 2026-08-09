import { IDepartment } from "../interfaces/department.interface.js";
import { CreateDepartmentDTO, UpdateDepartmentDTO } from "../types/dto/department.dto.js";
import { BaseRepository } from "./base.repositories.js";
export class DepartmentRepository extends BaseRepository<IDepartment>{
    private mapToEntity(row: Record<string, unknown>): IDepartment{
    return {
        id: row.id as string,
        departmentCode: row.department_code as string,
        name: row.name as string,
        budget: parseFloat(row.budget as string || '0'),
        isActive: row.is_active as boolean,
        createdAt: new Date(row.created_at as string),
        updatedAt: new Date(row.updated_at as string)
    }
    }

    public async findById(id: string): Promise<IDepartment | null>{
        const query = `
        SELECT * FROM departments WHERE id = $1 AND is_active = TRUE LIMIT 1`;
        const result = await this.query(query, [id]);
        return result.rows.length ? this.mapToEntity(result.row[0]) : null;
    }

    public async findByCode(code: string): Promise<IDepartment | null>{
        const query = `
        SELECT * FROM departments WHERE department_code = $1 AND is_active = TRUE LIMIT 1`;
        const result = await this.query(query, [code]);
        return result.rows.length ? this.mapToEntity(result.row[0]) : null;
    }

    public async findAll() : Promise<IDepartment[]>{
        const query = `
        SELECT * FROM departments WHERE is_active = TRUE ORDER BY name ASC`;
        const result = await this.query(query);
        return result.rows.map((row) => this.mapToEntity(row));
    }

    public async create(dto: CreateDepartmentDTO): Promise<IDepartment>{
        const query = `
        INSERT INTO departments (department_code, name, budget)
        VALUES ($1, $2, $3)
        RETURNING *`;
        const result = await this.query(query, [dto.departmentCode, dto.name, dto.budget]);
        return this.mapToEntity(result.rows[0]);
    }

    public async update(id: string, dto: UpdateDepartmentDTO): Promise<IDepartment | null>{
        const fields = string[] = [];
        const values = unknown[] = [];

        if(dto.name){
            values.push(dto.name);
            fields.push(`name = $${values.length}`);
        }

        if(dto.budget){
            values.push(dto.budget);
            fields.push(`budget = $${values.length}`);
        }

        if(fields.length === 0) return this.findById(id);

        fields.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        const query = `
        UPDATE departments
        SET ${fields.join(', ')}
        WHERE id = $${values.length} AND is_active = TRUE
        RETURNING *`;

        const result = await this.query(query, values);
        return result.rows.length ? this.mapToEntity(result.rows[0]) : null;
    }

    public async softDelete(id: string): Promise<boolean>{
        const query = `
        UPDATE departments
        SET is_active = FALSE,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = $1`;

        const result = await this.query(query, [id]);
        return (result.rowCount ?? 0) > 0;
    }
}

export const departmentRespository = new DepartmentRepository();