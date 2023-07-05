import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { AuthenticateMiddleware } from '../../authenticate.middleware';

@Module({
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes('/task6/v1/vote');
  }
}
