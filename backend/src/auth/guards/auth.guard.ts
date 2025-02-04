import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from 'src/types/auth.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    const token = authorization.split(' ')[1];

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload: AccessTokenPayload =
        await this.jwtService.verifyAsync(token);
      request.user = { id: tokenPayload.sub, phone: tokenPayload.phone };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
