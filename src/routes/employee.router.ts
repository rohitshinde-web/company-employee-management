import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller';
import { createEmployeeValidator, employeeQueryValidator, updateEmployeeValidator, uuidParamValidator } from '../validators/employee.validator';
import { validate } from '../middlewares/validate.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { UserRole } from '../constants/userRoles';

const employeeRouter = Router();

employeeRouter.post('/',authorize(UserRole.ADMIN, UserRole.HR, UserRole.MANAGER), createEmployeeValidator, validate ,employeeController.create);
employeeRouter.get('/',authorize(UserRole.ADMIN, UserRole.HR, UserRole.MANAGER),  employeeQueryValidator, validate,employeeController.getAll);
employeeRouter.get('/:id', authorize(UserRole.ADMIN, UserRole.HR),uuidParamValidator, validate, employeeController.getById);
employeeRouter.patch('/:id', authorize(UserRole.ADMIN, UserRole.HR),updateEmployeeValidator,validate, employeeController.update);
employeeRouter.delete('/:id',authorize(UserRole.ADMIN) ,uuidParamValidator, validate ,employeeController.delete);

export default employeeRouter;
