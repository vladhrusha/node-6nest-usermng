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

import { UserService } from './user.service';
import * as dotenv from 'dotenv';
dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  //add user
  @Post(`${appName}/${appVersion}/user`)
  addUser(@Body() user) {
    return this.userService.addUser(user);
  }
  //update user
  @Put(`${appName}/${appVersion}/user`)
  updateUser(@Req() req) {
    this.userService.updateUser(req);
    return { message: 'userUpdated' };
  }
  //get all users
  @Get(`${appName}/${appVersion}/users`)
  getAllUsers(@Body() body) {
    const users = this.userService.getUsers(body);
    return users;
  }
  //get user by nickname
  @Get(`${appName}/${appVersion}/user/:nickname`)
  getByNickname(@Param('nickname') nickname: string) {
    const user = this.userService.getByNickname(nickname);
    return user;
  }
  //delete user
  @Delete(`${appName}/${appVersion}/user`)
  deleteUser(@Body() body) {
    this.userService.deleteUser(body);
    return { message: 'User deleted' };
  }
}
