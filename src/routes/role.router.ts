import { Router } from 'express';
import { roleController } from '../controllers/role.controller';

const roleRouter = Router();

roleRouter.get('/', roleController.getAll);
roleRouter.post('/', roleController.create);

export default roleRouter;
