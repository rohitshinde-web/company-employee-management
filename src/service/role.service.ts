import { HTTP_STATUS } from '../constants/statusCodes';
import { IRole } from '../interfaces/role.interface';
import { roleRepository } from '../repositories/role.repository';
import { CreateRoleDTO } from '../types/dto/role.dto';
import { AppError } from '../utils/AppError';

export class RoleService {
  public async getRoles(): Promise<IRole[]> {
    return roleRepository.findAll();
  }

  public async createRole(dto: CreateRoleDTO): Promise<IRole> {
    const existing = await roleRepository.findByName(dto.roleName);
    if (existing) {
      throw new AppError(`Role with name ${dto.roleName} already exists`, HTTP_STATUS.CONFLICT);
    }
    return roleRepository.create(dto);
  }
}

export const roleService = new RoleService();
