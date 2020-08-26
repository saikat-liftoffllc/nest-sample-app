import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto, CreateUserDto } from './dto';
import { User } from './models/user';

@Controller('users')
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Get()
  all(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  @Post()
  createUser(@Body() data: CreateUserDto): any {
    return this.userModel.create(data);
  }

  @Patch(':userId')
  update(@Param('userId') id: string, @Body() data: UpdateUserDto): any {
    return { id, data };
  }

  @Delete(':userId')
  remove(@Param('userId') id: string): any {
    return { id };
  }
}
