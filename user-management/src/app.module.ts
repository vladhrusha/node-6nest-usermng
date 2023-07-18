import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { VoteModule } from './modules/vote/vote.module';
import { LoginModule } from './modules/login/login.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolvers';
import { join } from 'path';

@Module({
  imports: [VoteModule, UserModule, LoginModule],
  providers: [AppService, AppResolver],
})
export class AppModule {}
