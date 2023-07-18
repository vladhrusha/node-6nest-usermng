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
  GraphQLModule,
  Resolver,
  Query,
  Args,
  ObjectType,
  Field,
  Mutation,
  Context,
} from '@nestjs/graphql';
@ObjectType()
class User {}

class AllUsers {
  users: User[];
  totalUsers: number;
  page: number;
  limit: number;
}

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query((returns) => AllUsers)
  //get users
  async getUsers(@Args('parameters') parameters: GetUsersDto): Promise<User[]> {
    try {
      const users: User[] = await requestHandlers.handleGetUsers(parameters);
      return users;
    } catch (err) {}
  }
  //get user
  @Query((returns) => User)
  getByNickname(@Args('nickname') nickname: string): User {
    const user: User = requestHandlers.handleGetByNickname(nickname);
    return user;
  }
  //add user
  @Mutation((returns) => String)
  async addUser(@Args('user') user: PostUserDto): Promise<string> {
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
    @Args('input') input: UpdateUserDto,
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
    @Args('input') input: DeleteUserDto,
    @Context() context,
  ): Promise<string> {
    await requestHandlers.handleDeleteUser(input);
    return 'User deleted';
  }
}
