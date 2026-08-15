import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/environment";
import { IAuthTokens, IJwtPayload } from "../interfaces/auth.interface";

export class JwtUtil {

    public static generateTokens(payload:IJwtPayload): IAuthTokens{
        const accessOptions: SignOptions = {
            expiresIn: config.jwt.accessExpiresIn as jwt.SignOptions['expiresIn'],
        };

        const refreshOptions: SignOptions = {
            expiresIn: config.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn'],
        };

        const accessToken = jwt.sign(payload, config.jwt.accessSecret, accessOptions);
        const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, refreshOptions);

        return {accessToken, refreshToken};
    }

    public static verifyAccessToken(token: string): IJwtPayload{
        return jwt.verify(token, config.jwt.accessSecret) as IJwtPayload;
    }

    public static verifyRefreshToken(token: string): IJwtPayload{
        return jwt.verify(token, config.jwt.refreshSecret) as IJwtPayload;
    }
};