import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthenticateMiddleware } from '../../authenticate.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}