import {
  Args,
  Query,
  Resolver,
  Parent,
  ResolveField,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user';
import { CreateUserDto } from './dto/user.create.dto';
import DataLoader from 'dataloader';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  protected userLoader: any;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {

    this.userLoader = new DataLoader(async (userIds: string[]) => {
      console.log('userIds', userIds)
      const users = await this.userModel.find({ _id: { $in: userIds } });
      return userIds.map(() => users);
    });

  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserDto): Promise<User> {
    const user = new this.userModel(data);
    user.customProperty = (await this.userModel.find())[0].id;
    user.save();
    pubSub.publish('userCreated', { userCreated: user });
    return user;
  }

  @Subscription(() => User)
  userCreated(): any {
    return pubSub.asyncIterator('userCreated');
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

  @ResolveField('friends', () => [User])
  async friends(@Parent() user: User): Promise<User[]> {
    const friends = await this.userLoader.load(user.id);
    console.log('friends', friends)
    return friends;
  }

  @ResolveField('customProperty', () => User, { nullable: true })
  async getCustomProperty(@Parent() user: User): Promise<User> {
    return this.userModel.findById(user.customProperty);
  }
}
