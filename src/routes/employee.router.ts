import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller';
import { createEmployeeValidator, employeeQueryValidator, updateEmployeeValidator, uuidParamValidator } from '../validators/employee.validator';
import { validate } from '../middlewares/validate.middleware';

const employeeRouter = Router();

employeeRouter.post('/',createEmployeeValidator, validate ,employeeController.create);
employeeRouter.get('/', employeeQueryValidator, validate,employeeController.getAll);
employeeRouter.get('/:id',uuidParamValidator, validate, employeeController.getById);
employeeRouter.patch('/:id',updateEmployeeValidator,validate, employeeController.update);
employeeRouter.delete('/:id',uuidParamValidator, validate ,employeeController.delete);

export default employeeRouter;
