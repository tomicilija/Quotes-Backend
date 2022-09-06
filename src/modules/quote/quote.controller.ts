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

  // Gets my quote
  @UseGuards(AuthGuard())
  @Get('myquote')
  getQuote(@GetUser() user_id: string): Promise<Quote> {
    return this.quoteService.getQuote(user_id);
  }

  // Gets users quote
  @Get('/quote/:id')
  getUsersQuote(@Param('id') user_id: string): Promise<Quote> {
    return this.quoteService.getUsersQuote(user_id);
  }

  // Creates quote with qute text, karma = 0 and creation date and time of now
  @UseGuards(AuthGuard())
  @Post('myquote')
  @UsePipes(ValidationPipe)
  createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.quoteService.createQuote(createQuoteDto, user);
  }

  // Delete quote
  @UseGuards(AuthGuard())
  @Delete('myquote')
  deleteQuote(@GetUser() user: string): Promise<void> {
    return this.quoteService.deleteQuote(user);
  }

  // Updates users quote
  @UseGuards(AuthGuard())
  @Patch('myquote')
  updateQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: string,
  ): Promise<void> {
    return this.quoteService.updateQuote(createQuoteDto, user);
  }

  // Gets users vote status of the quote
  @UseGuards(AuthGuard())
  @Get('/user/:id/vote')
  voteStatusCheck(
    @Param('id') user_id: string,
    @GetUser() user: User,
  ): Promise<string> {
    return this.quoteService.voteStatusCheck(user_id, user);
  }

  // Creates upvote on quote
  @UseGuards(AuthGuard())
  @Post('/user/:id/upvote')
  upvoteQuote(
    @Param('id') user_id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.quoteService.upvoteQuote(user_id, user);
  }

  // Creates downvote on quote
  @UseGuards(AuthGuard())
  @Post('/user/:id/downvote')
  downvoteQuote(
    @Param('id') user_id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.quoteService.downvoteQuote(user_id, user);
  }

  // Delete upvote quote
  @UseGuards(AuthGuard())
  @Delete('/user/:id/upvote')
  deleteUpvoteQuote(
    @Param('id') user_id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.quoteService.deleteUpvoteQuote(user_id, user);
  }

  // Delete downvite quote
  @UseGuards(AuthGuard())
  @Delete('/user/:id/downvote')
  deleteDownvoteQuote(
    @Param('id') user_id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.quoteService.deleteDownvoteQuote(user_id, user);
  }

  // Gets users votes
  @UseGuards(AuthGuard())
  @Get('/user/:id')
  getUserVotes(@Param('id') user_id: string): Promise<Vote> {
    return this.quoteService.getUserVotes(user_id);
  }

  // Gets all liked quotes by user descending by karma
  @Get('/likes')
  getLikesList(): Promise<Vote> {
    return this.quoteService.getLikesList();
  }

  // Gets all quotes and users descending by karma
  @Get('/recent')
  getRecentQuotes(): Promise<Vote> {
    return this.quoteService.getRecentQuotes();
  }
}
