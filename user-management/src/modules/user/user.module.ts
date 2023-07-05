import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthenticateMiddleware } from '../../authenticate.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
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
