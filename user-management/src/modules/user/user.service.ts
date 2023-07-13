import { Injectable } from '@nestjs/common';
const requestHandlers = require('./requestHandlers');
import { User } from './user.interface';
// import { User1 } from './user.gql';

import {
  PostUserDto,
  DeleteUserDto,
  GetUsersDto,
  GetUserDto,
  UpdateUserDto,
} from './user.dto';
import { ApolloError } from 'apollo-server-express';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
@Injectable()
export class UserService {
  constructor() {}

  // //get all users
  // getUsers(body?): User[] {
  //   const users: User[] = requestHandlers.handleGetUsers(body);
  //   return users;
  // }
  // @Query(() => [User])
  // getUsers(@Args('body') body?): User[] {
  //   const users: User[] = requestHandlers.handleGetUsers(body);
  //   return users;
  // }

  //get user by nickname
  getByNickname(nickname: string): User {
    const user: User = requestHandlers.handleGetByNickname(nickname);
    return user;
  }
  // @Query(() => 0, { nullable: true })
  // getByNickname(@Args('nickname') nickname: string): 0 {
  //   const user: User = requestHandlers.handleGetByNickname(nickname);
  //   return 0;
  // }
  //add user
  async addUser(user: PostUserDto): Promise<string> {
    try {
      await requestHandlers.handleAddUser(user);
      return 'User added';
    } catch (err: any) {
      return err.message;
    }
  }
  //delete user
  deleteUser(body: DeleteUserDto): void {
    requestHandlers.handleDeleteUser(body);
  }

  //update user
  updateUser(req: UpdateUserDto): void {
    requestHandlers.handleUpdateUser(req);
  }
}
