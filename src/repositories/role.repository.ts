import { IRole } from '../interfaces/role.interface.js';
import { CreateRoleDTO } from '../types/dto/role.dto.js';
import { BaseRepository } from './base.repositories';

export class RoleRepository extends BaseRepository<IRole> {
  private mapToEntity(row: Record<string, unknown>): IRole {
    return {
      id: row.id as string,
      roleName: row.role_name as string,
      description: row.description as string,
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }

  public async findAll(): Promise<IRole[]> {
    const query = `SELECT * FROM roles ORDER BY role_name ASC`;
    const result = await this.query(query);
    return result.rows.map((row) => this.mapToEntity(row));
  }

  public async findByName(roleName: string): Promise<IRole | null> {
    const query = `SELECT * FROM roles WHERE role_name = $1 LIMIT 1`;
    const result = await this.query(query, [roleName]);
    return result.rows.length ? this.mapToEntity(result.rows[0]) : null;
  }

  public async create(dto: CreateRoleDTO): Promise<IRole> {
    const query = `
        INSERT INTO roles (role_name, description)
        VALUES ($1, $2)
        RETURNING *`;
    const result = await this.query(query, [dto.roleName, dto.description]);
    return this.mapToEntity(result.rows[0]);
  }
}

export const roleRepository = new RoleRepository();
