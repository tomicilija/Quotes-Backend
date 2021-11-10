import { Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { JwtPayload } from '../interfaces/auth.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
