import { IProject } from "../interfaces/project.interface.js";
import { CreateProjectDTO } from "../types/dto/project.dto.js";
import { BaseRepository } from "./base.repositories";


export class ProjectRepository extends BaseRepository<IProject> {
private mapToEntity(row: Record<string, unknown>) : IProject{
    return {
        id: row.id as string,
        projectCode: row.project_code as string,
        title: row.title as string,
        description: row.description as string | null,
        departmentId : row.department_id as string,
        budget: row.budget as number,
        startDate: row.start_date as Date,
        endDate: row.end_date as Date,
        createdAt: row.created_at as Date,
        updatedAt: row.updated_at as Date
    };
}

public async findById(id: string): Promise<IProject | null>{
    const query = `SELECT * FROM projects WHERE id = $1`;
    const result = await this.query(query, [id]);
    return result.rows.length ? this.mapToEntity(result.rows[0]) : null;
}

public async create(dto: CreateProjectDTO): Promise<IProject>{
    const query = `
    INSERT INTO projects (project_code, title, description, department_id, budget, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
    const result = await this.query(query,[
        dto.projectCode,
        dto.title,
        dto.description || null,
        dto.departmentId,
        dto.budget,
        dto.startDate,
        dto.endDate || null
    ]);

    return this.mapToEntity(result.rows[0]);
}

public async findAll() : Promise<IProject[]>{
    const query = `SELECT * FROM projects ORDER BY created_at DESC`;
    const result = await this.query(query);
    return result.rows.map((row) => this.mapToEntity(row));
}
}

export const projectRepository = new ProjectRepository();