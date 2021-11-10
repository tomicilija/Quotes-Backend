import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../auth/dto/createUser.dto';

// Injectable decorator declares the UserService class
@Injectable()
export class UserService {
  // Constructor based dependency injection used to inject instances (often service providers) into classes.
  constructor(
    @InjectRepository(UserRepository)
    private userRepoitory: UserRepository,
  ) {}

  // Gets all of the users information with this specific id
  async getUserById(user_id: User): Promise<User> {
    return this.userRepoitory.getUserById(user_id);
  }

  // Delete user with id
  async deleteUser(user_id: User): Promise<void> {
    this.userRepoitory.deleteUser(user_id);
  }

  // Updates all user information with taht id and all info in body (email, pass, name and surname)
  updateUser(user_id: User, createUserDto: CreateUserDto): Promise<User> {
    return this.userRepoitory.updateUser(user_id, createUserDto);
  }

  /* Doesn't work
  // Get all users with filter, otherwise get all users
  getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userRepoitory.getUsers(filterDto);
  }
  */
}
