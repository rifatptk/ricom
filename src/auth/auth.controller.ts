import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { AuthedRequest } from 'src/types/auth.type';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() payload: RegisterDto) {
    throw new NotImplementedException();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.authService.authenticate(credentials);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req: AuthedRequest) {
    return req.user;
  }
}
