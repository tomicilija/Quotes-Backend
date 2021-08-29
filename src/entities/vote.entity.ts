import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Quote } from './quote.entity';
import { User } from './user.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  user_id: User;

  @ManyToOne(() => Quote, (quote) => quote.id)
  quote_id: Quote;

}
