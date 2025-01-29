import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role, RoleName } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async findAll() {
    return this.rolesRepository.find();
  }

  async findOneById(id: number) {
    return this.rolesRepository.findOneBy({ id });
  }

  async findOneByName(name: RoleName) {
    return this.rolesRepository.findOneBy({ name });
  }
}
