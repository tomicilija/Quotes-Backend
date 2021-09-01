import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';

@Controller('user')
export class UserController {
  // Controller declares a dependency on the UserService token with constructor
  constructor(private userService: UserService) {}

  // Gets all of the users information with this specific id
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  // Delete user with id
  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  // Updates all user information with taht id and all info in body (email, pass, name and surname)
  @Patch('/:id/changeprofile')
  updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, createUserDto);
  }

  /* Doesn't work
  // If we have any filter dedined, get all users with filter, otherwise get all users
  @Get()
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userService.getUsers(filterDto);
  }
  */
}
