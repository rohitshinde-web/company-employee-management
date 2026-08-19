import rateLimit from "express-rate-limit";
import { config } from "../config/environment.js";
import { HTTP_STATUS } from "../constants/statusCodes.js";

export const globalRateLimiter = rateLimit({
windowMs: config.rateLimit.windowMs,
max: config.rateLimit.maxRequests,
standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
legacyHeaders: false, // Disable the `X-RateLimit-*` headers
statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
message: {
    success: false,
    message: "Too Many requests from this IP adderess, Please try again after 15 minutes",
    timeStamp: new Date().toISOString()
}
});


export const authRateLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
    message:{
        success: false,
        message: "Too Many authenticaation attempts from this IP, Account Login temporally rate-limited",
        timeStamp: new Date().toISOString()
    }
})