import { Router } from "express";
import { loginValidator, refreshTokenValidator } from "../validators/auth.validator";
import { validate } from "../middlewares/validate.middleware";
import { authController } from "../controllers/auth.controller";
import { authRateLimiter } from "../middlewares/rateLimiter.middleware";


const authRouter = Router();

authRouter.post('/login',authRateLimiter ,loginValidator, validate, authController.login);
authRouter.post('/refresh-token', refreshTokenValidator, validate, authController.refreshTokens);
authRouter.post('/logout', refreshTokenValidator, validate, authController.logout);

export default authRouter;