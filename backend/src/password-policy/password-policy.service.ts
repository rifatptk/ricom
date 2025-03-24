import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordPolicy } from './password-policy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordPolicyService {
  constructor(
    @InjectRepository(PasswordPolicy)
    private passwordPolicyRepository: Repository<PasswordPolicy>,
  ) {}

  create(data: Partial<PasswordPolicy>) {
    return `This will create organization's password policy`;
  }
}
