//Data Transfer Object - Expected shape of body

import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

// Validaton Doesnt Work  (allows empty spaces, week pasword..) ------------------------------------------ ! ! ! ! -------------

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  // Passwords will contain at least 1 upper case letter
  // Passwords will contain at least 1 lower case letter
  // Passwords will contain at least 1 number or special character
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak (Must contain: at least 1 upper case letter, least 1 lower case letter, 1 number or special character)',
  })
  pass: string;

  @IsNotEmpty()
  passConfirm: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;
}
