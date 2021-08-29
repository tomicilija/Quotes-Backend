import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  text: string;

  @Column()
  karma: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user_id: User;
}
