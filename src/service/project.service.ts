import { HTTP_STATUS } from "../constants/statusCodes";
import { IProject } from "../interfaces/project.interface";
import { projectRepository } from "../repositories/project.repository";
import { CreateProjectDTO } from "../types/dto/project.dto";
import { AppError } from "../utils/AppError";


export class ProjectService {
    public async createProject(dto: CreateProjectDTO): Promise<IProject>{
        const existing = await projectRepository.findById(dto.projectCode);
        if(existing){
            throw new AppError(`Project with code ${dto.projectCode} already exists`, HTTP_STATUS.CONFLICT);
        }

        const dept = await projectRepository.findById(dto.departmentId);
        if(!dept){
            throw new AppError(`Department with id ${dto.departmentId} does not exist`, HTTP_STATUS.NOT_FOUND)
        }
        return projectRepository.create(dto);
    }

    public async getAllProjects(): Promise<IProject[]>{
        return projectRepository.findAll();
    }
}

export const projectService = new ProjectService();