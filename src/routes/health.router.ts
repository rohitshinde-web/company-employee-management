import {Router} from 'express';
import { healthController } from '../controllers/health.controllers';


const healthRouter = Router();

healthRouter.get('/', healthController.checkHealth);
healthRouter.get('/error-test', healthController.simulateError);

export default healthRouter;