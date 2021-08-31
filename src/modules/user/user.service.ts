import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepoitory: UserRepository,
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.userRepoitory.getUserById(id);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepoitory.createUser(createUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepoitory.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Task with ID: "${id}" not fund`);
    }
  }

  async updateUser(id: string, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    user.email = createUserDto.email;
    user.pass = createUserDto.pass;
    user.name = createUserDto.name;
    user.surname = createUserDto.surname;

    await this.userRepoitory.save(user);

    return user;
  }
}
