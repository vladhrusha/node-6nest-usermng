import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Req,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AppService } from './app.service';
import * as dotenv from 'dotenv';
dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;
// error responses
const {
  postVoteErrorResponse,
  updateUserErrorResponse,
} = require('./utils/responses');
const {
  errorResponse500,
} = require('./utils/responses/genericStatusResponses');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //ping
  @Get()
  ping(): string {
    return this.appService.ping();
  }

  //login
  @Post(`${appName}/${appVersion}/login`)
  async login(@Req() req) {
    try {
      const result = await this.appService.login(req);
      return { message: result };
    } catch (err) {
      throw new HttpException({ err: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
