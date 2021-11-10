import { User } from '../../entities/user.entity';
import { Vote } from '../../entities/vote.entity';
import { Repository } from 'typeorm';
export declare class VoteRepository extends Repository<Vote> {
    upvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    downvoteQuote(quotes_user_id: string, user_id: User): Promise<void>;
    deleteVote(quotes_user_id: string, user_id: User): Promise<void>;
    getUserVotes(user_id: string): Promise<Vote>;
    getLikesList(user_id: User): Promise<Vote>;
    getQuotesList(): Promise<Vote>;
}
