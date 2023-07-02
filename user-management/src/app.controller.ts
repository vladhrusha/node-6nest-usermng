import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
const jwt = require('../src/utils/jwt/index.js');

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

  //add user
  @Post(`${appName}/${appVersion}/user`)
  addUser(@Body() user) {
    try {
      this.appService.addUser(user);
      return { message: 'User added' };
    } catch (err) {
      // Handle the error, e.g., using a custom error response function
      // errorResponse500({ err });
    }
  }
  //login
  @Post(`${appName}/${appVersion}/login`)
  async login(@Req() req) {
    try {
      const result = await this.appService.login(req);
      return { message: result };
    } catch (err) {
      // Handle the error, e.g., using a custom error response function
      // errorResponse500({ err });
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
  async vote(@Req() req) {
    const result = await this.appService.vote(req);
  }
}
