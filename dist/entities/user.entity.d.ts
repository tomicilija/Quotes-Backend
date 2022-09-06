import { Quote } from './quote.entity';
import { Vote } from './vote.entity';
export declare class User {
    id: string;
    email: string;
    pass: string;
    name: string;
    surname: string;
    quote: Quote;
    votes: Vote[];
}
