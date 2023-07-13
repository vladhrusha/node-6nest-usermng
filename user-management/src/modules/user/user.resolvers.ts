const requestHandlers = require('./requestHandlers');
import { PostUserDto } from './user.dto';
import { UserService } from './user.service';
import {
  GraphQLModule,
  Resolver,
  Query,
  Args,
  ObjectType,
  Field,
  Mutation,
} from '@nestjs/graphql';
@ObjectType()
class User {
  @Field((type) => String)
  nickname: String;
}
@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!1';
  }
  @Query((returns) => [User])
  getUsers(@Args('body') body?): User[] {
    try {
      const users: User[] = requestHandlers.handleGetUsers(body);
      return users;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation((returns) => String)
  async addUser(@Args('user') user: PostUserDto): Promise<string> {
    try {
      await requestHandlers.handleAddUser(user);
      return 'User added';
    } catch (err: any) {
      return err.message;
    }
  }
}
