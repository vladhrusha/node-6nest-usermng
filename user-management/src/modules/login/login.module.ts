import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LoginResolver } from './login.resolvers';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql/login',
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/modules/login/login.gql'),
      include: [LoginModule],
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, LoginResolver],
})
export class LoginModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
