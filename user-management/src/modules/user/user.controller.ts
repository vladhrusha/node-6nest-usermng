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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  PostUserDto,
  DeleteUserDto,
  GetUsersDto,
  GetUserDto,
  UpdateUserDto,
} from './user.dto';

import { UserService } from './user.service';
import * as dotenv from 'dotenv';
const putUserErrorResponse = require('./responses/putUserErrorResponse');

dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  //add user
  @Post(`${appName}/${appVersion}/user`)
  addUser(@Body(new ValidationPipe()) user: PostUserDto) {
    return this.userService.addUser(user);
  }
  //update user
  @Put(`${appName}/${appVersion}/user`)
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Req() req,
    @Body(new ValidationPipe()) body: UpdateUserDto,
  ) {
    try {
      await this.userService.updateUser(req);
      return 'user updated';
    } catch (err) {
      return await putUserErrorResponse(err);
    }
  }
  //get all users
  @Get(`${appName}/${appVersion}/users`)
  getAllUsers(@Body(new ValidationPipe()) body: GetUsersDto) {
    const users = this.userService.getUsers(body);
    return users;
  }
  //get user by nickname
  @Get(`${appName}/${appVersion}/user/:nickname`)
  getByNickname(
    @Param(new ValidationPipe()) getUserDto: GetUserDto,
    @Param('nickname') nickname: string,
  ) {
    const user = this.userService.getByNickname(nickname);
    return user;
  }
  //delete user
  @Delete(`${appName}/${appVersion}/user`)
  deleteUser(@Body(new ValidationPipe()) body: DeleteUserDto) {
    this.userService.deleteUser(body);
    return { message: 'User deleted' };
  }
}
