import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller()
export class AuthController {
  // Controller declares a dependency on the UserService token with constructor
  constructor(private authrService: AuthService) {}

  // Creates user with email, pass, name and surname
  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authrService.signUp(createUserDto);
  }

  // Signs in user with email, pass, name and surname
  @Post('/login')
  @UsePipes(ValidationPipe)
  signIn(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authrService.signIn(loginUserDto);
  }
}
