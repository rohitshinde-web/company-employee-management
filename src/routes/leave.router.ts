import { Router } from "express";
import { leaveController } from "../controllers/leave.controller";
import { applyLeaveValidator, updateLeaveStatsuValidator } from "../validators/leave.validator";
import { validate } from "../middlewares/validate.middleware";
import { getAttendaceValidator } from "../validators/attendance.validator";


const leaveRouter = Router();

leaveRouter.post('/',applyLeaveValidator, validate, leaveController.apply);
leaveRouter.patch('/:id/status',updateLeaveStatsuValidator,validate ,leaveController.updateStatus);
leaveRouter.get('/employee/:employeeId',getAttendaceValidator,validate ,leaveController.getEmployeeLeaves);

export default leaveRouter;