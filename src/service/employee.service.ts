import { HTTP_STATUS } from "../constants/statusCodes.js";
import { IEmployee, IEmployeeResponse } from "../interfaces/employee.interface.js";
import { IPaginatedResult } from "../interfaces/pagination.interface.js";
import { CreateEmployeeDTO, EmployeeQueryDTO, UpdateEmployeeDTO } from "../types/dto/employee.dto.js";
import { AppError } from "../utils/AppError.js";

export class EmployeeService {

    private employees: IEmployee[] = [];

    private sanitizeEmployee(employee: IEmployee): IEmployeeResponse {
        const {passwordHash, ...sanitized} = employee;
        return sanitized;
    }

   public async createEmployee(dto: CreateEmployeeDTO): Promise<IEmployeeResponse>{
    const exiting = this.employees.find((e) => e.email === dto.email);
    if(exiting){
        throw new AppError(`Employee with email ${dto.email} already exists`, HTTP_STATUS.CONFLICT);
    }

    const newEmployee: IEmployee = {
        id: `emp-uuid-${Date.now()}`,
        employeeCode: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash: dto.passwordHash,
        departmentId: dto.departmentId,
        designationId: dto.designationId,
        role: dto.role,
        employmentStatus: dto.employmentStatus,
        gender: dto.gender,
        salary: dto.salary,
        dateOfBirth: new Date(dto.dateOfBirth),
        dateOfJoining: new Date(dto.dateOfJoining),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    this.employees.push(newEmployee);
    return this.sanitizeEmployee(newEmployee)
   }

   public async getAllEmployees(query: EmployeeQueryDTO): Promise<IPaginatedResult<IEmployeeResponse>>{
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const search = query.search?.toLowerCase();

    let filtered = [...this.employees];

    if(search){
        filtered = filtered.filter((e) => 
            e.firstName.toLowerCase().includes(search) ||
            e.lastName.toLowerCase().includes(search) ||
            e.email.toLowerCase().includes(search)
        );
    }

    if(query.role){
        filtered = filtered.filter((e) => e.role === query.role);
    }

    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / limit);
    const startIndex = (page - 1) * limit;
    const paginatedItems = filtered.slice(startIndex, startIndex + limit);

    const sanitizedItems = paginatedItems.map((e) => this.sanitizeEmployee(e));

    return {
        items: sanitizedItems,
        pagination:{
            page,
            limit,
            totalRecords,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        },
    };
   }

public async getEmployeeById(id: string): Promise<IEmployeeResponse>{
    const employee = this.employees.find((e) => e.id === id);
    if(!employee){
        throw new AppError(`Employee with id ${id} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return this.sanitizeEmployee(employee);
}

public async updateEmployee(id: string, dto: UpdateEmployeeDTO): Promise<IEmployeeResponse>{
    const index = this.employees.findIndex((e) => e.id === id);
    if(index === -1){
        throw new AppError(`Employee with id ${id} not found`, HTTP_STATUS.NOT_FOUND);
    }

    const existing = this.employees[index];
    const updateEmployee: IEmployee = {
        ...existing,
        ...dto,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : existing.dateOfBirth,
        dateOfJoining: dto.dateOfJoining ? new Date(dto.dateOfJoining) : existing.dateOfJoining,
        updatedAt: new Date(),
    };

    this.employees[index] = updateEmployee;
    return this.sanitizeEmployee(updateEmployee);
}
}

export const employeeService = new EmployeeService();