import {
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import {
  AccessTokenPayload,
  LoginResponse,
  UserResponse,
} from 'src/types/auth.type';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(credentials: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(credentials);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.signIn(user);
  }

  async validateUser(credentials: LoginDto): Promise<User | null> {
    const user = await this.usersService.findOneByPhone(credentials.phone);
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }

  async signIn(user: UserResponse): Promise<LoginResponse> {
    const payload: AccessTokenPayload = { phone: user.phone, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      user,
    };
  }
}
