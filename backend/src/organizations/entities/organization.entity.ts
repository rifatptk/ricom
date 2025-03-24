import { OrganizationUser } from 'src/organization-users/entities/organization-user.entity';
import { PasswordPolicy } from 'src/password-policy/password-policy.entity';
import { UserGroup } from 'src/user-groups/entities/user-group.entity';
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
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  banner: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @OneToOne(
    () => PasswordPolicy,
    (passwordPolicy) => passwordPolicy.organization,
    { cascade: true },
  )
  password_policy: PasswordPolicy;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.organization)
  groups: OrganizationUser[];

  @OneToMany(() => OrganizationUser, (orgUser) => orgUser.user)
  members: OrganizationUser[];
}
