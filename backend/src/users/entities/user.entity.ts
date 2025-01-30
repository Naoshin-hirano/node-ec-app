import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  Column,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @CreateDateColumn({ name: 'create_at' })
  readonly createdAt?: Timestamp;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt?: Timestamp;

  @Column({ unique: true })
  employee_number: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'role' })
  role: string;
}
