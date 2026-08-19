import { Router } from "express";
import { analyticsController } from "../controllers/analytics.controller";
import { authorize } from "../middlewares/authorize.middleware";
import { UserRole } from "../constants/userRoles";

const analyticsRouter = Router();

analyticsRouter.get('/department-salaries',authorize(UserRole.ADMIN, UserRole.HR) ,analyticsController.getSalarySummary);
analyticsRouter.get('/salary-ranks',authorize(UserRole.ADMIN, UserRole.HR, UserRole.MANAGER) ,analyticsController.getSalaryRanks);
analyticsRouter.get('/attendance-report', authorize(UserRole.ADMIN, UserRole.HR, UserRole.MANAGER),analyticsController.getAttendanceReport);

export default analyticsRouter;