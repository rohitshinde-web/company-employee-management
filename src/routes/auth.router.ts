import { Router } from "express";
import { loginValidator, refreshTokenValidator } from "../validators/auth.validator";
import { validate } from "../middlewares/validate.middleware";
import { authController } from "../controllers/auth.controller";


const authRouter = Router();

authRouter.post('/login', loginValidator, validate, authController.login);
authRouter.post('/refresh-token', refreshTokenValidator, validate, authController.refreshTokens);
authRouter.post('/logout', refreshTokenValidator, validate, authController.logout);

export default authRouter;