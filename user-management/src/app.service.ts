import { Injectable } from '@nestjs/common';
// import { handleGetByNickname } from './utils/requestHandlers/handleGetByNickname.js';
// const {
//   handleGetByNickname,
// } = require('./utils/requestHandlers/handleGetByNickname');
// const { name1 } = require('./utils/requestHandlers/test.ts');
const requestHandlers = require('./utils/requestHandlers/index');
const jwt = require('../src/utils/jwt/index.ts');

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!1112';1
  // }

  // //delete user
  // async deleteUser(body) {
  //   await requestHandlers.handleDeleteUser(body);
  //   return;
  // }
  //login
  async login(req) {
    const user = await requestHandlers.handleLogin(req);
    const userId = req.body.userId;
    const token = await jwt.generateAccessToken({ user, userId });
    return token;
  }
  // //vote
  // async vote(req) {
  //   const result = await requestHandlers.handleVote(req);
  //   return result;
  // }
}
