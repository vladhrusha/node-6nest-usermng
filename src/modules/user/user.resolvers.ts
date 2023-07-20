const requestHandlers = require('./requestHandlers');

import { UserService } from './user.service';
const putUserErrorResponse = require('./responses/putUserErrorResponse');
import {
  GetUsersInput,
  UpdateUserInput,
  DeleteUserInput,
  PostUserInput,
} from './user.model';

import {
  Resolver,
  Query,
  Args,
  ObjectType,
  Field,
  Mutation,
  Context,
  Int,
} from '@nestjs/graphql';
import { User } from './user.interface';
import { AuthGuard } from '../../authenticate.middleware';
import { UseGuards } from '@nestjs/common';
@ObjectType()
export class UserOutput {
  @Field(() => String)
  nickname: string;
  @Field(() => String)
  lastname: string;
  @Field(() => String)
  firstname: string;
}
@ObjectType()
export class AllUsers {
  @Field(() => [UserOutput])
  users: UserOutput[];

  @Field(() => Int)
  totalUsers: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  // get users
  @Query(() => AllUsers)
  async getUsers(
    @Args('parameters') parameters: GetUsersInput,
  ): Promise<User[]> {
    try {
      const users: User[] = await requestHandlers.handleGetUsers(parameters);
      return users;
    } catch (err) {}
  }
  //get user
  @Query(() => UserOutput)
  getByNickname(@Args('nickname') nickname: string): User {
    const user: User = requestHandlers.handleGetByNickname(nickname);
    return user;
  }

  //root
  @Query(() => String)
  sayHello1(): string {
    return 'Hello World!';
  }

  //add user
  @Mutation(() => String)
  async addUser(@Args('user') user: PostUserInput): Promise<string> {
    try {
      await requestHandlers.handleAddUser(user);
      return 'User added';
    } catch (err: any) {
      return err.message;
    }
  }
  //update user
  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @Context() context: any,
  ): Promise<string> {
    try {
      await requestHandlers.handleUpdateUser({ input, context });
      return 'user updated';
    } catch (err) {
      return putUserErrorResponse(err);
    }
  }
  //delete user
  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async deleteUser(
    @Args('input') input: DeleteUserInput,
    // @Context() context,
  ): Promise<string> {
    await requestHandlers.handleDeleteUser(input);
    return 'User deleted';
  }
}
