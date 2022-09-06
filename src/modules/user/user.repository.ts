import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Gets all of the users information with this specific id
  async getUserById(user_id: string): Promise<User> {
    const found = await this.findOne(user_id);

    if (!found) {
      throw new NotFoundException(`User wth ID: "${user_id}" not found`);
    }

    return found;
  }

  // Delete user with id
  async deleteUser(user: User): Promise<void> {
    await this.query('DELETE FROM vote WHERE user_id = $1', [user.id]);
    await this.query('DELETE FROM quote WHERE user_id = $1', [user.id]);
    const result = await this.delete(user);

    if (result.affected == 0) {
      throw new NotFoundException(`User with ID: "${user.id}" not fund`);
    }
  }

  // Updates all user information with taht id and all info in body (email, pass, name and surname)
  async updateUser(user: User, createUserDto: CreateUserDto): Promise<User> {
    const { email, pass, passConfirm, name, surname } = createUserDto;
    const newUser = await this.getUserById(user.id);
    const found = await this.query(
      'SELECT * FROM public.user WHERE email = $1',
      [email],
    );

    if (found[0]) {
      throw new ConflictException(`User wth this email already exists! \n`);
    }

    //Do passwords match?
    if (pass !== passConfirm) {
      throw new ConflictException('Passwords do not match');
    } else {
      //Hash
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.pass, salt);

      newUser.email = email;
      newUser.pass = hashedPassword;
      newUser.name = name;
      newUser.surname = surname;

      await this.save(newUser);
    }
    return newUser;
  }
}
