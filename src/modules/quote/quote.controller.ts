import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Quote } from '../../entities/quote.entity';
import { User } from '../../entities/user.entity';
import { Vote } from '../../entities/vote.entity';
import { GetUser } from '../auth/get-user.decorator';
import { CreateQuoteDto } from './dto/createQuote.dto';
import { QuoteService } from './quote.service';

@Controller()
export class QuoteController {
  // Controller declares a dependency on the UserService token with constructor
  constructor(private quoteService: QuoteService) {}

  // Gets users quote
  @UseGuards(AuthGuard())
  @Get('myquote')
  getQuote(@GetUser() user_id: User): Promise<Quote> {
    return this.quoteService.getQuote(user_id);
  }

  // Creates quote with qute text, karma = 0 and creation date and time of now
  @UseGuards(AuthGuard())
  @Post('myquote')
  @UsePipes(ValidationPipe)
  createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user_id: User,
  ): Promise<void> {
    return this.quoteService.createQuote(createQuoteDto, user_id);
  }

  // Delete quote
  @UseGuards(AuthGuard())
  @Delete('myquote')
  deleteQuote(@GetUser() user_id: User): Promise<void> {
    return this.quoteService.deleteQuote(user_id);
  }

  // Updates users quote
  @UseGuards(AuthGuard())
  @Patch('myquote')
  updateQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user_id: User,
  ): Promise<void> {
    return this.quoteService.updateQuote(createQuoteDto, user_id);
  }

  // Creates upvote on quote
  @UseGuards(AuthGuard())
  @Post('/user/:id/upvote')
  upvoteQuote(
    @Param('id') quotes_user_id: string,
    @GetUser() user_id: User,
  ): Promise<void> {
    return this.quoteService.upvoteQuote(quotes_user_id, user_id);
  }

  // Creates downvote on quote
  @UseGuards(AuthGuard())
  @Post('/user/:id/downvote')
  downvoteQuote(
    @Param('id') quotes_user_id: string,
    @GetUser() user_id: User,
  ): Promise<void> {
    return this.quoteService.downvoteQuote(quotes_user_id, user_id);
  }

  // Delete upvote quote
  @UseGuards(AuthGuard())
  @Delete('/user/:id/upvote')
  deleteUpvoteQuote(
    @Param('id') quotes_user_id: string,
    @GetUser() user_id: User,
  ): Promise<void> {
    return this.quoteService.deleteUpvoteQuote(quotes_user_id, user_id);
  }

  // Delete downvite quote
  @UseGuards(AuthGuard())
  @Delete('/user/:id/downvote')
  deleteDownvoteQuote(
    @Param('id') quotes_user_id: string,
    @GetUser() user_id: User,
  ): Promise<void> {
    return this.quoteService.deleteDownvoteQuote(quotes_user_id, user_id);
  }

  // Gets users votes
  @UseGuards(AuthGuard())
  @Get('/user/:id')
  getUserVotes(@Param('id') user_id: string): Promise<Vote> {
    return this.quoteService.getUserVotes(user_id);
  }

  // Gets all liked quotes by user descending by karma
  @UseGuards(AuthGuard())
  @Get('/likes')
  getLikesList(@GetUser() user_id: User): Promise<Vote> {
    return this.quoteService.getLikesList(user_id);
  }

  // Gets all quotes and users descending by karma
  @Get('/list')
  getQuotesList(): Promise<Vote> {
    return this.quoteService.getQuotesList();
  }
}
