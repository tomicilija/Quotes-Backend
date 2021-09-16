import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { CreateQuoteDto } from './dto/createQuote.dto';
import { QuoteService } from './quote.service';

@Controller('myquote')
@UseGuards(AuthGuard())
export class QuoteController {
  // Controller declares a dependency on the UserService token with constructor
  constructor(private quoteService: QuoteService) {}

  // Gets all of the users information with this specific id
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<Quote> {
    return this.quoteService.getUserById(id);
  }

  // Creates quote with qute text, karma = 0 and creation date and time of now
  @Post()
  createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user_id: User,
  ): Promise<void> {
    return this.quoteService.createQuote(createQuoteDto, user_id);
  }
}
