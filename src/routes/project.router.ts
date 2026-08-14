import { Router } from "express";
import { projectController } from "../controllers/project.controller";
import { createProjectValidator } from "../validators/project.validator";
import { validate } from "../middlewares/validate.middleware";

const projectRouter = Router();

projectRouter.post('/',createProjectValidator, validate ,projectController.create);
projectRouter.get('/', projectController.getAll);

export default projectRouter;