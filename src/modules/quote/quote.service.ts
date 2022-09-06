import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from '../../entities/quote.entity';
import { User } from '../../entities/user.entity';
import { Vote } from '../../entities/vote.entity';
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

  // Gets my quote
  async getQuote(user_id: string): Promise<Quote> {
    return this.quoteRepository.getQuote(user_id);
  }

  // Gets users quote
  async getUsersQuote(user_id: string): Promise<Quote> {
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
  async deleteQuote(user_id: string): Promise<void> {
    this.quoteRepository.deleteQuote(user_id);
  }

  // Updates quote
  updateQuote(createQuoteDto: CreateQuoteDto, user_id: string): Promise<void> {
    return this.quoteRepository.updateQuote(createQuoteDto, user_id);
  }

  // Gets users vote status of the quote
  async voteStatusCheck(user_id: string, user: User): Promise<string> {
    return this.voteRepository.voteStatusCheck(user_id, user);
  }

  // Creates upvote on quote
  async upvoteQuote(user_id: string, user: User): Promise<void> {
    return this.voteRepository.upvoteQuote(user_id, user).then(() => {
      this.updateQuoteKarma(1, user_id);
    });
  }

  // Creates downvote on quote
  async downvoteQuote(user_id: string, user: User): Promise<void> {
    return this.voteRepository.downvoteQuote(user_id, user).then(() => {
      this.updateQuoteKarma(-1, user_id);
    });
  }

  // Deletes upvote on quote
  async deleteUpvoteQuote(user_id: string, user: User): Promise<void> {
    return this.voteRepository.deleteVote(user_id, user).then(() => {
      this.updateQuoteKarma(-1, user_id);
    });
  }

  // Deletes downvote on quote
  async deleteDownvoteQuote(user_id: string, user: User): Promise<void> {
    return this.voteRepository.deleteVote(user_id, user).then(() => {
      this.updateQuoteKarma(1, user_id);
    });
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
  async getLikesList(): Promise<Vote> {
    return this.voteRepository.getLikesList();
  }

  // Gets all quotes and users descending by karma
  async getRecentQuotes(): Promise<Vote> {
    return this.voteRepository.getRecentQuotes();
  }
}
