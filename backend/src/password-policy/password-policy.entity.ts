import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PasswordPolicy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  need_password_reset: boolean;

  @Column()
  policy: string;

  @OneToOne(
    () => Organization,
    (organization) => organization.password_policy,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  organization: Organization;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
