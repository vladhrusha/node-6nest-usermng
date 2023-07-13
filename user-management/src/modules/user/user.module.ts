import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolvers';
import { AuthenticateMiddleware } from '../../authenticate.middleware';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import {
  GraphQLModule,
  Resolver,
  Query,
  Args,
  ObjectType,
  Field,
  Mutation,
} from '@nestjs/graphql';
import { PostUserDto } from './user.dto';
// import { User } from './user.interface';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typeDefs: `
        type Query {
          sayHello: String,
          getUsers: [User]
        }
        type User {
          nickname: String!
        }
        input PostUserDto {
          nickname: String!
          firstname: String
          lastname: String
          password: String!
        }
        type Mutation {
          addUser(user: PostUserDto!): String!
        }
      `,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes(
      {
        path: '/task6/v1/user',
        method: RequestMethod.DELETE,
      },
      { path: '/task6/v1/user', method: RequestMethod.PUT },
    );
  }
}
