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

  // //get all users
  // @Get(`${appName}/${appVersion}/users`)
  // getAllUsers(@Body(new ValidationPipe()) body: GetUsersDto): User[] {
  //   const users: User[] = this.userService.getUsers(body);
  //   return users;
  // }
}
