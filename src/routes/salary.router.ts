import { Router } from 'express';
import { salaryController } from '../controllers/salary.controller';
import { createSalaryValidator, getSalaryHistoryValidator } from '../validators/salary.validator';
import { validate } from '../middlewares/validate.middleware';

const salaryRouter = Router();

salaryRouter.post('/',createSalaryValidator, validate ,salaryController.create);
salaryRouter.get('/employee/:employeeId',getSalaryHistoryValidator, validate ,salaryController.getHistry);

export default salaryRouter;
