const requestHandlers = require('./requestHandlers');
import {
  PostUserDto,
  UpdateUserDto,
  DeleteUserDto,
  GetUsersDto,
} from './user.dto';
import { UserService } from './user.service';
const putUserErrorResponse = require('./responses/putUserErrorResponse');
import {
  GetUsersInput,
  UpdateUserInput,
  DeleteUserInput,
  PostUserInput,
  UserOut,
  AllUsers,
} from './user.model';

import {
  GraphQLModule,
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

@Resolver((of) => UserOut)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query((returns) => AllUsers)
  //get users
  async getUsers(
    @Args('parameters') parameters: GetUsersInput,
  ): Promise<User[]> {
    try {
      const users: User[] = await requestHandlers.handleGetUsers(parameters);
      return users;
    } catch (err) {}
  }
  //get user
  @Query((returns) => UserOut)
  getByNickname(@Args('nickname') nickname: string): User {
    const user: User = requestHandlers.handleGetByNickname(nickname);
    return user;
  }
  //add user
  @Mutation((returns) => String)
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
  async deleteUser(
    @Args('input') input: DeleteUserInput,
    @Context() context,
  ): Promise<string> {
    await requestHandlers.handleDeleteUser(input);
    return 'User deleted';
  }
}
