import bcrypt from 'bcrypt';
import { platform } from 'node:os';


const SALT_ROUNDS = 10;

export class BcryptUtil {
    public static async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    public static async comparePassword(plainText: string, hash: string): Promise<boolean>{
        return bcrypt.compare(plainText, hash);
    }
}