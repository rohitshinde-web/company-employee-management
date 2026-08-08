import { EmployementStatus, Gender, UserRole } from "../../constants/userRoles";


export interface CreateEmployeeDTO {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    departmentId: string;
    designationId: string;
    role: UserRole
    employmentStatus: EmployementStatus;
    gender: Gender;
    salary: number;
    dateOfBirth: string;
    dateOfJoining: string;
}

export type UpdateEmployeeDTO = Partial<Omit<CreateEmployeeDTO, 'passwordHash'>>;

export interface EmployeeQueryDTO {
    page?: string;
    limit?: string;
    search?: string;
    role?: UserRole;
    departmentId?: string;
}