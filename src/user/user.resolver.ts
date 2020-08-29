import {
  Args,
  Query,
  Resolver,
  Parent,
  ResolveField,
  Mutation,
} from '@nestjs/graphql';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user';
import { CreateUserDto } from './dto/user.create.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserDto): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  @Query(() => User)
  async user(
    @Args('name', { type: () => String }) name: string,
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.userModel.findOne({ name, email });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userModel.find();
  }

  @ResolveField()
  async friends(@Parent() user: User): Promise<User[]> {
    console.log('ResolveField, user', user);
    return this.userModel.find();
  }
}
