import { IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(3, 30)
  name: string;

  @IsEmail()
  email: string;
}

export class CreateUserDto {
  @Length(3, 30)
  name: string;

  @IsEmail()
  email: string;
}
