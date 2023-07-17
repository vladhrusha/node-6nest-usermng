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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql/user',
      include: [UserModule],

      typeDefs: `

        type Query {
          sayHello: String,
          getUsers(parameters: GetUsersDto!): AllUsers,
          getByNickname(nickname: String!): User,
        }
        type Mutation {
          addUser(user: PostUserDto!): String!
          updateUser(input: UpdateUserDto!): String!
          deleteUser(input: DeleteUserDto!): String!

        }
        input PostUserDto {
          nickname: String!
          firstname: String
          lastname: String
          password: String!
        }
        input UpdateUserDto {
          nickname: String!
          lastname: String
          firstname: String
          password: String!
          newPassword: String!
          ifUnmodifiedSince: String!
        }
        input DeleteUserDto {
            nickname: String!
        }
      type AllUsers {
        users: [User]
        totalUsers: Int
        page: Int
          limit: Int
        }
        type User {
          nickname: String!
          firstname: String
          lastname: String
          password: String!
        }
        input GetUsersDto {
          page: Int,
          limit: Int
        }
        enum UserRole {
          USER
          MODERATOR
          ADMIN
        }
      `,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes({
      path: '/graphql/user',
      method: RequestMethod.POST,
    });
  }
}
