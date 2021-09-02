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
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/auth.interface';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  private jwtService = JwtService;

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
}
