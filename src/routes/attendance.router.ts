import { Router } from "express";
import { attendanceController } from "../controllers/attendance.controller";
import { attendanceCheckInValidator, attendanceCheckOutValidator, getAttendaceValidator } from "../validators/attendance.validator";
import { validate } from "../middlewares/validate.middleware";


const attendanceRouter = Router();

attendanceRouter.post('/check-in', attendanceCheckInValidator,validate,attendanceController.checkIn);
attendanceRouter.post('/check-out',attendanceCheckOutValidator,validate ,attendanceController.checkOut);
attendanceRouter.get('/employee/:employeeId', getAttendaceValidator,validate,attendanceController.getHistory);

export default attendanceRouter;