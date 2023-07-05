import { Injectable } from '@nestjs/common';
const requestHandlers = require('./requestHandlers/index');
const jwt = require('../src/authentication/jwt/index.ts');

@Injectable()
export class AppService {
  //ping
  ping(): string {
    return 'You have pinged';
  }
  //login
  async login(req) {
    const user = await requestHandlers.handleLogin(req);
    const userId = req.body.userId;
    const token = await jwt.generateAccessToken({ user, userId });
    return token;
  }
}
