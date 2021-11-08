import { NotFoundException } from '@nestjs/common';
import { Quote } from '../../entities/quote.entity';
import { User } from '../../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/createQuote.dto';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {
  // Gets quote
  async getQuote(user_id: User): Promise<Quote> {
    const found = await this.findOne({ where: { user_id: user_id } });

    if (!found) {
      throw new NotFoundException(`Quote not found`);
    }

    return found;
  }

  // Creates quote with qute text, karma = 0 and creation date and time of now
  async createQuote(
    createQuoteDto: CreateQuoteDto,
    user_id: User,
  ): Promise<void> {
    const { text } = createQuoteDto;
    const datetime = new Date();
    const quote = this.create({
      text,
      karma: 0,
      creation_date: datetime,
      user_id,
    });
    await this.save(quote);
    //console.log(quote);
  }

  // Delete quote with id
  async deleteQuote(user_id: User): Promise<void> {
    const quote = await this.getQuote(user_id);
    const result = await this.delete(quote);
    if (result.affected == 0) {
      throw new NotFoundException(`Quote not fund`);
    }
  }

  // Updates quote with qute text, karma = 0 and creation date and time of now
  async updateQuote(
    createQuoteDto: CreateQuoteDto,
    user_id: User,
  ): Promise<void> {
    const quote = await this.getQuote(user_id);

    if (!quote) {
      throw new NotFoundException(`Quote not found`);
    }
    const datetime = new Date();
    (quote.text = createQuoteDto.text),
      (quote.karma = 0),
      (quote.creation_date = datetime),
      await this.save(quote);
  }

  // Updates quote with qute text, karma = 0 and creation date and time of now
  async updateQuoteKarma(status: number, user_id: string): Promise<void> {
    const quote = await this.findOne({ where: { user_id: user_id } });

    if (!quote) {
      throw new NotFoundException(`Quote not found`);
    }

    quote.karma = quote.karma + status;
    await this.save(quote);
  }
}