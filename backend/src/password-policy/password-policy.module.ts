import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordPolicy } from './password-policy.entity';
import { PasswordPolicyService } from './password-policy.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordPolicy])],
  providers: [PasswordPolicyService],
  exports: [PasswordPolicyService],
})
export class PasswordPolicyModule {}
