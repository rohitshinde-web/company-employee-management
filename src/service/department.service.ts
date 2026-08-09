import { HTTP_STATUS } from '../constants/statusCodes';
import { IDepartment } from '../interfaces/department.interface';
import { departmentRespository } from '../repositories/department.repositories.js';
import { CreateDepartmentDTO, UpdateDepartmentDTO } from '../types/dto/department.dto';
import { AppError } from '../utils/AppError';

export class DepartmentService {
  public async createDepartment(dto: CreateDepartmentDTO): Promise<IDepartment> {
    const existing = await departmentRespository.findByCode(dto.departmentCode);
    if (existing) {
      throw new AppError(
        `Department code ${dto.departmentCode} already exists`,
        HTTP_STATUS.CONFLICT,
      );
    }
    return departmentRespository.create(dto);
  }

  public async getDepartments(): Promise<IDepartment[]> {
    return departmentRespository.findAll();
  }

  public async getDepartmentById(id: string): Promise<IDepartment> {
    const dept = await departmentRespository.findById(id);
    if (!dept) {
      throw new AppError(`Department with ID ${id} not found`, HTTP_STATUS.NOT_FOUND);
    }
    return dept;
  }

  public async updateDepartment(id: string, dto: UpdateDepartmentDTO): Promise<IDepartment> {
    const updated = await departmentRespository.update(id, dto);
    if (!updated) {
      throw new AppError(`Department with ID ${id} not found`, HTTP_STATUS.NOT_FOUND);
    }

    return updated;
  }

  public async deleteDepartment(id: string): Promise<void> {
    const success = await departmentRespository.softDelete(id);
    if (!success) {
      throw new AppError(`Department with ID ${id} not found`, HTTP_STATUS.NOT_FOUND);
    }
  }
}

export const departmentService = new DepartmentService();
