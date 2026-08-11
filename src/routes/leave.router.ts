import { Router } from "express";
import { leaveController } from "../controllers/leave.controller";


const leaveRouter = Router();

leaveRouter.post('/', leaveController.apply);
leaveRouter.patch('/:id/status', leaveController.updateStatus);
leaveRouter.get('/employee/:employeeId', leaveController.getEmployeeLeaves);

export default leaveRouter;