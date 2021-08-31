import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';

import { User } from './user.entity';

// Database - Quotes table has one to one connection with user
//  (one user can only have one quote and quote belongs to only on user)

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  text: string;

  @Column()
  karma: number;

  @Column({ type: 'timestamptz' }) // Date_time with timezone
  creation_date: Date;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user_id: User;
}
