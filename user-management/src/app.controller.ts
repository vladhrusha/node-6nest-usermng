import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

import * as dotenv from 'dotenv';
dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`${appName}/${appVersion}/user/:nickname`)
  getByNickname(@Param('nickname') nickname: string) {
    const user = this.appService.getByNickname(nickname);
    return user;
  }
}
