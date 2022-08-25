import { Quote } from '../../entities/quote.entity';
import { User } from '../../entities/user.entity';
import { Vote } from '../../entities/vote.entity';
import { CreateQuoteDto } from './dto/createQuote.dto';
import { QuoteService } from './quote.service';
export declare class QuoteController {
    private quoteService;
    constructor(quoteService: QuoteService);
    getQuote(user_id: User): Promise<Quote>;
    getUsersQuote(user_id: string): Promise<Quote>;
    createQuote(createQuoteDto: CreateQuoteDto, user: User): Promise<void>;
    deleteQuote(user: User): Promise<void>;
    updateQuote(createQuoteDto: CreateQuoteDto, user: User): Promise<void>;
    voteStatusCheck(user_id: string, user: User): Promise<string>;
    upvoteQuote(user_id: string, user: User): Promise<void>;
    downvoteQuote(user_id: string, user: User): Promise<void>;
    deleteUpvoteQuote(user_id: string, user: User): Promise<void>;
    deleteDownvoteQuote(user_id: string, user: User): Promise<void>;
    getUserVotes(user_id: string): Promise<Vote>;
    getLikesList(): Promise<Vote>;
    getRecentQuotes(): Promise<Vote>;
}
