import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { LoginUserDto } from '../auth/dto/loginUser.dto';
import * as bcrypt from 'bcrypt';

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
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const { email, pass, name, surname } = createUserDto;

    //Hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);

    const user = this.create({
      email,
      pass: hashedPassword,
      name,
      surname,
    });
    try {
      await this.save(user);
    } catch (error) {
      //Catches Duplicate email with error code 23505
      if (error.code === '23505') {
        throw new ConflictException(
          'User is already registerd with that email!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Signs in user with email, pass, name and surname
  async signIn(loginUserDto: LoginUserDto): Promise<string> {
    const { email, pass } = loginUserDto;
    const user = await this.findOne({ email });

    if (user && (await bcrypt.compare(pass, user.pass))) {
      return 'Success';
    } else {
      throw new UnauthorizedException('Please check your login creentials');
    }
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

    //Hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.pass, salt);

    user.email = createUserDto.email;
    user.pass = hashedPassword;
    user.name = createUserDto.name;
    user.surname = createUserDto.surname;

    await this.save(user);

    return user;
  }

  /* Doesn't work
  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('user');
    if (search) {
      query.andWhere('user.email LIKE search', { search: `%${search}%` });
    }
    const users = await query.getMany();
    return users;
  }
  */
}
