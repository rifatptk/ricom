import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  create(payload: User) {
    return this.usersRepository.create(payload);
  }

  findOneByPhone(phone: string) {
    return this.usersRepository.findOneBy({ phone });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
