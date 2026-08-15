export interface LoginDTO {
    email: string;
    password: string;
}

export interface RefreshtokenDTO{
    refreshToken: string;
}

export interface LogoutDTO {
    refreshToken: string;
}