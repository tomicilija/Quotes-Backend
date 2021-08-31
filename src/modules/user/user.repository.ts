import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUserById(id: string): Promise<User> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`User wth ID: "${id}" not found`);
    }

    return found;
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, pass, name, surname } = createUserDto;

    const user = this.create({
      email,
      pass,
      name,
      surname,
    });

    await this.save(user);
    return user;
  }
}
