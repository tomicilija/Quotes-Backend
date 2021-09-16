import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Quote } from './quote.entity';
import { Vote } from './vote.entity';

// Database - Users table

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // Not alowing 2 of the same emails
  email: string;

  @Column()
  pass: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToOne(() => Quote, (quote) => quote.user_id)
  quote: Quote;

  @OneToMany(() => Vote, (vote) => vote.user_id)
  votes: Vote[];
}
