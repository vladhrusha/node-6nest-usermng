import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { User } from './user.model';
const requestHandlers = require('../../utils/requestHandlers');

@Injectable()
export class UserService {
  constructor() {}
  ping(): string {
    return 'You have pinged';
  }
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
  // //delete user
  // async deleteUser(body) {
  //   await requestHandlers.handleDeleteUser(body);
  //   return;
  // }
  // //login
  // async login(req) {
  //   const user = await requestHandlers.handleLogin(req);
  //   const userId = req.body.userId;
  //   const token = await jwt.generateAccessToken({ user, userId });
  //   return token;
  // }
  //update user
  async updateUser(req) {
    await requestHandlers.handleUpdateUser(req);
    return;
  }
  // //vote
  // async vote(req) {
  //   const result = await requestHandlers.handleVote(req);
  //   return result;
  // }

  // Implement other methods like updateUser, deleteUser, etc.
}
