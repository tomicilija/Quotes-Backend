import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Quote } from './quote.entity';
import { User } from './user.entity';

// Database - Votes table records all likes by users so we can see who has liked (or disliked) which posts
//  (vote id, status - like or dislike, quote id and user id)

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @ManyToOne(() => Quote, (quote) => quote.id, { cascade: true })
  @JoinColumn({ name: 'quote_id' })
  quote_id: string;
}
