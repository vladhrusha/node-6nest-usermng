import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import { SubscriptionController } from './user.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  //   controllers: [UserController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
