import { Quote } from '../../entities/quote.entity';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/createQuote.dto';
export declare class QuoteRepository extends Repository<Quote> {
    getQuote(user_id: User): Promise<Quote>;
    createQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void>;
    deleteQuote(user_id: User): Promise<void>;
    updateQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void>;
    updateQuoteKarma(status: number, user_id: string): Promise<void>;
}