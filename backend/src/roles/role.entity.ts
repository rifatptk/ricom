import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum RoleName {
  SUPER_ADMIN = 'SUPER_ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
  VENDOR_ADMIN = 'VENDOR_ADMIN',
  VENDOR_MANAGER = 'VENDOR_MANAGER',
  VENDOR_STAFF = 'VENDOR_STAFF',
  CUSTOMER = 'CUSTOMER',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: RoleName;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
