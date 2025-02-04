import { IsEmail, IsString, minLength, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(10)
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
