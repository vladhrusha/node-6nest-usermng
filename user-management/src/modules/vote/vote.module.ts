import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { AuthenticateMiddleware } from '../../authenticate.middleware';
import { VoteResolver } from './vote.resolvers';

@Module({
  controllers: [VoteController],
  providers: [VoteService, VoteResolver],
})
export class VoteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes('/');
  }
}
