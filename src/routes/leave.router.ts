import { Router } from "express";
import { leaveController } from "../controllers/leave.controller";
import { applyLeaveValidator, updateLeaveStatsuValidator } from "../validators/leave.validator";
import { validate } from "../middlewares/validate.middleware";
import { getAttendaceValidator } from "../validators/attendance.validator";
import { authorize } from "../middlewares/authorize.middleware";
import { UserRole } from "../constants/userRoles";


const leaveRouter = Router();

leaveRouter.post('/',authorize(UserRole.ADMIN, UserRole.MANAGER, UserRole.HR, UserRole.EMPLOYEE) ,applyLeaveValidator, validate, leaveController.apply);
leaveRouter.patch('/:id/status',authorize(UserRole.ADMIN, UserRole.MANAGER, UserRole.HR) ,updateLeaveStatsuValidator,validate ,leaveController.updateStatus);
leaveRouter.get('/employee/:employeeId',authorize(UserRole.ADMIN, UserRole.MANAGER, UserRole.HR, UserRole.EMPLOYEE) ,getAttendaceValidator,validate ,leaveController.getEmployeeLeaves);

export default leaveRouter;