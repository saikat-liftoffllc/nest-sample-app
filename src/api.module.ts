import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiController } from './api.controller';
import { UserModule } from './user/user.module';
import config from './config/default';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      include: [UserModule],
      installSubscriptionHandlers: true,
    }),
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('database.mongoConnectionStr'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule {
  constructor() {
    require('mongoose').set('debug', true);
  }
}
