import { Router } from "express";
import { projectController } from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post('/', projectController.create);
projectRouter.get('/', projectController.getAll);

export default projectRouter;