import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserById(user: User): Promise<User>;
    deleteUser(user_id: User): Promise<void>;
    updateUser(user_id: User, createUserDto: CreateUserDto): Promise<User>;
    getUserVotes(user_id: string): Promise<User>;
}
