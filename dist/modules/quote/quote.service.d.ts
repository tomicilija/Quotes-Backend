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
    getUsersQuote(user_id: string): Promise<Quote>;
    createQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void>;
    deleteQuote(user_id: User): Promise<void>;
    updateQuote(createQuoteDto: CreateQuoteDto, user_id: User): Promise<void>;
    voteStatusCheck(user_id: string, user: User): Promise<string>;
    upvoteQuote(user_id: string, user: User): Promise<void>;
    downvoteQuote(user_id: string, user: User): Promise<void>;
    deleteUpvoteQuote(user_id: string, user: User): Promise<void>;
    deleteDownvoteQuote(user_id: string, user: User): Promise<void>;
    updateQuoteKarma(status: number, user_id: string): Promise<void>;
    getUserVotes(user_id: string): Promise<Vote>;
    getLikesList(): Promise<Vote>;
    getRecentQuotes(): Promise<Vote>;
}
