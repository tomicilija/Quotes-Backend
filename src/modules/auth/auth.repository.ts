import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
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
}
