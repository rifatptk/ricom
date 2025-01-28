import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';

export enum RoleName {
  SUPER_ADMIN = 'super-admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  VENDOR_ADMIN = 'vendor-admin',
  VENDOR_MANAGER = 'vendor-manager',
  VENDOR_STAFF = 'vendor-staff',
  CUSTOMER = 'customer',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: RoleName;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
