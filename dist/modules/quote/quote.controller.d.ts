import { Quote } from '../../entities/quote.entity';
import { User } from '../../entities/user.entity';
import { Vote } from '../../entities/vote.entity';
import { CreateQuoteDto } from './dto/createQuote.dto';
import { QuoteService } from './quote.service';
export declare class QuoteController {
    private quoteService;
    constructor(quoteService: QuoteService);
    getQuote(user_id: User): Promise<Quote>;
    createQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void>;
    deleteQuote(user_id: User): Promise<void>;
    updateQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void>;
    upvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    downvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    deleteUpvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    deleteDownvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    getUserVotes(user_id: string): Promise<Vote>;
    getLikesList(user_id: User): Promise<Vote>;
    getQuotesList(): Promise<Vote>;
}
