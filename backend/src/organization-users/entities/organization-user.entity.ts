import { Activity } from 'src/activities/entities/activity.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { UserGroup } from 'src/user-groups/entities/user-group.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrganizationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Organization, (org) => org.members)
  organization: Organization;

  @Column()
  employee_id: number;

  @ManyToMany(() => UserGroup)
  user_groups: UserGroup[];

  @ManyToMany(() => Permission)
  additional_permissions: Permission[];

  @OneToMany(() => Activity, (activity) => activity.organization_user)
  @JoinColumn()
  activities: Activity[];

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
