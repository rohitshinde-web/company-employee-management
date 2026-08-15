import { BaseRepository } from "./base.repositories";

export interface IRefreshTokenRecord {
    id: string;
    employeeId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
}

export class AuthRepository extends BaseRepository<IRefreshTokenRecord>{
    public async saveRefreshToken(employeeId: string, token: string, expiresAt: Date): Promise<void>{
        const query = `
        INSERT INTO refresh_tokens (employeeId, token, expires_at)
        VALUES ($1, $2, $3)
        `;

        await this.query(query, [employeeId, token, expiresAt]);
    }

    public async findRefreshToken(token: string): Promise<IRefreshTokenRecord | null>{
        const query = `
        SELECT id, employee_id AS "employeeId", token, expires_at AS "expiresAt", created_at AS "createdAt"
        FROM refresh_tokens
        WHERE token = $1 AND expires_at > CURRENT_TIMESTAMP
        LIMIT 1`;

        const result = await this.query(query, [token]);
        return result.rows.length ? result.rows[0] : null;
    }

    public async deleteRefreshToken(token: string): Promise<void>{
        const query = `
        DELETE FROM refresh_tokens WHERE token = $1`;
        await this.query(query, [token]);
    }

    public async deleteAllUserRefreshTokens(employeeId: string): Promise<void>{
        const query = `
        DELETE FROM refresh_tokens WHERE employee_id = $1`;
        await this.query(query, [employeeId]);
    }


}

export const authRepository = new AuthRepository();