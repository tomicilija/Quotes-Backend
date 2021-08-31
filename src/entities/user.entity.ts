import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Database - Users table

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  pass: string;

  @Column()
  name: string;

  @Column()
  surname: string;
}
