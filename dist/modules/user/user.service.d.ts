import { User } from '../../entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../auth/dto/createUser.dto';
export declare class UserService {
    private userRepoitory;
    constructor(userRepoitory: UserRepository);
    getUserById(user_id: string): Promise<User>;
    deleteUser(user_id: User): Promise<void>;
    updateUser(user_id: User, createUserDto: CreateUserDto): Promise<User>;
}
