import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

import { LoginResolver } from './login.resolvers';

@Module({
  controllers: [LoginController],
  providers: [LoginService, LoginResolver],
})
export class LoginModule {}
