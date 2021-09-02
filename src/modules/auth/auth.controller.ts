import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller()
export class AuthController {
  // Controller declares a dependency on the UserService token with constructor
  constructor(private authrService: AuthService) {}

  // Creates user with email, pass, name and surname
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authrService.signUp(createUserDto);
  }

  // Signs in user with email, pass, name and surname
  @Post('/login')
  signIn(@Body() loginUserDto: LoginUserDto): Promise<{ accesToken: string }> {
    return this.authrService.signIn(loginUserDto);
  }
}
