import { NotFoundException } from '@nestjs/common';
import { constants } from 'buffer';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/createQuote.dto';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {
  // Gets quote with this specific id
  async getQuoteById(id: string): Promise<Quote> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Quote wth ID: "${id}" not found`);
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
    console.log(quote);
  }
}
