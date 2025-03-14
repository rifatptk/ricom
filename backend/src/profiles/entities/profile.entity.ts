import { Address } from 'src/addresses/entities/address.entity';
import { User } from 'src/users/user.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  fb_profile: string;

  @Column({ nullable: true })
  x_profile: string;

  @Column({ nullable: true })
  whatsapp: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
