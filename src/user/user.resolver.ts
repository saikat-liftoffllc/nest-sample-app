import { Args, Query, Resolver } from '@nestjs/graphql';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user';

@Resolver(() => User)
export class UserResolver {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Query(() => User)
  async user(@Args('name') name: string): Promise<User> {
    return this.userModel.findOne({ name });
  }
}
