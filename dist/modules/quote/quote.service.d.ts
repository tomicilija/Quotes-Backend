import { Quote } from '../../entities/quote.entity';
import { User } from '../../entities/user.entity';
import { Vote } from '../../entities/vote.entity';
import { CreateQuoteDto } from './dto/createQuote.dto';
import { QuoteRepository } from './quote.repository';
import { VoteRepository } from './vote.repository';
export declare class QuoteService {
    private quoteRepository;
    private voteRepository;
    constructor(quoteRepository: QuoteRepository, voteRepository: VoteRepository);
    getQuote(user_id: User): Promise<Quote>;
    createQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void>;
    deleteQuote(user_id: User): Promise<void>;
    updateQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void>;
    upvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    downvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    deleteUpvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    deleteDownvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    updateQuoteKarma(status: number, user_id: string): Promise<void>;
    getUserVotes(user_id: string): Promise<Vote>;
    getLikesList(user_id: User): Promise<Vote>;
    getQuotesList(): Promise<Vote>;
}
