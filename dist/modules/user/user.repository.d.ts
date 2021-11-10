import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
export declare class UserRepository extends Repository<User> {
    getUserById(user_id: User): Promise<User>;
    deleteUser(user_id: User): Promise<void>;
    updateUser(user_id: User, createUserDto: CreateUserDto): Promise<User>;
}
