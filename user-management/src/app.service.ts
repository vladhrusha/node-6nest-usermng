import { Injectable } from '@nestjs/common';
// import { handleGetByNickname } from './utils/requestHandlers/handleGetByNickname.js';
// const {
//   handleGetByNickname,
// } = require('./utils/requestHandlers/handleGetByNickname');
// const { name1 } = require('./utils/requestHandlers/test.ts');
const requestHandlers = require('../src/utils/requestHandlers/index.ts');
const jwt = require('../src/utils/jwt/index.ts');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!1112';
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
    await requestHandlers.handleAddUser(user);
    return;
  }
  //delete user
  async deleteUser(body) {
    await requestHandlers.handleDeleteUser(body);
    return;
  }
  //login
  async login(req) {
    const user = await requestHandlers.handleLogin(req);
    const userId = req.body.userId;
    const token = await jwt.generateAccessToken({ user, userId });
    return token;
  }
  //update user
  async updateUser(req) {
    await requestHandlers.handleUpdateUser(req);
    return;
  }
  //vote
  async vote(req) {
    const result = await requestHandlers.handleVote(req);
    return result;
  }
}
