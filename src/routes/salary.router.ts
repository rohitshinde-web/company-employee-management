import { Router } from 'express';
import { salaryController } from '../controllers/salary.controller';

const salaryRouter = Router();

salaryRouter.post('/', salaryController.create);
salaryRouter.get('/employee/:employeeId', salaryController.getHistry);

export default salaryRouter;
