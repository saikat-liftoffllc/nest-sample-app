import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, SchemaTypes } from 'mongoose';

@ObjectType()
@Schema()
export class User extends Document {

  @Field()
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  customProperty?: any
}

export const UserSchema = SchemaFactory.createForClass(User);
