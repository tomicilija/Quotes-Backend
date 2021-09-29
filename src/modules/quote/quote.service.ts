import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { CreateQuoteDto } from './dto/createQuote.dto';
import { QuoteRepository } from './quote.repository';
import { VoteRepository } from './vote.repository';

@Injectable()
export class QuoteService {
  // Constructor based dependency injection used to inject instances (often service providers) into classes.
  constructor(
    @InjectRepository(QuoteRepository)
    private quoteRepository: QuoteRepository,
    @InjectRepository(VoteRepository)
    private voteRepository: VoteRepository,
  ) {}

  // Gets quote
  async getQuote(user_id: User): Promise<Quote> {
    return this.quoteRepository.getQuote(user_id);
  }

  // Creates quote with qute text, karma = 0 and creation date and time of now
  async createQuote(
    createQuoteDto: CreateQuoteDto,
    user_id: User,
  ): Promise<void> {
    return this.quoteRepository.createQuote(createQuoteDto, user_id);
  }

  // Delete quote with id
  async deleteQuote(user_id: User): Promise<void> {
    this.quoteRepository.deleteQuote(user_id);
  }

  // Updates quote
  updateQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void> {
    return this.quoteRepository.updateQuote(createQuoteDto, user_id);
  }

  // Creates upvote on quote
  async upvoteQuote(quotes_user_id: string, user_id: User): Promise<void> {
    this.voteRepository.upvoteQuote(quotes_user_id, user_id);
    this.updateQuoteKarma(1, quotes_user_id);
  }

  // Creates downvote on quote
  async downvoteQuote(quotes_user_id: string, user_id: User): Promise<void> {
    this.voteRepository.downvoteQuote(quotes_user_id, user_id);
    this.updateQuoteKarma(-1, quotes_user_id);
  }

  // Deletes upvote on quote
  async deleteUpvoteQuote(
    quotes_user_id: string,
    user_id: User,
  ): Promise<void> {
    this.voteRepository.deleteVote(quotes_user_id, user_id);
    this.updateQuoteKarma(-1, quotes_user_id);
  }

  // Deletes downvote on quote
  async deleteDownvoteQuote(
    quotes_user_id: string,
    user_id: User,
  ): Promise<void> {
    this.voteRepository.deleteVote(quotes_user_id, user_id);
    this.updateQuoteKarma(1, quotes_user_id);
  }

  // Updates karma
  updateQuoteKarma(status: number, user_id: string): Promise<void> {
    return this.quoteRepository.updateQuoteKarma(status, user_id);
  }

  // Gets user votes
  async getUserVotes(user_id: string): Promise<Vote> {
    return this.voteRepository.getUserVotes(user_id);
  }
  
  // Gets all liked quotes by user descending by karma
  async getLikesList(user_id: User): Promise<Vote> {
    return this.voteRepository.getLikesList(user_id);
  }

  // Gets all quotes and users descending by karma
  async getQuotesList(): Promise<Vote> {
    return this.voteRepository.getQuotesList();
  }
}
