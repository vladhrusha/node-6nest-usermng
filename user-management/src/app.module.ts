import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthenticateMiddleware } from './authenticate.middleware';
import { UserModule } from './modules/user/user.module';
import { VoteModule } from './modules/vote/vote.module';

@Module({
  imports: [UserModule, VoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
