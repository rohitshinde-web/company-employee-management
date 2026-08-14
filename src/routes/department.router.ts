import { Router } from 'express';
import { departmentController } from '../controllers/department.controller';
import { createDepartmentValidator, updateDepartmentValidator } from '../validators/department.validator';
import { validate } from '../middlewares/validate.middleware';
import { uuidParamValidator } from '../validators/employee.validator';

const departmentRouter = Router();

departmentRouter.post('/',createDepartmentValidator, validate ,departmentController.create);
departmentRouter.get('/', departmentController.getAll);
departmentRouter.get('/:id',uuidParamValidator,validate, departmentController.getById);
departmentRouter.patch('/:id',updateDepartmentValidator,validate ,departmentController.update);
departmentRouter.delete('/:id',uuidParamValidator, validate ,departmentController.delete);

export default departmentRouter;
