import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class User extends Document {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
