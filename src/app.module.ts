import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { VendorModule } from './vendor/vendor.module';
import { VendorsModule } from './vendors/vendors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'ricom',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    UsersModule,
    RolesModule,
    VendorModule,
    VendorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
