import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @Length(3, 30)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
