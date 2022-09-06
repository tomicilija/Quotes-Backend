import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
export declare class UserRepository extends Repository<User> {
    getUserById(user_id: string): Promise<User>;
    deleteUser(user: User): Promise<void>;
    updateUser(user: User, createUserDto: CreateUserDto): Promise<User>;
}
