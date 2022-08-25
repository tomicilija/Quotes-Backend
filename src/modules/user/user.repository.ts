import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Gets all of the users information with this specific id
  async getUserById(user_id: User): Promise<User> {
    const found = await this.findOne(user_id);

    if (!found) {
      throw new NotFoundException(`User wth ID: "${user_id.id}" not found`);
    }

    return found;
  }

  // Delete user with id
  async deleteUser(user_id: User): Promise<void> {
    await this.query('DELETE FROM vote WHERE user_id = $1', [user_id.id]);
    await this.query('DELETE FROM quote WHERE user_id = $1', [user_id.id]);
    const result = await this.delete(user_id);

    if (result.affected == 0) {
      throw new NotFoundException(`User with ID: "${user_id.id}" not fund`);
    }
  }

  // Updates all user information with taht id and all info in body (email, pass, name and surname)
  async updateUser(user_id: User, createUserDto: CreateUserDto): Promise<User> {
    const { email, pass, passConfirm, name, surname } = createUserDto;
    const user = await this.getUserById(user_id);

    //Do passwords match?
    if (pass !== passConfirm) {
      throw new ConflictException('Passwords do not match');
    } else {
      //Hash
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.pass, salt);

      // TODO - add password confirm and compare to password

      // TODO - check if email is already in use - not sure if needed

      user.email = email;
      user.pass = hashedPassword;
      user.name = name;
      user.surname = surname;

      await this.save(user);
    }
    return user;
  }
}
