import { permission } from 'process';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Organization, (organization) => organization.groups)
  @JoinColumn()
  organization: Organization;

  @ManyToMany(() => Permission, (permission) => permission.user_groups)
  @JoinColumn()
  permissions: Permission[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
