import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { CreateQuoteDto } from './dto/createQuote.dto';
import { QuoteRepository } from './quote.repository';

@Injectable()
export class QuoteService {
  // Constructor based dependency injection used to inject instances (often service providers) into classes.
  constructor(
    @InjectRepository(QuoteRepository)
    private quoteRepoitory: QuoteRepository,
  ) {}

  // Gets quote
  async getQuote(user_id: User): Promise<Quote> {
    return this.quoteRepoitory.getQuote(user_id);
  }

  // Creates quote with qute text, karma = 0 and creation date and time of now
  async createQuote(
    createQuoteDto: CreateQuoteDto,
    user_id: User,
  ): Promise<void> {
    return this.quoteRepoitory.createQuote(createQuoteDto, user_id);
  }

  // Delete quote with id
  async deleteQuote(user_id: User): Promise<void> {
    this.quoteRepoitory.deleteQuote(user_id);
  }

  // Updates quote
  updateQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void> {
    return this.quoteRepoitory.updateQuote(createQuoteDto, user_id);
  }
}
