import { Router } from 'express';
import { departmentController } from '../controllers/department.controller';

const departmentRouter = Router();

departmentRouter.post('/', departmentController.create);
departmentRouter.get('/', departmentController.getAll);
departmentRouter.get('/:id', departmentController.getById);
departmentRouter.patch('/:id', departmentController.update);
departmentRouter.delete('/:id', departmentController.delete);

export default departmentRouter;
