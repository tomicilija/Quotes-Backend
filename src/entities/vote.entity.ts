import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Quote } from './quote.entity';
import { User } from './user.entity';

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
