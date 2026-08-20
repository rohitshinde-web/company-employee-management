import { PoolClient } from 'pg';
import { IEmployee } from '../interfaces/employee.interface.js';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../types/dto/employee.dto.js';
import { BaseRepository } from './base.repositories.js';

export class EmployeeRepository extends BaseRepository<IEmployee> {
  /**
   * Maps snake_case SQL database columm names to camelCase property names in the IEmployee interface
   */

  private mapToEntity(row: Record<string, unknown>): IEmployee {
    return {
      id: row.id as string,
      employeeCode: row.employee_code as string,
      firstName: row.first_name as string,
      lastName: row.last_name as string,
      email: row.email as string,
      passwordHash: row.password_hash as string,
      departmentId: row.department_id as string,
      designation: row.designation as string,
      role: row.role_name as unknown as IEmployee['role'],
      employmentStatus: row.employment_status as unknown as IEmployee['employmentStatus'],
      gender: row.gender as unknown as IEmployee['gender'],
      salary: parseFloat((row.base_salary as string) || '0'),
      profileImageUrl: (row.profile_image_url as string) || null,
      dateOfBirth: new Date(row.date_of_birth as string),
      dateOfJoining: new Date(row.date_of_joining as string),
      isActive: row.is_active as boolean,
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }

  public async findByEmail(email: string): Promise<IEmployee | null> {
    const query = `
SELECT e.*, r.role_name
FROM employees e
JOIN roles r ON e.role_id = r.id
WHERE e.email = $1 LIMIT 1
`;
    const result = await this.query(query, [email]);
    return result.rows.length ? this.mapToEntity(result.rows[0]) : null;
  }
  public async findById(id: string): Promise<IEmployee | null> {
    const query = `
SELECT e.*, r.role_name
FROM employees e
JOIN roles r ON e.role_id = r.id
WHERE e.id = $1 LIMIT 1
`;
    const result = await this.query(query, [id]);
    return result.rows.length ? this.mapToEntity(result.rows[0]) : null;
  }

  public async create(
    dto: CreateEmployeeDTO,
    roleId: string,
    client?: PoolClient,
  ): Promise<IEmployee> {
    const query = `
INSERT INTO employees (
employee_code, first_name, last_name, email, password_hash,
department_id, role_id, designation, employment_status, gender,
date_of_birth, date_of_joining)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *
`;

    // Generate a unique employee code
    const employeeCode = `EMP-${Math.floor(100000 + Math.random() * 900000)}`;
    const values = [
      employeeCode,
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.passwordHash,
      dto.departmentId,
      roleId,
      dto.designation,
      dto.employmentStatus,
      dto.gender,
      dto.dateOfBirth,
      dto.dateOfJoining,
    ];
    const result = await this.query(query, values, client);
    return this.findById(result.rows[0].id) as Promise<IEmployee>;
  }

  public async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ employees: IEmployee[]; totalRecords: number }> {
    const offset = (page - 1) * limit;
    const queryParams: unknown[] = [];
    let whereClause = 'WHERE e.is_active = TRUE';
    if (search) {
      queryParams.push(`%${search}%`);
      whereClause += ` AND (e.first_name ILIKE $${queryParams.length} OR e.last_name ILIKE $${queryParams.length} OR e.email ILIKE $${queryParams.length})`;
    }
    // Count Total Query
    const countQuery = `SELECT COUNT(*) FROM employees e ${whereClause}`;
    const countResult = await this.query<{ count: string }>(countQuery, queryParams);
    const totalRecords = parseInt(countResult.rows[0].count, 10);
    // Data Query
    queryParams.push(limit, offset);
    const dataQuery = `
SELECT e.*, r.role_name
FROM employees e
JOIN roles r ON e.role_id = r.id
${whereClause}
ORDER BY e.created_at DESC
LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}
`;
    const dataResult = await this.query(dataQuery, queryParams);
    const employees = dataResult.rows.map((row) => this.mapToEntity(row));
    return { employees, totalRecords };
  }
  public async update(id: string, dto: UpdateEmployeeDTO): Promise<IEmployee | null> {
    const setFields: string[] = [];
    const values: unknown[] = [];
    if (dto.firstName) {
      values.push(dto.firstName);
      setFields.push(`first_name = $${values.length}`);
    }
    if (dto.lastName) {
      values.push(dto.lastName);
      setFields.push(`last_name = $${values.length}`);
    }
    if (dto.designation) {
      values.push(dto.designation);
      setFields.push(`designation = $${values.length}`);
    }
    if (setFields.length === 0) return this.findById(id);
    setFields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    const query = `
UPDATE employees
SET ${setFields.join(', ')}
WHERE id = $${values.length}
RETURNING id
`;
    const result = await this.query(query, values);
    return result.rows.length ? this.findById(id) : null;
  }

  public async softDelete(id: string): Promise<boolean> {
    const query = `
    UPDATE employees
    SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1`;
    const result = await this.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  public async updateProfileImage(id: string, imageUrl: string): Promise<IEmployee | null>{
    const query = `
    UPDATE employees
    SET profile_image_url = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND is_active = TRUE
    RETURNING id
    `;

    const result = await this.query(query, [imageUrl, id]);
    return result.rows.length ? this.mapToEntity(result.rows[0]) : null;
  }
}

export const employeeRepository = new EmployeeRepository();
