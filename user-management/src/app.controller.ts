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
} from '@nestjs/common';

import { AppService } from './app.service';
const validator = require('../src/utils/requestValidations/index.ts');
import * as dotenv from 'dotenv';
dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;
import { VoteDto } from './utils/requestValidations/voteDto';
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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //add user
  @Post(`${appName}/${appVersion}/user`)
  addUser(@Body() user) {
    return this.appService.addUser(user);
  }
  //login
  @Post(`${appName}/${appVersion}/login`)
  async login(@Req() req) {
    try {
      const result = await this.appService.login(req);
      return { message: result };
    } catch (err) {
      errorResponse500({ err });
    }
  }
  //update user
  @Put(`${appName}/${appVersion}/user`)
  updateUser(@Req() req) {
    this.appService.updateUser(req);
    return { message: 'userUpdated' };
  }
  //get all users
  @Get(`${appName}/${appVersion}/users`)
  getAllUsers(@Body() body) {
    const users = this.appService.getUsers(body);
    return users;
  }
  //get user by nickname
  @Get(`${appName}/${appVersion}/user/:nickname`)
  getByNickname(@Param('nickname') nickname: string) {
    const user = this.appService.getByNickname(nickname);
    return user;
  }
  //delete user
  @Delete(`${appName}/${appVersion}/user`)
  deleteUser(@Body() body) {
    this.appService.deleteUser(body);
    return { message: 'User deleted' };
  }
  //vote
  @Post(`${appName}/${appVersion}/vote`)
  async vote(@Req() req, @Body(new ValidationPipe()) voteDto: VoteDto) {
    const result = await this.appService.vote(req);
    return { message: result };
  }
}
