import { Router } from 'express';
import { roleController } from '../controllers/role.controller';
import { createRoleValidator } from '../validators/role.validator';
import { validate } from '../middlewares/validate.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { UserRole } from '../constants/userRoles';

const roleRouter = Router();

roleRouter.get('/',authorize(UserRole.ADMIN, UserRole.HR) ,roleController.getAll);
roleRouter.post('/',authorize(UserRole.ADMIN) ,createRoleValidator, validate ,roleController.create);

export default roleRouter;
