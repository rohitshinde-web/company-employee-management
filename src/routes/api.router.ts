import { Router } from 'express';
import healthRouter from './health.router';
import employeeRouter from './employee.router';
import departmentRouter from './department.router';
import projectRouter from './project.router';
import leaveRouter from './leave.router';
import attendanceRouter from './attendance.router';
import salaryRouter from './salary.router';
import roleRouter from './role.router';

const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/employees', employeeRouter);
apiRouter.use('/departments', departmentRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/salaries', salaryRouter);
apiRouter.use('/attendances', attendanceRouter);
apiRouter.use('/leaves', leaveRouter);
apiRouter.use('/projects', projectRouter);


export default apiRouter;
