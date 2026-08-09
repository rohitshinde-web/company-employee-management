import { HTTP_STATUS } from '../constants/statusCodes.js';
import { IEmployee, IEmployeeResponse } from '../interfaces/employee.interface.js';
import { IPaginatedResult } from '../interfaces/pagination.interface.js';
import { employeeRepository } from '../repositories/employee.respository.js';
import {
  CreateEmployeeDTO,
  EmployeeQueryDTO,
  UpdateEmployeeDTO,
} from '../types/dto/employee.dto.js';
import { AppError } from '../utils/AppError.js';
import { pool } from '../db/index.js';

export class EmployeeService {
  private employees: IEmployee[] = [];

  private sanitizeEmployee(employee: IEmployee): IEmployeeResponse {
    const { passwordHash, ...sanitized } = employee;
    return sanitized;
  }

  public async createEmployee(dto: CreateEmployeeDTO): Promise<IEmployeeResponse> {
    const exiting = await employeeRepository.findByEmail(dto.email);
    if (exiting) {
      throw new AppError(`Employee with email ${dto.email} already exists`, HTTP_STATUS.CONFLICT);
    }
    const roleRes = await pool.query('SELECT id FROM roles WHERE role_name = $1', [dto.role]);
    if (roleRes.rows.length === 0) {
      throw new AppError(`Invalid role specification: ${dto.role}`, HTTP_STATUS.BAD_REQUEST);
    }
    const roleId = roleRes.rows[0].id;
    const createdEmployee = await employeeRepository.create(dto, roleId);
    return this.sanitizeEmployee(createdEmployee);
  }

  public async getEmployees(query: EmployeeQueryDTO): Promise<IPaginatedResult<IEmployeeResponse>> {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);

    const { employees, totalRecords } = await employeeRepository.findAll(page, limit, query.search);
    const totalPages = Math.ceil(totalRecords / limit) || 1;

    return {
      items: employees.map((e) => this.sanitizeEmployee(e)),
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  public async getEmployeeById(id: string): Promise<IEmployeeResponse> {
    const employee = await employeeRepository.findById(id);
    if (!employee) {
      throw new AppError(`Employee with ID ${id} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return this.sanitizeEmployee(employee);
  }

  public async updateEmployee(id: string, dto: UpdateEmployeeDTO): Promise<IEmployeeResponse> {
    const update = await employeeRepository.update(id, dto);
    if (!update) {
      throw new AppError(`Employee with ID ${id} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return this.sanitizeEmployee(update);
  }

  public async deleteEmployee(id: string): Promise<void> {
    const success = await employeeRepository.softDelete(id);
    if (!success) {
      throw new AppError(`Employee with Id ${id} not found`, HTTP_STATUS.NOT_FOUND);
    }
  }
}

export const employeeService = new EmployeeService();
