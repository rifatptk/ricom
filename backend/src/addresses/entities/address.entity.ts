export enum AddressableType {
  PROFILE = 'PROFILE',
  ORGANIZATION = 'ORGANIZATION',
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  addressable_type: AddressableType;

  @Column()
  addressable_id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  details: string;

  @Column({ nullable: true })
  country: string;

  @Column()
  division: string;

  @Column()
  district: string;

  @Column()
  upazila: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
