import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  // Creates user with email, pass, name and surname
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.authRepository.signUp(createUserDto);
  }

  // Signs in user with email and pass
  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, pass } = loginUserDto;
    const user = await this.authRepository.findOne({ email });

    //checks if there is user found and if password matches with one in database
    if (user && (await bcrypt.compare(pass, user.pass))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login creentials');
    }
  }
}
