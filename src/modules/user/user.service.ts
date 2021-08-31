import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';

// Injectable decorator declares the UserService class
@Injectable()
export class UserService {
  // Constructor based dependency injection used to inject instances (often service providers) into classes.
  constructor(
    @InjectRepository(UserRepository)
    private userRepoitory: UserRepository,
  ) {}
  // Gets all of the users information with this specific id
  async getUserById(id: string): Promise<User> {
    return this.userRepoitory.getUserById(id);
  }
  // Creates user with email, pass, name and surname
  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepoitory.createUser(createUserDto);
  }
  // Delete user with id
  async deleteUser(id: string): Promise<void> {
    this.userRepoitory.delete(id);
  }
  // Updates all user information with taht id and all info in body (email, pass, name and surname)
  updateUser(id: string, createUserDto: CreateUserDto): Promise<User> {
    return this.userRepoitory.updateUser(id, createUserDto);
  }
}
