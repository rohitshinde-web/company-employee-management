import { Router } from "express";
import { employeeController } from "../controllers/employee.controllers";



const employeeRouter = Router();

employeeRouter.post('/', employeeController.create);
employeeRouter.get('/', employeeController.getAll);
employeeRouter.get('/:id', employeeController.getById);
employeeRouter.patch('/:id', employeeController.update)

export default employeeRouter;