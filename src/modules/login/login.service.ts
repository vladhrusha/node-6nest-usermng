import { Injectable } from '@nestjs/common';
const requestHandlers = require('./requestHandlers/index');
const jwt = require('../../../src/authentication/jwt/index.ts');

@Injectable()
export class LoginService {
  //login
  login(req): string {
    const req1 = {
      headers: {
        'content-type': 'application/json',
        authorization: 'Basic dmxhZGhydXNoYTM0OnBzMQ==',
        'user-agent': 'PostmanRuntime/7.32.3',
        accept: '*/*',
        'postman-token': '307e5ae5-3adc-4e79-b41a-c264396ef549',
        host: 'localhost:3000',
        'accept-encoding': 'gzip, deflate, br',
        connection: 'keep-alive',
        'content-length': '44',
      },
      body: {
        userId: '64775ca8334691d080c0440e',
      },
    };
    const user = requestHandlers.handleLogin(req1);
    const userId = req1.body.userId;
    const token: string = jwt.generateAccessToken({ user, userId });
    return token;
  }
}
