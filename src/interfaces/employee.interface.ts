import { EmployementStatus, Gender, UserRole } from "../constants/userRoles";

export interface IEmployee {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    departmentId: string;
    designation: string;
    role: UserRole;
    employmentStatus: EmployementStatus;
    gender: Gender;
    salary: number;
    dateOfBirth: Date;
    dateOfJoining: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type IEmployeeResponse = Omit<IEmployee, 'passwordHash'>;