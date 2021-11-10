//Data Transfer Object - Expected shape of body

import { IsNotEmpty } from 'class-validator';

// Validaton Doesnt Work  (allows empty spaces, week pasword..) ------------------------------------------ ! ! ! ! -------------

export class CreateQuoteDto {
  @IsNotEmpty()
  text: string;
}
