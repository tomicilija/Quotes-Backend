import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { AuthRepository } from './auth.repository';
import { JwtPayload } from './interfaces/auth.interface';

//Strategy is injectable class
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {
    super({
      //Secret we use to sign the token
      secretOrKey: 'topSecret51',
      //How to extrect token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  //Override default function and provide it with some logic of what we want do do after we know token is valid
  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user: User = await this.authRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
