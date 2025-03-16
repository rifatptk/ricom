import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordPolicy } from './pass-policy.entity';
import { PasswordPolicyService } from './pass-policy.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordPolicy])],
  providers: [PasswordPolicyService],
  exports: [PasswordPolicyService],
})
export class PasswordPolicyModule {}
