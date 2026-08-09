import { HTTP_STATUS } from '../constants/statusCodes';
import { roleService } from '../service/role.service';
import { ApiResponse } from '../utils/api.response';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
export class RoleController {
  public getAll = asyncHandler(async (_req: Request, res: Response) => {
    const roles = await roleService.getRoles();
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.OK,
      message: 'Roles retrieved successfully',
      data: roles,
    });
  });

  public create = asyncHandler(async (req: Request, res: Response) => {
    const role = await roleService.createRole(req.body);
    return ApiResponse.success({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: 'Role created successfully',
      data: role,
    });
  });
}

export const roleController = new RoleController();
