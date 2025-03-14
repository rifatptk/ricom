import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/user.entity';
import { Role } from './roles/entitites/role.entity';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { Category } from './categories/entities/category.entity';
import { SubCategory } from './sub-categories/entities/sub-category.entity';
import { OrganizationsModule } from './organizations/organizations.module';
import { Organization } from './organizations/entities/organization.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/entities/profile.entity';
import { AddressesModule } from './addresses/addresses.module';
import { Address } from './addresses/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'ricom',
      entities: [
        User,
        Profile,
        Address,
        Role,
        Organization,
        Category,
        SubCategory,
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    CategoriesModule,
    SubCategoriesModule,
    OrganizationsModule,
    ProfilesModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
