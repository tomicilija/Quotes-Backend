import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
export declare class AuthRepository extends Repository<User> {
    private jwtService;
    signUp(createUserDto: CreateUserDto): Promise<void>;
}
