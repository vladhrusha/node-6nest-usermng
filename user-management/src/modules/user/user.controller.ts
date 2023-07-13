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
import { User } from './user.interface';
dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  //add user
  @Post(`${appName}/${appVersion}/user`)
  addUser(@Body(new ValidationPipe()) user: PostUserDto): Promise<string> {
    return this.userService.addUser(user);
  }
  //update user
  @Put(`${appName}/${appVersion}/user`)
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Req() req,
    @Body(new ValidationPipe()) body: UpdateUserDto,
  ): string {
    try {
      this.userService.updateUser(req);
      return 'user updated';
    } catch (err) {
      return putUserErrorResponse(err);
    }
  }
  // //get all users
  // @Get(`${appName}/${appVersion}/users`)
  // getAllUsers(@Body(new ValidationPipe()) body: GetUsersDto): User[] {
  //   const users: User[] = this.userService.getUsers(body);
  //   return users;
  // }
  //get user by nickname
  @Get(`${appName}/${appVersion}/user/:nickname`)
  getByNickname(@Param(new ValidationPipe()) dto: GetUserDto): User {
    const nickname = dto.nickname;
    const user: User = this.userService.getByNickname(nickname);
    return user;
  }
  //delete user
  @Delete(`${appName}/${appVersion}/user`)
  deleteUser(@Body(new ValidationPipe()) body: DeleteUserDto): {
    message: string;
  } {
    this.userService.deleteUser(body);
    return { message: 'User deleted' };
  }
}
