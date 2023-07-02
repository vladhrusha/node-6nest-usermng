import { Injectable } from '@nestjs/common';
// import { handleGetByNickname } from './utils/requestHandlers/handleGetByNickname.js';
// const {
//   handleGetByNickname,
// } = require('./utils/requestHandlers/handleGetByNickname');
// const { name1 } = require('./utils/requestHandlers/test.ts');
const requestHandlers = require('../src/utils/requestHandlers/index.js');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!1';
  }
  async getByNickname(nickname) {
    const user = await requestHandlers.handleGetByNickname(nickname);
    return user;
  }
}
