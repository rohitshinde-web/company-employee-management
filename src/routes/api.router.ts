import { Router } from 'express';
import healthRouter from './health.router';
import employeeRouter from './employee.router';
import departmentRouter from './department.router';
import projectRouter from './project.router';
import leaveRouter from './leave.router';
import attendanceRouter from './attendance.router';
import salaryRouter from './salary.router';
import roleRouter from './role.router';
import authRouter from './auth.router';
import { authenticate } from '../middlewares/authenticate.middleware';

const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth',authRouter);
apiRouter.use('/employees',authenticate, employeeRouter);
apiRouter.use('/departments',authenticate, departmentRouter);
apiRouter.use('/roles',authenticate, roleRouter);
apiRouter.use('/salaries',authenticate, salaryRouter);
apiRouter.use('/attendances',authenticate, attendanceRouter);
apiRouter.use('/leaves',authenticate, leaveRouter);
apiRouter.use('/projects',authenticate, projectRouter);


export default apiRouter;
