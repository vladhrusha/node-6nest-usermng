import { Injectable } from '@nestjs/common';
const requestHandlers = require('./requestHandlers');

@Injectable()
export class UserService {
  constructor() {}

  //get all users
  async getUsers(body) {
    const users = await requestHandlers.handleGetUsers(body);
    return users;
  }
  //get user by nickname
  async getByNickname(nickname) {
    console.log(requestHandlers);
    const user = await requestHandlers.handleGetByNickname(nickname);
    return user;
  }
  //add user
  async addUser(user) {
    try {
      await requestHandlers.handleAddUser(user);
      return 'User added';
    } catch (err: any) {
      return { message: err.message };
    }
  }
  //delete user
  async deleteUser(body) {
    await requestHandlers.handleDeleteUser(body);
    return;
  }

  //update user
  async updateUser(req) {
    await requestHandlers.handleUpdateUser(req);
    return;
  }
}
