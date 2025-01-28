import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity'; // Vendor's user admin reference

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Name of the vendor/store

  @Column({ nullable: true })
  description: string; // Short description of the store

  @Column({ nullable: true })
  email: string; // Contact email for the vendor/store

  @Column({ nullable: true })
  phone: string; // Contact phone number for the vendor/store

  @Column({ default: true })
  is_active: boolean; // Status of the vendor (active or inactive)

  @Column({ nullable: true })
  logo_url: string; // URL for the store's logo (branding)

  @Column({ nullable: true })
  website_url: string; // Link to the vendor's website (optional)

  @OneToMany(() => User, (user) => user.vendor) // Vendor Staff, Managers, Admins
  staffs: User[];
}
