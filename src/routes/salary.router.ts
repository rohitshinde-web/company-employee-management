import { Router } from 'express';
import { salaryController } from '../controllers/salary.controller';
import { createSalaryValidator, getSalaryHistoryValidator } from '../validators/salary.validator';
import { validate } from '../middlewares/validate.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { UserRole } from '../constants/userRoles';

const salaryRouter = Router();

salaryRouter.post('/',authorize(UserRole.ADMIN, UserRole.HR),createSalaryValidator, validate ,salaryController.create);
salaryRouter.get('/employee/:employeeId',authorize(UserRole.ADMIN, UserRole.HR),getSalaryHistoryValidator, validate ,salaryController.getHistry);

export default salaryRouter;
