import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Gets all of the users information with this specific id
  async getUserById(id: string): Promise<User> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`User wth ID: "${id}" not found`);
    }

    return found;
  }
  // Creates user with email, pass, name and surname
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
  // Delete user with id
  async deleteUser(id: string): Promise<void> {
    const result = await this.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`User with ID: "${id}" not fund`);
    }
  }
  // Updates all user information with taht id and all info in body (email, pass, name and surname)
  async updateUser(id: string, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    user.email = createUserDto.email;
    user.pass = createUserDto.pass;
    user.name = createUserDto.name;
    user.surname = createUserDto.surname;

    await this.save(user);

    return user;
  }
}
