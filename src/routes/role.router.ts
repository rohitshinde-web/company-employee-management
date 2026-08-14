import { Router } from 'express';
import { roleController } from '../controllers/role.controller';
import { createRoleValidator } from '../validators/role.validator';
import { validate } from '../middlewares/validate.middleware';

const roleRouter = Router();

roleRouter.get('/', roleController.getAll);
roleRouter.post('/',createRoleValidator, validate ,roleController.create);

export default roleRouter;
