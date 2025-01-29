import { Request } from 'express';
import { User } from 'src/users/user.entity';

export type UserResponse = Omit<User, 'password'>;

export type LoginResponse = { accessToken: string; user: UserResponse };

export type AccessTokenPayload = { phone: string; sub: number };

export type AuthedRequest = Request & { user: { id: number; phone: string } };
