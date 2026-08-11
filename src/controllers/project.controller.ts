import { HTTP_STATUS } from "../constants/statusCodes";
import { projectService } from "../service/project.service";
import { ApiResponse } from "../utils/api.response";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";


export class ProjectController {
    public create = asyncHandler(async (req:Request, res:Response) =>{
        const project = await projectService.createProject(req.body);
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.CREATED,
            message: 'Project created Successfully',
            data: project
        })
    });

    public getAll = asyncHandler(async (req:Request, res:Response)=>{
        const projects = await projectService.getAllProjects();
        return ApiResponse.success({
            res,
            statusCode: HTTP_STATUS.OK,
            message: 'Projects retrieved successfully',
            data: projects
        });
    });
}

export const projectController = new ProjectController();