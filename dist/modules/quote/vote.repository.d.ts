import { User } from '../../entities/user.entity';
import { Vote } from '../../entities/vote.entity';
import { Repository } from 'typeorm';
export declare class VoteRepository extends Repository<Vote> {
    voteStatusCheck(user_id: string, user: User): Promise<string>;
    upvoteQuote(user_id: string, user: User): Promise<void>;
    downvoteQuote(user_id: string, user: User): Promise<void>;
    deleteVote(user_id: string, user: User): Promise<void>;
    getUserVotes(user_id: string): Promise<Vote>;
    getLikesList(): Promise<Vote>;
    getRecentQuotes(): Promise<Vote>;
}
