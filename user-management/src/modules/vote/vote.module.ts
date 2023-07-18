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
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/modules/vote/vote.gql'),
      sortSchema: true,
      path: '/graphql/vote',
      include: [VoteModule],
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
