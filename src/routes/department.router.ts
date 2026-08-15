import { Router } from 'express';
import { departmentController } from '../controllers/department.controller';
import { createDepartmentValidator, updateDepartmentValidator } from '../validators/department.validator';
import { validate } from '../middlewares/validate.middleware';
import { uuidParamValidator } from '../validators/employee.validator';
import { authorize } from '../middlewares/authorize.middleware';
import { UserRole } from '../constants/userRoles';

const departmentRouter = Router();

departmentRouter.post('/',authorize(UserRole.ADMIN, UserRole.HR, UserRole.MANAGER),createDepartmentValidator, validate ,departmentController.create);
departmentRouter.get('/', authorize(UserRole.ADMIN, UserRole.HR, UserRole.MANAGER),departmentController.getAll);
departmentRouter.get('/:id',authorize(UserRole.ADMIN),uuidParamValidator,validate, departmentController.getById);
departmentRouter.patch('/:id',authorize(UserRole.ADMIN),updateDepartmentValidator,validate ,departmentController.update);
departmentRouter.delete('/:id',authorize(UserRole.ADMIN),uuidParamValidator, validate ,departmentController.delete);

export default departmentRouter;
