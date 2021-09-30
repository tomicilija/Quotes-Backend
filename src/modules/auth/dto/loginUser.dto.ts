//Data Transfer Object - Expected shape of body

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  //@IsEmail()
  email: string;
  @IsNotEmpty()
  //@MinLength(8)
  pass: string;
}
