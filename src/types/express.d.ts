import { UserRole } from "../constants/userRoles.js";

declare global {
    namespace Express {
        interface Request {
            currentUser?:{
                id: string;
                email: string;
                role: UserRole
            };

            requestId?: string;
        }
    }
}