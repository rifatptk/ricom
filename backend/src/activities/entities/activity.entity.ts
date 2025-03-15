import { OrganizationUser } from 'src/organization-users/entities/organization-user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrganizationUser, (orgUser) => orgUser.activities)
  organization_user: OrganizationUser;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
