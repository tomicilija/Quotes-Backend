import { Strategy } from 'passport-jwt';
import { User } from '../../entities/user.entity';
import { AuthRepository } from './auth.repository';
import { JwtPayload } from './interfaces/auth.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: AuthRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
