import { resolve } from "node:dns";
import { HTTP_STATUS } from "../constants/statusCodes";
import { IAuthTokens, IJwtPayload } from "../interfaces/auth.interface";
import { IEmployeeResponse } from "../interfaces/employee.interface";
import { authRepository } from "../repositories/auth.repository";
import { employeeRepository } from "../repositories/employee.respository";
import { LoginDTO, LogoutDTO, RefreshtokenDTO } from "../types/dto/auth.dto";
import { AppError } from "../utils/AppError";
import { BcryptUtil } from "../utils/bcrypt";
import { JwtUtil } from "../utils/jwt.util";

export class AuthService {

    private sanitizeEmployee(employee: Record<string, unknown>): IEmployeeResponse {
        const {passwordHash, ...Sanitized} = employee;
        return Sanitized as unknown as IEmployeeResponse;
    }

    public async login(dto: LoginDTO): Promise<{user: IEmployeeResponse, tokens: IAuthTokens}>{
        const employee = await employeeRepository.findByEmail(dto.email);
        if(!employee || !employee.isActive ){
            throw new AppError('Invalid email or account is inactive', HTTP_STATUS.UNAUTHORIZED);
        }

        const isPasswordValid = await BcryptUtil.comparePassword(dto.password, employee.passwordHash);
        if(!isPasswordValid){
            throw new AppError('Invalid password credentials', HTTP_STATUS.UNAUTHORIZED);
        }

        const payload: IJwtPayload = {
            id: employee.id,
            email: employee.email,
            role: employee.role
        };

        const tokens = JwtUtil.generateTokens(payload);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await authRepository.saveRefreshToken(employee.id, tokens.refreshToken, expiresAt);

        return {
            user: this.sanitizeEmployee(employee as unknown as Record<string, unknown>),
            tokens
        };
    }

    public async refreshTokens(dto: RefreshtokenDTO): Promise<IAuthTokens>{
        let decoded: IJwtPayload;
        try{
            decoded = JwtUtil.verifyRefreshToken(dto.refreshToken);
        }catch {
            throw new AppError('Invalid or expired refresh token', HTTP_STATUS.UNAUTHORIZED)
        }

        const storedToken = await authRepository.findRefreshToken(dto.refreshToken);
        if(!storedToken){
            throw new AppError('Refresh token revoked or missing from session', HTTP_STATUS.UNAUTHORIZED)
        }

        const payload : IJwtPayload = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        const newTokens = JwtUtil.generateTokens(payload);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await authRepository.saveRefreshToken(decoded.id, newTokens.refreshToken, expiresAt);
        return newTokens;
    }

    public async logout(dto: LogoutDTO): Promise<void>{
        await authRepository.deleteRefreshToken(dto.refreshToken);
    }
}

export const authService = new AuthService();