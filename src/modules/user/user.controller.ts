import {
  Controller,
  Get,
  Body,
  Delete,
  Patch,
  UseGuards,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Controller('me')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  // Controller declares a dependency on the UserService token with constructor
  constructor(private userService: UserService) {}

  // Gets all of the users information with this specific id
  @Get()
  getUserById(@GetUser() user: User): Promise<User> {
    return this.userService.getUserById(user.id);
  }

  // Delete user with id
  @Delete()
  deleteUser(@GetUser() user_id: User): Promise<void> {
    return this.userService.deleteUser(user_id);
  }

  // Updates all user information with that id and all info in body (email, pass, name and surname)
  @Patch('/update-password')
  @UsePipes(ValidationPipe)
  updateUser(
    @GetUser() user_id: User,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(user_id, createUserDto);
  }
  @Get('/:id')
  getUserVotes(@Param('id') user_id: string): Promise<User> {
    return this.userService.getUserById(user_id);
  }
}
