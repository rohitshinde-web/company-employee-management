import { UserRole } from "../constants/userRoles";

export interface IJwtPayload {
    id: string;
    email: string;
    role: UserRole
}

export interface IAuthTokens {
    accessToken: string;
    refreshToken: string;
}