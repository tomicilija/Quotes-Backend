import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  // Gets users quote
  @Get()
  getQuote(@GetUser() user_id: User): Promise<Quote> {
    return this.quoteService.getQuote(user_id);
  }

  // Creates quote with qute text, karma = 0 and creation date and time of now
  @Post()
  createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user_id: User,
  ): Promise<void> {
    return this.quoteService.createQuote(createQuoteDto, user_id);
  }

  // Delete quote with id
  @Delete()
  deleteQuote(@GetUser() user_id: User): Promise<void> {
    return this.quoteService.deleteQuote(user_id);
  }

  // Updates users quote
  @Patch()
  updateUser(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user_id: User,
  ): Promise<void> {
    return this.quoteService.updateQuote(createQuoteDto, user_id);
  }
}
