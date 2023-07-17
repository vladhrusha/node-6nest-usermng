import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { VoteModule } from './modules/vote/vote.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolvers';

@Module({
  imports: [
    UserModule,
    VoteModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typeDefs: `

        type Query {
          sayHello: String,
          getUsers(parameters: GetUsersDto!): [User],
          getByNickname(nickname: String!): User,
        }
        type Mutation {
          addUser(user: PostUserDto!): String!
          updateUser(input: UpdateUserDto!): String!
          deleteUser(input: DeleteUserDto!): String!
          login: String
          vote(input: voteDto!): String

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
        input voteDto {
  destNickname: String
  value: Int
}
        enum UserRole {
          USER
          MODERATOR
          ADMIN
        }
      `,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
