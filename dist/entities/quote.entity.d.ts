import { User } from './user.entity';
import { Vote } from './vote.entity';
export declare class Quote {
    id: string;
    text: string;
    karma: number;
    creation_date: Date;
    user_id: User;
    votes: Vote[];
}
