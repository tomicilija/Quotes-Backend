import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepoitory: UserRepository,
  ) {}

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepoitory.findOne(id);

    if (!found) {
      throw new NotFoundException(`User wth ID: "${id}" not found`);
    }

    return found;
  }
}
