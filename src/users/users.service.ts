import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async create(dto: SignupDto) {
    const existingUser = await this.usersRepository.findOneBy({
      phone: dto.phone,
    });
    if (existingUser) throw new ConflictException('Phone already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  findOneByPhone(phone: string) {
    return this.usersRepository.findOneBy({ phone });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
