import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { AuthenticateMiddleware } from '../../authenticate.middleware';
import { VoteResolver } from './vote.resolvers';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql/vote',
      include: [VoteModule],

      typeDefs: `

        type Query {
          placeholder: String,
        }
        type Mutation {

          vote(input: voteDto!): String

        }

        input voteDto {
          destNickname: String
          value: Int
        }
      `,
    }),
  ],
  controllers: [VoteController],
  providers: [VoteService, VoteResolver],
})
export class VoteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes({
      path: '/graphql/vote',
      method: RequestMethod.POST,
    });
  }
}
