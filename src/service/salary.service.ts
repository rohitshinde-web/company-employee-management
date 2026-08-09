import { HTTP_STATUS } from '../constants/statusCodes';
import { ISalary } from '../interfaces/salary.interface';
import { employeeRepository } from '../repositories/employee.respository';
import { salaryRepository } from '../repositories/salary.repositories';
import { CreateSalaryDTO } from '../types/dto/salary.dto';
import { AppError } from '../utils/AppError';

export class SalaryService {
  public async addSalaryRecord(dto: CreateSalaryDTO): Promise<ISalary> {
    const employee = await employeeRepository.findById(dto.employeeId);
    if (!employee) {
      throw new AppError(`Employee with ID ${dto.employeeId} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return salaryRepository.createSalaryRecord(dto);
  }

  public async getEmployeeSalaryHistory(employeeId: string): Promise<ISalary[]> {
    const employee = await employeeRepository.findById(employeeId);
    if (!employee) {
      throw new AppError(`Employee with ID ${employeeId} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return salaryRepository.findByEmployeeId(employeeId);
  }
}

export const salaryService = new SalaryService();
