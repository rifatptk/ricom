import { Role } from 'src/roles/role.entity';
import { Vendor } from 'src/vendors/vendor.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @ManyToOne(() => Vendor, (vendor) => vendor.staffs, { nullable: true })
  vendor: Vendor;
}
