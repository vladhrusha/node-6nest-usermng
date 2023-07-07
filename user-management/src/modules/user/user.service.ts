import { Injectable } from '@nestjs/common';
const requestHandlers = require('./requestHandlers');
import { User } from './user.interface';
import {
  PostUserDto,
  DeleteUserDto,
  GetUsersDto,
  GetUserDto,
  UpdateUserDto,
} from './user.dto';
@Injectable()
export class UserService {
  constructor() {}

  //get all users
  getUsers(body?): User[] {
    const users: User[] = requestHandlers.handleGetUsers(body);
    return users;
  }
  //get user by nickname
  getByNickname(nickname: string): User {
    const user: User = requestHandlers.handleGetByNickname(nickname);
    return user;
  }
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
