import { Router } from "express";
import { attendanceController } from "../controllers/attendance.controller";


const attendanceRouter = Router();

attendanceRouter.post('/check-in', attendanceController.checkIn);
attendanceRouter.post('/check-out', attendanceController.checkOut);
attendanceRouter.get('/employee/:employeeId', attendanceController.getHistory);

export default attendanceRouter;